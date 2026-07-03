import { defineConfig } from 'vitepress';
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs';
import { nav } from './configs/nav';
import { getSidebar } from './configs/sidebar';
import { ManualsThemeConfig } from './theme/types/configs';
import { fileURLToPath } from 'node:url';
import { mediumZoomLightbox } from './plugins/medium-zoom-lightbox';
import { brandsPlugin } from './plugins/theme-brands/md';

export default defineConfig<ManualsThemeConfig>({
  title: 'Manuais Temas',
  description: 'Saiba como configurar seu tema e deixar sua loja pronta para vender!',
  srcDir: './docs',
  outDir: './public',
  lang: 'pt-BR',
  cleanUrls: true,
  base: process.env.VITEPRESS_BASE || '/',
  themeConfig: {
    search: {
      provider: 'local',
    },

    platform: {
      tray: {
        logo: {
          light: '/assets/tray/logo.svg',
          dark: '/assets/tray/logo.dark.svg',
          alt: 'manuais temas',
        },
        hero: {
          light: '/assets/tray/hero.svg',
          dark: '/assets/tray/hero.dark.svg',
          alt: 'Manuais Tray',
        },
        favicon: '/assets/tray/favicon.png',
        colors: {
          primary: '#43A0D6',
          hero: '#d8f1ff',
          heroDark: '#252d69',
        },
      },
      bagy: {
        logo: {
          light: '/assets/bagy/logo.svg',
          dark: '/assets/bagy/logo.dark.svg',
          alt: 'manuais temas',
        },
        hero: {
          light: '/assets/bagy/hero.svg',
          dark: '/assets/bagy/hero.dark.svg',
          alt: 'Manuais Bagy',
        },
        favicon: '/assets/bagy/favicon.png',
        colors: {
          primary: '#FA3D8B',
          hero: '#fff0fd',
          heroDark: '#255a5c',
        },
      },
      bling: {
        logo: {
          light: '/assets/bling/logo.svg',
          dark: '/assets/bling/logo.dark.svg',
          alt: 'manuais temas',
        },
        hero: {
          light: '/assets/bling/hero.svg',
          dark: '/assets/bling/hero.dark.svg',
          alt: 'Manuais Bling',
        },
        favicon: '/assets/bling/favicon.png',
        colors: {
          primary: '#34AD61',
          hero: '#DCFAE6',
          heroDark: '#1D733C',
        },
      },
    },

    nav: nav(),

    sidebar: getSidebar(),

    outline: {
      label: 'Nessa página',
    },

    docFooter: {
      prev: 'Anterior',
      next: 'Proximo',
    },

    notFound: {
      title: 'PÁGINA NÃO ENCONTRADA',
      quote: 'A página que você está buscando mudou ou não foi encontrada.',
      linkLabel: 'Ir para a página inicial',
      linkText: 'Ir para a página inicial',
    },

    notAllowed: {
      title: 'PÁGINA NÃO DISPONÍVEL',
      quote: 'A página que você está buscando não está disponível para sua plataforma.',
      linkLabel: 'Ir para a página inicial',
      linkText: 'Ir para a página inicial',
    },
  },

  markdown: {
    config: (md) => {
      md.use(mediumZoomLightbox);
      md.use(tabsMarkdownPlugin);
      md.use(brandsPlugin);
    },
  },

  vite: {
    server: {
      allowedHosts: ['manuais.tray.local', 'manuais.bagy.local', 'manuais.bling.local'],
    },
    resolve: {
      alias: [
        {
          find: /\.\/components\/VPSidebar\.vue$/,
          replacement: fileURLToPath(new URL('./theme/components/VPSidebar.vue', import.meta.url)),
        },
      ],
    },
  },
});
