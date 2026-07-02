# Design System — antfu-inspired Minimalism

## 1. Visual Theme & Atmosphere

本站采用**极简开发者美学**，灵感来自 [antfu.me](https://antfu.me/)。设计哲学一句话：**让设计消失，让内容说话**。

画布是接近纯黑的暗色（`#0a0a0a`），文字是浅灰白（`#e5e5e5`），强调色也是灰色——**零饱和色**。层级不靠颜色区分，靠 `opacity` 透明度分层（1 / 0.7 / 0.5 / 0.3 四档）。字体全站统一使用**等宽字体**（GeistMono），这是品牌签名。

没有渐变、没有阴影、没有圆角、没有大写转换、没有字间距。所有交互反馈都是 `opacity` 变化，零位移。页面布局是单栏窄阅读流（`max-width: 42rem`），模拟专栏阅读体验。

**Key Characteristics:**
- 暗色优先（`#0a0a0a`），亮色可选切换
- 纯灰度配色，零饱和色
- 等宽字体用于正文（品牌签名）
- 透明度分层（opacity 1/0.7/0.5/0.3）建立信息优先级
- 零渐变、零阴影、零圆角、零大写、零字间距
- 单栏窄阅读流（42rem）
- 无卡片，纯列表
- Hover 仅 opacity 变化，零位移

## 2. Color Palette & Roles

### Surface & Background
- **Canvas Black** (`#0a0a0a`)：默认暗色画布，接近纯黑但留一点温度
- **Surface** (`#141414`)：次级面，微微提亮
- **Surface Soft** (`#1a1a1a`)：最弱化的次级面

### Text
- **Primary Text** (`#e5e5e5`)：主文字，浅灰白（非纯白，避免刺眼）
- **Muted** (`#888888`)：次要文字中灰

### Accent
- **Accent** (`#888888`)：强调色也是灰色，靠 opacity 区分
- **Link Hover** (`#e5e5e5`)：hover 变亮，不变色

### Opacity System（核心）
- `--opacity-primary: 1`：主文字、当前激活项
- `--opacity-secondary: 0.7`：次要文字、导航项
- `--opacity-muted: 0.5`：元信息、日期、标签
- `--opacity-faint: 0.3`：最弱化信息

### Light Mode（可选）
- 背景 `#fafafa`，文字 `#1a1a1a`，强调 `#444444`

## 3. Typography Rules

### Font Family
- **GeistMono** — 全站统一字体，包括正文、标题、元信息。等宽字体用于正文是品牌签名，反直觉但极具辨识度。
- **Geist**（无衬线）— 仅作中文回退辅助。
- 中文回退：ShangguSansSC-VF（霜体）

### Hierarchy
| Role | Font | Size | Weight | Line Height | Notes |
|---|---|---|---|---|---|
| Page Title | GeistMono | `clamp(1.5rem, 3vw, 2rem)` | 700 | 1.2 | 页面主标题 |
| Section Title | GeistMono | `0.75rem` | 600 | 1.2 | 区块小标题，opacity-muted |
| Article Title | GeistMono | `clamp(1.5rem, 3vw, 2.25rem)` | 700 | 1.2 | 文章详情 H1 |
| Heading H2 | GeistMono | `clamp(1.25rem, 2vw, 1.5rem)` | 700 | 1.3 | 文章内 H2 |
| Heading H3 | GeistMono | `clamp(1.05rem, 1.4vw, 1.2rem)` | 700 | 1.3 | 文章内 H3 |
| List Title | GeistMono | `0.875rem` | 400 | 1.4 | 列表项标题 |
| Body | GeistMono | `0.875rem` | 400 | 1.7 | 正文 |
| Meta | GeistMono | `0.75rem` | 400 | 1.4 | 日期、标签等元信息 |
| Micro | GeistMono | `0.72rem` | 400 | 1.4 | 最小字号 |

### Principles
- **不靠大字号建立层级**——靠字重和 opacity
- **零字间距**——不使用 letter-spacing
- **零大写**——不使用 text-transform: uppercase
- **行高宽松**（1.7）保证可读性

## 4. Layout Principles

### Container
- **Max Width**：`42rem`（672px）——窄阅读流
- **Padding**：`1rem`（移动端）/ `1rem`（桌面端，因 max-width 已限宽）
- **居中**：`margin-inline: auto`

### Spacing
- **Base unit**：4px
- **Section gap**：`2.5rem - 3rem`
- **List item gap**：`0`（用 border-bottom 分隔）
- **Paragraph gap**：`0.75rem`

### Whitespace Philosophy
留白是节奏感的来源。区块间 2.5-3rem 的留白让页面「呼吸」，但不过度——antfu 的留白是「刚好够」，不是「奢侈」。

## 5. Component Stylings

### Links & Hover
- 默认：`color: var(--theme-text)` + `opacity: var(--opacity-secondary)`
- Hover：`opacity: 1`，200ms ease
- **零位移**、零下划线动画、零 scale

### List（核心组件）
```
┌──────────────────────────────────────┐
│  文章标题                    Apr 28   │  ← border-bottom
├──────────────────────────────────────┤
│  文章标题                    Mar 12   │
├──────────────────────────────────────┤
```
- `list-style: none`
- 每项 `border-bottom: 1px solid var(--color-border)`
- 标题左对齐，元信息右对齐
- Hover：整行 opacity 降低

### Navigation
- 水平排列，`gap: 1.25rem`
- 当前页 `opacity: 1` + `font-weight: 600`
- 其他页 `opacity: var(--opacity-muted)`

### Buttons
- **无按钮**——用文字链接 + 箭头（`→` / `↗`）
- 外链用 `↗` 标记，内链用 `→`

### Tags
- 纯文字，`gap: 0.5rem 1rem`
- 当前激活 `opacity: 1` + `font-weight: 600`

### Code
- 等宽字体（与正文一致）
- 由 expressive-code 插件处理语法高亮

## 6. Depth & Elevation

**零阴影**。所有层级靠：
1. `opacity` 透明度
2. `border-bottom` 1px 分割线
3. 背景色微差（`#0a0a0a` vs `#141414`）

## 7. Don'ts

- **Don't** 使用饱和色（蓝、紫、绿、红等）——纯灰度
- **Don't** 使用渐变
- **Don't** 使用 box-shadow
- **Don't** 使用大圆角（`9999px` 胶囊、`1rem` 卡片圆角）
- **Don't** 使用 text-transform: uppercase
- **Don't** 使用 letter-spacing
- **Don't** 使用大字号喊话（超过 2.25rem）
- **Don't** 使用卡片（border + background + radius 的组合）——用列表
- **Don't** 在 hover 时做位移/scale/shadow 变化——只用 opacity
- **Don't** 使用多栏布局——单栏窄流
- **Don't** 在单页使用超过 2 种 opacity 档位之外的值

## 8. Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|---|---|---|
| Mobile | <640px | 单栏，导航折叠为汉堡菜单 |
| Desktop | ≥640px | 导航展开，内容不变 |

仅一个核心断点（640px），因为单栏窄流布局天然响应式。

### Touch Targets
- 导航链接最小高度 2.5rem（40px）
- 列表项最小高度 2.5rem

## 9. Iteration Guide

1. **Audit opacity**：检查是否用了非标准的 opacity 值
2. **Audit color**：检查是否引入了饱和色
3. **Audit font**：检查是否使用了非 mono 字体
4. **Audit radius**：检查是否出现了圆角
5. **Audit shadow**：检查是否出现了 box-shadow
6. **Audit uppercase**：检查是否出现了大写转换
7. **Audit spacing**：检查是否遵循 4px 基数
