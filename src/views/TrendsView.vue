<script setup>
import PageHero from '../components/PageHero.vue'
import SectionHeader from '../components/SectionHeader.vue'
import { trends, macroTrends, studentActions } from '../data/trends'
</script>

<template>
  <div class="trends">
    <PageHero
      eyebrow="Technology Outlook"
      title="看清技术演进，才不会被热点牵着走"
      desc="趋势不是预言，而是判断“哪些能力会增值”的依据。下面的判断从技术路线出发，标注了成熟度与风险，帮助你把学习投资放在更长的周期里。"
      :stats="[
        { value: String(trends.length), label: '技术方向' },
        { value: '2025-2032', label: '观察窗口' },
        { value: '3', label: '长期判断' }
      ]"
    />

    <section class="section">
      <div class="container">
        <SectionHeader
          eyebrow="Macro Shifts"
          title="三条更底层的迁移"
          desc="具体技术会变，但下面这三种结构性变化，会在未来几年持续影响每一个 AI 从业者。"
        />
        <div class="macro-grid">
          <article
            v-for="(m, i) in macroTrends"
            :key="m.index"
            class="macro-card"
            v-reveal="i * 70"
          >
            <span class="macro-index">{{ m.index }}</span>
            <h3>{{ m.title }}</h3>
            <p>{{ m.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section alt">
      <div class="container">
        <SectionHeader
          eyebrow="Tech Radar"
          title="九个值得持续关注的方向"
          desc="成熟度是相对判断：越高代表越接近规模化落地，越低代表越偏研究与早期探索。不代表价值高低。"
        />

        <div class="trend-grid">
          <article
            v-for="(t, i) in trends"
            :key="t.id"
            class="trend-card"
            v-reveal="(i % 2) * 60"
          >
            <header class="trend-head">
              <div>
                <span class="horizon">{{ t.horizon }}</span>
                <h3>{{ t.title }}</h3>
                <p class="trend-en">{{ t.en }}</p>
              </div>
              <span class="maturity-tag">{{ t.maturityLabel }}</span>
            </header>

            <div class="maturity">
              <div class="maturity-bar">
                <span :style="{ width: t.maturity + '%' }"></span>
              </div>
              <span class="maturity-value">成熟度 {{ t.maturity }}%</span>
            </div>

            <p class="trend-summary">{{ t.summary }}</p>

            <ul class="trend-points">
              <li v-for="p in t.points" :key="p">{{ p }}</li>
            </ul>

            <div class="trend-advice">
              <strong>对学生的意义</strong>
              <p>{{ t.advice }}</p>
            </div>

            <p class="trend-risk">
              <span>风险</span>{{ t.risk }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <SectionHeader
          eyebrow="What You Can Do"
          title="把趋势翻译成行动"
          desc="不要因为“未来不确定”而停在原地。无论技术怎么变，下面这些动作都不会白做。"
        />
        <div class="action-grid">
          <article
            v-for="(item, i) in studentActions"
            :key="item.phase"
            class="action-card"
            v-reveal="i * 70"
          >
            <span class="action-phase">{{ item.phase }}</span>
            <ul class="bullet-list">
              <li v-for="a in item.actions" :key="a">{{ a }}</li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.macro-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}
.macro-card {
  position: relative;
  padding: 28px 26px;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: linear-gradient(160deg, #fff, #f8faff);
  box-shadow: var(--shadow-sm);
}
.macro-index {
  display: block;
  margin-bottom: 14px;
  color: transparent;
  background: linear-gradient(135deg, #4f46e5, #06b6d4);
  -webkit-background-clip: text;
  background-clip: text;
  font-family: var(--font-mono);
  font-size: 24px;
  font-weight: 700;
}
.macro-card h3 {
  margin-bottom: 8px;
  font-size: 17px;
}
.macro-card p {
  color: var(--muted);
  font-size: 13.5px;
  line-height: 1.85;
}

.trend-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  align-items: start;
}
.trend-card {
  padding: 26px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
  box-shadow: var(--shadow-sm);
  transition: transform 0.22s ease, box-shadow 0.22s ease;
}
.trend-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow);
}
.trend-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}
.horizon {
  color: var(--brand);
  font-family: var(--font-mono);
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.04em;
}
.trend-head h3 {
  margin: 3px 0 2px;
  font-size: 18px;
}
.trend-en {
  color: var(--muted-2);
  font-family: var(--font-mono);
  font-size: 11px;
}
.maturity-tag {
  flex-shrink: 0;
  padding: 3px 10px;
  border-radius: 999px;
  background: rgba(5, 150, 105, 0.09);
  color: var(--green);
  font-size: 11.5px;
  font-weight: 600;
  white-space: nowrap;
}
.maturity {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 16px 0 14px;
}
.maturity-bar {
  flex: 1;
  height: 6px;
  overflow: hidden;
  border-radius: 999px;
  background: #edf0f8;
}
.maturity-bar span {
  display: block;
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #4f46e5, #06b6d4);
}
.maturity-value {
  color: var(--muted-2);
  font-family: var(--font-mono);
  font-size: 10.5px;
  white-space: nowrap;
}
.trend-summary {
  color: var(--muted);
  font-size: 13.5px;
  line-height: 1.85;
}
.trend-points {
  display: grid;
  gap: 6px;
  margin-top: 14px;
}
.trend-points li {
  position: relative;
  padding-left: 15px;
  color: var(--ink-2);
  font-size: 12.5px;
  line-height: 1.7;
}
.trend-points li::before {
  content: "";
  position: absolute;
  left: 1px;
  top: 0.62em;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--brand);
  opacity: 0.6;
}
.trend-advice {
  margin-top: 16px;
  padding: 12px 14px;
  border-radius: 10px;
  background: #eef2ff;
}
.trend-advice strong {
  display: block;
  margin-bottom: 2px;
  color: #4338ca;
  font-size: 11.5px;
}
.trend-advice p {
  color: #4c5675;
  font-size: 12.5px;
  line-height: 1.7;
}
.trend-risk {
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px dashed var(--line);
  color: var(--muted-2);
  font-size: 12px;
  line-height: 1.7;
}
.trend-risk span {
  margin-right: 8px;
  color: var(--rose);
  font-weight: 600;
}

.action-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}
.action-card {
  padding: 26px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
  box-shadow: var(--shadow-sm);
}
.action-phase {
  display: inline-block;
  margin-bottom: 14px;
  padding: 3px 11px;
  border-radius: 999px;
  background: rgba(79, 70, 229, 0.08);
  color: var(--brand);
  font-size: 11.5px;
  font-weight: 700;
}

@media (max-width: 900px) {
  .macro-grid { grid-template-columns: 1fr; }
  .trend-grid { grid-template-columns: 1fr; }
  .action-grid { grid-template-columns: 1fr; }
}
</style>
