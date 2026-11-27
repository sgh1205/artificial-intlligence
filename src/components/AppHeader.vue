<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const open = ref(false)

const navs = [
  { to: '/', label: '首页' },
  { to: '/curriculum', label: '学习路径' },
  { to: '/algorithms', label: '算法模型' },
  { to: '/applications', label: '应用场景' },
  { to: '/trends', label: '发展趋势' },
  { to: '/frameworks', label: '开源框架' },
  { to: '/career', label: '就业方向' },
  { to: '/graduate', label: '考研方向' }
]

watch(
  () => route.path,
  () => (open.value = false)
)
</script>

<template>
  <header class="site-header">
    <div class="container header-inner">
      <router-link to="/" class="brand" aria-label="AI Compass 首页">
        <span class="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 32 32" fill="none">
            <path d="M8 22 15 8l3 6 3-4 4 12" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
            <circle cx="15" cy="8" r="2.2" fill="currentColor" />
            <circle cx="24" cy="22" r="2.2" fill="currentColor" />
          </svg>
        </span>
        <span class="brand-text">
          <strong>AI Compass</strong>
          <small>人工智能学习指南</small>
        </span>
      </router-link>

      <nav class="main-nav" :class="{ open }" aria-label="主导航">
        <router-link
          v-for="item in navs"
          :key="item.to"
          :to="item.to"
          class="nav-link"
          exact-active-class="active"
        >
          {{ item.label }}
        </router-link>
        <router-link to="/curriculum" class="btn btn-primary nav-cta">开始学习</router-link>
      </nav>

      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="open"
        aria-label="切换菜单"
        @click="open = !open"
      >
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>
</template>
