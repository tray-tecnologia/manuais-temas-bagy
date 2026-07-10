import type { ZoomSelector } from './types';

export const isSupported = (node: Element): node is HTMLImageElement | HTMLVideoElement =>
  node.tagName === 'IMG' || node.tagName === 'VIDEO';

/* eslint-disable-next-line no-prototype-builtins */
export const isNodeList = (selector: unknown): selector is NodeListOf<Element> =>
  NodeList.prototype.isPrototypeOf(selector as NodeList);

export const isNode = (selector: unknown): selector is HTMLElement =>
  Boolean(selector) && (selector as Node).nodeType === 1;

export const isSvg = (image: HTMLImageElement): boolean => {
  if (image.tagName !== 'IMG') {
    return false;
  }

  const source = image.currentSrc || image.src;
  return source.substr(-4).toLowerCase() === '.svg';
};

export const getImagesFromSelector = (selector: ZoomSelector): HTMLElement[] => {
  try {
    if (Array.isArray(selector)) {
      return selector.filter(isSupported);
    }

    if (isNodeList(selector)) {
      return Array.from(selector).filter(isSupported) as HTMLElement[];
    }

    if (isNode(selector)) {
      return [selector].filter(isSupported);
    }

    if (typeof selector === 'string') {
      return Array.from(document.querySelectorAll(selector)).filter(isSupported) as HTMLElement[];
    }

    return [];
  } catch (err) {
    throw new TypeError(
      'The provided selector is invalid.\n' +
        'Expects a CSS selector, a Node element, a NodeList or an array.\n' +
        'See: https://github.com/francoischalifour/medium-zoom'
    );
  }
};

export const createOverlay = (background?: string): HTMLDivElement => {
  const overlay = document.createElement('div');
  overlay.classList.add('medium-zoom-overlay');
  overlay.style.background = background || '';

  return overlay;
};

export const cloneTarget = (template: HTMLElement): HTMLElement => {
  const { top, left, width, height } = template.getBoundingClientRect();
  const clone = template.cloneNode(true) as HTMLElement;
  const scrollTop =
    window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  const scrollLeft =
    window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;

  clone.removeAttribute('id');
  clone.style.position = 'absolute';
  clone.style.top = `${top + scrollTop}px`;
  clone.style.left = `${left + scrollLeft}px`;
  clone.style.width = `${width}px`;
  clone.style.height = `${height}px`;
  clone.style.transform = '';

  return clone;
};

export const createCustomEvent = (type: string, params?: CustomEventInit): CustomEvent => {
  const eventParams: CustomEventInit = {
    bubbles: false,
    cancelable: false,
    detail: undefined,
    ...params,
  };

  return new CustomEvent(type, eventParams);
};
