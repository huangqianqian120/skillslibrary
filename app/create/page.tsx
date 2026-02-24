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
    placeholder: '比如：每天监控竞品价格，降价时发送通知',
    send: '发送',
    continue: '继续',
    generating: 'AI 正在分析...',
  },
  refine: {
    title: '完善需求',
    subtitle: '还有要补充的吗？',
    placeholder: '补充更多细节...',
    send: '添加',
    continue: '生成 Skill',
    generating: 'AI 正在完善...',
  },
  generate: {
    generating: 'AI 正在生成 Skill...',
  },
  success: {
    title: '创建成功！',
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

这些信息够了吗？如有补充请告诉我，否则点击「继续」进入生成阶段。`
  }

  const extractAction = (input: string): string => {
    if (input.includes('监控')) return '监控/检测'
    if (input.includes('发送')) return '发送消息'
    if (input.includes('获取')) return '获取数据'
    if (input.includes('查询')) return '查询信息'
    return '处理任务'
  }

  const extractTrigger = (input: string): string => {
    if (input.includes('每天')) return '定时每天'
    if (input.includes('定时')) return '定时触发'
    if (input.includes('自动')) return '自动触发'
    if (input.includes('变化')) return '有变化时'
    return '手动触发'
  }

  const extractTarget = (input: string): string => {
    if (input.includes('价格')) return '价格/商品'
    if (input.includes('天气')) return '天气数据'
    if (input.includes('邮件')) return '邮件系统'
    if (input.includes('通知')) return '通知渠道'
    return '指定目标'
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
                    className="w-full py-3 bg-green-600 text-white rounded-xl hover:bg-green-700"
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
