import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 纯静态站点：使用相对路径，构建产物可直接部署到任意静态服务器
export default defineConfig({
  base: './',
  plugins: [vue()],
  server: {
    port: 5173,
    open: false
  }
})
