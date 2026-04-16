'use client'

interface Tool {
  num: string
  name: string
  desc: string
  icon: string
  bullets: string[]
  size?: string
}

interface ToolsSectionProps {
  tools?: Tool[]
}

const DEFAULT_TOOLS: Tool[] = [
  { num: '01', name: 'Transcription', desc: 'Multi-speaker diarization with semantic chunking and click-to-seek search', icon: '🎙️', bullets: ['Multi-speaker diarization', 'Click-to-seek editor', 'Cross-episode semantic search'] }
]

// Each tool gets a unique accent color for its orb / glow
const CARD_ACCENTS = [
  { orb: 'rgba(16,185,129,0.18)',  glow: 'rgba(16,185,129,0.12)',  tag: 'rgba(16,185,129,0.1)',  tagBorder: 'rgba(16,185,129,0.25)',  tagText: '#10b981' },
  { orb: 'rgba(6,182,212,0.18)',   glow: 'rgba(6,182,212,0.12)',   tag: 'rgba(6,182,212,0.1)',   tagBorder: 'rgba(6,182,212,0.25)',   tagText: '#06b6d4' },
  { orb: 'rgba(239,68,68,0.14)',   glow: 'rgba(239,68,68,0.09)',   tag: 'rgba(239,68,68,0.08)',  tagBorder: 'rgba(239,68,68,0.22)',   tagText: '#ef4444' },
  { orb: 'rgba(168,85,247,0.18)',  glow: 'rgba(168,85,247,0.1)',   tag: 'rgba(168,85,247,0.09)', tagBorder: 'rgba(168,85,247,0.25)', tagText: '#a855f7' },
  { orb: 'rgba(245,158,11,0.18)',  glow: 'rgba(245,158,11,0.1)',   tag: 'rgba(245,158,11,0.09)', tagBorder: 'rgba(245,158,11,0.25)', tagText: '#f59e0b' },
  { orb: 'rgba(34,197,94,0.18)',   glow: 'rgba(34,197,94,0.1)',    tag: 'rgba(34,197,94,0.09)',  tagBorder: 'rgba(34,197,94,0.25)',  tagText: '#22c55e' },
  { orb: 'rgba(99,102,241,0.18)',  glow: 'rgba(99,102,241,0.1)',   tag: 'rgba(99,102,241,0.09)', tagBorder: 'rgba(99,102,241,0.25)', tagText: '#6366f1' },
]

export default function ToolsSection({ tools = DEFAULT_TOOLS }: ToolsSectionProps) {
  const N = tools.length
  // Stagger: cards stack offset slightly so you can see the stack depth
  const STACK_GAP_VH = 2

  return (
    <>
      {/* ─────────────────────────────────────────
          DESKTOP: Apple-style sticky stack
          Each card wrapper is position:sticky and takes up 80vh of scroll space.
          All cards are FIXED HEIGHT (100vh-ish) so they stack perfectly uniform.
      ───────────────────────────────────────── */}
      <section
        id="tools"
        className="tools-section-wrapper"
        style={{ position: 'relative' }}
      >
        {/* Section header — scrolls away normally before cards lock in */}
        <div style={{ textAlign: 'center', padding: '96px 24px 72px' }}>
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.18em',
            color: 'var(--d-accent)',
            textTransform: 'uppercase',
            margin: '0 0 18px',
          }}>
            — Tools —
          </p>
          <h2 style={{
            fontSize: 'clamp(36px, 5.5vw, 56px)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            color: 'var(--d-text)',
            lineHeight: 1.05,
            margin: '0 0 20px',
          }}>
            Everything you need.<br />
            <span style={{ color: 'var(--d-text-secondary)', fontWeight: 400, fontSize: '0.85em' }}>Nothing you don&apos;t.</span>
          </h2>
          <p style={{
            fontSize: '15px',
            color: 'var(--d-text-muted)',
            fontFamily: "'IBM Plex Mono', monospace",
            letterSpacing: '0.02em',
          }}>
            Scroll to explore {N} tools
          </p>
        </div>

        {/* Cards wrapper */}
        <div style={{
          // Total scroll space = N cards × 80vh each, plus final card view
          paddingBottom: `${N * 80 + 30}vh`,
          position: 'relative',
        }}>
          {tools.map((tool, i) => {
            const accent = CARD_ACCENTS[i % CARD_ACCENTS.length]
            // Each card sticks at a slightly lower top so the deck peeks out
            const stickyTop = 10 + i * STACK_GAP_VH

            return (
              <div
                key={tool.num}
                style={{
                  position: 'sticky',
                  top: `${stickyTop}vh`,
                  // Each card "consumes" 80vh of scroll; last card just stays
                  height: '0px',
                  zIndex: i + 10,
                  // The card itself is a sibling rendered as absolutely relative to this anchor
                }}
              >
                {/* ── The actual card ── */}
                <div
                  className="tool-card-inner"
                  style={{
                    // Uniform fixed height — every card identical
                    height: 'calc(80vh - 24px)',
                    maxHeight: '640px',
                    minHeight: '440px',
                    margin: '0 auto',
                    maxWidth: '960px',
                    padding: '0 24px',
                    boxSizing: 'border-box',
                  }}
                >
                  {/* Inner surface */}
                  <div
                    className="tool-card-surface"
                    style={{
                      height: '100%',
                      background: 'var(--d-surface-solid)',
                      border: '1px solid var(--d-border)',
                      borderRadius: '24px',
                      position: 'relative',
                      overflow: 'hidden',
                      display: 'flex',
                      boxShadow: 'var(--d-shadow-lg)',
                      transition: 'border-color 0.35s ease, box-shadow 0.35s ease',
                      cursor: 'default',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = accent.tagBorder
                      el.style.boxShadow = `0 24px 64px rgba(0,0,0,0.14), 0 0 0 1px ${accent.tagBorder}, 0 0 80px ${accent.glow}`
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = 'var(--d-border)'
                      el.style.boxShadow = 'var(--d-shadow-lg)'
                    }}
                  >
                    {/* Ambient orb — unique per card, top-right */}
                    <div style={{
                      position: 'absolute',
                      top: '-60px',
                      right: '-60px',
                      width: '280px',
                      height: '280px',
                      borderRadius: '50%',
                      background: `radial-gradient(circle, ${accent.orb} 0%, transparent 70%)`,
                      pointerEvents: 'none',
                      zIndex: 0,
                    }} />

                    {/* Subtle bottom-left counter-orb */}
                    <div style={{
                      position: 'absolute',
                      bottom: '-40px',
                      left: '5%',
                      width: '200px',
                      height: '200px',
                      borderRadius: '50%',
                      background: `radial-gradient(circle, ${accent.glow} 0%, transparent 70%)`,
                      pointerEvents: 'none',
                      zIndex: 0,
                    }} />

                    {/* Shimmer line — top edge */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: '10%',
                      right: '10%',
                      height: '1px',
                      background: `linear-gradient(90deg, transparent, ${accent.tagBorder}, transparent)`,
                      zIndex: 1,
                      borderRadius: '1px',
                    }} />

                    {/* ── LEFT PANEL — always same structure ── */}
                    <div style={{
                      flex: '0 0 52%',
                      padding: 'clamp(32px, 4vw, 52px)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      position: 'relative',
                      zIndex: 2,
                      borderRight: '1px solid var(--d-border)',
                    }}>
                      {/* Top: number + icon */}
                      <div>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginBottom: 'clamp(24px, 3vw, 40px)',
                        }}>
                          <span style={{
                            fontFamily: "'IBM Plex Mono', monospace",
                            fontSize: '11px',
                            fontWeight: 700,
                            letterSpacing: '0.2em',
                            color: accent.tagText,
                            textTransform: 'uppercase',
                            background: accent.tag,
                            border: `1px solid ${accent.tagBorder}`,
                            padding: '5px 12px',
                            borderRadius: '100px',
                          }}>
                            {tool.num} / {String(N).padStart(2, '0')}
                          </span>
                          <span style={{
                            fontSize: 'clamp(36px, 4vw, 52px)',
                            lineHeight: 1,
                            filter: `drop-shadow(0 4px 16px ${accent.glow})`,
                          }}>
                            {tool.icon}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 style={{
                          fontSize: 'clamp(28px, 3.8vw, 44px)',
                          fontWeight: 800,
                          color: 'var(--d-text)',
                          margin: '0 0 clamp(12px, 2vw, 20px)',
                          letterSpacing: '-0.03em',
                          lineHeight: 1.05,
                        }}>
                          {tool.name}
                        </h3>

                        {/* Description */}
                        <p style={{
                          fontSize: 'clamp(14px, 1.5vw, 16px)',
                          color: 'var(--d-text-secondary)',
                          lineHeight: 1.75,
                          margin: 0,
                          maxWidth: '380px',
                        }}>
                          {tool.desc}
                        </p>
                      </div>

                      {/* Bottom: index dots */}
                      <div style={{
                        display: 'flex',
                        gap: '6px',
                        alignItems: 'center',
                        paddingTop: '24px',
                      }}>
                        {tools.map((_, di) => (
                          <div key={di} style={{
                            width: di === i ? '20px' : '5px',
                            height: '5px',
                            borderRadius: '3px',
                            background: di === i ? accent.tagText : 'var(--d-border)',
                            opacity: di === i ? 1 : 0.4,
                            transition: 'width 0.3s ease',
                          }} />
                        ))}
                      </div>
                    </div>

                    {/* ── RIGHT PANEL — feature chips, always same height ── */}
                    <div style={{
                      flex: '0 0 48%',
                      padding: 'clamp(32px, 4vw, 52px)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      position: 'relative',
                      zIndex: 2,
                    }}>
                      <p style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: '10px',
                        fontWeight: 700,
                        letterSpacing: '0.16em',
                        color: 'var(--d-text-muted)',
                        textTransform: 'uppercase',
                        margin: '0 0 clamp(20px, 3vw, 32px)',
                      }}>
                        What&apos;s included
                      </p>

                      {/* Feature list — always exactly 3 bullets per tool */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(12px, 2vw, 18px)' }}>
                        {tool.bullets.map((b, bi) => (
                          <div
                            key={b}
                            className="tool-feature-row"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '14px',
                              padding: 'clamp(12px, 1.5vw, 16px) clamp(14px, 2vw, 20px)',
                              borderRadius: '12px',
                              background: accent.tag,
                              border: `1px solid ${accent.tagBorder}`,
                              transition: 'transform 0.2s ease, background 0.2s ease',
                              cursor: 'default',
                            }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLElement).style.transform = 'translateX(4px)'
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLElement).style.transform = 'translateX(0)'
                            }}
                          >
                            {/* Animated number badge */}
                            <span style={{
                              flexShrink: 0,
                              width: '26px',
                              height: '26px',
                              borderRadius: '8px',
                              background: 'var(--d-surface-solid)',
                              border: `1px solid ${accent.tagBorder}`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontFamily: "'IBM Plex Mono', monospace",
                              fontSize: '10px',
                              fontWeight: 700,
                              color: accent.tagText,
                            }}>
                              {String(bi + 1).padStart(2, '0')}
                            </span>
                            <span style={{
                              fontSize: 'clamp(13px, 1.4vw, 15px)',
                              color: 'var(--d-text)',
                              fontWeight: 500,
                              lineHeight: 1.3,
                            }}>
                              {b}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────
          MOBILE FALLBACK (≤768px)
          Static vertical list, no sticky.
      ───────────────────────────────────────── */}
      <section
        id="tools-mobile"
        className="tools-mobile-section"
        aria-hidden="true"
        style={{ padding: '64px 16px 48px' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.16em',
            color: 'var(--d-accent)',
            textTransform: 'uppercase',
            margin: '0 0 14px',
          }}>
            — Tools —
          </p>
          <h2 style={{
            fontSize: 'clamp(28px, 7vw, 40px)',
            fontWeight: 800,
            letterSpacing: '-0.035em',
            color: 'var(--d-text)',
            lineHeight: 1.1,
            margin: 0,
          }}>
            Everything you need.<br />
            <span style={{ color: 'var(--d-text-secondary)', fontWeight: 400 }}>Nothing you don&apos;t.</span>
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {tools.map((tool, i) => {
            const accent = CARD_ACCENTS[i % CARD_ACCENTS.length]
            return (
              <div key={tool.num} style={{
                background: 'var(--d-surface-solid)',
                border: '1px solid var(--d-border)',
                borderRadius: '20px',
                padding: '28px 24px',
                boxShadow: 'var(--d-shadow-md)',
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* Orb */}
                <div style={{
                  position: 'absolute', top: '-30px', right: '-30px',
                  width: '140px', height: '140px', borderRadius: '50%',
                  background: `radial-gradient(circle, ${accent.orb} 0%, transparent 70%)`,
                  pointerEvents: 'none',
                }} />

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', position: 'relative', zIndex: 1 }}>
                  <span style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '11px', fontWeight: 700, letterSpacing: '0.16em',
                    color: accent.tagText, background: accent.tag,
                    border: `1px solid ${accent.tagBorder}`,
                    padding: '4px 10px', borderRadius: '100px',
                  }}>
                    {tool.num}
                  </span>
                  <span style={{ fontSize: '30px' }}>{tool.icon}</span>
                </div>

                <h3 style={{
                  fontSize: '22px', fontWeight: 800, color: 'var(--d-text)',
                  margin: '0 0 10px', letterSpacing: '-0.025em', position: 'relative', zIndex: 1,
                }}>
                  {tool.name}
                </h3>
                <p style={{
                  fontSize: '14px', color: 'var(--d-text-secondary)',
                  lineHeight: 1.65, margin: '0 0 20px', position: 'relative', zIndex: 1,
                }}>
                  {tool.desc}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative', zIndex: 1 }}>
                  {tool.bullets.map((b, bi) => (
                    <div key={b} style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      padding: '10px 14px', borderRadius: '10px',
                      background: accent.tag, border: `1px solid ${accent.tagBorder}`,
                    }}>
                      <span style={{
                        flexShrink: 0, width: '22px', height: '22px', borderRadius: '6px',
                        background: 'var(--d-surface-solid)', border: `1px solid ${accent.tagBorder}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: "'IBM Plex Mono', monospace", fontSize: '9px',
                        fontWeight: 700, color: accent.tagText,
                      }}>
                        {String(bi + 1).padStart(2, '0')}
                      </span>
                      <span style={{ fontSize: '13px', color: 'var(--d-text)', fontWeight: 500 }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
