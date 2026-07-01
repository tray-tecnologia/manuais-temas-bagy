import { DefaultTheme } from 'vitepress/theme';
import { Brand } from './brand';

export interface BrandSidebarItem extends DefaultTheme.SidebarItem {
  brands?: Brand[];
  items?: DefaultTheme.SidebarItem[];
}

export interface BrandSidebarMultiItem {
  text?: string;
  base?: string;
  items: BrandSidebarItem[];
  brands?: Brand[];
}

export interface BrandSidebarMulti {
  [path: string]: BrandSidebarMultiItem;
}

export type BrandSidebar = BrandSidebarItem[] | BrandSidebarMulti | undefined;
