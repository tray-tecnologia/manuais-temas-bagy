<script setup lang="ts">
import { computed } from 'vue';
import VPImage from 'vitepress/dist/client/theme-default/components/VPImage.vue';
import { useBrand } from '../composables/useBrand';
import { useData } from 'vitepress';
import { ManualsThemeConfig } from '../types/configs';

const { brand } = useBrand();
const { theme } = useData<ManualsThemeConfig>();

const platformLogo = computed(() => {
  return theme.value.platform?.[brand].logo;
});
</script>

<template>
  <VPImage v-if="platformLogo" class="logo" :image="platformLogo" />
</template>
