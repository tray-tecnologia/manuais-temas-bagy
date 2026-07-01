<script setup lang="ts">
import { useData } from 'vitepress';
import { useBrand } from '../composables/useBrand';
import { capitalize } from '../../helpers/capitalize.ts';
import type { ManualsThemeConfig } from '../types/configs';

const { brand } = useBrand();
const { frontmatter, theme } = useData<ManualsThemeConfig>();

const platformColors = theme.value.platform[brand].colors;

const capitalizeBrand = capitalize(brand);
</script>

<template>
  <h1 class="heading">
    <span v-html="capitalizeBrand" class="name clip"></span>
    <span v-if="frontmatter.hero.text" v-html="frontmatter.hero.text" class="text"></span>
  </h1>
  <p v-if="frontmatter.hero.tagline" v-html="frontmatter.hero.tagline" class="tagline"></p>
</template>

<style scoped>
.heading {
  display: flex;
  flex-direction: column;
}

.name,
.text {
  width: fit-content;
  max-width: 392px;
  letter-spacing: -0.4px;
  line-height: 40px;
  font-size: 32px;
  font-weight: 700;
  white-space: pre-wrap;

  &:lang(ja) {
    font-feature-settings: 'palt';
    word-break: auto-phrase;
  }
}

.VPHero.has-image .name,
.VPHero.has-image .text {
  margin: 0 auto;
}

.name {
  color: var(--vp-home-hero-name-color);
}

.clip {
  background: var(--vp-home-hero-name-background);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: v-bind('platformColors.primary');
}

@media (min-width: 640px) {
  .name,
  .text {
    max-width: 576px;
    line-height: 56px;
    font-size: 48px;
  }
}

@media (min-width: 960px) {
  .name,
  .text {
    line-height: 64px;
    font-size: 56px;
  }

  .VPHero.has-image .name,
  .VPHero.has-image .text {
    margin: 0;
  }
}

.tagline {
  padding-top: 8px;
  max-width: 392px;
  line-height: 28px;
  font-size: 18px;
  font-weight: 500;
  white-space: pre-wrap;
  color: var(--vp-c-text-2);
}

.VPHero.has-image .tagline {
  margin: 0 auto;
}

@media (min-width: 640px) {
  .tagline {
    padding-top: 12px;
    max-width: 576px;
    line-height: 32px;
    font-size: 20px;
  }
}

@media (min-width: 960px) {
  .tagline {
    line-height: 36px;
    font-size: 24px;
  }

  .VPHero.has-image .tagline {
    margin: 0;
  }
}
</style>
