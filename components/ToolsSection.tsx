'use client'

import { useEffect, useRef } from 'react'

/* ─────────────────────────────────────────
   Tool data
───────────────────────────────────────── */
const TOOLS = [
  {
    number: '01',
    name: 'Transcription',
    description:
      'Multi-speaker diarization with semantic chunking. Click any word to seek to that exact moment in the audio. Search across your entire back catalog.',
    tags: ['Speaker Labels', 'Topic Blocks', 'Click-to-Seek', 'Cross-Episode Search'],
  },
  {
    number: '02',
    name: 'Editorial Direction',
    description:
      'Full guest intelligence from LinkedIn, Twitter, and press coverage — normalized into a semantic profile. Auto-generates a timestamped edit brief your editor can follow.',
    tags: ['Guest Research', 'Cross-Reference', 'Edit Brief', 'Asset Sourcing'],
  },
  {
    number: '03',
    name: 'Podcast to Reels',
    description:
      'AI finds, scores, cuts, captions, and exports your best clips. Hook strength, retention probability, emotional arc — all scored before you export.',
    tags: ['Reel Finder', 'Auto-Captions', '9:16 · 1:1 · 16:9', 'Performance Score'],
  },
  {
    number: '04',
    name: 'Content Pack',
    description:
      'One generation. Complete episode content kit — show notes, blog post, YouTube description, 10 title variants, newsletter, LinkedIn article, Twitter thread, Instagram caption.',
    tags: ['Show Notes', 'Blog Post', 'Titles', 'Newsletter', 'LinkedIn', 'Thread'],
  },
  {
    number: '05',
    name: 'Visual Engine',
    description:
      'Brand-aware thumbnails, quote cards, and audiogram frames. Your colors, your fonts, your logo placement — rendered consistently every time.',
    tags: ['Thumbnails', 'Quote Cards', 'Story Cards', 'Brand Consistent'],
  },
  {
    number: '06',
    name: 'Distribution',
    description:
      'Schedule and publish across YouTube, Spotify, LinkedIn, TikTok. Unified analytics dashboard — every platform in one view.',
    tags: ['YouTube', 'Spotify', 'LinkedIn', 'TikTok', 'Analytics'],
  },
]

const N = TOOLS.length

export default function ToolsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  // Direct refs to each card slot element — avoids React re-render on every scroll
  const slotsRef = useRef<HTMLElement[]>([])
  const dotsRef  = useRef<HTMLElement[]>([])
  const counterRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const update = () => {
      // Distance scrolled past the section's top edge
      const sectionTop = section.getBoundingClientRect().top + window.scrollY
      const scrolled   = window.scrollY - sectionTop
      const vh         = window.innerHeight

      // progress: 0 → N  (0 = first card fully active, N-1 = last card fully active)
      const progress = Math.max(0, Math.min(N - 0.001, scrolled / vh))
      const active   = Math.floor(progress)
      const cp       = progress - active   // 0..1 within the current card's slot

      slotsRef.current.forEach((el, i) => {
        if (!el) return
        const d = i - active   // distance from active card

        let scale:   number
        let ty:      number
        let opacity: number
        let zIdx:    number

        if (d === 0) {
          // ── Current card: slowly shrinks & lifts as cp → 1
          scale   = 1 - 0.05 * cp
          ty      = -22 * cp
          opacity = 1
          zIdx    = N + 2
        } else if (d === 1) {
          // ── Next card: rises from below
          scale   = 0.93 + 0.07 * cp
          ty      = 72 * (1 - cp)
          opacity = Math.min(1, cp * 1.8)
          zIdx    = N + 1
        } else if (d > 1) {
          // ── Future cards: hidden below
          scale   = 0.9
          ty      = 90
          opacity = 0
          zIdx    = N - d
        } else if (d === -1) {
          // ── Previous card: dims and recedes behind current
          scale   = 0.95 - 0.02 * cp
          ty      = -22 - 12 * cp
          opacity = Math.max(0, 0.38 - 0.38 * cp)
          zIdx    = N
        } else {
          // ── Far past: invisible
          scale   = 0.88
          ty      = -50
          opacity = 0
          zIdx    = N + d   // negative offset
        }

        el.style.transform = `scale(${scale.toFixed(4)}) translateY(${ty.toFixed(2)}px)`
        el.style.opacity   = opacity.toFixed(4)
        el.style.zIndex    = String(zIdx)
      })

      // ── Update progress dots
      dotsRef.current.forEach((dot, i) => {
        if (!dot) return
        const isActive = i === active
        dot.style.background = isActive ? 'var(--d-accent)' : 'var(--d-border)'
        dot.style.width      = isActive ? '20px' : '6px'
        dot.style.opacity    = isActive ? '1' : '0.5'
      })

      // ── Update counter text
      if (counterRef.current) {
        counterRef.current.textContent = `${active + 1} / ${N}`
      }
    }

    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    update() // run once on mount to set initial state

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <>
      {/*
        ── Desktop: Apple-style sticky scroll
           Section reserves N × 100vh of scroll space.
           Inner sticky div locks to the viewport for the entire scroll duration.
           Cards are absolutely stacked and animated via direct DOM mutation.
      */}
      <section
        id="tools"
        ref={sectionRef}
        className="tools-section-wrapper"
        style={{
          position: 'relative',
          height: `${N * 100}vh`,
        }}
      >
        {/* ── Sticky viewport ── */}
        <div
          className="tools-sticky-vp"
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* ── Section header ── */}
          <div
            style={{
              textAlign: 'center',
              padding: '52px 24px 24px',
              flexShrink: 0,
            }}
          >
            <p
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                color: 'var(--d-accent)',
                textTransform: 'uppercase',
                margin: '0 0 10px',
              }}
            >
              TOOLS
            </p>
            <h2
              style={{
                fontSize: 'clamp(24px, 3.5vw, 40px)',
                fontWeight: 800,
                letterSpacing: '-0.035em',
                color: 'var(--d-text)',
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              Everything you need.
              <br />
              Nothing you don&apos;t.
            </h2>
          </div>

          {/* ── Cards viewport ── */}
          <div
            style={{
              flex: 1,
              position: 'relative',
              padding: '0 24px',
              overflow: 'visible',
            }}
          >
            {TOOLS.map((tool, i) => (
              <div
                key={tool.number}
                ref={(el) => {
                  if (el) slotsRef.current[i] = el
                }}
                className="tool-card-slot"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 24,
                  right: 24,
                  transformOrigin: 'center top',
                  willChange: 'transform, opacity',
                  // Initial state set inline so SSR matches client
                  transform: i === 0 ? 'scale(1) translateY(0px)' : 'scale(0.9) translateY(90px)',
                  opacity: i === 0 ? 1 : 0,
                  zIndex: i === 0 ? N + 2 : 0,
                }}
              >
                {/* ── Card ── */}
                <div
                  className="tool-card-inner"
                  style={{
                    background: 'var(--d-surface-solid)',
                    border: '1px solid var(--d-border)',
                    borderRadius: '8px',
                    padding: 'clamp(24px, 3vw, 44px) clamp(18px, 4vw, 48px)',
                    display: 'flex',
                    gap: 'clamp(18px, 3vw, 44px)',
                    alignItems: 'center',
                    cursor: 'default',
                    maxWidth: '860px',
                    margin: '0 auto',
                    boxShadow: 'var(--d-shadow-md)',
                    transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = 'var(--d-accent-border)'
                    el.style.boxShadow   = '0 0 48px rgba(0,0,0,0.12), 0 0 32px color-mix(in srgb, var(--d-accent) 8%, transparent)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = 'var(--d-border)'
                    el.style.boxShadow   = 'var(--d-shadow-md)'
                  }}
                >
                  {/* Left — text */}
                  <div style={{ flex: '0 0 58%', minWidth: 0 }}>
                    <p
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: '11px',
                        letterSpacing: '0.15em',
                        color: 'var(--d-accent)',
                        opacity: 0.65,
                        textTransform: 'uppercase',
                        margin: '0 0 8px',
                      }}
                    >
                      {tool.number}
                    </p>
                    <h3
                      style={{
                        fontSize: 'clamp(22px, 2.8vw, 34px)',
                        fontWeight: 800,
                        color: 'var(--d-text)',
                        margin: '0 0 14px',
                        letterSpacing: '-0.03em',
                        lineHeight: 1.1,
                      }}
                    >
                      {tool.name}
                    </h3>
                    <p
                      style={{
                        fontSize: 'clamp(13px, 1.4vw, 15px)',
                        color: 'var(--d-text-secondary)',
                        lineHeight: 1.75,
                        margin: 0,
                        maxWidth: '400px',
                      }}
                    >
                      {tool.description}
                    </p>
                  </div>

                  {/* Right — tags */}
                  <div
                    style={{
                      flex: '0 0 42%',
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px',
                      justifyContent: 'flex-end',
                      alignContent: 'center',
                    }}
                  >
                    {tool.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          border: '1px solid var(--d-border)',
                          background: 'var(--d-bg-secondary)',
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '11px',
                          color: 'var(--d-text-muted)',
                          padding: '6px 13px',
                          borderRadius: '4px',
                          whiteSpace: 'nowrap',
                          cursor: 'default',
                          transition: 'border-color 0.15s ease, color 0.15s ease, background 0.15s ease',
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLElement
                          el.style.borderColor = 'var(--d-accent-border)'
                          el.style.color       = 'var(--d-accent)'
                          el.style.background  = 'var(--d-accent-light)'
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLElement
                          el.style.borderColor = 'var(--d-border)'
                          el.style.color       = 'var(--d-text-muted)'
                          el.style.background  = 'var(--d-bg-secondary)'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Progress indicator ── */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px',
              padding: '18px 0 24px',
              flexShrink: 0,
            }}
          >
            {TOOLS.map((_, i) => (
              <div
                key={i}
                ref={(el) => {
                  if (el) dotsRef.current[i] = el
                }}
                style={{
                  height: '6px',
                  width: i === 0 ? '20px' : '6px',
                  borderRadius: '3px',
                  background: i === 0 ? 'var(--d-accent)' : 'var(--d-border)',
                  opacity: i === 0 ? 1 : 0.5,
                  transition: 'width 0.25s ease, background 0.25s ease, opacity 0.25s ease',
                }}
              />
            ))}
            <span
              ref={counterRef}
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '10px',
                color: 'var(--d-text-muted)',
                marginLeft: '6px',
                minWidth: '28px',
              }}
            >
              1 / {N}
            </span>
          </div>
        </div>
      </section>

      {/*
        ── Mobile fallback (≤768px):
           Static stack, no animation, no sticky; controlled entirely by globals.css
      */}
      <section
        id="tools-mobile"
        className="tools-mobile-section"
        aria-hidden="true"
      >
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: 'var(--d-accent)',
              textTransform: 'uppercase',
              margin: '0 0 10px',
            }}
          >
            TOOLS
          </p>
          <h2
            style={{
              fontSize: 'clamp(26px, 6vw, 38px)',
              fontWeight: 800,
              letterSpacing: '-0.035em',
              color: 'var(--d-text)',
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Everything you need.
            <br />
            Nothing you don&apos;t.
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {TOOLS.map((tool) => (
            <div
              key={tool.number}
              style={{
                background: 'var(--d-surface-solid)',
                border: '1px solid var(--d-border)',
                borderRadius: '8px',
                padding: '24px 20px',
                cursor: 'default',
                boxShadow: 'var(--d-shadow-sm)',
              }}
            >
              <p
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '10px',
                  letterSpacing: '0.14em',
                  color: 'var(--d-accent)',
                  opacity: 0.65,
                  textTransform: 'uppercase',
                  margin: '0 0 6px',
                }}
              >
                {tool.number}
              </p>
              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: 800,
                  color: 'var(--d-text)',
                  margin: '0 0 10px',
                  letterSpacing: '-0.02em',
                }}
              >
                {tool.name}
              </h3>
              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--d-text-secondary)',
                  lineHeight: 1.65,
                  margin: '0 0 14px',
                }}
              >
                {tool.description}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {tool.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      border: '1px solid var(--d-border)',
                      background: 'var(--d-bg-secondary)',
                      fontSize: '11px',
                      color: 'var(--d-text-muted)',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      whiteSpace: 'nowrap',
                      cursor: 'default',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
