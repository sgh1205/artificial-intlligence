<script setup>
import PageHero from '../components/PageHero.vue'
import SectionHeader from '../components/SectionHeader.vue'
import {
  marketNotes,
  demandIndex,
  skillFrequency,
  jobs,
  careerTimeline,
  careerTips
} from '../data/career'

function heatClass(heat) {
  if (heat.includes('极高')) return 'tag-rose'
  if (heat.includes('很高')) return 'tag-violet'
  if (heat.includes('稀缺')) return 'tag-cyan'
  if (heat.includes('高')) return 'tag-amber'
  if (heat.includes('中高')) return 'tag-blue'
  if (heat.includes('新兴')) return 'tag-cyan'
  if (heat.includes('稳定')) return 'tag-green'
  return 'tag-slate'
}
</script>

<template>
  <div class="career">
    <PageHero
      eyebrow="Career Paths"
      title="市场需要什么样的 AI 人"
      desc="岗位需求会变化，但底层判断不会：能找到问题、能做出东西、能讲清价值。下面从岗位数量、技能要求与面试重点三个维度，帮你定位自己的方向。"
      :stats="[
        { value: String(jobs.length), label: '热门岗位' },
        { value: '8', label: '需求方向' },
        { value: '4 年', label: '准备周期' }
      ]"
    />

    <section class="section">
      <div class="container">
        <SectionHeader
          eyebrow="Market View"
          title="先看清市场的三个事实"
          desc="就业不是“学完 AI 就有人要”，而是把你的能力匹配到具体的岗位缺口上。"
        />
        <div class="insight-grid">
          <article
            v-for="(note, i) in marketNotes"
            :key="note.title"
            class="insight-card"
            v-reveal="i * 60"
          >
            <span class="tag tag-indigo">{{ note.tag }}</span>
            <h3>{{ note.title }}</h3>
            <p>{{ note.desc }}</p>
          </article>
        </div>

        <div class="metric-panel" v-reveal>
          <div class="metric-col">
            <h3>方向需求指数</h3>
            <p class="metric-note">相对值，用于方向比较，不代表具体岗位数量</p>
            <div class="bar-row" v-for="item in demandIndex" :key="item.label">
              <span class="bar-label">{{ item.label }}</span>
              <div class="bar-track">
                <div class="bar-fill" :style="{ width: item.value + '%' }"></div>
              </div>
              <span class="bar-value">{{ item.value }}</span>
            </div>
          </div>
          <div class="metric-col">
            <h3>招聘要求高频项</h3>
            <p class="metric-note">依据公开岗位 JD 归纳的能力出现频率</p>
            <div class="bar-row" v-for="item in skillFrequency" :key="item.label">
              <span class="bar-label">{{ item.label }}</span>
              <div class="bar-track">
                <div class="bar-fill alt" :style="{ width: item.value + '%' }"></div>
              </div>
              <span class="bar-value">{{ item.value }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section alt">
      <div class="container">
        <SectionHeader
          eyebrow="Job Profiles"
          title="九类岗位的真实要求"
          desc="薪资为一线城市校招 / 初阶社招的参考区间，会随公司、学历与能力浮动。重点看能力结构，而不是数字。"
        />

        <div class="job-grid">
          <article
            v-for="(job, i) in jobs"
            :key="job.id"
            class="job-card"
            v-reveal="(i % 2) * 50"
          >
            <header class="job-head">
              <div>
                <h3>{{ job.title }}</h3>
                <p class="job-en">{{ job.en }}</p>
              </div>
              <span class="tag" :class="heatClass(job.heat)">{{ job.heat }}</span>
            </header>

            <div class="job-facts">
              <div>
                <span>薪资参考</span>
                <strong>{{ job.salary }}</strong>
              </div>
              <div>
                <span>学历</span>
                <strong>{{ job.degree }}</strong>
              </div>
              <div>
                <span>城市</span>
                <strong>{{ job.cities }}</strong>
              </div>
            </div>

            <p class="job-summary">{{ job.summary }}</p>

            <div class="job-block">
              <h4>核心技能</h4>
              <div class="meta-row">
                <span v-for="s in job.skills" :key="s" class="tag tag-slate">{{ s }}</span>
              </div>
            </div>

            <div class="job-lists">
              <div>
                <h4>加分项</h4>
                <ul class="bullet-list tight">
                  <li v-for="p in job.plus" :key="p">{{ p }}</li>
                </ul>
              </div>
              <div>
                <h4>面试常考</h4>
                <ul class="bullet-list tight">
                  <li v-for="q in job.interview" :key="q">{{ q }}</li>
                </ul>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <SectionHeader
          eyebrow="Prepare Early"
          title="从大一就开始的求职节奏"
          desc="求职不是大四才开始的冲刺，而是四年里不断积累可验证成果的过程。"
        />
        <div class="flow timeline-flow">
          <article
            v-for="(item, i) in careerTimeline"
            :key="item.year"
            class="flow-step"
            v-reveal="i * 60"
          >
            <span class="flow-index">{{ item.year }}</span>
            <h4>{{ item.title }}</h4>
            <p>{{ item.desc }}</p>
          </article>
        </div>

        <div class="tips-panel" v-reveal>
          <div class="tips-head">
            <p class="eyebrow">Practical Tips</p>
            <h3>写在简历之前，先想清楚这些</h3>
          </div>
          <ul class="tips-list">
            <li v-for="(tip, i) in careerTips" :key="tip">
              <span>{{ String(i + 1).padStart(2, '0') }}</span>
              {{ tip }}
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.insight-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}
.insight-card {
  padding: 26px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
  box-shadow: var(--shadow-sm);
}
.insight-card h3 {
  margin: 13px 0 7px;
  font-size: 16.5px;
}
.insight-card p {
  color: var(--muted);
  font-size: 13px;
  line-height: 1.8;
}
.metric-panel {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 40px;
  margin-top: 26px;
  padding: 30px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
  box-shadow: var(--shadow-sm);
}
.metric-col h3 {
  font-size: 16px;
}
.metric-note {
  margin: 4px 0 16px;
  color: var(--muted-2);
  font-size: 11px;
  line-height: 1.6;
}
.bar-fill.alt {
  background: linear-gradient(90deg, #06b6d4, #059669);
}

.job-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  align-items: start;
}
.job-card {
  padding: 26px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
  box-shadow: var(--shadow-sm);
  transition: transform 0.22s ease, box-shadow 0.22s ease;
}
.job-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow);
}
.job-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}
.job-head h3 {
  font-size: 17.5px;
}
.job-en {
  margin-top: 2px;
  color: var(--muted-2);
  font-family: var(--font-mono);
  font-size: 10.5px;
}
.job-facts {
  display: grid;
  grid-template-columns: 1fr 0.8fr 1.3fr;
  gap: 10px;
  margin-top: 16px;
  padding: 12px 14px;
  border-radius: 10px;
  background: #f8faff;
  border: 1px solid #eef1f8;
}
.job-facts span {
  display: block;
  color: var(--muted-2);
  font-size: 10.5px;
  letter-spacing: 0.03em;
}
.job-facts strong {
  display: block;
  margin-top: 2px;
  color: var(--ink-2);
  font-size: 12px;
  font-weight: 600;
  line-height: 1.5;
}
.job-summary {
  margin-top: 14px;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.8;
}
.job-block {
  margin-top: 14px;
}
.job-block h4,
.job-lists h4 {
  margin-bottom: 7px;
  color: var(--ink-2);
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.04em;
}
.meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.job-lists {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px dashed var(--line);
}
.timeline-flow {
  margin-top: 8px;
}
.tips-panel {
  display: grid;
  grid-template-columns: 0.9fr 1.6fr;
  gap: 40px;
  margin-top: 40px;
  padding: 34px;
  border-radius: var(--radius-lg);
  background: linear-gradient(150deg, #111a35, #0b1226);
  color: #fff;
}
.tips-head h3 {
  color: #fff;
  font-size: 19px;
  line-height: 1.5;
}
.tips-list {
  display: grid;
  gap: 14px;
  align-content: start;
}
.tips-list li {
  display: flex;
  gap: 14px;
  color: #b7c2d8;
  font-size: 13px;
  line-height: 1.8;
}
.tips-list li span {
  flex-shrink: 0;
  color: #6d7ea3;
  font-family: var(--font-mono);
  font-size: 11px;
  padding-top: 1px;
}

@media (max-width: 900px) {
  .insight-grid { grid-template-columns: 1fr; }
  .metric-panel { grid-template-columns: 1fr; gap: 30px; padding: 24px; }
  .job-grid { grid-template-columns: 1fr; }
  .tips-panel { grid-template-columns: 1fr; gap: 22px; padding: 26px; }
  .job-lists { grid-template-columns: 1fr; gap: 14px; }
}
</style>
