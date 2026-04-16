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
  {
    num: '01', name: 'Transcription', icon: '🎙️',
    desc: 'Multi-speaker diarization with semantic chunking and click-to-seek search',
    bullets: ['Multi-speaker diarization', 'Click-to-seek editor', 'Cross-episode semantic search'],
  }
]

export default function ToolsSection({ tools = DEFAULT_TOOLS }: ToolsSectionProps) {
  const N = tools.length

  return (
    <>
      {/* ── DESKTOP sticky stack ── */}
      <section id="tools" className="tools-section-wrapper">

        {/* Section header — scrolls normally above the sticky zone */}
        <div style={{ textAlign: 'center', padding: '96px 24px 64px' }}>
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em',
            color: 'var(--d-accent)', textTransform: 'uppercase', margin: '0 0 16px',
          }}>
            — Tools —
          </p>
          <h2 style={{
            fontSize: 'clamp(34px, 5vw, 52px)', fontWeight: 800,
            letterSpacing: '-0.04em', lineHeight: 1.07,
            color: 'var(--d-text)', margin: '0 0 12px',
          }}>
            Everything you need.
          </h2>
          <p style={{
            fontSize: 'clamp(18px, 2.5vw, 24px)', fontWeight: 400,
            color: 'var(--d-text-secondary)', margin: 0,
          }}>
            Nothing you don&apos;t.
          </p>
        </div>

        {/*
          Key insight: each sticky wrapper must have a real (non-zero) height so the browser
          knows where the element sits in the scroll flow. We give the wrapper exactly the
          card height, then add a large margin-bottom as "scroll fuel" for each slot.
          The wrapper sticks at its top offset and only releases once the scroll has
          consumed its margin — by which point the next card is already on top.
        */}
        <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 24px 0' }}>
          {tools.map((tool, i) => {
            // Every card — including the last — gets 100vh of scroll travel.
            // This is what makes tool 6 sticky instead of static.
            const stickyTop = 10 + i * 3

            return (
              <div
                key={tool.num}
                style={{
                  position: 'sticky',
                  top: `${stickyTop}vh`,
                  height: 'clamp(400px, 72vh, 600px)',
                  marginBottom: '100vh',
                  zIndex: i + 10,
                }}
              >
                <ToolCard tool={tool} index={i} total={N} />
              </div>
            )
          })}
          {/* End spacer: gives the last card time to be seen before the section exits */}
          <div style={{ height: '20vh' }} />
        </div>
      </section>

      {/* ── MOBILE static list ── */}
      <section
        id="tools-mobile"
        className="tools-mobile-section"
        aria-hidden="true"
        style={{ padding: '64px 16px 48px' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '11px', fontWeight: 700, letterSpacing: '0.16em',
            color: 'var(--d-accent)', textTransform: 'uppercase', margin: '0 0 14px',
          }}>
            — Tools —
          </p>
          <h2 style={{
            fontSize: 'clamp(28px, 7vw, 40px)', fontWeight: 800,
            letterSpacing: '-0.035em', color: 'var(--d-text)', lineHeight: 1.1, margin: 0,
          }}>
            Everything you need.<br />
            <span style={{ color: 'var(--d-text-secondary)', fontWeight: 400 }}>Nothing you don&apos;t.</span>
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {tools.map((tool, i) => (
            <div key={tool.num} style={{
              background: 'var(--d-surface-solid)',
              border: '1px solid var(--d-accent-border)',
              borderRadius: '18px',
              padding: '28px 22px',
              boxShadow: 'var(--d-shadow-md)',
              position: 'relative', overflow: 'hidden',
            }}>
              {/* bg orb */}
              <div style={{
                position: 'absolute', top: '-40px', right: '-40px',
                width: '160px', height: '160px', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', position: 'relative' }}>
                <span style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '11px', fontWeight: 700, letterSpacing: '0.16em',
                  color: 'var(--d-accent)', background: 'var(--d-accent-light)',
                  border: '1px solid var(--d-accent-border)',
                  padding: '4px 10px', borderRadius: '100px',
                }}>
                  {tool.num}
                </span>
                <span style={{ fontSize: '28px' }}>{tool.icon}</span>
              </div>
              <h3 style={{
                fontSize: '21px', fontWeight: 800, color: 'var(--d-text)',
                margin: '0 0 10px', letterSpacing: '-0.025em',
              }}>{tool.name}</h3>
              <p style={{
                fontSize: '14px', color: 'var(--d-text-secondary)',
                lineHeight: 1.65, margin: '0 0 18px',
              }}>{tool.desc}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {tool.bullets.map((b, bi) => (
                  <div key={b} style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '10px 13px', borderRadius: '10px',
                    background: 'var(--d-accent-light)',
                    border: '1px solid var(--d-accent-border)',
                  }}>
                    <span style={{
                      flexShrink: 0, width: '22px', height: '22px', borderRadius: '6px',
                      background: 'var(--d-surface-solid)', border: '1px solid var(--d-accent-border)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: "'IBM Plex Mono', monospace", fontSize: '9px',
                      fontWeight: 700, color: 'var(--d-accent)',
                    }}>
                      {String(bi + 1).padStart(2, '0')}
                    </span>
                    <span style={{ fontSize: '13px', color: 'var(--d-text)', fontWeight: 500 }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

/* ─────────────────────────────────────────
   Desktop tool card — extracted for clarity
───────────────────────────────────────── */
function ToolCard({ tool, index, total }: { tool: Tool; index: number; total: number }) {
  return (
    <div
      style={{
        height: '100%',
        background: 'var(--d-surface-solid)',
        border: '1px solid var(--d-border)',
        borderRadius: '22px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        boxShadow: 'var(--d-shadow-lg)',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'var(--d-accent-border)'
        el.style.boxShadow = '0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px var(--d-accent-border), 0 0 80px var(--d-accent-light)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'var(--d-border)'
        el.style.boxShadow = 'var(--d-shadow-lg)'
      }}
    >
      {/* Ambient green orb — top right */}
      <div style={{
        position: 'absolute', top: '-80px', right: '-80px',
        width: '320px', height: '320px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(16,185,129,0.14) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      {/* Counter orb — bottom left */}
      <div style={{
        position: 'absolute', bottom: '-50px', left: '-30px',
        width: '220px', height: '220px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      {/* Top shimmer line */}
      <div style={{
        position: 'absolute', top: 0, left: '8%', right: '8%', height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--d-accent-border), transparent)',
        zIndex: 1,
      }} />

      {/* ── LEFT PANEL ── */}
      <div style={{
        flex: '0 0 52%',
        padding: 'clamp(28px, 4vw, 48px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 2,
        borderRight: '1px solid var(--d-border)',
      }}>
        {/* Top block */}
        <div>
          {/* Number pill + icon row */}
          <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', marginBottom: 'clamp(20px, 3vw, 36px)',
          }}>
            <span style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em',
              color: 'var(--d-accent)', textTransform: 'uppercase',
              background: 'var(--d-accent-light)',
              border: '1px solid var(--d-accent-border)',
              padding: '5px 13px', borderRadius: '100px',
            }}>
              {tool.num} / {String(total).padStart(2, '0')}
            </span>
            <span style={{
              fontSize: 'clamp(32px, 4vw, 48px)', lineHeight: 1,
              filter: 'drop-shadow(0 4px 16px rgba(16,185,129,0.3))',
            }}>
              {tool.icon}
            </span>
          </div>

          {/* Tool name */}
          <h3 style={{
            fontSize: 'clamp(26px, 3.5vw, 42px)', fontWeight: 800,
            color: 'var(--d-text)', margin: '0 0 clamp(10px, 1.5vw, 18px)',
            letterSpacing: '-0.03em', lineHeight: 1.05,
          }}>
            {tool.name}
          </h3>

          {/* Description */}
          <p style={{
            fontSize: 'clamp(13px, 1.4vw, 15px)',
            color: 'var(--d-text-secondary)', lineHeight: 1.75,
            margin: 0, maxWidth: '360px',
          }}>
            {tool.desc}
          </p>
        </div>

        {/* Bottom: progress dots */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', paddingTop: '20px' }}>
          {Array.from({ length: total }).map((_, di) => (
            <div key={di} style={{
              width: di === index ? '22px' : '5px',
              height: '5px', borderRadius: '3px',
              background: di === index ? 'var(--d-accent)' : 'var(--d-border)',
              opacity: di === index ? 1 : 0.45,
              transition: 'width 0.3s ease',
            }} />
          ))}
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div style={{
        flex: '0 0 48%',
        padding: 'clamp(28px, 4vw, 48px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 2,
      }}>
        <p style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '10px', fontWeight: 700, letterSpacing: '0.16em',
          color: 'var(--d-text-muted)', textTransform: 'uppercase',
          margin: '0 0 clamp(16px, 2.5vw, 28px)',
        }}>
          What&apos;s included
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(10px, 1.5vw, 14px)' }}>
          {tool.bullets.map((b, bi) => (
            <div
              key={b}
              style={{
                display: 'flex', alignItems: 'center', gap: '13px',
                padding: 'clamp(12px, 1.5vw, 16px) clamp(14px, 2vw, 18px)',
                borderRadius: '12px',
                background: 'var(--d-accent-light)',
                border: '1px solid var(--d-accent-border)',
                transition: 'transform 0.2s cubic-bezier(0.4,0,0.2,1), background 0.2s ease',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateX(5px)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateX(0)'
              }}
            >
              {/* Numbered badge */}
              <span style={{
                flexShrink: 0, width: '26px', height: '26px', borderRadius: '8px',
                background: 'var(--d-surface-solid)',
                border: '1px solid var(--d-accent-border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '10px', fontWeight: 700, color: 'var(--d-accent)',
              }}>
                {String(bi + 1).padStart(2, '0')}
              </span>
              <span style={{
                fontSize: 'clamp(13px, 1.4vw, 15px)',
                color: 'var(--d-text)', fontWeight: 500, lineHeight: 1.3,
              }}>
                {b}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
