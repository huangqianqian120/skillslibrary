#!/usr/bin/env python3
"""
Business News Aggregator Script
Fetches business and tech news
"""

import json
import subprocess
import sys
from datetime import datetime

def fetch_tech_news():
    """Fetch tech business news"""
    try:
        result = subprocess.run(
            ["curl", "-s", "https://news.google.com/rss/search?q=tech+startup+funding&hl=en-US&gl=US&ceid=US:en"],
            capture_output=True, text=True, timeout=15
        )
        # Parse RSS (simplified)
        content = result.stdout
        news = []
        # Extract titles and links (simplified parsing)
        lines = content.split('\n')
        for i, line in enumerate(lines):
            if '<title>' in line and '</title>' in line and 'Google News' not in line:
                title = line.split('<title>')[1].split('</title>')[0]
                # Find link
                link = ""
                for j in range(max(0, i-5), min(len(lines), i+5)):
                    if '<link>' in lines[j]:
                        link = lines[j].split('<link>')[1].split('</link>')[0]
                        break
                if title and link and len(title) > 10:
                    news.append({
                        'title': title,
                        'url': link,
                        'source': 'Google News'
                    })
        return news[:10]
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        return []

def fetch_hacker_news_business():
    """Fetch business-related HN stories"""
    try:
        result = subprocess.run(
            ["curl", "-s", "https://hacker-news.firebaseio.com/v0/topstories.json"],
            capture_output=True, text=True, timeout=10
        )
        story_ids = json.loads(result.stdout)[:50]
        
        stories = []
        keywords = ['startup', 'funding', 'ipo', 'acquisition', 'revenue', 'saas', 'business', 'company']
        
        for story_id in story_ids[:20]:
            story = subprocess.run(
                ["curl", "-s", f"https://hacker-news.firebaseio.com/v0/item/{story_id}.json"],
                capture_output=True, text=True, timeout=10
            )
            story_data = json.loads(story.stdout)
            if story_data:
                title = story_data.get('title', '').lower()
                if any(kw in title for kw in keywords):
                    stories.append({
                        'title': story_data.get('title'),
                        'url': story_data.get('url', f"https://news.ycombinator.com/item?id={story_id}"),
                        'score': story_data.get('score', 0),
                        'source': 'Hacker News'
                    })
        return stories[:5]
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        return []

def main():
    news = {
        'tech_news': fetch_tech_news(),
        'hacker_news': fetch_hacker_news_business(),
        'timestamp': datetime.now().isoformat()
    }
    print(json.dumps(news, indent=2, ensure_ascii=False))

if __name__ == "__main__":
    main()
