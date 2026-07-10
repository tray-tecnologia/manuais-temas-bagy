import type { MarkdownRenderer } from 'vitepress';

export interface ExpandImageMediaOptions {
  video?: {
    attributes?: Record<string, string | boolean>;
  };
}

const stub = `
<video {VIDEO-ATTRIBUTES}>
  <source src="{VIDEO-SOURCE}" type="{VIDEO-TYPE}">
  {VIDEO-ALT}
</video>`;

const defaultVideoAttributes: Record<string, string | boolean> = {
  autoplay: true,
  loop: true,
  muted: true,
  playsinline: true,
};

const renderAttributes = (attributes: Record<string, string | boolean> = {}): string => {
  return Object.entries(attributes)
    .filter(([, value]) => value !== false)
    .map(([key, value]) => (value === true ? key : `${key}="${value}"`))
    .join(' ');
};

/**
 * VitePress plugin to add `medium-zoom` lightbox to images.
 * @param {any} md - Markdown.
 */
export const expandImageMedia = (
  md: MarkdownRenderer,
  pluginOptions: ExpandImageMediaOptions = {}
) => {
  const imageRender =
    md.renderer.rules.image ??
    ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options));

  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    const token = tokens[idx];

    const src = token.attrGet('src') ?? '';
    const alt = token.content || 'Your browser does not support HTML5 video.';

    const match = src.match(/\.(webm|mp4)(\?.*)?$/i);

    if (!match) {
      return imageRender(tokens, idx, options, env, self);
    }

    const type = `video/${match[1].toLowerCase()}`;
    const attributes = renderAttributes({
      ...defaultVideoAttributes,
      ...pluginOptions.video?.attributes,
    });

    return stub
      .replace('{VIDEO-ATTRIBUTES}', attributes)
      .replace('{VIDEO-SOURCE}', md.utils.escapeHtml(src))
      .replace('{VIDEO-TYPE}', md.utils.escapeHtml(type))
      .replace('{VIDEO-ALT}', md.utils.escapeHtml(alt));
  };
};
