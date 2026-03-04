'use client'

import { useState } from 'react'

export function SkillChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{position:'fixed',bottom:24,right:24,width:56,height:56,borderRadius:'50%',background:'#111',color:'#fff',border:'none',zIndex:50,cursor:'pointer'}}
      >
        {isOpen ? '✕' : '💬'}
      </button>
      
      {isOpen && (
        <div style={{position:'fixed',bottom:100,right:24,width:320,height:400,background:'#fff',borderRadius:12,border:'1px solid #eee',padding:16,zIndex:50,boxShadow:'0 4px 20px rgba(0,0,0,0.15)'}}>
          <h3 style={{fontWeight:'bold',marginBottom:8}}>Skills 助手</h3>
          <p style={{fontSize:12,color:'#666'}}>搜索技能...</p>
        </div>
      )}
    </>
  )
}
