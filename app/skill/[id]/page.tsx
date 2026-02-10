'use client'

import { skills, categories } from '@/data/skills'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { createContext, useState } from 'react'
import { SEOHead } from '@/app/components/SEO'

// Translations
const translations = {
  en: {
    backToLibrary: 'Back to Library',
    copyDescription: 'Copy Description',
    copySkillId: 'Copy Skill ID',
    viewOnGitHub: 'View on GitHub',
    downloadSkill: 'Download SKILL.md',
    skillsInCategory: 'skills in this category',
    views: 'views',
    rating: 'rating',
    moreSkills: 'More {category} Skills',
    browseCategory: 'Browse by Category',
    notFound: 'Skill Not Found',
    notFoundDesc: "The skill you're looking for doesn't exist.",
  },
  zh: {
    backToLibrary: '返回技能库',
    copyDescription: '复制描述',
    copySkillId: '复制技能 ID',
    viewOnGitHub: '在 GitHub 查看',
    downloadSkill: '下载 SKILL.md',
    skillsInCategory: '个同类技能',
    views: '次浏览',
    rating: '评分',
    moreSkills: '更多 {category} 技能',
    browseCategory: '按分类浏览',
    notFound: '技能未找到',
    notFoundDesc: '您查找的技能不存在。',
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

const colorOptions = [
  'from-gray-700 to-gray-900',
  'from-gray-600 to-gray-800',
  'from-gray-500 to-gray-700',
  'from-gray-800 to-gray-950',
  'from-gray-600 to-gray-800',
]

export default function SkillPage() {
  const params = useParams()
  const id = params.id as string
  const skill = skills.find(s => s.id === id)
  const [lang, setLang] = useState<Language>('en')

  if (!skill) {
    return (
      <LanguageContext.Provider value={lang}>
        <NotFoundPage lang={lang} />
      </LanguageContext.Provider>
    )
  }

  const colorIndex = skill.name.charCodeAt(0) % colorOptions.length
  const categorySkills = skills.filter(s => s.category === skill.category)
  const relatedSkills = skills.filter(s => s.category === skill.category && s.id !== skill.id).slice(0, 4)

  return (
    <LanguageContext.Provider value={lang}>
      <SEOHead lang={lang} />
      <div className="min-h-screen bg-white font-sans">
        {/* Header */}
        <header className="border-b border-gray-100 sticky top-0 z-10 bg-white/90 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center text-sm text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                {t('backToLibrary', lang)}
              </Link>

              {/* Language Switch */}
              <div className="flex items-center bg-gray-50 rounded-lg p-1">
                <button
                  onClick={() => setLang('en')}
                  className={`px-3 py-1 text-xs rounded-md transition-all ${
                    lang === 'en' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLang('zh')}
                  className={`px-3 py-1 text-xs rounded-md transition-all ${
                    lang === 'zh' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  中文
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-6 py-10">
          {/* Skill Info */}
          <div className="flex items-start gap-6 mb-10">
            {/* Icon */}
            <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center flex-shrink-0">
              <span className="text-3xl font-medium text-gray-600">
                {skill.name.charAt(0).toUpperCase()}
              </span>
            </div>

            {/* Title & Meta */}
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-medium text-gray-900">{skill.name}</h1>
              <div className="flex items-center gap-3 mt-3">
                <span className="px-3 py-1 text-sm text-gray-500 bg-gray-100 rounded-full">
                  {skill.category}
                </span>
                <span className="text-sm text-gray-400">{skill.id}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <div className="text-center">
                <p className="text-lg font-medium text-gray-900">{categorySkills.length}</p>
                <p className="text-xs">{t('skillsInCategory', lang)}</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-medium text-gray-900">4.8</p>
                <p className="text-xs">{t('rating', lang)}</p>
              </div>
            </div>
          </div>

          {/* Description Card */}
          <div className="border border-gray-100 rounded-xl p-6 mb-8">
            <p className="text-gray-600 leading-relaxed">
              {skill.description}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 mb-10">
            <a
              href={`https://github.com/openclaw/openclaw/tree/main/skills/${skill.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 404 1.3.003-.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              {t('viewOnGitHub', lang)}
            </a>
            <a
              href={`https://raw.githubusercontent.com/openclaw/openclaw/main/skills/${skill.id}/SKILL.md`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {t('downloadSkill', lang)}
            </a>
            <button
              onClick={() => navigator.clipboard.writeText(skill.description)}
              className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              {t('copyDescription', lang)}
            </button>
            <button
              onClick={() => navigator.clipboard.writeText(skill.id)}
              className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              {t('copySkillId', lang)}
            </button>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 my-10"></div>

          {/* Related Skills */}
          {relatedSkills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                {t('moreSkills', lang, { category: skill.category })}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedSkills.map(related => (
                  <RelatedCard key={related.id} skill={related} />
                ))}
              </div>
            </div>
          )}

          {/* Browse Categories */}
          <div className="border-t border-gray-100 pt-8">
            <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
              {t('browseCategory', lang)}
            </h2>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <Link
                  key={cat}
                  href={`/?category=${cat}`}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    cat === skill.category
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-100 mt-12">
          <div className="max-w-5xl mx-auto px-6 py-8">
            <p className="text-center text-xs text-gray-300">
              skillslibrary.fun
            </p>
          </div>
        </footer>
      </div>
    </LanguageContext.Provider>
  )
}

function RelatedCard({ skill }: { skill: typeof skills[0] }) {
  return (
    <Link
      href={`/skill/${skill.id}`}
      className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50/50 transition-all group"
    >
      <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0 group-hover:bg-gray-200 transition-colors">
        <span className="text-gray-600 text-lg font-medium">
          {skill.name.charAt(0).toUpperCase()}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 group-hover:text-gray-700 transition-colors truncate">
          {skill.name}
        </h3>
        <p className="text-sm text-gray-400 line-clamp-1">{skill.description}</p>
      </div>
      <svg className="w-5 h-5 text-gray-300 group-hover:text-gray-400 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  )
}

function NotFoundPage({ lang }: { lang: Language }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gray-100 flex items-center justify-center">
          <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-medium text-gray-900">{t('notFound', lang)}</h1>
        <p className="text-gray-400 mt-2 mb-6">{t('notFoundDesc', lang)}</p>
        <Link
          href="/"
          className="inline-flex items-center px-5 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {t('backToLibrary', lang)}
        </Link>
      </div>
    </div>
  )
}
