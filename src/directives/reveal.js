/**
 * v-reveal：元素进入视口时淡入上浮，支持延迟。
 * 用法：v-reveal 或 v-reveal="120"
 */
const observer =
  typeof window !== 'undefined' && 'IntersectionObserver' in window
    ? new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed')
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
      )
    : null

export default {
  mounted(el, binding) {
    el.classList.add('reveal')
    const delay = Number(binding.value) || 0
    if (delay) el.style.transitionDelay = `${delay}ms`

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!observer || reduce) {
      el.classList.add('is-revealed')
      return
    }
    observer.observe(el)
  },
  unmounted(el) {
    observer && observer.unobserve(el)
  }
}
