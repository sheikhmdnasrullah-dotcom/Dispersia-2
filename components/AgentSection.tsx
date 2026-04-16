'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

/* ─── Platform logos as inline SVG ─────────────────────────────── */

function DiscordLogo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 127.14 96.36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M107.7 8.07A105.15 105.15 0 0 0 81.47 0a72.06 72.06 0 0 0-3.36 6.83 97.68 97.68 0 0 0-29.11 0A72.37 72.37 0 0 0 45.64 0 105.89 105.89 0 0 0 19.39 8.09C2.79 32.65-1.71 56.6.54 80.21A105.73 105.73 0 0 0 32.71 96.36a77.7 77.7 0 0 0 6.89-11.11 68.42 68.42 0 0 1-10.85-5.18c.91-.66 1.8-1.34 2.66-2a75.57 75.57 0 0 0 64.32 0c.87.71 1.76 1.39 2.66 2a68.68 68.68 0 0 1-10.87 5.19 77 77 0 0 0 6.89 11.1 105.25 105.25 0 0 0 32.19-16.14C129.24 52.84 122.09 29.11 107.7 8.07zM42.45 65.69C36.18 65.69 31 60 31 53s5-12.74 11.43-12.74S54 46 53.89 53s-5.05 12.69-11.44 12.69zm42.24 0C78.41 65.69 73.25 60 73.25 53s5-12.74 11.44-12.74S96.23 46 96.12 53s-5.04 12.69-11.43 12.69z"
        fill="#5865F2"
      />
    </svg>
  )
}

function WhatsAppLogo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 448 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
        fill="#25D366"
      />
    </svg>
  )
}

function TelegramLogo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 496 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7.2-.7.3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3.7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6.5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7 43.8 43.8 0 0 1 .5 10z"
        fill="#2AABEE"
      />
    </svg>
  )
}

/* ─── Animated scan-line canvas effect ──────────────────────────── */
function ScanLines() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let frame = 0
    let raf: number
    const draw = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      // Subtle horizontal scan lines
      for (let y = 0; y < canvas.height; y += 3) {
        ctx.fillStyle = `rgba(16,185,129,${0.018 + 0.006 * Math.sin(y * 0.05 + frame * 0.02)})`
        ctx.fillRect(0, y, canvas.width, 1)
      }
      // Moving bright scan bar
      const scanY = (frame * 1.2) % canvas.height
      const grad = ctx.createLinearGradient(0, scanY - 12, 0, scanY + 12)
      grad.addColorStop(0, 'rgba(16,185,129,0)')
      grad.addColorStop(0.5, 'rgba(16,185,129,0.06)')
      grad.addColorStop(1, 'rgba(16,185,129,0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, scanY - 12, canvas.width, 24)
      frame++
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(raf)
  }, [])
  return (
    <canvas
      ref={ref}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, borderRadius: 'inherit' }}
    />
  )
}

/* ─── Main export ────────────────────────────────────────────────── */
export default function AgentSection() {
  const platforms = [
    { name: 'Discord',  logo: <DiscordLogo size={32} />,  color: '#5865F2', tagline: 'Send a command, get it done' },
    { name: 'WhatsApp', logo: <WhatsAppLogo size={32} />, color: '#25D366', tagline: 'Voice note → full content pack' },
    { name: 'Telegram', logo: <TelegramLogo size={32} />, color: '#2AABEE', tagline: 'Schedule, update, deploy — live' },
  ]

  return (
    <section
      id="agent"
      style={{
        position: 'relative',
        padding: '120px 24px 140px',
        overflow: 'hidden',
      }}
    >
      {/* ── Background — dark panel that feels distinct from rest of page ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'var(--d-bg-secondary)',
        borderTop: '1px solid var(--d-border)',
        borderBottom: '1px solid var(--d-border)',
        zIndex: 0,
      }} />

      {/* Dot grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(16,185,129,0.12) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)',
      }} />

      {/* Green glow at center */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(16,185,129,0.10) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ maxWidth: '960px', margin: '0 auto', position: 'relative', zIndex: 2 }}>

        {/* ── Section label ── */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em',
            color: 'var(--d-accent)', textTransform: 'uppercase',
            background: 'var(--d-accent-light)',
            border: '1px solid var(--d-accent-border)',
            padding: '6px 16px', borderRadius: '100px',
          }}>
            {/* Live pulse dot */}
            <span style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: 'var(--d-accent)',
              boxShadow: '0 0 0 0 rgba(16,185,129,0.5)',
              animation: 'agent-pulse 2s ease-in-out infinite',
              display: 'inline-block', flexShrink: 0,
            }} />
            Beyond Tools
          </span>
        </div>

        {/* ── Main agent card ── */}
        <div style={{
          background: 'var(--d-surface-solid)',
          border: '1px solid var(--d-border)',
          borderRadius: '28px',
          overflow: 'hidden',
          boxShadow: '0 0 0 1px var(--d-accent-border), 0 32px 80px rgba(0,0,0,0.15), 0 0 120px rgba(16,185,129,0.06)',
          position: 'relative',
        }}>
          <ScanLines />

          <div style={{
            position: 'relative', zIndex: 1,
            padding: 'clamp(40px, 6vw, 72px)',
          }}>

            {/* Top row: orb + headline */}
            <div style={{
              display: 'flex', gap: 'clamp(32px, 5vw, 64px)',
              alignItems: 'center', flexWrap: 'wrap',
              marginBottom: 'clamp(40px, 5vw, 64px)',
            }}>

              {/* ── Orb ── */}
              <div style={{ flexShrink: 0, position: 'relative', width: '120px', height: '120px' }}>
                {/* Outer rings */}
                {[0, 1, 2].map(ri => (
                  <div key={ri} style={{
                    position: 'absolute',
                    inset: `${-(ri + 1) * 14}px`,
                    borderRadius: '50%',
                    border: `1px solid rgba(16,185,129,${0.25 - ri * 0.07})`,
                    animation: `agent-ring ${2.5 + ri * 0.8}s ease-in-out infinite`,
                    animationDelay: `${ri * 0.4}s`,
                  }} />
                ))}
                {/* Core */}
                <div style={{
                  width: '120px', height: '120px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(16,185,129,0.20) 0%, rgba(16,185,129,0.06) 100%)',
                  border: '1.5px solid var(--d-accent-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 0 40px rgba(16,185,129,0.18), inset 0 0 24px rgba(16,185,129,0.08)',
                  animation: 'agent-breathe 4s ease-in-out infinite',
                  position: 'relative', zIndex: 1,
                }}>
                  <span style={{ fontSize: '48px', lineHeight: 1, filter: 'drop-shadow(0 0 12px rgba(16,185,129,0.5))' }}>🤖</span>
                </div>
              </div>

              {/* ── Headline ── */}
              <div style={{ flex: 1, minWidth: '240px' }}>
                <p style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em',
                  color: 'var(--d-accent)', opacity: 0.75,
                  textTransform: 'uppercase', margin: '0 0 12px',
                }}>
                  DYSPERSIA AGENT
                </p>
                <h2 style={{
                  fontSize: 'clamp(28px, 4.5vw, 48px)', fontWeight: 800,
                  letterSpacing: '-0.035em', lineHeight: 1.05,
                  color: 'var(--d-text)', margin: '0 0 16px',
                }}>
                  Your 24/7 AI producer.<br />
                  <span style={{ color: 'var(--d-accent)' }}>Always on.</span>
                </h2>
                <p style={{
                  fontSize: 'clamp(14px, 1.6vw, 16px)',
                  color: 'var(--d-text-secondary)', lineHeight: 1.75,
                  margin: '0 0 24px', maxWidth: '420px',
                }}>
                  Message the Agent from your favourite chat app. It listens, executes, and delivers — while you sleep.
                </p>

                {/* Status chip */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '7px',
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em',
                    color: 'var(--d-accent)',
                    background: 'var(--d-accent-light)', border: '1px solid var(--d-accent-border)',
                    padding: '5px 13px', borderRadius: '8px',
                  }}>
                    <span style={{
                      width: '6px', height: '6px', borderRadius: '50%',
                      background: 'var(--d-accent)',
                      animation: 'agent-pulse 1.6s ease-in-out infinite',
                      display: 'inline-block',
                    }} />
                    ONLINE
                  </span>
                  <span style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '11px', color: 'var(--d-text-muted)',
                    letterSpacing: '0.06em',
                  }}>
                    24h · 7d · 365y
                  </span>
                </div>
              </div>
            </div>

            {/* ── Divider ── */}
            <div style={{
              height: '1px',
              background: 'linear-gradient(90deg, transparent, var(--d-accent-border), var(--d-border), transparent)',
              marginBottom: 'clamp(32px, 4vw, 48px)',
            }} />

            {/* ── Platform cards ── */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 'clamp(12px, 2vw, 20px)',
              marginBottom: 'clamp(32px, 4vw, 48px)',
            }}>
              {platforms.map((p) => (
                <div
                  key={p.name}
                  className="agent-platform-card"
                  style={{
                    background: 'var(--d-bg-secondary)',
                    border: '1px solid var(--d-border)',
                    borderRadius: '18px',
                    padding: 'clamp(20px, 3vw, 28px)',
                    position: 'relative', overflow: 'hidden',
                    transition: 'border-color 0.25s ease, transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = p.color + '55'
                    el.style.transform = 'translateY(-4px)'
                    el.style.boxShadow = `0 12px 40px ${p.color}22`
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = 'var(--d-border)'
                    el.style.transform = 'translateY(0)'
                    el.style.boxShadow = 'none'
                  }}
                >
                  {/* Platform color orb */}
                  <div style={{
                    position: 'absolute', top: '-30px', right: '-30px',
                    width: '120px', height: '120px', borderRadius: '50%',
                    background: `radial-gradient(circle, ${p.color}18 0%, transparent 70%)`,
                    pointerEvents: 'none',
                  }} />

                  {/* Logo */}
                  <div style={{
                    marginBottom: '14px',
                    filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.12))',
                    position: 'relative', zIndex: 1,
                  }}>
                    {p.logo}
                  </div>

                  <h3 style={{
                    fontSize: '16px', fontWeight: 700,
                    color: 'var(--d-text)', margin: '0 0 6px',
                    letterSpacing: '-0.02em', position: 'relative', zIndex: 1,
                  }}>
                    {p.name}
                  </h3>
                  <p style={{
                    fontSize: '13px', color: 'var(--d-text-secondary)',
                    lineHeight: 1.5, margin: '0 0 14px', position: 'relative', zIndex: 1,
                  }}>
                    {p.tagline}
                  </p>

                  {/* "Connected" pill */}
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '5px',
                    fontSize: '10px', fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace",
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    color: 'var(--d-accent)',
                    background: 'var(--d-accent-light)',
                    border: '1px solid var(--d-accent-border)',
                    padding: '3px 10px', borderRadius: '100px',
                    position: 'relative', zIndex: 1,
                  }}>
                    <span style={{
                      width: '4px', height: '4px', borderRadius: '50%',
                      background: 'var(--d-accent)', flexShrink: 0,
                      animation: 'agent-pulse 2s ease-in-out infinite',
                      display: 'inline-block',
                    }} />
                    Connected
                  </span>
                </div>
              ))}
            </div>

            {/* ── Capability strip ── */}
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: '8px',
              marginBottom: 'clamp(32px, 4vw, 48px)',
            }}>
              {[
                '⚡ Background workers',
                '🔁 Task queue',
                '📥 Auto-execute briefs',
                '🕒 Scheduled publishing',
                '📊 Live analytics pings',
                '🎙️ Voice-to-content',
                '🛡️ Zero-downtime',
              ].map((cap) => (
                <span key={cap} style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '11px', fontWeight: 600, letterSpacing: '0.04em',
                  color: 'var(--d-text-secondary)',
                  background: 'var(--d-glass-bg)',
                  border: '1px solid var(--d-border)',
                  padding: '6px 12px', borderRadius: '8px',
                  backdropFilter: 'blur(8px)',
                }}>
                  {cap}
                </span>
              ))}
            </div>

            {/* ── CTA row ── */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="/signup" style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                padding: '14px 32px',
                background: 'var(--d-accent)',
                color: '#fff',
                textDecoration: 'none', fontSize: '15px', fontWeight: 700,
                borderRadius: '12px',
                letterSpacing: '-0.01em',
                boxShadow: '0 4px 24px rgba(16,185,129,0.35)',
                transition: 'box-shadow 0.25s ease, transform 0.2s ease',
              }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.boxShadow = '0 8px 40px rgba(16,185,129,0.5)'
                  el.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.boxShadow = '0 4px 24px rgba(16,185,129,0.35)'
                  el.style.transform = 'translateY(0)'
                }}
              >
                <span>Activate the Agent</span>
                <span style={{ fontSize: '16px' }}>→</span>
              </Link>
              <span style={{
                fontSize: '13px', color: 'var(--d-text-muted)',
                fontFamily: "'IBM Plex Mono', monospace",
                letterSpacing: '0.04em',
              }}>
                No setup. Just message it.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── CSS keyframes injected via style tag ─── */}
      <style>{`
        @keyframes agent-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.45); opacity: 1; }
          50%       { box-shadow: 0 0 0 6px rgba(16,185,129,0); opacity: 0.7; }
        }
        @keyframes agent-ring {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50%       { opacity: 0.2; transform: scale(1.04); }
        }
        @keyframes agent-breathe {
          0%, 100% { box-shadow: 0 0 40px rgba(16,185,129,0.18), inset 0 0 24px rgba(16,185,129,0.08); }
          50%       { box-shadow: 0 0 60px rgba(16,185,129,0.30), inset 0 0 32px rgba(16,185,129,0.14); }
        }
        @media (max-width: 640px) {
          .agent-platform-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
