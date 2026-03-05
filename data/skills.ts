export interface Skill {
  id: string
  name: string | { en: string; zh: string }
  description: string | { en: string; zh: string }
  emoji?: string
  category: string
  tags?: string[]
  author?: string
  version?: string
  installCount?: number
  rating?: number
  lastUpdated?: string
  repoUrl?: string
  requiredModel?: string
}

export const categories = ['All', 'AI', 'Automation', 'Business', 'Communication', 'Data', 'Development', 'Lifestyle', 'Media', 'Productivity', 'Security']

export const tagsConfig = {
  New: { label: { en: 'New', zh: '🆕 新增' }, color: 'bg-green-500' },
  Popular: { label: { en: 'Popular', zh: '🔥 热门' }, color: 'bg-orange-500' },
  Official: { label: { en: 'Official', zh: '✨ 官方' }, color: 'bg-blue-500' },
}

export const skills: Skill[] = [
{ id: 'ab-test-setup', name: { en: 'A/B Test Setup', zh: 'A/B 测试设置' }, description: { en: 'When the user wants to plan, design, or implement an A/B test or experiment.', zh: '当用户想要计划、设计或实施 A/B 测试或实验时使用。' }, category: 'Business', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'ai-news-aggregator', name: 'ai-news-aggregator', description: 'Aggregate and summarize AI/LLM/Agent news from multiple sources. Use when user needs latest AI news,', category: 'AI', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'analytics-tracking', name: 'analytics-tracking', description: 'When the user wants to set up, improve, or audit analytics tracking and measurement. Also use when t', category: 'Business', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'blogwatcher', name: 'blogwatcher', description: 'Monitor blogs and RSS/Atom feeds for updates using the blogwatcher CLI.', category: 'Business', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'business-news-aggregator', name: 'business-news-aggregator', description: 'Aggregate business and tech industry news. Use when user needs latest tech industry dynamics, startu', category: 'Business', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'competitor-tracker', name: 'competitor-tracker', description: 'Track competitor activities and updates. Use when user needs to monitor specific companies, track co', category: 'Business', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'content-strategy', name: 'content-strategy', description: 'When the user wants to plan a content strategy, decide what content to create, or figure out what to', category: 'Business', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'copywriting', name: 'copywriting', description: 'When the user wants to write, rewrite, or improve marketing copy for any page — including homepage, ', category: 'Business', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'ddg-web-search', name: 'ddg-search', description: 'Web search without an API key using DuckDuckGo Lite via web_fetch. Use as a fallback when web_search', category: 'AI', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'document-summarizer', name: 'document-summarizer', description: 'Summarize long documents, articles, and papers. Use when user shares a URL, PDF link, or file path a', category: 'Business', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'entrepreneurship', name: 'entrepreneurship', description: '|', category: 'Business', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'firecrawl', name: 'firecrawl', description: '网页数据抓取工具，用于 AI 应用。将网页转换为 Markdown 或结构化 JSON 数据。支持抓取、爬取、搜索等功能。适用于需要获取网页内容的 AI Agent 场景。', category: 'AI', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'frontend', name: 'Frontend', description: 'Build polished user interfaces across web and mobile with consistent UX patterns.', category: 'Development', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'growth', name: 'growth', description: '|', category: 'Business', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'healthcheck', name: 'healthcheck', description: 'Host security hardening and risk-tolerance configuration for OpenClaw deployments. Use when a user a', category: 'Security', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'hello-world', name: 'hello-world', description: 'A simple skill that prints "Hello, World!" in various programming languages. Use when the user wants', category: 'Development', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'html', name: 'HTML', description: 'Avoid common HTML mistakes — accessibility gaps, form pitfalls, and SEO oversights.', category: 'Development', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'http-retry', name: 'http-retry', description: 'Universal HTTP retry mechanism with exponential backoff. Use when making API calls that may fail due', category: 'AI', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'location-advisor', name: 'location-advisor', description: '选址顾问系统。基于McKinsey方法论，通过MECE因素拆解、数据驱动评分和假设验证，帮助完成零售门店/餐饮/仓库/工厂/办公室等选址决策。支持API集成和本地fallback。', category: 'Business', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'marketing-ideas', name: 'marketing-ideas', description: '"When the user needs marketing ideas, inspiration, or strategies for their SaaS or software product.', category: 'Business', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'marketing-psychology', name: 'marketing-psychology', description: '"When the user wants to apply psychological principles, mental models, or behavioral science to mark', category: 'Business', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'mckinsey-consultant', name: 'mckinsey-consultant', description: 'McKinsey顾问式问题解决系统。从商业问题出发,通过假设驱动的结构化分析方法,生成McKinsey风格研究报告和PPT。融合Problem Solving方法论、MECE原则、Issue Tree', category: 'Business', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'mimeng-writing', name: 'mimeng-writing', description: '咪蒙爆款文章写作技巧。适用于需要创作10万+阅读量爆款文章、情感共鸣类内容、故事叙事或社会议题评论时使用。掌握标题制造、开篇设计、情绪调动、金句提炼、故事叙事等核心技巧。', category: 'Business', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'nano-pdf', name: 'nano-pdf', description: 'Edit PDFs with natural-language instructions using the nano-pdf CLI.', category: 'Media', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'notion', name: 'notion', description: 'Notion API for creating and managing pages, databases, and blocks.', category: 'Productivity', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'product-strategy', name: 'product-strategy', description: '|', category: 'Business', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'seo-audit', name: 'seo-audit', description: 'When the user wants to audit, review, or diagnose SEO issues on their site. Also use when the user m', category: 'Business', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'tavily', name: 'tavily', description: 'AI-powered web search, extraction, and research. Use when user wants to search the web, extract cont', category: 'AI', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'us-gov-shutdown-tracker', name: 'us-gov-shutdown-tracker', description: 'Track and analyze US government shutdown liquidity impacts by monitoring TGA (Treasury General Accou', category: 'Business', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'user-research', name: 'user-research', description: '|', category: 'Business', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'weather', name: 'weather', description: '"Get current weather and forecasts via wttr.in or Open-Meteo. Use when: user asks about weather, tem', category: 'Lifestyle', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'web', name: 'Web Development', description: 'Build, debug, and deploy websites with HTML, CSS, JavaScript, modern frameworks, and production best', category: 'Development', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'website', name: 'Website', description: 'Build fast, accessible, and SEO-friendly websites with modern best practices.', category: 'Development', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'xiaohongshu-automation', name: 'xiaohongshu-automation', description: '小红书内容自动化 — 监控关键词、生成文案、自动发布。Use when user needs to manage Xiaohongshu (RED) account: (1) Monitor keyw', category: 'Automation', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'find-skills', name: 'find-skills', description: 'Find and discover skills in the registry', category: 'Development', tags: [], author: 'OpenClaw', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'generative-media-skills', name: 'generative-media-skills', description: 'generative-media-skills', category: 'Media', tags: [], author: "Local", version: '1.0.0', installCount: 0, rating: 0, repoUrl: 'https://github.com/huangqianqian120/skillslibrary/tree/main/skills', lastUpdated: '2026-03-04' },
{ id: 'twitter', name: 'twitter', description: 'Search and retrieve content from Twitter/X. Get user info, t', category: 'Media', tags: [], author: "Local", version: '1.0.0', installCount: 0, rating: 0, repoUrl: 'https://github.com/huangqianqian120/skillslibrary/tree/main/skills', lastUpdated: '2026-03-04' },
{ id: 'research-framework', name: 'research-framework', description: 'research-framework', category: 'AI', tags: [], author: "Local", version: '1.0.0', installCount: 0, rating: 0, repoUrl: 'https://github.com/huangqianqian120/skillslibrary/tree/main/skills', lastUpdated: '2026-03-04' },
{ id: 'domain-hunter', name: 'domain-hunter', description: 'Search domains, compare prices, find promo codes, get purcha', category: 'Business', tags: [], author: "Local", version: '1.0.0', installCount: 0, rating: 0, repoUrl: 'https://github.com/huangqianqian120/skillslibrary/tree/main/skills', lastUpdated: '2026-03-04' },
{ id: 'persona-builder', name: 'persona-builder', description: 'persona-builder', category: 'AI', tags: [], author: "Local", version: '1.0.0', installCount: 0, rating: 0, repoUrl: 'https://github.com/huangqianqian120/skillslibrary/tree/main/skills', lastUpdated: '2026-03-04' },
{ id: 'archive', name: 'archive', description: '"Archive session learnings, debugging solutions, and deploym', category: 'Productivity', tags: [], author: "Local", version: '1.0.0', installCount: 0, rating: 0, repoUrl: 'https://github.com/huangqianqian120/skillslibrary/tree/main/skills', lastUpdated: '2026-03-04' },
{ id: 'logo-creator', name: 'logo-creator', description: 'Create logos using AI image generation. Discuss style/ratio,', category: 'Media', tags: [], author: "Local", version: '1.0.0', installCount: 0, rating: 0, repoUrl: 'https://github.com/huangqianqian120/skillslibrary/tree/main/skills', lastUpdated: '2026-03-04' },
{ id: 'producthunt', name: 'producthunt', description: 'Search and retrieve content from Product Hunt. Get posts, to', category: 'Business', tags: [], author: "Local", version: '1.0.0', installCount: 0, rating: 0, repoUrl: 'https://github.com/huangqianqian120/skillslibrary/tree/main/skills', lastUpdated: '2026-03-04' },
{ id: 'nanobanana', name: 'nanobanana', description: 'Generate and edit images using Google Gemini 3 Pro Image (Na', category: 'Media', tags: [], author: "Local", version: '1.0.0', installCount: 0, rating: 0, repoUrl: 'https://github.com/huangqianqian120/skillslibrary/tree/main/skills', lastUpdated: '2026-03-04' },
{ id: 'seo-geo', name: 'seo-geo', description: 'SEO & GEO (Generative Engine Optimization) for websites. Ana', category: 'Business', tags: [], author: "Local", version: '1.0.0', installCount: 0, rating: 0, repoUrl: 'https://github.com/huangqianqian120/skillslibrary/tree/main/skills', lastUpdated: '2026-03-04' },
{ id: 'reddit', name: 'reddit', description: 'Search and retrieve content from Reddit. Get posts, comments', category: 'Media', tags: [], author: "Local", version: '1.0.0', installCount: 0, rating: 0, repoUrl: 'https://github.com/huangqianqian120/skillslibrary/tree/main/skills', lastUpdated: '2026-03-04' },
{ id: 'hf-image-generator', name: 'hf-image-generator', description: 'hf-image-generator', category: 'Media', tags: [], author: "Local", version: '1.0.0', installCount: 0, rating: 0, repoUrl: 'https://github.com/huangqianqian120/skillslibrary/tree/main/skills', lastUpdated: '2026-03-04' },
{ id: 'insights-analyzer', name: 'insights-analyzer', description: 'insights-analyzer', category: 'AI', tags: [], author: "Local", version: '1.0.0', installCount: 0, rating: 0, repoUrl: 'https://github.com/huangqianqian120/skillslibrary/tree/main/skills', lastUpdated: '2026-03-04' },
{ id: 'banner-creator', name: 'banner-creator', description: 'Create banners using AI image generation. Discuss format/sty', category: 'Media', tags: [], author: "Local", version: '1.0.0', installCount: 0, rating: 0, repoUrl: 'https://github.com/huangqianqian120/skillslibrary/tree/main/skills', lastUpdated: '2026-03-04' },
{ id: 'interview-ai', name: 'interview-ai', description: 'interview-ai', category: 'Productivity', tags: [], author: "Local", version: '1.0.0', installCount: 0, rating: 0, repoUrl: 'https://github.com/huangqianqian120/skillslibrary/tree/main/skills', lastUpdated: '2026-03-04' },
{ id: 'requesthunt', name: 'requesthunt', description: 'Generate user demand research reports from real user feedbac', category: 'Business', tags: [], author: "Local", version: '1.0.0', installCount: 0, rating: 0, repoUrl: 'https://github.com/huangqianqian120/skillslibrary/tree/main/skills', lastUpdated: '2026-03-04' },
{ id: 'git-manager', name: 'git-manager', description: 'Comprehensive Git operations for repository management. Use for committing, branching, PRs, merging, and syncing.', category: 'Development', tags: [], author: "Local", version: '1.0.0', installCount: 0, rating: 0, repoUrl: 'https://github.com/huangqianqian120/skillslibrary/tree/main/skills', lastUpdated: '2026-03-05' },
]
