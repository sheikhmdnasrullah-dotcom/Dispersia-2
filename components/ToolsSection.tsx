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

// Fallback data just in case
const DEFAULT_TOOLS: Tool[] = [
  { num: '01', name: 'Transcription', desc: 'Diarization and search', icon: '🎙️', bullets: ['Feature 1'] }
]

export default function ToolsSection({ tools = DEFAULT_TOOLS }: ToolsSectionProps) {
  const N = tools.length

  return (
    <>
      {/*
        ── Desktop: Pure CSS Sticky Stack
           No JS required. The section expands its height natively.
           Cards hit the top and stack precisely.
      */}
      <section
        id="tools"
        className="tools-section-wrapper"
        style={{
          position: 'relative',
          paddingBottom: '20vh',
          // The background should remain transparent so we match both day and night mode effortlessly,
          // taking on the global body grain/bg.
        }}
      >
        <div style={{ textAlign: 'center', padding: '100px 24px 60px' }}>
          <p
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              color: 'var(--d-accent)',
              textTransform: 'uppercase',
              margin: '0 0 16px',
            }}
          >
            TOOLS
          </p>
          <h2
            style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
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

        <div style={{ position: 'relative', margin: '0 auto', maxWidth: '860px', padding: '0 24px' }}>
          {tools.map((tool, i) => {
            const isLast = i === N - 1
            const topOffset = 15 + i * 4 // spacing between cards once they stack
            
            return (
              <div
                key={tool.num}
                style={{
                  position: 'sticky',
                  top: `${topOffset}vh`,
                  // Large margin between cards ensures plenty of scroll time for the Apple-like 'popping up one by one' effect
                  marginBottom: isLast ? '10vh' : '75vh',
                  zIndex: i + 10, // stack on top of each other naturally
                }}
              >
                {/* ── Card ── */}
                <div
                  className="tool-card-inner"
                  style={{
                    background: 'var(--d-surface-solid)',
                    border: '1px solid var(--d-border)',
                    borderRadius: '20px',
                    padding: 'clamp(28px, 5vw, 48px)',
                    display: 'flex',
                    flexDirection: tool.size === 'wide' ? 'column' : 'row',
                    gap: 'clamp(24px, 4vw, 48px)',
                    alignItems: tool.size === 'wide' ? 'flex-start' : 'center',
                    boxShadow: 'var(--d-shadow-lg)',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = 'var(--d-accent-border)'
                    el.style.boxShadow = '0 12px 48px rgba(0,0,0,0.12), 0 0 32px color-mix(in srgb, var(--d-accent) 15%, transparent)'
                    el.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = 'var(--d-border)'
                    el.style.boxShadow = 'var(--d-shadow-lg)'
                    el.style.transform = 'translateY(0)'
                  }}
                >
                  {/* Left — content */}
                  <div style={{ flex: '1 1 50%', minWidth: 0, width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                      <span style={{ fontSize: '36px', filter: 'drop-shadow(0 4px 12px rgba(16,185,129,0.2))' }}>{tool.icon}</span>
                      <span
                        style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: '14px',
                          fontWeight: 700,
                          letterSpacing: '0.15em',
                          color: 'var(--d-accent)',
                          background: 'var(--d-accent-light)',
                          padding: '4px 10px',
                          borderRadius: '6px'
                        }}
                      >
                        {tool.num}
                      </span>
                    </div>
                    <h3
                      style={{
                        fontSize: 'clamp(26px, 3.5vw, 40px)',
                        fontWeight: 800,
                        color: 'var(--d-text)',
                        margin: '0 0 16px',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.1,
                      }}
                    >
                      {tool.name}
                    </h3>
                    <p
                      style={{
                        fontSize: 'clamp(14px, 1.6vw, 16px)',
                        color: 'var(--d-text-secondary)',
                        lineHeight: 1.7,
                        margin: 0,
                        maxWidth: tool.size === 'wide' ? '600px' : '100%',
                      }}
                    >
                      {tool.desc}
                    </p>
                  </div>

                  {/* Right — features/bullets */}
                  <div
                    style={{
                      flex: '1 1 45%',
                      width: '100%',
                      background: 'var(--d-bg-secondary)',
                      padding: '24px 28px',
                      borderRadius: '16px',
                      border: '1px solid var(--d-border-light)',
                    }}
                  >
                    <h4 style={{ 
                      fontSize: '12px', fontWeight: 700, color: 'var(--d-text)', 
                      opacity: 0.6, marginBottom: '20px', textTransform: 'uppercase', 
                      letterSpacing: '0.08em' 
                    }}>
                      Features Included
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {tool.bullets.map((b) => (
                        <div key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                          <span style={{ 
                            color: 'var(--d-accent)', fontSize: '13px', marginTop: '3px',
                            background: 'var(--d-surface-solid)', padding: '2px 6px',
                            borderRadius: '50%', boxShadow: '0 2px 8px rgba(16,185,129,0.1)'
                          }}>✓</span>
                          <span style={{ fontSize: '15px', color: 'var(--d-text)', fontWeight: 500 }}>
                            {b}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/*
        ── Mobile fallback (≤768px):
           Static stack, no animation; controlled entirely by globals.css media queries
      */}
      <section id="tools-mobile" className="tools-mobile-section" aria-hidden="true" style={{ padding: '60px 16px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
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

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {tools.map((tool) => (
            <div
              key={tool.num}
              style={{
                background: 'var(--d-surface-solid)',
                border: '1px solid var(--d-border)',
                borderRadius: '16px',
                padding: '28px 24px',
                boxShadow: 'var(--d-shadow-md)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span style={{ fontSize: '28px' }}>{tool.icon}</span>
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    color: 'var(--d-accent)',
                    background: 'var(--d-accent-light)',
                    padding: '3px 8px',
                    borderRadius: '6px'
                  }}
                >
                  {tool.num}
                </span>
              </div>
              <h3
                style={{
                  fontSize: '22px',
                  fontWeight: 800,
                  color: 'var(--d-text)',
                  margin: '0 0 12px',
                  letterSpacing: '-0.02em',
                }}
              >
                {tool.name}
              </h3>
              <p
                style={{
                  fontSize: '15px',
                  color: 'var(--d-text-secondary)',
                  lineHeight: 1.6,
                  margin: '0 0 20px',
                }}
              >
                {tool.desc}
              </p>
              
              <div style={{ borderTop: '1px solid var(--d-border-light)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {tool.bullets.map((b) => (
                  <div key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <span style={{ color: 'var(--d-accent)', fontSize: '14px' }}>✓</span>
                    <span style={{ fontSize: '14px', color: 'var(--d-text-secondary)' }}>{b}</span>
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
