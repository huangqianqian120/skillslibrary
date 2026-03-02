/**
 * Auto-sync skills from GitHub
 * Search for repos with SKILL.md and sync them
 * 
 * Usage: node scripts/sync-github.js
 */

const fs = require('fs')
const path = require('path')

// Search query for GitHub API
const SEARCH_QUERY = 'SKILL.md in:path language:markdown'

// Categories mapping based on skill content
const CATEGORY_KEYWORDS = {
  'AI': ['llm', 'gpt', 'claude', 'openai', 'embedding', 'rag', 'model'],
  'Automation': ['automation', 'workflow', 'trigger', 'schedule', 'cron'],
  'Business': ['marketing', 'sales', 'business', 'crm', 'analytics', 'seo'],
  'Communication': ['discord', 'slack', 'telegram', 'whatsapp', 'imessage', 'email'],
  'Data': ['database', 'sql', 'postgres', 'mysql', 'mongodb', 'data', 'etl'],
  'Development': ['dev', 'code', 'git', 'github', 'debug', 'cli', 'tool'],
  'Lifestyle': ['weather', 'food', 'travel', 'life', 'home'],
  'Media': ['image', 'video', 'audio', 'pdf', 'media', 'design'],
  'Productivity': ['note', 'task', 'calendar', 'reminder', 'productivity', 'writing'],
}

function inferCategory(name, description) {
  const text = `${name} ${description}`.toLowerCase()
  
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some(k => text.includes(k))) {
      return category
    }
  }
  return 'Development'
}

async function searchGitHub() {
  // Use GitHub Search API
  const url = `https://api.github.com/search/code?q=${encodeURIComponent(SEARCH_QUERY)}&per_page=100`
  
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
    }
  })
  
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`)
  }
  
  const data = await response.json()
  return data.items || []
}

async function fetchSkillMd(repo) {
  // Get SKILL.md content
  const url = `https://api.github.com/repos/${repo.repository.full_name}/contents/SKILL.md`
  
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.github.v3.raw',
    }
  })
  
  if (!response.ok) return null
  
  const content = await response.text()
  return content
}

function parseSkillMd(content, repo) {
  // Parse frontmatter
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/)
  
  let name = repo.name.replace(/-/g, '_')
  let description = repo.description || `${name} skill`
  let category = 'Development'
  
  if (fmMatch) {
    const fm = fmMatch[1]
    const getField = (field) => {
      const m = fm.match(new RegExp(`^${field}:\\s*(.+)$`, 'm'))
      return m ? m[1].trim() : null
    }
    
    name = getField('name') || name
    description = getField('description') || description
    category = getField('category') || inferCategory(name, description)
  } else {
    category = inferCategory(name, description)
  }
  
  return {
    id: name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    name: name,
    description: description.substring(0, 100),
    category,
    tags: [],
    author: repo.owner?.login || 'GitHub',
    version: '1.0.0',
    installCount: 0,
    rating: 0,
    lastUpdated: new Date().toISOString().split('T')[0],
    repoUrl: repo.html_url,
  }
}

async function syncFromGitHub() {
  console.log('🔍 Searching GitHub for skills...')
  
  try {
    const results = await searchGitHub()
    console.log(`Found ${results.length} repos with SKILL.md`)
    
    const skills = []
    
    for (const repo of results.slice(0, 50)) { // Limit to 50
      try {
        const content = await fetchSkillMd(repo)
        if (content) {
          const skill = parseSkillMd(content, repo)
          skills.push(skill)
          console.log(`✓ ${skill.id} -> ${skill.category}`)
        }
      } catch (e) {
        console.log(`✗ ${repo.name}: ${e.message}`)
      }
    }
    
    console.log(`\n📦 Total: ${skills.length} skills`)
    return skills
    
  } catch (e) {
    console.error('Error:', e.message)
    return []
  }
}

// Run if called directly
if (require.main === module) {
  syncFromGitHub()
    .then(skills => {
      console.log('\nSkills ready for import!')
    })
}

module.exports = { syncFromGitHub }
