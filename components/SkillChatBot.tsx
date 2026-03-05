'use client'

import { useState, useRef, useEffect } from 'react'
import { skills } from '@/data/skills'

type Message = { role: 'user' | 'bot'; content: string }

// MiniMax API - 通过后端 API 路由调用（避免暴露 key）
const API_BASE = '/api/llm'

// 构建 system prompt
const buildSystemPrompt = (history: Message[]) => {
  const skillsList = skills.map(s => 
    `- ${s.id}: ${s.description?.slice(0, 100) || '无描述'} (分类: ${s.category})`
  ).join('\n')
  
  return `你是 Skills 助手，专门帮用户找到合适的 AI Agent Skills。

## 你的任务
1. 理解用户想要什么功能
2. 从下面的 skills 列表中推荐最合适的
3. 用中文回复

## 可用的 Skills
${skillsList}

## 回复格式
- 先理解用户需求
- 推荐 1-3 个最相关的 skill
- 给出简短理由
- 告诉用户如何获取更多信息

如果找不到合适的，如实告诉用户。`
}

// 关键词搜索 fallback
const searchSkills = (query: string) => {
  const q = query.toLowerCase()
  const keywords: Record<string, string[]> = {
    image: ['image', 'img', '图片', '画', '生成图', 'design', '作图'],
    video: ['video', '视频', '剪辑'],
    writing: ['writing', '写作', '写', '文案', '写文章'],
    marketing: ['marketing', '营销', '推广', 'seo', '增长'],
    search: ['search', '搜索', 'tavily', '搜索'],
    development: ['dev', '开发', '编程', 'code', 'frontend', 'web', '前端'],
    automation: ['automation', '自动化', '小红书'],
    security: ['security', '安全', '审计'],
    pdf: ['pdf', '文档', 'pdf'],
    weather: ['weather', '天气'],
    notes: ['notes', '笔记', 'notion'],
    news: ['news', '新闻', '资讯'],
    business: ['business', '商业', '创业'],
  }
  
  let results = skills.filter(s => 
    s.name.toLowerCase().includes(q) || 
    (s.description && s.description.toLowerCase().includes(q))
  )
  
  for (const [cat, kws] of Object.entries(keywords)) {
    if (kws.some(k => q.includes(k))) {
      const found = skills.filter(s => s.category.toLowerCase().includes(cat))
      results = [...results, ...found]
    }
  }
  
  const unique = results.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i)
  return unique.slice(0, 6)
}

export function SkillChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: '你好！我是 Skills 助手🤖 可以帮你找到合适的技能。比如："帮我找个做图的skill"、"有没有SEO相关的"' }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  // 调用 LLM API（通过后端路由）
  const callLLM = async (userMessage: string): Promise<string | null> => {
    try {
      const response = await fetch(API_BASE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: userMessage }],
          system: buildSystemPrompt(messages)
        })
      })

      if (!response.ok) {
        console.error('API error:', response.status)
        return null
      }

      const data = await response.json()
      return data.choices?.[0]?.message?.content || null
    } catch (error) {
      console.error('LLM error:', error)
      return null
    }
  }

  const handleSend = async () => {
    if (!input.trim() || isLoading) return
    
    const userMsg: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsLoading(true)
    
    // 先尝试 LLM
    const llmReply = await callLLM(input)
    
    if (llmReply) {
      setMessages(prev => [...prev, { role: 'bot', content: llmReply }])
    } else {
      // LLM 失败，用关键词搜索 fallback
      const results = searchSkills(input)
      let reply: string
      if (results.length === 0) {
        reply = '没找到匹配的技能。可以试试其他关键词，比如："图片生成"、"SEO"、"营销"、"开发"等。'
      } else {
        reply = `找到 ${results.length} 个相关技能：\n\n`
        reply += results.map(s => `• ${s.name}\n  ${(s.description || '').slice(0, 60)}...`).join('\n\n')
        reply += '\n\n点击首页搜索或访问 /skill/[id] 查看详情'
      }
      setMessages(prev => [...prev, { role: 'bot', content: reply }])
    }
    
    setIsLoading(false)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: '#111',
          color: '#fff',
          border: 'none',
          zIndex: 50,
          cursor: 'pointer',
          fontSize: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {isLoading ? '⏳' : (isOpen ? '✕' : '💬')}
      </button>
      
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: 100,
          right: 24,
          width: 340,
          height: 420,
          background: '#fff',
          borderRadius: 12,
          border: '1px solid #eee',
          padding: 16,
          zIndex: 50,
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h3 style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 4 }}>Skills 助手</h3>
          <p style={{ fontSize: 12, color: '#666', marginBottom: 12 }}>帮你找到合适的技能</p>
          
          <div style={{ 
            flex: 1, 
            overflowY: 'auto', 
            marginBottom: 12 
          }}>
            {messages.map((m, i) => (
              <div key={i} style={{ 
                textAlign: m.role === 'user' ? 'right' : 'left',
                marginBottom: 8
              }}>
                <span style={{
                  display: 'inline-block',
                  padding: '8px 12px',
                  borderRadius: 8,
                  fontSize: 13,
                  background: m.role === 'user' ? '#111' : '#f5f5f5',
                  color: m.role === 'user' ? '#fff' : '#333',
                  maxWidth: '80%',
                  whiteSpace: 'pre-wrap'
                }}>
                  {m.content}
                </span>
              </div>
            ))}
            {isLoading && (
              <div style={{ fontSize: 12, color: '#999', padding: '4px 0' }}>
                思考中...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !isLoading && handleSend()}
              placeholder="描述你想要什么技能..."
              disabled={isLoading}
              style={{
                flex: 1,
                padding: '10px 12px',
                border: '1px solid #ddd',
                borderRadius: 8,
                fontSize: 13,
                outline: 'none'
              }}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              style={{
                padding: '10px 16px',
                background: isLoading || !input.trim() ? '#ccc' : '#111',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                cursor: isLoading ? 'default' : 'pointer',
                fontSize: 13
              }}
            >
              发送
            </button>
          </div>
        </div>
      )}
    </>
  )
}
