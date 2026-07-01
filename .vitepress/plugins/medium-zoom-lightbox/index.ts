import type { MarkdownRenderer } from 'vitepress';

/**
 * VitePress plugin to add `medium-zoom` lightbox to images.
 * @param {any} md - Markdown.
 */
export const mediumZoomLightbox = (md: MarkdownRenderer) => {
  const defaultImageRenderer = md.renderer.rules.image;

  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    tokens[idx].attrSet('data-zoomable', 'true');

    if (defaultImageRenderer) {
      return defaultImageRenderer(tokens, idx, options, env, self);
    }

    return self.renderToken(tokens, idx, options);
  };
};
