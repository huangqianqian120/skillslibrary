#!/usr/bin/env python3
"""
AI News Aggregator Script
Fetches latest AI news from multiple sources
"""

import json
import subprocess
import sys
from datetime import datetime

def fetch_hacker_news():
    """Fetch top AI stories from Hacker News"""
    try:
        # Get top stories
        result = subprocess.run(
            ["curl", "-s", "https://hacker-news.firebaseio.com/v0/topstories.json"],
            capture_output=True, text=True, timeout=10
        )
        story_ids = json.loads(result.stdout)[:30]
        
        stories = []
        for story_id in story_ids[:10]:
            story = subprocess.run(
                ["curl", "-s", f"https://hacker-news.firebaseio.com/v0/item/{story_id}.json"],
                capture_output=True, text=True, timeout=10
            )
            story_data = json.loads(story.stdout)
            if story_data and story_data.get('score', 0) >= 10:
                # Filter AI-related
                title = story_data.get('title', '').lower()
                if any(kw in title for kw in ['ai', 'llm', 'gpt', 'agent', 'model', 'learning', 'neural']):
                    stories.append({
                        'title': story_data.get('title'),
                        'url': story_data.get('url', f"https://news.ycombinator.com/item?id={story_id}"),
                        'score': story_data.get('score', 0),
                        'source': 'Hacker News'
                    })
        return stories[:5]
    except Exception as e:
        print(f"Error fetching HN: {e}", file=sys.stderr)
        return []

def fetch_github_trending():
    """Fetch trending AI repositories"""
    try:
        result = subprocess.run(
            ["curl", "-s", "https://api.github.com/search/repositories?q=ai+agent+language-model&sort=stars&order=desc&per_page=10"],
            capture_output=True, text=True, timeout=15
        )
        data = json.loads(result.stdout)
        repos = []
        for item in data.get('items', [])[:5]:
            repos.append({
                'name': item.get('full_name'),
                'description': item.get('description'),
                'stars': item.get('stargazers_count'),
                'url': item.get('html_url'),
                'language': item.get('language'),
                'source': 'GitHub'
            })
        return repos
    except Exception as e:
        print(f"Error fetching GitHub: {e}", file=sys.stderr)
        return []

def main():
    """Main aggregation function"""
    news = {
        'hacker_news': fetch_hacker_news(),
        'github_trending': fetch_github_trending(),
        'timestamp': datetime.now().isoformat()
    }
    print(json.dumps(news, indent=2, ensure_ascii=False))

if __name__ == "__main__":
    main()
