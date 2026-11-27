<template>
  <footer class="site-footer">
    <div class="container footer-inner">
      <div class="footer-brand">
        <div class="brand-text">
          <strong>AI Compass</strong>
          <small>为大学生构建的人工智能学习地图</small>
        </div>
        <p>
          从数学基础到算法实现，从应用落地到就业考研，
          用一条清晰的路径回答“人工智能到底该怎么学”。
        </p>
      </div>

      <div class="footer-col">
        <h4>学习</h4>
        <router-link to="/curriculum">课程体系与图谱</router-link>
        <router-link to="/algorithms">常用算法与模型</router-link>
        <router-link to="/frameworks">开源框架</router-link>
        <router-link to="/applications">行业应用场景</router-link>
      </div>

      <div class="footer-col">
        <h4>规划</h4>
        <router-link to="/trends">技术发展趋势</router-link>
        <router-link to="/career">就业岗位要求</router-link>
        <router-link to="/graduate">考研方向与科目</router-link>
      </div>

      <div class="footer-col">
        <h4>说明</h4>
        <p class="footer-note">
          本项目为纯前端学习型网站，所有内容整理自公开课程体系、
          技术文档与行业招聘信息，仅用于学习参考。
        </p>
        <p class="footer-note">内容整理 · 2025 / 2026</p>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container footer-bottom-inner">
        <span>AI Compass · 人工智能学习指南</span>
        <span>Vue 3 + Vite · 纯前端实现</span>
      </div>
    </div>
  </footer>
</template>
