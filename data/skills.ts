export interface Skill {
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

export const skills: Skill[] = [
  {
    id: 'wps-skills',
    name: 'WPS Skills',
    description: 'WPS Office 智能助手 - AI编程助手通过自然语言操控WPS Office的MCP工具集。支持Excel(80工具) / Word(24工具) / PPT(111工具)。',
    emoji: '📊',
    category: 'Productivity',
    tags: ['WPS', 'Office', 'Excel', 'Word', 'PPT', 'MCP', 'Automation'],
    author: 'lc2panda',
    version: '1.0.0',
    repoUrl: 'https://github.com/lc2panda/wps-skills',
  },
  {
    id: 'infinite-dev-skill',
    name: 'Infinite Dev Skill',
    description: 'Claude Code 无限开发循环技能 - 让 Claude 成为无限开发循环：spec → feature list → implement → test → commit → repeat，跨无限制上下文窗口。',
    emoji: '🔄',
    category: 'Development',
    tags: ['Claude Code', 'Development', 'Automation', 'Loop', 'Agent'],
    author: 'RobertWang4',
    version: '1.0.0',
    repoUrl: 'https://github.com/RobertWang4/infinite-dev-skill',
  },
  {
    id: 'ppt-agent-skill',
    name: 'PPT Agent Skill',
    description: '专业 PPT 演示文稿全流程 AI 生成助手。模拟万元/页级别 PPT 设计公司的完整工作流，输出高质量 HTML 演示文稿 + 可编辑矢量 PPTX。',
    emoji: '📑',
    category: 'Productivity',
    tags: ['PPT', 'Presentation', 'AI', 'Design', 'Automation'],
    author: 'sunbigfly',
    version: '1.0.0',
    repoUrl: 'https://github.com/sunbigfly/ppt-agent-skill',
  },
]
