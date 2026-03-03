---
name: skills-library
version: 1.0.0
description: Browse and sync OpenClaw agent skills. Use when user wants to view available skills, explore skill details, or sync from the OpenClaw GitHub repository.
---

# Skills Library

You help users explore and manage OpenClaw agent skills.

## Capabilities

- **Browse skills** - View all available skills organized by category
- **Skill details** - Show skill descriptions, usage patterns, and metadata
- **Sync from GitHub** - Run the sync script to fetch latest skills from OpenClaw repository
- **Scene-based browsing** - Filter skills by use case (Developer, Writer, Organizer, etc.)
- **Create personal skills** - Chat-based wizard for creating private skills (requires login)

## Quick Access

- **Local**: http://localhost:3000
- **Production**: skillslibrary.fun

## For Beginners: Create Your First Skill

If a user wants to create a skill but doesn't know how, guide them through this workflow:

### Step A: Login Required
- User must be logged in to create skills
- Click "登录后创建" button in sidebar to authenticate
- Redirects to sign-in if not authenticated

### Step B: Chat-based Requirements
- Natural language chat interface
- User describes their needs in plain language
- AI analyzes and asks follow-up questions if needed
- Example: "每天监控竞品价格，降价时发送通知"
- AI checks if information is complete:
  - If incomplete: asks for more details (trigger, action, target)
  - If complete: proceeds to generation

### Step C: AI Generation
- Generates SKILL.md based on conversation
- User can review and edit the generated content
- Sets skill name automatically from description

### Step D: Personal Storage
- Skill is saved to user's personal list
- NOT added to public skills library
- Only visible on user's private dashboard

### Step E: Usage
- User can view and manage their personal skills
- Skills work like regular OpenClaw skills
- Can be triggered and used normally

## Usage

### When user wants to browse skills
Direct them to: `http://localhost:3000` (local development) or `skillslibrary.fun`

### When user wants to sync latest skills
Run: `cd ~/Desktop/skills-library && npm run build` (this runs sync-skills.js before build)

### When user asks about specific skill
Check `data/skills.ts` for skill details or visit `/skill/[skill-id]` page

### When user wants to create a skill
Direct them to: http://localhost:3000/create

### Scene presets
- 💻 Developer - github, coding-agent, tmux, session-logs, model-usage, oracle, skill-creator
- ✍️ Writer - apple-notes, bear-notes, obsidian, summarize
- 📋 Organizer - things-mac, apple-reminders, trello, notion, apple-notes
- 💬 Communicator - discord, slack, wacli, imsg, bird
- 🎨 Media Creator - openai-image-gen, nano-pdf, video-frames, sag, openai-whisper
- 👀 Monitor - blogwatcher, weather, goplaces

## Categories

Skills are organized into:
- **Communication** - Messaging and chat platforms
- **Development** - Coding and dev tools
- **Lifestyle** - Everyday life tools
- **Media** - Content creation and processing
- **Productivity** - Task and project management

## Project Structure

```
skills-library/
├── app/
│   ├── create/           # 🎯 Create skill wizard (A/B/C/D/E workflow)
│   │   ├── Login required
│   │   ├── Chat interface for requirements
│   │   ├── AI-powered generation
│   │   └── Personal storage
│   ├── skill/[id]/       # Individual skill detail pages
│   ├── api/              # API routes
│   ├── login/            # Authentication
│   └── page.tsx          # Main skills browser
├── scripts/
│   └── sync-skills.js    # GitHub sync script
├── data/
│   └── skills.ts         # Synced public skills data
└── components/           # React components
```

## Create Skill Wizard Flow

```
用户需求 → Step A: 登录 → Step B: 对话采集 → Step C: AI 生成 → Step D: 个人存储 → Step E: 使用
```

### Step A: Authentication
- Required before creating skills
- Uses NextAuth for authentication
- Prompts login if not authenticated

### Step B: Chat-based Requirements
**UI**: http://localhost:3000/create
- Natural language conversation
- AI asks follow-up questions:
  - What should the skill do?
  - When should it trigger?
  - What platforms/data sources are involved?
- Iterates until information is complete

### Step C: AI Generation
- Generates YAML frontmatter and SKILL.md body
- Based on complete conversation
- User can edit before saving

### Step D: Personal Storage
- Skill saved to user's private collection
- NOT added to public skills.ts
- Only visible to the creator

### Step E: Usage
- Created skill works like any other OpenClaw skill
- Can be triggered via normal means
- Managed from user's personal dashboard

## Related Skills

- **skill-creator** - Manual skill creation with full control (for advanced users)
- **github** - Manage GitHub operations
