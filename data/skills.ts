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
  { id: 'apple-notes', name: 'apple-notes', description: 'Manage Apple Notes via the memo CLI.', category: 'Productivity', tags: ['Popular'], author: 'Community', version: '2.1.0', installCount: 890, rating: 4.5, lastUpdated: '2026-02-20' },
  { id: 'weather', name: 'weather', description: 'Get current weather and forecasts via wttr.in or Open-Meteo.', category: 'Lifestyle', tags: ['New'], author: 'OpenClaw', version: '1.2.0', installCount: 2100, rating: 4.9, lastUpdated: '2026-03-01' },
  { id: 'marketing-ideas', name: 'marketing-ideas', description: 'When the user needs marketing ideas. This skill provides 139 proven marketing approaches.', category: 'Business', tags: ['Popular'], author: 'Community', version: '1.0.0', installCount: 567, rating: 4.6, lastUpdated: '2026-02-10' },
  { id: 'marketing-psychology', name: 'marketing-psychology', description: 'When the user wants to apply psychological principles to marketing. This skill provides 70+ mental models.', category: 'Business', tags: [], author: 'Community', version: '1.0.0', installCount: 234, rating: 4.4, lastUpdated: '2026-02-10' },
  { id: 'location-advisor', name: 'location-advisor', description: 'Location advisor system based on McKinsey methodology. Uses MECE factor breakdown for retail store, restaurant, warehouse decisions.', category: 'Business', tags: ['New', 'Official'], author: 'Qianqian', version: '1.0.0', installCount: 0, rating: 0, lastUpdated: '2026-03-02' },
  { id: 'llm-router', name: 'llm-router', description: 'Route queries to different LLM providers based on cost, latency, and capability.', category: 'AI', tags: ['Popular', 'Official'], author: 'OpenClaw', version: '2.0.0', installCount: 3200, rating: 4.7, lastUpdated: '2026-01-28' },
  { id: 'rag-pipeline', name: 'rag-pipeline', description: 'Build RAG pipelines with document chunking, embedding, and vector search.', category: 'AI', tags: ['New'], author: 'Community', version: '1.0.0', installCount: 156, rating: 4.3, lastUpdated: '2026-02-25' },
  { id: 'data-cleaner', name: 'data-cleaner', description: 'Clean and transform data with automated deduplication, validation.', category: 'Data', tags: [], author: 'Community', version: '1.1.0', installCount: 420, rating: 4.2, lastUpdated: '2026-01-20' },
  { id: 'auto-workflow', name: 'auto-workflow', description: 'Create automated workflows that trigger on events.', category: 'Automation', tags: ['Popular'], author: 'OpenClaw', version: '1.5.0', installCount: 1800, rating: 4.6, lastUpdated: '2026-02-15' },
  { id: 'ab-test-setup', name: 'ab-test-setup', description: 'A/B test and experiment setup for SaaS products.', category: 'Business', tags: [], author: 'Community', version: '1.0.0', installCount: 120, rating: 4.3, lastUpdated: '2026-02-01' },
  { id: 'ai-news-aggregator', name: 'ai-news-aggregator', description: 'Aggregate AI/LLM/Agent news from multiple sources.', category: 'AI', tags: ['New'], author: 'Community', version: '1.0.0', installCount: 340, rating: 4.5, lastUpdated: '2026-02-01' },
  { id: 'analytics-tracking', name: 'analytics-tracking', description: 'Set up and improve analytics tracking and measurement.', category: 'Business', tags: [], author: 'OpenClaw', version: '1.0.0', installCount: 560, rating: 4.4, lastUpdated: '2026-02-01' },
  { id: 'automation', name: 'automation', description: 'Automation workflow for repetitive tasks.', category: 'Automation', tags: ['Popular'], author: 'OpenClaw', version: '2.0.0', installCount: 2100, rating: 4.7, lastUpdated: '2026-02-01' },
  { id: 'blogwatcher', name: 'blogwatcher', description: 'Monitor blogs and RSS/Atom feeds for updates.', category: 'Development', tags: [], author: 'Community', version: '1.0.0', installCount: 280, rating: 4.2, lastUpdated: '2026-02-01' },
  { id: 'business-news-aggregator', name: 'business-news-aggregator', description: 'Aggregate business and tech industry news.', category: 'Business', tags: [], author: 'Community', version: '1.0.0', installCount: 190, rating: 4.1, lastUpdated: '2026-02-01' },
  { id: 'competitor-tracker', name: 'competitor-tracker', description: 'Track competitor activities and updates.', category: 'Business', tags: [], author: 'Community', version: '1.0.0', installCount: 220, rating: 4.3, lastUpdated: '2026-02-01' },
  { id: 'content-strategy', name: 'content-strategy', description: 'Plan content strategy and topics.', category: 'Business', tags: [], author: 'Community', version: '1.0.0', installCount: 150, rating: 4.0, lastUpdated: '2026-02-01' },
  { id: 'copywriting', name: 'copywriting', description: 'Write marketing copy for landing pages.', category: 'Productivity', tags: ['Popular'], author: 'Community', version: '1.0.0', installCount: 420, rating: 4.5, lastUpdated: '2026-02-01' },
  { id: 'ddg-web-search', name: 'ddg-web-search', description: 'Web search using DuckDuckGo Lite.', category: 'Development', tags: [], author: 'OpenClaw', version: '1.0.0', installCount: 890, rating: 4.6, lastUpdated: '2026-02-01' },
  { id: 'document-summarizer', name: 'document-summarizer', description: 'Summarize long documents and articles.', category: 'AI', tags: [], author: 'Community', version: '1.0.0', installCount: 310, rating: 4.4, lastUpdated: '2026-02-01' },
  { id: 'entrepreneurship', name: 'entrepreneurship', description: 'Startup and business building principles.', category: 'Business', tags: [], author: 'Community', version: '1.0.0', installCount: 180, rating: 4.2, lastUpdated: '2026-02-01' },
  { id: 'firecrawl', name: 'firecrawl', description: 'Web scraping tool for AI applications.', category: 'Development', tags: [], author: 'Community', version: '1.0.0', installCount: 450, rating: 4.5, lastUpdated: '2026-02-01' },
  { id: 'frontend', name: 'frontend', description: 'Build polished user interfaces.', category: 'Development', tags: ['Popular'], author: 'OpenClaw', version: '1.0.0', installCount: 1200, rating: 4.8, lastUpdated: '2026-02-01' },
  { id: 'growth', name: 'growth', description: 'Product growth and product-market fit.', category: 'Business', tags: [], author: 'Community', version: '1.0.0', installCount: 260, rating: 4.3, lastUpdated: '2026-02-01' },
  { id: 'healthcheck', name: 'healthcheck', description: 'Host security hardening and risk-tolerance config.', category: 'Development', tags: [], author: 'OpenClaw', version: '1.0.0', installCount: 380, rating: 4.4, lastUpdated: '2026-02-01' },
  { id: 'hello-world', name: 'hello-world', description: 'Hello World in various languages.', category: 'Development', tags: [], author: 'OpenClaw', version: '1.0.0', installCount: 1500, rating: 4.9, lastUpdated: '2026-02-01' },
  { id: 'hf-image-generator', name: 'hf-image-generator', description: 'Generate images using Hugging Face models.', category: 'Media', tags: ['New'], author: 'Community', version: '1.0.0', installCount: 290, rating: 4.3, lastUpdated: '2026-02-01' },
  { id: 'html', name: 'html', description: 'HTML best practices and accessibility.', category: 'Development', tags: [], author: 'OpenClaw', version: '1.0.0', installCount: 670, rating: 4.5, lastUpdated: '2026-02-01' },
  { id: 'http-retry', name: 'http-retry', description: 'Universal HTTP retry with exponential backoff.', category: 'Development', tags: [], author: 'Community', version: '1.0.0', installCount: 340, rating: 4.4, lastUpdated: '2026-02-01' },
  { id: 'insights-analyzer', name: 'insights-analyzer', description: 'Analyze meeting transcripts and notes.', category: 'AI', tags: [], author: 'Community', version: '1.0.0', installCount: 140, rating: 4.1, lastUpdated: '2026-02-01' },
  { id: 'interview-ai', name: 'interview-ai', description: 'AI-powered interview preparation.', category: 'AI', tags: [], author: 'Community', version: '1.0.0', installCount: 210, rating: 4.2, lastUpdated: '2026-02-01' },
  { id: 'mckinsey-consultant', name: 'mckinsey-consultant', description: 'McKinsey-style problem solving and reporting.', category: 'Business', tags: ['Popular', 'Official'], author: 'Community', version: '3.1', installCount: 890, rating: 4.8, lastUpdated: '2026-02-01' },
  { id: 'mimeng-writing', name: 'mimeng-writing', description: 'Viral article writing techniques.', category: 'Productivity', tags: [], author: 'Community', version: '1.0.0', installCount: 520, rating: 4.6, lastUpdated: '2026-02-01' },
  { id: 'nano-pdf', name: 'nano-pdf', description: 'PDF processing and manipulation.', category: 'Media', tags: [], author: 'Community', version: '1.0.0', installCount: 380, rating: 4.3, lastUpdated: '2026-02-01' },
  { id: 'notion', name: 'notion', description: 'Manage Notion workspace and pages.', category: 'Productivity', tags: ['Popular'], author: 'Community', version: '1.0.0', installCount: 1100, rating: 4.7, lastUpdated: '2026-02-01' },
  { id: 'persona-builder', name: 'persona-builder', description: 'Build user personas for products.', category: 'AI', tags: [], author: 'Community', version: '1.0.0', installCount: 170, rating: 4.0, lastUpdated: '2026-02-01' },
  { id: 'product-strategy', name: 'product-strategy', description: 'Product strategy and prioritization.', category: 'Business', tags: [], author: 'Community', version: '1.0.0', installCount: 240, rating: 4.3, lastUpdated: '2026-02-01' },
  { id: 'producthunt', name: 'producthunt', description: 'Track and analyze Product Hunt launches.', category: 'Business', tags: [], author: 'Community', version: '1.0.0', installCount: 190, rating: 4.1, lastUpdated: '2026-02-01' },
  { id: 'reddit', name: 'reddit', description: 'Reddit search and monitoring.', category: 'Communication', tags: [], author: 'Community', version: '1.0.0', installCount: 310, rating: 4.2, lastUpdated: '2026-02-01' },
  { id: 'requesthunt', name: 'requesthunt', description: 'Track feature requests and user feedback.', category: 'Development', tags: [], author: 'Community', version: '1.0.0', installCount: 150, rating: 4.0, lastUpdated: '2026-02-01' },
  { id: 'seo-audit', name: 'seo-audit', description: 'Audit and diagnose SEO issues.', category: 'Business', tags: [], author: 'Community', version: '1.0.0', installCount: 280, rating: 4.3, lastUpdated: '2026-02-01' },
  { id: 'skills-library', name: 'skills-library', description: 'Browse and manage OpenClaw skills.', category: 'Development', tags: ['Official'], author: 'OpenClaw', version: '1.0.0', installCount: 450, rating: 4.5, lastUpdated: '2026-02-01' },
  { id: 'tavily', name: 'tavily', description: 'AI-powered web search and research.', category: 'AI', tags: [], author: 'Community', version: '1.0.0', installCount: 360, rating: 4.4, lastUpdated: '2026-02-01' },
  { id: 'twitter', name: 'twitter', description: 'Twitter/X operations and automation.', category: 'Communication', tags: ['Popular'], author: 'Community', version: '1.0.0', installCount: 780, rating: 4.6, lastUpdated: '2026-02-01' },
  { id: 'user-research', name: 'user-research', description: 'User research and customer discovery.', category: 'Business', tags: [], author: 'Community', version: '1.0.0', installCount: 200, rating: 4.2, lastUpdated: '2026-02-01' },

]
