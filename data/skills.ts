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
  {
    id: "ab-test-setup",
    name: "ab-test-setup",
    description: "When the user wants to plan, design, or implement an A/B test or experiment. Also use when the user mentions \"A/B test,\" \"split test,\" \"experiment,\" \"test this change,\" \"variant copy,\" \"multivariate test,\" or \"hypothesis.\" For tracking implementation, see analytics-tracking.",
    category: "Productivity",
    tags: [],
    version: "1.0.0"
  },
  {
    id: "ai-news-aggregator",
    name: "ai-news-aggregator",
    description: "Aggregate and summarize AI/LLM/Agent news from multiple sources. Use when user needs latest AI news, GitHub trending, research papers, or daily AI briefing. Supports Hacker News, GitHub Trending, arXiv, and Hugging Face.",
    category: "Productivity",
    tags: []
  },
  {
    id: "analytics-tracking",
    name: "analytics-tracking",
    description: "When the user wants to set up, improve, or audit analytics tracking and measurement. Also use when the user mentions \"set up tracking,\" \"GA4,\" \"Google Analytics,\" \"conversion tracking,\" \"event tracking,\" \"UTM parameters,\" \"tag manager,\" \"GTM,\" \"analytics implementation,\" or \"tracking plan.\" For A/B test measurement, see ab-test-setup.",
    category: "Productivity",
    tags: [],
    version: "1.0.0"
  },
  {
    id: "archive",
    name: "archive",
    description: "Archive session learnings, debugging solutions, and deployment logs to .archive/yyyy-mm-dd/ as indexed markdown with searchable tags. Use when completing a significant task, resolving a tricky bug, deploying, or when the user says \\\"archive this\\\". Maintains .archive/MEMORY.md index for cross-session knowledge reuse.",
    category: "Productivity",
    tags: []
  },
  {
    id: "banner-creator",
    name: "banner-creator",
    description: "Create banners using AI image generation. Discuss format/style, generate variations, iterate with user feedback, crop to target ratio. Use when user wants to create a banner, header, hero image, cover image, GitHub banner, Twitter header, or readme banner.",
    category: "Productivity",
    tags: []
  },
  {
    id: "blogwatcher",
    name: "blogwatcher",
    description: "Monitor blogs and RSS/Atom feeds for updates using the blogwatcher CLI.",
    category: "Productivity",
    tags: []
  },
  {
    id: "business-news-aggregator",
    name: "business-news-aggregator",
    description: "Aggregate business and tech industry news. Use when user needs latest tech industry dynamics, startup funding news, company earnings, or business intelligence. Sources include tech blogs, news sites, and startup databases.",
    category: "Productivity",
    tags: []
  },
  {
    id: "clawathon",
    name: "clawathon",
    description: "The first AI agent hackathon. Teams of agents build together on Openwork.",
    category: "Productivity",
    tags: [],
    version: "1.5.1"
  },
  {
    id: "competitor-tracker",
    name: "competitor-tracker",
    description: "Track competitor activities and updates. Use when user needs to monitor specific companies, track competitor products, or stay updated on competitive landscape. Monitors news, product releases, social media, and public updates.",
    category: "Productivity",
    tags: []
  },
  {
    id: "content-strategy",
    name: "content-strategy",
    description: "When the user wants to plan a content strategy, decide what content to create, or figure out what topics to cover. Also use when the user mentions \"content strategy,\" \"what should I write about,\" \"content ideas,\" \"blog strategy,\" \"topic clusters,\" or \"content planning.\" For writing individual pieces, see copywriting. For SEO-specific audits, see seo-audit.",
    category: "Productivity",
    tags: [],
    version: "1.0.0"
  },
  {
    id: "copywriting",
    name: "copywriting",
    description: "When the user wants to write, rewrite, or improve marketing copy for any page — including homepage, landing pages, pricing pages, feature pages, about pages, or product pages. Also use when the user says \"write copy for,\" \"improve this copy,\" \"rewrite this page,\" \"marketing copy,\" \"headline help,\" or \"CTA copy.\" For email copy, see email-sequence. For popup copy, see popup-cro.",
    category: "Productivity",
    tags: [],
    version: "1.0.0"
  },
  {
    id: "ddg-web-search",
    name: "ddg-search",
    description: "Web search without an API key using DuckDuckGo Lite via web_fetch. Use as a fallback when web_search fails with missing_brave_api_key error, or whenever you need to search the web and no search API is configured. Provides titles, URLs, and snippets for research queries. Zero dependencies — works with just the built-in web_fetch tool.",
    category: "Productivity",
    tags: []
  },
  {
    id: "document-summarizer",
    name: "document-summarizer",
    description: "Summarize long documents, articles, and papers. Use when user shares a URL, PDF link, or file path and wants key information extracted. Supports Chinese and English.",
    category: "Productivity",
    tags: []
  },
  {
    id: "domain-hunter",
    name: "domain-hunter",
    description: "Search domains, compare prices, find promo codes, get purchase recommendations. Use when user wants to buy a domain, check domain prices, find domain deals, compare registrars, or search for .ai/.com domains.",
    category: "Productivity",
    tags: []
  },
  {
    id: "entrepreneurship",
    name: "entrepreneurship",
    description: "|",
    category: "Productivity",
    tags: []
  },
  {
    id: "find-skills",
    name: "find-skills",
    description: "Helps users discover and install agent skills when they ask questions like \"how do I do X\", \"find a skill for X\", \"is there a skill that can...\", or express interest in extending capabilities. This skill should be used when the user is looking for functionality that might exist as an installable skill.",
    category: "Productivity",
    tags: []
  },
  {
    id: "firecrawl",
    name: "firecrawl",
    description: "网页数据抓取工具，用于 AI 应用。将网页转换为 Markdown 或结构化 JSON 数据。支持抓取、爬取、搜索等功能。适用于需要获取网页内容的 AI Agent 场景。",
    category: "Productivity",
    tags: []
  },
  {
    id: "frontend",
    name: "Frontend",
    description: "Build polished user interfaces across web and mobile with consistent UX patterns.",
    category: "Productivity",
    tags: []
  },
  {
    id: "frontend-design",
    name: "frontend-design",
    description: "Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, or applications. Generates creative, polished code that avoids generic AI aesthetics.",
    category: "Productivity",
    tags: []
  },
  {
    id: "git-manager",
    name: "git-manager",
    description: "|",
    category: "Productivity",
    tags: []
  },
  {
    id: "growth",
    name: "growth",
    description: "|",
    category: "Productivity",
    tags: []
  },
  {
    id: "healthcheck",
    name: "healthcheck",
    description: "Host security hardening and risk-tolerance configuration for OpenClaw deployments. Use when a user asks for security audits, firewall/SSH/update hardening, risk posture, exposure review, OpenClaw cron scheduling for periodic checks, or version status checks on a machine running OpenClaw (laptop, workstation, Pi, VPS).",
    category: "Productivity",
    tags: []
  },
  {
    id: "hello-world",
    name: "hello-world",
    description: "A simple skill that prints \"Hello, World!\" in various programming languages. Use when the user wants to see a basic hello world example in different languages.",
    category: "Productivity",
    tags: []
  },
  {
    id: "html",
    name: "HTML",
    description: "Avoid common HTML mistakes — accessibility gaps, form pitfalls, and SEO oversights.",
    category: "Productivity",
    tags: []
  },
  {
    id: "http-retry",
    name: "http-retry",
    description: "Universal HTTP retry mechanism with exponential backoff. Use when making API calls that may fail due to network issues, timeouts, or rate limits.",
    category: "Productivity",
    tags: [],
    version: "1.0.0"
  },
  {
    id: "infinite-dev-skill",
    name: "infinite-dev-skill",
    description: "Claude Code 无限开发循环技能 - 让 Claude 成为无限开发循环：spec → feature list → implement → test → commit → repeat，跨无限制上下文窗口。",
    emoji: "🔄",
    category: "Development",
    tags: [
      "Claude Code",
      "Development",
      "Automation",
      "Loop",
      "Agent"
    ],
    author: "RobertWang4",
    version: "1.0.0",
    repoUrl: "https://github.com/RobertWang4/infinite-dev-skill"
  },
  {
    id: "location-advisor",
    name: "location-advisor",
    description: "选址顾问系统。基于McKinsey方法论，通过MECE因素拆解和数据驱动评分，帮助完成零售门店、餐饮、仓库、工厂、办公室等选址决策。支持API集成和无API时的手动输入模式。",
    category: "Productivity",
    tags: []
  },
  {
    id: "logo-creator",
    name: "logo-creator",
    description: "Create logos using AI image generation. Discuss style/ratio, generate variations, iterate with user feedback, crop, remove background, and export as SVG. Use when user wants to create a logo, icon, favicon, brand mark, mascot, emblem, or design a logo.",
    category: "Productivity",
    tags: []
  },
  {
    id: "marketing-ideas",
    name: "marketing-ideas",
    description: "When the user needs marketing ideas, inspiration, or strategies for their SaaS or software product. Also use when the user asks for 'marketing ideas,' 'growth ideas,' 'how to market,' 'marketing strategies,' 'marketing tactics,' 'ways to promote,' or 'ideas to grow.' This skill provides 139 proven marketing approaches organized by category.",
    category: "Productivity",
    tags: [],
    version: "1.0.0"
  },
  {
    id: "marketing-psychology",
    name: "marketing-psychology",
    description: "When the user wants to apply psychological principles, mental models, or behavioral science to marketing. Also use when the user mentions 'psychology,' 'mental models,' 'cognitive bias,' 'persuasion,' 'behavioral science,' 'why people buy,' 'decision-making,' or 'consumer behavior.' This skill provides 70+ mental models organized for marketing application.",
    category: "Productivity",
    tags: [],
    version: "1.0.0"
  },
  {
    id: "mckinsey-consultant",
    name: "mckinsey-consultant",
    description: "McKinsey顾问式问题解决系统。从商业问题出发,通过假设驱动的结构化分析方法,生成McKinsey风格研究报告和PPT。融合Problem Solving方法论、MECE原则、Issue Tree拆解、Hypotheses形成、Dummy Page设计、智能数据收集和专业PPT生成能力。",
    category: "Productivity",
    tags: []
  },
  {
    id: "mimeng-writing",
    name: "mimeng-writing",
    description: "咪蒙爆款文章写作技巧。适用于需要创作10万+阅读量爆款文章、情感共鸣类内容、故事叙事或社会议题评论时使用。掌握标题制造、开篇设计、情绪调动、金句提炼、故事叙事等核心技巧。",
    category: "Productivity",
    tags: []
  },
  {
    id: "nano-pdf",
    name: "nano-pdf",
    description: "Edit PDFs with natural-language instructions using the nano-pdf CLI.",
    category: "Productivity",
    tags: []
  },
  {
    id: "nanobanana",
    name: "nanobanana",
    description: "Generate and edit images using Google Gemini 3 Pro Image (Nano Banana Pro). Supports text-to-image, image editing, various aspect ratios, and high-resolution output (2K/4K). Use when user wants to generate images, create images, use Gemini image generation, or do AI image generation.",
    category: "Productivity",
    tags: []
  },
  {
    id: "notion",
    name: "notion",
    description: "Notion API for creating and managing pages, databases, and blocks.",
    category: "Productivity",
    tags: []
  },
  {
    id: "ppt-agent-skill",
    name: "ppt-agent-skill",
    description: "专业 PPT 演示文稿全流程 AI 生成助手。模拟万元/页级别 PPT 设计公司的完整工作流，输出高质量 HTML 演示文稿 + 可编辑矢量 PPTX。",
    emoji: "📊",
    category: "Productivity",
    tags: [
      "PPT",
      "Presentation",
      "AI",
      "Design",
      "Automation"
    ],
    author: "sunbigfly",
    version: "1.0.0",
    repoUrl: "https://github.com/sunbigfly/ppt-agent-skill"
  },
  {
    id: "product-strategy",
    name: "product-strategy",
    description: "|",
    category: "Productivity",
    tags: []
  },
  {
    id: "producthunt",
    name: "producthunt",
    description: "Search and retrieve content from Product Hunt. Get posts, topics, users, and collections via the GraphQL API. Use when user mentions Product Hunt, PH, or product launches.",
    category: "Productivity",
    tags: []
  },
  {
    id: "reddit",
    name: "reddit",
    description: "Search and retrieve content from Reddit. Get posts, comments, subreddit info, and user profiles via the public JSON API. Use when user mentions Reddit, a subreddit, or r/ links.",
    category: "Productivity",
    tags: []
  },
  {
    id: "requesthunt",
    name: "requesthunt",
    description: "Generate user demand research reports from real user feedback. Scrape and analyze feature requests, complaints, and questions from Reddit, X, and GitHub. Use when user wants to do demand research, find feature requests, analyze user demand, or run RequestHunt queries.",
    category: "Productivity",
    tags: []
  },
  {
    id: "seo-audit",
    name: "seo-audit",
    description: "When the user wants to audit, review, or diagnose SEO issues on their site. Also use when the user mentions \"SEO audit,\" \"technical SEO,\" \"why am I not ranking,\" \"SEO issues,\" \"on-page SEO,\" \"meta tags review,\" or \"SEO health check.\" For building pages at scale to target keywords, see programmatic-seo. For adding structured data, see schema-markup.",
    category: "Productivity",
    tags: [],
    version: "1.0.0"
  },
  {
    id: "seo-geo",
    name: "seo-geo",
    description: "SEO & GEO (Generative Engine Optimization) for websites. Analyze keywords, generate schema markup, optimize for AI search engines (ChatGPT, Perplexity, Gemini, Copilot, Claude) and traditional search (Google, Bing). Use when user wants to improve search visibility, search optimization, search ranking, AI visibility, ChatGPT ranking, Google AI Overview, indexing, JSON-LD, meta tags, or keyword research.",
    category: "Productivity",
    tags: []
  },
  {
    id: "skill-md",
    name: "skill-md",
    description: "Expert assistant for using litdb - a literature and document database for scientific research",
    category: "Productivity",
    tags: []
  },
  {
    id: "tavily",
    name: "tavily",
    description: "AI-powered web search, extraction, and research. Use when user wants to search the web, extract content from URLs, crawl websites, or do deep research on a topic.",
    category: "Productivity",
    tags: [],
    version: "1.0.0"
  },
  {
    id: "twitter",
    name: "twitter",
    description: "Search and retrieve content from Twitter/X. Get user info, tweets, replies, followers, communities, spaces, and trends via twitterapi.io. Use when user mentions Twitter, X, or tweets.",
    category: "Productivity",
    tags: []
  },
  {
    id: "us-gov-shutdown-tracker",
    name: "us-gov-shutdown-tracker",
    description: "Track and analyze US government shutdown liquidity impacts by monitoring TGA (Treasury General Account), bank reserves, EFFR, and SOFR data from FRED API. Use when user wants to (1) analyze current or past government shutdown effects on financial markets, (2) track liquidity conditions during fiscal policy disruptions, (3) assess \"stealth tightening\" effects, (4) compare shutdown episodes across different monetary policy regimes (QE vs QT), or (5) generate liquidity stress reports with historical context. Recommended usage frequency is weekly on Wednesdays after TGA/reserve data releases.",
    category: "Productivity",
    tags: []
  },
  {
    id: "user-research",
    name: "user-research",
    description: "|",
    category: "Productivity",
    tags: []
  },
  {
    id: "weather",
    name: "weather",
    description: "Get current weather and forecasts via wttr.in or Open-Meteo. Use when: user asks about weather, temperature, or forecasts for any location. NOT for: historical weather data, severe weather alerts, or detailed meteorological analysis. No API key needed.",
    category: "Productivity",
    tags: []
  },
  {
    id: "web",
    name: "Web Development",
    description: "Build, debug, and deploy websites with HTML, CSS, JavaScript, modern frameworks, and production best practices.",
    category: "Productivity",
    tags: []
  },
  {
    id: "website",
    name: "Website",
    description: "Build fast, accessible, and SEO-friendly websites with modern best practices.",
    category: "Productivity",
    tags: []
  },
  {
    id: "wps-skills",
    name: "wps-skills",
    description: "WPS Office 智能助手 - AI编程助手通过自然语言操控WPS Office的MCP工具集。支持Excel(80工具) / Word(24工具) / PPT(111工具) / 通用(9工具)。",
    emoji: "📊",
    category: "Productivity",
    tags: [
      "WPS",
      "Office",
      "Excel",
      "Word",
      "PPT",
      "MCP",
      "Automation"
    ],
    author: "lc2panda",
    version: "1.0.0",
    repoUrl: "https://github.com/lc2panda/wps-skills"
  },
  {
    id: "xiaohongshu-automation",
    name: "xiaohongshu-automation",
    description: "|",
    category: "Productivity",
    tags: []
  }
]
