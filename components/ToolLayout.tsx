'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import AgentSidebar from '@/components/AgentSidebar'

/* ── Tool registry ── */
export const TOOL_REGISTRY = [
  { num: '01', name: 'Transcription',    slug: 'transcription',  icon: '🎙️', desc: 'Multi-speaker diarization with semantic chunking and click-to-seek search' },
  { num: '02', name: 'Editorial',        slug: 'editorial',      icon: '📋', desc: 'Guest intelligence from LinkedIn, press, Twitter — auto-generated edit briefs' },
  { num: '03', name: 'Reels',            slug: 'reels',          icon: '🎬', desc: 'AI finds, scores, and captions your best clips in 9:16, 1:1, and 16:9' },
  { num: '04', name: 'Content Pack',     slug: 'content-pack',   icon: '✍️', desc: 'Show notes, blog posts, titles, newsletters, social posts — all in your exact voice' },
  { num: '05', name: 'Visual Engine',    slug: 'visual-engine',  icon: '🎨', desc: 'Brand-aware thumbnails, quote cards, and audiogram frames rendered automatically' },
  { num: '06', name: 'Distribution',    slug: 'distribution',   icon: '📡', desc: 'Schedule across YouTube, Spotify, LinkedIn, TikTok with unified analytics' },
  { num: '07', name: 'Agent',           slug: 'agent',           icon: '🤖', desc: 'Your 24/7 AI producer — message it from Telegram, Discord, or WhatsApp' },
] as const

export type ToolSlug = typeof TOOL_REGISTRY[number]['slug']

interface ToolLayoutProps {
  /** The current tool's slug — used to highlight the icon strip and render the header */
  toolSlug: ToolSlug
  /** Optional: whether the tool is currently processing something */
  processing?: boolean
  /** The tool's main content */
  children: React.ReactNode
}

const ICON_STRIP_W = 72 // px

export default function ToolLayout({ toolSlug, processing = false, children }: ToolLayoutProps) {
  const router     = useRouter()
  const pathname   = usePathname()
  const [agentOpen, setAgentOpen] = useState(false)

  const tool = TOOL_REGISTRY.find(t => t.slug === toolSlug)!
  const f    = "'Inter', sans-serif"

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 56px)', overflow: 'hidden', fontFamily: f }}>

      {/* ══ ICON STRIP (left 72px) ══ */}
      <div style={{
        flexShrink: 0,
        width: `${ICON_STRIP_W}px`,
        borderRight: '1px solid var(--d-border)',
        background: 'var(--d-glass-bg)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '12px',
        gap: '4px',
        overflowY: 'auto',
      }}>
        {TOOL_REGISTRY.map(t => {
          const active = t.slug === toolSlug
          return (
            <button
              key={t.slug}
              title={t.name}
              onClick={() => {
                // Navigate within the dashboard by pushing to the correct tab
                // The dashboard uses activeNav state, so we'll emit a custom event
                window.dispatchEvent(new CustomEvent('dyspersia-nav', { detail: t.name === 'Reels' ? 'Reels' : t.name }))
              }}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                border: active ? '1px solid var(--d-accent-border)' : '1px solid transparent',
                background: active ? 'var(--d-accent-light)' : 'transparent',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '3px',
                transition: 'all 0.2s ease',
                position: 'relative',
              }}
              onMouseEnter={e => {
                if (!active) {
                  (e.currentTarget as HTMLButtonElement).style.background = 'var(--d-bg-secondary)'
                  ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--d-border)'
                }
              }}
              onMouseLeave={e => {
                if (!active) {
                  (e.currentTarget as HTMLButtonElement).style.background = 'transparent'
                  ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'transparent'
                }
              }}
            >
              {/* Active left-edge accent bar */}
              {active && (
                <span style={{
                  position: 'absolute',
                  left: '-13px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '3px',
                  height: '24px',
                  borderRadius: '0 3px 3px 0',
                  background: 'var(--d-accent)',
                }} />
              )}
              <span style={{ fontSize: '18px', lineHeight: 1 }}>{t.icon}</span>
              <span style={{
                fontSize: '8px',
                fontWeight: 600,
                color: active ? 'var(--d-accent)' : 'var(--d-text-muted)',
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
                lineHeight: 1,
              }}>
                {t.num}
              </span>
            </button>
          )
        })}

        {/* Agent toggle at the bottom */}
        <div style={{ flex: 1 }} />
        <button
          title="Dyspersia Agent"
          onClick={() => setAgentOpen(o => !o)}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            border: agentOpen ? '1px solid var(--d-accent-border)' : '1px solid var(--d-border)',
            background: agentOpen ? 'var(--d-accent)' : 'var(--d-glass-bg)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            marginBottom: '12px',
            transition: 'all 0.2s ease',
            boxShadow: agentOpen ? '0 0 16px rgba(16,185,129,0.3)' : 'none',
          }}
        >
          💬
        </button>
      </div>

      {/* ══ CONTENT AREA (fills remaining width) ══ */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        // Shrink when agent is open
        marginRight: agentOpen ? '340px' : '0',
        transition: 'margin-right 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>

        {/* ── Tool Header ── */}
        <div style={{
          flexShrink: 0,
          padding: '20px 28px 18px',
          borderBottom: '1px solid var(--d-border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--d-glass-bg)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {/* Tool number badge */}
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'var(--d-accent-light)',
              border: '1px solid var(--d-accent-border)',
              fontSize: '11px',
              fontWeight: 700,
              color: 'var(--d-accent)',
              fontFamily: "'IBM Plex Mono', monospace",
              flexShrink: 0,
            }}>
              {tool.num}
            </span>

            {/* Name + description */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '20px' }}>{tool.icon}</span>
                <h1 style={{
                  fontSize: '17px',
                  fontWeight: 800,
                  color: 'var(--d-text)',
                  letterSpacing: '-0.02em',
                  margin: 0,
                }}>
                  {tool.name}
                </h1>
              </div>
              <p style={{
                fontSize: '12px',
                color: 'var(--d-text-muted)',
                margin: '2px 0 0',
                lineHeight: 1.4,
              }}>
                {tool.desc}
              </p>
            </div>
          </div>

          {/* Status indicator */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '7px',
            padding: '5px 14px',
            borderRadius: '100px',
            border: `1px solid ${processing ? 'rgba(251,191,36,0.3)' : 'var(--d-accent-border)'}`,
            background: processing ? 'rgba(251,191,36,0.08)' : 'var(--d-accent-light)',
          }}>
            <span style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: processing ? '#fbbf24' : 'var(--d-accent)',
              animation: 'pulse-subtle 1.3s ease-in-out infinite',
              flexShrink: 0,
            }} />
            <span style={{
              fontSize: '12px',
              fontWeight: 600,
              color: processing ? '#fbbf24' : 'var(--d-accent)',
            }}>
              {processing ? 'Processing' : 'Idle'}
            </span>
          </div>
        </div>

        {/* ── Tool content ── */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>
          {children}
        </div>
      </div>

      {/* ══ AGENT SIDEBAR (collapsible from right) ══ */}
      {agentOpen && (
        <div style={{
          position: 'fixed',
          right: 0,
          /* Sits below the dashboard header (56px) */
          top: '56px',
          width: '340px',
          height: 'calc(100vh - 56px)',
          zIndex: 60,
        }}>
          <AgentSidebar isOpen={agentOpen} onClose={() => setAgentOpen(false)} />
        </div>
      )}
    </div>
  )
}
