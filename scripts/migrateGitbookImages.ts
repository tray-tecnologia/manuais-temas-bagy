/**
 * Encontra imagens hospedadas no GitBook dentro de arquivos .md, baixa pra
 * docs/public/{tema}/ e reescreve os .md pra apontar pro arquivo local.
 *
 * Uso:
 *   npx vite-node scripts/migrateGitbookImages.ts -- <pasta-docs> [--dry-run] [--report-only]
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { extname, join, relative, sep } from 'node:path';

const GITBOOK_URL_RE =
  /https?:\/\/(?:content\.gitbook\.com|[\w-]+-files\.gitbook\.io|gitbook-x-prod\.appspot\.com)\/[^\s"')]+/g;

const STOPWORDS = new Set(['de', 'do', 'da', 'dos', 'das', 'na', 'no', 'e']);

const DOCS_ROOT = 'docs';
const REPORT_PATH = join('scripts', '_output', 'gitbook-images-report.json');

interface FoundImage {
  file: string;
  line: number;
  url: string;
}

interface ReportEntry extends FoundImage {
  localPath?: string;
  status: 'planned' | 'downloaded' | 'skipped-exists' | 'failed';
  error?: string;
}

function parseArgs(argv: string[]) {
  const positional = argv.filter((a) => !a.startsWith('--'));
  return {
    docsDir: positional[0],
    dryRun: argv.includes('--dry-run'),
    reportOnly: argv.includes('--report-only'),
  };
}

function walkMarkdownFiles(dir: string): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      results.push(...walkMarkdownFiles(full));
    } else if (entry.endsWith('.md')) {
      results.push(full);
    }
  }
  return results;
}

function findGitbookImages(filePath: string): FoundImage[] {
  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const found: FoundImage[] = [];
  lines.forEach((line, idx) => {
    const matches = line.match(GITBOOK_URL_RE);
    if (matches) {
      for (const url of matches) {
        found.push({ file: filePath, line: idx + 1, url });
      }
    }
  });
  return found;
}

/** tema-padrao-bagy-3/pasta/arquivo.md -> ["tema-padrao-bagy-3", "pasta-arquivo"] */
function themeAndBaseName(filePath: string): { theme: string; base: string } {
  const relPath = relative(DOCS_ROOT, filePath);
  const segments = relPath.split(sep);
  const theme = segments[0];
  const rest = segments.slice(1);
  const lastNoExt = rest[rest.length - 1].replace(/\.md$/, '');
  const withoutExt = [...rest.slice(0, -1), lastNoExt];
  const base = withoutExt
    .flatMap((seg) => seg.split('-'))
    .filter((word) => !STOPWORDS.has(word))
    .join('-');
  return { theme, base };
}

/** GitBook markdown source sometimes has raw HTML entities inside the URL (e.g. `&#x26;token=`) */
function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)))
    .replace(/&amp;/g, '&')
    .replace(/\\&/g, '&'); // markdown escapa "&" como "\&" dentro de texto, quebra query params (ex: alt=media\&token=)
}

function extFromUrlOrContentType(url: string, contentType: string | null): string {
  const urlExt = extname(new URL(url).pathname);
  if (urlExt) return urlExt;
  if (contentType?.includes('png')) return '.png';
  if (contentType?.includes('gif')) return '.gif';
  if (contentType?.includes('jpeg')) return '.jpg';
  if (contentType?.includes('webp')) return '.webp';
  if (contentType?.includes('svg')) return '.svg';
  return '.png';
}

async function main() {
  const { docsDir, dryRun, reportOnly } = parseArgs(process.argv.slice(2));
  if (!docsDir) {
    console.error(
      'Uso: vite-node scripts/migrate-gitbook-images.ts -- <pasta-docs> [--dry-run] [--report-only]'
    );
    process.exit(1);
  }
  if (!existsSync(docsDir)) {
    console.error(`Pasta não encontrada: ${docsDir}`);
    process.exit(1);
  }

  const mdFiles = walkMarkdownFiles(docsDir);
  const allFound = mdFiles.flatMap(findGitbookImages);

  console.log(`Arquivos .md verificados: ${mdFiles.length}`);
  console.log(`URLs GitBook encontradas: ${allFound.length}`);

  const report: ReportEntry[] = [];
  const rewritesByFile = new Map<string, { content: string }>();
  const usedNamesPerFile = new Map<string, number>();

  for (const found of allFound) {
    const { theme, base } = themeAndBaseName(found.file);
    const key = found.file;
    const count = (usedNamesPerFile.get(key) ?? 0) + 1;
    usedNamesPerFile.set(key, count);

    if (reportOnly) {
      report.push({ ...found, status: 'planned' });
      continue;
    }

    const fetchUrl = decodeHtmlEntities(found.url);
    let contentType: string | null = null;
    let buffer: ArrayBuffer | null = null;
    try {
      const res = await fetch(fetchUrl);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      contentType = res.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        throw new Error('resposta veio como JSON (metadata), não como mídia — URL de query provavelmente malformada');
      }
      buffer = await res.arrayBuffer();
    } catch (err) {
      report.push({ ...found, status: 'failed', error: (err as Error).message });
      console.warn(
        `FALHA download ${found.url} (${found.file}:${found.line}): ${(err as Error).message}`
      );
      continue;
    }

    const ext = extFromUrlOrContentType(fetchUrl, contentType);
    const fileName = count === 1 ? `${base}${ext}` : `${base}-${count}${ext}`;
    const localDir = join(DOCS_ROOT, 'public', theme);
    const localFilePath = join(localDir, fileName);
    const localUrlPath = `/${theme}/${fileName}`;

    if (existsSync(localFilePath)) {
      report.push({ ...found, localPath: localUrlPath, status: 'skipped-exists' });
    } else if (!dryRun) {
      mkdirSync(localDir, { recursive: true });
      writeFileSync(localFilePath, Buffer.from(buffer));
      report.push({ ...found, localPath: localUrlPath, status: 'downloaded' });
    } else {
      report.push({ ...found, localPath: localUrlPath, status: 'planned' });
    }

    if (!dryRun) {
      const current = rewritesByFile.get(found.file)?.content ?? readFileSync(found.file, 'utf-8');
      const rewritten = current.split(found.url).join(localUrlPath);
      rewritesByFile.set(found.file, { content: rewritten });
    }
  }

  if (!dryRun && !reportOnly) {
    for (const [file, { content }] of rewritesByFile) {
      writeFileSync(file, content);
    }
    console.log(`Arquivos .md reescritos: ${rewritesByFile.size}`);
  }

  mkdirSync(join('scripts', '_output'), { recursive: true });
  writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));
  console.log(`Relatório salvo em ${REPORT_PATH}`);

  const downloaded = report.filter((r) => r.status === 'downloaded').length;
  const skipped = report.filter((r) => r.status === 'skipped-exists').length;
  const failed = report.filter((r) => r.status === 'failed').length;
  console.log(`Baixadas: ${downloaded} | Já existiam: ${skipped} | Falhas: ${failed}`);
  if (!reportOnly) {
    console.warn(
      'Nomes de arquivo gerados são uma aproximação do padrão do repo — revise antes de commitar (a convenção real tem exceções manuais não reproduzíveis por fórmula).'
    );
  }
}

main();
