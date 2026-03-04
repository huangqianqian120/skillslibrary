"use client"

import { useState } from "react"
import { skills } from "@/data/skills"

type Message = { role: "user" | "bot"; content: string }

export function SkillChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "你好！我是 Skills 助手" }
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return
    const newMsgs = [...messages, { role: "user", content: input }]
    setMessages(newMsgs)
    setInput("")
    
    setTimeout(() => {
      const q = input.toLowerCase()
      const results = skills.filter(s => 
        s.name.toLowerCase().includes(q) || 
        s.description.toLowerCase().includes(q)
      ).slice(0, 5)
      
      let reply = results.length > 0 
        ? "找到 " + results.length + " 个相关技能：\n\n" + results.map(s => "• " + s.name).join("\n")
        : "没找到匹配的技能"
      
      setMessages([...newMsgs, { role: "bot", content: reply }])
    }, 500)
  }

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="fixed bottom-6 right-6 w-14 h-14 bg-gray-900 text-white rounded-full shadow-lg z-50">
        {isOpen ? "✕" : "💬"}
      </button>
      
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-xl shadow-xl border p-4 z-50">
          <h3 className="font-bold">Skills 助手</h3>
          <div className="h-48 overflow-y-auto mt-2 text-sm">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
                <span className={m.role === "user" ? "bg-gray-900 text-white" : "bg-gray-100"} + " px-2 py-1 rounded">
                  {m.content}
                </span>
              </div>
            ))}
          </div>
          <input 
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSend()}
            className="w-full border rounded px-2 py-1 mt-2 text-sm"
            placeholder="搜索技能..."
          />
        </div>
      )}
    </>
  )
}
