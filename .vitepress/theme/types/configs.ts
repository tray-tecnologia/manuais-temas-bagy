import { DefaultTheme } from 'vitepress/theme';
import { Brand } from './brand';

interface NotAllowedOptions {
  title?: string;
  quote?: string;
  link?: string;
  linkLabel?: string;
  linkText?: string;
  code?: string;
}

interface PlatformOptions {
  logo: DefaultTheme.ThemeableImage;
  hero: DefaultTheme.ThemeableImage;
  favicon: string;
  colors: Record<string, string>;
}

type Platform = Record<Brand, PlatformOptions>;

export interface ManualsThemeConfig extends DefaultTheme.Config {
  notAllowed?: NotAllowedOptions;
  platform: Platform;
}
