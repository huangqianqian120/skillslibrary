'use client'

import { useState } from 'react'
import { skills } from '@/data/skills'

type Message = { role: 'user' | 'bot'; content: string }

export function SkillChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: '你好！我是 Skills 助手，可以帮你找到合适的技能。比如："帮我找个做图的skill"、"有没有SEO相关的"' }
  ])
  const [input, setInput] = useState('')

  const searchSkills = (query: string) => {
    const q = query.toLowerCase()
    const keywords: Record<string, string[]> = {
      image: ['image', 'img', '图片', '画', '生成图', 'design'],
      video: ['video', '视频', '剪辑'],
      writing: ['writing', '写作', '写', '文案'],
      marketing: ['marketing', '营销', '推广', 'seo'],
      search: ['search', '搜索', 'tavily'],
      development: ['dev', '开发', '编程', 'code', 'frontend', 'web'],
      automation: ['automation', '自动化', '小红书'],
      security: ['security', '安全', '审计'],
      pdf: ['pdf', '文档'],
      weather: ['weather', '天气'],
      notes: ['notes', '笔记', 'notion'],
    }
    
    let results = skills.filter(s => 
      s.name.toLowerCase().includes(q) || 
      s.description.toLowerCase().includes(q)
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

  const handleSend = () => {
    if (!input.trim()) return
    const userMsg: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    
    setTimeout(() => {
      const results = searchSkills(input)
      let reply: string
      if (results.length === 0) {
        reply = '没找到匹配的技能。可以试试其他关键词，比如："图片生成"、"SEO"、"营销"等。'
      } else {
        reply = `找到 ${results.length} 个相关技能：\n\n`
        reply += results.map(s => `• ${s.name} - ${s.description.slice(0, 50)}...`).join('\n\n')
        reply += '\n\n点击首页搜索或访问 /skill/[id] 查看详情'
      }
      setMessages(prev => [...prev, { role: 'bot', content: reply }])
    }, 500)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{position:'fixed',bottom:24,right:24,width:56,height:56,borderRadius:'50%',background:'#111',color:'#fff',border:'none',zIndex:50,cursor:'pointer',fontSize:24}}
      >
        {isOpen ? '✕' : '💬'}
      </button>
      
      {isOpen && (
        <div style={{position:'fixed',bottom:100,right:24,width:340,height:420,background:'#fff',borderRadius:12,border:'1px solid #eee',padding:16,zIndex:50,boxShadow:'0 4px 20px rgba(0,0,0,0.15)',display:'flex',flexDirection:'column'}}>
          <h3 style={{fontWeight:'bold',fontSize:16,marginBottom:4}}>Skills 助手</h3>
          <p style={{fontSize:12,color:'#666',marginBottom:12}}>帮你找到合适的技能</p>
          
          <div style={{flex:1,overflowY:'auto',marginBottom:12}}>
            {messages.map((m, i) => (
              <div key={i} style={{textAlign: m.role === 'user' ? 'right' : 'left',marginBottom:8}}>
                <span style={{
                  display:'inline-block',
                  padding:'8px 12px',
                  borderRadius:8,
                  fontSize:13,
                  background: m.role === 'user' ? '#111' : '#f5f5f5',
                  color: m.role === 'user' ? '#fff' : '#333',
                  maxWidth:'80%',
                  whiteSpace:'pre-wrap'
                }}>
                  {m.content}
                </span>
              </div>
            ))}
          </div>
          
          <div style={{display:'flex',gap:8}}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="描述你想要什么技能..."
              style={{flex:1,padding:'10px 12px',border:'1px solid #ddd',borderRadius:8,fontSize:13,outline:'none'}}
            />
            <button
              onClick={handleSend}
              style={{padding:'10px 16px',background:'#111',color:'#fff',border:'none',borderRadius:8,cursor:'pointer',fontSize:13}}
            >
              发送
            </button>
          </div>
        </div>
      )}
    </>
  )
}
