---
title: 'Homebrew 加速 bash 脚本'
pubDate: 2024-06-05
description: '记录在 macOS 上使用 HomebrewCN 脚本加速 Homebrew 安装与源切换的命令，适合临时解决国内网络下载慢的问题。'
author: 'Ethan Yang'
comment: false
postType: note
tags: ['homebrew', 'mac', 'bash', 'acceleration', 'brew']
---

这是一条偏工具箱性质的笔记，用来在新机器或网络环境不稳定时快速处理 Homebrew 下载缓慢的问题。

执行前建议先确认当前 shell 环境和 Homebrew 状态；如果只是短期网络波动，优先使用官方源并配合代理会更可控。

```bash
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
```
