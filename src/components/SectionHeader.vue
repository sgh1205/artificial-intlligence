<script setup>
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  desc: { type: String, default: '' },
  align: { type: String, default: 'left' }
})
</script>

<template>
  <div class="section-head" :class="`align-${align}`">
    <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
    <h2 class="section-title">{{ title }}</h2>
    <p v-if="desc" class="section-desc">{{ desc }}</p>
    <slot />
  </div>
</template>
