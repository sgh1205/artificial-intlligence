<script setup>
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  desc: { type: String, default: '' },
  stats: { type: Array, default: () => [] }
})
</script>

<template>
  <header class="page-hero">
    <div class="page-hero-bg" aria-hidden="true">
      <span class="orb orb-a"></span>
      <span class="orb orb-b"></span>
      <span class="page-hero-grid"></span>
    </div>
    <div class="container page-hero-inner">
      <p v-if="eyebrow" class="eyebrow light">{{ eyebrow }}</p>
      <h1 class="page-hero-title">{{ title }}</h1>
      <p v-if="desc" class="page-hero-desc">{{ desc }}</p>
      <div v-if="stats.length" class="page-hero-stats">
        <div v-for="s in stats" :key="s.label" class="hero-stat">
          <strong>{{ s.value }}</strong>
          <span>{{ s.label }}</span>
        </div>
      </div>
    </div>
  </header>
</template>
