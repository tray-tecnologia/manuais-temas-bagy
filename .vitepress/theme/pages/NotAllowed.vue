<script setup lang="ts">
import { useData, withBase } from 'vitepress';
const { theme } = useData();
</script>

<template>
  <div class="not-allowed">
    <p class="code">{{ theme.notAllowed?.code ?? '403' }}</p>
    <h1 class="title">{{ theme.notAllowed?.title ?? 'PAGE NOT AVAILABLE' }}</h1>
    <div class="divider" />
    <blockquote class="quote">
      {{
        theme.notAllowed?.quote ??
        'The page you are looking for is not available for your platform.'
      }}
    </blockquote>

    <div class="action">
      <a
        class="link"
        :href="withBase(theme.notAllowed?.link ?? '/')"
        :aria-label="theme.notAllowed?.linkLabel ?? 'Go to home'"
      >
        {{ theme.notAllowed?.linkText ?? 'Take me home' }}
      </a>
    </div>
  </div>
</template>

<style scoped>
.not-allowed {
  padding: 64px 24px 96px;
  text-align: center;
}

@media (min-width: 768px) {
  .not-allowed {
    padding: 96px 32px 168px;
  }
}

.code {
  line-height: 64px;
  font-size: 64px;
  font-weight: 600;
}

.title {
  padding-top: 12px;
  letter-spacing: 2px;
  line-height: 20px;
  font-size: 20px;
  font-weight: 700;
}

.divider {
  margin: 24px auto 18px;
  width: 64px;
  height: 1px;
  background-color: var(--vp-c-divider);
}

.quote {
  margin: 0 auto;
  max-width: 256px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.action {
  padding-top: 20px;
}

.link {
  display: inline-block;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 16px;
  padding: 3px 16px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  transition:
    border-color 0.25s,
    color 0.25s;
}

.link:hover {
  border-color: var(--vp-c-brand-2);
  color: var(--vp-c-brand-2);
}
</style>
