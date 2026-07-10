/**
 * Converte .png/.jpg/.jpeg pra .avif (avifenc) e .gif pra .webm (ffmpeg) dentro
 * de uma pasta, mantendo os originais no disco, e atualiza as referências
 * desses arquivos nos .md de uma segunda pasta pra apontar pro novo formato.
 *
 * Uso:
 *   npx vite-node scripts/convertImagesToModernFormats.ts -- <pasta-imagens> <pasta-md> [--dry-run]
 */
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { extname, join } from 'node:path';

const imageExts = new Set(['.png', '.jpg', '.jpeg']);
const gifExt = '.gif';

interface ConvertResult {
  file: string;
  status: 'converted' | 'skipped-exists' | 'failed' | 'planned';
  error?: string;
}

function parseArgs(argv: string[]) {
  const positional = argv.filter((a) => !a.startsWith('--'));
  return {
    targetDir: positional[0],
    mdDir: positional[1],
    dryRun: argv.includes('--dry-run'),
  };
}

function walkFiles(dir: string): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      results.push(...walkFiles(full));
    } else {
      results.push(full);
    }
  }
  return results;
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

function withNewExt(filePath: string, newExt: string): string {
  const ext = extname(filePath);
  return `${filePath.slice(0, -ext.length)}${newExt}`;
}

function checkToolAvailable(cmd: string): boolean {
  const result = spawnSync(cmd, ['-h'], { stdio: 'ignore' });
  return result.error === undefined || (result.error as NodeJS.ErrnoException).code !== 'ENOENT';
}

function convertToAvif(src: string, dest: string): ConvertResult {
  const result = spawnSync('avifenc', ['--min', '20', '--max', '40', src, dest]);
  if (result.error) {
    return { file: src, status: 'failed', error: result.error.message };
  }
  if (result.status !== 0) {
    return { file: src, status: 'failed', error: result.stderr?.toString() || `exit code ${result.status}` };
  }
  return { file: src, status: 'converted' };
}

function convertToWebm(src: string, dest: string): ConvertResult {
  const result = spawnSync('ffmpeg', [
    '-i',
    src,
    '-vf',
    'crop=floor(iw/2)*2:floor(ih/2)*2',
    '-c:v',
    'libsvtav1',
    '-crf',
    '36',
    '-preset',
    '4',
    dest,
  ]);
  if (result.error) {
    return { file: src, status: 'failed', error: result.error.message };
  }
  if (result.status !== 0) {
    return { file: src, status: 'failed', error: result.stderr?.toString() || `exit code ${result.status}` };
  }
  return { file: src, status: 'converted' };
}

async function main() {
  const { targetDir, mdDir, dryRun } = parseArgs(process.argv.slice(2));
  if (!targetDir || !mdDir) {
    console.error(
      'Uso: vite-node scripts/convertImagesToModernFormats.ts -- <pasta-imagens> <pasta-md> [--dry-run]'
    );
    process.exit(1);
  }
  if (!existsSync(targetDir)) {
    console.error(`Pasta não encontrada: ${targetDir}`);
    process.exit(1);
  }
  if (!existsSync(mdDir)) {
    console.error(`Pasta de .md não encontrada: ${mdDir}`);
    process.exit(1);
  }
  if (!checkToolAvailable('avifenc')) {
    console.error('avifenc não encontrado no PATH. Instale antes de continuar.');
    process.exit(1);
  }
  if (!checkToolAvailable('ffmpeg')) {
    console.error('ffmpeg não encontrado no PATH. Instale antes de continuar.');
    process.exit(1);
  }

  const allFiles = walkFiles(targetDir);
  const pngJpgFiles = allFiles.filter((f) => imageExts.has(extname(f).toLowerCase()));
  const gifFiles = allFiles.filter((f) => extname(f).toLowerCase() === gifExt);

  console.info(`PNG/JPG encontrados: ${pngJpgFiles.length}`);
  console.info(`GIF encontrados: ${gifFiles.length}`);

  const results: ConvertResult[] = [];
  const renameMap = new Map<string, string>();

  for (const file of pngJpgFiles) {
    const dest = withNewExt(file, '.avif');
    if (existsSync(dest)) {
      results.push({ file, status: 'skipped-exists' });
      renameMap.set(file, dest);
      continue;
    }
    if (dryRun) {
      results.push({ file, status: 'planned' });
      renameMap.set(file, dest);
      continue;
    }
    const result = convertToAvif(file, dest);
    results.push(result);
    if (result.status === 'converted') renameMap.set(file, dest);
    else console.warn(`FALHA ${file}: ${result.error}`);
  }

  for (const file of gifFiles) {
    const dest = withNewExt(file, '.webm');
    if (existsSync(dest)) {
      results.push({ file, status: 'skipped-exists' });
      renameMap.set(file, dest);
      continue;
    }
    if (dryRun) {
      results.push({ file, status: 'planned' });
      renameMap.set(file, dest);
      continue;
    }
    const result = convertToWebm(file, dest);
    results.push(result);
    if (result.status === 'converted') renameMap.set(file, dest);
    else console.warn(`FALHA ${file}: ${result.error}`);
  }

  let mdUpdatedCount = 0;
  if (!dryRun && renameMap.size > 0) {
    const mdFiles = walkMarkdownFiles(mdDir);
    for (const mdFile of mdFiles) {
      let content = readFileSync(mdFile, 'utf-8');
      let changed = false;
      for (const [oldFile, newFile] of renameMap) {
        const oldUrlPath = `/${oldFile.split('public/')[1] ?? ''}`;
        const newUrlPath = `/${newFile.split('public/')[1] ?? ''}`;
        if (!oldUrlPath.slice(1)) continue;
        if (content.includes(oldUrlPath)) {
          content = content.split(oldUrlPath).join(newUrlPath);
          changed = true;
        }
      }
      if (changed) {
        writeFileSync(mdFile, content);
        mdUpdatedCount += 1;
      }
    }
  }

  const converted = results.filter((r) => r.status === 'converted').length;
  const skipped = results.filter((r) => r.status === 'skipped-exists').length;
  const failed = results.filter((r) => r.status === 'failed').length;
  const planned = results.filter((r) => r.status === 'planned').length;

  console.info('---');
  if (dryRun) {
    console.info(`[dry-run] Seriam convertidos: ${planned} | Já existiam: ${skipped}`);
  } else {
    console.info(`Convertidos: ${converted} | Já existiam: ${skipped} | Falhas: ${failed}`);
    console.info(`Arquivos .md atualizados: ${mdUpdatedCount}`);
  }
}

main();
