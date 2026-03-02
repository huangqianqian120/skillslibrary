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

export const categories = ["All", "AI", "Automation", "Business", "Communication", "Data", "Development", "Lifestyle", "Media", "Productivity"]

export const tagsConfig = {
  New: { label: { en: "New", zh: "🆕 新增" }, color: "bg-green-500" },
  Popular: { label: { en: "Popular", zh: "🔥 热门" }, color: "bg-orange-500" },
  Official: { label: { en: "Official", zh: "✨ 官方" }, color: "bg-blue-500" },
}

export const skills: Skill[] = [
  { 
    id: '1password', 
    name: '1password', 
    description: 'Set up and use 1Password CLI (op).', 
    category: 'Development',
    tags: ['Official'],
    author: 'OpenClaw',
    version: '1.0.0',
    installCount: 1250,
    rating: 4.8,
    lastUpdated: '2026-01-15'
  },
  { 
    id: 'apple-notes', 
    name: 'apple-notes', 
    description: 'Manage Apple Notes via the memo CLI.', 
    category: 'Productivity',
    tags: ['Popular'],
    author: 'Community',
    version: '2.1.0',
    installCount: 890,
    rating: 4.5,
    lastUpdated: '2026-02-20'
  },
  { 
    id: 'weather', 
    name: 'weather', 
    description: 'Get current weather and forecasts via wttr.in or Open-Meteo.', 
    category: 'Lifestyle',
    tags: ['New'],
    author: 'OpenClaw',
    version: '1.2.0',
    installCount: 2100,
    rating: 4.9,
    lastUpdated: '2026-03-01'
  },
  { 
    id: 'marketing-ideas', 
    name: 'marketing-ideas', 
    description: 'When the user needs marketing ideas. This skill provides 139 proven marketing approaches.', 
    category: 'Business',
    tags: ['Popular'],
    author: 'Community',
    version: '1.0.0',
    installCount: 567,
    rating: 4.6,
    lastUpdated: '2026-02-10'
  },
  { 
    id: 'marketing-psychology', 
    name: 'marketing-psychology', 
    description: 'When the user wants to apply psychological principles to marketing. This skill provides 70+ mental models.', 
    category: 'Business',
    tags: [],
    author: 'Community',
    version: '1.0.0',
    installCount: 234,
    rating: 4.4,
    lastUpdated: '2026-02-10'
  },
  { 
    id: 'location-advisor', 
    name: 'location-advisor', 
    description: 'Location advisor system based on McKinsey methodology. Uses MECE factor breakdown, data-driven scoring and hypothesis validation for retail store, restaurant, warehouse, factory and office location decisions. Supports API integration and manual input fallback.', 
    category: 'Business',
    tags: ['New', 'Official'],
    author: 'Qianqian',
    version: '1.0.0',
    installCount: 0,
    rating: 0,
    lastUpdated: '2026-03-02'
  },
  // 示例：更多分类的 skills
  { 
    id: 'llm-router', 
    name: 'llm-router', 
    description: 'Route queries to different LLM providers based on cost, latency, and capability requirements.', 
    category: 'AI',
    tags: ['Popular', 'Official'],
    author: 'OpenClaw',
    version: '2.0.0',
    installCount: 3200,
    rating: 4.7,
    lastUpdated: '2026-01-28'
  },
  { 
    id: 'rag-pipeline', 
    name: 'rag-pipeline', 
    description: 'Build RAG pipelines with document chunking, embedding, and vector search.', 
    category: 'AI',
    tags: ['New'],
    author: 'Community',
    version: '1.0.0',
    installCount: 156,
    rating: 4.3,
    lastUpdated: '2026-02-25'
  },
  { 
    id: 'data-cleaner', 
    name: 'data-cleaner', 
    description: 'Clean and transform data with automated deduplication, validation, and normalization.', 
    category: 'Data',
    tags: [],
    author: 'Community',
    version: '1.1.0',
    installCount: 420,
    rating: 4.2,
    lastUpdated: '2026-01-20'
  },
  { 
    id: 'auto-workflow', 
    name: 'auto-workflow', 
    description: 'Create automated workflows that trigger on events, run sequences of actions.', 
    category: 'Automation',
    tags: ['Popular'],
    author: 'OpenClaw',
    version: '1.5.0',
    installCount: 1800,
    rating: 4.6,
    lastUpdated: '2026-02-15'
  },
]
