import {
  cloneTarget,
  createCustomEvent,
  createOverlay,
  getImagesFromSelector,
  isNode,
  isSvg,
} from './utils';
import type { Zoom, ZoomOptions, ZoomSelector } from './types';

interface EventListenerEntry {
  type: string;
  listener: EventListenerOrEventListenerObject;
  options: boolean | AddEventListenerOptions;
}

interface ActiveState {
  original: HTMLElement | null;
  zoomed: HTMLElement | null;
  zoomedHd: HTMLImageElement | null;
  template: HTMLElement | null;
}

function mediumZoom(selector?: ZoomSelector, options?: ZoomOptions): Zoom;
function mediumZoom(options?: ZoomOptions): Zoom;
function mediumZoom(
  selector?: ZoomSelector | ZoomOptions,
  options: ZoomOptions = {}
): Zoom {
  let images: HTMLElement[] = [];
  let eventListeners: EventListenerEntry[] = [];
  let isAnimating = false;
  let scrollTop = 0;

  let zoomOptions: ZoomOptions = options;
  let initialSelector: ZoomSelector | undefined;

  // If the selector is omitted, it's replaced by the options
  if (Object.prototype.toString.call(selector) === '[object Object]') {
    zoomOptions = selector as ZoomOptions;
  } else if (
    selector ||
    typeof selector === 'string' // to process empty string as a selector
  ) {
    initialSelector = selector as ZoomSelector;
  }

  // Apply the default option values
  zoomOptions = {
    margin: 0,
    background: '#fff',
    scrollOffset: 40,
    container: undefined,
    template: undefined,
    ...zoomOptions,
  };

  const overlay = createOverlay(zoomOptions.background);

  const active: ActiveState = {
    original: null,
    zoomed: null,
    zoomedHd: null,
    template: null,
  };

  const _handleClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    if (target === overlay) {
      close();
      return;
    }

    if (images.indexOf(target) === -1) {
      return;
    }

    toggle({ target });
  };

  const _handleScroll = () => {
    if (isAnimating || !active.original) {
      return;
    }

    const currentScroll =
      window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    if (Math.abs(scrollTop - currentScroll) > (zoomOptions.scrollOffset as number)) {
      setTimeout(close, 150);
    }
  };

  const _handleKeyUp = (event: KeyboardEvent) => {
    const key = event.key || event.keyCode;

    // Close if escape key is pressed
    if (key === 'Escape' || key === 'Esc' || key === 27) {
      close();
    }
  };

  const update = (updateOptions: ZoomOptions = {}): Zoom => {
    const newOptions = updateOptions;

    if (updateOptions.background) {
      overlay.style.background = updateOptions.background;
    }

    if (updateOptions.container && updateOptions.container instanceof Object) {
      newOptions.container = {
        ...(zoomOptions.container as object),
        ...updateOptions.container,
      };
    }

    if (updateOptions.template) {
      const template = isNode(updateOptions.template)
        ? updateOptions.template
        : document.querySelector(updateOptions.template as string);

      newOptions.template = template as HTMLTemplateElement;
    }

    zoomOptions = { ...zoomOptions, ...newOptions };

    images.forEach((image) => {
      image.dispatchEvent(
        createCustomEvent('medium-zoom:update', {
          detail: { zoom },
        })
      );
    });

    return zoom;
  };

  const clone = (cloneOptions: ZoomOptions = {}): Zoom =>
    mediumZoom({ ...zoomOptions, ...cloneOptions });

  const createListenerSync = () => {
    let unregister: (() => void) | undefined;

    return (enabled: boolean, register: () => () => void) => {
      if (enabled) {
        if (!unregister) {
          unregister = register();
        }

        return;
      }

      if (unregister) {
        unregister();
        unregister = undefined;
      }
    };
  };

  const _syncClickListener = createListenerSync();
  const _updateClickListener = () =>
    _syncClickListener(images.length > 0, () => {
      document.addEventListener('click', _handleClick);
      return () => {
        document.removeEventListener('click', _handleClick);
      };
    });

  const attach = (...selectors: ZoomSelector[]): Zoom => {
    const newImages = selectors.reduce<HTMLElement[]>(
      (imagesAccumulator, currentSelector) => [
        ...imagesAccumulator,
        ...getImagesFromSelector(currentSelector),
      ],
      []
    );

    newImages
      .filter((newImage) => images.indexOf(newImage) === -1)
      .forEach((newImage) => {
        images.push(newImage);
        newImage.classList.add('medium-zoom-image');
      });

    eventListeners.forEach(({ type, listener, options: listenerOptions }) => {
      newImages.forEach((image) => {
        image.addEventListener(type, listener, listenerOptions);
      });
    });

    _updateClickListener();

    return zoom;
  };

  const detach = (...selectors: ZoomSelector[]): Zoom => {
    if (active.zoomed) {
      close();
    }

    const imagesToDetach =
      selectors.length > 0
        ? selectors.reduce<HTMLElement[]>(
            (imagesAccumulator, currentSelector) => [
              ...imagesAccumulator,
              ...getImagesFromSelector(currentSelector),
            ],
            []
          )
        : images;

    imagesToDetach.forEach((image) => {
      image.classList.remove('medium-zoom-image');
      image.dispatchEvent(
        createCustomEvent('medium-zoom:detach', {
          detail: { zoom },
        })
      );
    });

    images = images.filter((image) => imagesToDetach.indexOf(image) === -1);
    _updateClickListener();

    return zoom;
  };

  const on = (
    type: string,
    listener: EventListenerOrEventListenerObject,
    listenerOptions: boolean | AddEventListenerOptions = {}
  ): Zoom => {
    images.forEach((image) => {
      image.addEventListener(`medium-zoom:${type}`, listener, listenerOptions);
    });

    eventListeners.push({ type: `medium-zoom:${type}`, listener, options: listenerOptions });

    return zoom;
  };

  const off = (
    type: string,
    listener: EventListenerOrEventListenerObject,
    listenerOptions: boolean | AddEventListenerOptions = {}
  ): Zoom => {
    images.forEach((image) => {
      image.removeEventListener(`medium-zoom:${type}`, listener, listenerOptions);
    });

    eventListeners = eventListeners.filter(
      (eventListener) =>
        !(
          eventListener.type === `medium-zoom:${type}` &&
          eventListener.listener.toString() === listener.toString()
        )
    );

    return zoom;
  };

  const _syncGlobalEvents = createListenerSync();
  const _updateGlobalEvents = (enabled: boolean) =>
    _syncGlobalEvents(enabled, () => {
      document.addEventListener('keyup', _handleKeyUp);
      document.addEventListener('scroll', _handleScroll);
      window.addEventListener('resize', close);

      return () => {
        document.removeEventListener('keyup', _handleKeyUp);
        document.removeEventListener('scroll', _handleScroll);
        window.removeEventListener('resize', close);
      };
    });

  const open = ({ target }: { target?: HTMLElement } = {}): Promise<Zoom> => {
    const _animate = () => {
      let container = {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      };
      let viewportWidth: number | undefined;
      let viewportHeight: number | undefined;

      if (zoomOptions.container) {
        if (zoomOptions.container instanceof Object) {
          // The container is given as an object with properties like width, height, left, top
          container = {
            ...container,
            ...zoomOptions.container,
          };

          // We need to adjust custom options like container.right or container.bottom
          viewportWidth =
            container.width - container.left - container.right - (zoomOptions.margin as number) * 2;
          viewportHeight =
            container.height - container.top - container.bottom - (zoomOptions.margin as number) * 2;
        } else {
          // The container is given as an element
          const zoomContainer = isNode(zoomOptions.container)
            ? zoomOptions.container
            : document.querySelector(zoomOptions.container as string);

          const { width, height, left, top } = (zoomContainer as Element).getBoundingClientRect();

          container = {
            ...container,
            width,
            height,
            left,
            top,
          };
        }
      }

      viewportWidth = viewportWidth || container.width - (zoomOptions.margin as number) * 2;
      viewportHeight = viewportHeight || container.height - (zoomOptions.margin as number) * 2;

      const zoomTarget = (active.zoomedHd || active.original) as HTMLElement;
      const isVideoTarget = zoomTarget.tagName === 'VIDEO';
      const naturalWidth = isVideoTarget
        ? (zoomTarget as HTMLVideoElement).videoWidth || viewportWidth
        : isSvg(zoomTarget as HTMLImageElement)
          ? viewportWidth
          : (zoomTarget as HTMLImageElement).naturalWidth || viewportWidth;
      const naturalHeight = isVideoTarget
        ? (zoomTarget as HTMLVideoElement).videoHeight || viewportHeight
        : isSvg(zoomTarget as HTMLImageElement)
          ? viewportHeight
          : (zoomTarget as HTMLImageElement).naturalHeight || viewportHeight;
      const { top, left, width, height } = zoomTarget.getBoundingClientRect();

      const scaleX = Math.min(Math.max(width, naturalWidth), viewportWidth) / width;
      const scaleY = Math.min(Math.max(height, naturalHeight), viewportHeight) / height;
      const scale = Math.min(scaleX, scaleY);
      const translateX =
        (-left + (viewportWidth - width) / 2 + (zoomOptions.margin as number) + container.left) /
        scale;
      const translateY =
        (-top + (viewportHeight - height) / 2 + (zoomOptions.margin as number) + container.top) /
        scale;
      const transform = `scale(${scale}) translate3d(${translateX}px, ${translateY}px, 0)`;

      (active.zoomed as HTMLElement).style.transform = transform;

      if (active.zoomedHd) {
        active.zoomedHd.style.transform = transform;
      }
    };

    return new Promise((resolve) => {
      if (target && images.indexOf(target) === -1) {
        resolve(zoom);
        return;
      }

      const _handleOpenEnd = () => {
        isAnimating = false;
        (active.zoomed as HTMLElement).removeEventListener('transitionend', _handleOpenEnd);
        (active.original as HTMLElement).dispatchEvent(
          createCustomEvent('medium-zoom:opened', {
            detail: { zoom },
          })
        );

        resolve(zoom);
      };

      if (active.zoomed) {
        resolve(zoom);
        return;
      }

      if (target) {
        // The zoom was triggered manually via a click
        active.original = target;
      } else if (images.length > 0) {
        // The zoom was triggered programmatically, select the first image in the list
        [active.original] = images;
      } else {
        resolve(zoom);
        return;
      }

      _updateGlobalEvents(true);

      active.original.dispatchEvent(
        createCustomEvent('medium-zoom:open', {
          detail: { zoom },
        })
      );

      scrollTop =
        window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      isAnimating = true;
      active.zoomed = cloneTarget(active.original);

      document.body.appendChild(overlay);

      if (zoomOptions.template) {
        const template = isNode(zoomOptions.template)
          ? zoomOptions.template
          : document.querySelector(zoomOptions.template as string);
        active.template = document.createElement('div');
        active.template.appendChild(
          (template as HTMLTemplateElement).content.cloneNode(true)
        );

        document.body.appendChild(active.template);
      }

      // If the selected <img> tag is inside a <picture> tag, set the
      // currently-applied source as the cloned `src=` attribute.
      // (as these might differ, or src= might be unset in some cases)
      if (
        active.original.parentElement &&
        active.original.parentElement.tagName === 'PICTURE' &&
        (active.original as HTMLImageElement).currentSrc
      ) {
        (active.zoomed as HTMLImageElement).src = (active.original as HTMLImageElement).currentSrc;
      }

      document.body.appendChild(active.zoomed);

      window.requestAnimationFrame(() => {
        document.body.classList.add('medium-zoom--opened');
      });

      active.original.classList.add('medium-zoom-image--hidden');
      active.zoomed.classList.add('medium-zoom-image--opened');

      active.zoomed.addEventListener('click', close);
      active.zoomed.addEventListener('transitionend', _handleOpenEnd);

      if (active.original.tagName === 'VIDEO') {
        const originalVideo = active.original as HTMLVideoElement;
        const zoomedVideo = active.zoomed as HTMLVideoElement;
        const currentTime = originalVideo.currentTime;

        zoomedVideo.load();
        zoomedVideo.addEventListener(
          'loadedmetadata',
          () => {
            zoomedVideo.currentTime = currentTime;
          },
          { once: true }
        );
        zoomedVideo.play().catch(() => {});
      }

      if (active.original.getAttribute('data-zoom-src')) {
        active.zoomedHd = active.zoomed.cloneNode() as HTMLImageElement;

        // Reset the `scrset` property or the HD image won't load.
        active.zoomedHd.removeAttribute('srcset');
        active.zoomedHd.removeAttribute('sizes');
        // Remove loading attribute so the browser can load the image normally
        active.zoomedHd.removeAttribute('loading');

        active.zoomedHd.src = active.zoomed.getAttribute('data-zoom-src') as string;

        active.zoomedHd.onerror = () => {
          clearInterval(getZoomTargetSize);
          console.warn(`Unable to reach the zoom image target ${(active.zoomedHd as HTMLImageElement).src}`);
          active.zoomedHd = null;
          _animate();
        };

        // We need to access the natural size of the full HD
        // target as fast as possible to compute the animation.
        const getZoomTargetSize = setInterval(() => {
          if ((active.zoomedHd as HTMLImageElement).complete) {
            clearInterval(getZoomTargetSize);
            (active.zoomedHd as HTMLImageElement).classList.add('medium-zoom-image--opened');
            (active.zoomedHd as HTMLImageElement).addEventListener('click', close);
            document.body.appendChild(active.zoomedHd as HTMLImageElement);
            _animate();
          }
        }, 10);
      } else if (active.original.hasAttribute('srcset')) {
        // If an image has a `srcset` attribuet, we don't know the dimensions of the
        // zoomed (HD) image (like when `data-zoom-src` is specified).
        // Therefore the approach is quite similar.
        active.zoomedHd = active.zoomed.cloneNode() as HTMLImageElement;

        // Resetting the sizes attribute tells the browser to load the
        // image best fitting the current viewport size, respecting the `srcset`.
        active.zoomedHd.removeAttribute('sizes');

        // In Firefox, the `loading` attribute needs to be set to `eager` (default
        // value) for the load event to be fired.
        active.zoomedHd.removeAttribute('loading');

        // Wait for the load event of the hd image. This will fire if the image
        // is already cached.
        const loadEventListener = () => {
          (active.zoomedHd as HTMLImageElement).removeEventListener('load', loadEventListener);
          (active.zoomedHd as HTMLImageElement).classList.add('medium-zoom-image--opened');
          (active.zoomedHd as HTMLImageElement).addEventListener('click', close);
          document.body.appendChild(active.zoomedHd as HTMLImageElement);
          _animate();
        };
        active.zoomedHd.addEventListener('load', loadEventListener);
      } else {
        _animate();
      }
    });
  };

  const close = (): Promise<Zoom> =>
    new Promise((resolve) => {
      if (isAnimating || !active.original) {
        resolve(zoom);
        return;
      }

      const _handleCloseEnd = () => {
        (active.original as HTMLElement).classList.remove('medium-zoom-image--hidden');
        document.body.removeChild(active.zoomed as HTMLElement);
        if (active.zoomedHd) {
          document.body.removeChild(active.zoomedHd);
        }
        document.body.removeChild(overlay);
        (active.zoomed as HTMLElement).classList.remove('medium-zoom-image--opened');
        if (active.template) {
          document.body.removeChild(active.template);
        }

        isAnimating = false;
        (active.zoomed as HTMLElement).removeEventListener('transitionend', _handleCloseEnd);

        (active.original as HTMLElement).dispatchEvent(
          createCustomEvent('medium-zoom:closed', {
            detail: { zoom },
          })
        );

        active.original = null;
        active.zoomed = null;
        active.zoomedHd = null;
        active.template = null;

        _updateGlobalEvents(false);

        resolve(zoom);
      };

      isAnimating = true;
      document.body.classList.remove('medium-zoom--opened');
      (active.zoomed as HTMLElement).style.transform = '';

      if (active.zoomedHd) {
        active.zoomedHd.style.transform = '';
      }

      // Fade out the template so it's not too abrupt
      if (active.template) {
        active.template.style.transition = 'opacity 150ms';
        active.template.style.opacity = '0';
      }

      active.original.dispatchEvent(
        createCustomEvent('medium-zoom:close', {
          detail: { zoom },
        })
      );

      (active.zoomed as HTMLElement).addEventListener('transitionend', _handleCloseEnd);
    });

  const toggle = ({ target }: { target?: HTMLElement } = {}): Promise<Zoom> => {
    if (active.original) {
      return close();
    }

    return open({ target });
  };

  const getOptions = (): ZoomOptions => zoomOptions;

  const getImages = (): HTMLElement[] => images;

  const getZoomedImage = (): HTMLElement | null => active.original;

  const zoom: Zoom = {
    open,
    close,
    toggle,
    update,
    clone,
    attach,
    detach,
    on,
    off,
    getOptions,
    getImages,
    getZoomedImage,
  };

  if (initialSelector !== undefined) {
    attach(initialSelector);
  }

  return zoom;
}

export default mediumZoom;
