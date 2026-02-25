export interface Skill {
  id: string
  name: string
  description: string
  emoji?: string
  category: string
}

export const skills: Skill[] = [
  { id: '1password', name: '1password', description: 'Set up and use 1Password CLI (op). Use when installing the CLI, enabling desktop app integration, signing in (single or multi-account), or reading/injecting/running secrets via op.', category: 'Development' },
  { id: 'apple-notes', name: 'apple-notes', description: 'Manage Apple Notes via the `memo` CLI on macOS (create, view, edit, delete, search, move, and export notes). Use when a user asks OpenClaw to add a note, list notes, search notes, or manage note folders.', category: 'Productivity' },
  { id: 'apple-reminders', name: 'apple-reminders', description: 'Manage Apple Reminders via remindctl CLI (list, add, edit, complete, delete). Supports lists, date filters, and JSON/plain output.', category: 'Productivity' },
  { id: 'bear-notes', name: 'bear-notes', description: 'Create, search, and manage Bear notes via grizzly CLI.', category: 'Productivity' },
  { id: 'blogwatcher', name: 'blogwatcher', description: 'Monitor blogs and RSS/Atom feeds for updates using the blogwatcher CLI.', category: 'Development' },
  { id: 'blucli', name: 'blucli', description: 'BluOS CLI (blu) for discovery, playback, grouping, and volume.', category: 'Development' },
  { id: 'bluebubbles', name: 'bluebubbles', description: 'Use when you need to send or manage iMessages via BlueBubbles (recommended iMessage integration). Calls go through the generic message tool with channel="bluebubbles".', category: 'Communication' },
  { id: 'camsnap', name: 'camsnap', description: 'Capture frames or clips from RTSP/ONVIF cameras.', category: 'Development' },
  { id: 'canvas', name: 'canvas', description: 'Skill: canvas', category: 'Development' },
  { id: 'clawhub', name: 'clawhub', description: 'Use the ClawHub CLI to search, install, update, and publish agent skills from clawhub.com. Use when you need to fetch new skills on the fly, sync installed skills to latest or a specific version, or publish new/updated skill folders with the npm-installed clawhub CLI.', category: 'Development' },
  { id: 'coding-agent', name: 'coding-agent', description: '"Delegate coding tasks to Codex, Claude Code, or Pi agents via background process. Use when: (1) building/creating new features or apps, (2) reviewing PRs (spawn in temp dir), (3) refactoring large codebases, (4) iterative coding that needs file exploration. NOT for: simple one-liner fixes (just edit), reading code (use read tool), or any work in ~/clawd workspace (never spawn agents here). Requires a bash tool that supports pty:true."', category: 'Productivity' },
  { id: 'discord', name: 'discord', description: '"Discord ops via the message tool (channel=discord)."', category: 'Communication' },
  { id: 'eightctl', name: 'eightctl', description: 'Control Eight Sleep pods (status, temperature, alarms, schedules).', category: 'Development' },
  { id: 'gemini', name: 'gemini', description: 'Gemini CLI for one-shot Q&A, summaries, and generation.', category: 'Development' },
  { id: 'gh-issues', name: 'gh-issues', description: '"Fetch GitHub issues, spawn sub-agents to implement fixes and open PRs, then monitor and address PR review comments. Usage: /gh-issues [owner/repo] [--label bug] [--limit 5] [--milestone v1.0] [--assignee @me] [--fork user/repo] [--watch] [--interval 5] [--reviews-only] [--cron] [--dry-run] [--model glm-5] [--notify-channel -1002381931352]"', category: 'Development' },
  { id: 'gifgrep', name: 'gifgrep', description: 'Search GIF providers with CLI/TUI, download results, and extract stills/sheets.', category: 'Development' },
  { id: 'github', name: 'github', description: '"GitHub operations via `gh` CLI: issues, PRs, CI runs, code review, API queries. Use when: (1) checking PR status or CI, (2) creating/commenting on issues, (3) listing/filtering PRs or issues, (4) viewing run logs. NOT for: complex web UI interactions requiring manual browser flows (use browser tooling when available), bulk operations across many repos (script with gh api), or when gh auth is not configured."', category: 'Development' },
  { id: 'gog', name: 'gog', description: 'Google Workspace CLI for Gmail, Calendar, Drive, Contacts, Sheets, and Docs.', category: 'Development' },
  { id: 'goplaces', name: 'goplaces', description: 'Query Google Places API (New) via the goplaces CLI for text search, place details, resolve, and reviews. Use for human-friendly place lookup or JSON output for scripts.', category: 'Development' },
  { id: 'healthcheck', name: 'healthcheck', description: 'Host security hardening and risk-tolerance configuration for OpenClaw deployments. Use when a user asks for security audits, firewall/SSH/update hardening, risk posture, exposure review, OpenClaw cron scheduling for periodic checks, or version status checks on a machine running OpenClaw (laptop, workstation, Pi, VPS).', category: 'Lifestyle' },
  { id: 'himalaya', name: 'himalaya', description: '"CLI to manage emails via IMAP/SMTP. Use `himalaya` to list, read, write, reply, forward, search, and organize emails from the terminal. Supports multiple accounts and message composition with MML (MIME Meta Language)."', category: 'Communication' },
  { id: 'imsg', name: 'imsg', description: 'iMessage/SMS CLI for listing chats, history, and sending messages via Messages.app.', category: 'Communication' },
  { id: 'mcporter', name: 'mcporter', description: 'Use the mcporter CLI to list, configure, auth, and call MCP servers/tools directly (HTTP or stdio), including ad-hoc servers, config edits, and CLI/type generation.', category: 'Productivity' },
  { id: 'model-usage', name: 'model-usage', description: 'Use CodexBar CLI local cost usage to summarize per-model usage for Codex or Claude, including the current (most recent) model or a full model breakdown. Trigger when asked for model-level usage/cost data from codexbar, or when you need a scriptable per-model summary from codexbar cost JSON.', category: 'Development' },
  { id: 'nano-banana-pro', name: 'nano-banana-pro', description: 'Generate or edit images via Gemini 3 Pro Image (Nano Banana Pro).', category: 'Productivity' },
  { id: 'nano-pdf', name: 'nano-pdf', description: 'Edit PDFs with natural-language instructions using the nano-pdf CLI.', category: 'Productivity' },
  { id: 'notion', name: 'notion', description: 'Notion API for creating and managing pages, databases, and blocks.', category: 'Development' },
  { id: 'obsidian', name: 'obsidian', description: 'Work with Obsidian vaults (plain Markdown notes) and automate via obsidian-cli.', category: 'Productivity' },
  { id: 'openai-image-gen', name: 'openai-image-gen', description: 'Batch-generate images via OpenAI Images API. Random prompt sampler + `index.html` gallery.', category: 'Media' },
  { id: 'openai-whisper-api', name: 'openai-whisper-api', description: 'Transcribe audio via OpenAI Audio Transcriptions API (Whisper).', category: 'Media' },
  { id: 'openai-whisper', name: 'openai-whisper', description: 'Local speech-to-text with the Whisper CLI (no API key).', category: 'Development' },
  { id: 'openhue', name: 'openhue', description: 'Control Philips Hue lights and scenes via the OpenHue CLI.', category: 'Development' },
  { id: 'oracle', name: 'oracle', description: 'Best practices for using the oracle CLI (prompt + file bundling, engines, sessions, and file attachment patterns).', category: 'Development' },
  { id: 'ordercli', name: 'ordercli', description: 'Foodora-only CLI for checking past orders and active order status (Deliveroo WIP).', category: 'Development' },
  { id: 'peekaboo', name: 'peekaboo', description: 'Capture and automate macOS UI with the Peekaboo CLI.', category: 'Development' },
  { id: 'sag', name: 'sag', description: 'ElevenLabs text-to-speech with mac-style say UX.', category: 'Media' },
  { id: 'session-logs', name: 'session-logs', description: 'Search and analyze your own session logs (older/parent conversations) using jq.', category: 'Development' },
  { id: 'sherpa-onnx-tts', name: 'sherpa-onnx-tts', description: 'Local text-to-speech via sherpa-onnx (offline, no cloud)', category: 'Media' },
  { id: 'skill-creator', name: 'skill-creator', description: 'Create or update AgentSkills. Use when designing, structuring, or packaging skills with scripts, references, and assets.', category: 'Development' },
  { id: 'slack', name: 'slack', description: 'Use when you need to control Slack from OpenClaw via the slack tool, including reacting to messages or pinning/unpinning items in Slack channels or DMs.', category: 'Communication' },
  { id: 'songsee', name: 'songsee', description: 'Generate spectrograms and feature-panel visualizations from audio with the songsee CLI.', category: 'Development' },
  { id: 'sonoscli', name: 'sonoscli', description: 'Control Sonos speakers (discover/status/play/volume/group).', category: 'Development' },
  { id: 'spotify-player', name: 'spotify-player', description: 'Terminal Spotify playback/search via spogo (preferred) or spotify_player.', category: 'Media' },
  { id: 'summarize', name: 'summarize', description: 'Summarize or extract text/transcripts from URLs, podcasts, and local files (great fallback for “transcribe this YouTube/video”).', category: 'Media' },
  { id: 'things-mac', name: 'things-mac', description: 'Manage Things 3 via the `things` CLI on macOS (add/update projects+todos via URL scheme; read/search/list from the local Things database). Use when a user asks OpenClaw to add a task to Things, list inbox/today/upcoming, search tasks, or inspect projects/areas/tags.', category: 'Development' },
  { id: 'tmux', name: 'tmux', description: 'Remote-control tmux sessions for interactive CLIs by sending keystrokes and scraping pane output.', category: 'Development' },
  { id: 'trello', name: 'trello', description: 'Manage Trello boards, lists, and cards via the Trello REST API.', category: 'Productivity' },
  { id: 'video-frames', name: 'video-frames', description: 'Extract frames or short clips from videos using ffmpeg.', category: 'Development' },
  { id: 'voice-call', name: 'voice-call', description: 'Start voice calls via the OpenClaw voice-call plugin.', category: 'Communication' },
  { id: 'wacli', name: 'wacli', description: 'Send WhatsApp messages to other people or search/sync WhatsApp history via the wacli CLI (not for normal user chats).', category: 'Communication' },
  { id: 'weather', name: 'weather', description: '"Get current weather and forecasts via wttr.in or Open-Meteo. Use when: user asks about weather, temperature, or forecasts for any location. NOT for: historical weather data, severe weather alerts, or detailed meteorological analysis. No API key needed."', category: 'Lifestyle' },
  { id: 'xurl', name: 'xurl', description: 'A CLI tool for making authenticated requests to the X (Twitter) API. Use this skill when you need to post tweets, reply, quote, search, read posts, manage followers, send DMs, upload media, or interact with any X API v2 endpoint.', category: 'Development' }
]

export const categories = [
  "Communication",
  "Development",
  "Lifestyle",
  "Media",
  "Productivity"
]
