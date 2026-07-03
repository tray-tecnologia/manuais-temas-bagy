<script setup lang="ts">
import { computed } from 'vue';
import VPNavBarMenuLink from 'vitepress/dist/client/theme-default/components/VPNavBarMenuLink.vue';
import { useBrand } from '../composables/useBrand';
import type { DefaultTheme } from 'vitepress';

const { brand } = useBrand();

const platformData = computed((): DefaultTheme.NavItemWithLink => {
  if (brand === 'bagy') {
    return {
      text: 'Bagy',
      link: 'https://bagy.com.br',
    };
  }

  if (brand === 'bling') {
    return {
      text: 'Bling',
      link: 'https://www.bling.com.br',
    };
  }

  return {
    text: 'Tray',
    link: 'https://tray.com.br',
  };
});
</script>

<template>
  <VPNavBarMenuLink :item="platformData" />
</template>
