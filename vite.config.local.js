import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

/**
 * 本地离线打包配置：
 * - 使用 IIFE 普通脚本，避免 file:// 下 ES Module 的跨域限制
 * - 所有资源使用相对路径，双击 dist/index.html 即可访问
 */
export default defineConfig({
  base: './',
  plugins: [vue()],
  build: {
    outDir: 'dist-local',
    emptyOutDir: true,
    target: 'es2018',
    cssCodeSplit: false,
    assetsInlineLimit: 100000000,
    modulePreload: { polyfill: false },
    rollupOptions: {
      output: {
        format: 'iife',
        inlineDynamicImports: true,
        entryFileNames: 'assets/app.js',
        assetFileNames: 'assets/[name][extname]'
      }
    }
  }
})
