<script setup lang="ts">
import { computed, toRaw } from 'vue';
import { useData } from 'vitepress';
import { ensureStartingSlash } from '../../helpers/ensureStartingSlash';
import { BrandSidebar } from '../types/sidebar';
import type { ManualsThemeConfig } from '../types/configs';
import { useSidebar } from '../composables/useSidebar';

const { theme, page } = useData<ManualsThemeConfig>();
const { findMatchingKey } = useSidebar();

const sidebarTitle = computed(() => {
  const currentPath = ensureStartingSlash(page.value.relativePath);

  if (currentPath.startsWith('/temas') || !theme.value.sidebar) {
    return null;
  }

  const sidebar = theme.value.sidebar as unknown as BrandSidebar;

  if (!sidebar || Array.isArray(sidebar)) {
    return null;
  }

  const currentManualKey = findMatchingKey(sidebar, currentPath);

  return currentManualKey ? sidebar[currentManualKey].text : null;
});
</script>

<template>
  <div v-if="sidebarTitle" class="manual-wrapper">
    <h2 class="manual-name">
      {{ sidebarTitle }}
    </h2>
  </div>
</template>

<style>
.manual-wrapper {
  width: calc(100% + 15px);
  padding-top: 14px;
}
.manual-name {
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  width: 100%;
  border: solid 1px var(--vp-c-divider);
  padding: 8px;
}
</style>
