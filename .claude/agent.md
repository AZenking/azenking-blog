# Magi - Agent 配置文件

## 项目概述

Magi 是一个现代化的个人博客主题，使用 **Astro 5** + **React 19** + **TailwindCSS 4** 构建。

- **仓库**: https://github.com/AZenking/magi
- **作者**: Ethan Yang (yy921010)
- **类型**: 个人博客/作品集主题

---

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Astro | 5.6.1 | 静态站点生成 |
| React | 19.0.0 | 交互组件 |
| TailwindCSS | 4.0.12 | 样式系统 |
| TypeScript | 5.x | 类型安全 |
| pnpm | - | 包管理器 |
| Biome | 2.4.10 | 代码格式化/Lint |

---

## 项目结构

```
Magi/
├── content/              # Markdown 内容
│   ├── posts/           # 博客文章
│   ├── projects/        # 项目展示
│   └── notes/           # 笔记
├── public/              # 静态资源
│   ├── fonts/          # 字体文件
│   ├── js/             # 客户端脚本
│   └── rss/            # RSS 订阅
├── src/
│   ├── components/      # 组件库
│   │   ├── base/       # 基础组件
│   │   ├── home/       # 首页组件
│   │   ├── photos/     # 照片组件
│   │   ├── posts/      # 文章相关组件
│   │   ├── reactbits/  # React 交互组件
│   │   └── theme/      # 主题组件
│   ├── layouts/        # 页面布局
│   ├── lib/            # 工具函数
│   ├── pages/          # 路由页面
│   ├── stores/         # 状态管理
│   ├── styles/         # 全局样式
│   ├── assets/         # 资源文件
│   ├── config.ts       # 主配置文件
│   ├── content.config.ts
│   ├── types.ts        # 类型定义
│   └── env.d.ts        # 环境变量类型
├── plugins/            # Astro 插件
├── biome.json          # Biome 配置
├── astro.config.ts     # Astro 配置
└── tsconfig.json       # TypeScript 配置
```

---

## 可用脚本

```bash
# 开发
pnpm dev              # 启动开发服务器 (http://localhost:4321)

# 构建
pnpm build            # 生产构建
pnpm preview          # 预览构建产物

# 代码检查
pnpm check            # Astro 类型检查
pnpm format           # Biome 格式化
pnpm format:check     # Biome 格式检查
pnpm lint             # Biome 代码检查
```

---

## 代码规范

### 格式化规则 (Biome)

```json
{
  "indentStyle": "space",
  "indentWidth": 2,
  "lineWidth": 140,
  "semicolons": "asNeeded",
  "quoteStyle": "single",
  "jsxQuoteStyle": "double",
  "trailingCommas": "all"
}
```

### 组件规范

- **Astro 组件**: 使用 `.astro` 扩展名
- **React 组件**: 交互式组件使用 `.tsx` 扩展名
- **命名**: PascalCase (如 `TableOfContents.astro`)
- **文件组织**: 按功能分组 (base/posts/photos/theme)

### 导入路径别名

```typescript
// 配置的路径别名
import { SITE } from '~/config'      // src/config.ts
import { xxx } from '~/lib/utils'    // src/lib/utils.ts
import { xxx } from '~/types'        // src/types.ts
import { xxx } from '~/stores/theme' // src/stores/theme.ts
```

---

## 核心配置文件

### `src/config.ts` - 主配置

```typescript
// 站点信息
export const SITE: Site = {
  title: 'Ethan Yang',
  description: '...',
  website: 'https://ethyoung.me/',
  author: 'Ethan',
  // ...
}

// 导航链接
export const HEADER_LINKS: Link[] = [...]
export const FOOTER_LINKS: Link[] = [...]

// 社交链接
export const SOCIAL_LINKS: SocialLink[] = [...]

// 各功能模块配置
export const SKILLSSHOWCASE_CONFIG: SkillsShowcaseConfig
export const GITHUB_CONFIG: GithubConfig
export const POSTS_CONFIG: PostConfig
export const COMMENT_CONFIG: CommentConfig
export const TAGS_CONFIG: TagsConfig
export const PROJECTS_CONFIG: ProjectConfig
export const PHOTOS_CONFIG: PhotosConfig
export const FRIENDS_CONFIG: FriendsConfig
export const ANALYTICS_CONFIG: AnalyticsConfig
```

### `biome.json` - 代码质量配置

- 格式化: 2 空格缩进, 单引号, 140 字符行宽
- Lint: 启用 recommended 规则
- 忽略文件: `*.md`, `*.astro`, `dist/`, `.astro/`, `node_modules/`

---

## 功能特性

### 内容页面

| 页面 | 路由 | 功能 |
|------|------|------|
| 首页 | `/` | 个人介绍、技能展示、GitHub 贡献图 |
| 文章列表 | `/posts` | 多种布局 (compact/cover/minimal) |
| 文章详情 | `/posts/[...id]` | Markdown 渲染、目录、评论 |
| 项目 | `/projects` | 项目展示、标签过滤 |
| 照片 | `/photos` | 瀑布流布局 |
| 友链 | `/friends` | 朋友博客列表 |
| 标签 | `/tags` | 文章标签聚合 |

### 核心组件

| 分类 | 组件 | 功能 |
|------|------|------|
| **base** | `Head.astro` | 页面头部元信息 |
| | `HeaderLink.astro` | 导航链接 |
| | `FooterLink.astro` | 页脚链接 |
| | `SocialLink.astro` | 社交媒体链接 |
| | `SkillsShowcase.astro` | 技能展示 |
| | `GithubContributions.tsx` | GitHub 贡献热力图 |
| | `SearchSwitch.astro` | 搜索切换 |
| **posts** | `TableOfContents.astro` | 文章目录 |
| | `PostNavigation.astro` | 上一篇/下一篇 |
| | `Comment.astro` | 评论区容器 |
| | `Gitalk.astro` | Gitalk 评论集成 |
| | `Prose.astro` | Markdown 文章样式 |
| **theme** | `ThemeToggle.tsx` | 主题切换 (深色/浅色) |
| **photos** | `MasonryPhotoFeed.tsx` | 照片瀑布流 |
| **reactbits** | `Magnet.tsx` | 磁性按钮效果 |
| | `AnimatedList.tsx` | 动画列表 |
| | `BlurText.tsx` | 模糊文字动画 |

---

## 环境变量

创建 `.env` 文件:

```bash
# GitHub OAuth (用于 Gitalk 评论)
PUBLIC_GITHUB_CLIENT_ID=your_client_id
PUBLIC_GITHUB_CLIENT_SECRET=your_client_secret
```

---

## 集成服务

| 服务 | 配置项 |
|------|--------|
| Gitalk 评论 | `COMMENT_CONFIG.gitalk` |
| GitHub | `GITHUB_CONFIG` |
| Vercount 访问统计 | `ANALYTICS_CONFIG.vercount` |
| Umami 分析 | `ANALYTICS_CONFIG.umami` |

---

## 开发注意事项

### 1. Astro 组件编写

```astro
---
// 组件逻辑 (服务端执行)
import { SITE } from '~/config'

const props = Astro.props
---

<!-- 组件模板 -->
<div>{props.content}</div>
```

### 2. React 客户端组件

```tsx
import { useState } from 'react'

function MyComponent() {
  const [count, setCount] = useState(0)
  return <div>{count}</div>
}

export default MyComponent
```

### 3. 内容集合 (Content Collections)

文章位于 `content/posts/`，使用 Frontmatter 定义元数据:

```yaml
---
title: 文章标题
published: 2024-01-01
description: 文章描述
tags: ['tag1', 'tag2']
image: /cover.jpg
---
```

### 4. 图标使用

使用 Iconify:
```html
<!-- 类名格式: icon-[prefix--name] -->
<span class="icon-[ri--github-fill]"></span>
<span class="icon-[skill-icons--javascript]"></span>
```

图标搜索: https://icon-sets.iconify.design/

---

## 样式系统

### TailwindCSS v4

- 使用 `@tailwindcss/vite` 插件
- 主题变量定义在 `src/styles/global.css`
- 支持深色模式切换

### 全局样式

- `global.css` - 全局基础样式
- `markdown.css` - Markdown 文章样式
- `github-card.css` - GitHub 卡片样式
- `lqip.css` - 低质量图片占位符样式

---

## 构建与部署

### 本地构建

```bash
pnpm build
# 构建产物在 dist/ 目录
pnpm preview
```

### 部署平台

- **Vercel**: 一键部署
- **Netlify**: 一键部署
- 构建命令: `pnpm build`
- 输出目录: `dist/`

### 构建后处理

```bash
# Pagefind 索引生成 (自动运行)
pnpm postbuild  # pagefind --site dist
```

---

## 常见任务

### 添加新文章

1. 在 `content/posts/` 创建 `.md` 或 `.mdx` 文件
2. 添加 Frontmatter 元数据
3. 编写 Markdown 内容

### 修改导航链接

编辑 `src/config.ts`:
```typescript
export const HEADER_LINKS: Link[] = [
  { name: '页面名', url: '/path' },
  // ...
]
```

### 添加新页面

在 `src/pages/` 创建 `.astro` 文件:

```astro
---
import Layout from '~/layouts/Layout.astro'
---

<Layout title="页面标题">
  <main>页面内容</main>
</Layout>
```

### 更新主题

编辑 `src/styles/global.css` 中的 CSS 变量

---

## 插件配置

项目使用的 Astro 插件:

- `@astrojs/react` - React 集成
- `@astrojs/mdx` - MDX 支持
- `@astrojs/rss` - RSS 订阅
- `@astrojs/sitemap` - 站点地图
- `astro-expressive-code` - 代码高亮
- `astro-robots-txt` - robots.txt

---

## 故障排查

### 开发服务器启动失败

```bash
# 清除缓存重建
rm -rf .astro dist node_modules
pnpm install
pnpm dev
```

### 类型检查错误

```bash
# 运行 Astro 检查
pnpm check
```

### 构建失败

1. 检查环境变量是否正确配置
2. 检查 `src/config.ts` 配置
3. 查看构建日志中的具体错误

---

## 参考资源

- [Astro 文档](https://docs.astro.build)
- [React 文档](https://react.dev)
- [TailwindCSS 文档](https://tailwindcss.com)
- [Biome 文档](https://biomejs.dev)
