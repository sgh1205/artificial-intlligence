import fs from 'node:fs'
import path from 'node:path'

/**
 * 将 Vite 的 IIFE 产物整理为可直接双击打开的 dist：
 * - 使用相对路径引用 assets 下的 JS / CSS
 * - 去掉 type="module" 与 crossorigin，规避 file:// 的模块跨域限制
 */
const root = process.cwd()
const buildDir = path.join(root, 'dist-local')
const outputDir = path.join(root, 'dist')

fs.rmSync(outputDir, { recursive: true, force: true })
fs.cpSync(buildDir, outputDir, { recursive: true })

const htmlPath = path.join(outputDir, 'index.html')
let html = fs.readFileSync(htmlPath, 'utf8')

// 移除 modulepreload 预加载（file:// 下会因模块加载策略失败）
html = html.replace(/<link\b[^>]*rel="modulepreload"[^>]*>\s*/g, '')

// 把 module 脚本改成普通脚本，并去掉 crossorigin（否则 file:// 会按 CORS 处理）
// 同时加上 defer：普通脚本默认会阻塞解析，脚本在 head 中执行时 #app 尚未创建
html = html.replace(/<script\b([^>]*)><\/script>/g, (tag, attrs) => {
  if (!/\bsrc=/.test(attrs)) return tag
  const cleaned = attrs
    .replace(/\s+type="module"/g, '')
    .replace(/\s+crossorigin(="[^"]*")?/g, '')
    .replace(/\s+defer(="[^"]*")?/g, '')
  return `<script defer${cleaned}></script>`
})

// 去掉样式等标签上的 crossorigin
html = html.replace(/\scrossorigin(="[^"]*")?/g, '')

if (/type="module"/.test(html) || /crossorigin/.test(html)) {
  throw new Error('仍存在 module / crossorigin 标记，转换失败')
}
if (!/src="\.\/assets\//.test(html) || !/href="\.\/assets\//.test(html)) {
  throw new Error('资源未使用相对路径，请检查 Vite base 配置')
}

fs.writeFileSync(htmlPath, html, 'utf8')

// 额外产出单文件版 release/index.html：JS / CSS 全部内联，可单独分发
const appJs = fs.readFileSync(path.join(outputDir, 'assets/app.js'), 'utf8')
const styleCss = fs.readFileSync(path.join(outputDir, 'assets/style.css'), 'utf8')
const releaseDir = path.join(root, 'release')

// 注意：替换内容用函数返回，避免代码里的 $& / $' 被当成替换模式
const singleFile = html
  .replace(/<link\b[^>]*href="\.\/assets\/style\.css"[^>]*>/, () => `<style>\n${styleCss}\n</style>`)
  .replace(/<script\b[^>]*src="\.\/assets\/app\.js"[^>]*><\/script>/, '')
  .replace('</body>', () => `<script>\n${appJs}\n</script>\n</body>`)

if (!singleFile.includes(appJs) || !singleFile.includes(styleCss)) {
  throw new Error('单文件版内联失败：JS / CSS 内容不完整')
}

fs.mkdirSync(releaseDir, { recursive: true })
fs.writeFileSync(path.join(releaseDir, 'index.html'), singleFile, 'utf8')

fs.rmSync(buildDir, { recursive: true, force: true })

console.log('✅ 已生成本地可访问版本: dist/index.html（相对路径引用 assets）')
console.log('✅ 已生成单文件版本: release/index.html（无任何外部依赖）')
console.log('   直接双击任一 index.html 即可在浏览器中打开，无需服务器。')
