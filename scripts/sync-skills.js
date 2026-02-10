#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

/**
 * Sync skills from OpenClaw GitHub repository
 * Run: node scripts/sync-skills.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const REPO_OWNER = 'openclaw';
const REPO_NAME = 'openclaw';
const SKILLS_PATH = 'skills';

// Categories mapping based on skill name/description patterns
function inferCategory(name, description) {
  const text = `${name} ${description}`.toLowerCase();
  
  if (text.match(/note|obsidian|bear|markdown|writing|edit/)) return 'Productivity';
  if (text.match(/discord|slack|whatsapp|imsg|message|call|voice/)) return 'Communication';
  if (text.match(/github|git|coding|code|dev|cli|session|model|debug|mcp/)) return 'Development';
  if (text.match(/image|pdf|video|audio|transcribe|tts|speech|music|spotify|media/)) return 'Media';
  if (text.match(/weather|place|food|order|life|home|health/)) return 'Lifestyle';
  if (text.match(/ai|gemini|openai|llm|summarize/)) return 'AI';
  if (text.match(/reminder|todo|things|trello|kanban|project/)) return 'Productivity';
  if (text.match(/hue|light|smart|home|device/)) return 'Hardware';
  if (text.match(/blog|rss|feed|watch|monitor|track/)) return 'Monitoring';
  if (text.match(/gmail|email|calendar|drive|workspace/)) return 'Productivity';
  if (text.match(/social|twitter|x|bird/)) return 'Social';
  
  return 'Development'; // default
}

function fetchJson(url, retries = 3) {
  return new Promise((resolve, reject) => {
    const doRequest = () => {
      https.get(url, { 
        headers: { 
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'SkillsLibrary-Sync'
        },
        timeout: 10000
      }, (res) => {
        if (res.statusCode === 403 || res.statusCode === 429) {
          console.log('Rate limited, waiting 5s...');
          setTimeout(doRequest, 5000);
          return;
        }
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            if (retries > 0) {
              console.log(`Retrying... (${retries} left)`);
              setTimeout(() => doRequest(), 1000);
            } else {
              reject(e);
            }
          }
        });
      }).on('error', (e) => {
        if (retries > 0) {
          console.log(`Retry on error: ${e.message}`);
          setTimeout(() => doRequest(), 1000);
        } else {
          reject(e);
        }
      });
    };
    doRequest();
  });
}

async function fetchSkillDetails(skillName) {
  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${SKILLS_PATH}/${skillName}/SKILL.md`;
  try {
    const data = await fetchJson(url);
    if (data.content) {
      const content = Buffer.from(data.content, 'base64').toString('utf-8');
      // Extract YAML frontmatter
      const match = content.match(/^---\n([\s\S]*?)\n---/);
      if (match) {
        const yaml = match[1];
        const nameMatch = yaml.match(/name:\s*(.+)/);
        const descMatch = yaml.match(/description:\s*(.+)/);
        const emojiMatch = yaml.match(/emoji:\s*(.+)/);
        
        return {
          name: nameMatch ? nameMatch[1].trim() : skillName,
          description: descMatch ? descMatch[1].trim() : '',
          emoji: emojiMatch ? emojiMatch[1].trim() : null,
        };
      }
    }
    return null;
  } catch (e) {
    console.error(`Error fetching ${skillName}:`, e.message);
    return null;
  }
}

async function syncSkills() {
  console.log('Fetching skills list from GitHub...');
  
  const skillsUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${SKILLS_PATH}`;
  const skillList = await fetchJson(skillsUrl);
  
  const skills = [];
  console.log(`Found ${skillList.length} skills. Fetching details...`);
  
  for (const item of skillList) {
    if (item.type === 'dir') {
      console.log(`  Processing: ${item.name}`);
      const details = await fetchSkillDetails(item.name);
      
      if (details) {
        skills.push({
          id: item.name,
          name: details.name,
          description: details.description,
          category: inferCategory(details.name, details.description),
        });
      } else {
        skills.push({
          id: item.name,
          name: item.name,
          description: `Skill: ${item.name}`,
          category: inferCategory(item.name, ''),
        });
      }
    }
  }
  
  // Generate skills.ts file
  const categories = [...new Set(skills.map(s => s.category))].sort();
  
  const output = `export interface Skill {
  id: string
  name: string
  description: string
  emoji?: string
  category: string
}

export const skills: Skill[] = [
${skills.map(s => `  { id: '${s.id}', name: '${s.name}', description: '${s.description.replace(/'/g, "\\'")}', category: '${s.category}' }`).join(',\n')}
]

export const categories = ${JSON.stringify(categories, null, 2)}
`
  
  const outputPath = path.join(process.cwd(), 'data', 'skills.ts');
  fs.writeFileSync(outputPath, output);
  
  console.log(`\n✓ Synced ${skills.length} skills from OpenClaw repository`);
  console.log(`✓ Categories: ${categories.join(', ')}`);
  console.log(`\nSaved to: ${outputPath}`);
}

syncSkills().catch(console.error);
