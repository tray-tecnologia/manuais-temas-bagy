<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import mediumZoom from 'medium-zoom';

const { Layout } = DefaultTheme;
const router = useRouter();

const setupMediumZoom = () => {
  console.log('DocsLayout');
  mediumZoom('[data-zoomable]', {
    background: 'rgb(from var(--vp-c-neutral) r g b / 0.5)',
  });
};

onMounted(setupMediumZoom);

router.onAfterRouteChange = setupMediumZoom;
</script>

<template>
  <Layout />
</template>

<style>
.medium-zoom-overlay {
  opacity: 0.9;
  backdrop-filter: blur(1px);
}

.medium-zoom-overlay,
.medium-zoom-image--opened {
  z-index: 999;
}
</style>
