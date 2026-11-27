<script setup>
import { computed, ref } from 'vue'
import { highlightPython } from '../utils/highlight'

const props = defineProps({
  code: { type: String, required: true },
  lang: { type: String, default: 'python' },
  title: { type: String, default: '' }
})

const highlighted = computed(() => highlightPython(props.code.trim()))
const copied = ref(false)

async function copy() {
  try {
    await navigator.clipboard.writeText(props.code.trim())
  } catch (e) {
    const area = document.createElement('textarea')
    area.value = props.code.trim()
    document.body.appendChild(area)
    area.select()
    document.execCommand('copy')
    document.body.removeChild(area)
  }
  copied.value = true
  setTimeout(() => (copied.value = false), 1600)
}
</script>

<template>
  <div class="code-block">
    <div class="code-head">
      <span class="code-dots" aria-hidden="true"><i></i><i></i><i></i></span>
      <span class="code-title">{{ title || lang }}</span>
      <button class="code-copy" type="button" @click="copy">
        {{ copied ? '已复制' : '复制代码' }}
      </button>
    </div>
    <pre class="code-body"><code v-html="highlighted"></code></pre>
  </div>
</template>
