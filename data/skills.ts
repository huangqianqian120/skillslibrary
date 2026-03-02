export interface Skill {
  id: string
  name: string
  description: string
  emoji?: string
  category: string
  tags?: string[]
  author?: string
  version?: string
  installCount?: number
  rating?: number
  lastUpdated?: string
}

export const categories = ['All', 'AI', 'Automation', 'Business', 'Communication', 'Data', 'Development', 'Lifestyle', 'Media', 'Productivity']

export const tagsConfig = {
  New: { label: { en: 'New', zh: '🆕 新增' }, color: 'bg-green-500' },
  Popular: { label: { en: 'Popular', zh: '🔥 热门' }, color: 'bg-orange-500' },
  Official: { label: { en: 'Official', zh: '✨ 官方' }, color: 'bg-blue-500' },
}

export const skills: Skill[] = [
  { id: '1password', name: '1password', description: 'Set up and use 1Password CLI (op).', category: 'Development', tags: ['Official'], author: 'OpenClaw', version: '1.0.0', installCount: 1250, rating: 4.8, lastUpdated: '2026-01-15' },
  { id: 'apple-notes', name: 'apple-notes', description: 'Manage Apple Notes via the memo CLI.', category: 'Productivity', tags: [], author: 'Community', version: '2.1.0', installCount: 890, rating: 4.5, lastUpdated: '2026-02-20' },
  { id: 'weather', name: 'weather', description: 'Get current weather and forecasts via wttr.in or Open-Meteo.', category: 'Lifestyle', tags: ['New'], author: 'OpenClaw', version: '1.2.0', installCount: 2100, rating: 4.9, lastUpdated: '2026-03-01' },
  { id: 'marketing-ideas', name: 'marketing-ideas', description: '139 proven marketing approaches for SaaS products.', category: 'Business', tags: ['Popular'], author: 'Community', version: '1.0.0', installCount: 567, rating: 4.6, lastUpdated: '2026-02-10' },
  { id: 'marketing-psychology', name: 'marketing-psychology', description: '70+ psychological principles for marketing.', category: 'Business', tags: [], author: 'Community', version: '1.0.0', installCount: 234, rating: 4.4, lastUpdated: '2026-02-10' },
  { id: 'location-advisor', name: 'location-advisor', description: 'Location advisor based on McKinsey methodology.', category: 'Business', tags: ['New', 'Official'], author: 'Qianqian', version: '1.0.0', installCount: 0, rating: 0, lastUpdated: '2026-03-02' },
  { id: 'mckinsey-consultant', name: 'mckinsey-consultant', description: 'McKinsey-style problem solving and PPT generation.', category: 'Business', tags: ['Popular', 'Official'], author: 'Community', version: '3.1', installCount: 890, rating: 4.8, lastUpdated: '2025-10-26' },
  { id: 'hello-world', name: 'hello-world', description: 'Hello World in various programming languages.', category: 'Development', tags: [], author: 'OpenClaw', version: '1.0.0', installCount: 1500, rating: 4.9, lastUpdated: '2026-01-01' },
  { id: 'automation', name: 'automation', description: 'Automation workflow for repetitive tasks.', category: 'Automation', tags: ['Popular'], author: 'OpenClaw', version: '2.0.0', installCount: 2100, rating: 4.7, lastUpdated: '2026-01-15' },
  { id: 'notion', name: 'notion', description: 'Manage Notion workspace and pages.', category: 'Productivity', tags: ['Popular'], author: 'Community', version: '1.0.0', installCount: 1100, rating: 4.7, lastUpdated: '2026-01-20' },
  { id: 'blogwatcher', name: 'blogwatcher', description: 'Monitor blogs and RSS feeds for updates.', category: 'Development', tags: [], author: 'Community', version: '1.0.0', installCount: 280, rating: 4.2, lastUpdated: '2026-01-10' },
  { id: 'twitter', name: 'twitter', description: 'Twitter/X operations and automation.', category: 'Communication', tags: ['Popular'], author: 'Community', version: '1.0.0', installCount: 780, rating: 4.6, lastUpdated: '2026-01-25' },
  { id: 'copywriting', name: 'copywriting', description: 'Write marketing copy for landing pages.', category: 'Productivity', tags: [], author: 'Community', version: '1.0.0', installCount: 420, rating: 4.5, lastUpdated: '2026-01-15' },
  { id: 'frontend', name: 'frontend', description: 'Build polished user interfaces.', category: 'Development', tags: ['Popular'], author: 'OpenClaw', version: '1.0.0', installCount: 1200, rating: 4.8, lastUpdated: '2026-01-20' },
  { id: 'healthcheck', name: 'healthcheck', description: 'Host security hardening and risk configuration.', category: 'Development', tags: [], author: 'OpenClaw', version: '1.0.0', installCount: 380, rating: 4.4, lastUpdated: '2026-01-18' },
  { id: 'seo-audit', name: 'seo-audit', description: 'Audit and diagnose SEO issues.', category: 'Business', tags: [], author: 'Community', version: '1.0.0', installCount: 280, rating: 4.3, lastUpdated: '2026-01-22' },
  { id: 'content-strategy', name: 'content-strategy', description: 'Plan content strategy and topics.', category: 'Business', tags: [], author: 'Community', version: '1.0.0', installCount: 150, rating: 4.0, lastUpdated: '2026-01-12' },
  { id: 'growth', name: 'growth', description: 'Product growth and product-market fit.', category: 'Business', tags: [], author: 'Community', version: '1.0.0', installCount: 260, rating: 4.3, lastUpdated: '2026-01-15' },
  { id: 'user-research', name: 'user-research', description: 'User research and customer discovery.', category: 'Business', tags: [], author: 'Community', version: '1.0.0', installCount: 200, rating: 4.2, lastUpdated: '2026-01-10' },
  { id: 'product-strategy', name: 'product-strategy', description: 'Product strategy and prioritization.', category: 'Business', tags: [], author: 'Community', version: '1.0.0', installCount: 240, rating: 4.3, lastUpdated: '2026-01-18' },
  { id: 'entrepreneurship', name: 'entrepreneurship', description: 'Startup and business building principles.', category: 'Business', tags: [], author: 'Community', version: '1.0.0', installCount: 180, rating: 4.2, lastUpdated: '2026-01-08' },
  { id: 'competitor-tracker', name: 'competitor-tracker', description: 'Track competitor activities and updates.', category: 'Business', tags: [], author: 'Community', version: '1.0.0', installCount: 220, rating: 4.3, lastUpdated: '2026-01-15' },
  { id: 'business-news-aggregator', name: 'business-news-aggregator', description: 'Aggregate business and tech industry news.', category: 'Business', tags: [], author: 'Community', version: '1.0.0', installCount: 190, rating: 4.1, lastUpdated: '2026-01-20' },
  { id: 'ai-news-aggregator', name: 'ai-news-aggregator', description: 'Aggregate AI/LLM/Agent news from multiple sources.', category: 'AI', tags: ['New'], author: 'Community', version: '1.0.0', installCount: 340, rating: 4.5, lastUpdated: '2026-02-01' },
  { id: 'analytics-tracking', name: 'analytics-tracking', description: 'Set up and improve analytics tracking.', category: 'Business', tags: [], author: 'OpenClaw', version: '1.0.0', installCount: 560, rating: 4.4, lastUpdated: '2026-01-25' },
  { id: 'ab-test-setup', name: 'ab-test-setup', description: 'A/B test and experiment setup for SaaS.', category: 'Business', tags: [], author: 'Community', version: '1.0.0', installCount: 120, rating: 4.3, lastUpdated: '2026-01-18' },
  { id: 'ddg-web-search', name: 'ddg-web-search', description: 'Web search using DuckDuckGo Lite.', category: 'Development', tags: [], author: 'OpenClaw', version: '1.0.0', installCount: 890, rating: 4.6, lastUpdated: '2026-01-22' },
  { id: 'document-summarizer', name: 'document-summarizer', description: 'Summarize long documents and articles.', category: 'AI', tags: [], author: 'Community', version: '1.0.0', installCount: 310, rating: 4.4, lastUpdated: '2026-01-15' },
  { id: 'firecrawl', name: 'firecrawl', description: 'Web scraping tool for AI applications.', category: 'Development', tags: [], author: 'Community', version: '1.0.0', installCount: 450, rating: 4.5, lastUpdated: '2026-01-20' },
  { id: 'http-retry', name: 'http-retry', description: 'Universal HTTP retry with exponential backoff.', category: 'Development', tags: [], author: 'Community', version: '1.0.0', installCount: 340, rating: 4.4, lastUpdated: '2026-01-18' },
  { id: 'html', name: 'html', description: 'HTML best practices and accessibility.', category: 'Development', tags: [], author: 'OpenClaw', version: '1.0.0', installCount: 670, rating: 4.5, lastUpdated: '2026-01-12' },
  { id: 'tavily', name: 'tavily', description: 'AI-powered web search and research.', category: 'AI', tags: [], author: 'Community', version: '1.0.0', installCount: 360, rating: 4.4, lastUpdated: '2026-01-25' },
  { id: 'web', name: 'web', description: 'Build websites with HTML, CSS, JavaScript.', category: 'Development', tags: [], author: 'Community', version: '1.0.0', installCount: 520, rating: 4.6, lastUpdated: '2026-01-20' },
  { id: 'website', name: 'website', description: 'Build fast, accessible, SEO-friendly websites.', category: 'Development', tags: [], author: 'Community', version: '1.0.0', installCount: 480, rating: 4.5, lastUpdated: '2026-01-18' },
  { id: 'skills-library', name: 'skills-library', description: 'Browse and manage OpenClaw skills.', category: 'Development', tags: ['Official'], author: 'OpenClaw', version: '1.0.0', installCount: 450, rating: 4.5, lastUpdated: '2026-02-01' },
  { id: 'mimeng-writing', name: 'mimeng-writing', description: 'Viral article writing techniques.', category: 'Productivity', tags: [], author: 'Community', version: '1.0.0', installCount: 520, rating: 4.6, lastUpdated: '2026-01-15' },
  { id: 'nano-pdf', name: 'nano-pdf', description: 'PDF processing and manipulation.', category: 'Media', tags: [], author: 'Community', version: '1.0.0', installCount: 380, rating: 4.3, lastUpdated: '2026-01-12' },
  { id: 'reddit', name: 'reddit', description: 'Reddit search and monitoring.', category: 'Communication', tags: [], author: 'Community', version: '1.0.0', installCount: 310, rating: 4.2, lastUpdated: '2026-01-18' },
  { id: 'producthunt', name: 'producthunt', description: 'Track and analyze Product Hunt launches.', category: 'Business', tags: [], author: 'Community', version: '1.0.0', installCount: 190, rating: 4.1, lastUpdated: '2026-01-20' },
  { id: 'us-gov-shutdown-tracker', name: 'us-gov-shutdown-tracker', description: 'Track US government shutdown liquidity impacts.', category: 'Business', tags: [], author: 'Community', version: '1.0.0', installCount: 90, rating: 4.0, lastUpdated: '2026-01-10' },
  { id: 'hf-image-generator', name: 'hf-image-generator', description: 'Generate images using Hugging Face models.', category: 'Media', tags: ['New'], author: 'Community', version: '1.0.0', installCount: 290, rating: 4.3, lastUpdated: '2026-02-01' },
  { id: 'banner-creator', name: 'banner-creator', description: 'Create promotional banners and ads.', category: 'Media', tags: [], author: 'Community', version: '1.0.0', installCount: 180, rating: 4.1, lastUpdated: '2026-01-15' },
  { id: 'logo-creator', name: 'logo-creator', description: 'Create logos and brand identity.', category: 'Media', tags: [], author: 'Community', version: '1.0.0', installCount: 220, rating: 4.2, lastUpdated: '2026-01-18' },
  { id: 'domain-hunter', name: 'domain-hunter', description: 'Search and compare domain names.', category: 'Business', tags: [], author: 'Community', version: '1.0.0', installCount: 160, rating: 4.0, lastUpdated: '2026-01-12' },
  { id: 'seo-geo', name: 'seo-geo', description: 'SEO for geographic targeting.', category: 'Business', tags: [], author: 'Community', version: '1.0.0', installCount: 140, rating: 3.9, lastUpdated: '2026-01-10' },
  { id: 'requesthunt', name: 'requesthunt', description: 'Track feature requests and user feedback.', category: 'Development', tags: [], author: 'Community', version: '1.0.0', installCount: 150, rating: 4.0, lastUpdated: '2026-01-15' },
  { id: 'research-framework', name: 'research-framework', description: 'Research framework for systematic analysis.', category: 'Business', tags: [], author: 'Community', version: '1.0.0', installCount: 110, rating: 4.1, lastUpdated: '2026-01-08' },
  { id: 'persona-builder', name: 'persona-builder', description: 'Build user personas for products.', category: 'AI', tags: [], author: 'Community', version: '1.0.0', installCount: 170, rating: 4.0, lastUpdated: '2026-01-12' },
  { id: 'interview-ai', name: 'interview-ai', description: 'AI-powered interview preparation.', category: 'AI', tags: [], author: 'Community', version: '1.0.0', installCount: 210, rating: 4.2, lastUpdated: '2026-01-18' },
  { id: 'insights-analyzer', name: 'insights-analyzer', description: 'Analyze meeting transcripts and notes.', category: 'AI', tags: [], author: 'Community', version: '1.0.0', installCount: 140, rating: 4.1, lastUpdated: '2026-01-10' },
  { id: 'xiaohongshu-automation', name: 'xiaohongshu-automation', description: 'Xiaohongshu (Red) automation tools.', category: 'Communication', tags: [], author: 'Community', version: '1.0.0', installCount: 280, rating: 4.3, lastUpdated: '2026-01-20' },
  { id: 'llm-router', name: 'llm-router', description: 'Route queries to different LLM providers.', category: 'AI', tags: ['Popular', 'Official'], author: 'OpenClaw', version: '2.0.0', installCount: 3200, rating: 4.7, lastUpdated: '2026-01-28' },
  { id: 'rag-pipeline', name: 'rag-pipeline', description: 'Build RAG pipelines with chunking and embedding.', category: 'AI', tags: ['New'], author: 'Community', version: '1.0.0', installCount: 156, rating: 4.3, lastUpdated: '2026-02-25' },
  { id: 'data-cleaner', name: 'data-cleaner', description: 'Clean and transform data.', category: 'Data', tags: [], author: 'Community', version: '1.1.0', installCount: 420, rating: 4.2, lastUpdated: '2026-01-20' },
  { id: 'auto-workflow', name: 'auto-workflow', description: 'Create automated workflows.', category: 'Automation', tags: ['Popular'], author: 'OpenClaw', version: '1.5.0', installCount: 1800, rating: 4.6, lastUpdated: '2026-02-15' },
  { id: 'github', name: 'github', description: 'GitHub operations and automation.', category: 'Development', tags: ['Popular'], author: 'OpenClaw', version: '1.0.0', installCount: 2500, rating: 4.8, lastUpdated: '2026-01-20' },
  { id: 'slack', name: 'slack', description: 'Slack messaging and automation.', category: 'Communication', tags: [], author: 'Community', version: '1.0.0', installCount: 650, rating: 4.5, lastUpdated: '2026-01-15' },
  { id: 'discord', name: 'discord', description: 'Discord bot and automation.', category: 'Communication', tags: [], author: 'Community', version: '1.0.0', installCount: 580, rating: 4.4, lastUpdated: '2026-01-18' },
  { id: 'whatsapp', name: 'whatsapp', description: 'WhatsApp messaging automation.', category: 'Communication', tags: [], author: 'Community', version: '1.0.0', installCount: 420, rating: 4.3, lastUpdated: '2026-01-12' },
  { id: 'imessage', name: 'imessage', description: 'iMessage operations on macOS.', category: 'Communication', tags: [], author: 'Community', version: '1.0.0', installCount: 350, rating: 4.4, lastUpdated: '2026-01-10' },
  { id: 'gmail', name: 'gmail', description: 'Gmail automation and management.', category: 'Productivity', tags: [], author: 'Community', version: '1.0.0', installCount: 480, rating: 4.5, lastUpdated: '2026-01-15' },
  { id: 'calendar', name: 'calendar', description: 'Calendar management and scheduling.', category: 'Productivity', tags: [], author: 'Community', version: '1.0.0', installCount: 390, rating: 4.4, lastUpdated: '2026-01-12' },
  { id: 'drive', name: 'drive', description: 'Google Drive file management.', category: 'Productivity', tags: [], author: 'Community', version: '1.0.0', installCount: 320, rating: 4.3, lastUpdated: '2026-01-10' },
  { id: 'zoom', name: 'zoom', description: 'Zoom meeting automation.', category: 'Communication', tags: [], author: 'Community', version: '1.0.0', installCount: 410, rating: 4.4, lastUpdated: '2026-01-18' },
  { id: 'spotify', name: 'spotify', description: 'Spotify playback control.', category: 'Media', tags: [], author: 'Community', version: '1.0.0', installCount: 290, rating: 4.2, lastUpdated: '2026-01-15' },
  { id: 'youtube', name: 'youtube', description: 'YouTube video management.', category: 'Media', tags: [], author: 'Community', version: '1.0.0', installCount: 380, rating: 4.3, lastUpdated: '2026-01-20' },
  { id: 'sag', name: 'sag', description: 'ElevenLabs voice output (SAG).', category: 'Media', tags: [], author: 'Community', version: '1.0.0', installCount: 520, rating: 4.6, lastUpdated: '2026-01-22' },
  { id: 'whisper', name: 'whisper', description: 'OpenAI Whisper transcription.', category: 'Media', tags: [], author: 'Community', version: '1.0.0', installCount: 440, rating: 4.5, lastUpdated: '2026-01-18' },
