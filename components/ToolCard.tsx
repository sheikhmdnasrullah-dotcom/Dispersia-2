'use client'

import Link from 'next/link'

interface ToolCardProps {
  title: string
  description: string
  status: 'ready' | 'coming-soon'
  href: string
}

export default function ToolCard({ title, description, status, href }: ToolCardProps) {
  return (
    <div
      style={{
        background: '#0f0f0f',
        border: '1px solid rgba(255,255,255,0.06)',
        padding: '24px',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        position: 'relative',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement
        el.style.borderColor = 'rgba(0,255,128,0.25)'
        el.style.boxShadow = '0 0 20px rgba(0,255,128,0.08)'
        el.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement
        el.style.borderColor = 'rgba(255,255,255,0.06)'
        el.style.boxShadow = 'none'
        el.style.transform = 'translateY(0)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: '15px',
            color: '#ffffff',
          }}
        >
          {title}
        </span>
        <span
          style={{
            fontSize: '10px',
            fontFamily: "'IBM Plex Mono', monospace",
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            padding: '4px 10px',
            borderRadius: '2px',
            ...(status === 'ready'
              ? {
                  color: '#00FF80',
                  background: 'rgba(0,255,128,0.08)',
                  border: '1px solid rgba(0,255,128,0.2)',
                }
              : {
                  color: 'rgba(255,255,255,0.3)',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }),
          }}
        >
          {status === 'ready' ? 'READY' : 'COMING SOON'}
        </span>
      </div>

      <p
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '12px',
          color: 'rgba(255,255,255,0.4)',
          lineHeight: '1.6',
          marginBottom: '20px',
        }}
      >
        {description}
      </p>

      <Link
        href={href}
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '11px',
          color: '#00FF80',
          textDecoration: 'none',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        OPEN →
      </Link>
    </div>
  )
}
