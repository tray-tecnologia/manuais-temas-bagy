/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/naming-convention */
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'fs';
import { dirname, join, relative } from 'path';

type ConvertResult = {
  output: string;
  warnings: string[];
  counts: Record<string, number>;
};

const emptyCounts = (): Record<string, number> => ({
  hint: 0,
  tabsGroup: 0,
  tab: 0,
  contentRef: 0,
  fileBlock: 0,
  fileSelfClosing: 0,
  figure: 0,
  table: 0,
});

const HINT_STYLE_TO_CONTAINER: Record<string, string> = {
  danger: 'danger',
  warning: 'warning',
  info: 'info',
  success: 'tip',
};

const addCounts = (target: Record<string, number>, source: Record<string, number>) => {
  for (const key of Object.keys(source)) {
    target[key] = (target[key] ?? 0) + source[key];
  }
};

const convertHints = (
  markdown: string,
  counts: Record<string, number>,
  warnings: string[]
): string => {
  return markdown.replace(
    /\{%\s*hint\s+style="([^"]*)"\s*%\}([\s\S]*?)\{%\s*endhint\s*%\}/g,
    (_match, style: string, inner: string) => {
      counts.hint++;
      const container = HINT_STYLE_TO_CONTAINER[style];
      if (!container) {
        warnings.push(`unknown hint style "${style}" — defaulted to "tip"`);
      }
      return `::: ${container ?? 'tip'}\n${inner.trim()}\n:::`;
    }
  );
};

const convertTabs = (markdown: string, counts: Record<string, number>): string => {
  return markdown.replace(
    /\{%\s*tabs\s*%\}([\s\S]*?)\{%\s*endtabs\s*%\}/g,
    (_match, tabsInner: string) => {
      counts.tabsGroup++;
      const tabBlocks: string[] = [];
      const tabRegex = /\{%\s*tab\s+title="([^"]*)"\s*%\}([\s\S]*?)\{%\s*endtab\s*%\}/g;
      let tabMatch: RegExpExecArray | null;
      while ((tabMatch = tabRegex.exec(tabsInner)) !== null) {
        counts.tab++;
        const [, title, content] = tabMatch;
        tabBlocks.push(`== ${title}\n${content.trim()}`);
      }
      return `::: tabs\n${tabBlocks.join('\n\n')}\n:::`;
    }
  );
};

const convertContentRef = (markdown: string, counts: Record<string, number>): string => {
  return markdown.replace(
    /\{%\s*content-ref\s+url="[^"]*"\s*%\}([\s\S]*?)\{%\s*endcontent-ref\s*%\}/g,
    (_match, inner: string) => {
      counts.contentRef++;
      return inner.trim();
    }
  );
};

const filenameFromUrl = (url: string): string => {
  try {
    const decoded = decodeURIComponent(url);
    const withoutQuery = decoded.split('?')[0];
    const segments = withoutQuery.split('/');
    return segments[segments.length - 1] || url;
  } catch {
    return url;
  }
};

const convertFiles = (markdown: string, counts: Record<string, number>): string => {
  let result = markdown.replace(
    /\{%\s*file\s+src="([^"]*)"\s*%\}([\s\S]*?)\{%\s*endfile\s*%\}/g,
    (_match, src: string, caption: string) => {
      counts.fileBlock++;
      const label = caption.trim() || filenameFromUrl(src);
      return `[${label}](${src})`;
    }
  );

  result = result.replace(/\{%\s*file\s+src="([^"]*)"\s*%\}/g, (_match, src: string) => {
    counts.fileSelfClosing++;
    return `[${filenameFromUrl(src)}](${src})`;
  });

  return result;
};

const convertFigures = (markdown: string, counts: Record<string, number>): string => {
  let result = markdown.replace(
    /<div\s+(?:align|data-full-width)="[^"]*">\s*(<figure>[\s\S]*?<\/figure>)\s*<\/div>/g,
    (_match, figure: string) => figure
  );

  result = result.replace(
    /<figure>\s*<img\s+src="([^"]*)"\s+alt="([^"]*)"\s*\/?>\s*(?:<figcaption>([\s\S]*?)<\/figcaption>)?\s*<\/figure>/g,
    (_match, src: string, alt: string, caption: string | undefined) => {
      counts.figure++;
      const label = (alt && alt.trim()) || (caption && caption.trim()) || '';
      return `![${label}](${src})`;
    }
  );

  return result;
};

const parseHtmlTableCell = (cell: string): string => {
  return cell
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\|/g, '\\|');
};

const convertHtmlTables = (markdown: string, counts: Record<string, number>): string => {
  return markdown.replace(/<table>[\s\S]*?<\/table>/g, (tableHtml: string) => {
    counts.table++;

    const rows: string[][] = [];
    const rowRegex = /<tr>([\s\S]*?)<\/tr>/g;
    let rowMatch: RegExpExecArray | null;
    while ((rowMatch = rowRegex.exec(tableHtml)) !== null) {
      const cells: string[] = [];
      const cellRegex = /<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g;
      let cellMatch: RegExpExecArray | null;
      while ((cellMatch = cellRegex.exec(rowMatch[1])) !== null) {
        cells.push(parseHtmlTableCell(cellMatch[1]));
      }
      if (cells.length > 0) {
        rows.push(cells);
      }
    }

    if (rows.length === 0) {
      return tableHtml;
    }

    const [header, ...body] = rows;
    const separator = header.map(() => '---');
    const lines = [
      `| ${header.join(' | ')} |`,
      `| ${separator.join(' | ')} |`,
      ...body.map((row) => `| ${row.join(' | ')} |`),
    ];
    return lines.join('\n');
  });
};

const findLeftoverPatterns = (markdown: string, filePath: string): string[] => {
  const warnings: string[] = [];
  const lines = markdown.split('\n');

  lines.forEach((line, index) => {
    if (/\{%.*%\}/.test(line)) {
      warnings.push(`${filePath}:${index + 1} — unconverted directive: ${line.trim()}`);
    }
    if (/<figure>|<\/figure>|<table>|<\/table>/.test(line)) {
      warnings.push(`${filePath}:${index + 1} — unconverted HTML block: ${line.trim()}`);
    }
  });

  return warnings;
};

export const convert = (markdown: string, filePath: string): ConvertResult => {
  const counts = emptyCounts();
  const warnings: string[] = [];

  let output = markdown;
  output = convertHints(output, counts, warnings);
  output = convertTabs(output, counts);
  output = convertContentRef(output, counts);
  output = convertFiles(output, counts);
  output = convertFigures(output, counts);
  output = convertHtmlTables(output, counts);

  warnings.push(...findLeftoverPatterns(output, filePath));

  return { output, warnings, counts };
};

const walkMarkdownFiles = (root: string): string[] => {
  const files: string[] = [];

  const walk = (dir: string) => {
    for (const entry of readdirSync(dir)) {
      const fullPath = join(dir, entry);
      const stat = statSync(fullPath);
      if (stat.isDirectory()) {
        walk(fullPath);
      } else if (entry.endsWith('.md')) {
        files.push(fullPath);
      }
    }
  };

  walk(root);
  return files;
};

const ensureDir = (path: string) => {
  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true });
  }
};

const parseArgs = (argv: string[]) => {
  const args: Record<string, string | boolean> = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const next = argv[i + 1];
      if (next && !next.startsWith('--')) {
        args[key] = next;
        i++;
      } else {
        args[key] = true;
      }
    }
  }
  return args;
};

const main = () => {
  const args = parseArgs(process.argv.slice(2));

  const inputRoot = (args.in as string) ?? new URL('../_output/manuais', import.meta.url).pathname;
  const outputRoot =
    (args.out as string) ?? new URL('../_output/manuais-converted', import.meta.url).pathname;
  const dryRun = Boolean(args['dry-run']);

  console.log(
    `Convertendo arquivos de "${inputRoot}"${dryRun ? ' (dry-run, nada será escrito)' : ` para "${outputRoot}"`}...`
  );

  const files = walkMarkdownFiles(inputRoot);
  const totalCounts = emptyCounts();
  const allWarnings: string[] = [];

  for (const file of files) {
    const relativePath = relative(inputRoot, file);
    const markdown = readFileSync(file, 'utf-8');
    const { output, warnings, counts } = convert(markdown, relativePath);

    addCounts(totalCounts, counts);
    allWarnings.push(...warnings);

    if (!dryRun) {
      const outPath = join(outputRoot, relativePath);
      ensureDir(dirname(outPath));
      writeFileSync(outPath, output);
    }
  }

  console.log(`\nArquivos processados: ${files.length}`);
  console.log('Contagem de estruturas convertidas:');
  for (const [key, value] of Object.entries(totalCounts)) {
    console.log(`  ${key}: ${value}`);
  }

  if (allWarnings.length > 0) {
    console.log(`\n${allWarnings.length} avisos encontrados:`);
    for (const warning of allWarnings) {
      console.log(`  ${warning}`);
    }

    if (!dryRun) {
      const reportPath = join(outputRoot, '_convert-report.txt');
      ensureDir(outputRoot);
      writeFileSync(reportPath, allWarnings.join('\n'));
      console.log(`\nRelatório salvo em: ${reportPath}`);
    }
  } else {
    console.log('\nNenhum aviso — todas as estruturas conhecidas foram convertidas.');
  }
};

main();
