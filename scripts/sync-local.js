/**
 * Sync skills from local workspace to skillslibrary
 * Run: node scripts/sync-local.js
 */

const fs = require('fs')
const path = require('path')

const LOCAL_SKILLS_PATH = '/Users/huangqianqian/.openclaw/workspace/skills'
const OUTPUT_PATH = path.join(__dirname, '../data/skills.ts')

function getSkillsFromWorkspace() {
  const skills = []
  const dirs = fs.readdirSync(LOCAL_SKILLS_PATH)
  
  for (const dir of dirs) {
    const skillPath = path.join(LOCAL_SKILLS_PATH, dir)
    if (!fs.statSync(skillPath).isDirectory()) continue
    
    const skillMdPath = path.join(skillPath, 'SKILL.md')
    if (!fs.existsSync(skillMdPath)) continue
    
    try {
      const content = fs.readFileSync(skillMdPath, 'utf-8')
      
      // Parse frontmatter
      const match = content.match(/^---\n([\s\S]*?)\n---/)
      if (!match) continue
      
      const fm = match[1]
      const getField = (name) => {
        const m = fm.match(new RegExp(`^${name}:\\s*(.+)$`, 'm'))
        return m ? m[1].trim() : null
      }
      
      const name = getField('name') || dir
      const description = getField('description') || `${name} skill`
      
      // Infer category
      const text = `${name} ${description}`.toLowerCase()
      let category = 'Development'
      if (text.match(/note|obsidian|bear|markdown|writing/)) category = 'Productivity'
      if (text.match(/discord|slack|whatsapp|message/)) category = 'Communication'
      if (text.match(/github|git|coding|code|dev|cli/)) category = 'Development'
      if (text.match(/image|pdf|video|audio|media/)) category = 'Media'
      if (text.match(/market|lead|client|ads|business|marketing/)) category = 'Business'
      if (text.match(/ai|llm|gemini|openai/)) category = 'AI'
      if (text.match(/weather|place|food|life|home/)) category = 'Lifestyle'
      if (text.match(/automation|workflow/)) category = 'Automation'
      
      skills.push({
        id: dir,
        name: name,
        description: description.substring(0, 100),
        category,
        tags: [],
        author: 'Local',
        version: getField('version') || '1.0.0',
        installCount: 0,
        rating: 0,
        lastUpdated: new Date().toISOString().split('T')[0]
      })
      
      console.log(`✓ ${dir} -> ${category}`)
    } catch (e) {
      console.log(`✗ ${dir}: ${e.message}`)
    }
  }
  
  return skills
}

function generateSkillsTS(skills) {
  const header = `export interface Skill {
  id: string
  name: string
  description: string
  emoji?: string
  category: string
  tags?: string[]
  author?: string
  version?: string
  installCount?: number
  rating?: number
  lastUpdated?: string
}

export const categories = ['All', 'AI', 'Automation', 'Business', 'Communication', 'Data', 'Development', 'Lifestyle', 'Media', 'Productivity']

export const tagsConfig = {
  New: { label: { en: 'New', zh: '🆕 新增' }, color: 'bg-green-500' },
  Popular: { label: { en: 'Popular', zh: '🔥 热门' }, color: 'bg-orange-500' },
  Official: { label: { en: 'Official', zh: '✨ 官方' }, color: 'bg-blue-500' },
}

export const skills: Skill[] = [
`

  const entries = skills.map(s => `  { id: '${s.id}', name: '${s.name}', description: '${s.description}', category: '${s.category}', tags: ${JSON.stringify(s.tags)}, author: '${s.author}', version: '${s.version}', installCount: ${s.installCount}, rating: ${s.rating}, lastUpdated: '${s.lastUpdated}' }`).join(',\n')

  return header + entries + '\n]'
}

// Main
console.log('🔄 Syncing skills from workspace...\n')
const skills = getSkillsFromWorkspace()
console.log(`\n📦 Found ${skills.length} skills\n`)

const ts = generateSkillsTS(skills)
fs.writeFileSync(OUTPUT_PATH, ts)

console.log(`✅ Written to ${OUTPUT_PATH}`)
console.log(`📊 Total: ${skills.length} skills`)
