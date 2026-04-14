'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import ToolCard from '@/components/ToolCard'
import AgentSidebar from '@/components/AgentSidebar'
import CreatorBrainCard from '@/components/CreatorBrainCard'

const NAV_ITEMS = [
  'Overview',
  'Creator Brain',
  'Transcription',
  'Reels',
  'Editorial',
  'Content Pack',
  'Distribution',
  'Agent',
]

const TOOLS = [
  {
    title: 'Transcription',
    description: 'Speaker diarization + semantic chunking',
    status: 'ready' as const,
    href: '/dashboard',
  },
  {
    title: 'Podcast to Reels',
    description: 'Find, cut, caption, export clips',
    status: 'ready' as const,
    href: '/dashboard',
  },
  {
    title: 'Editorial Direction',
    description: 'Guest research + edit briefs',
    status: 'ready' as const,
    href: '/dashboard',
  },
  {
    title: 'Content Pack',
    description: 'Full episode kit in your voice',
    status: 'ready' as const,
    href: '/dashboard',
  },
  {
    title: 'Distribution',
    description: 'Schedule across all platforms',
    status: 'coming-soon' as const,
    href: '/dashboard',
  },
  {
    title: 'Dispersia Agent',
    description: 'Your 24/7 autonomous producer',
    status: 'ready' as const,
    href: '/dashboard',
  },
]

const BRIEFING_ITEMS = [
  {
    message: 'Episode 12 clipped — 3 reels queued',
    time: '2 hrs ago',
  },
  {
    message: 'Next guest profile: ready for review',
    time: '5 hrs ago',
  },
  {
    message: 'Last 7 days: 4.2k impressions across platforms',
    time: '1 day ago',
  },
  {
    message: '3 episodes not yet repurposed',
    time: '1 day ago',
  },
]

const ACTIVITY_DATA = [
  { episode: 'EP 12 — The Compound Effect', tool: 'Reels', status: 'DONE', time: '2h ago' },
  { episode: 'EP 12 — The Compound Effect', tool: 'Transcription', status: 'DONE', time: '3h ago' },
  { episode: 'EP 11 — Hiring Your First VA', tool: 'Content Pack', status: 'PROCESSING', time: '5h ago' },
  { episode: 'EP 10 — Revenue Streams', tool: 'Editorial', status: 'DONE', time: '1d ago' },
  { episode: 'EP 09 — Building in Public', tool: 'Reels', status: 'FAILED', time: '2d ago' },
]

export default function DashboardPage() {
  const router = useRouter()
  const [activeNav, setActiveNav] = useState('Overview')
  const [agentOpen, setAgentOpen] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [userInitials, setUserInitials] = useState('U')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkAuth() {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }
      const email = user.email || ''
      setUserEmail(email)
      setUserInitials(
        email
          .split('@')[0]
          .slice(0, 2)
          .toUpperCase()
      )
      setLoading(false)
    }
    checkAuth()
  }, [router])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  function getStatusPillStyle(status: string): React.CSSProperties {
    const base: React.CSSProperties = {
      display: 'inline-block',
      padding: '3px 10px',
      fontSize: '10px',
      fontFamily: "'IBM Plex Mono', monospace",
      letterSpacing: '0.06em',
      borderRadius: '2px',
      fontWeight: 500,
    }
    if (status === 'DONE')
      return { ...base, color: '#00FF80', background: 'rgba(0,255,128,0.1)', border: '1px solid rgba(0,255,128,0.2)' }
    if (status === 'PROCESSING')
      return { ...base, color: '#FFD700', background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.2)' }
    return { ...base, color: '#FF4444', background: 'rgba(255,68,68,0.1)', border: '1px solid rgba(255,68,68,0.2)' }
  }

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#00FF80',
              animation: 'pulse-dot 2s infinite',
            }}
          />
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '12px',
              color: 'rgba(255,255,255,0.4)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            LOADING...
          </span>
        </div>
      </div>
    )
  }

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  })

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* ── LEFT SIDEBAR ── */}
      <aside
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '240px',
          height: '100vh',
          background: '#090909',
          borderRight: '1px solid rgba(0,255,128,0.08)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 40,
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: '20px 20px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#00FF80',
              animation: 'pulse-dot 2s infinite',
            }}
          />
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: '14px',
              color: '#00FF80',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            DISPERSIA
          </span>
        </div>

        {/* Nav Items */}
        <nav style={{ flex: 1, padding: '0 8px' }}>
          {NAV_ITEMS.map((item) => {
            const isActive = activeNav === item
            return (
              <button
                key={item}
                onClick={() => setActiveNav(item)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  height: '44px',
                  padding: '0 16px',
                  background: isActive ? 'rgba(0,255,128,0.06)' : 'transparent',
                  border: 'none',
                  borderLeft: isActive ? '2px solid #00FF80' : '2px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  borderRadius: '0 2px 2px 0',
                  marginBottom: '2px',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    ;(e.currentTarget as HTMLButtonElement).style.background =
                      'rgba(255,255,255,0.03)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    ;(e.currentTarget as HTMLButtonElement).style.background = 'transparent'
                  }
                }}
              >
                <div
                  style={{
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: isActive ? '#00FF80' : 'rgba(255,255,255,0.2)',
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '13px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: isActive ? '#00FF80' : 'rgba(255,255,255,0.4)',
                  }}
                >
                  {item}
                </span>
              </button>
            )
          })}
        </nav>

        {/* Bottom: User info + Logout */}
        <div
          style={{
            padding: '16px 20px',
            borderTop: '1px solid rgba(255,255,255,0.04)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '12px',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(0,255,128,0.1)',
                border: '1px solid rgba(0,255,128,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '11px',
                color: '#00FF80',
                fontWeight: 500,
                flexShrink: 0,
              }}
            >
              {userInitials}
            </div>
            <div
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '11px',
                color: 'rgba(255,255,255,0.35)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '140px',
              }}
            >
              {userEmail}
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'rgba(255,255,255,0.25)',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '10px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              padding: '4px 0',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLButtonElement).style.color = '#FF4444'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.25)'
            }}
          >
            LOG OUT
          </button>
        </div>
      </aside>

      {/* ── TOP BAR ── */}
      <header
        style={{
          position: 'fixed',
          left: '240px',
          right: 0,
          top: 0,
          height: '56px',
          background: '#080808',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          zIndex: 30,
        }}
      >
        <span
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: '14px',
            color: '#ffffff',
          }}
        >
          {activeNav}
        </span>
        <button
          onClick={() => setAgentOpen(!agentOpen)}
          style={{
            background: '#00FF80',
            color: '#080808',
            border: 'none',
            padding: '8px 18px',
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            borderRadius: '2px',
            transition: 'box-shadow 0.2s',
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.boxShadow =
              '0 0 16px rgba(0,255,128,0.2)'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.boxShadow = 'none'
          }}
        >
          AGENT
        </button>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main
        style={{
          marginLeft: '240px',
          paddingTop: '56px',
          flex: 1,
          minHeight: '100vh',
        }}
      >
        <div
          style={{
            padding: '32px 32px',
            maxWidth: agentOpen ? 'calc(100% - 380px)' : '100%',
            transition: 'max-width 0.25s ease',
          }}
        >
          {/* ── OVERVIEW ── */}
          {activeNav === 'Overview' && (
            <div style={{ animation: 'fade-up 0.3s ease' }}>
              {/* Creator Brain Card */}
              <CreatorBrainCard completionPercent={40} />

              {/* Content Grid: Tools + Morning Briefing */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: agentOpen ? '1fr 1fr' : '1fr 1fr 300px',
                  gap: '0',
                }}
              >
                {/* Tool Grid */}
                <div
                  style={{
                    gridColumn: agentOpen ? '1 / -1' : '1 / 3',
                    display: 'grid',
                    gridTemplateColumns: agentOpen ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
                    gap: '16px',
                    padding: '0 16px 0 0',
                  }}
                >
                  {TOOLS.map((tool) => (
                    <ToolCard
                      key={tool.title}
                      title={tool.title}
                      description={tool.description}
                      status={tool.status}
                      href={tool.href}
                    />
                  ))}
                </div>

                {/* Morning Briefing Panel — hidden when agent is open */}
                {!agentOpen && (
                  <div
                    style={{
                      background: '#0a0a0a',
                      border: '1px solid rgba(255,255,255,0.04)',
                      padding: '20px',
                      height: 'fit-content',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '20px',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: '10px',
                          color: '#00FF80',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                        }}
                      >
                        MORNING BRIEFING
                      </span>
                      <span
                        style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: '10px',
                          color: 'rgba(255,255,255,0.2)',
                        }}
                      >
                        {today}
                      </span>
                    </div>

                    {BRIEFING_ITEMS.map((item, i) => (
                      <div
                        key={i}
                        style={{
                          paddingBottom: '14px',
                          marginBottom: '14px',
                          borderBottom:
                            i < BRIEFING_ITEMS.length - 1
                              ? '1px solid rgba(255,255,255,0.04)'
                              : 'none',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            gap: '8px',
                            alignItems: 'flex-start',
                          }}
                        >
                          <div
                            style={{
                              width: '5px',
                              height: '5px',
                              borderRadius: '50%',
                              background: '#00FF80',
                              marginTop: '5px',
                              flexShrink: 0,
                            }}
                          />
                          <div>
                            <p
                              style={{
                                fontFamily: "'IBM Plex Mono', monospace",
                                fontSize: '12px',
                                color: 'rgba(255,255,255,0.65)',
                                lineHeight: '1.5',
                                marginBottom: '4px',
                              }}
                            >
                              {item.message}
                            </p>
                            <span
                              style={{
                                fontFamily: "'IBM Plex Mono', monospace",
                                fontSize: '10px',
                                color: 'rgba(255,255,255,0.2)',
                              }}
                            >
                              {item.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recent Activity Table */}
              <div style={{ marginTop: '32px' }}>
                <div
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '10px',
                    color: '#00FF80',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginBottom: '16px',
                  }}
                >
                  RECENT ACTIVITY
                </div>

                <div
                  style={{
                    border: '1px solid rgba(255,255,255,0.04)',
                    overflow: 'hidden',
                  }}
                >
                  {/* Header */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '2fr 1fr 1fr 1fr',
                      padding: '12px 16px',
                      background: '#0a0a0a',
                      borderBottom: '1px solid rgba(255,255,255,0.04)',
                    }}
                  >
                    {['EPISODE', 'TOOL', 'STATUS', 'TIME'].map((h) => (
                      <span
                        key={h}
                        style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: '10px',
                          color: 'rgba(255,255,255,0.25)',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* Rows */}
                  {ACTIVITY_DATA.map((row, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '2fr 1fr 1fr 1fr',
                        padding: '12px 16px',
                        background: i % 2 === 0 ? '#0a0a0a' : '#090909',
                        borderBottom:
                          i < ACTIVITY_DATA.length - 1
                            ? '1px solid rgba(255,255,255,0.02)'
                            : 'none',
                        alignItems: 'center',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: '12px',
                          color: 'rgba(255,255,255,0.6)',
                        }}
                      >
                        {row.episode}
                      </span>
                      <span
                        style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: '12px',
                          color: 'rgba(255,255,255,0.4)',
                        }}
                      >
                        {row.tool}
                      </span>
                      <span style={getStatusPillStyle(row.status)}>{row.status}</span>
                      <span
                        style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: '12px',
                          color: 'rgba(255,255,255,0.2)',
                        }}
                      >
                        {row.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Other Nav Items (placeholder content) ── */}
          {activeNav !== 'Overview' && (
            <div style={{ animation: 'fade-up 0.3s ease' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '400px',
                  gap: '16px',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'rgba(0,255,128,0.06)',
                    border: '1px solid rgba(0,255,128,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#00FF80',
                      animation: 'pulse-dot 2s infinite',
                    }}
                  />
                </div>
                <h2
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: '24px',
                    color: '#ffffff',
                  }}
                >
                  {activeNav}
                </h2>
                <p
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.3)',
                    letterSpacing: '0.04em',
                  }}
                >
                  This tool is ready — connect it from Overview.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ── AGENT SIDEBAR ── */}
      <AgentSidebar isOpen={agentOpen} onClose={() => setAgentOpen(false)} />
    </div>
  )
}