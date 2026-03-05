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
{ id: 'ai-news-aggregator', name: { en: 'AI News Aggregator', zh: 'AI 新闻聚合器' }, description: { en: 'Aggregate and summarize AI/LLM/Agent news from multiple sources. Use when user needs latest AI news,', zh: '从多个来源聚合和总结 AI/LLM/Agent 新闻。当用户需要最新的 AI 新闻时使用。' }, category: 'AI', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'analytics-tracking', name: { en: 'Analytics Tracking', zh: '分析追踪' }, description: { en: 'When the user wants to set up, improve, or audit analytics tracking and measurement. Also use when t', zh: '当用户想要设置、改进或审计分析追踪和测量时使用。' }, category: 'Business', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'blogwatcher', name: { en: 'Blog Watcher', zh: '博客观察者' }, description: { en: 'Monitor blogs and RSS/Atom feeds for updates using the blogwatcher CLI.', zh: '使用 blogwatcher CLI 监控博客和 RSS/Atom 源的更新。' }, category: 'Business', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'business-news-aggregator', name: { en: 'Business News Aggregator', zh: '商业新闻聚合器' }, description: { en: 'Aggregate business and tech industry news. Use when user needs latest tech industry dynamics, startu', zh: '聚合商业和科技行业新闻。当用户需要最新的科技行业动态、创业公司等信息时使用。' }, category: 'Business', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'competitor-tracker', name: { en: 'Competitor Tracker', zh: '竞争对手追踪器' }, description: { en: 'Track competitor activities and updates. Use when user needs to monitor specific companies, track co', zh: '追踪竞争对手的活动和更新。当用户需要监控特定公司、追踪竞品动态时使用。' }, category: 'Business', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'content-strategy', name: { en: 'Content Strategy', zh: '内容策略' }, description: { en: 'When the user wants to plan a content strategy, decide what content to create, or figure out what to', zh: '当用户想要规划内容策略、决定要创建什么内容或找出要涵盖的主题时使用。' }, category: 'Business', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'copywriting', name: { en: 'Copywriting', zh: '文案写作' }, description: { en: 'When the user wants to write, rewrite, or improve marketing copy for any page — including homepage, ', zh: '当用户想要为任何页面（包括主页）撰写、重写或改进营销文案时使用。' }, category: 'Business', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'ddg-web-search', name: { en: 'DDG Web Search', zh: 'DDG 网页搜索' }, description: { en: 'Web search without an API key using DuckDuckGo Lite via web_fetch. Use as a fallback when web_search', zh: '通过 web_fetch 使用 DuckDuckGo Lite 进行网页搜索，无需 API 密钥。当 web_search 不可用时作为备用。' }, category: 'AI', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'document-summarizer', name: { en: 'Document Summarizer', zh: '文档摘要器' }, description: { en: 'Summarize long documents, articles, and papers. Use when user shares a URL, PDF link, or file path a', zh: '总结长文档、文章和论文。当用户分享 URL、PDF 链接或文件路径时使用。' }, category: 'Business', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'entrepreneurship', name: { en: 'Entrepreneurship', zh: '创业' }, description: { en: '|', zh: '|' }, category: 'Business', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'firecrawl', name: 'firecrawl', description: '网页数据抓取工具，用于 AI 应用。将网页转换为 Markdown 或结构化 JSON 数据。支持抓取、爬取、搜索等功能。适用于需要获取网页内容的 AI Agent 场景。', category: 'AI', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'frontend', name: { en: 'Frontend', zh: '前端' }, description: { en: 'Build polished user interfaces across web and mobile with consistent UX patterns.', zh: '使用一致的 UX 模式在 Web 和移动设备上构建精美的用户界面。' }, category: 'Development', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'growth', name: { en: 'Growth', zh: '增长' }, description: { en: '|', zh: '|' }, category: 'Business', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'healthcheck', name: { en: 'Healthcheck', zh: '健康检查' }, description: { en: 'Host security hardening and risk-tolerance configuration for OpenClaw deployments. Use when a user a', zh: '为 OpenClaw 部署进行主机安全加固和风险容忍度配置。当用户需要时使用。' }, category: 'Security', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'hello-world', name: { en: 'Hello World', zh: '你好，世界' }, description: { en: 'A simple skill that prints "Hello, World!" in various programming languages. Use when the user wants', zh: '一个在各种编程语言中打印“Hello, World!”的简单技能。当用户想要时使用。' }, category: 'Development', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'html', name: { en: 'HTML', zh: 'HTML' }, description: { en: 'Avoid common HTML mistakes — accessibility gaps, form pitfalls, and SEO oversights.', zh: '避免常见的 HTML 错误——可访问性差距、表单陷阱和 SEO 疏忽。' }, category: 'Development', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'http-retry', name: { en: 'HTTP Retry', zh: 'HTTP 重试' }, description: { en: 'Universal HTTP retry mechanism with exponential backoff. Use when making API calls that may fail due', zh: '具有指数退避的通用 HTTP 重试机制。在进行可能因网络问题而失败的 API 调用时使用。' }, category: 'AI', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'location-advisor', name: 'location-advisor', description: '选址顾问系统。基于McKinsey方法论，通过MECE因素拆解、数据驱动评分和假设验证，帮助完成零售门店/餐饮/仓库/工厂/办公室等选址决策。支持API集成和本地fallback。', category: 'Business', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'marketing-ideas', name: { en: 'Marketing Ideas', zh: '营销点子' }, description: { en: '"When the user needs marketing ideas, inspiration, or strategies for their SaaS or software product.', zh: '当用户需要为其 SaaS 或软件产品提供营销点子、灵感或策略时。' }, category: 'Business', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'marketing-psychology', name: { en: 'Marketing Psychology', zh: '营销心理学' }, description: { en: '"When the user wants to apply psychological principles, mental models, or behavioral science to mark', zh: '当用户想要将心理学原理、心智模型或行为科学应用于营销时。' }, category: 'Business', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'mckinsey-consultant', name: 'mckinsey-consultant', description: 'McKinsey顾问式问题解决系统。从商业问题出发,通过假设驱动的结构化分析方法,生成McKinsey风格研究报告和PPT。融合Problem Solving方法论、MECE原则、Issue Tree', category: 'Business', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'mimeng-writing', name: 'mimeng-writing', description: '咪蒙爆款文章写作技巧。适用于需要创作10万+阅读量爆款文章、情感共鸣类内容、故事叙事或社会议题评论时使用。掌握标题制造、开篇设计、情绪调动、金句提炼、故事叙事等核心技巧。', category: 'Business', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'nano-pdf', name: { en: 'Nano PDF', zh: 'Nano PDF' }, description: { en: 'Edit PDFs with natural-language instructions using the nano-pdf CLI.', zh: '使用 nano-pdf CLI 通过自然语言指令编辑 PDF。' }, category: 'Media', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'notion', name: { en: 'Notion', zh: 'Notion' }, description: { en: 'Notion API for creating and managing pages, databases, and blocks.', zh: '用于创建和管理页面、数据库和块的 Notion API。' }, category: 'Productivity', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'product-strategy', name: { en: 'Product Strategy', zh: '产品策略' }, description: { en: '|', zh: '|' }, category: 'Business', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'seo-audit', name: { en: 'SEO Audit', zh: 'SEO 审计' }, description: { en: 'When the user wants to audit, review, or diagnose SEO issues on their site. Also use when the user m', zh: '当用户想要审计、审查或诊断其网站上的 SEO 问题时使用。' }, category: 'Business', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'tavily', name: { en: 'Tavily', zh: 'Tavily' }, description: { en: 'AI-powered web search, extraction, and research. Use when user wants to search the web, extract cont', zh: 'AI 驱动的网页搜索、提取和研究。当用户想要搜索网页、从 URL 提取内容时使用。' }, category: 'AI', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'us-gov-shutdown-tracker', name: { en: 'US Gov Shutdown Tracker', zh: '美国政府关门追踪器' }, description: { en: 'Track and analyze US government shutdown liquidity impacts by monitoring TGA (Treasury General Accou', zh: '通过监控 TGA（财政部普通账户）来追踪和分析美国政府关门的流动性影响。' }, category: 'Business', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'user-research', name: { en: 'User Research', zh: '用户研究' }, description: { en: '|', zh: '|' }, category: 'Business', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'weather', name: { en: 'Weather', zh: '天气' }, description: { en: '"Get current weather and forecasts via wttr.in or Open-Meteo. Use when: user asks about weather, tem', zh: '通过 wttr.in 或 Open-Meteo 获取当前天气和预报。当用户询问天气、温度等时使用。' }, category: 'Lifestyle', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'web', name: { en: 'Web Development', zh: 'Web 开发' }, description: { en: 'Build, debug, and deploy websites with HTML, CSS, JavaScript, modern frameworks, and production best', zh: '使用 HTML、CSS、JavaScript、现代框架和生产最佳实践来构建、调试和部署网站。' }, category: 'Development', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'website', name: { en: 'Website', zh: '网站' }, description: { en: 'Build fast, accessible, and SEO-friendly websites with modern best practices.', zh: '使用现代最佳实践构建快速、可访问且 SEO 友好的网站。' }, category: 'Development', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'xiaohongshu-automation', name: 'xiaohongshu-automation', description: '小红书内容自动化 — 监控关键词、生成文案、自动发布。Use when user needs to manage Xiaohongshu (RED) account: (1) Monitor keyw', category: 'Automation', tags: [], author: 'Local', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'find-skills', name: { en: 'Find Skills', zh: '查找技能' }, description: { en: 'Find and discover skills in the registry', zh: '在注册表中查找和发现技能' }, category: 'Development', tags: [], author: 'OpenClaw', version: '1.0.0', installCount: 0, rating: 0, repoUrl: "https://github.com/huangqianqian120/skillslibrary/tree/main/skills",
  lastUpdated: '2026-03-02' },
{ id: 'generative-media-skills', name: { en: 'Generative Media Skills', zh: '生成式媒体技能' }, description: { en: 'generative-media-skills', zh: '生成式媒体技能' }, category: 'Media', tags: [], author: "Local", version: '1.0.0', installCount: 0, rating: 0, repoUrl: 'https://github.com/huangqianqian120/skillslibrary/tree/main/skills', lastUpdated: '2026-03-04' },
{ id: 'twitter', name: { en: 'Twitter', zh: '推特' }, description: { en: 'Search and retrieve content from Twitter/X. Get user info, t', zh: '从 Twitter/X 搜索和检索内容。获取用户信息等。' }, category: 'Media', tags: [], author: "Local", version: '1.0.0', installCount: 0, rating: 0, repoUrl: 'https://github.com/huangqianqian120/skillslibrary/tree/main/skills', lastUpdated: '2026-03-04' },
{ id: 'research-framework', name: { en: 'Research Framework', zh: '研究框架' }, description: { en: 'research-framework', zh: '研究框架' }, category: 'AI', tags: [], author: "Local", version: '1.0.0', installCount: 0, rating: 0, repoUrl: 'https://github.com/huangqianqian120/skillslibrary/tree/main/skills', lastUpdated: '2026-03-04' },
{ id: 'domain-hunter', name: { en: 'Domain Hunter', zh: '域名猎手' }, description: { en: 'Search domains, compare prices, find promo codes, get purcha', zh: '搜索域名、比较价格、查找促销代码、获取购买建议。' }, category: 'Business', tags: [], author: "Local", version: '1.0.0', installCount: 0, rating: 0, repoUrl: 'https://github.com/huangqianqian120/skillslibrary/tree/main/skills', lastUpdated: '2026-03-04' },
{ id: 'persona-builder', name: { en: 'Persona Builder', zh: '用户画像构建器' }, description: { en: 'persona-builder', zh: '用户画像构建器' }, category: 'AI', tags: [], author: "Local", version: '1.0.0', installCount: 0, rating: 0, repoUrl: 'https://github.com/huangqianqian120/skillslibrary/tree/main/skills', lastUpdated: '2026-03-04' },
{ id: 'archive', name: { en: 'Archive', zh: '存档' }, description: { en: '"Archive session learnings, debugging solutions, and deploym', zh: '存档会话学习、调试解决方案和部署。' }, category: 'Productivity', tags: [], author: "Local", version: '1.0.0', installCount: 0, rating: 0, repoUrl: 'https://github.com/huangqianqian120/skillslibrary/tree/main/skills', lastUpdated: '2026-03-04' },
{ id: 'logo-creator', name: { en: 'Logo Creator', zh: 'Logo 创建器' }, description: { en: 'Create logos using AI image generation. Discuss style/ratio,', zh: '使用 AI 图像生成创建 Logo。讨论风格/比例等。' }, category: 'Media', tags: [], author: "Local", version: '1.0.0', installCount: 0, rating: 0, repoUrl: 'https://github.com/huangqianqian120/skillslibrary/tree/main/skills', lastUpdated: '2026-03-04' },
{ id: 'producthunt', name: { en: 'Product Hunt', zh: 'Product Hunt' }, description: { en: 'Search and retrieve content from Product Hunt. Get posts, to', zh: '从 Product Hunt 搜索和检索内容。获取帖子等。' }, category: 'Business', tags: [], author: "Local", version: '1.0.0', installCount: 0, rating: 0, repoUrl: 'https://github.com/huangqianqian120/skillslibrary/tree/main/skills', lastUpdated: '2026-03-04' },
{ id: 'nanobanana', name: { en: 'Nanobanana', zh: 'Nanobanana' }, description: { en: 'Generate and edit images using Google Gemini 3 Pro Image (Na', zh: '使用 Google Gemini 3 Pro Image (Na) 生成和编辑图像。' }, category: 'Media', tags: [], author: "Local", version: '1.0.0', installCount: 0, rating: 0, repoUrl: 'https://github.com/huangqianqian120/skillslibrary/tree/main/skills', lastUpdated: '2026-03-04' },
{ id: 'seo-geo', name: { en: 'SEO & GEO', zh: 'SEO 与 GEO' }, description: { en: 'SEO & GEO (Generative Engine Optimization) for websites. Ana', zh: '网站的 SEO 和 GEO（生成式引擎优化）。分析等。' }, category: 'Business', tags: [], author: "Local", version: '1.0.0', installCount: 0, rating: 0, repoUrl: 'https://github.com/huangqianqian120/skillslibrary/tree/main/skills', lastUpdated: '2026-03-04' },
{ id: 'reddit', name: { en: 'Reddit', zh: 'Reddit' }, description: { en: 'Search and retrieve content from Reddit. Get posts, comments', zh: '从 Reddit 搜索和检索内容。获取帖子、评论等。' }, category: 'Media', tags: [], author: "Local", version: '1.0.0', installCount: 0, rating: 0, repoUrl: 'https://github.com/huangqianqian120/skillslibrary/tree/main/skills', lastUpdated: '2026-03-04' },
{ id: 'hf-image-generator', name: { en: 'HF Image Generator', zh: 'HF 图像生成器' }, description: { en: 'hf-image-generator', zh: 'hf-image-generator' }, category: 'Media', tags: [], author: "Local", version: '1.0.0', installCount: 0, rating: 0, repoUrl: 'https://github.com/huangqianqian120/skillslibrary/tree/main/skills', lastUpdated: '2026-03-04' },
{ id: 'insights-analyzer', name: { en: 'Insights Analyzer', zh: '洞察分析器' }, description: { en: 'insights-analyzer', zh: '洞察分析器' }, category: 'AI', tags: [], author: "Local", version: '1.0.0', installCount: 0, rating: 0, repoUrl: 'https://github.com/huangqianqian120/skillslibrary/tree/main/skills', lastUpdated: '2026-03-04' },
{ id: 'banner-creator', name: { en: 'Banner Creator', zh: '横幅创建器' }, description: { en: 'Create banners using AI image generation. Discuss format/sty', zh: '使用 AI 图像生成创建横幅。讨论格式/风格等。' }, category: 'Media', tags: [], author: "Local", version: '1.0.0', installCount: 0, rating: 0, repoUrl: 'https://github.com/huangqianqian120/skillslibrary/tree/main/skills', lastUpdated: '2026-03-04' },
{ id: 'interview-ai', name: { en: 'Interview AI', zh: '面试 AI' }, description: { en: 'interview-ai', zh: '面试 AI' }, category: 'Productivity', tags: [], author: "Local", version: '1.0.0', installCount: 0, rating: 0, repoUrl: 'https://github.com/huangqianqian120/skillslibrary/tree/main/skills', lastUpdated: '2026-03-04' },
{ id: 'requesthunt', name: { en: 'Request Hunt', zh: '需求猎手' }, description: { en: 'Generate user demand research reports from real user feedbac', zh: '从真实用户反馈中生成用户需求研究报告。' }, category: 'Business', tags: [], author: "Local", version: '1.0.0', installCount: 0, rating: 0, repoUrl: 'https://github.com/huangqianqian120/skillslibrary/tree/main/skills', lastUpdated: '2026-03-04' },
{ id: 'git-manager', name: { en: 'Git Manager', zh: 'Git 管理器' }, description: { en: 'Comprehensive Git operations for repository management. Use for committing, branching, PRs, merging, and syncing.', zh: '用于存储库管理的综合 Git 操作。用于提交、分支、PR、合并和同步。' }, category: 'Development', tags: [], author: "Local", version: '1.0.0', installCount: 0, rating: 0, repoUrl: 'https://github.com/huangqianqian120/skillslibrary/tree/main/skills', lastUpdated: '2026-03-05' },
]
