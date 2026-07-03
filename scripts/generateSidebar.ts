/**
 * Gera o arquivo de sidebar do VitePress a partir do metadado de migração do
 * GitBook em docs/{tema}/_meta/content.json, preservando a ordem e os títulos
 * originais do GitBook. Segue o padrão de .vitepress/configs/sidebars/temaHorizon.ts.
 *
 * Como esses temas vêm de migração, a pasta _meta/ guarda a árvore de páginas
 * (título, ordem, hierarquia) exportada do GitBook — usar esse metadado gera a
 * sidebar com muito mais precisão do que inferir pela árvore de arquivos.
 * Sem essa pasta o processo é interrompido (nada é gerado por aproximação).
 *
 * Diferença conhecida: no GitBook a primeira seção (Apresentação) não vem
 * agrupada em uma pasta — aqui ela é sempre padronizada como bloco "Apresentação".
 *
 * Uso:
 *   npx vite-node scripts/generateSidebar.ts -- <tema>
 *
 * Ex: npx vite-node scripts/generateSidebar.ts -- tema-padrao-2
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const docsRoot = 'docs';
const sidebarsDir = join('.vitepress', 'configs', 'sidebars');
const metaRelativePath = join('_meta', 'content.json');
const apresentacaoBase = 'apresentacao';
const apresentacaoLabel = 'Apresentação';
const masterSlug = 'master';

interface MetaPage {
  title: string;
  kind: string;
  slug: string;
  path: string;
  pages?: MetaPage[];
}

interface MetaContent {
  pages: MetaPage[];
}

interface SidebarItem {
  text: string;
  link?: string;
  base?: string;
  collapsed?: boolean;
  items?: SidebarItem[];
}

function parseArgs(argv: string[]) {
  const positional = argv.filter((a) => !a.startsWith('--'));
  return { tema: positional[0] };
}

/** tema-padrao-3 -> TemaPadrao3 */
function toPascalCase(kebab: string): string {
  return kebab
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

/** tema-padrao-3 -> temaPadrao3 */
function toCamelCase(kebab: string): string {
  const pascal = toPascalCase(kebab);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

/** slug 'master' é a página raiz do GitBook -> vira inicio.md/'Início' no repo */
function slugOf(page: MetaPage): string {
  return page.slug === masterSlug ? 'inicio' : page.slug;
}

function labelOf(page: MetaPage): string {
  return page.slug === masterSlug ? 'Início' : page.title;
}

function warnIfMissing(docsDir: string, relPath: string, isDir: boolean) {
  const target = isDir ? join(docsDir, relPath) : join(docsDir, `${relPath}.md`);
  if (!existsSync(target)) {
    console.warn(
      `Aviso: ${isDir ? 'pasta' : 'arquivo'} não encontrado(a) para "${relPath}" (confira docs/.../_meta/content.json).`
    );
  }
}

/**
 * @param fullPathPrefix caminho absoluto (relativo a docs/{tema}/) acumulado até aqui, usado só pra checar existência em disco.
 * @param linkPrefix caminho relativo à `base` ativa no sidebar, resetado sempre que um grupo abre uma nova `base`.
 */
function buildItems(
  pages: MetaPage[],
  docsDir: string,
  fullPathPrefix: string,
  linkPrefix: string
): SidebarItem[] {
  return pages.map((page) => {
    const slug = slugOf(page);
    const fullPath = `${fullPathPrefix}${slug}`;
    const linkPath = `${linkPrefix}${slug}`;
    const children = page.pages ?? [];

    if (page.kind === 'group') {
      warnIfMissing(docsDir, fullPath, true);
      return {
        text: labelOf(page),
        base: `/${fullPath}/`,
        items: buildItems(children, docsDir, `${fullPath}/`, ''),
      };
    }

    warnIfMissing(docsDir, fullPath, false);
    const item: SidebarItem = { text: labelOf(page), link: linkPath };
    if (children.length > 0) {
      item.collapsed = true;
      item.items = buildItems(children, docsDir, `${fullPath}/`, `${linkPath}/`);
    }
    return item;
  });
}

function buildTopLevelBlocks(pages: MetaPage[], docsDir: string): SidebarItem[] {
  const groups = pages.filter((page) => page.kind === 'group');
  const standalone = pages.filter((page) => page.kind !== 'group');

  const blocks: SidebarItem[] = [];

  if (standalone.length > 0) {
    blocks.push({
      text: apresentacaoLabel,
      base: `/${apresentacaoBase}/`,
      items: buildItems(standalone, docsDir, `${apresentacaoBase}/`, ''),
    });
  }

  blocks.push(...buildItems(groups, docsDir, '', ''));

  return blocks;
}

function countSheets(pages: MetaPage[]): number {
  let count = 0;
  for (const page of pages) {
    if (page.kind !== 'group') count += 1;
    if (page.pages) count += countSheets(page.pages);
  }
  return count;
}

function serializeItems(items: SidebarItem[], indent: string): string {
  return items
    .map((item) => {
      const lines: string[] = [`${indent}{`];
      lines.push(`${indent}  text: '${item.text.replace(/'/g, "\\'")}',`);
      if (item.link !== undefined) {
        lines.push(`${indent}  link: \`${item.link}\`,`);
      }
      if (item.base !== undefined) {
        lines.push(`${indent}  base: \`\${basePath}${item.base}\`,`);
      }
      if (item.collapsed) {
        lines.push(`${indent}  collapsed: true,`);
      }
      if (item.items) {
        lines.push(`${indent}  items: [`);
        lines.push(serializeItems(item.items, `${indent}    `));
        lines.push(`${indent}  ],`);
      }
      lines.push(`${indent}},`);
      return lines.join('\n');
    })
    .join('\n');
}

function main() {
  const { tema } = parseArgs(process.argv.slice(2));
  if (!tema) {
    console.error('Uso: npx vite-node scripts/generateSidebar.ts -- <tema>');
    process.exit(1);
  }

  const docsDir = join(docsRoot, tema);
  if (!existsSync(docsDir)) {
    console.error(`Pasta não encontrada: ${docsDir}`);
    process.exit(1);
  }

  const metaPath = join(docsDir, metaRelativePath);
  if (!existsSync(metaPath)) {
    console.error(
      `Pasta _meta não encontrada em ${docsDir} — processo interrompido.\n` +
        `Esse script depende do metadado de migração do GitBook (${join('docs', tema, metaRelativePath)}) ` +
        'para montar a sidebar com ordem e títulos corretos.'
    );
    process.exit(1);
  }

  const meta: MetaContent = JSON.parse(readFileSync(metaPath, 'utf-8'));
  const topLevelBlocks = buildTopLevelBlocks(meta.pages, docsDir);

  const pascalName = toPascalCase(tema);
  const camelName = toCamelCase(tema);
  const functionName = `get${pascalName}Sidebar`;

  const body = serializeItems(topLevelBlocks, '    ');

  const fileContent = `import { DefaultTheme } from 'vitepress';
import { ensureEndingWithoutSlash } from '../../helpers/ensureEndingWithoutSlash';

/**
 * Return sidebar config to ${pascalName}
 * @param basePath The base path where doc will be displayed
 * @returns
 */
export const ${functionName} = (basePath: string): DefaultTheme.SidebarItem[] => {
  basePath = ensureEndingWithoutSlash(basePath);
  return [
${body}
  ];
};
`;

  const outputPath = join(sidebarsDir, `${camelName}.ts`);
  writeFileSync(outputPath, fileContent);

  console.info(`Páginas processadas (via _meta): ${countSheets(meta.pages)}`);
  console.info(`Sidebar gerada em: ${outputPath}`);
  console.warn(
    'Estrutura e textos vêm do _meta do GitBook — ainda assim, revise antes de registrar em index.ts.'
  );
}

main();
