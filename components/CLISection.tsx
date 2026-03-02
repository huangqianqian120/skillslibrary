'use client'

import { useState } from 'react'

export function CLISection() {
  const [copied, setCopied] = useState('')

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopied(code)
    setTimeout(() => setCopied(''), 2000)
  }

  const cliCommands = [
    { cmd: 'skills list', desc: 'List all available skills' },
    { cmd: 'skills info', desc: 'Show detailed skill information' },
    { cmd: 'skills check', desc: 'Check skills ready vs missing' },
  ]

  return (
    <div className="mb-8 p-4 bg-gray-50 rounded-xl border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">💻</span>
        <div>
          <h2 className="text-base font-semibold text-gray-900">Use CLI</h2>
          <p className="text-xs text-gray-400">Command line interface</p>
        </div>
      </div>

      {/* Install */}
      <div className="mb-3">
        <h3 className="text-sm font-medium text-gray-500 mb-2">1. Install</h3>
        <div className="flex items-center gap-2">
          <code className="bg-gray-100 px-2 py-1.5 rounded text-xs font-mono text-gray-700 flex-1">
            npm install -g openclaw
          </code>
          <button
            onClick={() => copyCode('npm install -g openclaw')}
            className="px-2 py-1.5 bg-gray-200 hover:bg-gray-300 rounded text-xs transition"
          >
            {copied === 'npm install -g openclaw' ? '✓' : '📋'}
          </button>
        </div>
      </div>

      {/* Commands */}
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-2">2. Commands</h3>
        <div className="grid grid-cols-2 gap-2">
          {cliCommands.map(({ cmd, desc }) => (
            <div key={cmd} className="text-xs">
              <code className="text-gray-700 font-mono">{cmd}</code>
              <span className="text-gray-400 ml-1">- {desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
