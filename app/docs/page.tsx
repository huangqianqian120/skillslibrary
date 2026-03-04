'use client'

import { useState } from 'react'
import Link from 'next/link'
import BackButton from '../components/BackButton'

const faqs = [
  {
    question: "如何查找需要的 Skill？",
    answer: "在首页可以使用场景筛选或搜索功能。也可以直接访问 /skill/[id] 查看特定 Skill 的详情。"
  },
  {
    question: "如何安装 Skill？",
    answer: "每个 Skill 详情页都有 GitHub 链接，可以直接从仓库克隆或参考 SKILL.md 手动安装。"
  },
  {
    question: "Skill 需要特定模型吗？",
    answer: "部分 Skill 需要特定 LLM 模型，详情页会标注「推荐模型」。"
  },
  {
    question: "可以创建私人 Skill 吗？",
    answer: "可以。点击「创建 Skill」按钮创建的 Skill 保存在本地，不公开发布。"
  },
  {
    question: "Skill 和 MCP 有什么区别？",
    answer: "MCP (Model Context Protocol) 是连接 AI 与外部系统的开源标准（像 USB-C 之于电脑），Skill 是更轻量的功能模块。MCP 需要编写服务端代码，Skill 更简单，只需定义描述即可使用。"
  }
]

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <BackButton />
        
        <h1 className="text-2xl font-bold text-gray-900 mt-6 mb-8">
          Skills Library 文档
        </h1>

        <div className="space-y-8 text-sm">
          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">什么是 Skill</h2>
            <p className="text-gray-600 mb-2">
              Agent Skills 是扩展 AI 编程助手功能的模块化能力。每个 Skill 由一个包含指令的 SKILL.md 文件以及可选的脚本和模板组成。
            </p>
            <p className="text-gray-600">
              2025年12月，Anthropic 将 Agent Skills 规范作为开放标准发布，OpenAI 也在 Codex CLI 和 ChatGPT 中采用了相同格式。Skills 由模型调用——AI 会根据上下文自主决定何时使用它们。
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">Skill 的标准结构</h2>
            <p className="text-gray-600 mb-3">
              根据 Claude 官方文档，Skill 由两部分组成：YAML frontmatter + Markdown 内容
            </p>
            
            <h3 className="text-sm font-medium text-gray-900 mb-2">YAML Frontmatter</h3>
            <pre className="mt-2 bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto mb-4">
{`---
name: skill-name
description: 描述这个技能什么时候使用
---

# 技能说明...
`}
            </pre>
            
            <h3 className="text-sm font-medium text-gray-900 mb-2">目录结构</h3>
            <pre className="mt-2 bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto mb-4">
{`my-skill/
├── SKILL.md           # 主指令（必需）
├── template.md        # 模板，供 AI 填充
├── examples/         # 示例输出
│   └── sample.md
└── scripts/          # 可执行的脚本
    └── validate.sh`}
            </pre>
            
            <h3 className="text-sm font-medium text-gray-900 mb-2">Frontmatter 字段</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-2 mb-4">
              <li><strong>name</strong> - 技能名称，使用 /name 调用</li>
              <li><strong>description</strong> - 描述，帮助 AI 决定何时自动加载</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">Skill 存储位置</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-gray-600">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">位置</th>
                    <th className="text-left py-2">路径</th>
                    <th className="text-left py-2">适用范围</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">Personal</td>
                    <td className="py-2 font-mono">~/.claude/skills/&lt;skill-name&gt;/</td>
                    <td className="py-2">所有项目</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Project</td>
                    <td className="py-2 font-mono">.claude/skills/&lt;skill-name&gt;/</td>
                    <td className="py-2">当前项目</td>
                  </tr>
                  <tr>
                    <td className="py-2">Plugin</td>
                    <td className="py-2 font-mono">&lt;plugin&gt;/skills/&lt;skill-name&gt;/</td>
                    <td className="py-2">插件启用范围</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">调用方式</h2>
            <div className="space-y-2 text-gray-600">
              <p>1. <strong>自动调用</strong> - 当需求匹配 description 时，AI 自动加载</p>
              <p>2. <strong>手动调用</strong> - 使用 /skill-name 命令</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">Skill 是怎么工作的？</h2>
            <div className="space-y-1 text-gray-600">
              <p>1. <strong>定义</strong>：每个 Skill 通过 SKILL.md 描述自己的功能、适用场景、调用方式</p>
              <p>2. <strong>触发</strong>：当用户需求匹配 Skill 的描述时，AI Agent 自动调用对应 Skill</p>
              <p>3. <strong>执行</strong>：Skill 执行预定义的操作（调用 API、运行命令等）</p>
              <p>4. <strong>返回</strong>：结果返回给 AI Agent，再呈现给用户</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">场景</h2>
            <p className="text-gray-600 mb-3">场景是按用户角色划分的技能集合：</p>
            <div className="grid gap-2">
              {[
                { name: '💻 开发者', desc: '编程、调试、发布', skills: 'frontend, healthcheck, web...' },
                { name: '✍️ 写作者', desc: '写作、编辑、发布', skills: 'notion, copywriting, brainstorming...' },
                { name: '📋 效率党', desc: '任务、笔记、提醒', skills: 'notion, analytics-tracking, growth...' },
                { name: '🎨 媒体创作', desc: '图片、音频、视频', skills: 'nano-pdf, tavily, image-gen...' },
                { name: '👀 监控追踪', desc: '追踪更新和动态', skills: 'weather, blogwatcher, competitor-tracker...' },
                { name: '💼 商业', desc: '商业和营销', skills: 'marketing-ideas, seo-audit, location-advisor...' },
              ].map(s => (
                <div key={s.name} className="p-3 border rounded">
                  <div className="font-medium">{s.name} - {s.desc}</div>
                  <div className="text-gray-500 mt-1">包含: {s.skills}</div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">创建 Skill</h2>
            <p className="text-gray-600 mb-2">你可以创建自定义 agent skill 并在 GitHub 上分享。查看技能创建器 (skill-creator) 技能获取创建自己技能的详细指导。</p>
            <p className="text-gray-600 mt-2 mb-3">基本结构需要一个包含指令的 SKILL.md 文件。你还可以添加可选的脚本和模板。</p>
            
            <p className="text-gray-600 mb-3">两种方式创建新 Skill：</p>
            
            <h3 className="text-sm font-medium text-gray-900 mb-2">方式一：描述需求 AI 生成</h3>
            <ol className="list-decimal list-inside space-y-1 text-gray-600 mb-4">
              <li>点击顶部的「创建 Skill」按钮</li>
              <li>描述你的需求（如"帮我做一个每天早上抓取科技新闻的技能"）</li>
              <li>AI 分析并完善需求</li>
              <li>生成 Skill 代码</li>
              <li>保存到本地</li>
            </ol>

            <h3 className="text-sm font-medium text-gray-900 mb-2">方式二：导入工作流 JSON</h3>
            <ol className="list-decimal list-inside space-y-1 text-gray-600">
              <li>点击顶部的「创建 Skill」按钮</li>
              <li>选择「导入工作流」</li>
              <li>上传 n8n/Dify/LangChain 的工作流 JSON 文件</li>
              <li>AI 自动解析并生成 Skill</li>
              <li>保存到本地</li>
            </ol>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">FAQ</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b pb-3">
                  <h3 className="font-medium text-gray-900 mb-1">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
