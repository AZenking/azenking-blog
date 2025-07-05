---
title: 'ExpressiveCode Configuration Guide'
description: 'A comprehensive guide to configuring and customizing code blocks in Litos theme'
pubDate: 2025-05-02
tags: ['Configuration', 'Code Blocks', 'Styling']
heroImage: 'ExpressiveCode-Configuration.webp'
ogImage: 'ExpressiveCode-Configuration.webp'
recommend: true
---

In Markdown documents, we use code blocks to display code snippets and other content. This document explains how to customize the code block configuration.

The code blocks in this theme are configured using [Expressive Code](https://expressive-code.com/), with all configuration options defined in the `ec.config.mjs` file. Below is a detailed explanation of the main configuration options:

## Basic Configuration

```ts title="ec.config.mjs"
export default defineEcConfig({
  defaultLocale: 'en',         // Default language setting / 默认语言设置
  defaultProps: {              // Default properties / 默认属性配置
    wrap: false,               // Enable/disable automatic line wrapping / 启用/禁用自动换行
    collapseStyle: 'collapsible-auto',  // Collapsible style / 折叠样式：'collapsible-auto'|'collapsible-hidden'|'collapsible-visible'
    showLineNumbers: false,    // Show/hide line numbers / 显示/隐藏行号
    preserveIndent: true,      // Preserve code indentation / 保留代码缩进
  },
  minSyntaxHighlightingColorContrast: 0,  // Minimum contrast for syntax highlighting / 语法高亮的最小对比度
})
```

## Style Configuration

Customize code block styles using `styleOverrides`:

```ts title="ec.config.mjs"
styleOverrides: {
  // Font settings / 字体设置
  uiFontFamily: "'DM Mono','Input Mono','Fira Code','ShangguSansSCVF', 'monospace'",  // UI font stack / UI 字体栈
  uiFontSize: '1em',           // UI font size / UI 字体大小
  codeFontFamily: "'DM Mono','Input Mono','Fira Code','ShangguSansSCVF','monospace'",  // Code font stack / 代码字体栈
  codeFontSize: '14px',        // Code font size / 代码字体大小
  codeLineHeight: '1.4',       // Code line height / 代码行高

  // Borders and padding / 边框和内边距
  borderRadius: '0',           // Border radius / 边框圆角
  codePaddingBlock: '0.8571429em',   // Vertical padding / 上下内边距
  codePaddingInline: '1.1428571em',  // Horizontal padding / 左右内边距
  borderColor: ({ theme }) => (theme.type === 'dark' ? '#24273a' : '#e6e9ef'),  // Border color / 边框颜色

  // Frame styles / 框架样式
  frames: {
    frameBoxShadowCssValue: false,  // Enable/disable shadow / 启用/禁用阴影
    inlineButtonBackgroundActiveOpacity: '0.2',    // Button active state opacity / 按钮激活状态不透明度
    inlineButtonBackgroundHoverOrFocusOpacity: '0.1',  // Button hover state opacity / 按钮悬停状态不透明度
  },

  // Text marker styles / 文本标记样式
  textMarkers: {
    backgroundOpacity: '0.2',   // Background opacity / 背景不透明度
    borderOpacity: '0.4',       // Border opacity / 边框不透明度
  },
}
```

## Plugin Configuration

The theme includes two built-in plugins:

1. `pluginCollapsibleSections`: Adds collapsible code sections
   - `defaultCollapsed`: Controls initial collapse state
   - `collapseButton`: Customizes collapse button appearance
   ```ts
   pluginCollapsibleSections({
     defaultCollapsed: false,     // Initial collapse state / 初始折叠状态
     collapseButton: {
       position: 'right',         // Button position: 'left' | 'right' / 按钮位置：左侧或右侧
       label: 'Toggle code',      // Button label / 按钮文本
     }
   })
   ```

2. `pluginLineNumbers`: Adds line numbers to code blocks
   - Supports custom styling and formatting
   ```ts
   pluginLineNumbers({
     className: 'custom-line-numbers',  // Custom CSS class / 自定义 CSS 类名
     format: (n) => `${n}.`,           // Custom line number format / 自定义行号格式
     style: { opacity: 0.5 }           // Custom styles / 自定义样式
   })
   ```

## Theme Configuration

The theme uses the Catppuccin color scheme with extensive customization options:

```ts title="ec.config.mjs"
themes: ['catppuccin-macchiato', 'catppuccin-latte'],  // Dark and light themes / 暗色和亮色主题
themeCssSelector: (theme) =>
  (theme.name === 'catppuccin-macchiato' ? '.dark' : ':root:not(.dark)'),  // Theme selector / 主题选择器
useDarkModeMediaQuery: false,   // Use system dark mode preference / 使用系统暗色模式偏好
useStyleReset: false,          // Reset default styles / 重置默认样式

// Advanced theme customization / 高级主题自定义
themeCustomizations: {
  'catppuccin-macchiato': {
    colors: {
      primary: '#8aadf4',      // Custom primary color / 自定义主要颜色
      secondary: '#f5a97f',    // Custom secondary color / 自定义次要颜色
      syntax: {                // Syntax highlighting colors / 语法高亮颜色
        string: '#a6da95',     // String color / 字符串颜色
        keyword: '#ed8796',    // Keyword color / 关键字颜色
        function: '#8aadf4',   // Function color / 函数颜色
        comment: '#5b6078'     // Comment color / 注释颜色
      }
    }
  }
}
```

If you need to learn more about configuration, you can refer to the official website documentation: [Expressive Code Configuration](https://expressive-code.com/reference/configuration/).
