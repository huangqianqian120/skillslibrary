'use client'

import { skills, categories } from '@/data/skills'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { createContext, useState } from 'react'
import { SEOHead } from '@/app/components/SEO'
import BackButton from '@/app/components/BackButton'

// Translations
const translations = {
  en: {
    backToLibrary: 'Back to Library',
    copyDescription: 'Copy Description',
    copySkillId: 'Copy Skill ID',
    viewOnGitHub: 'View on GitHub',
    downloadSkill: 'Copy Link',
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
    downloadSkill: '复制链接',
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
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <BackButton text={t('backToLibrary', lang)} />

              {/* Language Switch */}
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
            </div>
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
          {/* Skill Info */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 mb-8 sm:mb-10">
            {/* Icon */}
            <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-xl sm:rounded-2xl bg-gray-100 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl sm:text-3xl font-medium text-gray-600">
                {skill.name.charAt(0).toUpperCase()}
              </span>
            </div>

            {/* Title & Meta */}
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-medium text-gray-900">{skill.name}</h1>
              <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-3 flex-wrap">
                <span className="px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-500 bg-gray-100 rounded-full">
                  {skill.category}
                </span>
                <span className="text-xs sm:text-sm text-gray-400">{skill.id}</span>
              </div>
            </div>

            {/* Stats - hide on very small screens */}
            <div className="hidden sm:flex items-center gap-6 text-sm text-gray-400">
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

          {/* Mobile Stats */}
          <div className="sm:hidden flex items-center gap-6 mb-6 text-sm text-gray-400">
            <div className="text-center">
              <p className="text-base font-medium text-gray-900">{categorySkills.length}</p>
              <p className="text-xs">{t('skillsInCategory', lang)}</p>
            </div>
            <div className="text-center">
              <p className="text-base font-medium text-gray-900">4.8</p>
              <p className="text-xs">{t('rating', lang)}</p>
            </div>
          </div>

          {/* Description Card */}
          <div className="border border-gray-100 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              {skill.description}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-10">
            {/* Download Button - Direct download */}
            <button
              onClick={() => {
                const url = `https://raw.githubusercontent.com/openclaw/openclaw/main/skills/${skill.id}/SKILL.md`
                const link = document.createElement('a')
                link.href = url
                link.download = `SKILL.md`
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
              }}
              className="inline-flex items-center px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              <svg className="w-4 h-4 mr-1.5 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span className="hidden sm:inline">下载 Skill</span>
              <span className="sm:hidden">下载</span>
            </button>
            <a
              href={`https://github.com/openclaw/openclaw/tree/main/skills/${skill.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              
              <span className="hidden sm:inline">GitHub</span>
              <span className="sm:hidden">代码</span>
            </a>
            <button
              onClick={() => navigator.clipboard.writeText(skill.description)}
              className="px-3 sm:px-5 py-2 sm:py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              <span className="hidden sm:inline">{t('copyDescription', lang)}</span>
              <span className="sm:hidden">描述</span>
            </button>
            <button
              onClick={() => navigator.clipboard.writeText(skill.id)}
              className="px-3 sm:px-5 py-2 sm:py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              <span className="hidden sm:inline">{t('copySkillId', lang)}</span>
              <span className="sm:hidden">ID</span>
            </button>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 my-10"></div>

          {/* Related Skills */}
          {relatedSkills.length > 0 && (
            <div className="mb-6 sm:mb-8">
              <h2 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4">
                {t('moreSkills', lang, { category: skill.category })}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
        <footer className="border-t border-gray-100 mt-10 sm:mt-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
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
      className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50/50 transition-all group"
    >
      <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg sm:rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0 group-hover:bg-gray-200 transition-colors">
        <span className="text-gray-600 text-base sm:text-lg font-medium">
          {skill.name.charAt(0).toUpperCase()}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 group-hover:text-gray-700 transition-colors truncate text-sm sm:text-base">
          {skill.name}
        </h3>
        <p className="text-xs sm:text-sm text-gray-400 line-clamp-1">{skill.description}</p>
      </div>
      <svg className="w-4 sm:w-5 h-4 sm:h-5 text-gray-300 group-hover:text-gray-400 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
