---
name: ppt-agent-skill
version: 1.0.0
description: 专业 PPT 演示文稿全流程 AI 生成助手。模拟万元/页级别 PPT 设计公司的完整工作流，输出高质量 HTML 演示文稿 + 可编辑矢量 PPTX。
emoji: 📊
category: Productivity
tags: [PPT, Presentation, AI, Design, Automation]
author: sunbigfly
repoUrl: https://github.com/sunbigfly/ppt-agent-skill
---

# PPT Agent Skill

专业 PPT 演示文稿全流程 AI 生成助手，模仿顶级 PPT 设计公司的完整工作流。

## 功能特性

- **6 步 Pipeline**：需求 → 搜索 → 大纲 → 策划 → 设计 → 后处理
- **8 种预置风格**：暗黑科技 / 小米橙 / 蓝白商务 / 朱红宫墙 / 清新自然 / 紫金奢华 / 极简灰白 / 活力彩虹
- **Bento Grid 布局**：10 种卡片式灵活布局，内容驱动版式
- **智能配图**：AI 生成配图 + 5 种视觉融入技法
- **排版系统**：7 级字号阶梯 + 间距层级 + 中英文混排规则
- **数据可视化**：13 种纯 CSS/SVG 图表
- **PPTX 兼容**：HTML → SVG → PPTX 管线，PPT 365 中右键"转换为形状"即可编辑

## 输出产物

| 文件 | 说明 |
|------|------|
| preview.html | 浏览器翻页预览（自动生成） |
| presentation.pptx | PPTX 文件，PPT 365 中右键"转换为形状"可编辑 |
| svg/*.svg | 单页矢量 SVG，可直接拖入 PPT |
| slides/*.html | 单页 HTML 源文件 |

## 环境要求

- Node.js >= 18（Puppeteer + dom-to-svg）
- Python >= 3.8
- python-pptx

## 安装

```bash
# 一键安装依赖
pip install python-pptx lxml Pillow
npm install puppeteer dom-to-svg
```

## 触发方式

在对话中直接描述需求即可触发：

| 场景 | 说法 |
|------|------|
| 纯主题 | "帮我做个 PPT" / "做一个关于 X 的演示" |
| 带素材 | "把这篇文档做成 PPT" / "用这份报告做 slides" |
| 带要求 | "做 15 页暗黑风的 AI 安全汇报材料" |
| 隐式触发 | "我要给老板汇报 Y" / "做个培训课件" / "做路演 deck" |

## 工作流程

1. **需求调研** - Agent 提问收集需求（场景/受众/期望行动等）
2. **资料搜集** - 搜索主题背景、市场数据、案例等
3. **大纲策划** - 生成结构化大纲
4. **策划稿** - 逐页内容分配 + 布局规划
5. **设计稿** - 生成 HTML 页面 + AI 配图
6. **后处理** - HTML → SVG → PPTX 自动转换

## 示例

```
你：帮我做一个关于小米 SU7 发布的产品介绍 PPT
→ Agent 提问收集需求
→ 自动搜索资料
→ 生成大纲
→ 逐页设计 HTML
→ 自动生成 PPTX
→ 输出到 ppt-output/
```

## 项目结构

```
ppt-agent-skill/
├── SKILL.md              # 主工作流指令
├── README.md             # 文档
├── references/
│   ├── prompts/          # 6 个 Prompt 模板
│   ├── styles/          # 8 种预置风格
│   ├── layouts/         # 10 种布局
│   ├── charts/          # 13 种图表模板
│   ├── icons/           # 4 类 SVG 图标
│   └── page-templates/  # 页面模板
└── scripts/
    ├── html_packager.py # HTML 合并
    ├── html2svg.py      # HTML → SVG
    └── svg2pptx.py      # SVG → PPTX
```
