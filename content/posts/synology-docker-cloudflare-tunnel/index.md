---
title: '从 WebStation 到 Cloudflare Tunnel：我的群晖网络架构演进'
description: '记录一次从 WebStation + Alias 到 Cloudflare Tunnel、群晖反向代理、Docker Compose 与 Tailscale 的家庭 Homelab 架构演进。'
pubDate: 2026-05-07
author: 'Ethan Yang'
tags: ['NAS', 'Docker', 'Cloudflare', 'Homelab']
postType: 'article'
---

做家庭 Homelab，其实最终绕不开几个关键词：网络、反向代理、Docker 与稳定性。

前几年刚开始折腾群晖的时候，我的思路其实很简单：

```text
WebStation
+
Docker
+
Alias
```

例如：

```text
/epg
/jellyfin
/ai
```

当时感觉非常合理，甚至会觉得：

> 这不就是网站部署吗？

但后来服务越来越多：

- React / Next.js
- Jellyfin
- AI WebUI
- EPG
- Grafana
- code-server
- WebSocket 服务

整个系统开始逐渐变得混乱。

最开始只是偶发页面不存在、静态资源 404、WebSocket 失败、反向代理异常。后来这些问题越来越明显，我才意识到：WebStation 更像旧时代 Web Hosting 的产物。

它非常适合：

- PHP
- WordPress
- Apache
- Typecho

但并不真正适合：

- SPA
- WebSocket
- Docker App Gateway
- Timeline / Streaming
- React Runtime

尤其是 `Alias + 子路径` 这个方案。

现代前端其实大量默认运行在：

```text
/
```

而不是：

```text
/subpath
```

于是：

```text
/epg
/jellyfin
```

这种结构会天然开始和现代前端冲突。

我后来慢慢意识到，现代 Homelab 的核心已经不是“网站托管”，而是：

> 服务编排 + 网络系统

这其实是一个非常大的认知变化。

于是后来我开始逐渐迁移整个架构：

```text
Cloudflare Tunnel
+
Reverse Proxy
+
Docker Compose
+
Tailscale
```

最终变成现在这套方案。

它可能不是最快的。但在家庭网络环境下，足够稳定。而稳定，其实远比“理论最快”重要。

## 现在的架构

最终的整体架构长这样：

```text
                ┌─────────────────────┐
                │   Cloudflare DNS    │
                └─────────┬───────────┘
                          │
                          ▼
                ┌─────────────────────┐
                │ Cloudflare Tunnel   │
                └─────────┬───────────┘
                          │
                          ▼
                ┌─────────────────────┐
                │ Synology NAS        │
                │ Reverse Proxy       │
                └─────────┬───────────┘
                          │
        ┌─────────────────┼─────────────────┐
        ▼                 ▼                 ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ EPG Service  │ │ Jellyfin     │ │ Grafana      │
│ Port 3000    │ │ Port 8096    │ │ Port 3001    │
└──────────────┘ └──────────────┘ └──────────────┘
```

核心思路很简单：公网入口交给 Cloudflare Tunnel，NAS 内部再用群晖 Reverse Proxy 按子域名转发到不同的 Docker 服务。每个服务都跑在根路径 `/` 上，彻底告别子路径带来的各种兼容问题。

## 为什么 Cloudflare Tunnel 很适合家庭宽带

Tunnel 的本质不是”公网主动访问你家”，而是”NAS 主动连接 Cloudflare”。因此它不需要公网 IP、DDNS、端口映射，也不用开放 80 / 443 端口。

这点对家庭宽带非常关键——很多家庭宽带没有公网 IPv4，80 / 443 入站端口也经常不可用。Tunnel 的出站连接模式天然绕过了这些限制。

不过 Tunnel 解决的是”能稳定访问”的问题，不是”绝对高速”的问题。Cloudflare Tunnel 很多时候走国际线路（香港、日本、新加坡），不同运营商和时间段体验差异明显。另外国内家宽的上传带宽本身就比较弱，而 Tunnel 恰恰依赖 NAS → Cloudflare 的上传稳定性。

还有一点值得注意：cloudflared 在较早版本中默认使用 QUIC，新版本已改回 HTTP/2，但手动指定协议会更稳妥。QUIC 基于 UDP，而国内家庭宽带里 UDP 经常会遇到 QoS 限速、丢包、晚高峰波动和运营商限制，不一定是最稳的选择。

## 实操配置

### 1. 获取 Tunnel Token

进入 [Cloudflare Zero Trust](https://one.dash.cloudflare.com)，按 `Networks → Tunnels → Create Tunnel → Docker` 创建隧道，Cloudflare 会生成一段包含 `--token xxx` 的命令，`xxx` 就是你的 Tunnel Token。

### 2. Docker Compose 部署

目录结构：

```text
/docker
  /cloudflared
    docker-compose.yml
```

`docker-compose.yml`：

```yaml
services:
  cloudflared:
    image: cloudflare/cloudflared:latest
    container_name: cloudflared
    restart: unless-stopped
    network_mode: host
    command: tunnel run --protocol http2 --edge-ip-version 4
    environment:
      - TUNNEL_TOKEN=你的TunnelToken
```

几个关键配置的说明：

- `--protocol http2`：强制使用 HTTP/2，避免 QUIC 在国内网络下的不稳定。
- `--edge-ip-version 4`：国内很多宽带的 IPv6 质量反而更差，优先 IPv4 通常更稳。
- `network_mode: host`：群晖上推荐 host 网络模式，避免 bridge 网络导致的 localhost 不通和 DNS 异常。
- `restart: unless-stopped`：NAS 重启后自动恢复，不需要手动启动。

### 3. 启动并验证

```bash
docker compose up -d
docker logs -f cloudflared
```

日志里出现 `Registered tunnel connection` 就说明隧道建立成功了。

### 4. 群晖 Reverse Proxy

在 DSM 的 `登录门户 → 反向代理` 中，按子域名转发到对应的本地端口：

| 来源 | 目标 |
| --- | --- |
| epg.yourdomain.com | localhost:3000 |
| jellyfin.yourdomain.com | localhost:8096 |
| grafana.yourdomain.com | localhost:3001 |

这样 Cloudflare Tunnel 只负责把请求送进 NAS，具体的服务分发交给群晖 Reverse Proxy 处理。

## 哪些服务适合公网暴露

推荐公网：Blog、EPG、AI WebUI、Grafana 等轻量前端服务。

不推荐公网：DSM、SSH、Portainer、数据库、SMB / NFS——这些更敏感的服务建议通过 Tailscale 在内网访问。

## 经验总结

折腾了一圈下来，我的感受是：家庭 Homelab 最重要的不是”最快”，而是”最稳”。

推荐的做法：HTTP/2、IPv4、子域名、Reverse Proxy。尽量避免的：QUIC、Alias 子路径、复杂多层反代。

简单、可恢复、职责清晰，才是家庭服务长期稳定运行的关键。
