#!/usr/bin/env python3
"""
Competitor Tracker Script
Track competitor activities
"""

import json
import subprocess
import sys
import urllib.parse

def search_company_news(company_name):
    """Search for company news"""
    try:
        # Search Google News via RSS
        query = urllib.parse.quote(f"{company_name} news")
        result = subprocess.run(
            ["curl", "-s", f"https://news.google.com/rss/search?q={query}&hl=en-US&gl=US&ceid=US:en"],
            capture_output=True, text=True, timeout=15
        )
        
        # Parse RSS (simplified)
        content = result.stdout
        news = []
        lines = content.split('\n')
        for i, line in enumerate(lines):
            if '<title>' in line and '</title>' in line:
                title = line.split('<title>')[1].split('</title>')[0]
                if title and len(title) > 10 and 'Google News' not in title:
                    # Find link
                    link = ""
                    for j in range(max(0, i-5), min(len(lines), i+5)):
                        if '<link>' in lines[j]:
                            link = lines[j].split('<link>')[1].split('</link>')[0]
                            break
                    if link:
                        news.append({
                            'title': title,
                            'url': link
                        })
        return news[:10]
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        return []

def main():
    if len(sys.argv) < 2:
        print(json.dumps({'error': 'Company name required'}))
        sys.exit(1)
    
    company = ' '.join(sys.argv[1:])
    news = {
        'company': company,
        'news': search_company_news(company)
    }
    print(json.dumps(news, indent=2, ensure_ascii=False))

if __name__ == "__main__":
    main()
