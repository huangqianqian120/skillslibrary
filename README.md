# 🤖 AI Agent Skills Library

<div align="center">

![Next.js](https://img.shields.io/badge/Made%20with-Next.js-black?style=for-the-badge&logo=next.js)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)
![Platform](https://img.shields.io/badge/Platform-OpenClaw%20%7C%20Claude%20Code%20%7C%20Codex-purple?style=for-the-badge)

# 🚀 Agent Skills Marketplace

[🌐 Live Demo](https://www.skillslibrary.fun) · [📖 Docs](https://www.skillslibrary.fun/docs)

**基于开放的 SKILL.md 生态系统的 Agent Skills 市场**

</div>

---

## 什么是 Agent Skills？

Agent Skills 是扩展 AI 编程助手功能的模块化能力。2025年12月 Anthropic 将其作为开放标准发布，OpenAI 也在 Codex CLI 和 ChatGPT 中采用了相同格式。

每个 Skill 由包含指令的 SKILL.md 文件以及可选的脚本和模板组成。AI 会根据上下文自主决定何时使用它们。

## 特性

- 🤖 **多平台支持** - OpenClaw, Claude Code, Codex 等
- 📦 **开箱即用** - 复制即可使用
- 🌍 **开放生态** - 基于 SKILL.md 开放标准
- 🔄 **自动同步** - 从 GitHub 发现开源 Skills
- ⚡ **CLI 工具** - 终端直接搜索和安装 Skills
- 💬 **AI 助手** - 智能推荐合适的 Skills

## 分类

| 分类 | 说明 |
|------|------|
| 💻 开发者 | 编程、调试、发布 |
| ✍️ 写作者 | 写作、编辑、发布 |
| 📋 效率党 | 任务、笔记、提醒 |
| 🎨 媒体创作 | 图片、音频、视频 |
| 👀 监控追踪 | 追踪更新和动态 |
| 💼 商业 | 商业和营销 |

## 快速开始

### 在线使用

访问 [https://www.skillslibrary.fun](https://www.skillslibrary.fun) 即可在线浏览和安装 Skills。

### CLI 工具

```bash
# 安装 CLI
npm i -g skills-cli

> **📝 提示：** 如果您在 macOS 或 Linux 系统下安装时遇到 `EACCES: permission denied` 权限错误，这是因为 npm 默认需要管理员权限来安装全局包。我们推荐您[更改 npm 的全局安装目录](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally)以彻底解决此问题。或者，您也可以使用 `sudo npm i -g skills-cli` 以管理员身份运行（此方法不推荐）。

# 或从源码运行
git clone https://github.com/huangqianqian120/skillslibrary.git
cd skillslibrary/cli
npm install
node bin/skills.js --help

# 常用命令
skills list                    # 浏览所有 Skills
skills list --category AI     # 按分类筛选
skills search "legal"         # 搜索
skills install ab-test-setup  # 安装
skills uninstall ab-test-setup # 卸载
```

### 本地运行网站

```bash
git clone https://github.com/huangqianqian120/skillslibrary.git
cd skillslibrary
npm install
npm run dev
```

## 创建 Skill

两种方式创建新 Skill：

1. **描述需求 AI 生成** - 点击「创建 Skill」按钮
2. **导入工作流 JSON** - 上传 n8n/Dify/LangChain 工作流

## 项目结构

```
skillslibrary/
├── app/           # Next.js 网站
├── data/          # Skills 注册数据
├── skills/        # Skills 源文件
└── cli/           # CLI 工具
```

## License

MIT

---

<div align="center">

**Built with ❤️**

[🌐 Website](https://www.skillslibrary.fun) · [🐙 GitHub](https://github.com/huangqianqian120)

</div>
