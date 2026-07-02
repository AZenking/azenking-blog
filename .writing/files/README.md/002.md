# Ethan Young Blog

Ethan Young 的个人博客与内容归档站点，基于 Astro、React 和 Tailwind CSS 构建。现在更偏向个人内容门户：文章、短笔记、项目、照片、标签和友链统一收拢在一个暗色编辑部风格的站点里。

当前视觉方向参考 `DESIGN.md`：近黑画布、巨大 `<EY />` 字标、mint / ultraviolet 硬色块、1px 边框、StoryStream 时间线和紧凑的内容调度台。站点只保留暗色单主题，不再提供主题切换。

## 来源与致谢

本项目 fork 自 [Dnzzk2/Litos](https://github.com/Dnzzk2/Litos)，在原作者 [Dnzzk2](https://github.com/Dnzzk2) 的 Astro 博客主题基础上改造为 Ethan Young 的个人站点（首页、视觉、Header/Footer、内容入口、主题逻辑、文案等）。

## 技术栈

| 分类 | 方案 |
| --- | --- |
| 框架 | Astro 5 |
| 交互组件 | React 19 |
| 样式 | Tailwind CSS 4 |
| 内容 | Astro Content Collections, MDX |
| 代码高亮 | Astro Expressive Code |
| 搜索 | Pagefind |
| 评论 | Gitalk |
| 图片处理 | Sharp, Astro Assets |
| 格式化与检查 | Biome, Astro Check |

## 主要功能

- 首页内容调度台：展示最新文章、最新笔记和精选项目。
- 文章归档：支持 MDX、标签、分页、上一篇/下一篇、相关文章、阅读统计和评论。
- 短笔记：用于保存更轻量的技术片段、配置记录和日常备忘。
- 项目页：展示个人项目、源码链接、站点链接、星标和分叉数据。
- 照片页：基于本地图片资产的瀑布流照片归档。
- 标签页：按主题聚合文章。
- 友链页：维护常访问或推荐的朋友站点。
- RSS / Atom：自动生成订阅源。
- SEO：站点地图、robots.txt、Open Graph 图片和基础 meta 信息。
- 暗色单主题：当前项目不再维护 light mode 或主题切换逻辑。

## 快速开始

推荐使用 Node.js 20+ 和 pnpm。

```bash
pnpm install
pnpm dev
```

开发服务器默认运行在：

```text
http://localhost:4321
```

生产构建：

```bash
pnpm build
pnpm preview
```

## 常用脚本

| 命令 | 说明 |
| --- | --- |
| `pnpm dev` | 启动 Astro 开发服务器 |
| `pnpm check` | 运行 Astro 类型与模板检查 |
| `pnpm build` | 执行 `astro check`、静态构建和 Pagefind 索引生成 |
| `pnpm preview` | 本地预览 `dist` 构建结果 |
| `pnpm format` | 使用 Biome 自动格式化 |
| `pnpm format:check` | 检查代码格式 |
| `pnpm lint` | 运行 Biome lint |

## 目录结构

```text
.
├── astro.config.ts          # Astro 集成与构建配置
├── DESIGN.md                # 当前视觉设计系统说明
├── content/
│   ├── posts/               # 长文章
│   ├── notes/               # 短笔记
│   └── projects/            # 项目条目
├── plugins/                 # Remark / Rehype 扩展
├── public/
│   ├── avatar.svg           # 站点头像
│   ├── og-image.webp        # 默认 Open Graph 图片
│   └── fonts/               # 本地字体
└── src/
    ├── components/          # 基础组件、照片流、文章组件
    ├── layouts/             # Header、Footer、Layout
    ├── lib/                 # 内容读取、SEO、RSS、照片数据
    ├── pages/               # 路由页面
    ├── styles/              # 全局样式、文章样式、LQIP 样式
    ├── config.ts            # 站点、页面、评论、分析、友链配置
    └── content.config.ts    # Astro 内容集合 schema
```

## 配置

站点的主要配置集中在 [src/config.ts](src/config.ts)。

### 站点信息

```ts
export const SITE = {
  title: 'Ethan Young',
  description: 'Ethan Young 的个人博客...',
  website: 'https://www.ethyoung.me/',
  lang: 'zh-CN',
  author: 'Ethan',
  ogImage: '/og-image.webp',
  transition: false,
}
```

### 页面配置

`src/config.ts` 中还包含：

- `POSTS_CONFIG`：文章页标题、分页、前后篇文案、字数统计等。
- `TAGS_CONFIG`：标签页标题、描述和介绍。
- `PROJECTS_CONFIG`：项目页标题、描述和介绍。
- `PHOTOS_CONFIG`：照片页标题、描述和介绍。
- `FRIENDS_CONFIG` / `FRIEND_LINKS`：友链页面和友链数据。
- `SOCIAL_LINKS`：页脚社交链接。
- `COMMENT_CONFIG`：Gitalk 评论配置。
- `ANALYTICS_CONFIG`：访问统计和第三方分析配置。

## 环境变量

Gitalk 使用 GitHub OAuth App。若启用评论，需要在本地或部署平台配置：

```bash
PUBLIC_GITHUB_CLIENT_ID=your-github-client-id
PUBLIC_GITHUB_CLIENT_SECRET=your-github-client-secret
```

这些变量会被 `COMMENT_CONFIG.gitalk` 读取。生产环境中不要把真实密钥提交到仓库。

## 内容写作

### 文章

文章位于 `content/posts/<slug>/index.mdx`。

```mdx
---
title: '文章标题'
description: '文章摘要，用于列表、SEO 和 RSS。'
pubDate: 2026-03-20
updatedDate: 2026-03-20
author: 'Ethan Young'
tags: ['Tech', 'Frontend']
cover: assets/cover.png
ogImage: assets/og-image.png
recommend: false
pinned: false
draft: false
---

正文内容。
```

常用字段：

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `title` | 是 | 标题 |
| `description` | 是 | 摘要 |
| `pubDate` | 是 | 发布日期 |
| `updatedDate` | 否 | 更新日期 |
| `tags` | 否 | 标签数组 |
| `author` | 否 | 作者，默认使用配置中的作者 |
| `cover` | 否 | 文章封面图 |
| `ogImage` | 否 | 社交分享图 |
| `recommend` | 否 | 是否推荐 |
| `pinned` | 否 | 是否置顶 |
| `draft` | 否 | 是否草稿；草稿不会出现在列表中 |

### 笔记

笔记位于 `content/notes/<slug>/index.mdx`，frontmatter 与文章集合一致。笔记更适合保存短内容，例如命令片段、配置记录、踩坑备忘和轻量想法。

### 项目

项目位于 `content/projects/<slug>/index.mdx`。

```mdx
---
name: 'Magi'
description: 'A Simple & Modern Blog Theme for Astro.'
githubUrl: 'https://github.com/AZenking/magi'
website: 'https://ethyoung.me/'
type: 'image'
icon: 'assets/magi.png'
imageClass: 'w-10 h-10'
star: 0
fork: 0
draft: false
---
```

### 照片

照片资源放在 `src/assets/photos/`，照片集合在 [src/lib/photos.ts](src/lib/photos.ts) 中维护。新增照片时需要：

1. 将图片放入 `src/assets/photos/`。
2. 在 `src/lib/photos.ts` 中 import 图片。
3. 把图片加入 `PhotosList`，填写 `alt`、尺寸和比例。

## 设计系统

当前项目的视觉规则记录在 [DESIGN.md](DESIGN.md)。核心约束：

- 只保留暗色单主题。
- 近黑背景承载内容，避免装饰性渐变和光晕。
- mint 是主强调色，用于 CTA、选中态和少数高注意力卡片。
- ultraviolet 只作为硬色块和辅助品牌色，不作为暗底正文色。
- `--theme-link-hover` 用于普通链接 hover，减少黄色滥用。
- 边框以低透明度 1px 线条建立结构，不使用重阴影。
- 首页采用 Dispatch + StoryStream，而不是纯品牌落地页。

主要样式变量在 [src/styles/global.css](src/styles/global.css)：

```css
--theme-bg: #101010;
--theme-surface: #131313;
--theme-surface-soft: #1b1b1b;
--theme-accent: #3cffd0;
--theme-secondary: #5200ff;
--theme-highlight: #f1f333;
--theme-link-hover: #5f8cff;
```

## 构建与部署

本项目是静态站点，构建产物输出到 `dist/`。

```bash
pnpm build
```

构建过程会执行：

1. `astro check`
2. `astro build`
3. `pagefind --site dist`

可以部署到 Vercel、Netlify、Cloudflare Pages 或任意静态托管服务。部署平台需要使用：

```text
Build command: pnpm build
Output directory: dist
```

## 已知构建提示

当前构建可能出现以下 warning：

- `Cannot load icon set for "prefix"`：来自 Iconify/Tailwind 图标集解析提示。
- `tmux` 代码块语言 fallback：Expressive Code 未内置 `tmux` 语言，会回退到 `txt`。
- `gitalk` chunk 偏大：Gitalk 客户端包体积较大。

这些提示不会阻断构建。

## 许可证

本项目基于 MIT License。详见 [LICENSE](LICENSE)。
