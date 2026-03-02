'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import BackButton from '../components/BackButton'

type Step = 'input' | 'describe' | 'refine' | 'generate' | 'success'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

type InputMode = 'chat' | 'workflow'

const translations = {
  input: {
    title: '创建 Skill',
    subtitle: '描述你的需求，或者导入工作流 (n8n/Dify/LangChain)',
    chat: '描述需求',
    workflow: '导入工作流',
    placeholder: '描述你想要什么功能...',
    send: '发送',
    continue: '继续完善',
    generating: 'AI 正在生成中...',
  },
  describe: {
    title: '描述需求',
    subtitle: '告诉我你想要什么功能',
    chat: '描述需求',
    workflow: '导入工作流',
    placeholder: '比如：每天监控竞品价格，降价时发送通知',
    send: '发送',
    continue: '继续',
    generating: 'AI 正在分析...',
  },
  refine: {
    title: '完善需求',
    subtitle: '还有要补充的吗？',
    chat: '描述需求',
    workflow: '导入工作流',
    placeholder: '补充更多细节...',
    send: '添加',
    continue: '生成 Skill',
    generating: 'AI 正在完善...',
  },
  generate: {
    title: '生成结果',
    subtitle: '',
    chat: '描述需求',
    workflow: '导入工作流',
    placeholder: '',
    send: '发送',
    continue: '继续',
    generating: 'AI 正在生成 Skill...',
  },
  success: {
    title: '创建成功！',
    subtitle: '',
    chat: '描述需求',
    workflow: '导入工作流',
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

    try {
      // Call LLM API
      const response = await fetch('/api/llm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...chatMessages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: userMessage }
          ]
        })
      })
      
      const data = await response.json()
      const aiResponse = data.choices?.[0]?.message?.content || data.error || '生成失败，请重试'
      
      setChatMessages(prev => [...prev, { role: 'assistant', content: aiResponse }])
      
      // Check if should proceed to generate
      if (step === 'generate' || aiResponse.includes('正在生成') || aiResponse.includes('生成 Skill')) {
        setStep('generate')
        const skillContent = generateSkillWithWorkflowMiner(chatMessages.map(m => m.content).join(' ') + ' ' + userMessage)
        setGeneratedSkill(skillContent)
        const skillName = userMessage.split(/[,，，]/)[0].trim().toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 30)
        setSkillName(skillName)
      }
    } catch (error) {
      setChatMessages(prev => [...prev, { role: 'assistant', content: '调用失败，请重试' }])
    }
    
    setIsGenerating(false)
  }

  // Skill 架构师 - 专门设计 Skill
  const SYSTEM_PROMPT = `你是一位 Skill 架构师，帮助用户设计 OpenClaw Skill。

Skill 是轻量级单一功能，被动触发。Agent 是复杂多步骤。

引导用户明确：
1. Skill 名称 - 简短英文名
2. 使用场景 - 用户什么时候用
3. 触发方式 - 关键词、按钮、定时
4. 执行内容 - 具体做什么
5. 输入参数 - 需要什么信息
6. 输出形式 - 返回什么

风格：简洁专业，主动追问关键信息。`

      setStep('generate')
      return "好的！正在生成 Skill..."
    }
    
    // 2. 提取工作流要素
    const trigger = extractTrigger(input)
    const action = extractAction(input)
    const target = extractTarget(input)
    const output = extractOutput(input)
    
    // 3. 收集之前对话中的信息
    const allContext = allMessages + ' ' + input
    const contextTrigger = extractTrigger(allContext)
    const contextAction = extractAction(allContext)
    const contextTarget = extractTarget(allContext)
    const contextOutput = extractOutput(allContext)
    
    // 合并提取结果
    const workflow = {
      trigger: trigger || contextTrigger || '',
      action: action || contextAction || '',
      target: target || contextTarget || '',
      output: output || contextOutput || ''
    }
    
    // 4. 检查缺少的要素
    const missing = []
    if (!workflow.trigger) missing.push('trigger')
    if (!workflow.action) missing.push('action')
    if (!workflow.target) missing.push('target')
    if (!workflow.output) missing.push('output')
    
    // 5. 缺少要素，循序渐进引导
    if (missing.length > 0) {
      const guides: Record<string, string> = {
        'trigger': '这个任务什么时候执行？比如：每天早上9点、有人提交issue时、定时检查...',
        'action': '需要执行什么操作？比如：抓取新闻、发送通知、分析数据、汇总报表...',
        'target': '处理什么内容？比如：科技新闻、用户反馈、股票价格、商品库存...',
        'output': '结果发送给谁？显示在哪里？比如：发送到邮箱、推送到Slack、显示在网页...'
      }
      
      const nextMissing = missing[0]
      
      let response = "📋 让我帮你梳理一下这个工作流~\n\n"
      response += "**目前已确定：**\n"
      if (workflow.action) response += "• 动作: " + workflow.action + "\n"
      if (workflow.target) response += "• 目标: " + workflow.target + "\n"
      if (workflow.output) response += "• 输出: " + workflow.output + "\n"
      if (workflow.trigger) response += "• 触发: " + workflow.trigger + "\n"
      response += "\n"
      response += "**还缺少：** " + nextMissing + "\n\n"
      response += guides[nextMissing]
      
      return response
    }
    
    // 6. 要素齐全，生成流程摘要并确认
    let summary = "✅ 流程已经梳理清楚了！\n\n"
    summary += "📋 **流程确认**\n"
    summary += "---\n"
    summary += "• 触发: " + workflow.trigger + "\n"
    summary += "• 动作: " + workflow.action + "\n"
    summary += "• 目标: " + workflow.target + "\n"
    summary += "• 输出: " + workflow.output + "\n"
    summary += "---\n\n"
    summary += "确认以上流程正确吗？\n"
    summary += "回复「确认」或「可以」我就生成 Skill~"
    
    return summary
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
      setN8nError('请输入工作流 JSON (n8n/Dify/LangChain)')
      return
    }

    try {
      const workflow = JSON.parse(n8nJson)
      setN8nError('')
      
      // Extract skill info from n8n workflow
      const name = workflow.name || 'imported-skill'
      const nodes = workflow.nodes || []
      
      // Generate skill from n8n workflow
      const skillContent = generateSkillFromWorkflow(workflow)
      setGeneratedSkill(skillContent)
      setSkillName(name.toLowerCase().replace(/\s+/g, '-'))
      setStep('generate')
    } catch (e) {
      setN8nError('JSON 格式错误，请检查输入')
    }
  }

  const generateSkillFromWorkflow = (workflow: any): string => {
    const name = workflow.name || 'imported-skill'
    const nodes = workflow.nodes || []
    const connections = workflow.connections || workflow.edges || {}
    
    // Auto-detect platform
    const isN8n = !!workflow.nodes && !!workflow.connections
    const isDify = !!workflow.graph && !!workflow.nodes
    const platform = isN8n ? 'n8n' : isDify ? 'Dify' : 'Unknown'
    
    // Extract trigger nodes (n8n style)
    const triggers = nodes.filter((n: any) => 
      ['Webhook', 'Cron', 'Interval', 'Manual Trigger', 'Schedule'].includes(n.type)
    ).map((n: any) => n.name).join(', ')
    
    // Extract trigger nodes (Dify style)
    const difyTriggers = nodes.filter((n: any) => 
      n.data?.type === 'start' || n.data?.label?.toLowerCase()?.includes('start')
    ).map((n: any) => n.data?.label || n.id).join(', ')
    
    // Use appropriate triggers
    const finalTriggers = isN8n ? triggers : isDify ? difyTriggers : '手动触发'
    
    // Extract action nodes  
    const actions = nodes.filter((n: any) => 
      !['Webhook', 'Cron', 'Interval', 'Manual Trigger', 'Schedule'].includes(n.type)
    ).map((n: any) => `${n.name || n.id} (${n.type || n.data?.type})`).join('\n')

    return `---
name: ${name.replace(/\s+/g, '-').toLowerCase()}
description: 从 ${platform} 工作流 "${name}" 自动转换的 Skill
version: 1.0.0
---

# ${name}

## Description

从 ${platform} 工作流自动转换的 AI Agent Skill。

## Triggers

${finalTriggers || '手动触发'}

## Actions

${actions || '执行工作流节点'}

## Usage

这个 Skill 执行工作流中的操作。

## ${platform} Workflow Info

- **Name**: ${name}
- **Nodes**: ${nodes.length}
- **Platform**: ${platform}

## Configuration

需要配置 ${platform} API 或认证信息。
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
    // Download skill as file
    const filename = `${skillName || 'skill'}.md`
    const blob = new Blob([generatedSkill], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
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
                onClick={() => setInputMode('workflow')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  inputMode === 'workflow' 
                    ? 'bg-gray-900 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                🔄 {t.workflow}
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
            {inputMode === 'workflow' && (
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-xl text-sm text-blue-700">
                  <p className="font-medium mb-1">💡 提示</p>
                  <p>粘贴你的工作流 JSON，AI 会自动将其转换为 Skill。</p>
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


// Generate skill using workflow-miner approach
const generateSkillWithWorkflowMiner = (userInput: string): string => {
  const input = userInput.toLowerCase()
  
  // Extract key elements
  const triggers = ['每', '定时', '自动', '触发', '监测', '监听', '当', '时候', 'cron', 'schedule', '早上', '晚上', '每天', '每周']
  const actions = ['发送', '获取', '查询', '监控', '检查', '抓取', '读取', '写入', '生成', '创建', '删除', '更新', '同步', '推送', '通知', '汇总', '整理']
  const targets = ['天气', '价格', '邮件', '消息', '微博', '小红书', '文件', '数据库', '网站', 'api', 'webhook', '通知', '文档', '数据', '新闻', '股票', '竞品', 'github', 'issue']
  const outputs = ['发送', '返回', '展示', '保存', '记录', '通知', '显示', '回复', '邮箱', 'slack', '微信']
  
  const trigger = triggers.find(t => input.includes(t)) || '手动触发'
  const action = actions.find(a => input.includes(a)) || '执行任务'
  const target = targets.find(t => input.includes(t)) || '数据'
  const output = outputs.find(o => input.includes(o)) || '显示结果'
  
  // Generate skill based on workflow-miner template
  const skillName = userInput.split(/[,，，]/)[0].trim().toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 30)
  
  const skillContent = '---' + '\n' +
'name: ' + skillName + '\n' +
'description: ' + userInput.slice(0, 100) + '\n' +
'platforms: [openclaw, claude_code, codex]' + '\n' +
'---' + '\n\n' +
'# ' + userInput.split(/[,，]/)[0].trim() + '\n\n' +
'## Workflow\n' +
'1. 接收输入: ' + target + '\n' +
'2. 处理: ' + action + '\n' +
'3. 输出: ' + output + '\n\n' +
'## Trigger\n' +
trigger + '\n\n' +
'## Tools Required\n' +
'- API 调用\n' +
'- 数据处理\n' +
'- 通知服务\n\n' +
'## Usage\n' +
'直接使用或根据需求调整\n\n' +
'## Error Handling\n' +
'- 网络错误: 重试 3 次\n' +
'- API 失败: 返回默认结果\n' +
'- 超时: 发送告警'
  
  return skillContent
}


