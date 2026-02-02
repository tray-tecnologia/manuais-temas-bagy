import { defineConfig } from 'vitepress';
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs';
import { nav } from './configs/nav';
import { sidebarDefault, sidebarTemaPadrao30 } from './configs/sidebar';
import lightbox from './configs/lightbox';

export default defineConfig({
  title: 'Manuais Bagy',
  description: 'Saiba como configurar seu tema e deixar sua loja pronta para vender!',
  srcDir: './docs',
  outDir: './public',
  lang: 'pt-BR',
  cleanUrls: true,
  base: process.env.VITEPRESS_BASE || '/',
  themeConfig: {
    logo: {
      light: '/logo.svg',
      dark: '/logo.dark.svg',
      alt: 'Central de parceiros',
    },

    search: {
      provider: 'local',
    },

    nav: nav(),

    sidebar: {
      '/': sidebarDefault(),
      '/tema-padrao-3-0/': {
        base: '/tema-padrao-3-0/',
        items: sidebarTemaPadrao30('/tema-padrao-3-0/'),
      },
    },

    outline: {
      label: 'Nessa página',
    },

    docFooter: {
      prev: 'Anterior',
      next: 'Proximo',
    },
  },

  markdown: {
    config: (md) => {
      md.use(lightbox, {});
      md.use(tabsMarkdownPlugin);
    },
  },
});
