import { getTemaHorizonSidebar } from './temaHorizon';
import { getTemaPadraoBagy3Sidebar } from './temaPadraoBagy3';
import type { BrandSidebarMulti } from '../../theme/types/sidebar';

export const sidebars: BrandSidebarMulti = {
  '/tema-padrao-bagy-3/': {
    text: 'Tema Padrão Bagy 3.0',
    base: '/tema-padrao-bagy3/',
    items: getTemaPadraoBagy3Sidebar('/tema-padrao-bagy-3/'),
    brands: ['bagy'],
  },
  '/tema-horizon/': {
    text: 'Tema Horizon',
    base: '/tema-horizon/',
    items: getTemaHorizonSidebar('/tema-horizon/'),
    brands: ['tray', 'bagy'],
  },
};
