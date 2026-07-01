import { computed } from 'vue';
import { useData } from 'vitepress';
import { useBrand } from './useBrand';
import { Brand } from '../types/brand';
import { BrandSidebar, BrandSidebarItem, BrandSidebarMulti } from '../types/sidebar';
import { ensureStartingSlash } from '../../helpers/ensureStartingSlash';

const matchesBrand = (itemBrand: Brand[] | undefined, currentBrand: Brand): boolean => {
  if (!itemBrand || itemBrand.length === 0) return true;
  return itemBrand.includes(currentBrand);
};

const filterItemsByBrand = (items: BrandSidebarItem[], brand: Brand): BrandSidebarItem[] => {
  if (!items) return [];
  return items.filter((item) => matchesBrand(item.brands, brand));
};

const addBase = (items: BrandSidebarItem[], base?: string): BrandSidebarItem[] => {
  return items.map((obj) => {
    const item = { ...obj };
    const itemBase = item.base || base;
    if (itemBase && item.link) {
      item.link = itemBase + item.link.replace(/^\//, itemBase.endsWith('/') ? '' : '/');
    }
    if (item.items) item.items = addBase(item.items, itemBase);
    return item;
  });
};

const getSidebarGroups = (sidebar: BrandSidebarItem[]): BrandSidebarItem[] => {
  const groups: BrandSidebarItem[] = [];
  let lastGroupIndex = 0;

  for (const item of sidebar) {
    if (item.items) {
      lastGroupIndex = groups.push(item);
      continue;
    }
    if (!groups[lastGroupIndex]) {
      groups.push({ items: [] });
    }
    groups[lastGroupIndex]!.items!.push(item);
  }

  return groups;
};

const findMatchingKey = (config: BrandSidebarMulti, relativePath: string): string | null => {
  const path = ensureStartingSlash(relativePath);
  const dir = Object.keys(config)
    .sort((a, b) => b.split('/').length - a.split('/').length)
    .find((d) => path.startsWith(ensureStartingSlash(d)));
  return dir ?? null;
};

const getSidebar = (
  config: BrandSidebar,
  relativePath: string,
  brand: Brand
): BrandSidebarItem[] => {
  if (!config) return [];

  if (Array.isArray(config)) {
    return addBase(filterItemsByBrand(config, brand));
  }

  const dir = findMatchingKey(config, relativePath);
  if (!dir) return [];

  const group = config[dir];

  if (!matchesBrand(group.brands, brand)) return [];

  const items = filterItemsByBrand(group.items, brand);
  return addBase(items, group.base ?? dir);
};

export function useSidebar() {
  const { theme, page, frontmatter } = useData();
  const { brand } = useBrand();

  const sidebar = computed(() =>
    getSidebar(theme.value.sidebar as unknown as BrandSidebar, page.value.relativePath, brand)
  );

  const filteredSidebarGroups = computed(() => getSidebarGroups(sidebar.value));

  const isHome = computed(
    () => !!(frontmatter.value.isHome ?? frontmatter.value.layout === 'home')
  );

  const hasSidebar = computed(
    () =>
      frontmatter.value.sidebar !== false && filteredSidebarGroups.value.length > 0 && !isHome.value
  );

  const isRouteAllowedForBrand = computed(() => {
    const sidebarConfig = theme.value.sidebar as unknown as BrandSidebar;
    if (!sidebarConfig || Array.isArray(sidebarConfig)) return true;

    const dir = findMatchingKey(sidebarConfig, page.value.relativePath);
    if (!dir) return true;

    return matchesBrand(sidebarConfig[dir].brands, brand);
  });

  return {
    findMatchingKey,
    filteredSidebarGroups,
    hasSidebar,
    isRouteAllowedForBrand,
  };
}
