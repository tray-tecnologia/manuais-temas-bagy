import { DefaultTheme } from 'vitepress';
import { sidebars } from './sidebars';
import type { BrandSidebarItem, BrandSidebarMulti } from '../theme/types/sidebar';

const mainLink: BrandSidebarItem = {
  text: 'Apresentação',
  link: '/temas',
};

/**
 * Resolve if should return just link field or concat with base path
 * @param base Base path
 * @param link Link to verify
 * @returns Link resolved
 */
const resolveLink = (base: string, link: string): string => {
  if (link.startsWith('/')) return link;
  return `${base}${link}`;
};

/**
 * Get fist available link from theme sidebar
 * @param items Sidebar items to iterate
 * @param base Base path
 * @returns full path to first link on theme sidebar
 */
const getFirstLink = (items: DefaultTheme.SidebarItem[], base: string): string | undefined => {
  const first = items[0];

  if (!first) return undefined;

  if (first.link) {
    return resolveLink(base, first.link);
  }

  if (first.items) {
    return getFirstLink(first.items, first.base ?? base);
  }

  return undefined;
};

/**
 * Get main sidebar with links to all themes available
 * @returns
 */
const generateMainSidebar = (themes: BrandSidebarMulti): BrandSidebarItem[] => {
  const themesLinks = Object.entries(themes)
    .map<BrandSidebarItem>(([key, manual]) => {
      return {
        text: manual.text,
        link: getFirstLink(manual.items, key),
        brands: manual.brands,
      };
    })
    .filter(Boolean);

  return [mainLink, ...themesLinks];
};

/**
 * Returns complete sidebar.
 * Main sidebar is created automatically based on themes sidebar.
 *
 * DO NOT change this manually!
 * @returns
 */
export const getSidebar = (): BrandSidebarMulti => ({
  '/': {
    base: '/',
    items: generateMainSidebar(sidebars),
  },
  ...sidebars,
});
