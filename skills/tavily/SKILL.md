---
name: tavily
description: AI-powered web search, extraction, and research. Use when user wants to search the web, extract content from URLs, crawl websites, or do deep research on a topic.
version: 1.0.0
---

# Tavily

AI-powered web search and data extraction API for LLM/Agent applications.

## Capabilities

- **Search** - Real-time web search with structured results
- **Extract** - Extract content from specific URLs
- **Crawl** - Crawl entire websites with custom instructions
- **Map** - List all pages on a website
- **Research** - Deep research with multi-source synthesis

## Requirements

- Tavily API key (get from https://tavily.com)
- Python with tavily package: `pip install tavily`

## Usage

### Basic Search
```
Search for [topic]
Find [something] news
Web search [question]
```

### Extract Content
```
Extract content from [URL]
Get the main content of [website]
```

### Crawl Website
```
Crawl [URL]
Find all pages on [website]
```

### Deep Research
```
Research [topic]
Deep dive on [subject]
Comprehensive analysis of [topic]
```

## Setup

1. Get API key from https://tavily.com
2. Set environment variable: `export TAVILY_API_KEY="tvly-xxx"`
3. Install: `pip install tavily`

## Example Output

Search returns structured results with:
- Title
- URL
- Content snippet
- Score

Research returns comprehensive report with:
- Key findings
- Sources
- Follow-up questions
