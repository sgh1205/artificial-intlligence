<script setup>
import { computed, ref } from 'vue'
import PageHero from '../components/PageHero.vue'
import SectionHeader from '../components/SectionHeader.vue'
import CodeBlock from '../components/CodeBlock.vue'
import { frameworks, frameworkCategories } from '../data/frameworks'

const activeCat = ref('全部')
const openIds = ref([])

const counts = computed(() => {
  const map = { 全部: frameworks.length }
  frameworks.forEach((f) => {
    map[f.cat] = (map[f.cat] || 0) + 1
  })
  return map
})

const filtered = computed(() =>
  activeCat.value === '全部'
    ? frameworks
    : frameworks.filter((f) => f.cat === activeCat.value)
)

function toggle(id) {
  openIds.value = openIds.value.includes(id)
    ? openIds.value.filter((x) => x !== id)
    : [...openIds.value, id]
}

function catClass(cat) {
  const map = {
    深度学习: 'tag-indigo',
    经典机器学习: 'tag-cyan',
    大模型与生成: 'tag-violet',
    推理与部署: 'tag-rose',
    计算机视觉: 'tag-blue',
    自然语言处理: 'tag-green',
    强化学习: 'tag-amber',
    '工程与 MLOps': 'tag-slate',
    应用界面: 'tag-blue'
  }
  return map[cat] || 'tag-slate'
}
</script>

<template>
  <div class="frameworks">
    <PageHero
      eyebrow="Python Open Source Stack"
      title="站在开源生态上做研究"
      desc="从深度学习框架到推理部署、从大模型应用到底层工程，Python 生态几乎覆盖了 AI 全流程。这里按用途分类整理了主流框架，并给出安装命令与最小用法。"
      :stats="[
        { value: String(frameworks.length), label: '开源框架' },
        { value: '9', label: '使用场景' },
        { value: '2025', label: '生态现状' }
      ]"
    />

    <section class="section">
      <div class="container">
        <SectionHeader
          eyebrow="Framework Map"
          title="按用途选框架，而不是按热度"
          desc="入门建议：PyTorch + scikit-learn + Transformers 三件套先跑通，再根据项目需要补充部署或应用层工具。"
        />

        <div class="filter-bar">
          <button
            v-for="cat in frameworkCategories"
            :key="cat"
            type="button"
            class="chip"
            :class="{ 'is-active': activeCat === cat }"
            @click="activeCat = cat"
          >
            {{ cat }}
            <span class="chip-count">{{ counts[cat] || 0 }}</span>
          </button>
        </div>

        <div class="fw-grid">
          <article
            v-for="(fw, i) in filtered"
            :key="fw.id"
            class="fw-card"
            v-reveal="(i % 2) * 50"
          >
            <header class="fw-head">
              <div class="fw-title">
                <h3>{{ fw.name }}</h3>
                <span v-if="fw.en" class="fw-repo">{{ fw.en }}</span>
              </div>
              <span class="tag" :class="catClass(fw.cat)">{{ fw.cat }}</span>
            </header>

            <p class="fw-desc">{{ fw.desc }}</p>

            <div class="install-line">
              <span class="install-label">安装</span>
              <code>{{ fw.install }}</code>
            </div>

            <div class="fw-links">
              <a :href="fw.repo" target="_blank" rel="noopener noreferrer" class="repo-link">
                <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true">
                  <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38v-1.34c-2.23.48-2.7-1.07-2.7-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.72 1.23 1.88.87 2.34.67.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.83-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.52.56.83 1.28.83 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
                </svg>
                GitHub
              </a>
              <a v-if="fw.doc" :href="fw.doc" target="_blank" rel="noopener noreferrer" class="doc-link">
                官方文档 ↗
              </a>
              <span class="fw-year">since {{ fw.year }}</span>
            </div>

            <button class="code-toggle" type="button" @click="toggle(fw.id)">
              <span class="code-icon">&lt;/&gt;</span>
              {{ openIds.includes(fw.id) ? '收起示例代码' : '查看使用示例' }}
              <span class="chevron" :class="{ open: openIds.includes(fw.id) }">⌄</span>
            </button>

            <div v-if="openIds.includes(fw.id)" class="code-shell">
              <CodeBlock :code="fw.code" :title="`${fw.id}.py`" />
            </div>
          </article>
        </div>

        <div class="note-box" style="margin-top: 30px">
          选择框架的三个原则：先用最少工具跑通闭环；优先选择文档与社区活跃的项目；
          生产环境要额外考虑许可证、维护状态与部署成本。
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.fw-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  align-items: start;
}
.fw-card {
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: 24px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
  box-shadow: var(--shadow-sm);
  transition: border-color 0.22s ease, box-shadow 0.22s ease;
}
.fw-card:hover {
  border-color: #d9e0f0;
  box-shadow: var(--shadow);
}
.fw-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}
.fw-title h3 {
  font-size: 17px;
}
.fw-repo {
  display: block;
  margin-top: 2px;
  color: var(--muted-2);
  font-family: var(--font-mono);
  font-size: 11px;
}
.fw-desc {
  margin-top: 12px;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.8;
}
.install-line {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 14px;
  padding: 9px 12px;
  border: 1px solid #e8ecf6;
  border-radius: 9px;
  background: #f8faff;
  overflow-x: auto;
}
.install-label {
  flex-shrink: 0;
  color: var(--muted-2);
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.06em;
}
.install-line code {
  color: #334155;
  font-family: var(--font-mono);
  font-size: 11.5px;
  white-space: nowrap;
}
.fw-links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px;
  margin-top: 12px;
  font-size: 12px;
}
.repo-link,
.doc-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: var(--brand);
  font-weight: 500;
  transition: opacity 0.18s ease;
}
.repo-link:hover,
.doc-link:hover {
  opacity: 0.72;
}
.fw-year {
  margin-left: auto;
  color: var(--muted-2);
  font-family: var(--font-mono);
  font-size: 10.5px;
}
.code-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  margin-top: 16px;
  padding: 9px 13px;
  border: 1px dashed #cfd8ec;
  border-radius: 9px;
  background: #fbfcff;
  color: var(--ink-2);
  font-size: 12.5px;
  font-weight: 600;
  transition: all 0.2s ease;
}
.code-toggle:hover {
  border-color: var(--brand);
  color: var(--brand);
}
.code-icon {
  color: var(--brand);
  font-family: var(--font-mono);
  font-size: 11px;
}
.chevron {
  margin-left: auto;
  transition: transform 0.2s ease;
}
.chevron.open {
  transform: rotate(180deg);
}
.code-shell {
  margin-top: 12px;
}

@media (max-width: 860px) {
  .fw-grid { grid-template-columns: minmax(0, 1fr); }
}
</style>
