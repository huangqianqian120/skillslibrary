'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import BackButton from '../components/BackButton'

type Step = 'input' | 'describe' | 'refine' | 'generate' | 'success'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

type InputMode = 'chat' | 'n8n'

const translations = {
  input: {
    title: '创建 Skill',
    subtitle: '描述你的需求，或者导入 n8n 工作流',
    chat: '描述需求',
    n8n: '导入 n8n',
    placeholder: '描述你想要什么功能...',
    send: '发送',
    continue: '继续完善',
    generating: 'AI 正在生成中...',
  },
  describe: {
    title: '描述需求',
    subtitle: '告诉我你想要什么功能',
    chat: '描述需求',
    n8n: '导入 n8n',
    placeholder: '比如：每天监控竞品价格，降价时发送通知',
    send: '发送',
    continue: '继续',
    generating: 'AI 正在分析...',
  },
  refine: {
    title: '完善需求',
    subtitle: '还有要补充的吗？',
    chat: '描述需求',
    n8n: '导入 n8n',
    placeholder: '补充更多细节...',
    send: '添加',
    continue: '生成 Skill',
    generating: 'AI 正在完善...',
  },
  generate: {
    title: '生成结果',
    subtitle: '',
    chat: '描述需求',
    n8n: '导入 n8n',
    placeholder: '',
    send: '发送',
    continue: '继续',
    generating: 'AI 正在生成 Skill...',
  },
  success: {
    title: '创建成功！',
    subtitle: '',
    chat: '描述需求',
    n8n: '导入 n8n',
    placeholder: '',
    send: '发送',
    continue: '继续',
    generating: 'AI 正在生成 Skill...',
    desc: '你的 Skill 已经保存到个人技能库',
    backBtn: '返回技能库',
  },
}

export default function CreateSkill() {
  const router = useRouter()

  const [inputMode, setInputMode] = useState<InputMode>('chat')
  const [step, setStep] = useState<Step>('input')
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [currentInput, setCurrentInput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedSkill, setGeneratedSkill] = useState('')
  const [skillName, setSkillName] = useState('')
  const [n8nJson, setN8nJson] = useState('')
  const [n8nError, setN8nError] = useState('')

  const t = translations[step]

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

  // 资深咨询专家 + Agent 工程师的角色设定
  const SYSTEM_PROMPT = `你是一位资深的 AI Agent 咨询专家，同时也是经验丰富的 Agent 工程师。你的目标是帮助用户清晰地定义他们想要的 AI Skill。

你的风格：
- 像一位专业的技术顾问，循循善诱
- 不仅听用户说什么，还要帮用户想到他可能没考虑的
- 用简洁专业的语言，但不失亲和力
- 当信息足够时，给出结构化的总结
- 当信息不够时，通过提问引导用户完善需求

你需要了解一个 Skill 的核心要素：
1. **触发时机** - 用户怎么启动这个技能？（定时、手动、事件触发）
2. **执行动作** - 技能具体做什么？（发送、查询、监控、生成等）
3. **操作对象** - 作用于什么目标？（API、文件、数据库、平台账号）
4. **输出形式** - 结果怎么呈现？（消息、文件、API返回）
5. **边界处理** - 异常情况怎么办？（超时、失败、无数据）

对话原则：
- 不要说"好的我记录下来了"，太机械
- 根据用户的输入，判断需求完整性
- 如果用户说的模糊，主动给出选项让用户选择
- 适时给出专业建议，比如"其实你可以考虑..."`

  const analyzeUserNeed = (input: string): string => {
    const lowerInput = input.toLowerCase()
    const inputLength = input.trim().length
    const allMessages = chatMessages.map(m => m.content).join(' ')
    const allContext = allMessages + ' ' + input

    // 检测用户确认
    if (['好', '好的', 'ok', 'okay', '可以', '可以了', '没问题', '对的', '是', 'yes', '继续', '生成'].some(k => lowerInput === k || lowerInput.startsWith(k))) {
      return `好的，需求已经收集得差不多了。

**当前需求概要：**
${chatMessages.map((m, i) => `${i + 1}. ${m.content.split('\n')[0]}`).join('\n')}

可以点击「生成 Skill」开始创建了！如果还想补充什么，直接告诉我~`
    }

    // 如果是补充阶段
    if (step === 'refine') {
      return `明白了，补充收到。

**整理后的完整需求：**
${chatMessages.map((m, i) => `• ${m.content.split('\n')[0]}`).join('\n')}
• ${input.split('\n')[0]}

${inputLength > 50 ? '信息挺充分的了，可以生成。或者还有别的要补充？' : '还想了解更多细节吗？比如：成功的标准是什么？失败了呢？'}`
    }

    // 深度分析用户需求
    const triggerWords = ['每', '定时', '自动', '触发', '监测', '监听', '当', '时候', 'cron', 'schedule']
    const actionWords = ['发送', '获取', '查询', '监控', '检查', '抓取', '读取', '写入', '生成', '创建', '删除', '更新', '同步', '推送']
    const targetWords = ['天气', '价格', '邮件', '消息', '微博', '小红书', '文件', '数据库', '网站', 'api', 'webhook', '通知', '文档', '数据']
    const outputWords = ['发送', '返回', '展示', '保存', '记录', '通知', '显示', '回复']

    const hasTrigger = triggerWords.some(w => lowerInput.includes(w))
    const hasAction = actionWords.some(w => lowerInput.includes(w))
    const hasTarget = targetWords.some(w => lowerInput.includes(w))
    const hasOutput = outputWords.some(w => lowerInput.includes(w))

    const score = [hasTrigger, hasAction, hasTarget, hasOutput].filter(Boolean).length

    // 需求分析结果
    let analysis = `**需求理解：**\n`
    if (hasAction) analysis += `• 动作：${extractAction(input)}\n`
    if (hasTrigger) analysis += `• 触发：${extractTrigger(input)}\n`
    if (hasTarget) analysis += `• 目标：${extractTarget(input)}\n`
    if (hasOutput) analysis += `• 输出：${extractOutput(input)}\n`

    // 需求不完整，给出引导
    if (score < 2 || inputLength < 20) {
      const suggestions = []
      if (!hasTrigger) suggestions.push('什么时候执行？定时/手动/事件触发？')
      if (!hasAction) suggestions.push('具体要做什么操作？')
      if (!hasTarget) suggestions.push('操作什么目标？API/文件/平台？')

      return `收到，让我帮你梳理一下。

"${input}"

这个需求很有意思！我理解你想做的是 ${hasAction ? extractAction(input) : '某个自动化任务'}。

不过我还需要确认几个关键点：
${suggestions.map((s, i) => `${i + 1}. ${s}`).join('\n')}

想清楚了告诉我，或者直接说「继续」我先用现有信息帮你生成~`
    }

    // 需求基本完整，给出结构化总结 + 引导补充
    let extraQuestions = []
    if (!hasOutput) extraQuestions.push('结果怎么展示？发消息/存文件/直接回复？')
    if (inputLength < 50) extraQuestions.push('还有其他要补充的吗？')

    return `${analysis}
✅ 核心需求已经清晰了！

${extraQuestions.length > 0 ? extraQuestions.map((q, i) => `💡 ${q}`).join('\n') : '点击「继续完善」补充更多细节，或者直接生成~'}
`
  }

  const extractAction = (input: string): string => {
    const lower = input.toLowerCase()
    if (lower.includes('监控') || lower.includes('监测')) return '监控/检测变化'
    if (lower.includes('发送') || lower.includes('推送')) return '发送消息/通知'
    if (lower.includes('获取') || lower.includes('抓取') || lower.includes('爬取')) return '获取/抓取数据'
    if (lower.includes('查询') || lower.includes('搜索')) return '查询/搜索信息'
    if (lower.includes('生成') || lower.includes('创建')) return '生成内容'
    if (lower.includes('同步')) return '同步数据'
    if (lower.includes('读取') || lower.includes('读取')) return '读取文件/数据'
    if (lower.includes('写入') || lower.includes('保存')) return '写入/保存数据'
    return '执行操作'
  }

  const extractTrigger = (input: string): string => {
    const lower = input.toLowerCase()
    if (lower.includes('每天')) return '定时（每天）'
    if (lower.includes('每周')) return '定时（每周）'
    if (lower.includes('每小时')) return '定时（每小时）'
    if (lower.includes('定时') || lower.includes('cron')) return '定时触发'
    if (lower.includes('自动') || lower.includes('监测')) return '事件触发'
    if (lower.includes('手动')) return '手动触发'
    if (lower.includes('当') || lower.includes('时候')) return '条件触发'
    return '待确认'
  }

  const extractTarget = (input: string): string => {
    const lower = input.toLowerCase()
    if (lower.includes('天气')) return '天气数据'
    if (lower.includes('价格') || lower.includes('商品')) return '价格/商品信息'
    if (lower.includes('邮件') || lower.includes('email')) return '邮件系统'
    if (lower.includes('微博') || lower.includes('x.com')) return '微博/X'
    if (lower.includes('小红书')) return '小红书'
    if (lower.includes('slack')) return 'Slack'
    if (lower.includes('discord')) return 'Discord'
    if (lower.includes('文件') || lower.includes('本地')) return '本地文件'
    if (lower.includes('数据库') || lower.includes('db')) return '数据库'
    if (lower.includes('api') || lower.includes('http')) return '外部API'
    return '待确认'
  }

  const extractOutput = (input: string): string => {
    const lower = input.toLowerCase()
    if (lower.includes('发消息') || lower.includes('通知')) return '发送消息通知'
    if (lower.includes('保存') || lower.includes('写入')) return '保存到文件/数据库'
    if (lower.includes('返回') || lower.includes('展示')) return '直接返回结果'
    if (lower.includes('邮件')) return '发送邮件'
    return '待确认'
  }

  const handleN8nImport = async () => {
    if (!n8nJson.trim()) {
      setN8nError('请输入 n8n 工作流 JSON')
      return
    }

    try {
      const workflow = JSON.parse(n8nJson)
      setN8nError('')
      
      // Extract skill info from n8n workflow
      const name = workflow.name || 'n8n-imported-skill'
      const nodes = workflow.nodes || []
      
      // Generate skill from n8n workflow
      const skillContent = generateSkillFromN8n(workflow)
      setGeneratedSkill(skillContent)
      setSkillName(name.toLowerCase().replace(/\s+/g, '-'))
      setStep('generate')
    } catch (e) {
      setN8nError('JSON 格式错误，请检查输入')
    }
  }

  const generateSkillFromN8n = (workflow: any): string => {
    const name = workflow.name || 'n8n-skill'
    const nodes = workflow.nodes || []
    const connections = workflow.connections || {}
    
    // Extract trigger nodes
    const triggers = nodes.filter((n: any) => 
      ['Webhook', 'Cron', 'Interval', 'Manual Trigger'].includes(n.type)
    ).map((n: any) => n.name).join(', ')
    
    // Extract action nodes  
    const actions = nodes.filter((n: any) => 
      !['Webhook', 'Cron', 'Interval', 'Manual Trigger'].includes(n.type)
    ).map((n: any) => `${n.name} (${n.type})`).join('\n')

    return `---
name: ${name}
description: 从 n8n 工作流 "${name}" 自动转换的 Skill
version: 1.0.0
---

# ${name}

## Description

从 n8n 工作流自动转换的 AI Agent Skill。

## Triggers

${triggers || '手动触发'}

## Actions

${actions || '执行工作流节点'}

## Usage

这个 Skill 执行 n8n 工作流中的操作。

## N8n Workflow Info

- **Name**: ${name}
- **Nodes**: ${nodes.length}
- **Active**: ${workflow.active !== false}

## Configuration

需要配置 n8n webhook URL 或认证信息。
`
  }

  const handleGenerate = () => {
    setIsGenerating(true)
    
    // Generate skill from chat
    setTimeout(() => {
      const skill = `# ${skillName || 'my-skill'}

## Description

${chatMessages.map(m => m.content).join('\n\n')}

## Capabilities

- 功能1
- 功能2

## Usage

直接告诉 AI 你想做什么，AI 会帮你完成。

`
      setGeneratedSkill(skill)
      setStep('generate')
      setIsGenerating(false)
    }, 2000)
  }

  const handleSaveSkill = () => {
    // In real app, save to backend
    setStep('success')
  }

  const handleBackToLibrary = () => {
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-medium text-gray-900">{t.title}</h1>
            <BackButton onClick={() => router.push('/')} />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Input Mode Selection */}
        {step === 'input' && (
          <div>
            <p className="text-gray-500 mb-6">{t.subtitle}</p>
            
            {/* Mode Tabs */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setInputMode('chat')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  inputMode === 'chat' 
                    ? 'bg-gray-900 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                💬 {t.chat}
              </button>
              <button
                onClick={() => setInputMode('n8n')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  inputMode === 'n8n' 
                    ? 'bg-gray-900 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                🔄 {t.n8n}
              </button>
            </div>

            {/* Chat Mode */}
            {inputMode === 'chat' && (
              <div className="space-y-4">
                {/* Chat Messages */}
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                      msg.role === 'user' 
                        ? 'bg-gray-900 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}

                {/* Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder={t.placeholder}
                    className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!currentInput.trim() || isGenerating}
                    className="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 disabled:opacity-50"
                  >
                    {t.send}
                  </button>
                </div>

                {chatMessages.length > 0 && (
                  <button
                    onClick={handleGenerate}
                    className="w-full py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800"
                  >
                    {t.continue}
                  </button>
                )}
              </div>
            )}

            {/* N8n Mode */}
            {inputMode === 'n8n' && (
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-xl text-sm text-blue-700">
                  <p className="font-medium mb-1">💡 提示</p>
                  <p>粘贴你的 n8n 工作流 JSON，AI 会自动将其转换为 Skill。</p>
                </div>
                
                <textarea
                  value={n8nJson}
                  onChange={(e) => setN8nJson(e.target.value)}
                  placeholder='{"name": "My Workflow", "nodes": [...], ...}'
                  className="w-full h-64 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono"
                />
                
                {n8nError && (
                  <p className="text-red-500 text-sm">{n8nError}</p>
                )}
                
                <button
                  onClick={handleN8nImport}
                  className="w-full py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800"
                >
                  导入并转换
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
                    className="w-full py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800"
                  >
                    保存 Skill
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
            <h2 className="text-2xl font-medium text-gray-900 mb-2">创建成功！</h2>
            <p className="text-gray-400 mb-8">你的 Skill 已经保存</p>
            <button
              onClick={handleBackToLibrary}
              className="px-8 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800"
            >
              返回技能库
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
