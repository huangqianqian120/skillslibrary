const fs = require('fs');
const path = require('path');

const SKILLS_DIR = path.join(__dirname, '../skills');
const OUTPUT_FILE = path.join(__dirname, '../data/skills.ts');

// Read all skill directories
const skills = fs.readdirSync(SKILLS_DIR)
  .filter(name => {
    const stat = fs.statSync(path.join(SKILLS_DIR, name));
    return stat.isDirectory();
  })
  .map(name => {
    const skillFile = path.join(SKILLS_DIR, name, 'SKILL.md');
    if (!fs.existsSync(skillFile)) return null;

    const content = fs.readFileSync(skillFile, 'utf-8');
    
    // Parse frontmatter
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    if (!match) return null;

    const frontmatter = match[1];
    const getField = (key) => {
      const regex = new RegExp(`^${key}:\\s*(.+)$`, 'm');
      const m = frontmatter.match(regex);
      return m ? m[1].trim().replace(/^["']|["']$/g, '') : undefined;
    };

    return {
      id: name,
      name: getField('name') || name,
      description: getField('description') || '',
      emoji: getField('emoji'),
      category: getField('category') || 'Productivity',
      tags: getField('tags') ? getField('tags').replace(/[\[\]]/g, '').split(',').map(t => t.trim()) : [],
      author: getField('author'),
      version: getField('version'),
      repoUrl: getField('repoUrl'),
    };
  })
  .filter(Boolean);

// Generate TypeScript
const ts = `export interface Skill {
  id: string
  name: string | { en: string; zh: string }
  description: string | { en: string; zh: string }
  emoji?: string
  category: string
  tags?: string[]
  author?: string
  version?: string
  installCount?: number
  rating?: number
  lastUpdated?: string
  repoUrl?: string
  requiredModel?: string
}


export const categories = ['All', 'AI', 'Automation', 'Business', 'Communication', 'Data', 'Development', 'Lifestyle', 'Media', 'Productivity', 'Security']

export const tagsConfig = {
  New: { label: { en: 'New', zh: '🆕 新增' }, color: 'bg-green-500' },
  Popular: { label: { en: 'Popular', zh: '🔥 热门' }, color: 'bg-orange-500' },
  Official: { label: { en: 'Official', zh: '✨ 官方' }, color: 'bg-blue-500' },
}

export const skills: Skill[] = ${JSON.stringify(skills, null, 2).replace(/"([^"]+)":/g, '$1:')}
`;

fs.writeFileSync(OUTPUT_FILE, ts);
console.log(`Synced ${skills.length} skills to ${OUTPUT_FILE}`);
