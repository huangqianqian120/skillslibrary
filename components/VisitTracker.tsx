'use client'

import { useEffect } from 'react'

export function VisitTracker() {
  useEffect(() => {
    fetch('/api/visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page: window.location.pathname,
        referrer: document.referrer,
        ua: navigator.userAgent
      })
    }).catch(() => {})
  }, [])
  
  return null
}
