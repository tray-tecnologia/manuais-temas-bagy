<script setup lang="ts">
import { computed, useSlots, type VNode } from 'vue';
import { useBrand } from '../../../theme/composables/useBrand';

const { brand: currentBrand } = useBrand();
const slots = useSlots();

const matching = computed<VNode[]>(() => {
  const nodes = slots.default?.() ?? [];
  return nodes.filter((node) => {
    const brand = (node.props as { brand?: string } | null)?.brand;
    return brand === currentBrand;
  });
});
</script>

<template>
  <component :is="node" v-for="(node, i) in matching" :key="i" />
</template>
