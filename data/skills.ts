export interface Skill {
  id: string
  name: string
  description: string
  emoji?: string
  category: string
}

export const skills: Skill[] = [
  { id: '1password', name: '1password', description: '通过 1Password CLI (op) 进行设置和使用。适用于安装 CLI、启用桌面应用集成、登录（单账户或多账户）或通过 op 读取/注入/运行密钥。', category: 'Development' },
  { id: 'apple-notes', name: 'apple-notes', description: '在 macOS 上通过 `memo` CLI 管理 Apple 备忘录（创建、查看、编辑、删除、搜索、移动和导出）。当用户要求添加备忘录、列出备忘录、搜索备忘录或管理备忘录文件夹时使用。', category: 'Productivity' },
  { id: 'apple-reminders', name: 'apple-reminders', description: '在 macOS 上通过 `remindctl` CLI 管理 Apple 提醒事项（列出、添加、编辑、完成、删除）。支持列表、日期过滤和 JSON/纯文本输出。', category: 'Productivity' },
  { id: 'bear-notes', name: 'bear-notes', description: '通过 grizzly CLI 创建、搜索和管理 Bear 备忘录。', category: 'Productivity' },
  { id: 'blogwatcher', name: 'blogwatcher', description: '使用 blogwatcher CLI 监控博客和 RSS/Atom 订阅的更新。', category: 'Development' },
  { id: 'blucli', name: 'blucli', description: 'BluOS CLI (blu)，用于发现、播放、分组和音量控制。', category: 'Development' },
  { id: 'bluebubbles', name: 'bluebubbles', description: '当需要通过 BlueBubbles 发送或管理 iMessage 时使用（推荐 iMessage 集成）。调用通过通用消息工具执行，channel="bluebubbles"。', category: 'Communication' },
  { id: 'camsnap', name: 'camsnap', description: '从 RTSP/ONVIF 摄像头捕获帧或片段。', category: 'Development' },
  { id: 'canvas', name: 'canvas', description: '画布技能：控制节点画布（呈现/隐藏/导航/评估/快照/A2UI）。', category: 'Development' },
  { id: 'clawhub', name: 'clawhub', description: '使用 ClawHub CLI 从 clawhub.com 搜索、安装、更新和发布代理技能。当需要即时获取新技能、同步已安装技能到最新或特定版本，或使用 npm 安装的 clawhub CLI 发布新的/更新的技能文件夹时使用。', category: 'Development' },
  { id: 'coding-agent', name: 'coding-agent', description: '通过后台进程运行 Codex CLI、Claude Code、OpenCode 或 Pi Coding Agent，以实现程序化控制。', category: 'Development' },
  { id: 'discord', name: 'discord', description: '当需要通过 discord 工具从 OpenClaw 控制 Discord 时使用：发送消息、反应、发布或上传表情包、上传表情包、运行投票、管理线程/固定/搜索、创建/编辑/删除频道和分类、获取权限或成员/频道信息、设置机器人在线状态/活动，或处理 Discord DM 或频道中的审核操作。', category: 'Productivity' },
  { id: 'eightctl', name: 'eightctl', description: '控制 Eight Sleep  pods（状态、温度、闹钟、计划）。', category: 'Development' },
  { id: 'food-order', name: 'food-order', description: '通过 ordercli 重新订购 Foodora 订单并跟踪 ETA/状态。绝不在未经用户明确批准的情况下确认。触发词：订餐、重新订购、跟踪 ETA。', category: 'Development' },
  { id: 'gemini', name: 'gemini', description: 'Gemini CLI，用于一次性问答、总结和生成。', category: 'Development' },
  { id: 'gifgrep', name: 'gifgrep', description: '通过 CLI/TUI 搜索 GIF 提供商，下载结果，并提取静态帧或图片表。', category: 'Development' },
  { id: 'github', name: 'github', description: '使用 `gh` CLI 与 GitHub 交互。使用 `gh issue`、`gh pr`、`gh run` 和 `gh api` 处理问题、PR、CI 运行和高级查询。', category: 'Development' },
  { id: 'gog', name: 'gog', description: 'Google Workspace CLI，用于 Gmail、日历、云端硬盘、联系人、表格和文档。', category: 'Development' },
  { id: 'goplaces', name: 'goplaces', description: '通过 goplaces CLI 查询 Google Places API (New)，用于文本搜索、地点详情、解析和评论。用于人类友好的地点查找或脚本的 JSON 输出。', category: 'Development' },
  { id: 'healthcheck', name: 'healthcheck', description: 'OpenClaw 部署的主机安全加固和风险容忍配置。当用户要求进行安全审计、防火墙/SSH/更新加固、风险态势、暴露审查、OpenClaw cron 定时任务或检查运行 OpenClaw 的机器（笔记本电脑、工作站、Pi、VPS）上的版本状态时使用。', category: 'Lifestyle' },
  { id: 'himalaya', name: 'himalaya', description: '通过 IMAP/SMTP 管理电子邮件的 CLI。使用 `himalaya` 列出、阅读、写作、回复、转发、搜索和组织终端中的电子邮件。支持多个账户和 MML（MIME 元语言）消息撰写。', category: 'Communication' },
  { id: 'imsg', name: 'imsg', description: 'iMessage/SMS CLI，用于列出聊天记录、历史记录、监控和发送消息。', category: 'Communication' },
  { id: 'local-places', name: 'local-places', description: '通过本地主机上的 Google Places API 代理搜索地点（餐厅、咖啡馆等）。', category: 'Lifestyle' },
  { id: 'mcporter', name: 'mcporter', description: '使用 mcporter CLI 列出、配置、认证和直接调用 MCP 服务器/工具（HTTP 或 stdio），包括临时服务器、配置编辑和 CLI/类型生成。', category: 'Productivity' },
  { id: 'model-usage', name: 'model-usage', description: '使用 CodexBar CLI 本地成本使用情况来总结 Codex 或 Claude 的每个模型使用情况，包括当前（最近）的模型或完整的模型分解。当被要求从 codexbar 获取模型级别的使用/成本数据，或需要一个来自 codexbar cost JSON 的可脚本化的每个模型摘要时触发。', category: 'Development' },
  { id: 'nano-banana-pro', name: 'nano-banana-pro', description: '通过 Gemini 3 Pro Image (Nano Banana Pro) 生成或编辑图像。', category: 'Productivity' },
  { id: 'nano-pdf', name: 'nano-pdf', description: '使用自然语言指令编辑 PDF，通过 nano-pdf CLI。', category: 'Productivity' },
  { id: 'notion', name: 'notion', description: 'Notion API，用于创建和管理页面、数据库和块。', category: 'Development' },
  { id: 'obsidian', name: 'obsidian', description: '使用 obsidian-cli 处理 Obsidian 保险库（纯 Markdown 笔记）并进行自动化。', category: 'Productivity' },
  { id: 'openai-image-gen', name: 'openai-image-gen', description: '通过 OpenAI Images API 批量生成图像。随机提示词采样器 + `index.html` 画廊。', category: 'Media' },
  { id: 'openai-whisper-api', name: 'openai-whisper-api', description: '通过 OpenAI Audio Transcriptions API (Whisper) 转录音频。', category: 'Media' },
  { id: 'openai-whisper', name: 'openai-whisper', description: '使用 Whisper CLI 进行本地语音转文本（无需 API 密钥）。', category: 'Development' },
  { id: 'openhue', name: 'openhue', description: '通过 OpenHue CLI 控制飞利浦 Hue 灯/场景。', category: 'Development' },
  { id: 'oracle', name: 'oracle', description: '使用 oracle CLI 的最佳实践（提示词 + 文件捆绑、引擎、会话和文件附件模式）。', category: 'Development' },
  { id: 'ordercli', name: 'ordercli', description: '仅限 Foodora 的 CLI，用于检查过去的订单和活跃订单状态（Deliveroo 开发中）。', category: 'Development' },
  { id: 'peekaboo', name: 'peekaboo', description: '使用 Peekaboo CLI 捕获和自动化 macOS 界面。', category: 'Development' },
  { id: 'sag', name: 'sag', description: 'ElevenLabs 文本转语音，具有 mac 风格的 say UX。', category: 'Media' },
  { id: 'session-logs', name: 'session-logs', description: '使用 jq 搜索和分析您自己的会话日志（旧对话/父对话）。', category: 'Development' },
  { id: 'sherpa-onnx-tts', name: 'sherpa-onnx-tts', description: '通过 sherpa-onnx 进行本地文本转语音（离线，无需云端）。', category: 'Media' },
  { id: 'skill-creator', name: 'skill-creator', description: '创建或更新 AgentSkills。当设计、结构化或打包带有脚本、引用和资产的技能时使用。', category: 'Development' },
  { id: 'slack', name: 'slack', description: '当需要通过 slack 工具从 OpenClaw 控制 Slack 时使用，包括在 Slack 频道或 DM 中对消息做出反应或固定/取消固定项目。', category: 'Communication' },
  { id: 'songsee', name: 'songsee', description: '使用 songsee CLI 从音频生成频谱图和特征面板可视化。', category: 'Development' },
  { id: 'sonoscli', name: 'sonoscli', description: '控制 Sonos 音箱（发现/状态/播放/音量/分组）。', category: 'Development' },
  { id: 'spotify-player', name: 'spotify-player', description: '终端 Spotify 播放/搜索 via spogo（首选）或 spotify_player。', category: 'Media' },
  { id: 'summarize', name: 'summarize', description: '从 URL、播客和本地文件总结或提取文本/转录本（是"转录这个 YouTube/视频"的绝佳备选）。', category: 'Media' },
  { id: 'things-mac', name: 'things-mac', description: '在 macOS 上通过 `things` CLI 管理 Things 3（通过 URL 方案添加/更新项目和待办事项；从本地 Things 数据库读取/搜索/列出）。当用户要求向 Things 添加任务、列出收件箱/今天/即将到来、搜索任务或检查项目/区域/标签时使用。', category: 'Development' },
  { id: 'tmux', name: 'tmux', description: '远程控制 tmux 会话，通过发送击键和抓取窗格输出来实现交互式 CLI。', category: 'Development' },
  { id: 'trello', name: 'trello', description: '通过 Trello REST API 管理 Trello 看板、列表和卡片。', category: 'Productivity' },
  { id: 'video-frames', name: 'video-frames', description: '使用 ffmpeg 从视频中提取帧或短片段。', category: 'Development' },
  { id: 'voice-call', name: 'voice-call', description: '通过 OpenClaw voice-call 插件启动语音通话。', category: 'Communication' },
  { id: 'wacli', name: 'wacli', description: '通过 wacli CLI 向他人发送 WhatsApp 消息或搜索/同步 WhatsApp 历史记录（不用于普通用户聊天）。', category: 'Communication' },
  { id: 'weather', name: 'weather', description: '获取当前天气和预报（无需 API 密钥）。', category: 'Lifestyle' },
  { id: 'bmap-jsapi-gl', name: 'bmap-jsapi-gl', description: '百度地图 JSAPI WebGL (BMapGL) 开发指南：地图初始化、覆盖物、事件、图层、路径规划、地理编码等。适用于2D/2.5D地图开发。', category: 'Development' },
  { id: 'bmap-jsapi-three', name: 'bmap-jsapi-three', description: '百度地图 JSAPI Three (MapVThree)：基于 three.js 的二三维一体化地图可视化库，支持 3D 模型加载、地理数据可视化、测量编辑、环境渲染等。', category: 'Development' },
  { id: 'jsapi-ui-kit', name: 'jsapi-ui-kit', description: '百度地图轻量级 UI 组件库 (@baidumap/jsapi-ui-kit)，提供 PlaceSearch（地点搜索）和 PlaceDetail（POI 详情展示）组件。', category: 'Development' },
  { id: 'skills-library', name: 'skills-library', description: '浏览和管理 OpenClaw 代理技能库。查看所有可用技能、按场景和分类筛选、从 GitHub 同步最新技能。', category: 'Productivity' }
]

export const categories = [
  "Communication",
  "Development",
  "Lifestyle",
  "Media",
  "Productivity"
]
