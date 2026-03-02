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
  { id: 'weather', name: 'weather', description: 'Get current weather and forecasts via wttr.in or Open-Meteo.', category: 'Lifestyle' },
  { id: 'marketing-ideas', name: 'marketing-ideas', description: 'When the user needs marketing ideas. This skill provides 139 proven marketing approaches.', category: 'Business' },
  { id: 'marketing-psychology', name: 'marketing-psychology', description: 'When the user wants to apply psychological principles to marketing. This skill provides 70+ mental models.', category: 'Business' },
  { id: 'location-advisor', name: 'location-advisor', description: 'Location advisor system based on McKinsey methodology. Uses MECE factor breakdown, data-driven scoring and hypothesis validation for retail store, restaurant, warehouse, factory and office location decisions. Supports API integration and manual input fallback.', category: 'Business' },
]
