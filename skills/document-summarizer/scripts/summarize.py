#!/usr/bin/env python3
"""
Document Summarizer Script
Summarize URLs and documents
"""

import json
import subprocess
import sys
import urllib.parse

def summarize_url(url):
    """Fetch and summarize a URL"""
    try:
        # Try using web_fetch or curl
        result = subprocess.run(
            ["curl", "-sL", "--max-time", "30", url],
            capture_output=True, text=True, timeout=35
        )
        content = result.stdout[:10000]  # Limit content
        
        # Return structured data for AI to summarize
        return {
            'url': url,
            'content_length': len(content),
            'preview': content[:500],
            'needs_summary': True
        }
    except Exception as e:
        print(json.dumps({'error': str(e)}))
        sys.exit(1)

def main():
    if len(sys.argv) < 2:
        print(json.dumps({'error': 'URL required'}))
        sys.exit(1)
    
    url = sys.argv[1]
    result = summarize_url(url)
    print(json.dumps(result, indent=2, ensure_ascii=False))

if __name__ == "__main__":
    main()
