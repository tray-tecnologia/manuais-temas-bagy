<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import VPImage from 'vitepress/dist/client/theme-default/components/VPImage.vue';
import { useBrand } from '../composables/useBrand';
import { useData } from 'vitepress';
import type { ManualsThemeConfig } from '../types/configs';

const { brand } = useBrand();
const { theme, isDark } = useData<ManualsThemeConfig>();

const platformColors = theme.value.platform[brand].colors;

const platformHeroImage = computed(() => {
  return theme.value.platform?.[brand].hero;
});

const setCssVariablesBasedOnBrand = (isDark: boolean) => {
  const type = isDark ? 'heroDark' : 'hero';

  document.documentElement.style.setProperty(
    '--vp-home-hero-image-background-image',
    `linear-gradient(-45deg, ${platformColors[type]} 50%, ${platformColors[type]} 50%)`
  );
};

watch(isDark, (dark) => {
  setCssVariablesBasedOnBrand(dark);
});

onMounted(() => {
  setCssVariablesBasedOnBrand(isDark.value);
});
</script>

<template>
  <VPImage v-if="platformHeroImage" class="image-src" :image="platformHeroImage" />
</template>
