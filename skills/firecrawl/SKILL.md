---
name: firecrawl
description: 网页数据抓取工具，用于 AI 应用。将网页转换为 Markdown 或结构化 JSON 数据。支持抓取、爬取、搜索等功能。适用于需要获取网页内容的 AI Agent 场景。
---

# Firecrawl - 网页数据抓取技能

Firecrawl 是一个强大的网页数据 API，专为 AI 应用设计。可以把网页转换为 LLM 可用的 Markdown 或结构化数据。

## 前置要求

### 1. 安装 npm 包

```bash
npm install @mendable/firecrawl-js
# 或
pnpm add @mendable/firecrawl-js
```

### 2. 获取 API Key

- 访问 [firecrawl.dev](https://www.firecrawl.dev)
- 注册账号并获取 API Key
- 免费版有 500 积分/月

## 基本用法

### 抓取单个网页

```javascript
import { FirecrawlApp } from '@mendable/firecrawl-js';

const app = new FirecrawlApp({ apiKey: 'your-api-key' });

// 抓取网页内容
const scrapeResult = await app.scrapeUrl('https://example.com', {
  formats: ['markdown', 'html', 'text'],
});

console.log(scrapeResult.markdown);
```

### 爬取整个网站

```javascript
// 爬取网站的所有页面
const crawlResult = await app.crawlUrl('https://example.com', {
  limit: 10,
  formats: ['markdown'],
});

console.log(crawlResult.data);
```

### 搜索功能

```javascript
// 搜索网页
const searchResult = await app.search('what is firecrawl', {
  limit: 5,
});

console.log(searchResult.data);
```

## OpenClaw 集成

### 方式一：Node.js 脚本

创建脚本文件 `scripts/firecrawl-scrape.js`:

```javascript
import { FirecrawlApp } from '@mendable/firecrawl-js';

const apiKey = process.env.FIRECRAWL_API_KEY;
const app = new FirecrawlApp({ apiKey });

const url = process.argv[2];
const format = process.argv[3] || 'markdown';

async function scrape() {
  try {
    const result = await app.scrapeUrl(url, {
      formats: [format],
    });
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

scrape();
```

运行：
```bash
FIRECRAWL_API_KEY=your-key node scripts/firecrawl-scrape.js https://example.com markdown
```

### 方式二：直接在代码中使用

```javascript
// 在 OpenClaw 的 exec 工具中运行
const { FirecrawlApp } = require('@mendable/firecrawl-js');
const app = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY });
const result = await app.scrapeUrl('https://news.ycombinator.com', { formats: ['markdown'] });
console.log(result.markdown);
```

## 常用场景

### 1. AI 聊天机器人获取实时信息

```javascript
const result = await app.scrapeUrl('https://example.com/news', {
  formats: ['markdown'],
  onlyMainContent: true,
});
// 将内容传给 LLM
```

### 2. 竞品监控

```javascript
const result = await app.crawlUrl('https://competitor.com/blog', {
  limit: 20,
  formats: ['markdown'],
});
```

### 3. 深度研究

```javascript
const search = await app.search('your research topic', { limit: 10 });
// 获取搜索结果后逐个抓取
```

## 配置选项

### scrapeUrl 选项

| 选项 | 类型 | 说明 |
|------|------|------|
| formats | string[] | 输出格式：`markdown`, `html`, `text`, `json` |
| onlyMainContent | boolean | 只提取主要内容，去除导航、广告等 |
| waitFor | number | 等待 JS 渲染的毫秒数 |
| timeout | number | 请求超时毫秒数 |

### crawlUrl 选项

| 选项 | 类型 | 说明 |
|------|------|------|
| limit | number | 最多抓取页面数 |
| formats | string[] | 输出格式 |
| exclude | string[] | 排除的路径模式 |
| include | string[] | 只抓取的路径模式 |

## 环境变量

```bash
FIRECRAWL_API_KEY=your-api-key-here
```

## 限制

- 免费版：500 积分/月
- 付费版：$19/月起，无限积分
- 不支持社交媒体平台

## 相关工具

- **ddg-search** - DuckDuckGo 搜索
- **document-summarizer** - 文档摘要
- **ai-news-aggregator** - AI 新闻聚合
