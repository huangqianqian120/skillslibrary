export interface Skill {
  id: string
  name: string
  description: string
  emoji?: string
  category: string
}

export const skills: Skill[] = [
  { id: '1password', name: '1password', category: 'Productivity', description: 'Set up and use 1Password CLI (op). Use when installing the CLI, enabling desktop app integration, signing in (single or multi-account), or reading/injecting/running secrets via op.' },
  { id: 'apple-notes', name: 'apple-notes', category: 'Productivity', description: 'Manage Apple Notes via the `memo` CLI on macOS (create, view, edit, delete, search, move, and export notes).' },
  { id: 'apple-reminders', name: 'apple-reminders', category: 'Productivity', description: 'Manage Apple Reminders via the `remindctl` CLI on macOS (list, add, edit, complete, delete).' },
  { id: 'bear-notes', name: 'bear-notes', category: 'Productivity', description: 'Create, search, and manage Bear notes via grizzly CLI.' },
  { id: 'bird', name: 'bird', category: 'Social', description: 'X/Twitter CLI for reading, searching, posting, and engagement via cookies.' },
  { id: 'blogwatcher', name: 'blogwatcher', category: 'Monitoring', description: 'Monitor blogs and RSS/Atom feeds for updates using the blogwatcher CLI.' },
  { id: 'blucli', name: 'blucli', category: 'Media', description: 'BluOS CLI (blu) for discovery, playback, grouping, and volume.' },
  { id: 'bluebubbles', name: 'bluebubbles', category: 'Integration', description: 'Build or update the BlueBubbles external channel plugin for OpenClaw.' },
  { id: 'camsnap', name: 'camsnap', category: 'Hardware', description: 'Capture frames or clips from RTSP/ONVIF cameras.' },
  { id: 'canvas', name: 'canvas', category: 'Visualization', description: 'Control node canvases for presentation and visualization.' },
  { id: 'clawdhub', name: 'clawdhub', category: 'Development', description: 'Use the ClawdHub CLI to search, install, update, and publish agent skills from clawdhub.com.' },
  { id: 'coding-agent', name: 'coding-agent', category: 'Development', description: 'Run Codex CLI, Claude Code, OpenCode, or Pi Coding Agent via background process.' },
  { id: 'discord', name: 'discord', category: 'Social', description: 'Control Discord: send messages, react, upload stickers, manage threads, channels, and moderation.' },
  { id: 'eightctl', name: 'eightctl', category: 'Hardware', description: 'Control Eight Sleep pods (status, temperature, alarms, schedules).' },
  { id: 'food-order', name: 'food-order', category: 'Lifestyle', description: 'Reorder Foodora orders + track ETA/status with ordercli.' },
  { id: 'gemini', name: 'gemini', category: 'AI', description: 'Gemini CLI for one-shot Q&A, summaries, and generation.' },
  { id: 'gifgrep', name: 'gifgrep', category: 'Media', description: 'Search GIF providers with CLI/TUI, download results, and extract stills/sheets.' },
  { id: 'github', name: 'github', category: 'Development', description: 'Interact with GitHub using the `gh` CLI for issues, PRs, CI runs, and advanced queries.' },
  { id: 'gog', name: 'gog', category: 'Productivity', description: 'Google Workspace CLI for Gmail, Calendar, Drive, Contacts, Sheets, and Docs.' },
  { id: 'goplaces', name: 'goplaces', category: 'Lifestyle', description: 'Query Google Places API (New) via the goplaces CLI for text search, place details, and reviews.' },
  { id: 'himalaya', name: 'himalaya', category: 'Productivity', description: 'CLI to manage emails via IMAP/SMTP. List, read, write, reply, forward, search, and organize emails.' },
  { id: 'imsg', name: 'imsg', category: 'Communication', description: 'iMessage/SMS CLI for listing chats, history, watch, and sending.' },
  { id: 'local-places', name: 'local-places', category: 'Lifestyle', description: 'Search for places (restaurants, cafes, etc.) via Google Places API proxy on localhost.' },
  { id: 'mcporter', name: 'mcporter', category: 'Development', description: 'Use the mcporter CLI to list, configure, auth, and call MCP servers/tools directly.' },
  { id: 'model-usage', name: 'model-usage', category: 'Development', description: 'Use CodexBar CLI local cost usage to summarize per-model usage for Codex or Claude.' },
  { id: 'nano-banana-pro', name: 'nano-banana-pro', category: 'AI', description: 'Generate or edit images via Gemini 3 Pro Image (Nano Banana Pro).' },
  { id: 'nano-pdf', name: 'nano-pdf', category: 'Productivity', description: 'Edit PDFs with natural-language instructions using the nano-pdf CLI.' },
  { id: 'notion', name: 'notion', category: 'Productivity', description: 'Notion API for creating and managing pages, databases, and blocks.' },
  { id: 'obsidian', name: 'obsidian', category: 'Productivity', description: 'Work with Obsidian vaults (plain Markdown notes) and automate via obsidian-cli.' },
  { id: 'openai-image-gen', name: 'openai-image-gen', category: 'AI', description: 'Batch-generate images via OpenAI Images API with random prompt sampler + gallery.' },
  { id: 'openai-whisper-api', name: 'openai-whisper-api', category: 'AI', description: 'Transcribe audio via OpenAI Audio Transcriptions API (Whisper).' },
  { id: 'openai-whisper', name: 'openai-whisper', category: 'AI', description: 'Local speech-to-text with the Whisper CLI (no API key).' },
  { id: 'openhue', name: 'openhue', category: 'Hardware', description: 'Control Philips Hue lights/scenes via the OpenHue CLI.' },
  { id: 'oracle', name: 'oracle', category: 'Development', description: 'Best practices for using the oracle CLI (prompt + file bundling, engines, sessions, and file attachment patterns).' },
  { id: 'ordercli', name: 'ordercli', category: 'Lifestyle', description: 'Foodora-only CLI for checking past orders and active order status.' },
  { id: 'peekaboo', name: 'peekaboo', category: 'Hardware', description: 'Capture and automate macOS UI with the Peekaboo CLI.' },
  { id: 'sag', name: 'sag', category: 'Audio', description: 'ElevenLabs text-to-speech with mac-style say UX.' },
  { id: 'session-logs', name: 'session-logs', category: 'Development', description: 'Search and analyze your own session logs using jq.' },
  { id: 'sherpa-onnx-tts', name: 'sherpa-onnx-tts', category: 'Audio', description: 'Local text-to-speech via sherpa-onnx (offline, no cloud).' },
  { id: 'skill-creator', name: 'skill-creator', category: 'Development', description: 'Create or update AgentSkills. Use when designing, structuring, or packaging skills with scripts, references, and assets.' },
  { id: 'slack', name: 'slack', category: 'Social', description: 'Control Slack: send messages, react, pin/unpin items in channels or DMs.' },
  { id: 'songsee', name: 'songsee', category: 'Media', description: 'Generate spectrograms and feature-panel visualizations from audio with the songsee CLI.' },
  { id: 'sonoscli', name: 'sonoscli', category: 'Media', description: 'Control Sonos speakers (discover/status/play/volume/group).' },
  { id: 'spotify-player', name: 'spotify-player', category: 'Media', description: 'Terminal Spotify playback/search via spogo (preferred) or spotify_player.' },
  { id: 'summarize', name: 'summarize', category: 'AI', description: 'Summarize or extract text/transcripts from URLs, podcasts, and local files.' },
  { id: 'things-mac', name: 'things-mac', category: 'Productivity', description: 'Manage Things 3 via the `things` CLI on macOS (add/update projects+todos, list, search).' },
  { id: 'tmux', name: 'tmux', category: 'Development', description: 'Remote-control tmux sessions for interactive CLIs by sending keystrokes and scraping pane output.' },
  { id: 'trello', name: 'trello', category: 'Productivity', description: 'Manage Trello boards, lists, and cards via the Trello REST API.' },
  { id: 'video-frames', name: 'video-frames', category: 'Media', description: 'Extract frames or short clips from videos using ffmpeg.' },
  { id: 'voice-call', name: 'voice-call', category: 'Communication', description: 'Start voice calls via the OpenClaw voice-call plugin.' },
  { id: 'wacli', name: 'wacli', category: 'Communication', description: 'Send WhatsApp messages or search/sync WhatsApp history via the wacli CLI.' },
  { id: 'weather', name: 'weather', category: 'Lifestyle', description: 'Get current weather and forecasts (no API key required).' },
]

export const categories = [...new Set(skills.map(s => s.category))].sort()
