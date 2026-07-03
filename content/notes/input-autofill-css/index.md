---
title: '修改 input 自动填充样式'
pubDate: 2025-01-06
description: '记录修改浏览器 input 自动填充样式的 CSS 写法，解决深色表单中 autofill 背景和文字颜色不一致的问题。'
author: 'Ethan Yang'
comment: false
postType: note
tags: ['css', 'input', 'autofill', 'styling', 'form']
---

浏览器自动填充会给输入框注入默认背景和文字颜色，在深色表单里很容易出现一块突兀的浅色区域。

下面这段 CSS 用较长的背景过渡时间规避默认 autofill 背景，并强制保持文本颜色，适合用于登录、搜索和设置类表单。

```css
input:-internal-autofill-previewed {
  -webkit-text-fill-color: #fff !important;
  transition: background-color 5000s ease-in-out 0s !important;
}
input:-internal-autofill-selected {
  -webkit-text-fill-color: #fff !important;
  transition: background-color 5000s ease-in-out 0s !important;
}
```
