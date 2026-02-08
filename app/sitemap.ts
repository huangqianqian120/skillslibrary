import { MetadataRoute } from 'next';
import { skills } from '@/data/skills';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://skillslibrary.fun';

  const skillUrls = skills.map((skill) => ({
    url: `${baseUrl}/skill/${skill.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...skillUrls,
  ];
}
