---
name: infinite-dev-skill
version: 1.0.0
description: Claude Code 无限开发循环技能 - 让 Claude 成为无限开发循环：spec → feature list → implement → test → commit → repeat，跨无限制上下文窗口。
emoji: 🔄
category: Development
tags: [Claude Code, Development, Automation, Loop, Agent]
author: RobertWang4
repoUrl: https://github.com/RobertWang4/infinite-dev-skill
---

# Infinite Dev Skill

让 Claude 成为无限开发循环助手，基于 Anthropic 研究 [Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)。

## 工作流程

```
PROJECT FILES
│
├── AGENTS.md
├── feature_list.json
├── init.sh
├── claude-progress.txt
├── dev-agent.py
└── src/
```

### 首次会话
1. 用户提供 Spec
2. Initializer Agent 生成 feature_list.json (20-200 个功能)
3. 创建 idempotent init.sh
4. 初始化 git + scaffold
5. 询问用户：Mode A 或 Mode B？

### 每功能工作流
1. **Init Env** - ./init.sh
2. **Pick Feature** - 从 feature_list.json 选择
3. **Write Code** - 实现功能
4. **Verify** - npm run lint → npm run build → Browser Test (Playwright)
5. **Complete** - 记录到 claude-progress.txt
6. **Commit** - 提交到 git

## 两种模式

### Mode A: Interactive
- Claude 直接在当前 session 中实现
- /clear + "go ahead" 重置上下文
- ✓ MCP/Playwright 可用
- ✓ 无需特殊权限
- ✓ 可见每一步

### Mode B: Autopilot
- dev-agent.py spawns claude -p
- 每个功能自动上下文重置
- 完全无人值守
- ✗ 需要 --dangerously-skip-permissions
- ✗ MCP 可能不可用

## 状态持久化

- **feature_list.json** - 真相来源，只有 "passes" 会翻转
- **claude-progress.txt** - 结构化会话笔记
- **git history** - 代码变更 + 描述性提交

## 安装

```bash
px skills add RobertWang4/infinite-dev-skill
```

或手动复制到 `~/.claude/skills/infinite-dev/`

## 使用

```bash
# 告诉 Claude 要构建什么
Build me a task management app with React and Express
```

Claude 会自动：
1. 复制 dev-agent.py + AGENTS.md 到项目
2. 读取 spec → 生成 feature_list.json
3. 询问：Mode A (interactive) 或 Mode B (autopilot)?
4. 开始逐个构建功能

## 更新

```bash
px skills update
```

这会更新所有已安装 skill 到最新版本。
