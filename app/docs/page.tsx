'use client'

import { useState } from 'react'
import Link from 'next/link'
import BackButton from '../components/BackButton'

const faqs = [
  {
    question: "如何查找需要的 Skill？",
    answer: "在首页可以使用分类筛选、场景筛选或搜索功能。点击分类标签或场景标签来过滤。"
  },
  {
    question: "如何安装 Skill？",
    answer: "每个 Skill 详情页都有 GitHub 链接，可以直接从仓库克隆或参考 SKILL.md 手动安装。"
  },
  {
    question: "如何创建新 Skill？",
    answer: "点击顶部的「创建 Skill」按钮，按照向导流程：描述需求 → AI 生成 → 保存。"
  },
  {
    question: "Skill 的结构是什么？",
    answer: "每个 Skill 由 SKILL.md 定义，包含 name、description、metadata 等字段。"
  },
  {
    question: "支持哪些分类？",
    answer: "10大分类：AI、Automation、Business、Communication、Data、Development、Lifestyle、Media、Productivity。"
  },
  {
    question: "哪些场景？",
    answer: "6大场景：开发者(Developer)、写作者(Writer)、效率党(Organizer)、媒体创作(Media)、监控追踪(Monitor)、商业(Business)。"
  },
  {
    question: "Skill 需要特定模型吗？",
    answer: "部分 Skill 需要特定 LLM 模型，详情页会标注「推荐模型」。"
  }
]

const sections = [
  { id: 'what-is-skill', label: '什么是 Skill' },
  { id: 'structure', label: 'Skill 结构' },
  { id: 'categories', label: '分类' },
  { id: 'scenes', label: '场景' },
  { id: 'creating', label: '创建 Skill' },
  { id: 'metadata', label: 'Skill 元数据' },
  { id: 'faq', label: 'FAQ' },
]

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <BackButton />
        
        <h1 className="text-3xl font-bold text-gray-900 mt-6 mb-8">
          Skills Library 文档
        </h1>

        {/* Table of Contents */}
        <nav className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-sm font-semibold text-gray-500 mb-3">目录</h2>
          <div className="flex flex-wrap gap-3">
            {sections.map(s => (
              <a key={s.id} href={`#${s.id}`} className="text-sm text-blue-600 hover:underline">
                {s.label}
              </a>
            ))}
          </div>
        </nav>

        {/* Content */}
        <div className="space-y-12">
          <section id="what-is-skill">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">什么是 Skill</h2>
            <p className="text-gray-600">
              Skill（技能）是 OpenClaw Agent 的功能模块。每个 Skill 定义了特定的能力，
              可以被 AI Agent 调用来执行任务。
            </p>
          </section>

          <section id="structure">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Skill 结构</h2>
            <p className="text-gray-600 mb-4">
              Skill 由 SKILL.md 文件定义，包含以下字段：
            </p>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`---
name: skill-name
description: "Skill 描述"
metadata:
  openclaw:
    emoji: "🔧"
    requires:
      env: [API_KEY]  # 环境变量
      bins: [curl]     # 需要的命令行工具
---`}
            </pre>
          </section>

          <section id="categories">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">分类</h2>
            <p className="text-gray-600 mb-4">10大分类：</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {['AI', 'Automation', 'Business', 'Communication', 'Data', 'Development', 'Lifestyle', 'Media', 'Productivity', 'All'].map(cat => (
                <span key={cat} className="px-3 py-1 bg-gray-100 rounded-full text-sm">{cat}</span>
              ))}
            </div>
          </section>

          <section id="scenes">
            <h2 className="text-2xl bold text-gray-900 mb-4">场景</h2>
            <p className="text-gray-600 mb-4">6大场景，按用户角色划分：</p>
            <div className="space-y-3">
              {[
                { id: 'developer', name: '💻 开发者', desc: '编程、调试、发布' },
                { id: 'writer', name: '✍️ 写作者', desc: '写作、编辑、发布' },
                { id: 'organizer', name: '📋 效率党', desc: '任务、笔记、提醒' },
                { id: 'media', name: '🎨 媒体创作', desc: '图片、音频、视频' },
                { id: 'monitor', name: '👀 监控追踪', desc: '追踪更新和动态' },
                { id: 'business', name: '💼 商业', desc: '商业和营销' },
              ].map(s => (
                <div key={s.id} className="p-3 border rounded-lg">
                  <span className="font-medium">{s.name}</span>
                  <span className="text-gray-500 text-sm ml-2">- {s.desc}</span>
                </div>
              ))}
            </div>
          </section>

          <section id="creating">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">创建 Skill</h2>
            <p className="text-gray-600 mb-4">
              点击顶部的「创建 Skill」按钮，通过 AI 向导创建新 Skill。
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>描述你的需求</li>
              <li>AI 分析并完善需求</li>
              <li>生成 Skill 代码</li>
              <li>保存到个人列表</li>
            </ol>
          </section>

          <section id="metadata">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Skill 元数据</h2>
            <p className="text-gray-600 mb-4">详情页显示以下信息：</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li><strong>评分</strong> - 用户评分 (1-5星)</li>
              <li><strong>安装量</strong> - 安装次数</li>
              <li><strong>版本</strong> - Skill 版本号</li>
              <li><strong>作者</strong> - 创建者</li>
              <li><strong>推荐模型</strong> - 需要特定 LLM 时显示</li>
            </ul>
          </section>

          <section id="faq" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">FAQ</h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b pb-4">
                  <h3 className="font-medium text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600 text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
