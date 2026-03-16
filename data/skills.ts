export interface Skill {
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

]
