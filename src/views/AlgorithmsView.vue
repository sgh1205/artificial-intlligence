<script setup>
import { computed, ref } from 'vue'
import PageHero from '../components/PageHero.vue'
import SectionHeader from '../components/SectionHeader.vue'
import CodeBlock from '../components/CodeBlock.vue'
import { algorithms, algorithmCategories } from '../data/algorithms'

const activeCat = ref('全部')
const keyword = ref('')
const openIds = ref([])

const counts = computed(() => {
  const map = { 全部: algorithms.length }
  algorithms.forEach((a) => {
    map[a.cat] = (map[a.cat] || 0) + 1
  })
  return map
})

const filtered = computed(() => {
  const kw = keyword.value.trim().toLowerCase()
  return algorithms.filter((a) => {
    const catOk = activeCat.value === '全部' || a.cat === activeCat.value
    if (!catOk) return false
    if (!kw) return true
    return [a.name, a.en, a.idea, a.usage, ...a.tags]
      .join(' ')
      .toLowerCase()
      .includes(kw)
  })
})

function toggleCode(id) {
  openIds.value = openIds.value.includes(id)
    ? openIds.value.filter((x) => x !== id)
    : [...openIds.value, id]
}

function levelClass(level) {
  return level === '入门'
    ? 'tag-green'
    : level === '进阶'
      ? 'tag-amber'
      : 'tag-rose'
}

function fileTitle(algo) {
  return `${algo.id.replace(/-/g, '_')}.py`
}
</script>

<template>
  <div class="algorithms">
    <PageHero
      eyebrow="Algorithms & Models"
      title="先把一个模型彻底搞懂"
      desc="从线性回归到扩散模型，这里按照学习顺序整理了经典算法：核心思想、典型用途与可运行的 Python 实现。不要只读代码，把它敲一遍、改一改，再观察结果的变化。"
      :stats="[
        { value: String(algorithms.length), label: '算法与模型' },
        { value: '7', label: '任务类别' },
        { value: '100%', label: 'Python 示例' }
      ]"
    />

    <section class="section">
      <div class="container">
        <SectionHeader
          eyebrow="Model Library"
          title="算法库"
          desc="按任务类型筛选，或直接搜索模型名称。代码为教学用的最小实现，工程中请结合成熟库与测试。"
        />

        <div class="filter-row">
          <div class="filter-bar">
            <button
              v-for="cat in algorithmCategories"
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
          <input
            v-model="keyword"
            class="search-input"
            type="search"
            placeholder="搜索模型、任务或关键词…"
            aria-label="搜索算法"
          />
        </div>

        <p class="result-line">
          共 <strong>{{ filtered.length }}</strong> 个模型
          <span v-if="keyword">· 关键词“{{ keyword }}”</span>
        </p>

        <div v-if="filtered.length" class="algo-grid">
          <article
            v-for="(algo, i) in filtered"
            :key="algo.id"
            class="algo-card"
            v-reveal="(i % 2) * 60"
          >
            <header class="algo-head">
              <div>
                <h3>{{ algo.name }}</h3>
                <p class="algo-en">{{ algo.en }}</p>
              </div>
              <span class="tag" :class="levelClass(algo.level)">{{ algo.level }}</span>
            </header>

            <div class="meta-row">
              <span class="tag tag-indigo">{{ algo.cat }}</span>
              <span class="tag tag-slate" v-for="tag in algo.tags" :key="tag">{{ tag }}</span>
            </div>

            <p class="algo-idea">{{ algo.idea }}</p>

            <div class="algo-usage">
              <span>典型用途</span>
              <p>{{ algo.usage }}</p>
            </div>

            <button class="code-toggle" type="button" @click="toggleCode(algo.id)">
              <span class="code-icon">&lt;/&gt;</span>
              {{ openIds.includes(algo.id) ? '收起实现代码' : '查看 Python 实现' }}
              <span class="chevron" :class="{ open: openIds.includes(algo.id) }">⌄</span>
            </button>

            <div v-if="openIds.includes(algo.id)" class="code-shell">
              <CodeBlock :code="algo.code" :title="fileTitle(algo)" />
            </div>
          </article>
        </div>

        <div v-else class="empty-state">
          没有匹配的模型，换个关键词或切换类别试试。
        </div>

        <div class="note-box" style="margin-top: 30px">
          学习建议：每个模型都问自己三个问题——它解决什么问题？它的假设是什么？什么情况下会失效？
          能回答这三点，比记住 API 更有价值。
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.filter-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 10px;
}
.filter-row .filter-bar {
  margin-bottom: 0;
}
.search-input {
  width: 260px;
  padding: 9px 15px;
  border: 1px solid var(--line-strong);
  border-radius: 999px;
  background: var(--surface);
  color: var(--ink);
  font-size: 13.5px;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.search-input::placeholder {
  color: var(--muted-2);
}
.search-input:focus {
  border-color: rgba(79, 70, 229, 0.6);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}
.result-line {
  margin: 10px 0 20px;
  color: var(--muted-2);
  font-size: 12.5px;
}
.result-line strong {
  color: var(--brand);
}
.algo-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  align-items: start;
}
.algo-card {
  min-width: 0;
  padding: 26px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
  box-shadow: var(--shadow-sm);
  transition: border-color 0.22s ease, box-shadow 0.22s ease;
}
.algo-card:hover {
  border-color: #d9e0f0;
  box-shadow: var(--shadow);
}
.algo-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}
.algo-head h3 {
  font-size: 18px;
}
.algo-en {
  margin-top: 2px;
  color: var(--muted-2);
  font-family: var(--font-mono);
  font-size: 11.5px;
}
.meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 14px;
}
.algo-idea {
  margin-top: 14px;
  color: var(--muted);
  font-size: 13.5px;
  line-height: 1.85;
}
.algo-usage {
  margin-top: 14px;
  padding: 11px 14px;
  border-radius: 10px;
  background: #f8faff;
  border: 1px solid #eef1f8;
}
.algo-usage span {
  color: var(--brand);
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.04em;
}
.algo-usage p {
  margin-top: 2px;
  color: var(--muted);
  font-size: 12.5px;
  line-height: 1.7;
}
.code-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  margin-top: 18px;
  padding: 10px 14px;
  border: 1px dashed #cfd8ec;
  border-radius: 10px;
  background: #fbfcff;
  color: var(--ink-2);
  font-size: 12.5px;
  font-weight: 600;
  transition: all 0.2s ease;
}
.code-toggle:hover {
  border-color: var(--brand);
  color: var(--brand);
  background: #f6f7ff;
}
.code-icon {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--brand);
}
.chevron {
  margin-left: auto;
  transition: transform 0.2s ease;
  font-size: 14px;
}
.chevron.open {
  transform: rotate(180deg);
}
.code-shell {
  margin-top: 12px;
}
.empty-state {
  padding: 60px 20px;
  border: 1px dashed var(--line-strong);
  border-radius: var(--radius);
  color: var(--muted);
  text-align: center;
  font-size: 14px;
  background: var(--surface);
}

@media (max-width: 860px) {
  .algo-grid { grid-template-columns: minmax(0, 1fr); }
  .search-input { width: 100%; }
}
</style>
