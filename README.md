# AI Compass · 人工智能学习指南

面向大学生的**纯前端** AI 学习指南：把「学什么、怎么练、能做什么、怎么选方向」串成一条清晰的路径。内容覆盖课程体系与知识图谱、常用算法与 Python 实现、真实应用场景、技术趋势、Python 开源框架，以及就业与考研方向。

项目无后端、无数据库、无运行时网络请求，构建产物**双击 `index.html` 即可离线浏览**。

## 目录

- [功能一览](#功能一览)
- [内容规模](#内容规模)
- [技术栈](#技术栈)
- [目录结构](#目录结构)
- [环境要求](#环境要求)
- [开发说明](#开发说明)
- [构建与部署](#构建与部署)
- [内容维护](#内容维护)
- [常见问题](#常见问题)

## 功能一览

| 路由 | 页面 | 主要内容 |
| --- | --- | --- |
| `/` | 首页 | 定位与学习入口、四阶段路径概览、全站导航卡片 |
| `/curriculum` | 学习路径 | 数学 / 编程 / 核心 / 工程四阶段路线，可交互知识图谱（节点 + 依赖关系），能力矩阵 |
| `/algorithms` | 算法模型 | 经典算法与模型，按分类筛选，附 Python 实现代码（可展开）与要点说明 |
| `/applications` | 应用场景 | 从实际业务出发的落地场景：问题、方案、技术栈、效果指标 |
| `/trends` | 发展趋势 | 宏观判断与技术趋势，附「学生现在可以做什么」的行动建议 |
| `/frameworks` | 开源框架 | Python 生态主流框架：定位、适用场景、安装与最小示例、代码仓库地址 |
| `/career` | 就业方向 | 招聘需求量大的岗位、能力要求、技能词频、成长时间线 |
| `/graduate` | 考研方向 | 报考方向、初试/复试科目、院校梯度、备考节奏 |

全站使用 hash 路由（`#/algorithms` 这类地址），因此无论本地双击还是部署到静态托管，刷新和直达都不会 404。

## 内容规模

| 模块 | 数据文件 | 内容量 |
| --- | --- | --- |
| 学习路径 | `src/data/curriculum.js` | 4 个阶段、28 个知识节点、39 条依赖关系、能力矩阵 |
| 算法模型 | `src/data/algorithms.js` | 26 个算法 / 模型，8 个分类 |
| 应用场景 | `src/data/applications.js` | 10 个落地场景 |
| 发展趋势 | `src/data/trends.js` | 3 个宏观判断、9 个技术趋势 |
| 开源框架 | `src/data/frameworks.js` | 24 个 Python 框架，10 个分类 |
| 就业方向 | `src/data/career.js` | 9 类岗位、需求指数、技能频率、成长时间线 |
| 考研方向 | `src/data/graduate.js` | 7 个方向、考试科目、3 档院校、备考时间线 |

## 技术栈

- **Vue 3.5**：全部使用 `<script setup>` 单文件组件，无状态管理库（页面内容为静态数据，不需要 Pinia）
- **Vue Router 4**：`createWebHashHistory`，路由 `meta.title` 同步页面标题
- **Vite 6**：开发服务器与构建
- **原生 CSS**：`src/styles/main.css` 中的 CSS 变量构建设计系统（配色、圆角、阴影、字体栈），无 UI 组件库，响应式适配移动端
- **自研轻量能力**：
  - `src/utils/highlight.js`：Python 语法高亮（正则分词，约 100 行，不引入 highlight.js / Prism）
  - `src/directives/reveal.js`：`v-reveal` 指令，基于 `IntersectionObserver` 的滚动淡入，自动尊重 `prefers-reduced-motion`
- **零外部资源**：不加载 CDN、外部字体或远程图片，所有内容内置于 JS 数据文件

## 目录结构

```text
artificial-intlligence/
├─ index.html                  # 开发入口，挂载 #app
├─ package.json
├─ vite.config.js              # 开发服务器 + 标准 Web 构建（build:web）
├─ vite.config.local.js        # 本地双击版构建（IIFE 输出、相对路径）
├─ scripts/
│  └─ build-local.mjs          # 产物后处理：改写脚本标签、生成单文件版
├─ src/
│  ├─ main.js                  # 应用入口，注册路由与 v-reveal
│  ├─ App.vue                  # 布局骨架（页头 / 路由出口 / 页脚）
│  ├─ router/index.js          # 路由表、标题、滚动行为
│  ├─ components/              # AppHeader、AppFooter、PageHero、SectionHeader、CodeBlock
│  ├─ directives/reveal.js     # 滚动淡入指令
│  ├─ utils/highlight.js       # Python 语法高亮
│  ├─ styles/main.css          # 全局样式与设计变量
│  ├─ data/                    # 7 份内容数据（改内容优先改这里）
│  └─ views/                   # 8 个页面组件
├─ dist/                       # 构建产物：相对路径版，双击可用
│  ├─ index.html
│  └─ assets/
│     ├─ app.js
│     └─ style.css
└─ release/
   └─ index.html               # 单文件版，JS/CSS 全内联，可单独分发
```

## 环境要求

| 项目 | 要求 |
| --- | --- |
| Node.js | ≥ 18（推荐 20 LTS） |
| npm | ≥ 9 |
| 浏览器 | 现代浏览器：Chrome / Edge 88+、Firefox 78+、Safari 14+ |
| 其他 | 无需 Python、无需后端服务；仅首次安装依赖时需要网络 |

## 开发说明

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器（默认 http://localhost:5173）
npm run dev
```

开发服务器支持热更新：修改 `src/views`、`src/data`、`src/styles` 下的文件会立即反映到浏览器。

常用命令：

| 命令 | 作用 |
| --- | --- |
| `npm run dev` | 启动开发服务器（端口 5173，见 `vite.config.js`） |
| `npm run build` | 生成本地双击版 `dist/` 与单文件版 `release/index.html` |
| `npm run build:local` | 与 `npm run build` 完全相同 |
| `npm run build:web` | 生成标准 Web 构建（ES Module，输出到 `dist/`） |
| `npm run preview` | 预览 `dist/` 产物 |

## 构建与部署

### 1. 本地双击版（默认交付方式）

```bash
npm run build
```

产出两个可用的入口，均支持**直接双击、无需服务器、可离线**：

| 产物 | 说明 | 体积（约） |
| --- | --- | --- |
| `dist/index.html` | 引用同目录 `assets/app.js`、`assets/style.css`，全部为相对路径 | JS 234 KB（gzip 93 KB）、CSS 50 KB（gzip 9.7 KB） |
| `release/index.html` | 单文件版，JS/CSS 全部内联，适合微信/U 盘单独传一个文件 | 279 KB |

实现要点（`vite.config.local.js` + `scripts/build-local.mjs`）：

1. `base: './'`：资源使用 `./assets/...` 相对路径，放在任意目录、任意子目录都能打开。
2. Rollup 输出 `format: 'iife'` + `inlineDynamicImports: true`：把动态路由组件打进单个经典脚本。
3. 后处理去掉 `type="module"`、`crossorigin`、`modulepreload`，并给脚本加 `defer`：
   - `file://` 协议下浏览器会按 CORS 规则拦截 ES Module，这是双击空白页的根因；
   - 脚本位于 `<head>`，加 `defer` 才能保证执行时 `<div id="app">` 已创建。
4. `scripts/build-local.mjs` 会校验产物中不再出现 `type="module"` / `crossorigin`，且资源确为相对路径，否则构建失败。

> 注意：`npm run build` 与 `npm run build:web` 都输出到 `dist/`，后一次会覆盖前一次。需要同时保留两种产物时，先取走 `dist/`，或改用 `npx vite build --outDir dist-web` 指定其他目录。

### 2. 部署到静态服务器 / 对象存储

```bash
npm run build:web      # 标准 ES Module 产物，输出到 dist/
```

把 `dist/` 目录整体上传到 Nginx、Apache、对象存储（OSS / COS / S3）、GitHub Pages、Vercel、Netlify 等任意静态托管即可。因为是 hash 路由，**不需要**配置 history 回退规则。

Nginx 参考配置：

```nginx
server {
    listen 80;
    server_name ai-compass.example.com;
    root /var/www/ai-compass;   # 指向 dist 目录
    index index.html;

    # hash 路由本身不需要 try_files；若将来改为 history 模式则必须保留
    location / {
        try_files $uri $uri/ /index.html;
    }

    gzip on;
    gzip_types text/css application/javascript application/json image/svg+xml;
}
```

部署在子路径（如 `https://example.com/ai/`）时无需改配置，`base: './'` 已兼容相对引用。

### 3. 本地验证产物

- 双击：直接打开 `dist/index.html` 或 `release/index.html`。
- 走 HTTP：`npm run preview`（内置 Vite 预览服务器），用于确认与线上表现一致。

## 内容维护

内容与视图分离，绝大多数调整只需要改 `src/data/*.js`：

| 想修改 | 修改位置 |
| --- | --- |
| 课程阶段、知识图谱节点与连线 | `src/data/curriculum.js` |
| 算法条目、Python 示例代码 | `src/data/algorithms.js` |
| 应用场景 | `src/data/applications.js` |
| 技术趋势 | `src/data/trends.js` |
| 框架列表、安装命令、仓库地址 | `src/data/frameworks.js` |
| 岗位、技能、时间线 | `src/data/career.js` |
| 考研方向、科目、院校 | `src/data/graduate.js` |
| 主题色、圆角、阴影、字体 | `src/styles/main.css` 顶部 `:root` 变量 |
| 全站导航 | `src/components/AppHeader.vue` 的 `navs` |

新增一个页面的步骤：

1. 在 `src/views/` 新建 `XxxView.vue`；
2. 在 `src/router/index.js` 的 `routes` 中注册路由，并填写 `meta.title`（用于浏览器标题）；
3. 在 `src/components/AppHeader.vue` 的 `navs` 中加一项导航；
4. 如需新数据，在 `src/data/` 新建数据文件并在页面中引入。

内容改动完成后重新执行 `npm run build` 更新 `dist/` 与 `release/`。

## 常见问题

**双击 `index.html` 是空白页？**
请确认打开的是构建产物：`dist/index.html` 或 `release/index.html`。项目根目录的 `index.html` 是开发入口（引用 `/src/main.js`），必须配合 `npm run dev` 使用。

**部署后刷新页面 404？**
本项目使用 hash 路由，正常不会出现。若出现，说明访问的是去掉 `#` 的路径，按上文的 Nginx 配置补充 `try_files` 即可。

**能否完全离线使用？**
可以。构建产物不发起任何网络请求，不加载外部字体与 CDN；字体使用系统字体栈。

**为什么 `dist` 里的 JS 是一个大文件？**
为了保证 `file://` 下可用，构建时关闭了代码分割并把动态路由全部内联（`inlineDynamicImports`）。若只需线上部署，用 `npm run build:web` 即可恢复正常的分包构建。

## 说明

本项目内容用于学习路线参考与方法梳理；招聘需求量、薪资、考试科目、院校信息等会随年份变化，请以官方公告和当年招生简章为准。示例代码为教学用途，未做工程级健壮性处理。
