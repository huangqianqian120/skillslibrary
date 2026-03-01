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
  if (text.match(/invoice|receipt|financial|expense|accounting/)) return '商业';
  if (text.match(/lead|client|customer|prospect|market|competitive|ads?|ad$/)) return '商业';
  if (text.match(/meeting|transcript|insight|analysis/)) return '商业';
  if (text.match(/content|writing|blog|article|document/)) return 'Productivity';
  if (text.match(/domain|name.?brain|brand/)) return '商业';
  if (text.match(/resume|cv|job.*apply|career/)) return '商业';
  if (text.match(/notion|project.*manage/)) return 'Productivity';
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
          'User-Agent': 'SkillsLibrary-Sync',
          ...(process.env.GITHUB_TOKEN ? { 'Authorization': `token ${process.env.GITHUB_TOKEN}` } : {})
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
  
  // Add custom skills that don't exist in OpenClaw repo
  const customSkills = [
    // 商业
    { id: 'invoice-organizer', name: 'invoice-organizer', description: 'Organize, categorize, and manage invoices and receipts. Useful for accounting, expense tracking, and financial record keeping.', category: '商业' },
    { id: 'lead-research-assistant', name: 'lead-research-assistant', description: 'Research and gather information about potential leads, companies, or contacts. Supports enrichment from multiple data sources.', category: '商业' },
    { id: 'meeting-insights-analyzer', name: 'meeting-insights-analyzer', description: 'Analyze meeting transcripts and notes to extract key insights, action items, and decisions. Great for team retrospectives.', category: '商业' },
    { id: 'competitive-ads-extractor', name: 'competitive-ads-extractor', description: 'Extract and analyze competitive advertising data from various platforms. Useful for market research, ad monitoring, and competitor analysis.', category: '商业' },
    { id: 'content-research-writer', name: 'content-research-writer', description: 'Research topics, gather information from multiple sources, and assist in writing well-structured content. Great for blog posts, articles, and documentation.', category: '商业' },
    { id: 'domain-name-brainstormer', name: 'domain-name-brainstormer', description: 'Generate creative domain name ideas based on keywords, industries, or themes. Checks availability and provides alternatives.', category: '商业' },
    { id: 'tailored-resume-generator', name: 'tailored-resume-generator', description: 'Generate customized resumes based on job descriptions. Tailors content, keywords, and formatting for specific positions.', category: '商业' },
    { id: 'document-skills', name: 'document-skills', description: 'Create, format, and manage professional documents including reports, proposals, and technical documentation. Supports multiple formats and templates.', category: '商业' },
    // Marketing
    { id: 'marketing-ideas', name: 'marketing-ideas', description: 'When the user needs marketing ideas, inspiration, or strategies for their SaaS or software product. This skill provides 139 proven marketing approaches organized by category.', category: '商业' },
    { id: 'marketing-psychology', name: 'marketing-psychology', description: 'When the user wants to apply psychological principles, mental models, or behavioral science to marketing. This skill provides 70+ mental models organized for marketing application.', category: '商业' },
    { id: 'copywriting', name: 'copywriting', description: 'When the user wants to write, rewrite, or improve marketing copy for any page — including homepage, landing pages, pricing pages, feature pages, about pages, or product pages.', category: '商业' },
    { id: 'seo-audit', name: 'seo-audit', description: 'When the user wants to audit, review, or diagnose SEO issues on their site. Includes technical SEO, on-page SEO, meta tags review, and SEO health check.', category: 'Productivity' },
    { id: 'content-strategy', name: 'content-strategy', description: 'When the user wants to plan a content strategy, decide what content to create, or figure out what topics to cover.', category: '商业' },
    { id: 'growth', name: 'growth', description: 'Product growth and product-market fit. Use when testing if you have PMF, designing activation flows, thinking about retention, or planning acquisition channels.', category: '商业' },
    // Research
    { id: 'tavily', name: 'tavily', description: 'AI-powered web search, extraction, and research. Use when user wants to search the web, extract content from URLs, crawl websites, or do deep research on a topic.', category: 'Development' },
    { id: 'ddg-web-search', name: 'ddg-web-search', description: 'Web search without an API key using DuckDuckGo Lite via web_fetch. Zero dependencies — works with just the built-in web_fetch tool.', category: 'Development' },
  ];
  
  // Add custom skills (avoid duplicates)
  const existingIds = new Set(skills.map(s => s.id));
  customSkills.forEach(s => {
    if (!existingIds.has(s.id)) {
      skills.push(s);
    }
  });
  
  // Generate skills.ts file
  let categories = [...new Set(skills.map(s => s.category))].sort();
  // Ensure 商业 category exists
  if (!categories.includes('商业')) {
    categories = ['商业', ...categories];
  }
  
  const output = `export interface Skill {
  id: string
  name: string
  description: string
  emoji?: string
  tags?: string[]
  category: string
}

export const skills: Skill[] = [
${skills.map(s => `  { id: '${s.id}', name: '${s.name}', description: '${s.description.replace(/'/g, "\\'")}', tags: [], category: '${s.category}' }`).join(',\n')}
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
