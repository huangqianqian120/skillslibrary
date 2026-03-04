'use client'

import { useState, useMemo, createContext } from 'react'
import Link from 'next/link'
import { skills, categories, tagsConfig } from '@/data/skills'

// Scenes/Roles configuration
const scenes = [
  {
    id: 'developer',
    name: { en: 'Developer', zh: '开发者' },
    icon: '💻',
    description: { en: 'Code, debug, and ship', zh: '编程、调试、发布' },
    skillIds: ['hello-world', 'skill-creator', 'hello-world', 'frontend', 'healthcheck', 'ddg-web-search', 'firecrawl', 'html', 'http-retry', 'blogwatcher', 'web', 'website', 'location-advisor', 'mckinsey-consultant', 'skills-library', 'find-skills', 'mcp-builder', 'using-superpowers', 'subagent-driven-development', 'agent-tools', 'agent-browser', 'browser-use', 'systematic-debugging', 'vercel-react-best-practices', 'remotion-best-practices', 'vercel-composition-patterns', 'vercel-react-native-skills', 'supabase-postgres-best-practices', 'next-best-practices', 'frontend-design', 'tailwind-design-system', 'just-scrape'],
  },
  {
    id: 'writer',
    name: { en: 'Writer', zh: '写作者' },
    icon: '✍️',
    description: { en: 'Write, edit, and publish', zh: '写作、编辑、发布' },
    skillIds: ['notion', 'mimeng-writing', 'copywriting', 'brainstorming', 'writing-plans', 'executing-plans', 'copy-editing', 'content-strategy', 'content-strategy-new', 'document-summarizer'],
  },
  {
    id: 'organizer',
    name: { en: 'Organizer', zh: '效率党' },
    icon: '📋',
    description: { en: 'Tasks, notes, and reminders', zh: '任务、笔记、提醒' },
    skillIds: ['notion', 'analytics-tracking', 'ab-test-setup', 'product-strategy', 'growth', 'user-research', 'competitor-tracker', 'business-news-aggregator', 'entrepreneurship', 'us-gov-shutdown-tracker'],
  },
  
  {
    id: 'media',
    name: { en: 'Media Creator', zh: '媒体创作' },
    icon: '🎨',
    description: { en: 'Images, audio, and video', zh: '图片、音频、视频' },
    skillIds: ['nano-pdf', 'tavily', 'ai-news-aggregator', 'baoyu-cover-image', 'baoyu-comic', 'baoyu-infographic', 'canvas-design', 'ui-ux-pro-max', 'web-design-guidelines', 'social-content', 'pdf-op', 'pptx-op', 'docx-op', 'xlsx-op', 'baoyu-url-to-markdown', 'baoyu-markdown-to-html', 'baoyu-format-markdown'],
  },
  {
    id: 'monitor',
    name: { en: 'Monitor', zh: '监控追踪' },
    icon: '👀',
    description: { en: 'Track updates and feeds', zh: '追踪更新和动态' },
    skillIds: ['weather', 'blogwatcher', 'tavily', 'competitor-tracker', 'business-news-aggregator', 'ai-news-aggregator', 'us-gov-shutdown-tracker'],
  },
  {
    id: 'business',
    name: { en: 'Business', zh: '商业' },
    icon: '💼',
    description: { en: 'Business and marketing', zh: '商业和营销' },
    skillIds: ['marketing-ideas', 'marketing-psychology', 'content-strategy', 'content-strategy-new', 'copywriting', 'copywriting-new', 'growth', 'product-strategy', 'user-research', 'seo-audit', 'audit-website', 'programmatic-seo', 'pricing-strategy', 'product-marketing-context', 'competitor-tracker', 'business-news-aggregator', 'entrepreneurship', 'ab-test-setup', 'location-advisor', 'mckinsey-consultant'],
  },
]

// Translations
const translations = {
  en: {
    title: 'Skills Library',
    search: 'Search...',
    all: 'All',
    results: 'results',
    result: 'result',
    noResults: 'No results found',
    scenes: 'Scenes',
    allSkills: 'All Skills',
    browseByCategory: 'Browse by Category',
    menu: 'Menu',
    close: 'Close',
  },
  zh: {
    title: '技能库',
    search: '搜索...',
    all: '全部',
    results: '个结果',
    result: '个结果',
    noResults: '未找到结果',
    scenes: '场景',
    allSkills: '全部技能',
    browseByCategory: '按分类浏览',
    menu: '菜单',
    close: '关闭',
  },
}

// Language Context
type Language = 'en' | 'zh'
const LanguageContext = createContext<Language>('en')

function t(key: keyof typeof translations.en, lang: Language, params?: Record<string, string | number>) {
  let text = translations[lang][key] || translations.en[key] || key
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      text = text.replace(`{${k}}`, String(v))
    })
  }
  return text
}

export default function Home() {
  const [lang, setLang] = useState<Language>('en')
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
    const [selectedScene, setSelectedScene] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 20

  const filteredSkills = useMemo(() => {
    let result = skills

    // Filter by scene
    if (selectedScene) {
      const scene = scenes.find(s => s.id === selectedScene)
      if (scene) {
        result = result.filter(s => scene.skillIds.includes(s.id))
      }
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter(s => s.category === selectedCategory)
    }

    // Filter by search (fuzzy search)
    if (search) {
      const searchLower = search.toLowerCase()
      result = result.filter(skill =>
        skill.name.toLowerCase().includes(searchLower) ||
        skill.description.toLowerCase().includes(searchLower) ||
        (skill.tags && skill.tags.some((tag: string) => tag.toLowerCase().includes(searchLower))) ||
        // Partial match - split search terms
        searchLower.split(' ').every(term => 
          skill.name.toLowerCase().includes(term) ||
          skill.description.toLowerCase().includes(term)
        )
      )
    }

    return result
  }, [search, selectedCategory, selectedScene])

  // Pagination
  const totalPages = Math.ceil(filteredSkills.length / ITEMS_PER_PAGE)
  const paginatedSkills = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredSkills.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredSkills, currentPage])

  return (
    <LanguageContext.Provider value={lang}>
      <div className="min-h-screen bg-white font-sans">
        {/* Header */}
        <header className="border-b border-gray-100 sticky top-0 bg-white z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg sm:text-xl font-medium text-gray-900 tracking-tight">
                  {t('title', lang)}
                </h1>
              </div>

              {/* Language Switch & Auth - Desktop */}
              <div className="flex items-center gap-2 sm:gap-4">
                <Link 
                  href="/docs" 
                  className="hidden sm:flex text-sm text-gray-600 hover:text-gray-900 transition-colors items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Doc
                </Link>
                <Link 
                  href="/create" 
                  className="hidden sm:flex text-sm bg-gray-900 text-white px-3 py-1.5 rounded-lg hover:bg-gray-800 transition-colors items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  创建 Skill
                </Link>
                <div className="flex items-center bg-gray-50 rounded-lg p-0.5 sm:p-1">
                  <button
                    onClick={() => setLang('en')}
                    className={`px-2 sm:px-3 py-1 text-xs rounded-md transition-all ${
                      lang === 'en' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLang('zh')}
                    className={`px-2 sm:px-3 py-1 text-xs rounded-md transition-all ${
                      lang === 'zh' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    中文
                  </button>
                </div>
                
                {/* Mobile Menu Button */}
                <button 
                  className="sm:hidden p-2 text-gray-600 hover:text-gray-900"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="sm:hidden fixed inset-0 z-40 bg-white pt-16">
            <div className="p-4 space-y-4">
              <Link 
                href="/docs" 
                className="block py-2 text-gray-600 hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                📄 Doc
              </Link>
              <Link 
                href="/create" 
                className="block py-2 text-gray-600 hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                ➕ 创建 Skill
              </Link>
            </div>
          </div>
        )}

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* CLI Section */}

          {/* Scenes Section - Horizontal scroll on mobile */}
          <section className="mb-8 sm:mb-10">
            <h2 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">
              {t('scenes', lang)}
            </h2>
            
            {/* Mobile: horizontal scroll container */}
            <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-6 gap-3 overflow-x-auto sm:overflow-visible pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
              {scenes.map(scene => (
                <button
                  key={scene.id}
                  onClick={() => {
                    if (selectedScene === scene.id) {
                      setSelectedScene(null)
                    } else {
                      setSelectedScene(scene.id)
                      setSelectedCategory('All')
                    }
                    setMobileMenuOpen(false)
                  }}
                  className={`flex-shrink-0 w-28 sm:w-auto p-3 sm:p-4 rounded-xl border text-left transition-all ${
                    selectedScene === scene.id
                      ? 'border-gray-900 bg-gray-50'
                      : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50/50'
                  }`}
                >
                  <span className="text-xl sm:text-2xl">{scene.icon}</span>
                  <h3 className="text-sm font-medium text-gray-900 mt-2">
                    {lang === 'zh' ? scene.name.zh : scene.name.en}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1 hidden sm:block">
                    {lang === 'zh' ? scene.description.zh : scene.description.en}
                  </p>
                </button>
              ))}
            </div>
          </section>

          {/* Clear filters */}
          {selectedScene && (
            <div className="mb-4 sm:mb-6">
              <button
                onClick={() => setSelectedScene(null)}
                className="inline-flex items-center text-sm text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
                {t('allSkills', lang)}
              </button>
            </div>
          )}

          {/* Mobile: Category Pills */}
          <div className="sm:hidden mb-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  setSelectedCategory('All')
                  setSelectedScene(null)
                }}
                className={`px-3 py-1.5 text-xs rounded-full transition-all ${
                  selectedCategory === 'All' && !selectedScene
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {t('all', lang)}
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat)
                    setSelectedScene(null)
                  }}
                  className={`px-3 py-1.5 text-xs rounded-full transition-all ${
                    selectedCategory === cat
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
            {/* Main Content */}
            <main className="flex-1 min-w-0">
              {/* Mobile Search */}
              <div className="sm:hidden relative mb-4">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder={t('search', lang)}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-lg text-sm placeholder-gray-400 focus:ring-1 focus:ring-gray-200 focus:bg-white transition-all"
                />
              </div>

              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <p className="text-sm text-gray-400">
                  {filteredSkills.length} {filteredSkills.length === 1 ? t('result', lang) : t('results', lang)}
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                {paginatedSkills.map(skill => (
                  <SkillCard key={skill.id} skill={skill} />
                ))}
              </div>
              
              {filteredSkills.length > ITEMS_PER_PAGE && (
              <div className="flex justify-center items-center gap-2 mt-6">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-2 py-1 text-sm rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                >
                  ←
                </button>
                <span className="text-gray-500 text-sm">{currentPage}/{totalPages}</span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-2 py-1 text-sm rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                >
                  →
                </button>
              </div>
            )}

            {filteredSkills.length === 0 && (
                <div className="text-center py-12 sm:py-16">
                  <p className="text-gray-400 text-sm">{t('noResults', lang)}</p>
                </div>
              )}
            </main>

          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-100 mt-10 sm:mt-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
            <p className="text-center text-xs text-gray-300">
              skillslibrary.fun (v0.1.1)
            </p>
          </div>
        </footer>
      </div>
    </LanguageContext.Provider>
    <SkillChatBot />
  )
}

function SkillCard({ skill }: { skill: typeof skills[0] }) {
  return (
    <a
      href={`/skill/${skill.id}`}
      className="group block p-3 sm:p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50/50 transition-all duration-200"
    >
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Icon */}
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 group-hover:bg-gray-200 transition-colors">
          <span className="text-gray-600 text-xs sm:text-sm font-medium">
            {skill.name.charAt(0).toUpperCase()}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-medium text-gray-900 truncate group-hover:text-gray-700 transition-colors">
              {skill.name}
            </h3>
            <span className="px-1.5 py-0.5 sm:px-2 sm:py-0.5 text-xs text-gray-400 bg-gray-100 rounded-full flex-shrink-0">
              {skill.category}
            </span>
          </div>
          
          <p className="text-xs text-gray-400 mt-0.5 line-clamp-1 hidden sm:block">
            {skill.description}
          </p>
        </div>

        {/* Arrow */}
        <svg className="w-4 h-4 text-gray-300 group-hover:text-gray-400 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </a>
  )
}
