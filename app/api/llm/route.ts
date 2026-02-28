import { NextRequest, NextResponse } from 'next/server'

// Minimax API 配置
const MINIMAX_API_KEY = process.env.MINIMAX_API_KEY || 'your-api-key'
const MINIMAX_BASE_URL = 'https://api.minimax.chat/v1'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { messages, system } = body

    // 构建请求
    const response = await fetch(`${MINIMAX_BASE_URL}/text/chatcompletion_v2`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MINIMAX_API_KEY}`
      },
      body: JSON.stringify({
        model: 'MiniMax-M2.1',
        messages: [
          ...(system ? [{ role: 'system', content: system }] : []),
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 4000
      })
    })

    if (!response.ok) {
      const error = await response.text()
      return NextResponse.json({ error: error }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
