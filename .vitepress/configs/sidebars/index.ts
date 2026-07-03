import { getTemaHorizonSidebar } from './temaHorizon';
import { getTemaPadraoBagy3Sidebar } from './temaPadraoBagy3';
import { getTemaPadrao3Sidebar } from './temaPadrao3';
import { getTemaPadrao2Sidebar } from './temaPadrao2';
import { getBlack22Sidebar } from './black22';

import type { BrandSidebarMulti } from '../../theme/types/sidebar';

export const sidebars: BrandSidebarMulti = {
  '/temas/black-22/': {
    text: 'Black 22',
    base: '/temas/black-22/',
    items: getBlack22Sidebar('/temas/black-22/'),
    brands: ['tray'],
  },
  '/temas/tema-padrao-2/': {
    text: 'Tema Padrão 2.0',
    base: '/temas/tema-padrao-2/',
    items: getTemaPadrao2Sidebar('/temas/tema-padrao-2/'),
    brands: ['tray'],
  },
  '/temas/tema-padrao-3/': {
    text: 'Tema Padrão 3.0',
    base: '/temas/tema-padrao-3/',
    items: getTemaPadrao3Sidebar('/temas/tema-padrao-3/'),
    brands: ['tray'],
  },
  '/temas/tema-padrao-bagy-3/': {
    text: 'Tema Padrão Bagy 3.0',
    base: '/temas/tema-padrao-bagy3/',
    items: getTemaPadraoBagy3Sidebar('/temas/tema-padrao-bagy-3/'),
    brands: ['bagy'],
  },
  '/temas/tema-horizon/': {
    text: 'Tema Horizon',
    base: '/temas/tema-horizon/',
    items: getTemaHorizonSidebar('/temas/tema-horizon/'),
    brands: ['tray', 'bagy'],
  },
};
