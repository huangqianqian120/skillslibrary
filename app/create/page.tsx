'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn } from 'next-auth/react'

type Step = 'login' | 'describe' | 'refine' | 'generate' | 'success'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export default function CreateSkill() {
  const router = useRouter()
  const { data: session, status } = useSession()

  const [step, setStep] = useState<Step>('login')
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [currentInput, setCurrentInput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedSkill, setGeneratedSkill] = useState('')
  const [skillName, setSkillName] = useState('')

  // Check auth state
  useEffect(() => {
    if (status === 'loading') return
    if (session) {
      setStep('describe')
    } else {
      setStep('login')
    }
  }, [session, status])

  const handleLogin = () => {
    signIn()
  }

  const handleSendMessage = async () => {
    if (!currentInput.trim() || isGenerating) return

    const userMessage = currentInput.trim()
    setCurrentInput('')
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsGenerating(true)

    // Simulate AI response - in real app, call AI API
    setTimeout(() => {
      const response = analyzeUserNeed(userMessage)
      setChatMessages(prev => [...prev, { role: 'assistant', content: response }])
      setIsGenerating(false)
    }, 1500)
  }

  const analyzeUserNeed = (input: string): string => {
    const lowerInput = input.toLowerCase()

    // Check if information is sufficient
    const hasTrigger = lowerInput.includes('每天') || lowerInput.includes('定时') || lowerInput.includes('自动') || lowerInput.includes('监控') || lowerInput.includes('触发')
    const hasAction = lowerInput.includes('发送') || lowerInput.includes('获取') || lowerInput.includes('查询') || lowerInput.includes('监控') || lowerInput.includes('检查')
    const hasTarget = lowerInput.includes('价格') || lowerInput.includes('微博') || lowerInput.includes('小红书') || lowerInput.includes('天气') || lowerInput.includes('邮件') || lowerInput.includes('通知')

    if (!hasTrigger && !hasAction && !hasTarget) {
      return `好的，我记录下来了。

为了更好地帮你创建技能，我还需要了解一些信息：

1. **这个技能要做什么？** 比如：监控价格、发送消息、获取数据等
2. **什么时候触发？** 比如：定时每天早上、手动触发、有变化时通知
3. **需要操作哪些平台或数据？** 比如：某个网站、某个API、本地文件等

请告诉我更多细节，这样我可以帮你生成更合适的技能。`
    }

    return `好的，我已经了解了你的需求！

**需求总结：**
- 功能：${extractAction(input)}
- 触发：${extractTrigger(input)}
- 目标：${extractTarget(input)}

这些信息已经足够生成技能了，我开始为你生成 SKILL.md...

${isGenerating ? '生成中...' : ''}`
  }

  const extractAction = (input: string): string => {
    if (input.includes('监控') || input.includes('检查')) return '监控/检查'
    if (input.includes('发送') || input.includes('推送到')) return '发送消息'
    if (input.includes('获取') || input.includes('查询')) return '获取/查询数据'
    if (input.includes('同步')) return '同步数据'
    return '执行操作'
  }

  const extractTrigger = (input: string): string => {
    if (input.includes('每天') || input.includes('定时')) return '定时执行（每天）'
    if (input.includes('每小时')) return '定时执行（每小时）'
    if (input.includes('每周')) return '定时执行（每周）'
    if (input.includes('变化') || input.includes('降价') || input.includes('更新')) return '事件触发（有变化时）'
    return '手动触发'
  }

  const extractTarget = (input: string): string => {
    if (input.includes('价格')) return '价格数据'
    if (input.includes('天气')) return '天气信息'
    if (input.includes('邮件') || input.includes('email')) return '邮件'
    if (input.includes('微博')) return '微博'
    if (input.includes('小红书')) return '小红书'
    if (input.includes('API') || input.includes('接口')) return 'API接口'
    return '指定数据源'
  }

  const handleStartGeneration = () => {
    const lastUserMessage = chatMessages.filter(m => m.role === 'user').pop()?.content || ''
    setStep('generate')
    setIsGenerating(true)

    // Generate skill based on conversation
    setTimeout(() => {
      const name = lastUserMessage.split(' ').slice(0, 3).join('-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()
      setSkillName(name)

      const skillYaml = `---
name: ${name}
version: 1.0.0
description: ${lastUserMessage}
---

# ${name}

## 功能描述
${lastUserMessage}

## 使用场景
- 定时执行或手动触发
- 根据具体需求配置

## 触发方式
- 手动触发或定时执行

## 配置项
- 根据实际需求配置参数
`

      setGeneratedSkill(skillYaml)
      setIsGenerating(false)
    }, 2000)
  }

  const handleSaveSkill = () => {
    // Save to user's personal skills (not public)
    alert(`技能 "${skillName}" 已保存到您的个人技能列表！\n\n此技能仅在您的主页中展示，不会公开发布。`)
    setStep('success')
  }

  const handleBackToLibrary = () => {
    router.push('/')
  }

  // Translations
  const t = {
    title: '创建技能',
    subtitle: '描述您的需求，AI 将自动生成技能',
    loginTitle: '登录后创建',
    loginDesc: '登录您的账户即可创建个人技能',
    loginBtn: '登录',
    chatPlaceholder: '描述您想要实现的自动化功能...',
    send: '发送',
    generating: '正在生成技能...',
    save: '保存到我的技能',
    successTitle: '创建成功！',
    successDesc: '技能已保存到您的主页',
    backBtn: '返回技能库',
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4">
            <button onClick={handleBackToLibrary} className="text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-xl font-medium text-gray-900">{t.title}</h1>
              <p className="text-sm text-gray-400">{t.subtitle}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Login Step */}
        {step === 'login' && (
          <div className="max-w-md mx-auto text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="8" r="4" />
                <path d="M20 21a8 8 0 10-16 0" />
              </svg>
            </div>
            <h2 className="text-xl font-medium text-gray-900 mb-2">{t.loginTitle}</h2>
            <p className="text-gray-400 mb-8">{t.loginDesc}</p>
            <button
              onClick={handleLogin}
              className="px-8 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
            >
              {t.loginBtn}
            </button>
          </div>
        )}

        {/* Chat Step */}
        {(step === 'describe' || step === 'refine') && (
          <div className="max-w-2xl mx-auto">
            {/* Chat Messages */}
            <div className="space-y-4 mb-6">
              {chatMessages.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-400 mb-2">👋 你好！</p>
                  <p className="text-sm text-gray-400">描述你想实现的自动化功能，我会帮你生成技能</p>
                </div>
              )}
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl ${
                    msg.role === 'user'
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-50 text-gray-700'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isGenerating && (
                <div className="flex justify-start">
                  <div className="bg-gray-50 p-4 rounded-2xl">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            {chatMessages.length > 0 && chatMessages[chatMessages.length - 1].role === 'assistant' && !isGenerating && (
              <div className="flex gap-3">
                <button
                  onClick={handleStartGeneration}
                  className="flex-1 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors"
                >
                  开始生成技能
                </button>
                <button
                  onClick={() => {
                    setChatMessages(prev => [...prev, { role: 'assistant', content: '好的，请告诉我更多细节...' }])
                  }}
                  className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50"
                >
                  补充信息
                </button>
              </div>
            )}

            {!(chatMessages.length > 0 && chatMessages[chatMessages.length - 1].role === 'assistant' && !isGenerating) && (
              <div className="flex gap-3">
                <input
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={t.chatPlaceholder}
                  disabled={isGenerating}
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:opacity-50"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!currentInput.trim() || isGenerating}
                  className="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t.send}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Generate Step */}
        {step === 'generate' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-8">
              <h2 className="text-lg font-medium text-gray-900 mb-6">生成结果</h2>

              {isGenerating ? (
                <div className="text-center py-12">
                  <div className="animate-spin w-8 h-8 border-2 border-gray-900 border-t-transparent rounded-full mx-auto mb-4" />
                  <p className="text-gray-400">{t.generating}</p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      技能名称
                    </label>
                    <input
                      type="text"
                      value={skillName}
                      onChange={(e) => setSkillName(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SKILL.md
                    </label>
                    <pre className="w-full h-64 p-4 bg-white border border-gray-200 rounded-xl text-sm overflow-auto font-mono">
                      {generatedSkill}
                    </pre>
                  </div>

                  <button
                    onClick={handleSaveSkill}
                    className="w-full py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors"
                  >
                    {t.save}
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Success Step */}
        {step === 'success' && (
          <div className="max-w-md mx-auto text-center py-16">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-medium text-gray-900 mb-2">{t.successTitle}</h2>
            <p className="text-gray-400 mb-8">{t.successDesc}</p>
            <button
              onClick={handleBackToLibrary}
              className="px-8 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors"
            >
              {t.backBtn}
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
