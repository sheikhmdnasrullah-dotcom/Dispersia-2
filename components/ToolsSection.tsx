'use client'

import { useEffect } from 'react'

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

export default function ToolsSection() {
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>('.tool-card-inner')

    const handleScroll = () => {
      cards.forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.top < 80) {
          const buried = Math.abs(rect.top - 80) / 400
          const scale = Math.max(0.94, 1 - buried * 0.06)
          const translateY = Math.min(-8, -(buried * 12))
          el.style.transform = `scale(${scale}) translateY(${translateY}px)`
          el.style.filter = `brightness(${Math.max(0.7, 1 - buried * 0.3)})`
        } else {
          el.style.transform = 'scale(1) translateY(0px)'
          el.style.filter = 'brightness(1)'
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      id="tools"
      style={{
        padding: '120px 24px 60vh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Section header */}
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <p
          style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: '#00FF80',
            fontFamily: "'IBM Plex Mono', monospace",
            marginBottom: '14px',
            textTransform: 'uppercase',
          }}
        >
          TOOLS
        </p>
        <h2
          style={{
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 800,
            letterSpacing: '-0.035em',
            color: '#fff',
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          Everything you need.
          <br />
          Nothing you don&apos;t.
        </h2>
      </div>

      {/* Sticky card stack */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
          maxWidth: '860px',
          margin: '0 auto',
        }}
      >
        {TOOLS.map((tool, i) => (
          <div
            key={tool.number}
            className="tool-card-outer"
            style={{
              position: 'sticky',
              top: `${60 + i * 10}px`,
              zIndex: i + 1,
              marginBottom: '16px',
            }}
          >
            <div
              className="tool-card-inner"
              style={{
                background: '#0f0f0f',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '4px',
                padding: '48px 52px',
                display: 'flex',
                gap: '40px',
                alignItems: 'center',
                cursor: 'default',
                transition:
                  'transform 0.15s ease, filter 0.15s ease, border-color 0.25s ease, box-shadow 0.25s ease',
                transformOrigin: 'center top',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(0,255,128,0.2)'
                el.style.boxShadow = '0 0 40px rgba(0,255,128,0.06)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(255,255,255,0.07)'
                el.style.boxShadow = 'none'
              }}
            >
              {/* Left — text */}
              <div style={{ flex: '0 0 60%', minWidth: 0 }}>
                <p
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '11px',
                    letterSpacing: '0.15em',
                    color: 'rgba(0,255,128,0.5)',
                    textTransform: 'uppercase',
                    margin: '0 0 8px',
                  }}
                >
                  {tool.number}
                </p>
                <h3
                  style={{
                    fontSize: 'clamp(24px, 3vw, 36px)',
                    fontWeight: 800,
                    color: '#fff',
                    margin: '0 0 16px',
                    letterSpacing: '-0.03em',
                    lineHeight: 1.1,
                  }}
                >
                  {tool.name}
                </h3>
                <p
                  style={{
                    fontSize: '16px',
                    color: 'rgba(255,255,255,0.5)',
                    lineHeight: 1.7,
                    margin: 0,
                    maxWidth: '420px',
                  }}
                >
                  {tool.description}
                </p>
              </div>

              {/* Right — tags */}
              <div
                style={{
                  flex: '0 0 40%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  gap: '8px',
                  flexWrap: 'wrap',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                    justifyContent: 'flex-end',
                  }}
                >
                  {tool.tags.map((tag) => (
                    <span
                      key={tag}
                      className="tool-tag"
                      style={{
                        border: '1px solid rgba(255,255,255,0.1)',
                        background: 'rgba(255,255,255,0.03)',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '11px',
                        color: 'rgba(255,255,255,0.45)',
                        padding: '6px 12px',
                        borderRadius: '2px',
                        whiteSpace: 'nowrap',
                        transition: 'border-color 0.15s ease, color 0.15s ease',
                        cursor: 'default',
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement
                        el.style.borderColor = 'rgba(0,255,128,0.3)'
                        el.style.color = '#00FF80'
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement
                        el.style.borderColor = 'rgba(255,255,255,0.1)'
                        el.style.color = 'rgba(255,255,255,0.45)'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile fallback: on small screens the sticky stack won't feel right,
          so we add some bottom breathing room via padding-bottom: 60vh above */}
    </section>
  )
}
