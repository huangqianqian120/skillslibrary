---
name: wps-skills
version: 1.0.0
description: WPS Office 智能助手 - AI编程助手通过自然语言操控WPS Office的MCP工具集。支持Excel(80工具) / Word(24工具) / PPT(111工具) / 通用(9工具)。
emoji: 📊
category: Productivity
tags: [WPS, Office, Excel, Word, PPT, MCP, Automation]
author: lc2panda
repoUrl: https://github.com/lc2panda/wps-skills
---

# WPS Skills

WPS Office 智能助手，让 AI 能够通过自然语言操控 WPS Office。

## 功能特性

- **236 个 MCP 工具**：224个MCP专业工具 + 12个内置工具
- **多应用支持**：
  - Excel：80个工具（公式/数据/图表/透视表/工作表/格式/工作簿/行列/批注保护）
  - Word：24个工具（格式/内容/文档管理/页眉页脚/批注）
  - PPT：111个工具（幻灯片/形状/图片/表格/美化/动画/图表/3D/数据可视化）
  - 通用：9个工具（保存/连接检测/文本选取/格式转换）
- **跨平台支持**：macOS、Windows、Linux

## 环境要求

- 已安装 WPS Office（https://www.wps.cn/ 或 https://www.wps.com/）
- Node.js >= 18.0.0
- Git

## 安装步骤

### 1. 克隆项目

```bash
git clone https://github.com/lc2panda/wps-skills.git
cd wps-skills
```

### 2. 构建 MCP Server

```bash
cd wps-office-mcp
npm install
npm run build
cd ..
```

### 3. 配置 MCP（根据使用的AI工具）

**Claude Code** — 写入 `~/.claude/settings.json`：

```json
{
  "mcpServers": {
    "wps-office": {
      "command": "node",
      "args": ["/你的路径/wps-skills/wps-office-mcp/dist/index.js"]
    }
  }
}
```

**Cursor** — 写入项目根目录 `.cursor/mcp.json`：

```json
{
  "mcpServers": {
    "wps-office": {
      "command": "node",
      "args": ["/你的路径/wps-skills/wps-office-mcp/dist/index.js"]
    }
  }
}
```

### 4. 安装 WPS 插件（需要人工操作）

**macOS**:
```bash
bash scripts/auto-install-mac.sh
```

**Windows (PowerShell)**:
```powershell
powershell scripts/install.ps1
```

**Linux**:
```bash
bash scripts/install.sh
```

⚠️ 安装后必须重启 WPS Office 才能生效。

### 5. 创建 Skills 符号链接

```bash
# 创建skills目录（如不存在）
mkdir -p ~/.claude/skills

# 创建符号链接
ln -sf "$(pwd)/skills/wps-excel" ~/.claude/skills/wps-excel
ln -sf "$(pwd)/skills/wps-word" ~/.claude/skills/wps-word
ln -sf "$(pwd)/skills/wps-ppt" ~/.claude/skills/wps-ppt
ln -sf "$(pwd)/skills/wps-office" ~/.claude/skills/wps-office
```

## 验证安装

```bash
node wps-office-mcp/dist/index.js &
# 应看到 "MCP Server started successfully" 日志
kill %1 2>/dev/null
```

## 常见问题

| 问题 | 解决方案 |
|------|----------|
| MCP连接失败 | 确认 npm install && npm run build 已执行，检查dist/index.js存在 |
| WPS未响应 | 重启WPS Office，确认加载项已安装 |
| "arguments error" | 重新运行安装脚本，重启WPS |
| Linux找不到插件 | 查看INSTALL.md中的Linux专用指南 |
| 工具调用返回null | 确认WPS中已打开对应类型的文档 |

## 架构说明

```
Skills层(SKILL.md自然语言指导)
 ↓ Claude Code调用
MCP Server层(236个工具)
 ↓ wpsClient.executeMethod()
执行层
 ├── macOS: wps-claude-assistant (224 action, HTTP轮询)
 └── Windows: wps-com.ps1 (235 action, COM接口)
```

## 相关工具

- [WPS Office](https://www.wps.cn/) - 办公软件
- [MCP Server](https://github.com/lc2panda/wps-skills/tree/main/wps-office-mcp) - MCP 服务器
