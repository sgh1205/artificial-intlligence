<script setup>
import PageHero from '../components/PageHero.vue'
import SectionHeader from '../components/SectionHeader.vue'
import { applications } from '../data/applications'
</script>

<template>
  <div class="applications">
    <PageHero
      eyebrow="Real-World Applications"
      title="模型只有进入场景，才产生价值"
      desc="下面十个方向来自真实行业需求。每个场景都拆成“问题 — 技术 — 案例 — 价值 — 挑战”，帮你看清算法工程师到底在解决什么。"
      :stats="[
        { value: '10', label: '行业方向' },
        { value: '50+', label: '落地场景' },
        { value: '30+', label: '技术组合' }
      ]"
    />

    <section class="section">
      <div class="container">
        <SectionHeader
          eyebrow="Industry Map"
          title="十个正在被 AI 改变的行业"
          desc="注意每个场景下面的“挑战”——真实的工程难题往往不在论文里，而在数据、成本与合规里。"
        />

        <div class="app-grid">
          <article
            v-for="(app, i) in applications"
            :key="app.id"
            class="app-card"
            v-reveal="(i % 2) * 60"
          >
            <header class="app-head">
              <span class="app-mark" :style="{ background: app.accent + '14', color: app.accent }">
                {{ app.mono }}
              </span>
              <div>
                <h3>{{ app.name }}</h3>
                <p class="app-count">{{ app.scenarios.length }} 个典型场景</p>
              </div>
            </header>

            <p class="app-summary">{{ app.summary }}</p>

            <div class="app-block">
              <h4>典型场景</h4>
              <div class="scenario-list">
                <span v-for="s in app.scenarios" :key="s">{{ s }}</span>
              </div>
            </div>

            <div class="app-block">
              <h4>常用技术</h4>
              <div class="meta-row">
                <span v-for="t in app.techs" :key="t" class="tag tag-slate">{{ t }}</span>
              </div>
            </div>

            <div class="case-box" :style="{ borderLeftColor: app.accent }">
              <strong>落地案例 · {{ app.caseTitle }}</strong>
              <p>{{ app.caseDesc }}</p>
            </div>

            <div class="app-bottom">
              <div>
                <h4>业务价值</h4>
                <p>{{ app.value }}</p>
              </div>
            </div>

            <div class="app-block">
              <h4>真实挑战</h4>
              <ul class="challenge-list">
                <li v-for="c in app.challenges" :key="c">{{ c }}</li>
              </ul>
            </div>
          </article>
        </div>

        <div class="note-box" style="margin-top: 30px">
          想清楚一个场景是否适合 AI，可以问四个问题：数据是否可得？错误代价能否承受？
          是否有明确的评估指标？人工流程是否值得被替代或增强？
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.app-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  align-items: start;
}
.app-card {
  display: flex;
  flex-direction: column;
  padding: 26px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
  box-shadow: var(--shadow-sm);
  transition: border-color 0.22s ease, box-shadow 0.22s ease, transform 0.22s ease;
}
.app-card:hover {
  transform: translateY(-3px);
  border-color: #d9e0f0;
  box-shadow: var(--shadow);
}
.app-head {
  display: flex;
  align-items: center;
  gap: 14px;
}
.app-mark {
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border-radius: 13px;
  font-size: 19px;
  font-weight: 700;
  flex-shrink: 0;
}
.app-head h3 {
  font-size: 18px;
}
.app-count {
  margin-top: 1px;
  color: var(--muted-2);
  font-size: 11.5px;
}
.app-summary {
  margin-top: 15px;
  color: var(--muted);
  font-size: 13.5px;
  line-height: 1.85;
}
.app-block {
  margin-top: 16px;
}
.app-block h4 {
  margin-bottom: 7px;
  color: var(--ink-2);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.05em;
}
.scenario-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.scenario-list span {
  padding: 4px 10px;
  border-radius: 7px;
  background: #f4f6fc;
  color: #4b5877;
  font-size: 12px;
}
.meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.case-box {
  margin-top: 16px;
  padding: 13px 16px;
  border-left: 3px solid var(--brand);
  border-radius: 8px;
  background: #f8faff;
}
.case-box strong {
  display: block;
  color: var(--ink-2);
  font-size: 12.5px;
}
.case-box p {
  margin-top: 3px;
  color: var(--muted);
  font-size: 12.5px;
  line-height: 1.75;
}
.app-bottom {
  display: grid;
  gap: 14px;
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px dashed var(--line);
}
.app-bottom h4 {
  margin-bottom: 3px;
  color: var(--ink-2);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.05em;
}
.app-bottom p {
  color: var(--muted);
  font-size: 12.5px;
  line-height: 1.7;
}
.challenge-list {
  display: grid;
  gap: 5px;
}
.challenge-list li {
  position: relative;
  padding-left: 14px;
  color: var(--muted);
  font-size: 12.5px;
  line-height: 1.7;
}
.challenge-list li::before {
  content: "!";
  position: absolute;
  left: 2px;
  top: 0;
  color: var(--rose);
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
}

@media (max-width: 860px) {
  .app-grid { grid-template-columns: 1fr; }
}
</style>
