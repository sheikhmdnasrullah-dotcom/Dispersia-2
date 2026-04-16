'use client'

import Link from 'next/link'
import { useState } from 'react'

function DiscordLogo() {
  return (
    <svg width="20" height="16" viewBox="0 0 127.14 96.36" xmlns="http://www.w3.org/2000/svg">
      <path d="M107.7 8.07A105.15 105.15 0 0 0 81.47 0a72.06 72.06 0 0 0-3.36 6.83 97.68 97.68 0 0 0-29.11 0A72.37 72.37 0 0 0 45.64 0 105.89 105.89 0 0 0 19.39 8.09C2.79 32.65-1.71 56.6.54 80.21A105.73 105.73 0 0 0 32.71 96.36a77.7 77.7 0 0 0 6.89-11.11 68.42 68.42 0 0 1-10.85-5.18c.91-.66 1.8-1.34 2.66-2a75.57 75.57 0 0 0 64.32 0c.87.71 1.76 1.39 2.66 2a68.68 68.68 0 0 1-10.87 5.19 77 77 0 0 0 6.89 11.1A105.25 105.25 0 0 0 126.6 80.22C129.24 52.84 122.09 29.11 107.7 8.07zM42.45 65.69C36.18 65.69 31 60 31 53s5-12.74 11.43-12.74S54 46 53.89 53s-5.05 12.69-11.44 12.69zm42.24 0C78.41 65.69 73.25 60 73.25 53s5-12.74 11.44-12.74S96.23 46 96.12 53s-5.04 12.69-11.43 12.69z" fill="#5865F2"/>
    </svg>
  )
}

function WhatsAppLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" fill="#25D366"/>
    </svg>
  )
}

function TelegramLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 496 512" xmlns="http://www.w3.org/2000/svg">
      <path d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7.2-.7.3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3.7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6.5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7 43.8 43.8 0 0 1 .5 10z" fill="#2AABEE"/>
    </svg>
  )
}

export default function AgentSection() {
  const [expanded, setExpanded] = useState(false)

  return (
    <section
      id="agent"
      style={{
        padding: '0 24px 80px',
        maxWidth: '960px',
        margin: '0 auto',
      }}
    >
      {/* ── Main compact card ── */}
      <div
        style={{
          background: 'var(--d-surface-solid)',
          border: '1px solid var(--d-border)',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: 'var(--d-shadow-md)',
          position: 'relative',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
          cursor: expanded ? 'default' : 'pointer',
        }}
        onClick={() => !expanded && setExpanded(true)}
        onMouseEnter={(e) => {
          if (expanded) return
          const el = e.currentTarget as HTMLElement
          el.style.borderColor = 'var(--d-accent-border)'
          el.style.boxShadow = '0 8px 40px rgba(0,0,0,0.10), 0 0 0 1px var(--d-accent-border)'
        }}
        onMouseLeave={(e) => {
          if (expanded) return
          const el = e.currentTarget as HTMLElement
          el.style.borderColor = 'var(--d-border)'
          el.style.boxShadow = 'var(--d-shadow-md)'
        }}
      >
        {/* Top ambient glow */}
        <div style={{
          position: 'absolute', top: '-60px', right: '-60px',
          width: '240px', height: '240px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16,185,129,0.10) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* ── Compact header — always visible ── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'clamp(20px, 3vw, 28px) clamp(24px, 4vw, 36px)',
          gap: '16px',
          position: 'relative',
          zIndex: 1,
        }}>
          {/* Left: identity */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: 0 }}>
            {/* Orb */}
            <div style={{
              width: '44px', height: '44px', borderRadius: '50%', flexShrink: 0,
              background: 'linear-gradient(135deg, rgba(16,185,129,0.20) 0%, rgba(16,185,129,0.06) 100%)',
              border: '1px solid var(--d-accent-border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '22px',
              boxShadow: '0 0 20px rgba(16,185,129,0.15)',
            }}>
              🤖
            </div>

            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                <span style={{
                  fontSize: '15px', fontWeight: 700,
                  color: 'var(--d-text)', letterSpacing: '-0.01em',
                }}>
                  Dyspersia Agent
                </span>
                {/* Live badge */}
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '5px',
                  fontSize: '10px', fontWeight: 700,
                  fontFamily: "'IBM Plex Mono', monospace", letterSpacing: '0.08em',
                  color: 'var(--d-accent)',
                  background: 'var(--d-accent-light)',
                  border: '1px solid var(--d-accent-border)',
                  padding: '2px 8px', borderRadius: '100px',
                }}>
                  <span style={{
                    width: '5px', height: '5px', borderRadius: '50%',
                    background: 'var(--d-accent)', flexShrink: 0,
                    animation: 'agent-pulse 2s ease-in-out infinite',
                    display: 'inline-block',
                  }} />
                  24/7
                </span>
              </div>
              <p style={{
                fontSize: '13px', color: 'var(--d-text-secondary)',
                margin: 0, lineHeight: 1.4,
              }}>
                Your AI producer — message it from any chat app
              </p>
            </div>
          </div>

          {/* Right: platform logos + expand hint */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.85 }}>
              <DiscordLogo />
              <WhatsAppLogo />
              <TelegramLogo />
            </div>
            {/* Chevron toggle */}
            <div
              onClick={(e) => { e.stopPropagation(); setExpanded(v => !v) }}
              style={{
                width: '28px', height: '28px', borderRadius: '8px',
                border: '1px solid var(--d-border)',
                background: 'var(--d-glass-bg)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, border-color 0.2s ease',
                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                fontSize: '11px', color: 'var(--d-text-muted)',
              }}
            >
              ↓
            </div>
          </div>
        </div>

        {/* ── Expanded detail panel — slides open on click ── */}
        <div style={{
          maxHeight: expanded ? '600px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}>
          <div style={{
            borderTop: '1px solid var(--d-border)',
            padding: 'clamp(24px, 4vw, 36px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
            position: 'relative', zIndex: 1,
          }}>

            {/* Platform cards */}
            {[
              { Logo: DiscordLogo,  name: 'Discord',  color: '#5865F2', desc: 'Send a command, get it done.' },
              { Logo: WhatsAppLogo, name: 'WhatsApp', color: '#25D366', desc: 'Voice note → full content pack.' },
              { Logo: TelegramLogo, name: 'Telegram', color: '#2AABEE', desc: 'Schedule, update, deploy — live.' },
            ].map(({ Logo, name, color, desc }) => (
              <div key={name} style={{
                background: 'var(--d-bg-secondary)',
                border: '1px solid var(--d-border)',
                borderRadius: '14px',
                padding: '20px',
                position: 'relative', overflow: 'hidden',
                transition: 'border-color 0.2s ease, transform 0.2s ease',
              }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = color + '55'
                  el.style.transform = 'translateY(-3px)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'var(--d-border)'
                  el.style.transform = 'translateY(0)'
                }}
              >
                <div style={{
                  position: 'absolute', top: '-20px', right: '-20px',
                  width: '90px', height: '90px', borderRadius: '50%',
                  background: `radial-gradient(circle, ${color}14 0%, transparent 70%)`,
                  pointerEvents: 'none',
                }} />
                <div style={{ marginBottom: '10px' }}><Logo /></div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--d-text)', marginBottom: '4px' }}>{name}</div>
                <div style={{ fontSize: '12px', color: 'var(--d-text-secondary)', lineHeight: 1.5 }}>{desc}</div>
              </div>
            ))}
          </div>

          {/* Capabilities + CTA row */}
          <div style={{
            borderTop: '1px solid var(--d-border-light)',
            padding: 'clamp(16px, 3vw, 24px) clamp(24px, 4vw, 36px)',
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap',
          }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
              {['⚡ Background workers', '🔁 Task queue', '📥 Auto-execute', '🕒 Scheduling'].map(c => (
                <span key={c} style={{
                  fontSize: '11px', fontWeight: 600, color: 'var(--d-text-muted)',
                  background: 'var(--d-glass-bg)', border: '1px solid var(--d-border)',
                  padding: '4px 10px', borderRadius: '7px',
                  fontFamily: "'IBM Plex Mono', monospace",
                }}>{c}</span>
              ))}
            </div>
            <Link href="/signup" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '10px 22px', background: 'var(--d-accent)', color: '#fff',
              textDecoration: 'none', fontSize: '13px', fontWeight: 700,
              borderRadius: '10px', flexShrink: 0,
              boxShadow: '0 4px 20px rgba(16,185,129,0.3)',
              transition: 'box-shadow 0.2s ease, transform 0.2s ease',
            }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.boxShadow = '0 6px 28px rgba(16,185,129,0.5)'
                el.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.boxShadow = '0 4px 20px rgba(16,185,129,0.3)'
                el.style.transform = 'translateY(0)'
              }}
            >
              Activate Agent →
            </Link>
          </div>
        </div>

        <style>{`
          @keyframes agent-pulse {
            0%, 100% { opacity: 1; }
            50%       { opacity: 0.4; }
          }
        `}</style>
      </div>
    </section>
  )
}
