import type { DefaultTheme } from 'vitepress';

export const nav = (): DefaultTheme.NavItem[] => {
  return [{ text: 'Temas', link: 'temas' }, { component: 'PlatformLink' }];
};
