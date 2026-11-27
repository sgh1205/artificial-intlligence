<script setup>
import { computed, ref } from 'vue'
import PageHero from '../components/PageHero.vue'
import SectionHeader from '../components/SectionHeader.vue'
import {
  stages,
  layers,
  graphNodes,
  graphEdges,
  capabilityMatrix
} from '../data/curriculum'

const NODE_W = 118
const NODE_H = 38
const VIEW_W = 1060
const VIEW_H = 680

const nodePositions = computed(() => {
  const map = {}
  layers.forEach((layer, li) => {
    const nodes = graphNodes.filter((n) => n.layer === layer.id)
    const x = 30 + li * 172
    nodes.forEach((node, i) => {
      const slot = (VIEW_H - 100) / (nodes.length + 1)
      const y = 50 + slot * (i + 1) - NODE_H / 2
      map[node.id] = { ...node, x, y, color: layer.color }
    })
  })
  return map
})

const graphLinks = computed(() =>
  graphEdges
    .map(([source, target]) => {
      const s = nodePositions.value[source]
      const t = nodePositions.value[target]
      if (!s || !t) return null
      const x1 = s.x + NODE_W
      const y1 = s.y + NODE_H / 2
      const x2 = t.x
      const y2 = t.y + NODE_H / 2
      const dx = Math.max(30, (x2 - x1) * 0.5)
      return {
        key: `${source}-${target}`,
        source,
        target,
        d: `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`
      }
    })
    .filter(Boolean)
)

const activeId = ref(null)
const hoverId = ref(null)
const focusId = computed(() => hoverId.value || activeId.value)

const neighborIds = computed(() => {
  if (!focusId.value) return new Set()
  const set = new Set([focusId.value])
  graphEdges.forEach(([s, t]) => {
    if (s === focusId.value) set.add(t)
    if (t === focusId.value) set.add(s)
  })
  return set
})

const selected = computed(() =>
  activeId.value ? nodePositions.value[activeId.value] : null
)

const selectedPrereqs = computed(() => {
  if (!selected.value) return []
  return graphEdges
    .filter(([, t]) => t === selected.value.id)
    .map(([s]) => nodePositions.value[s]?.label)
    .filter(Boolean)
})

const selectedNext = computed(() => {
  if (!selected.value) return []
  return graphEdges
    .filter(([s]) => s === selected.value.id)
    .map(([, t]) => nodePositions.value[t]?.label)
    .filter(Boolean)
})

const layerStats = computed(() =>
  layers.map((layer) => ({
    ...layer,
    count: graphNodes.filter((n) => n.layer === layer.id).length
  }))
)

function isDim(id) {
  if (!focusId.value) return false
  return !neighborIds.value.has(id)
}

function isActiveNode(id) {
  return activeId.value === id
}

function isLinkActive(link) {
  if (!focusId.value) return false
  return link.source === focusId.value || link.target === focusId.value
}

function selectNode(node) {
  activeId.value = activeId.value === node.id ? null : node.id
}

function typeClass(type) {
  if (type.includes('核心')) return 'tag-indigo'
  if (type.includes('方向')) return 'tag-violet'
  if (type.includes('前沿')) return 'tag-rose'
  if (type.includes('实践')) return 'tag-blue'
  if (type.includes('推荐')) return 'tag-cyan'
  if (type.includes('选修')) return 'tag-amber'
  if (type.includes('通识')) return 'tag-green'
  return 'tag-slate'
}
</script>

<template>
  <div class="curriculum">
    <PageHero
      eyebrow="Learning Path & Knowledge Graph"
      title="先有一张地图，再开始赶路"
      desc="人工智能不是一门课，而是一组能力的组合。这里把大学四年的课程按依赖关系重新排列，帮你判断“现在该学什么、下一步学什么”。"
      :stats="[
        { value: '4', label: '学习阶段' },
        { value: '6', label: '知识层级' },
        { value: String(graphNodes.length), label: '图谱节点' },
        { value: '3', label: '核心能力' }
      ]"
    />

    <!-- 阶段 -->
    <section class="section">
      <div class="container">
        <SectionHeader
          eyebrow="Stage by Stage"
          title="四个阶段，逐层加深"
          desc="每个阶段都有明确的能力出口。如果某一条没有达成，不要急着进入下一阶段——后面的内容会反复用到它。"
        />

        <div class="timeline">
          <article
            v-for="(stage, i) in stages"
            :key="stage.id"
            class="timeline-item"
            v-reveal="i * 60"
          >
            <div class="timeline-card">
              <div class="timeline-head">
                <div class="stage-title">
                  <span class="stage-index">{{ stage.index }}</span>
                  <h3>{{ stage.title }}</h3>
                </div>
                <span class="timeline-term">{{ stage.term }}</span>
              </div>
              <p class="stage-summary">{{ stage.summary }}</p>

              <div class="course-grid">
                <div v-for="course in stage.courses" :key="course.name" class="course-item">
                  <div class="course-top">
                    <strong>{{ course.name }}</strong>
                    <span class="tag" :class="typeClass(course.type)">{{ course.type }}</span>
                  </div>
                  <p>{{ course.tip }}</p>
                </div>
              </div>

              <div class="stage-outcomes">
                <h4>阶段出口 · 你应该能做到</h4>
                <ul class="bullet-list tight">
                  <li v-for="item in stage.outcomes" :key="item">{{ item }}</li>
                </ul>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- 知识图谱 -->
    <section class="section alt">
      <div class="container">
        <SectionHeader
          eyebrow="Knowledge Graph"
          title="知识不是列表，而是一张依赖网"
          desc="点击任意节点查看它的定位与前后置关系。连线代表“学它之前，最好先掌握它”。"
        />

        <div class="graph-layout">
          <div class="graph-card">
            <div class="graph-legend">
              <span v-for="layer in layerStats" :key="layer.id" class="legend-item">
                <i :style="{ background: layer.color }"></i>
                {{ layer.label }}
                <em>{{ layer.count }}</em>
              </span>
            </div>

            <div class="graph-scroll">
              <svg
                class="graph-svg"
                :viewBox="`0 0 ${VIEW_W} ${VIEW_H}`"
                role="img"
                aria-label="人工智能知识图谱"
              >
                <g class="graph-links">
                  <path
                    v-for="link in graphLinks"
                    :key="link.key"
                    :d="link.d"
                    class="graph-link"
                    :class="{ active: isLinkActive(link) }"
                  />
                </g>

                <g
                  v-for="node in graphNodes"
                  :key="node.id"
                  class="graph-node"
                  :class="{
                    active: isActiveNode(node.id),
                    dim: isDim(node.id),
                    near: focusId && neighborIds.has(node.id) && !isActiveNode(node.id)
                  }"
                  :transform="`translate(${nodePositions[node.id].x}, ${nodePositions[node.id].y})`"
                  role="button"
                  tabindex="0"
                  :aria-label="node.label"
                  @click="selectNode(node)"
                  @keydown.enter.prevent="selectNode(node)"
                  @mouseenter="hoverId = node.id"
                  @mouseleave="hoverId = null"
                  @focus="hoverId = node.id"
                  @blur="hoverId = null"
                >
                  <rect
                    :width="NODE_W"
                    :height="NODE_H"
                    rx="10"
                    class="node-rect"
                    :style="{ '--node-color': nodePositions[node.id].color }"
                  />
                  <circle cx="14" cy="19" r="3.5" class="node-dot" />
                  <text x="26" y="23.5" class="node-label">{{ node.label }}</text>
                </g>
              </svg>
            </div>
            <p class="graph-hint">提示：鼠标悬停可高亮关联路径，点击节点锁定详情。</p>
          </div>

          <aside class="node-panel">
            <template v-if="selected">
              <span class="tag" :style="{ color: selected.color, background: selected.color + '14' }">
                {{ layers.find((l) => l.id === selected.layer)?.label }}
              </span>
              <h3>{{ selected.label }}</h3>
              <p class="node-desc">{{ selected.desc }}</p>
              <div class="node-tip">
                <strong>学习建议</strong>
                <p>{{ selected.tip }}</p>
              </div>
              <div class="node-rel">
                <div>
                  <h4>前置知识</h4>
                  <p v-if="selectedPrereqs.length">{{ selectedPrereqs.join(' · ') }}</p>
                  <p v-else class="muted">起点节点，无强制前置</p>
                </div>
                <div>
                  <h4>可以通向</h4>
                  <p v-if="selectedNext.length">{{ selectedNext.join(' · ') }}</p>
                  <p v-else class="muted">终点节点，用于综合应用</p>
                </div>
              </div>
              <button class="btn btn-ghost btn-sm node-close" type="button" @click="activeId = null">
                取消选中
              </button>
            </template>
            <template v-else>
              <span class="panel-eyebrow">HOW TO READ</span>
              <h3>怎么用这张图谱</h3>
              <ul class="panel-list">
                <li>先看左侧数学与编程，它们是所有路径的起点。</li>
                <li>机器学习是枢纽：几乎每个应用方向都要经过它。</li>
                <li>选定一个方向深入，比横向铺开五个方向更有效。</li>
                <li>工程能力不是“以后再说”，它决定你能否落地。</li>
              </ul>
              <p class="panel-note">
                节点共 {{ graphNodes.length }} 个、依赖关系 {{ graphEdges.length }} 条，点击任意节点查看详情。
              </p>
            </template>
          </aside>
        </div>
      </div>
    </section>

    <!-- 能力矩阵 -->
    <section class="section">
      <div class="container">
        <SectionHeader
          eyebrow="Capability Matrix"
          title="课程最终要转化成能力"
          desc="成绩单不能直接证明能力。用下面这张表自查：每项能力，你能拿出什么作品或经历来证明？"
        />
        <div class="table-wrap" v-reveal>
          <table class="data-table">
            <thead>
              <tr>
                <th style="width: 22%">能力维度</th>
                <th>支撑课程</th>
                <th style="width: 30%">可验证的信号</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in capabilityMatrix" :key="row.ability">
                <td><strong>{{ row.ability }}</strong></td>
                <td>{{ row.courses }}</td>
                <td>{{ row.signal }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="note-box" style="margin-top: 22px">
          建议每学期末回到这张表做一次自评：哪一项还停留在“学过”，而不是“做过”。
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.stage-title {
  display: flex;
  align-items: center;
  gap: 12px;
}
.stage-index {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 9px;
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.12), rgba(6, 182, 212, 0.12));
  color: var(--brand);
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 700;
}
.stage-summary {
  margin-top: 8px;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.8;
}
.course-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-top: 18px;
}
.course-item {
  padding: 13px 15px;
  border: 1px solid var(--line);
  border-radius: 11px;
  background: var(--surface-2);
  transition: border-color 0.2s ease, background 0.2s ease;
}
.course-item:hover {
  border-color: #d5dcf0;
  background: #fff;
}
.course-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.course-top strong {
  font-size: 13.5px;
  font-weight: 600;
}
.course-top .tag {
  font-size: 10.5px;
  padding: 2px 7px;
}
.course-item p {
  margin-top: 4px;
  color: var(--muted-2);
  font-size: 12px;
  line-height: 1.65;
}
.stage-outcomes {
  margin-top: 20px;
  padding: 16px 18px;
  border-radius: 11px;
  background: #f8faff;
  border: 1px dashed #d8e0f3;
}
.stage-outcomes h4 {
  margin-bottom: 8px;
  color: var(--ink-2);
  font-size: 12.5px;
  letter-spacing: 0.04em;
}
.stage-outcomes .bullet-list {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 4px 18px;
}

/* Graph */
.graph-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  gap: 20px;
  align-items: start;
}
.graph-card {
  min-width: 0;
  padding: 18px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
  box-shadow: var(--shadow-sm);
}
.graph-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
  margin-bottom: 8px;
  padding: 2px 6px 10px;
  border-bottom: 1px solid #eef1f8;
}
.legend-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--muted);
  font-size: 11.5px;
}
.legend-item i {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.legend-item em {
  color: var(--muted-2);
  font-style: normal;
  font-family: var(--font-mono);
  font-size: 10px;
}
.graph-scroll {
  max-width: 100%;
  overflow-x: auto;
  padding-bottom: 4px;
}
.graph-svg {
  display: block;
  width: 100%;
  min-width: 880px;
  height: auto;
}
.graph-link {
  fill: none;
  stroke: #d9e0ef;
  stroke-width: 1.4;
  transition: stroke 0.2s ease, stroke-width 0.2s ease, opacity 0.2s ease;
}
.graph-link.active {
  stroke: #6366f1;
  stroke-width: 2.2;
  opacity: 1;
}
.graph-node {
  cursor: pointer;
  outline: none;
  transition: opacity 0.22s ease;
}
.graph-node.dim {
  opacity: 0.28;
}
.node-rect {
  fill: #fff;
  stroke: #e2e8f4;
  stroke-width: 1.2;
  transition: fill 0.2s ease, stroke 0.2s ease, filter 0.2s ease;
}
.graph-node.near .node-rect {
  stroke: var(--node-color);
  stroke-width: 1.6;
}
.graph-node.active .node-rect {
  fill: var(--node-color);
  stroke: var(--node-color);
  filter: drop-shadow(0 6px 12px rgba(79, 70, 229, 0.28));
}
.node-dot {
  fill: var(--node-color);
}
.graph-node.active .node-dot {
  fill: #fff;
}
.node-label {
  fill: #26324b;
  font-family: var(--font-sans);
  font-size: 12.5px;
  font-weight: 500;
  pointer-events: none;
}
.graph-node.active .node-label {
  fill: #fff;
  font-weight: 600;
}
.graph-hint {
  margin-top: 6px;
  padding: 0 6px;
  color: var(--muted-2);
  font-size: 11.5px;
}

.node-panel {
  position: sticky;
  top: 90px;
  padding: 24px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: linear-gradient(160deg, #fff, #f8faff);
  box-shadow: var(--shadow-sm);
}
.node-panel h3 {
  margin: 12px 0 8px;
  font-size: 18px;
}
.panel-eyebrow {
  color: var(--muted-2);
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.1em;
}
.node-desc {
  color: var(--muted);
  font-size: 13.5px;
  line-height: 1.8;
}
.node-tip {
  margin-top: 16px;
  padding: 12px 14px;
  border-radius: 10px;
  background: #eef2ff;
}
.node-tip strong {
  display: block;
  margin-bottom: 3px;
  color: #4338ca;
  font-size: 12px;
}
.node-tip p {
  color: #4c5675;
  font-size: 12.5px;
  line-height: 1.7;
}
.node-rel {
  display: grid;
  gap: 12px;
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid var(--line);
}
.node-rel h4 {
  margin-bottom: 3px;
  color: var(--ink-2);
  font-size: 12px;
}
.node-rel p {
  color: var(--muted);
  font-size: 12.5px;
  line-height: 1.7;
}
.node-rel .muted {
  color: var(--muted-2);
}
.node-close {
  width: 100%;
  margin-top: 20px;
}
.panel-list {
  display: grid;
  gap: 10px;
  margin-top: 14px;
}
.panel-list li {
  position: relative;
  padding-left: 16px;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.75;
}
.panel-list li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.62em;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--brand), var(--cyan));
}
.panel-note {
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid var(--line);
  color: var(--muted-2);
  font-size: 11.5px;
  line-height: 1.7;
}

@media (max-width: 980px) {
  .graph-layout { grid-template-columns: minmax(0, 1fr); }
  .node-panel { position: static; }
}
@media (max-width: 720px) {
  .course-grid { grid-template-columns: 1fr; }
  .stage-outcomes .bullet-list { grid-template-columns: 1fr; }
}
</style>
