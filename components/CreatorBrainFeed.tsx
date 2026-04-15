'use client'

import { useState, useEffect } from 'react'

const FEED_ENTRIES = [
  { time: '2 min ago',  action: 'Voice model updated from episode 38' },
  { time: '8 min ago',  action: 'Audience vocabulary synced from comments' },
  { time: '15 min ago', action: 'Brand color applied to 4 new clips' },
  { time: '24 min ago', action: 'Performance signal: LinkedIn post 3× average reach' },
]

// Always show 3 of the 4, cycling entry by entry every 3s
export default function CreatorBrainFeed() {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setOffset(o => (o + 1) % FEED_ENTRIES.length), 3000)
    return () => clearInterval(id)
  }, [])

  const visible = [0, 1, 2].map(i => FEED_ENTRIES[(offset + i) % FEED_ENTRIES.length])

  return (
    <div style={{
      marginTop: '16px',
      paddingTop: '14px',
      borderTop: '1px solid var(--d-border-light)',
    }}>
      {visible.map((entry, i) => (
        <div
          key={`${offset}-${i}`}
          style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'baseline',
            padding: '4px 0',
            animation: i === 0 ? 'msg-fade-in 0.4s ease both' : undefined,
          }}
        >
          <span style={{
            fontSize: '10px',
            fontFamily: "'IBM Plex Mono', 'Fira Code', monospace",
            color: 'var(--d-accent)',
            opacity: 0.7,
            flexShrink: 0,
            minWidth: '52px',
          }}>
            {entry.time}
          </span>
          <span style={{
            fontSize: '11px',
            fontFamily: "'IBM Plex Mono', 'Fira Code', monospace",
            color: 'var(--d-text-muted)',
            lineHeight: 1.5,
          }}>
            {entry.action}
          </span>
        </div>
      ))}
    </div>
  )
}
