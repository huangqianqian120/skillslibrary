'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { skills } from '@/data/skills';

export function SEOHead({ lang = 'en' }: { lang?: 'en' | 'zh' }) {
  const params = useParams();
  const id = params.id as string;
  const skill = skills.find(s => s.id === id);

  useEffect(() => {
    if (skill) {
      const currentName = typeof skill.name === 'string' ? skill.name : skill.name[lang];
      const currentDescription = typeof skill.description === 'string' ? skill.description : skill.description[lang];

      // Update title
      const title = lang === 'zh' 
        ? `${currentName} - ${skill.category} 技能 | 技能库`
        : `${currentName} - ${skill.category} Skill | Skills Library`;
      document.title = title;

      // Update meta description
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', currentDescription);
      }

      // Update Open Graph
      const ogTitle = document.querySelector('meta[property="og:title"]');
      const ogDesc = document.querySelector('meta[property="og:description"]');
      const ogUrl = document.querySelector('meta[property="og:url"]');
      
      if (ogTitle) ogTitle.setAttribute('content', title);
      if (ogDesc) ogDesc.setAttribute('content', currentDescription);
      if (ogUrl) ogUrl.setAttribute('content', `https://skillslibrary.fun/skill/${skill.id}`);

      // Update JSON-LD
      const script = document.querySelector('script[type="application/ld+json"]');
      if (script && script.parentElement) {
        const schema = {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": currentName,
          "applicationCategory": "DeveloperApplication",
          "description": currentDescription,
          "keywords": `${skill.category}, AI, Agent, Skill, OpenClaw`,
          "url": `https://skillslibrary.fun/skill/${skill.id}`,
          "image": "https://skillslibrary.fun/favicon.ico",
          "author": {
            "@type": "Organization",
            "name": "OpenClaw"
          },
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        };
        script.textContent = JSON.stringify(schema);
      }
    }
  }, [skill, lang]);

  return null;
}
