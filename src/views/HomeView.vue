<script setup>
import { stages } from '../data/curriculum'
import { algorithms } from '../data/algorithms'
import { demandIndex } from '../data/career'

const entries = [
  {
    to: '/curriculum',
    index: '01',
    title: '学习路径与知识图谱',
    desc: '四个阶段、六大知识层，把大学四年的课程串成一条可执行的主线。',
    featured: true,
    accent: '#4f46e5'
  },
  {
    to: '/algorithms',
    index: '02',
    title: '算法与模型',
    desc: '26 个经典模型，配 Python 实现与适用场景。',
    accent: '#0891b2'
  },
  {
    to: '/applications',
    index: '03',
    title: '应用场景',
    desc: '十个真实行业，看模型如何变成产品与价值。',
    accent: '#059669'
  },
  {
    to: '/trends',
    index: '04',
    title: '发展趋势',
    desc: '从技术演进看未来 5 - 10 年的机会窗口。',
    accent: '#d97706'
  },
  {
    to: '/frameworks',
    index: '05',
    title: '开源框架',
    desc: 'Python 生态主流框架，含介绍、安装与用法。',
    accent: '#7c3aed'
  },
  {
    to: '/career',
    index: '06',
    title: '就业方向',
    desc: '九个热门岗位的需求、技能与面试重点。',
    accent: '#e11d48'
  },
  {
    to: '/graduate',
    index: '07',
    title: '考研方向',
    desc: '方向选择、考试科目与院校梯队的完整参考。',
    accent: '#2563eb'
  }
]

const previewIds = ['linear-regression', 'cnn', 'transformer', 'diffusion', 'llm', 'ppo']
const previewAlgorithms = previewIds
  .map((id) => algorithms.find((a) => a.id === id))
  .filter(Boolean)

const topDemand = demandIndex.slice(0, 5)
</script>

<template>
  <div class="home">
    <!-- Hero -->
    <section class="hero-home">
      <div class="hero-bg" aria-hidden="true">
        <span class="hero-grid"></span>
        <span class="glow glow-a"></span>
        <span class="glow glow-b"></span>
      </div>
      <div class="container hero-grid-2">
        <div class="hero-copy">
          <p class="hero-badge">
            <span class="pulse"></span>
            AI COMPASS · 大学生人工智能学习指南
          </p>
          <h1>
            把人工智能，<br />
            学成一条<span class="gradient-text">清晰的路</span>
          </h1>
          <p class="hero-lead">
            从数学基础到算法实现，从行业落地到就业考研。
            这里回答三个问题：<strong>学什么、怎么学、学完能做什么</strong>。
          </p>
          <div class="hero-actions">
            <router-link to="/curriculum" class="btn btn-primary">查看学习路径</router-link>
            <router-link to="/algorithms" class="btn btn-light">浏览算法实现</router-link>
          </div>
          <ul class="hero-points">
            <li>4 个学习阶段</li>
            <li>26 个算法模型</li>
            <li>24 个开源框架</li>
            <li>9 类就业岗位</li>
          </ul>
        </div>

        <div class="compass-visual" aria-hidden="true">
          <div class="compass-ring ring-3"></div>
          <div class="compass-ring ring-2"></div>
          <div class="compass-ring ring-1"></div>
          <div class="compass-core">
            <span class="core-label">AI</span>
            <span class="core-sub">COMPASS</span>
          </div>
          <span class="orbit-node n1">数学基础</span>
          <span class="orbit-node n2">机器学习</span>
          <span class="orbit-node n3">深度学习</span>
          <span class="orbit-node n4">应用落地</span>
          <span class="orbit-node n5">工程能力</span>
          <span class="dot d1"></span>
          <span class="dot d2"></span>
          <span class="dot d3"></span>
        </div>
      </div>
    </section>

    <!-- 入口 -->
    <section class="section">
      <div class="container">
        <div class="section-head" v-reveal>
          <p class="eyebrow">Start Here</p>
          <h2 class="section-title">七个板块，覆盖从入门到就业</h2>
          <p class="section-desc">
            不用在收藏夹里堆积资料。按顺序走完这几个板块，你会得到一张完整的 AI 学习地图。
          </p>
        </div>

        <div class="entry-grid">
          <router-link
            v-for="(item, i) in entries"
            :key="item.to"
            :to="item.to"
            class="entry-card"
            :class="{ featured: item.featured }"
            :style="{ '--accent': item.accent }"
            v-reveal="i * 55"
          >
            <div class="entry-top">
              <span class="entry-index">{{ item.index }}</span>
              <span class="entry-arrow">↗</span>
            </div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
            <span class="entry-bar"></span>
          </router-link>
        </div>
      </div>
    </section>

    <!-- 学习路线 -->
    <section class="section alt">
      <div class="container">
        <div class="roadmap-head" v-reveal>
          <div class="section-head" style="margin-bottom: 0">
            <p class="eyebrow">Learning Path</p>
            <h2 class="section-title">四年学习主线</h2>
            <p class="section-desc">
              每个阶段都有明确的目标：先建立工具感，再建立模型直觉，最后形成自己的方向与作品。
            </p>
          </div>
          <router-link to="/curriculum" class="btn btn-ghost">查看完整课程体系 →</router-link>
        </div>

        <div class="flow" style="margin-top: 36px">
          <router-link
            v-for="(stage, i) in stages"
            :key="stage.id"
            to="/curriculum"
            class="flow-step"
            v-reveal="i * 70"
          >
            <span class="flow-index">{{ stage.index }}</span>
            <h4>{{ stage.title }}</h4>
            <p>{{ stage.term }}</p>
            <p class="flow-summary">{{ stage.summary.slice(0, 46) }}…</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- 算法预览 -->
    <section class="section">
      <div class="container">
        <div class="roadmap-head" v-reveal>
          <div class="section-head" style="margin-bottom: 0">
            <p class="eyebrow">Algorithms</p>
            <h2 class="section-title">从一行公式到一段代码</h2>
            <p class="section-desc">
              先理解思想，再动手实现。每个模型都配了可运行的最小示例，建议自己敲一遍。
            </p>
          </div>
          <router-link to="/algorithms" class="btn btn-ghost">全部算法 →</router-link>
        </div>

        <div class="algo-preview">
          <router-link
            v-for="(algo, i) in previewAlgorithms"
            :key="algo.id"
            to="/algorithms"
            class="algo-mini"
            v-reveal="i * 50"
          >
            <div class="algo-mini-top">
              <span class="tag tag-indigo">{{ algo.cat }}</span>
              <span class="algo-en">{{ algo.en }}</span>
            </div>
            <h3>{{ algo.name }}</h3>
            <p>{{ algo.idea }}</p>
            <span class="algo-more">查看实现 →</span>
          </router-link>
        </div>
      </div>
    </section>

    <!-- 就业视角 -->
    <section class="section alt">
      <div class="container career-split">
        <div v-reveal>
          <p class="eyebrow">From Campus to Career</p>
          <h2 class="section-title">学到最后，要能回答“你能做什么”</h2>
          <p class="section-desc" style="margin-bottom: 22px">
            岗位需求不是让你焦虑的清单，而是学习优先级的路标。先看市场要什么，再决定把时间投在哪里。
          </p>
          <ul class="check-list">
            <li>
              <span>01</span>
              <div>
                <strong>方向比努力更重要</strong>
                <p>大模型、推荐、视觉、具身智能的需求结构完全不同，先选赛道再堆技能。</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <strong>项目是能力的唯一证据</strong>
                <p>一个讲得清楚的数据闭环项目，胜过十个“调包跑通”的 Demo。</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <strong>工程能力决定上限</strong>
                <p>能训练只是开始，能部署、能优化成本、能稳定迭代才稀缺。</p>
              </div>
            </li>
          </ul>
          <router-link to="/career" class="btn btn-primary" style="margin-top: 26px">
            查看岗位与要求
          </router-link>
        </div>

        <div class="demand-panel" v-reveal="120">
          <div class="demand-head">
            <h3>方向需求指数</h3>
            <span>相对值 · 依据公开招聘岗位归纳</span>
          </div>
          <div class="bar-row dark" v-for="item in topDemand" :key="item.label">
            <span class="bar-label">{{ item.label }}</span>
            <div class="bar-track">
              <div class="bar-fill" :style="{ width: item.value + '%' }"></div>
            </div>
            <span class="bar-value">{{ item.value }}</span>
          </div>
          <p class="demand-foot">
            指数只用于横向比较方向热度，不代表具体薪资或岗位数量。
          </p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section">
      <div class="container">
        <div class="cta-band" v-reveal>
          <div>
            <p class="eyebrow light">Ready to Start</p>
            <h2>从今天的第一行代码开始</h2>
            <p>先选定一个方向，完成一个小项目，再回头补齐理论。这是最快的学习闭环。</p>
          </div>
          <div class="cta-actions">
            <router-link to="/curriculum" class="btn btn-light">进入学习路径</router-link>
            <router-link to="/graduate" class="btn btn-light">了解考研规划</router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Hero */
.hero-home {
  position: relative;
  overflow: hidden;
  background: radial-gradient(120% 130% at 10% 0%, #1a2450 0%, #0a1024 52%, #070b18 100%);
  color: #fff;
}
.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.hero-grid {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse 85% 90% at 40% 10%, #000 10%, transparent 85%);
  -webkit-mask-image: radial-gradient(ellipse 85% 90% at 40% 10%, #000 10%, transparent 85%);
}
.glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
}
.glow-a {
  width: 460px;
  height: 460px;
  top: -180px;
  right: -80px;
  background: radial-gradient(circle, rgba(124, 58, 237, 0.55), transparent 70%);
}
.glow-b {
  width: 420px;
  height: 420px;
  bottom: -220px;
  left: 10%;
  background: radial-gradient(circle, rgba(6, 182, 212, 0.4), transparent 70%);
}
.hero-grid-2 {
  position: relative;
  display: grid;
  grid-template-columns: 1.12fr 0.88fr;
  align-items: center;
  gap: 48px;
  padding-top: 88px;
  padding-bottom: 96px;
}
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 7px 15px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  color: #c3cce4;
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.1em;
}
.pulse {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #22d3ee;
  box-shadow: 0 0 0 0 rgba(34, 211, 238, 0.6);
  animation: pulse 2.2s infinite;
}
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(34, 211, 238, 0.55); }
  70% { box-shadow: 0 0 0 10px rgba(34, 211, 238, 0); }
  100% { box-shadow: 0 0 0 0 rgba(34, 211, 238, 0); }
}
.hero-copy h1 {
  margin-top: 22px;
  color: #fff;
  font-size: clamp(2.3rem, 4.6vw, 3.7rem);
  line-height: 1.16;
  letter-spacing: -0.03em;
}
.hero-lead {
  max-width: 540px;
  margin-top: 22px;
  color: #aeb9d3;
  font-size: 15.5px;
  line-height: 1.9;
}
.hero-lead strong {
  color: #e6ebf8;
  font-weight: 600;
}
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 32px;
}
.hero-points {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 20px;
  margin-top: 34px;
  color: #8494b5;
  font-size: 12.5px;
}
.hero-points li {
  position: relative;
  padding-left: 13px;
}
.hero-points li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.62em;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #6366f1;
}

/* Compass visual */
.compass-visual {
  position: relative;
  width: 100%;
  max-width: 400px;
  aspect-ratio: 1;
  margin: 0 auto;
}
.compass-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(129, 140, 248, 0.22);
}
.ring-1 { inset: 27%; border-color: rgba(129, 140, 248, 0.4); }
.ring-2 { inset: 14%; border-style: dashed; animation: spin 40s linear infinite; }
.ring-3 { inset: 0; border-color: rgba(129, 140, 248, 0.12); }
@keyframes spin {
  to { transform: rotate(360deg); }
}
.compass-core {
  position: absolute;
  left: 50%;
  top: 50%;
  display: grid;
  place-items: center;
  width: 31%;
  height: 31%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(circle at 32% 26%, #8b5cf6, #4f46e5 52%, #0f172e 100%);
  box-shadow: 0 0 0 14px rgba(99, 102, 241, 0.08), 0 24px 60px rgba(79, 70, 229, 0.45);
}
.core-label {
  color: #fff;
  font-size: 30px;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1;
}
.core-sub {
  margin-top: 3px;
  color: #c7d2fe;
  font-size: 7.5px;
  font-weight: 700;
  letter-spacing: 0.28em;
}
.orbit-node {
  position: absolute;
  padding: 7px 13px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 9px;
  background: rgba(17, 25, 48, 0.82);
  color: #c9d4ec;
  font-size: 11.5px;
  font-weight: 500;
  white-space: nowrap;
  backdrop-filter: blur(6px);
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.28);
}
.n1 { top: 1%; left: 50%; transform: translateX(-50%); }
.n2 { top: 30%; right: -4%; }
.n3 { bottom: 17%; right: 1%; }
.n4 { bottom: 4%; left: 43%; transform: translateX(-50%); }
.n5 { top: 37%; left: -4%; }
.dot {
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #22d3ee;
  box-shadow: 0 0 14px rgba(34, 211, 238, 0.9);
}
.d1 { top: 14.5%; left: 30%; }
.d2 { bottom: 27%; right: 24%; }
.d3 { top: 60%; left: 16%; background: #a78bfa; box-shadow: 0 0 14px rgba(167, 139, 250, 0.9); }

/* Entry grid */
.entry-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
}
.entry-card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 24px 22px 22px;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
  box-shadow: var(--shadow-sm);
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}
.entry-card:hover {
  transform: translateY(-4px);
  border-color: #d8def0;
  box-shadow: var(--shadow);
}
.entry-card.featured {
  grid-column: span 2;
  background: linear-gradient(135deg, #111a35 0%, #1b2450 60%, #241b4d 100%);
  border-color: transparent;
}
.entry-card.featured h3 {
  color: #fff;
  font-size: 21px;
}
.entry-card.featured p {
  color: #a9b4cf;
  max-width: 320px;
}
.entry-card.featured .entry-index {
  color: #8ea0c8;
}
.entry-card.featured .entry-arrow {
  color: #c7d2fe;
}
.entry-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.entry-index {
  color: var(--muted-2);
  font-family: var(--font-mono);
  font-size: 11.5px;
  letter-spacing: 0.08em;
}
.entry-arrow {
  color: var(--muted-2);
  font-size: 15px;
  transition: transform 0.2s ease, color 0.2s ease;
}
.entry-card:hover .entry-arrow {
  transform: translate(2px, -2px);
  color: var(--accent);
}
.entry-card h3 {
  margin-bottom: 8px;
  font-size: 16px;
}
.entry-card p {
  color: var(--muted);
  font-size: 13px;
  line-height: 1.75;
}
.entry-bar {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 3px;
  background: var(--accent);
  opacity: 0;
  transform: scaleX(0.3);
  transform-origin: left;
  transition: all 0.3s ease;
}
.entry-card:hover .entry-bar {
  opacity: 1;
  transform: scaleX(1);
}

/* Roadmap */
.roadmap-head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
}
.flow-summary {
  margin-top: 6px;
  color: var(--muted-2) !important;
  font-size: 12px !important;
}

/* Algorithm preview */
.algo-preview {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  margin-top: 36px;
}
.algo-mini {
  display: flex;
  flex-direction: column;
  padding: 22px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
  transition: all 0.24s ease;
}
.algo-mini:hover {
  transform: translateY(-3px);
  border-color: #d5dcf0;
  box-shadow: var(--shadow);
}
.algo-mini-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 12px;
}
.algo-en {
  color: var(--muted-2);
  font-family: var(--font-mono);
  font-size: 10.5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.algo-mini h3 {
  margin-bottom: 8px;
  font-size: 16px;
}
.algo-mini p {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.75;
}
.algo-more {
  margin-top: 14px;
  color: var(--brand);
  font-size: 12.5px;
  font-weight: 600;
}

/* Career split */
.career-split {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 56px;
  align-items: center;
}
.check-list {
  display: grid;
  gap: 18px;
}
.check-list li {
  display: flex;
  gap: 14px;
}
.check-list li > span {
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 9px;
  background: rgba(79, 70, 229, 0.08);
  color: var(--brand);
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
}
.check-list strong {
  display: block;
  margin-bottom: 3px;
  font-size: 14.5px;
}
.check-list p {
  color: var(--muted);
  font-size: 13px;
  line-height: 1.75;
}
.demand-panel {
  padding: 30px;
  border-radius: var(--radius-lg);
  background: linear-gradient(150deg, #111a35 0%, #0b1226 70%);
  box-shadow: var(--shadow-lg);
}
.demand-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 18px;
}
.demand-head h3 {
  color: #fff;
  font-size: 16px;
}
.demand-head span {
  color: #7787a9;
  font-size: 11px;
}
.bar-row.dark .bar-label {
  color: #c3cde4;
}
.bar-track {
  background: #edf0f8;
}
.bar-row.dark .bar-track {
  background: rgba(255, 255, 255, 0.09);
}
.bar-row.dark .bar-value {
  color: #8fa3c9;
}
.bar-row.dark .bar-fill {
  background: linear-gradient(90deg, #6366f1, #22d3ee);
}
.demand-foot {
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  color: #6d7c9c;
  font-size: 11.5px;
  line-height: 1.7;
}

/* CTA */
.cta-band {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
  padding: 48px 44px;
  border-radius: var(--radius-lg);
  background: radial-gradient(120% 160% at 0% 0%, #312e81 0%, #4f46e5 55%, #6d28d9 100%);
  color: #fff;
  box-shadow: 0 26px 60px rgba(79, 70, 229, 0.28);
}
.cta-band h2 {
  color: #fff;
  font-size: clamp(1.5rem, 2.6vw, 2rem);
  margin-bottom: 8px;
}
.cta-band p:not(.eyebrow) {
  max-width: 520px;
  color: #d3d9f7;
  font-size: 14px;
}
.cta-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

@media (max-width: 1024px) {
  .hero-grid-2 {
    grid-template-columns: 1fr;
    gap: 40px;
    padding-top: 64px;
    padding-bottom: 72px;
  }
  .compass-visual {
    max-width: 330px;
  }
  .entry-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .algo-preview { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .career-split { grid-template-columns: 1fr; gap: 40px; }
}

@media (max-width: 720px) {
  .hero-points { display: none; }
  .entry-grid { grid-template-columns: 1fr; }
  .entry-card.featured { grid-column: auto; }
  .algo-preview { grid-template-columns: 1fr; }
  .cta-band { padding: 34px 24px; }
  .compass-visual { max-width: 290px; }
  .orbit-node { font-size: 10.5px; padding: 6px 10px; }
  .n2 { right: -2%; }
  .n5 { left: -2%; }
}
</style>
