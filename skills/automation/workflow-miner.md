---
name: workflow-miner
description: Mine workflows from descriptions and generate ready-to-use skills

---

# Workflow Miner

Automatically analyze workflows and generate executable skills.

## Description

Transform any workflow description into a ready-to-use skill. The skill defines:
- Workflow steps
- Input/output formats
- Error handling
- Integration points

## How It Works

### Step 1: Define the Workflow

Provide a workflow description in natural language:

```
我需要一个每天早上自动看新闻的工作流：
1. 抓取科技新闻
2. 过滤重要内容
3. 汇总成简报
4. 发送到邮箱
```

### Step 2: Generate Skill

The miner creates a skill like:

```yaml
---
name: daily-news-briefing
description: Daily AI news briefing workflow
---

# Daily News Briefing

## Workflow

1. Fetch news from sources
2. Filter by keywords
3. Summarize top stories
4. Format as email
5. Send to inbox

## Usage

\`\`\`bash
skills run daily-news-briefing
\`\`\`
```

## Features

- **Natural Language → Skill** - Describe in plain text
- **Auto-categorize** - Assign to appropriate category
- **Template Generation** - Create reusable skill structure
- **Integration Points** - Add tool hooks automatically

## Output Format

Generated skills include:

| Section | Description |
|---------|-------------|
| name | Skill identifier |
| description | What it does |
| steps | Ordered workflow steps |
| inputs | Required inputs |
| outputs | Expected outputs |
| tools | Required tools/APIs |
| error-handling | Failure scenarios |

## Example

### Input
```
创建一个 GitHub 监控工作流：
- 监控指定仓库的 issue
- 有新 issue 时发送到 Slack
- 每天汇总发到邮箱
```

### Output
Skill file: `skills/automation/github-monitor.md`

```yaml
---
name: github-monitor
description: Monitor GitHub issues and send notifications

---

# GitHub Monitor

## Workflow

1. Fetch issues from GitHub API
2. Filter by criteria
3. Format notification
4. Send to Slack
5. Daily summary to email

## Tools Required

- GitHub API
- Slack Webhook
- Email service

## Error Handling

- Rate limit: Retry with backoff
- API failure: Log and skip
- No issues: Send "All quiet" message
```

## Best Practices

1. **Be specific** - Include exact steps
2. **Define triggers** - When should it run?
3. **Specify outputs** - Where should results go?
4. **Handle errors** - What if something fails?

## Prompt Template

Use this to generate workflows:

\`\`\`
Create a skill for [describe your workflow]:
- Trigger: [when it starts]
- Steps: [1, 2, 3...]
- Outputs: [where results go]
- Tools: [what it needs]
\`\`\`
