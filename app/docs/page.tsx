'use client'

import { useState } from 'react'
import Link from 'next/link'
import BackButton from '../components/BackButton'

const faqs = [
  {
    question: "如何查找需要的 Skill？",
    answer: "在首页可以使用分类筛选、场景筛选或搜索功能。也可以直接访问 /skill/[id] 查看特定 Skill 的详情。"
  },
  {
    question: "如何安装 Skill？",
    answer: "每个 Skill 详情页都有 GitHub 链接，可以直接从 OpenClaw 仓库克隆或参考 SKILL.md 手动安装。"
  },
  {
    question: "如何创建新 Skill？",
    answer: "点击侧边栏的「创建 Skill」按钮，按照向导流程：描述需求 → AI 生成 → 保存即可。"
  },
  {
    question: "Skill 的结构是什么？",
    answer: "每个 Skill 由 SKILL.md 定义，包含 name、description、usage 等字段。详见 Skill Structure 部分。"
  },
  {
    question: "支持哪些分类？",
    answer: "Communication (通讯)、Development (开发)、Lifestyle (生活)、Media (媒体)、Productivity (效率)五大分类。"
  },
  {
    question: "Skill 和 MCP 是什么关系？",
    answer: "MCP (Model Context Protocol) 是一个开放标准，让 AI Agent 可以连接到外部工具。OpenClaw 的 Skill 系统类似 MCP，都是为了让 AI 能够执行具体任务。Skills Library 中的 Skill 可以看作是 MCP server 的简化版本。"
  },
  {
    question: "这些 Skill 可以用于 Claude Code 或 Cursor 吗？",
    answer: "Skills Library 的 Skill 是为 OpenClaw 设计的。Claude Code 使用 MCP 标准，需要 MCP server。你可以把这个技能库看作是灵感来源，很多 Skill 的功能在 MCP 生态中也有对应的实现。"
  }
]

const sections = [
  { id: 'what-is-skill', label: '什么是 Skill' },
  { id: 'how-it-works', label: '工作原理' },
  { id: 'overview', label: '概述' },
  { id: 'structure', label: 'Skill 结构' },
  { id: 'categories', label: '分类' },
  { id: 'finding', label: '查找 Skills' },
  { id: 'creating', label: '创建 Skill' },
  { id: 'api', label: 'API' },
  { id: 'faq', label: 'FAQ' },
]

export default function DocsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="border-b border-gray-100 sticky top-0 z-10 bg-white/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <BackButton text="Skills Library" />
            
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-gray-100 bg-white">
          <nav className="px-4 py-3 space-y-1">
            {sections.map(s => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {s.label}
              </a>
            ))}
          </nav>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Sidebar - Desktop only */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <nav className="space-y-1">
                {sections.map(s => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    {s.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <main className="lg:col-span-3 space-y-12 sm:space-y-16">
            {/* What is Skill */}
            <section id="what-is-skill">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">什么是 Skill？</h1>
              
              <div className="prose prose-gray max-w-none">
                <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
                  <strong>Skill（技能）</strong>是 AI Agent 的能力扩展模块，让 AI 能够执行特定的任务，比如发送消息、操作文件、调用 API 等。
                </p>

                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
                  <h3 className="font-semibold text-blue-900 mb-2">🤖 简单理解</h3>
                  <p className="text-blue-800 text-sm">
                    就像手机 App 让手机有各种功能一样，<strong>Skill 让 AI 有各种能力</strong>。没有 Skill，AI 只能聊天；有 Skill，AI 可以帮你做事。
                  </p>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Skill 能做什么？</h3>
                <ul className="space-y-2 text-gray-600 mb-4 sm:mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span><strong>通讯</strong> - 发送消息到 Discord、Slack、WhatsApp</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span><strong>开发</strong> - 操作 GitHub、运行代码、调试程序</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span><strong>生活</strong> - 查天气、设提醒、管理日程</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span><strong>媒体</strong> - 生成图片、编辑视频、转录音频</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span><strong>效率</strong> - 管理 Notion、Trello、Things</span>
                  </li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mb-3">为什么需要 Skill？</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="border border-gray-100 rounded-xl p-4">
                    <div className="text-2xl mb-2">🔌</div>
                    <h4 className="font-medium text-gray-900 mb-1">扩展能力</h4>
                    <p className="text-sm text-gray-500">AI 本身只会对话，Skill 让它能操作外部世界</p>
                  </div>
                  <div className="border border-gray-100 rounded-xl p-4">
                    <div className="text-2xl mb-2">🎯</div>
                    <h4 className="font-medium text-gray-900 mb-1">专业化</h4>
                    <p className="text-sm text-gray-500">每个 Skill 专注做一件事，做到极致</p>
                  </div>
                  <div className="border border-gray-100 rounded-xl p-4">
                    <div className="text-2xl mb-2">🔄</div>
                    <h4 className="font-medium text-gray-900 mb-1">可复用</h4>
                    <p className="text-sm text-gray-500">一次编写，多次使用，大家都能用</p>
                  </div>
                  <div className="border border-gray-100 rounded-xl p-4">
                    <div className="text-2xl mb-2">🛠️</div>
                    <h4 className="font-medium text-gray-900 mb-1">可组合</h4>
                    <p className="text-sm text-gray-500">多个 Skill 可以配合使用，完成复杂任务</p>
                  </div>
                </div>
              </div>
            </section>

            {/* How it Works */}
            <section id="how-it-works">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Skill 是怎么工作的？</h2>
              
              <p className="text-gray-600 mb-6">
                AI Agent 的 Skill（技能）系统基于类似的原理工作。让我参考 Claude 官方的 <strong>Model Context Protocol (MCP)</strong> 来解释：
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">定义 Skill（技能/工具）</h4>
                    <p className="text-gray-600 text-sm">开发者编写 Skill 定义文件（SKILL.md 或 MCP server），描述技能名称、功能、参数和使用方式。类似于手机 App 的应用商店描述。</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">注册到 Agent 系统</h4>
                    <p className="text-gray-600 text-sm">AI Agent 启动时加载 Skill，将其注册到系统中。Agent 就知道有哪些工具可用。每个 Skill 会有一个唯一标识符和描述。</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">3</div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">AI 智能选择</h4>
                    <p className="text-gray-600 text-sm">当用户提出请求时，AI 会自动判断是否需要调用 Skill。AI 知道每个 Skill 的能力，会选择合适的工具来完成任务。</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">4</div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">执行并返回结果</h4>
                    <p className="text-gray-600 text-sm">Skill 执行完成后，结果返回给 AI。AI 会理解结果，组织成人类可读的回答。</p>
                  </div>
                </div>
              </div>

              {/* MCP 介绍 */}
              <div className="mt-8 p-4 sm:p-6 bg-blue-50 border border-blue-100 rounded-xl">
                <h4 className="font-semibold text-blue-900 mb-3">🤖 什么是 MCP？</h4>
                <p className="text-blue-800 text-sm mb-4">
                  <strong>Model Context Protocol (MCP)</strong> 是一个开放标准，由 Anthropic（Claude 背后公司）提出。它让 AI Agent 可以连接到外部工具和数据源。
                </p>
                <p className="text-blue-800 text-sm mb-4">
                  不同的 AI Agent（Claude Code、OpenClaw、Cursor 等）可能使用不同的技能系统，但核心思想类似：
                </p>
                <ul className="text-blue-800 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span><strong>Skill</strong> = MCP Server = 工具/插件</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span><strong>技能库</strong> = MCP Registry = 工具商店</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span><strong>调用 Skill</strong> = AI 使用 Tool = Agent 执行动作</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 p-4 bg-gray-50 rounded-xl">
                <h4 className="font-medium text-gray-900 mb-2">📌 举个例子</h4>
                <p className="text-gray-600 text-sm">
                  你说 "帮我查一下上海天气，并发给 Slack 频道"，AI 会：
                </p>
                <ol className="mt-2 text-sm text-gray-600 space-y-1">
                  <li>1. 识别需要 <strong>weather</strong> skill 查询天气</li>
                  <li>2. 调用天气 API 获取上海天气数据</li>
                  <li>3. 识别需要 <strong>slack</strong> skill 发送消息</li>
                  <li>4. 调用 Slack API 发送消息</li>
                  <li>5. 完成后告诉你结果</li>
                </ol>
              </div>

              <div className="mt-6 text-sm text-gray-500">
                <p>💡 <strong>延伸阅读</strong>：</p>
                <ul className="mt-2 space-y-1">
                  <li>• <a href="https://modelcontextprotocol.io/introduction" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">MCP 官方文档 →</a></li>
                  <li>• <a href="https://docs.anthropic.com/en/docs/claude-code/mcp" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Claude Code MCP 配置 →</a></li>
                </ul>
              </div>
            </section>

            {/* Overview */}
            <section id="overview">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Skills Library 文档</h1>
              <p className="text-lg text-gray-600 mb-6">
                Skills Library 是一个为 AI Agent 设计的技能库浏览器，帮助用户发现和管理 OpenClaw 技能。
              </p>
              <div className="flex gap-4 text-sm">
                <a href="https://skillslibrary.fun" className="text-blue-600 hover:underline">访问网站 →</a>
                <a href="https://github.com/openclaw/openclaw" className="text-blue-600 hover:underline">GitHub →</a>
              </div>
            </section>

            {/* Structure */}
            <section id="structure">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Skill 结构</h2>
              <p className="text-gray-600 mb-4">每个 Skill 由 SKILL.md 文件定义，包含以下字段：</p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto text-sm">
{`---
name: copywriting
description: 营销文案写作助手
version: 1.0.0
---

# Skill Name

描述这个技能是做什么的...

## Capabilities
- 功能1
- 功能2

## Usage
使用示例...`}
              </pre>
            </section>

            {/* Categories */}
            <section id="categories">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">分类</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: 'Communication', desc: '消息平台 (Discord, Slack, WhatsApp)', icon: '💬' },
                  { name: 'Development', desc: '编码工具 (GitHub, 代码生成)', icon: '💻' },
                  { name: 'Lifestyle', desc: '日常生活工具 (天气, 提醒)', icon: '🏠' },
                  { name: 'Media', desc: '内容创作 (图片, 视频)', icon: '🎨' },
                  { name: 'Productivity', desc: '任务管理 (Notion, Trello)', icon: '📋' },
                ].map(cat => (
                  <div key={cat.name} className="border border-gray-100 rounded-xl p-4 hover:border-gray-200 transition-colors">
                    <div className="text-2xl mb-2">{cat.icon}</div>
                    <h3 className="font-medium text-gray-900">{cat.name}</h3>
                    <p className="text-sm text-gray-500">{cat.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Finding Skills */}
            <section id="finding">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">查找 Skills</h2>
              <ol className="space-y-3 text-gray-600">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm">1</span>
                  <span><strong>按分类</strong>：访问首页，按 Communication、Development 等分类筛选</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm">2</span>
                  <span><strong>按场景</strong>：使用场景预设（Developer、Writer、Organizer 等）</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm">3</span>
                  <span><strong>搜索</strong>：使用搜索框输入关键词</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm">4</span>
                  <span><strong>Skill ID</strong>：直接访问 /skill/[skill-id] 查看详情</span>
                </li>
              </ol>
            </section>

            {/* Creating Skill */}
            <section id="creating">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">创建 Skill</h2>
              <div className="border border-gray-100 rounded-xl p-6">
                <h3 className="font-medium text-gray-900 mb-4">创建流程</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 font-medium">A</div>
                    <div>
                      <h4 className="font-medium text-gray-900">描述需求</h4>
                      <p className="text-sm text-gray-500">用自然语言描述你想要什么功能</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 font-medium">B</div>
                    <div>
                      <h4 className="font-medium text-gray-900">AI 生成</h4>
                      <p className="text-sm text-gray-500">AI 根据描述生成 SKILL.md</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 font-medium">C</div>
                    <div>
                      <h4 className="font-medium text-gray-900">保存使用</h4>
                      <p className="text-sm text-gray-500">保存到个人技能库，随时使用</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* API */}
            <section id="api">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">API 端点</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-mono rounded">GET</span>
                  <code className="text-gray-900">/api/skills</code>
                  <span className="text-gray-500 text-sm">获取所有 Skills 列表</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-mono rounded">GET</span>
                  <code className="text-gray-900">/api/skills/[id]</code>
                  <span className="text-gray-500 text-sm">获取指定 Skill 详情</span>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">常见问题</h2>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full px-5 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-900">{faq.question}</span>
                      <svg
                        className={`w-5 h-5 text-gray-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openFaq === i && (
                      <div className="px-5 pb-4 text-gray-600">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}
