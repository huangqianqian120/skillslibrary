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
    question: "如何创建新 Skill？",
    answer: "点击顶部的「创建 Skill」按钮，按照向导流程：描述需求 → AI 生成 → 保存。"
  },
  {
    question: "Skill 的结构是什么？",
    answer: "每个 Skill 由 SKILL.md 定义，包含 name、description、metadata 等字段。"
  },
  {
    question: "Skill 和场景是什么关系？",
    answer: "场景是按用户角色划分的技能集合，如开发者、写作者、商业等。每个场景下包含相关的 Skills。"
  }
]

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <BackButton />
        
        <h1 className="text-3xl font-bold text-gray-900 mt-6 mb-8">
          Skills Library 文档
        </h1>

        <div className="space-y-12">
          {/* 什么是 Skill */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">什么是 Skill</h2>
            <p className="text-gray-600">
              Skill（技能）是 OpenClaw Agent 的功能模块。每个 Skill 定义了特定的能力，
              可以被 AI Agent 调用来执行任务。Skill 由 SKILL.md 文件定义。
            </p>
          </section>

          {/* Skill 是怎么工作的 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Skill 是怎么工作的？</h2>
            <div className="space-y-4 text-gray-600">
              <p>1. <strong>定义</strong>：每个 Skill 通过 SKILL.md 描述自己的功能、适用场景、调用方式</p>
              <p>2. <strong>触发</strong>：当用户需求匹配 Skill 的描述时，AI Agent 自动调用对应 Skill</p>
              <p>3. <strong>执行</strong>：Skill 执行预定义的操作（调用 API、运行命令等）</p>
              <p>4. <strong>返回</strong>：结果返回给 AI Agent，再呈现给用户</p>
            </div>
            <pre className="mt-4 bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`---
name: weather
description: "获取天气信息"
metadata:
  openclaw:
    emoji: "🌤️"
    requires:
      bins: [curl]
---`}
            </pre>
          </section>

          {/* 场景 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">场景</h2>
            <p className="text-gray-600 mb-4">场景是按用户角色划分的技能集合：</p>
            <div className="grid gap-3">
              {[
                { name: '💻 开发者', desc: '编程、调试、发布', skills: 'github, frontend, healthcheck...' },
                { name: '✍️ 写作者', desc: '写作、编辑、发布', skills: 'notion, copywriting, brainstorming...' },
                { name: '📋 效率党', desc: '任务、笔记、提醒', skills: 'notion, analytics-tracking, growth...' },
                { name: '🎨 媒体创作', desc: '图片、音频、视频', skills: 'nano-pdf, tavily, image-gen...' },
                { name: '👀 监控追踪', desc: '追踪更新和动态', skills: 'weather, blogwatcher, competitor-tracker...' },
                { name: '💼 商业', desc: '商业和营销', skills: 'marketing-ideas, seo-audit, location-advisor...' },
              ].map(s => (
                <div key={s.name} className="p-4 border rounded-lg">
                  <div className="font-medium">{s.name} - {s.desc}</div>
                  <div className="text-sm text-gray-500 mt-1">包含: {s.skills}</div>
                </div>
              ))}
            </div>
          </section>

          {/* 创建 Skill */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">创建 Skill</h2>
            <p className="text-gray-600 mb-4">点击顶部的「创建 Skill」按钮创建新 Skill：</p>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>描述你的需求</li>
              <li>AI 分析并完善需求</li>
              <li>生成 Skill 代码</li>
              <li>保存到个人列表</li>
            </ol>
          </section>

          {/* FAQ */}
          <section>
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
