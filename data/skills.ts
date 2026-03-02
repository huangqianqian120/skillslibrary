export interface Skill {
  id: string
  name: string
  description: string
  emoji?: string
  category: string
}

export const skills: Skill[] = [
  { id: '1password', name: '1password', description: 'Set up and use 1Password CLI (op).', category: 'Development' },
  { id: 'apple-notes', name: 'apple-notes', description: 'Manage Apple Notes via the memo CLI.', category: 'Productivity' },
  { id: 'marketing-ideas', name: 'marketing-ideas', description: 'When the user needs marketing ideas. This skill provides 139 proven marketing approaches.', category: 'Business' },
  { id: 'marketing-psychology', name: 'marketing-psychology', description: 'When the user wants to apply psychological principles to marketing. This skill provides 70+ mental models.', category: 'Business' },
]
