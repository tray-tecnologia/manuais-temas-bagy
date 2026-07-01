import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client';
import DefaultTheme from 'vitepress/theme';
import DocsLayout from './DocsLayout.vue';
import PlatformLink from './components/PlatformLink.vue';
import BrandsBlock from '../plugins/theme-brands/client/BrandsBlock.vue';
import BrandsBlockItem from '../plugins/theme-brands/client/BrandsBlockItem.vue';
import type { Theme } from 'vitepress';

import './custom.css';

export default {
  extends: DefaultTheme,
  Layout: DocsLayout,
  enhanceApp({ app }) {
    app.component('PlatformLink', PlatformLink);
    app.component('BrandsBlock', BrandsBlock);
    app.component('BrandsBlockItem', BrandsBlockItem);
    enhanceAppWithTabs(app);
  },
} satisfies Theme;
