import type { Brand } from '../types/brand';

const getBrand = (): Brand => {
  if (typeof window === 'undefined') return 'tray';
  return window.location.hostname.includes('bagy') ? 'bagy' : 'tray';
};

export function useBrand() {
  const brand = getBrand();

  return {
    brand,
  };
}
