<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useData, useRoute, useRouter } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import mediumZoom from 'medium-zoom';
import { useBrand } from './composables/useBrand';
import { useSidebar } from './composables/useSidebar';
import PlatformLogo from './components/PlatformLogo.vue';
import PlatformHeroImage from './components/PlatformHeroImage.vue';
import type { ManualsThemeConfig } from './types/configs';
import PlatformHeroInfo from './components/PlatformHeroInfo.vue';
import ManulSidebarTitle from './components/ManulSidebarTitle.vue';

const NOT_ALLOWED_PATH = '/not-allowed';
const { Layout } = DefaultTheme;
const { brand } = useBrand();
const { theme } = useData<ManualsThemeConfig>();
const { isRouteAllowedForBrand } = useSidebar();
const router = useRouter();
const route = useRoute();

const setupMediumZoom = () => {
  mediumZoom('[data-zoomable]', {
    background: 'rgb(from var(--vp-c-neutral) r g b / 0.5)',
  });
};

const enforceRouteAccess = () => {
  if (route.path.startsWith(NOT_ALLOWED_PATH)) return;

  if (!isRouteAllowedForBrand.value) {
    router.go(NOT_ALLOWED_PATH);
  }
};

const setFavicon = () => {
  let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');

  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }

  link.href = theme.value.platform[brand].favicon;
};

router.onAfterRouteChange = setupMediumZoom;

watch(() => route.path, enforceRouteAccess);

onMounted(() => {
  setFavicon();
  enforceRouteAccess();
  setupMediumZoom();
});
</script>

<template>
  <Layout>
    <template #nav-bar-title-before>
      <PlatformLogo />
    </template>

    <template #home-hero-info>
      <PlatformHeroInfo />
    </template>

    <template #home-hero-image>
      <PlatformHeroImage />
    </template>

    <template #sidebar-nav-before>
      <ManulSidebarTitle />
    </template>
  </Layout>
</template>
