'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import TerminalMockup from '@/components/TerminalMockup'
import CreatorBrainFeed from '@/components/CreatorBrainFeed'
import FaqAccordion from '@/components/FaqAccordion'

const TOOLS = [
  {
    num: '01', name: 'Transcription', desc: 'Multi-speaker diarization with semantic chunking and click-to-seek search', icon: '🎙️', size: 'wide',
    bullets: ['Multi-speaker diarization', 'Click-to-seek editor', 'Cross-episode semantic search'],
  },
  {
    num: '02', name: 'Editorial Direction', desc: 'Guest intelligence from LinkedIn, press, Twitter — auto-generated edit briefs', icon: '📋', size: 'normal',
    bullets: ['Apify guest research', 'Timestamped edit brief', 'Asset sourcing with links'],
  },
  {
    num: '03', name: 'Podcast to Reels', desc: 'AI finds, scores, and captions your best clips in 9:16, 1:1, and 16:9', icon: '🎬', size: 'normal',
    bullets: ['AI virality scoring', 'Word-level captions', '9:16 + 1:1 + 16:9 in one click'],
  },
  {
    num: '04', name: 'Content Pack', desc: 'Show notes, blog posts, titles, newsletters, social posts — all in your exact voice', icon: '✍️', size: 'wide',
    bullets: ['10 content formats at once', 'Written in your exact voice', 'Prompt enhancer built in'],
  },
  {
    num: '05', name: 'Visual Engine', desc: 'Brand-aware thumbnails, quote cards, and audiogram frames rendered automatically', icon: '🎨', size: 'normal',
    bullets: ['Brand-aware rendering', 'Thumbnail + quote cards + audiogram', 'Puppeteer renderer'],
  },
  {
    num: '06', name: 'Distribution', desc: 'Schedule across YouTube, Spotify, LinkedIn, TikTok with unified analytics', icon: '📡', size: 'normal',
    bullets: ['YouTube + Spotify + LinkedIn + Twitter', 'Unified analytics dashboard', 'Performance feedback loop'],
  },
  {
    num: '07', name: 'Dyspersia Agent', desc: 'Your 24/7 AI producer — message it from Telegram, Discord, or WhatsApp', icon: '🤖', size: 'wide',
    bullets: ['Discord + Telegram + WhatsApp', '24/7 background worker', 'Task queue with auto-execution'],
  },
]

const PRICING = [
  {
    name: 'Starter', price: '$49', annualPrice: '$39',
    features: ['3 episodes/month', 'All content tools', 'Transcription + Reels', 'Email support'],
    toolIcons: [
      { emoji: '🎙️', label: 'Transcription' },
      { emoji: '✍️', label: 'Content Pack' },
      { emoji: '🎬', label: 'Reels' },
    ],
  },
  {
    name: 'Pro', price: '$99', annualPrice: '$79', badge: true,
    features: ['15 episodes/month', 'Everything in Starter', 'Editorial Direction', 'Dyspersia Agent (web)', 'Priority processing'],
    toolIcons: [
      { emoji: '🎙️', label: 'Transcription' },
      { emoji: '✍️', label: 'Content Pack' },
      { emoji: '🎬', label: 'Reels' },
      { emoji: '📋', label: 'Editorial' },
      { emoji: '🤖', label: 'Agent (web)' },
      { emoji: '🎨', label: 'Visuals' },
    ],
  },
  {
    name: 'Studio', price: '$199', annualPrice: '$159',
    features: ['Unlimited episodes', 'Everything in Pro', 'Agent everywhere', 'Visual Engine', 'Distribution + Analytics'],
    toolIcons: [
      { emoji: '🎙️', label: 'Transcription' },
      { emoji: '✍️', label: 'Content Pack' },
      { emoji: '🎬', label: 'Reels' },
      { emoji: '📋', label: 'Editorial' },
      { emoji: '🤖', label: 'Agent (web)' },
      { emoji: '🎨', label: 'Visuals' },
      { emoji: '💬', label: 'Agent everywhere' },
      { emoji: '📡', label: 'Distribution' },
      { emoji: '♾️', label: 'Unlimited' },
    ],
  },
]

export default function HomePage() {
  const f = "'Inter', sans-serif"
  const [hoveredTool, setHoveredTool] = useState<string | null>(null)
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')
  const isAnnual = billingCycle === 'annual'

  return (
    <div style={{ minHeight: '100vh', fontFamily: f, overflow: 'hidden' }}>
      {/* ── NAV ── */}
      <Navbar />

      {/* ── HERO ── */}
      <section style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center', textAlign: 'center',
        padding: '120px 24px 80px', position: 'relative',
      }}>
        {/* Animated grid background */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          backgroundImage:
            'linear-gradient(rgba(16,185,129,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.07) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          animation: 'grid-pulse 6s ease-in-out infinite',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
        }} />
        {/* Floating blobs */}
        <div className="blob blob-1" style={{ top: '10%', left: '10%' }} />
        <div className="blob blob-2" style={{ top: '60%', right: '5%' }} />
        <div className="blob blob-3" style={{ bottom: '10%', left: '30%' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(44px, 7vw, 80px)', fontWeight: 800, lineHeight: 1.05,
            marginBottom: '24px', letterSpacing: '-0.04em',
          }}>
            <span style={{ color: 'var(--d-text)' }}>The AI brain for</span>
            <br />
            <span className="gradient-text">podcast creators.</span>
          </h1>

          {/* Subhead */}
          <p style={{
            fontSize: '17px', color: 'var(--d-text-secondary)', lineHeight: 1.7,
            maxWidth: '500px', margin: '0 auto 36px', fontWeight: 400,
          }}>
            Upload one episode. Get clips, captions, show notes, titles, newsletters,
            thumbnails and more — all written in your exact voice.
          </p>

          {/* CTA */}
          <div className="hero-cta-row" style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '16px' }}>
            <Link href="/signup" style={{
              padding: '14px 32px', background: 'var(--d-accent)', color: '#fff',
              textDecoration: 'none', fontSize: '15px', fontWeight: 600, borderRadius: '10px',
              transition: 'all 0.2s ease', boxShadow: '0 4px 24px rgba(16,185,129,0.25)',
            }}>Start for free →</Link>
            <Link href="/login" style={{
              padding: '14px 32px', background: 'var(--d-glass-bg)', backdropFilter: 'blur(12px)',
              border: '1px solid var(--d-border)', color: 'var(--d-text-secondary)',
              textDecoration: 'none', fontSize: '15px', fontWeight: 500, borderRadius: '10px',
              transition: 'all 0.2s ease',
            }}>Log in</Link>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--d-text-muted)' }}>
            No credit card · First episode free · Cancel anytime
          </p>
        </div>

        {/* Animated terminal mockup */}
        <TerminalMockup />
      </section>

      {/* ── TOOLS (Bento Grid) ── */}
      <section id="tools" style={{ maxWidth: '1000px', margin: '0 auto', padding: '100px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em' }}>
            <span className="gradient-text">TOOLS</span>
          </span>
          <h2 style={{ fontSize: '36px', fontWeight: 800, marginTop: '8px', letterSpacing: '-0.03em', color: 'var(--d-text)' }}>
            Everything you need. Nothing you don&apos;t.
          </h2>
        </div>

        <div className="bento-grid">
          {TOOLS.map((tool, i) => {
            const isHovered = hoveredTool === tool.num
            return (
              <div
                key={tool.num}
                className="glass-card"
                onMouseEnter={() => setHoveredTool(tool.num)}
                onMouseLeave={() => setHoveredTool(null)}
                style={{
                  padding: '28px',
                  cursor: 'default',
                  gridColumn: tool.size === 'wide' ? 'span 2' : 'span 1',
                  animation: `fade-in 0.4s ease ${i * 0.06}s both`,
                  transform: isHovered ? 'scale(1.025) translateY(-3px)' : 'scale(1) translateY(0)',
                  transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s ease, box-shadow 0.3s ease',
                  boxShadow: isHovered ? '0 12px 40px rgba(16,185,129,0.12)' : undefined,
                  zIndex: isHovered ? 2 : 1,
                  position: 'relative',
                }}
              >
                {/* Existing header row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '24px' }}>{tool.icon}</span>
                  <div>
                    <span style={{ fontSize: '10px', color: 'var(--d-text-muted)', fontWeight: 500 }}>{tool.num}</span>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--d-text)', letterSpacing: '-0.01em', lineHeight: 1.2 }}>{tool.name}</h3>
                  </div>
                </div>

                {/* Existing description */}
                <p style={{ fontSize: '14px', color: 'var(--d-text-secondary)', lineHeight: 1.6 }}>{tool.desc}</p>

                {/* ── Reveal layer ── */}
                <div style={{
                  overflow: 'hidden',
                  maxHeight: isHovered ? '160px' : '0px',
                  opacity: isHovered ? 1 : 0,
                  transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease',
                }}>
                  <div style={{
                    marginTop: '16px',
                    paddingTop: '14px',
                    borderTop: '1px solid var(--d-border)',
                  }}>
                    {/* Bullet points */}
                    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '7px' }}>
                      {tool.bullets.map((b) => (
                        <li key={b} style={{ display: 'flex', alignItems: 'center', gap: '9px', fontSize: '13px', color: 'var(--d-text-secondary)', lineHeight: 1.5 }}>
                          <span style={{
                            width: '5px', height: '5px', borderRadius: '50%',
                            background: 'var(--d-accent)', flexShrink: 0, opacity: 0.85,
                          }} />
                          {b}
                        </li>
                      ))}
                    </ul>

                    {/* Tool number pill */}
                    <div style={{ marginTop: '14px' }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: '5px',
                        padding: '3px 10px', borderRadius: '100px',
                        background: 'var(--d-accent-light)', border: '1px solid var(--d-accent-border)',
                        fontSize: '11px', fontWeight: 600, color: 'var(--d-accent)',
                        fontFamily: "'IBM Plex Mono', monospace",
                      }}>
                        tool {tool.num}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" style={{ padding: '100px 24px', position: 'relative' }}>
        <div className="blob blob-2" style={{ top: '20%', right: '10%', opacity: 0.5 }} />
        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em' }}>
              <span className="gradient-text">PROCESS</span>
            </span>
            <h2 style={{ fontSize: '36px', fontWeight: 800, marginTop: '8px', letterSpacing: '-0.03em', color: 'var(--d-text)' }}>
              Three steps. Zero effort.
            </h2>
          </div>

          <div className="hiw-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {[
              { n: '01', title: 'Upload', body: 'YouTube URL, RSS link, or drag-and-drop. Google Drive and resumable uploads supported.', icon: '⬆️' },
              { n: '02', title: 'Process', body: 'Dyspersia transcribes, analyzes, researches, scores clips, and generates content — one background job.', icon: '⚡' },
              { n: '03', title: 'Create', body: 'Clips captioned. Blog written. Show notes timestamped. Titles ranked. Download or schedule.', icon: '✨' },
            ].map((s, i) => (
              <div key={s.n} className="glass-card" style={{ padding: '32px', textAlign: 'center', animation: `fade-in 0.4s ease ${i * 0.1}s both` }}>
                <div style={{ fontSize: '28px', marginBottom: '16px' }}>{s.icon}</div>
                <div style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-0.04em', marginBottom: '4px' }}>
                  <span className="gradient-text">{s.n}</span>
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--d-text)', marginBottom: '10px', letterSpacing: '-0.01em' }}>{s.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--d-text-secondary)', lineHeight: 1.6 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEE IT WORK ── */}
      <section style={{ padding: '100px 24px', position: 'relative' }}>
        <div className="blob blob-1" style={{ top: '30%', left: '0%', opacity: 0.3 }} />
        <div style={{ maxWidth: '760px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

          {/* Heading */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em' }}>
              <span className="gradient-text">DEMO</span>
            </span>
            <h2 style={{ fontSize: '36px', fontWeight: 800, marginTop: '8px', letterSpacing: '-0.03em', color: 'var(--d-text)' }}>
              See it work.
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--d-text-secondary)', marginTop: '12px', lineHeight: 1.6 }}>
              Paste any podcast URL. Watch what happens.
            </p>
          </div>

          {/* Input + Button row */}
          <div className="glass-card demo-input-row" style={{
            padding: '8px 8px 8px 20px',
            display: 'flex', alignItems: 'center', gap: '10px',
            marginBottom: '40px',
            boxShadow: 'var(--d-shadow-lg)',
          }}>
            {/* Terminal prefix */}
            <span style={{
              fontSize: '13px', fontFamily: "'IBM Plex Mono', monospace",
              color: 'var(--d-accent)', fontWeight: 600, flexShrink: 0, opacity: 0.8,
            }}>$</span>
            <input
              type="text"
              readOnly
              placeholder="Paste a YouTube or podcast URL..."
              style={{
                flex: 1, background: 'none', border: 'none', outline: 'none',
                fontSize: '14px', color: 'var(--d-text)',
                fontFamily: "'IBM Plex Mono', monospace",
                caretColor: 'var(--d-accent)',
              }}
            />
            <button style={{
              flexShrink: 0,
              padding: '10px 24px',
              background: 'var(--d-accent)',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
              cursor: 'pointer',
              boxShadow: '0 2px 16px rgba(16,185,129,0.3)',
              transition: 'box-shadow 0.2s ease, transform 0.2s ease',
              letterSpacing: '0.01em',
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 28px rgba(16,185,129,0.45)'
                ;(e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 16px rgba(16,185,129,0.3)'
                ;(e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'
              }}
            >
              Preview
            </button>
          </div>

          {/* Pipeline visualization */}
          {(() => {
            const steps = [
              { icon: '⬆️', label: 'Upload',     status: 'done'    },
              { icon: '🎙️', label: 'Transcribe', status: 'done'    },
              { icon: '⚡',  label: 'Analyze',   status: 'running' },
              { icon: '✍️', label: 'Generate',   status: 'pending' },
              { icon: '📦', label: 'Export',     status: 'pending' },
            ]
            return (
              <div className="pipeline-steps" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: '0px', flexWrap: 'nowrap', overflowX: 'auto', paddingBottom: '4px',
              }}>
                {steps.map((step, i) => {
                  const isDone    = step.status === 'done'
                  const isRunning = step.status === 'running'
                  const isPending = step.status === 'pending'
                  return (
                    <div key={step.label} style={{ display: 'flex', alignItems: 'center' }}>
                      {/* Step card */}
                      <div className="glass-card" style={{
                        padding: '18px 16px',
                        textAlign: 'center',
                        minWidth: '110px',
                        boxShadow: isDone ? '0 4px 20px rgba(16,185,129,0.1)' : undefined,
                        borderColor: isDone ? 'var(--d-accent-border)' : undefined,
                        opacity: isPending ? 0.5 : 1,
                        transition: 'opacity 0.3s ease',
                      }}>
                        {/* Icon */}
                        <div style={{ fontSize: '22px', marginBottom: '10px' }}>{step.icon}</div>

                        {/* Label */}
                        <div style={{
                          fontSize: '13px', fontWeight: 600,
                          color: isDone ? 'var(--d-text)' : isRunning ? 'var(--d-text)' : 'var(--d-text-muted)',
                          marginBottom: '10px', letterSpacing: '-0.01em',
                        }}>{step.label}</div>

                        {/* Status indicator */}
                        {isDone && (
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: '5px',
                            padding: '2px 9px', borderRadius: '100px',
                            background: 'var(--d-accent-light)', border: '1px solid var(--d-accent-border)',
                            fontSize: '11px', fontWeight: 600, color: 'var(--d-accent)',
                          }}>
                            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--d-accent)', flexShrink: 0 }} />
                            Done
                          </span>
                        )}
                        {isRunning && (
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: '5px',
                            padding: '2px 9px', borderRadius: '100px',
                            background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.25)',
                            fontSize: '11px', fontWeight: 600, color: '#fbbf24',
                          }}>
                            <span style={{
                              width: '5px', height: '5px', borderRadius: '50%',
                              background: '#fbbf24', flexShrink: 0,
                              animation: 'pulse-subtle 1.2s ease-in-out infinite',
                            }} />
                            Running
                          </span>
                        )}
                        {isPending && (
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: '5px',
                            padding: '2px 9px', borderRadius: '100px',
                            background: 'var(--d-glass-bg)', border: '1px solid var(--d-border)',
                            fontSize: '11px', fontWeight: 500, color: 'var(--d-text-muted)',
                          }}>
                            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--d-border)', flexShrink: 0 }} />
                            Pending
                          </span>
                        )}
                      </div>

                      {/* Connector line (not after last) */}
                      {i < steps.length - 1 && (
                        <div style={{
                          width: '32px', flexShrink: 0, height: '2px',
                          background: isDone
                            ? 'var(--d-accent)'
                            : isRunning
                              ? 'linear-gradient(90deg, var(--d-accent), var(--d-border))'
                              : 'var(--d-border)',
                          opacity: isDone ? 0.6 : 0.3,
                          transition: 'background 0.3s ease',
                        }} />
                      )}
                    </div>
                  )
                })}
              </div>
            )
          })()}
        </div>
      </section>

      {/* ── CREATOR BRAIN ── */}
      <section style={{ padding: '100px 24px', background: 'var(--d-gradient-subtle)', borderTop: '1px solid var(--d-border)', borderBottom: '1px solid var(--d-border)' }}>
        <div className="brain-section" style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', gap: '48px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 380px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em' }}>
              <span className="gradient-text">CREATOR BRAIN</span>
            </span>
            <h2 style={{ fontSize: '30px', fontWeight: 800, color: 'var(--d-text)', margin: '8px 0 16px', lineHeight: 1.15, letterSpacing: '-0.03em' }}>
              It learns your voice.<br />Then it <span className="gradient-text">writes like you.</span>
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--d-text-secondary)', lineHeight: 1.7, marginBottom: '24px' }}>
              Every generation improves. Feed it a newsletter, brand doc, or philosophy.
              It stores your voice fingerprint, audience profile, and performance history.
            </p>
            {['Voice fingerprint and writing rhythm', 'Audience profile and vocabulary', 'Brand colors, fonts, caption style', 'Performance data across platforms', 'Custom knowledge base'].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span style={{ color: 'var(--d-accent)', fontSize: '14px' }}>✓</span>
                <span style={{ fontSize: '14px', color: 'var(--d-text-secondary)' }}>{item}</span>
              </div>
            ))}
          </div>
          <div style={{ flex: '1 1 320px' }}>
            <div className="glass-card" style={{ padding: '24px', boxShadow: 'var(--d-shadow-md)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--d-text)' }}>Creator Brain</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 500, padding: '2px 10px', borderRadius: '6px', background: 'var(--d-accent-light)', color: 'var(--d-accent)' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--d-accent)', flexShrink: 0, animation: 'pulse-subtle 1.4s ease-in-out infinite' }} />
                  Active
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <div style={{ flex: 1, height: '6px', background: 'var(--d-bg-tertiary)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '78%', height: '100%', borderRadius: '3px', background: 'var(--d-gradient)' }} />
                </div>
                <span style={{ fontSize: '12px', fontWeight: 600 }}><span className="gradient-text">78%</span></span>
              </div>
              {[{ l: 'Voice', v: 'Conversational, data-driven' }, { l: 'Audience', v: 'Founders, operators' }, { l: 'Style', v: 'Bold Highlight' }, { l: 'Updated', v: '2 hours ago' }].map(r => (
                <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid var(--d-border-light)' }}>
                  <span style={{ fontSize: '12px', color: 'var(--d-text-muted)' }}>{r.l}</span>
                  <span style={{ fontSize: '12px', color: 'var(--d-text-secondary)' }}>{r.v}</span>
                </div>
              ))}
              {/* Activity feed */}
              <CreatorBrainFeed />
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT YOU REPLACE ── */}
      <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '100px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em' }}>
            <span className="gradient-text">VALUE</span>
          </span>
          <h2 style={{ fontSize: '36px', fontWeight: 800, marginTop: '8px', letterSpacing: '-0.03em', color: 'var(--d-text)' }}>
            What you replace.
          </h2>
        </div>

        <div className="replace-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

          {/* Left — Without Dyspersia */}
          <div className="glass-card" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: '22px', height: '22px', borderRadius: '50%',
                background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
                fontSize: '11px', color: '#ef4444', flexShrink: 0,
              }}>✕</span>
              <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--d-text)', letterSpacing: '-0.01em' }}>
                Without Dyspersia
              </span>
            </div>
            {[
              'Hiring a podcast editor ($400–1500/episode)',
              'Hiring a copywriter ($100–500/article)',
              'Manual clip finding (3–5 hours per episode)',
              'Generic AI tools that don\'t know your voice',
              'Switching between 6 different apps',
              'Forgetting to repurpose 80% of your content',
            ].map((item) => (
              <div key={item} style={{
                display: 'flex', alignItems: 'flex-start', gap: '10px',
                padding: '10px 0',
                borderBottom: '1px solid var(--d-border-light)',
              }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0, marginTop: '1px',
                  background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.18)',
                  fontSize: '9px', color: '#ef4444',
                }}>✕</span>
                <span style={{ fontSize: '14px', color: 'var(--d-text-muted)', lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>

          {/* Right — With Dyspersia */}
          <div className="glass-card" style={{
            padding: '28px',
            borderColor: 'var(--d-accent-border)',
            boxShadow: '0 4px 32px rgba(16,185,129,0.08)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: '22px', height: '22px', borderRadius: '50%',
                background: 'var(--d-accent-light)', border: '1px solid var(--d-accent-border)',
                fontSize: '11px', color: 'var(--d-accent)', flexShrink: 0,
              }}>✓</span>
              <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--d-text)', letterSpacing: '-0.01em' }}>
                With Dyspersia
              </span>
            </div>
            {[
              'Full post-production in one background job',
              'All content written in your exact voice',
              'AI scores and cuts clips automatically',
              'Creator Brain learns your style permanently',
              'One platform end to end',
              'Agent repurposes everything automatically',
            ].map((item) => (
              <div key={item} style={{
                display: 'flex', alignItems: 'flex-start', gap: '10px',
                padding: '10px 0',
                borderBottom: '1px solid var(--d-border-light)',
              }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0, marginTop: '1px',
                  background: 'var(--d-accent-light)', border: '1px solid var(--d-accent-border)',
                  fontSize: '9px', color: 'var(--d-accent)',
                }}>✓</span>
                <span style={{ fontSize: '14px', color: 'var(--d-text-secondary)', lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ maxWidth: '1000px', margin: '0 auto', padding: '100px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em' }}>
            <span className="gradient-text">PRICING</span>
          </span>
          <h2 style={{ fontSize: '36px', fontWeight: 800, marginTop: '8px', letterSpacing: '-0.03em', color: 'var(--d-text)' }}>
            Simple. Transparent. Cancel anytime.
          </h2>

          {/* ── Billing toggle ── */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0px', marginTop: '24px', position: 'relative' }}>
            <div style={{
              display: 'inline-flex', borderRadius: '10px',
              background: 'var(--d-glass-bg)', border: '1px solid var(--d-border)',
              backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
              padding: '4px', gap: '4px', position: 'relative',
            }}>
              {(['monthly', 'annual'] as const).map(cycle => (
                <button
                  key={cycle}
                  onClick={() => setBillingCycle(cycle)}
                  style={{
                    padding: '7px 20px',
                    borderRadius: '7px',
                    border: 'none',
                    fontSize: '13px',
                    fontWeight: 600,
                    fontFamily: f,
                    cursor: 'pointer',
                    transition: 'all 0.22s cubic-bezier(0.4,0,0.2,1)',
                    background: billingCycle === cycle ? 'var(--d-accent)' : 'transparent',
                    color: billingCycle === cycle ? '#fff' : 'var(--d-text-muted)',
                    boxShadow: billingCycle === cycle ? '0 2px 10px rgba(16,185,129,0.3)' : 'none',
                  }}
                >
                  {cycle.charAt(0).toUpperCase() + cycle.slice(1)}
                </button>
              ))}
            </div>
            {/* Save badge */}
            <span style={{
              marginLeft: '10px',
              padding: '3px 9px', borderRadius: '100px',
              background: isAnnual ? 'var(--d-accent-light)' : 'transparent',
              border: isAnnual ? '1px solid var(--d-accent-border)' : '1px solid transparent',
              fontSize: '11px', fontWeight: 600,
              color: isAnnual ? 'var(--d-accent)' : 'var(--d-text-muted)',
              transition: 'all 0.25s ease',
              whiteSpace: 'nowrap',
            }}>
              Save 20%
            </span>
          </div>
        </div>

        <div className="pricing-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {PRICING.map(plan => (
            <div key={plan.name} className={plan.badge ? '' : 'glass-card'} style={{
              padding: '32px', borderRadius: '12px', position: 'relative',
              display: 'flex', flexDirection: 'column',
              ...(plan.badge ? {
                background: 'var(--d-surface-solid)',
                border: '2px solid transparent',
                backgroundClip: 'padding-box',
                boxShadow: '0 0 0 2px var(--d-accent), var(--d-shadow-lg)',
              } : {}),
            }}>
              {plan.badge && (
                <div style={{
                  position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
                  padding: '4px 14px', borderRadius: '8px', fontSize: '11px', fontWeight: 600, color: '#fff',
                  background: 'var(--d-gradient)', boxShadow: '0 2px 12px rgba(16,185,129,0.3)',
                }}>Popular</div>
              )}
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--d-text-secondary)', marginBottom: '6px' }}>{plan.name}</div>

              {/* Price display */}
              <div style={{ marginBottom: '24px', minHeight: '60px' }}>
                {isAnnual && (
                  <div style={{
                    fontSize: '15px', color: 'var(--d-text-muted)',
                    textDecoration: 'line-through', marginBottom: '2px',
                    fontWeight: 500,
                  }}>
                    {plan.price}/mo
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  <span style={{ fontSize: '42px', fontWeight: 800, letterSpacing: '-0.04em' }}>
                    <span className="gradient-text">{isAnnual ? plan.annualPrice : plan.price}</span>
                  </span>
                  <span style={{ fontSize: '14px', color: 'var(--d-text-muted)' }}>/mo</span>
                </div>
                {isAnnual && (
                  <div style={{ fontSize: '11px', color: 'var(--d-accent)', fontWeight: 500, marginTop: '2px' }}>
                    billed annually
                  </div>
                )}
              </div>

              {/* Feature list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px', flex: 1 }}>
                {plan.features.map(ft => (
                  <div key={ft} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{ color: 'var(--d-accent)', fontSize: '14px' }}>✓</span>
                    <span style={{ fontSize: '13px', color: 'var(--d-text-secondary)' }}>{ft}</span>
                  </div>
                ))}
              </div>

              {/* ── Tool icon row ── */}
              <div style={{
                display: 'flex', flexWrap: 'wrap', gap: '6px',
                paddingTop: '14px', paddingBottom: '16px',
                borderTop: '1px solid var(--d-border)',
              }}>
                {plan.toolIcons.map(tool => (
                  <span
                    key={tool.label}
                    title={tool.label}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '4px',
                      padding: '3px 8px', borderRadius: '6px',
                      background: 'var(--d-glass-bg)', border: '1px solid var(--d-border)',
                      fontSize: '11px', color: 'var(--d-text-muted)',
                      fontWeight: 500, whiteSpace: 'nowrap',
                      backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
                    }}
                  >
                    <span style={{ fontSize: '12px' }}>{tool.emoji}</span>
                    <span>{tool.label}</span>
                  </span>
                ))}
              </div>

              <Link href="/signup" style={{
                display: 'block', textAlign: 'center', padding: '12px',
                background: plan.badge ? 'var(--d-accent)' : 'transparent',
                color: plan.badge ? '#fff' : 'var(--d-accent)',
                border: plan.badge ? 'none' : '1px solid var(--d-accent-border)',
                textDecoration: 'none', fontSize: '14px', fontWeight: 600, borderRadius: '8px',
                transition: 'all 0.2s ease',
                ...(plan.badge ? { boxShadow: '0 2px 12px rgba(16,185,129,0.25)' } : {}),
              }}>Get started →</Link>
            </div>
          ))}
        </div>
        <p style={{ fontSize: '12px', color: 'var(--d-text-muted)', textAlign: 'center', marginTop: '28px' }}>
          All plans include Creator Brain · Semantic Search · Cross-episode memory · 7-day trial
        </p>
      </section>

      <FaqAccordion />

      {/* ── CTA ── */}
      <section style={{ padding: '100px 24px', textAlign: 'center', position: 'relative' }}>
        <div className="blob blob-1" style={{ bottom: '0', left: '20%', opacity: 0.4 }} />
        <div className="blob blob-3" style={{ top: '0', right: '15%', opacity: 0.3 }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, letterSpacing: '-0.04em', marginBottom: '12px' }}>
            <span style={{ color: 'var(--d-text)' }}>Start building your </span>
            <span className="gradient-text">content OS.</span>
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--d-text-muted)', marginBottom: '32px' }}>20 tools. One upload. Your voice.</p>
          <Link href="/signup" style={{
            display: 'inline-block', padding: '16px 40px', fontSize: '16px', fontWeight: 700,
            color: '#fff', textDecoration: 'none', borderRadius: '12px',
            background: 'var(--d-gradient)', boxShadow: '0 4px 24px rgba(16,185,129,0.3)',
            transition: 'all 0.2s ease',
          }}>Start for free →</Link>
          <p style={{ fontSize: '12px', color: 'var(--d-text-muted)', marginTop: '14px' }}>No credit card required.</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: 'var(--d-bg-secondary)', borderTop: '1px solid var(--d-border)', padding: '56px 24px 80px' }}>
        <div className="footer-grid" style={{ maxWidth: '960px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
              <div className="status-dot" />
              <span style={{ fontWeight: 700 }}><span className="gradient-text">dyspersia</span></span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--d-text-muted)', lineHeight: 1.5 }}>The AI brain for podcast creators.</p>
            <p style={{ fontSize: '11px', color: 'var(--d-text-muted)', marginTop: '8px' }}>© 2026 Dyspersia / Slidein Venture</p>
          </div>
          {[
            { title: 'Tools', items: ['Transcription', 'Editorial', 'Reels', 'Content Pack', 'Distribution', 'Agent'] },
            { title: 'Product', items: ['Pricing', 'How it Works', 'Creator Brain', 'Changelog'] },
            { title: 'Company', items: ['About', 'Twitter', 'LinkedIn', 'Discord', 'Contact'] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--d-text)', marginBottom: '14px' }}>{col.title}</div>
              {col.items.map(item => (
                <div key={item} style={{ marginBottom: '7px' }}>
                  <span style={{ fontSize: '13px', color: 'var(--d-text-muted)', cursor: 'pointer', transition: 'color 0.2s ease' }}
                    onMouseEnter={e => { (e.target as HTMLSpanElement).style.color = 'var(--d-text)' }}
                    onMouseLeave={e => { (e.target as HTMLSpanElement).style.color = 'var(--d-text-muted)' }}>{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </footer>
    </div>
  )
}
