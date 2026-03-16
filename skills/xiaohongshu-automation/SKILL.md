---
name: xiaohongshu-automation
description: |
  小红书内容自动化 — 监控关键词、生成爆款文案、自动发布。
  基于 Agent-Reach 实现小红书阅读、搜索、发帖、评论、点赞。
  适用于博物馆/文博/文物等垂直领域，也支持通用爆款生成。
---

# 小红书自动化助手 🏷️

集监控、创作、发布于一体的全能小红书运营工具。

## 核心功能

### 1️⃣ 小红书内容获取（Agent-Reach）

使用 [Agent-Reach](https://github.com/Panniantong/Agent-Reach) 读取小红书内容：

```bash
# 安装
curl -fsSL https://raw.githubusercontent.com/Panniantong/agent-reach/main/docs/install.sh | bash

# 配置小红书 Cookie
agent-reach config xhs
```

**功能：**
- 阅读小红书笔记
- 搜索笔记和话题
- 获取笔记数据（点赞、收藏、评论）

### 2️⃣ 关键词监控
- 搜索：小红书笔记、热门话题
- 追踪：点赞量、评论趋势
- 灵感：发现爆款内容规律
- 支持自定义关键词（博物馆、文博、文物等）

### 3️⃣ AI 内容生成

**A. 垂直领域生成**
- 博物馆/文博方向
- 文物背后的故事
- 历史冷知识
- 艺术鉴赏
- 博物馆打卡攻略

**B. 通用爆款生成**
- 爆款公式：`利他价值 + 视觉吸引 + 情绪共鸣`
- 结构化输出：标题(20字内) + 正文 + 标签
- 开头：痛点场景 + 解决方案
- 结尾：行动号召 + 福利

### 4️⃣ 图片生成（需配置）
- Bing Image Creator (DALL-E 3)
- Playground AI
- Fooocus

### 5️⃣ 自动发布（需配置）
- 浏览器自动化登录
- 自动上传图片+发布

## Agent-Reach 支持的其他平台

安装 Agent-Reach 后，你的 Agent 还能：

| 平台 | 功能 |
|------|------|
| 🌐 网页 | 阅读任意网页 |
| 📺 YouTube | 字幕提取 + 搜索 |
| 🔍 全网搜索 | 语义搜索 |
| 🐦 Twitter/X | 读推文、搜索 |
| 📺 B站 | 字幕提取 |
| 📕 小红书 | 阅读、搜索、发帖、评论、点赞 |
| 🎵 抖音 | 视频解析、无水印下载 |
| 📦 GitHub | 读仓库、搜索 |
| 📖 Reddit | 搜索 |
| 💬 微信公众号 | 搜索 + 阅读 |
| 💬 微博 | 热搜、搜索 |
| 💻 V2EX | 热门帖子 |

## 爆款公式

```
标题：20字以内，包含数字/情绪词/关键词
正文：
  - 开头：痛点场景 + 解决方案
  - 核心：模块化呈现，使用符号系统
  - 结尾：行动号召 + 福利
标签：3-5个相关标签
```

## 使用方式

### 监控
```
搜索博物馆相关内容
看看最近文博有什么热门
文物相关的笔记有哪些
```

### 生成内容
```
帮我写一篇博物馆笔记
生成一个关于文物的文案
写个小红书风格的公积金新政爆款
```

### 发布
```
发布这篇笔记
上传并发布
```

### Agent-Reach 操作
```
帮我看看小红书上这个话题
搜索小红书上的装修风格
获取这个笔记的点赞数
```

## 配置（可选）

### Agent-Reach 安装
```bash
curl -fsSL https://raw.githubusercontent.com/Panniantong/agent-reach/main/docs/install.sh | bash
```

### 小红书 Cookie 配置
1. 浏览器登录小红书
2. 安装 Chrome 插件 Cookie-Editor
3. 导出 Cookie，发给 Agent
4. 运行 `agent-reach config xhs`

### 自动发布需要
- 账号 cookies 认证
- 遵守小红书社区规范
- 适度使用，避免封号

### 图片生成需要
- 配置图片生成 API

## 注意事项

⚠️ 自动化发布需要：
- 浏览器登录 cookies
- 遵守社区规范
- 适度使用

⚠️ Agent-Reach：
- 免费开源 (MIT)
- Cookie 只存在本地，不上传
- 本地不需要代理，服务器部署才需要
