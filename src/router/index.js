import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: { title: '首页', nav: '首页' }
  },
  {
    path: '/curriculum',
    name: 'curriculum',
    component: () => import('../views/CurriculumView.vue'),
    meta: { title: '课程体系与知识图谱', nav: '学习路径' }
  },
  {
    path: '/algorithms',
    name: 'algorithms',
    component: () => import('../views/AlgorithmsView.vue'),
    meta: { title: '常用算法与模型', nav: '算法模型' }
  },
  {
    path: '/applications',
    name: 'applications',
    component: () => import('../views/ApplicationsView.vue'),
    meta: { title: '应用场景', nav: '应用场景' }
  },
  {
    path: '/trends',
    name: 'trends',
    component: () => import('../views/TrendsView.vue'),
    meta: { title: '发展趋势', nav: '发展趋势' }
  },
  {
    path: '/frameworks',
    name: 'frameworks',
    component: () => import('../views/FrameworksView.vue'),
    meta: { title: '开源框架', nav: '开源框架' }
  },
  {
    path: '/career',
    name: 'career',
    component: () => import('../views/CareerView.vue'),
    meta: { title: '就业方向', nav: '就业' }
  },
  {
    path: '/graduate',
    name: 'graduate',
    component: () => import('../views/GraduateView.vue'),
    meta: { title: '考研方向', nav: '考研' }
  },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  }
})

router.afterEach((to) => {
  document.title = to.meta.title
    ? `${to.meta.title} · AI Compass`
    : 'AI Compass · 人工智能学习指南'
})

export default router
