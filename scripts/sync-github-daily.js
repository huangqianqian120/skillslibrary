/**
 * Daily GitHub Skills Sync
 * Uses GitHub Code Search API to find repos with SKILL.md
 * 
 * Usage: GITHUB_TOKEN=xxx node scripts/sync-github-daily.js
 */

const fs = require('fs')
const path = require('path')

const OUTPUT_DIR = '/Users/huangqianqian/Desktop/skills-discovered-backup'
const GITHUB_TOKEN = process.env.GITHUB_TOKEN

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
}

const headers = {
  'Accept': 'application/vnd.github.v3+json',
}
if (GITHUB_TOKEN) {
  headers['Authorization'] = `token ${GITHUB_TOKEN}`
}

async function searchForSkillFiles() {
  console.log('🔍 Searching GitHub for SKILL.md files...')
  
  // Search for SKILL.md files in repos
  const url = `https://api.github.com/search/code?q=filename:SKILL.md+in:path&sort=stars&order=desc&per_page=30`
  
  const response = await fetch(url, { headers })
  
  if (!response.ok) {
    const err = await response.text()
    throw new Error(`GitHub API error: ${response.status} - ${err}`)
  }
  
  const data = await response.json()
  return data.items || []
}

function getSkillName(item) {
  // Use repo name, clean it up
  const name = item.repository.name.toLowerCase().replace(/[^a-z0-9]/g, '-')
  return name
}

function isValidSkillName(name) {
  return name.length > 2 && /^[a-z][a-z0-9-]*$/.test(name)
}

async function downloadSkillFile(item) {
  const skillName = getSkillName(item)
  
  if (!isValidSkillName(skillName)) {
    console.log(`  ⏭️  Skip: ${item.repository.name} -> invalid name`)
    return null
  }
  
  const targetDir = path.join(OUTPUT_DIR, skillName)
  
  if (fs.existsSync(targetDir)) {
    console.log(`  ⏭️  Skip: ${skillName} (already exists)`)
    return { skillName, status: 'skipped' }
  }
  
  try {
    // Download the SKILL.md content
    const contentResponse = await fetch(item.url, {
      headers: {
        'Accept': 'application/vnd.github.v3.raw',
        ...headers
      }
    })
    
    if (!contentResponse.ok) {
      console.log(`  ❌ ${skillName}: failed to download`)
      return null
    }
    
    const content = await contentResponse.text()
    
    // Save the file
    fs.mkdirSync(targetDir, { recursive: true })
    fs.writeFileSync(path.join(targetDir, 'SKILL.md'), content)
    
    // Create metadata
    const repo = item.repository
    const metadata = `---
name: ${skillName}
description: "${repo.description?.replace(/"/g, "'") || skillName}"
author: ${repo.owner?.login || 'unknown'}
stars: ${repo.stargazers_count || 0}
repoUrl: ${repo.html_url}
---
`
    fs.writeFileSync(path.join(targetDir, 'METADATA.md'), metadata)
    
    console.log(`  ✅ ${skillName} (⭐${repo.stargazers_count || 0})`)
    return { skillName, status: 'downloaded' }
    
  } catch (e) {
    console.log(`  ❌ ${skillName}: ${e.message}`)
  }
  
  return null
}

async function main() {
  console.log(`\n📁 Output: ${OUTPUT_DIR}`)
  console.log(`⏰ ${new Date().toISOString()}\n`)
  
  if (!GITHUB_TOKEN) {
    console.log('⚠️  No GITHUB_TOKEN set, using unauthenticated requests (rate limited)\n')
  }
  
  try {
    const items = await searchForSkillFiles()
    console.log(`Found ${items.length} SKILL.md files\n`)
    
    let downloaded = 0
    let skipped = 0
    
    for (const item of items) {
      const result = await downloadSkillFile(item)
      if (result?.status === 'downloaded') downloaded++
      if (result?.status === 'skipped') skipped++
    }
    
    console.log(`\n📊 Summary: ${downloaded} new, ${skipped} skipped`)
    
    const skills = fs.readdirSync(OUTPUT_DIR)
    console.log(`📦 Total discovered: ${skills.length} skills\n`)
    
  } catch (e) {
    console.error('Error:', e.message)
    process.exit(1)
  }
}

main()
