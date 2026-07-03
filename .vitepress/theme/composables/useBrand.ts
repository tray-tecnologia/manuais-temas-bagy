import type { Brand } from '../types/brand';

const getBrand = (): Brand => {
  if (typeof window === 'undefined') return 'tray';

  const { hostname } = window.location;

  if (hostname.includes('bagy')) {
    return 'bagy';
  }

  if (hostname.includes('bling')) {
    return 'bling';
  }

  return 'tray';
};

export function useBrand() {
  const brand = getBrand();

  return {
    brand,
  };
}
