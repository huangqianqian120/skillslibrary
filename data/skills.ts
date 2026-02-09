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
  { id: 'apple-reminders', name: 'apple-reminders', description: 'Manage Apple Reminders via the `remindctl` CLI on macOS (list, add, edit, complete, delete). Supports lists, date filters, and JSON/plain output.', category: 'Productivity' },
  { id: 'bear-notes', name: 'bear-notes', description: 'Create, search, and manage Bear notes via grizzly CLI.', category: 'Productivity' },
  { id: 'blogwatcher', name: 'blogwatcher', description: 'Monitor blogs and RSS/Atom feeds for updates using the blogwatcher CLI.', category: 'Development' },
  { id: 'blucli', name: 'blucli', description: 'BluOS CLI (blu) for discovery, playback, grouping, and volume.', category: 'Development' },
  { id: 'bluebubbles', name: 'bluebubbles', description: 'Use when you need to send or manage iMessages via BlueBubbles (recommended iMessage integration). Calls go through the generic message tool with channel="bluebubbles".', category: 'Communication' },
  { id: 'camsnap', name: 'camsnap', description: 'Capture frames or clips from RTSP/ONVIF cameras.', category: 'Development' },
  { id: 'canvas', name: 'canvas', description: 'Skill: canvas', category: 'Development' },
  { id: 'clawhub', name: 'clawhub', description: 'Use the ClawHub CLI to search, install, update, and publish agent skills from clawhub.com. Use when you need to fetch new skills on the fly, sync installed skills to latest or a specific version, or publish new/updated skill folders with the npm-installed clawhub CLI.', category: 'Development' },
  { id: 'coding-agent', name: 'coding-agent', description: 'Run Codex CLI, Claude Code, OpenCode, or Pi Coding Agent via background process for programmatic control.', category: 'Development' },
  { id: 'discord', name: 'discord', description: 'Use when you need to control Discord from OpenClaw via the discord tool: send messages, react, post or upload stickers, upload emojis, run polls, manage threads/pins/search, create/edit/delete channels and categories, fetch permissions or member/role/channel info, set bot presence/activity, or handle moderation actions in Discord DMs or channels.', category: 'Productivity' },
  { id: 'eightctl', name: 'eightctl', description: 'Control Eight Sleep pods (status, temperature, alarms, schedules).', category: 'Development' },
  { id: 'food-order', name: 'food-order', description: 'Reorder Foodora orders + track ETA/status with ordercli. Never confirm without explicit user approval. Triggers: order food, reorder, track ETA.', category: 'Development' },
  { id: 'gemini', name: 'gemini', description: 'Gemini CLI for one-shot Q&A, summaries, and generation.', category: 'Development' },
  { id: 'gifgrep', name: 'gifgrep', description: 'Search GIF providers with CLI/TUI, download results, and extract stills/sheets.', category: 'Development' },
  { id: 'github', name: 'github', description: '"Interact with GitHub using the `gh` CLI. Use `gh issue`, `gh pr`, `gh run`, and `gh api` for issues, PRs, CI runs, and advanced queries."', category: 'Development' },
  { id: 'gog', name: 'gog', description: 'Google Workspace CLI for Gmail, Calendar, Drive, Contacts, Sheets, and Docs.', category: 'Development' },
  { id: 'goplaces', name: 'goplaces', description: 'Query Google Places API (New) via the goplaces CLI for text search, place details, resolve, and reviews. Use for human-friendly place lookup or JSON output for scripts.', category: 'Development' },
  { id: 'healthcheck', name: 'healthcheck', description: 'Host security hardening and risk-tolerance configuration for OpenClaw deployments. Use when a user asks for security audits, firewall/SSH/update hardening, risk posture, exposure review, OpenClaw cron scheduling for periodic checks, or version status checks on a machine running OpenClaw (laptop, workstation, Pi, VPS).', category: 'Lifestyle' },
  { id: 'himalaya', name: 'himalaya', description: '"CLI to manage emails via IMAP/SMTP. Use `himalaya` to list, read, write, reply, forward, search, and organize emails from the terminal. Supports multiple accounts and message composition with MML (MIME Meta Language)."', category: 'Communication' },
  { id: 'imsg', name: 'imsg', description: 'iMessage/SMS CLI for listing chats, history, watch, and sending.', category: 'Communication' },
  { id: 'local-places', name: 'local-places', description: 'Search for places (restaurants, cafes, etc.) via Google Places API proxy on localhost.', category: 'Lifestyle' },
  { id: 'mcporter', name: 'mcporter', description: 'Use the mcporter CLI to list, configure, auth, and call MCP servers/tools directly (HTTP or stdio), including ad-hoc servers, config edits, and CLI/type generation.', category: 'Productivity' },
  { id: 'model-usage', name: 'model-usage', description: 'Use CodexBar CLI local cost usage to summarize per-model usage for Codex or Claude, including the current (most recent) model or a full model breakdown. Trigger when asked for model-level usage/cost data from codexbar, or when you need a scriptable per-model summary from codexbar cost JSON.', category: 'Development' },
  { id: 'nano-banana-pro', name: 'nano-banana-pro', description: 'Generate or edit images via Gemini 3 Pro Image (Nano Banana Pro).', category: 'Productivity' },
  { id: 'nano-pdf', name: 'nano-pdf', description: 'Edit PDFs with natural-language instructions using the nano-pdf CLI.', category: 'Productivity' },
  { id: 'notion', name: 'notion', description: 'Notion API for creating and managing pages, databases, and blocks.', category: 'Development' },
  { id: 'obsidian', name: 'obsidian', description: 'Work with Obsidian vaults (plain Markdown notes) and automate via obsidian-cli.', category: 'Productivity' },
  { id: 'openai-image-gen', name: 'openai-image-gen', description: 'Batch-generate images via OpenAI Images API. Random prompt sampler + `index.html` gallery.', category: 'Media' },
  { id: 'openai-whisper-api', name: 'openai-whisper-api', description: 'Transcribe audio via OpenAI Audio Transcriptions API (Whisper).', category: 'Media' },
  { id: 'openai-whisper', name: 'openai-whisper', description: 'Local speech-to-text with the Whisper CLI (no API key).', category: 'Development' },
  { id: 'openhue', name: 'openhue', description: 'Control Philips Hue lights/scenes via the OpenHue CLI.', category: 'Development' },
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
  { id: 'weather', name: 'weather', description: 'Get current weather and forecasts (no API key required).', category: 'Lifestyle' },
  { id: 'bmap-jsapi-gl', name: 'bmap-jsapi-gl', description: '百度地图 JSAPI WebGL (BMapGL) 开发指南：地图初始化、覆盖物、事件、图层、路径规划、地理编码等。适用于2D/2.5D地图开发。', category: 'Development' },
  { id: 'bmap-jsapi-three', name: 'bmap-jsapi-three', description: '百度地图 JSAPI Three (MapVThree)：基于three.js的二三维一体化地图可视化库，支持3D模型加载、地理数据可视化、测量编辑、环境渲染等。', category: 'Development' },
  { id: 'jsapi-ui-kit', name: 'jsapi-ui-kit', description: '百度地图轻量级UI组件库 (@baidumap/jsapi-ui-kit)，提供 PlaceSearch（地点搜索）和 PlaceDetail（POI详情展示）组件。', category: 'Development' }
]

export const categories = [
  "Communication",
  "Development",
  "Lifestyle",
  "Media",
  "Productivity"
]
