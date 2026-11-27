<script setup>
import PageHero from '../components/PageHero.vue'
import SectionHeader from '../components/SectionHeader.vue'
import {
  directions,
  examSubjects,
  schoolTiers,
  gradTimeline,
  gradTips
} from '../data/graduate'
</script>

<template>
  <div class="graduate">
    <PageHero
      eyebrow="Graduate Study"
      title="考研不是逃避就业，而是换一条路径"
      desc="选择方向、确认科目、锁定院校，是考研最关键的三个决策。这里把 AI 相关的学科方向、初试科目与院校梯队整理在一起，帮你尽早做出判断。"
      :stats="[
        { value: String(directions.length), label: '可选方向' },
        { value: '4 + 1', label: '初试科目' },
        { value: '3', label: '院校梯队' }
      ]"
    />

    <section class="section">
      <div class="container">
        <SectionHeader
          eyebrow="Directions"
          title="AI 相关考研方向"
          desc="学硕偏研究、专硕偏工程；交叉学科与计算机、控制、数学都有交集。先想清楚读研之后想做什么，再倒推方向。"
        />

        <div class="direction-grid">
          <article
            v-for="(d, i) in directions"
            :key="d.code"
            class="direction-card"
            v-reveal="(i % 2) * 60"
          >
            <header class="direction-head">
              <div class="direction-title">
                <span class="direction-code">{{ d.code }}</span>
                <h3>{{ d.name }}</h3>
              </div>
              <span class="tag tag-indigo">{{ d.type }}</span>
            </header>

            <p class="direction-focus">{{ d.focus }}</p>

            <div class="direction-rows">
              <div>
                <span>初试科目</span>
                <p>{{ d.exam }}</p>
              </div>
              <div>
                <span>代表院校</span>
                <p>{{ d.schools }}</p>
              </div>
              <div>
                <span>适合人群</span>
                <p>{{ d.fit }}</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section alt">
      <div class="container">
        <SectionHeader
          eyebrow="Exam Subjects"
          title="初试到底考什么"
          desc="大部分 AI 相关学硕采用“政治 + 英语一 + 数学一 + 408”，部分院校使用自命题专业课。务必以目标院校当年招生目录为准。"
        />
        <div class="subject-grid">
          <article
            v-for="(s, i) in examSubjects"
            :key="s.name"
            class="subject-card"
            v-reveal="i * 50"
          >
            <div class="subject-head">
              <h3>{{ s.name }}</h3>
              <span class="tag tag-slate">{{ s.code }}</span>
            </div>
            <p class="subject-score">{{ s.score }}</p>
            <p class="subject-content">{{ s.content }}</p>
            <p class="subject-tip">{{ s.tip }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <SectionHeader
          eyebrow="Universities"
          title="院校梯队参考"
          desc="院校选择要综合学科实力、地域、考试难度与导师方向。下面的分层只是粗略参考，具体以最新学科评估与招生简章为准。"
        />
        <div class="school-list">
          <article
            v-for="(tier, i) in schoolTiers"
            :key="tier.tier"
            class="school-card"
            v-reveal="i * 60"
          >
            <div class="school-head">
              <h3>{{ tier.tier }}</h3>
              <p>{{ tier.note }}</p>
            </div>
            <div class="school-tags">
              <span v-for="school in tier.schools" :key="school">{{ school }}</span>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section alt">
      <div class="container">
        <SectionHeader
          eyebrow="Timeline"
          title="备考节奏"
          desc="考研是长周期项目，最怕前松后紧。下面是一条比较稳妥的时间线。"
        />
        <div class="plan-grid">
          <article
            v-for="(item, i) in gradTimeline"
            :key="item.time"
            class="plan-step"
            v-reveal="i * 50"
          >
            <span class="plan-time">{{ item.time }}</span>
            <h4>{{ item.title }}</h4>
            <p>{{ item.desc }}</p>
          </article>
        </div>

        <div class="tips-panel" v-reveal>
          <p class="eyebrow light">Before You Decide</p>
          <h3>做决定前，先确认这五件事</h3>
          <ul class="tips-list">
            <li v-for="tip in gradTips" :key="tip">{{ tip }}</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.direction-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  align-items: start;
}
.direction-card {
  padding: 26px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
  box-shadow: var(--shadow-sm);
  transition: transform 0.22s ease, box-shadow 0.22s ease;
}
.direction-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow);
}
.direction-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}
.direction-title {
  display: flex;
  align-items: center;
  gap: 10px;
}
.direction-code {
  padding: 2px 8px;
  border-radius: 6px;
  background: #eef2ff;
  color: #4338ca;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
}
.direction-head h3 {
  font-size: 17px;
}
.direction-focus {
  margin-top: 12px;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.8;
}
.direction-rows {
  display: grid;
  gap: 10px;
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px dashed var(--line);
}
.direction-rows span {
  display: block;
  color: var(--brand);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
}
.direction-rows p {
  margin-top: 2px;
  color: var(--muted);
  font-size: 12.5px;
  line-height: 1.7;
}

.subject-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  align-items: start;
}
.subject-card {
  padding: 24px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
  box-shadow: var(--shadow-sm);
}
.subject-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}
.subject-head h3 {
  font-size: 15.5px;
}
.subject-score {
  margin-top: 8px;
  color: transparent;
  background: linear-gradient(135deg, #4f46e5, #06b6d4);
  -webkit-background-clip: text;
  background-clip: text;
  font-family: var(--font-mono);
  font-size: 19px;
  font-weight: 700;
}
.subject-content {
  margin-top: 8px;
  color: var(--muted);
  font-size: 12.5px;
  line-height: 1.8;
}
.subject-tip {
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px dashed var(--line);
  color: var(--muted-2);
  font-size: 12px;
  line-height: 1.7;
}

.school-list {
  display: grid;
  gap: 16px;
}
.school-card {
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr);
  gap: 24px;
  padding: 24px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
  box-shadow: var(--shadow-sm);
}
.school-head h3 {
  font-size: 16.5px;
}
.school-head p {
  margin-top: 4px;
  color: var(--muted-2);
  font-size: 12px;
  line-height: 1.7;
}
.school-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-content: start;
}
.school-tags span {
  padding: 5px 12px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: #f8faff;
  color: var(--ink-2);
  font-size: 12.5px;
}

.plan-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}
.plan-step {
  position: relative;
  padding: 22px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
  box-shadow: var(--shadow-sm);
}
.plan-time {
  display: inline-block;
  margin-bottom: 10px;
  padding: 2px 9px;
  border-radius: 6px;
  background: rgba(79, 70, 229, 0.08);
  color: var(--brand);
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
}
.plan-step h4 {
  margin-bottom: 5px;
  font-size: 14.5px;
}
.plan-step p {
  color: var(--muted);
  font-size: 12.5px;
  line-height: 1.75;
}

.tips-panel {
  margin-top: 30px;
  padding: 34px;
  border-radius: var(--radius-lg);
  background: linear-gradient(150deg, #1b2450, #0b1226);
  color: #fff;
}
.tips-panel h3 {
  margin-bottom: 18px;
  color: #fff;
  font-size: 19px;
}
.tips-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px 28px;
}
.tips-list li {
  position: relative;
  padding-left: 18px;
  color: #b7c2d8;
  font-size: 13px;
  line-height: 1.8;
}
.tips-list li::before {
  content: "";
  position: absolute;
  left: 2px;
  top: 0.62em;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22d3ee;
}

@media (max-width: 980px) {
  .subject-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .plan-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .school-card { grid-template-columns: 1fr; gap: 12px; }
}
@media (max-width: 760px) {
  .direction-grid { grid-template-columns: 1fr; }
  .subject-grid { grid-template-columns: 1fr; }
  .plan-grid { grid-template-columns: 1fr; }
  .tips-list { grid-template-columns: 1fr; }
  .tips-panel { padding: 26px; }
}
</style>
