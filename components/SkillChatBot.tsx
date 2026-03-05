'use client'

import { useState, useRef, useEffect } from 'react'
import { skills } from '@/data/skills'

type Message = { role: 'user' | 'bot'; content: string }

// MiniMax API 配置
const MINIMAX_API_KEY = 'sk-api-cTF4bf6oWEiSamowl898uwrEgm2-0dlrWsyIE9zakzQt3HbT_giDSMiDPU8b5c1VqtxLft2ugnu2xCK1iGGDTUKuCd9r9tdbJ9gial3w47bNp_-BO5tDf-Q'
const MINIMAX_API_URL = 'https://api.minimax.chat/v1/text/chatcompletion_v2'

// 构建 system prompt
const buildSystemPrompt = () => {
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

export function SkillChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: '你好！我是 Skills 助手🤖\n\n可以告诉我你想要什么功能，比如："帮我找个做图的skill"、"有没有SEO相关的"、"我想做自动化工作流"等，我会帮你找到合适的技能。' }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  // 调用 MiniMax API
  const callLLM = async (userMessage: string): Promise<string> => {
    const response = await fetch(MINIMAX_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MINIMAX_API_KEY}`
      },
      body: JSON.stringify({
        model: 'MiniMax-M2.1',
        messages: [
          { role: 'system', content: buildSystemPrompt() },
          ...messages.map(m => ({ role: m.role, content: m.content })),
          { role: 'user', content: userMessage }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return data.choices?.[0]?.message?.content || '抱歉，我暂时无法回答。请稍后重试。'
  }

  const handleSend = async () => {
    if (!input.trim() || isLoading) return
    
    const userMsg: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsLoading(true)
    
    try {
      const reply = await callLLM(input)
      setMessages(prev => [...prev, { role: 'bot', content: reply }])
    } catch (error) {
      console.error('LLM error:', error)
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: '调用 AI 服务出错啦😢 请稍后重试，或者换个方式描述你的需求？' 
      }])
    } finally {
      setIsLoading(false)
    }
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
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#fff',
          border: 'none',
          zIndex: 50,
          cursor: 'pointer',
          fontSize: 24,
          boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
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
          width: 380,
          height: 520,
          background: '#fff',
          borderRadius: 16,
          border: '1px solid #eee',
          padding: 16,
          zIndex: 50,
          boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span style={{ fontSize: 28 }}>🤖</span>
            <div>
              <h3 style={{ fontWeight: 600, fontSize: 15, margin: 0 }}>Skills 助手</h3>
              <p style={{ fontSize: 11, color: '#666', margin: 0 }}>AI 驱动 · 即时响应</p>
            </div>
          </div>
          
          <div style={{ 
            flex: 1, 
            overflowY: 'auto', 
            marginBottom: 12,
            padding: '8px 0',
            borderTop: '1px solid #f0f0f0',
            borderBottom: '1px solid #f0f0f0'
          }}>
            {messages.map((m, i) => (
              <div key={i} style={{ 
                textAlign: m.role === 'user' ? 'right' : 'left',
                marginBottom: 10,
                display: 'flex',
                justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
                alignItems: 'flex-end',
                gap: 8
              }}>
                {m.role === 'bot' && <span style={{ fontSize: 20 }}>🤖</span>}
                <span style={{
                  display: 'inline-block',
                  padding: '10px 14px',
                  borderRadius: 12,
                  fontSize: 13,
                  background: m.role === 'user' 
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                    : '#f5f5f5',
                  color: m.role === 'user' ? '#fff' : '#333',
                  maxWidth: '75%',
                  whiteSpace: 'pre-wrap',
                  lineHeight: 1.5
                }}>
                  {m.content}
                </span>
                {m.role === 'user' && <span style={{ fontSize: 20 }}>👤</span>}
              </div>
            ))}
            {isLoading && (
              <div style={{ textAlign: 'left', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 20 }}>🤖</span>
                <span style={{ color: '#999', fontSize: 12 }}>AI 思考中...</span>
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
                padding: '12px 14px',
                border: '1px solid #ddd',
                borderRadius: 10,
                fontSize: 13,
                outline: 'none',
                background: isLoading ? '#f9f9f9' : '#fff'
              }}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              style={{
                padding: '10px 18px',
                background: isLoading || !input.trim() 
                  ? '#ccc' 
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                cursor: isLoading ? 'default' : 'pointer',
                fontSize: 13,
                fontWeight: 500
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
