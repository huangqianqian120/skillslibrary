import { appendFile } from 'fs/promises'
import { existsSync, mkdirSync } from 'fs'
import { join } from 'path'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const log = {
      time: new Date().toISOString(),
      page: body.page || '/',
      referrer: body.referrer || '',
      ua: body.ua || ''
    }
    
    const logDir = join(process.cwd(), 'logs')
    if (!existsSync(logDir)) {
      mkdirSync(logDir, { recursive: true })
    }
    
    const logFile = join(logDir, 'visits.jsonl')
    await appendFile(logFile, JSON.stringify(log) + '\n')
    
    return Response.json({ ok: true })
  } catch (e) {
    return Response.json({ ok: false, error: String(e) }, { status: 500 })
  }
}

export async function GET() {
  return Response.json({ 
    message: 'Visit tracking API',
    usage: 'POST to this endpoint with { page, referrer, ua }'
  })
}
