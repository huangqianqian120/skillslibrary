'use client'

import Link from 'next/link'

interface BackButtonProps {
  href?: string
  onClick?: () => void
  text?: string
}

export default function BackButton({ href = '/', onClick, text = '返回' }: BackButtonProps) {
  const content = (
    <button
      className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition-colors"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      {text}
    </button>
  )

  if (onClick) {
    return <button onClick={onClick}>{content}</button>
  }

  return <Link href={href}>{content}</Link>
}
