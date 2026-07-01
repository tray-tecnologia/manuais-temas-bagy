import MarkdownIt from 'markdown-it';
import container from 'markdown-it-container';
import type StateBlock from 'markdown-it/lib/rules_block/state_block.mjs';
import type Token from 'markdown-it/lib/token.mjs';

const brandMarker = 0x40; /* @ */
const brandNameRe = /^@([a-zA-Z][\w-]*)\s*$/;

function readBrandName(state: StateBlock, line: number): string | null {
  const start = state.bMarks[line] + state.tShift[line];
  const max = state.eMarks[line];
  if (start >= max) return null;
  if (state.src.charCodeAt(start) !== brandMarker) return null;
  const text = state.src.slice(start, max);
  const match = text.match(brandNameRe);
  return match ? match[1] : null;
}

const ruleBlockBrand = (
  state: StateBlock,
  startLine: number,
  endLine: number,
  silent: boolean
): boolean => {
  if ((state.parentType as string) !== 'container') return false;

  const name = readBrandName(state, startLine);
  if (!name) return false;
  if (silent) return true;

  let nextLine = startLine + 1;
  for (; nextLine < endLine; nextLine++) {
    if (readBrandName(state, nextLine)) break;
  }

  const oldParent = state.parentType;
  const oldLineMax = state.lineMax;
  state.parentType = 'brand' as StateBlock['parentType'];
  state.lineMax = nextLine;

  const openToken = state.push('brand_open', 'div', 1);
  openToken.block = true;
  openToken.info = name;
  openToken.map = [startLine, nextLine - 1];

  state.md.block.tokenize(state, startLine + 1, nextLine);

  const closeToken = state.push('brand_close', 'div', -1);
  closeToken.block = true;

  state.parentType = oldParent;
  state.lineMax = oldLineMax;
  state.line = nextLine;
  return true;
};

export function brandsPlugin(md: MarkdownIt) {
  md.use(container, 'brands', {
    render(tokens: Token[], idx: number) {
      const token = tokens[idx];
      if (token.nesting === 1) return `<BrandsBlock>\n`;
      return `</BrandsBlock>\n`;
    },
  });

  md.block.ruler.after('container_brands', 'brand', ruleBlockBrand, {
    alt: ['paragraph', 'reference', 'blockquote', 'list'],
  });

  const renderBrand = (tokens: Token[], idx: number) => {
    const token = tokens[idx];
    if (token.nesting === 1) {
      const brand = md.utils.escapeHtml(token.info);
      return `<BrandsBlockItem brand="${brand}">\n`;
    }
    return `</BrandsBlockItem>\n`;
  };

  md.renderer.rules['brand_open'] = renderBrand;
  md.renderer.rules['brand_close'] = renderBrand;
}
