'use client'

import { useState, useRef, useEffect } from 'react'
import ToolCard from '@/components/ToolCard'
import AgentSidebar from '@/components/AgentSidebar'
import CreatorBrainCard from '@/components/CreatorBrainCard'
import ThemeToggle from '@/components/ThemeToggle'

const NAV_ITEMS = ['Overview', 'Creator Brain', 'Transcription', 'Reels', 'Editorial', 'Content Pack', 'Distribution', 'Agent']

const TOOLS = [
  { title: 'Transcription', description: 'Speaker diarization + semantic chunking', status: 'ready' as const, tab: 'Transcription' },
  { title: 'Podcast to Reels', description: 'Find, cut, caption, export clips', status: 'ready' as const, tab: 'Reels' },
  { title: 'Editorial Direction', description: 'Guest research + edit briefs', status: 'ready' as const, tab: 'Editorial' },
  { title: 'Content Pack', description: 'Full episode kit in your voice', status: 'ready' as const, tab: 'Content Pack' },
  { title: 'Distribution', description: 'Schedule across all platforms', status: 'ready' as const, tab: 'Distribution' },
  { title: 'Dyspersia Agent', description: 'Your 24/7 autonomous producer', status: 'ready' as const, tab: 'Agent' },
]

const BRIEFING = [
  { message: 'Episode 12 clipped — 3 reels queued for review', time: '2h ago' },
  { message: 'Next guest researched: profile ready', time: '5h ago' },
  { message: 'Last 7 days: 4.2k impressions', time: '1d ago' },
  { message: '3 episodes not yet repurposed', time: '1d ago' },
]

const ACTIVITY = [
  { episode: 'EP 12 — The Compound Effect', tool: 'Reels', status: 'Done', time: '2h ago' },
  { episode: 'EP 12 — The Compound Effect', tool: 'Transcription', status: 'Done', time: '3h ago' },
  { episode: 'EP 11 — Hiring Your First VA', tool: 'Content Pack', status: 'Processing', time: '5h ago' },
  { episode: 'EP 10 — Revenue Streams', tool: 'Editorial', status: 'Done', time: '1d ago' },
  { episode: 'EP 09 — Building in Public', tool: 'Reels', status: 'Queued', time: '2d ago' },
]

const CONTENT_TOOLS = ['Show Notes', 'Chapter Markers', 'Blog Post', 'YouTube Description', 'Title Variants', 'Thumbnail Ideas', 'Newsletter Draft', 'LinkedIn Article', 'Twitter Thread', 'Instagram Caption']

const MOCK_CONTENT: Record<string, string> = {
  'Show Notes': `# Episode 12: The Compound Effect of Consistency\n\n## Key Takeaways\n\n• Consistency beats intensity in creator metrics\n• The "1% daily improvement" framework works when applied to content\n• Why most creators quit at the 90-day mark\n\n## Timestamps\n\n[00:00] Introduction & housekeeping\n[02:14] Guest intro — Marcus Chen, founder of ContentOS\n[05:30] The data behind consistency\n[12:45] Framework: The 1% Content Stack\n[24:30] The 90-day cliff\n[35:00] Real numbers from Marcus's portfolio\n[41:00] Actionable takeaways\n[45:30] Wrap up`,
  'Chapter Markers': `00:00 Introduction\n02:14 Meet Marcus Chen\n05:30 The Data Behind Consistency\n12:45 Framework: The 1% Content Stack\n18:00 Case Study: 0 to 10K in 90 Days\n24:30 The 90-Day Cliff\n31:00 Building Systems That Scale\n35:00 Real Portfolio Numbers\n41:00 Actionable Takeaways\n45:30 Wrap Up`,
  'Blog Post': `# The Compound Effect of Consistency\n\nMost creators think virality is the goal. They're wrong.\n\nIn my latest conversation with Marcus Chen, founder of ContentOS, we dug into the actual data behind creator growth.\n\n## The 1% Framework\n\nIf you improve your content by just 1% every episode, after 100 episodes you're not 100% better — you're 2.7x better.\n\nMarcus tracked 847 podcast creators over 18 months. The consistent ones outperformed sporadic publishers by 4.2x in total audience growth.\n\n## The 90-Day Cliff\n\n68% of new podcasters quit within the first 90 days. They're watching download counts instead of building systems.\n\nThe creators who succeed build a content operating system: one upload becomes 15 pieces of content.\n\n## Key Takeaway\n\nStop chasing viral moments. Start building your compound effect.`,
  'YouTube Description': `The Compound Effect of Consistency | EP 12\n\nIn this episode, I sit down with Marcus Chen (founder of ContentOS) to break down the actual data behind content growth.\n\nWe cover:\n→ The 1% daily improvement framework\n→ Why 68% of podcasters quit at 90 days\n→ Real numbers from 847 creators\n→ Building a content operating system\n\nTimestamps:\n00:00 Introduction\n02:14 Meet Marcus Chen\n05:30 The Data\n12:45 The 1% Framework\n24:30 The 90-Day Cliff\n41:00 Takeaways`,
  'Title Variants': `1. The Compound Effect of Consistency\n2. Why 68% of Podcasters Quit\n3. I Analyzed 847 Creators. Here's What Works.\n4. Stop Chasing Virality. Start Compounding.\n5. The 1% Content Framework\n6. The 90-Day Cliff: Why Creators Never Break Through\n7. One Upload, 15 Pieces of Content\n8. The Math Behind Content Growth\n9. From 0 to 10,000: A Data-Driven Approach\n10. Consistency Beats Talent Every Time`,
  'Thumbnail Ideas': `Thumbnail 1:\n• Split frame: frustrated creator vs celebrating creator\n• Text: "THE 90-DAY CLIFF"\n• Subtitle: "68% quit here"\n\nThumbnail 2:\n• Clean background\n• Large "2.7x" centered\n• Below: "The compound effect"\n\nThumbnail 3:\n• Exponential growth curve\n• Text: "1% BETTER EVERY EPISODE"`,
  'Newsletter Draft': `Subject: The math behind 100 episodes\n\nHey —\n\nI just dropped Episode 12 with Marcus Chen, and one stat changed how I think about content:\n\nIf you improve by 1% per episode, after 100 episodes you're 270% better.\n\nMarcus tracked 847 creators over 18 months. Consistent publishers outperformed sporadic ones by 4.2x.\n\nBut 68% quit in the first 90 days. They never made it to the inflection point.\n\nThe episode breaks down:\n→ Why consistency beats intensity\n→ The "1% Content Stack" framework\n→ How to build a system that runs itself\n\nListen to Episode 12 →`,
  'LinkedIn Article': `I analyzed data from 847 podcast creators.\n\nHere's what actually drives growth:\n\n1. Consistency beats intensity. The ones who published weekly grew 4.2x faster.\n\n2. The 1% compound effect is real. After 100 episodes, you're 270% better.\n\n3. 68% quit at the 90-day mark — right before the inflection point.\n\n4. Systems beat motivation. Top performers had a content operating system.\n\nFull breakdown in my latest episode →`,
  'Twitter Thread': `🧵 I tracked 847 creators for 18 months.\n\n1/ Consistency beats intensity by 4.2x. Weekly publishers grew 4.2x faster.\n\n2/ The 1% compound effect: improve 1% per episode, after 100 you're 270% better.\n\n3/ 68% quit within 90 days. Right before the hockey stick.\n\n4/ Systems > Motivation. Top performers all had a content OS.\n\n5/ Actionable version:\n→ Publish weekly\n→ Repurpose everything\n→ Survive 90 days\n→ Let compound interest work`,
  'Instagram Caption': `Stop chasing virality. Start compounding. 📈\n\nData from 847 creators:\n→ Consistent publishers grew 4.2x faster\n→ 68% quit in the first 90 days\n→ 1% daily improvement = 270% better after 100 episodes\n\nNew episode out now — link in bio 🎙️`,
}

const TRANSCRIPT = [
  { speaker: 'Host', time: '00:00', text: "Welcome back to the show. Today I have a very special guest — someone who's been in the trenches of content creation for the last decade with some fascinating data." },
  { speaker: 'Host', time: '00:18', text: "Marcus Chen is the founder of ContentOS, a platform that helps creators systematize their workflows. Marcus, welcome." },
  { speaker: 'Guest', time: '00:32', text: "Thanks for having me. I've been listening to your podcast for a while. Let's dive into some data." },
  { speaker: 'Host', time: '00:42', text: "You tracked 847 podcast creators over 18 months. What made you want to do this study?" },
  { speaker: 'Guest', time: '00:55', text: "I kept seeing creators ask 'what should I post about?' when the real question was 'how do I stay consistent?' We had the data to answer that empirically." },
  { speaker: 'Host', time: '01:15', text: "The findings were surprising, right? The conventional wisdom is all about going viral." },
  { speaker: 'Guest', time: '01:28', text: "The data says the opposite. Creators who grew the most — by 4.2x — were the ones who published consistently. Weekly. Even when the content was mediocre." },
  { speaker: 'Host', time: '01:50', text: "4.2x. That's a fundamentally different trajectory. Walk me through the methodology." },
  { speaker: 'Guest', time: '02:02', text: "We segmented into three groups: consistent (weekly+), sporadic (2-3x/month), and bursty (5 in a week then gone for a month)." },
]

const CLIPS = [
  { id: 1, start: '08:45', end: '10:12', hook: "The data says the opposite. Consistency beats virality by 4.2x.", score: 91, tags: ['Strong Hook', 'Under 60s'] },
  { id: 2, start: '24:30', end: '26:00', hook: "68% quit at the 90-day mark. Right before the hockey stick.", score: 87, tags: ['Viral Potential', 'Data'] },
  { id: 3, start: '12:45', end: '14:30', hook: "1% per episode. After 100, you're 270% better.", score: 82, tags: ['Educational', 'Framework'] },
  { id: 4, start: '35:00', end: '36:45', hook: "One upload becomes 15 pieces of content. That's a system.", score: 75, tags: ['Practical', 'Systems'] },
  { id: 5, start: '41:00', end: '42:30', hook: "Stop optimizing downloads. Start building a content OS.", score: 68, tags: ['CTA', 'Closing'] },
]

export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState('Overview')
  const [agentOpen, setAgentOpen] = useState(false)
  const [demoMode, setDemoMode] = useState(true)

  const userEmail = 'dev@dyspersia.com'
  const userInitials = 'DY'

  const [transcriptLoaded, setTranscriptLoaded] = useState(false)
  const [reelsLoaded, setReelsLoaded] = useState(false)
  const [selectedClip, setSelectedClip] = useState<number | null>(null)
  const [reelFormat, setReelFormat] = useState('9:16')
  const [captionOn, setCaptionOn] = useState(true)
  const [captionStyle, setCaptionStyle] = useState('Bold')
  const [exportingClip, setExportingClip] = useState(false)
  const [clipExported, setClipExported] = useState(false)
  const [reelAnalyzing, setReelAnalyzing] = useState(false)

  const [guestName, setGuestName] = useState('')
  const [guestCompany, setGuestCompany] = useState('')
  const [guestLinkedin, setGuestLinkedin] = useState('')
  const [guestTwitter, setGuestTwitter] = useState('')
  const [researchLoading, setResearchLoading] = useState(false)
  const [researchDone, setResearchDone] = useState(false)
  const [briefGenerated, setBriefGenerated] = useState(false)
  const [researchStep, setResearchStep] = useState('')

  const [activeContentTool, setActiveContentTool] = useState('Show Notes')
  const [contentGenerated, setContentGenerated] = useState(false)
  const [contentLoading, setContentLoading] = useState(false)

  const [brainVoice, setBrainVoice] = useState('Conversational, data-driven, occasionally irreverent. Short sentences for emphasis. Numbers back every claim.')
  const [brainAudience, setBrainAudience] = useState('Founders, operators, and creator-entrepreneurs. Ages 25-45. LinkedIn and Twitter. Value actionable frameworks.')
  const [brainKnowledge, setBrainKnowledge] = useState('')
  const [brainTraining, setBrainTraining] = useState(false)
  const [brainTrained, setBrainTrained] = useState(false)

  const [platformConnected, setPlatformConnected] = useState<Record<string, boolean>>({ YouTube: true, Spotify: true, Twitter: false, LinkedIn: true })
  const [connectingPlatform, setConnectingPlatform] = useState('')

  const [agentMessages, setAgentMessages] = useState([
    { id: 1, role: 'user' as const, text: "Status on episode 12?", time: '8:02 AM' },
    { id: 2, role: 'agent' as const, text: "Fully processed. Transcript ready. 8 clips found (top: 91). Content Pack not yet generated. Run it?", time: '8:02 AM' },
    { id: 3, role: 'user' as const, text: 'Yes — content pack and top 3 clips', time: '8:03 AM' },
    { id: 4, role: 'agent' as const, text: "Queued. ETA 45s for content, clips rendering for 08:45, 24:30, 41:00.", time: '8:03 AM' },
    { id: 5, role: 'agent' as const, text: '✓ Done. Content Pack + 3 clips exported.', time: '8:04 AM' },
  ])
  const [agentInput, setAgentInput] = useState('')
  const [agentTyping, setAgentTyping] = useState(false)
  const agentScrollRef = useRef<HTMLDivElement>(null)
  const agentIdx = useRef(0)

  useEffect(() => { if (agentScrollRef.current) agentScrollRef.current.scrollTop = agentScrollRef.current.scrollHeight }, [agentMessages])
  useEffect(() => { if (demoMode) { setTranscriptLoaded(true); setReelsLoaded(true); setContentGenerated(true); setResearchDone(true); setBriefGenerated(true) } }, [demoMode])

  const f = "'Inter', sans-serif"
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 14px', background: 'var(--d-surface-solid)', border: '1px solid var(--d-border)',
    color: 'var(--d-text)', fontFamily: f, fontSize: '13px', outline: 'none', borderRadius: '10px',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease', marginBottom: '12px', resize: 'none' as const,
  }
  const lblStyle: React.CSSProperties = { display: 'block', fontSize: '12px', color: 'var(--d-text-secondary)', marginBottom: '6px', fontWeight: 600, fontFamily: f }

  function statusStyle(s: string): React.CSSProperties {
    const base: React.CSSProperties = { display: 'inline-block', padding: '3px 10px', fontSize: '11px', fontFamily: f, borderRadius: '6px', fontWeight: 600 }
    if (s === 'Done') return { ...base, color: 'var(--d-status-success)', background: 'var(--d-accent-light)' }
    if (s === 'Processing') return { ...base, color: 'var(--d-status-warning)', background: 'rgba(245,158,11,0.1)' }
    return { ...base, color: 'var(--d-text-muted)', background: 'var(--d-bg-secondary)' }
  }

  function handleConnect(p: string) { setConnectingPlatform(p); setTimeout(() => { setPlatformConnected(prev => ({ ...prev, [p]: true })); setConnectingPlatform('') }, 1500) }
  function handleResearch() { setResearchLoading(true); setResearchStep('Scanning LinkedIn...'); setTimeout(() => setResearchStep('Analyzing...'), 1000); setTimeout(() => { setResearchLoading(false); setResearchDone(true); setResearchStep('') }, 2500) }
  function handleExport() { setExportingClip(true); setClipExported(false); setTimeout(() => { setExportingClip(false); setClipExported(true) }, 2000) }
  function handleAgentSend() {
    const text = agentInput.trim() || 'What should I focus on?'
    setAgentMessages(prev => [...prev, { id: Date.now(), role: 'user' as const, text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])
    setAgentInput(''); setAgentTyping(true)
    const r = ["Processing. 5 clips found above 80. Top at 08:45 (score 91). Export all?", "Weekly: 4.2k impressions, 312 engagements. LinkedIn outperforms by 3.2x.", "Guest researched. Profile + 10 questions ready. Send brief to email?", "YouTube 2,840 views (68% retention). LinkedIn 1.2k impressions."]
    setTimeout(() => { setAgentMessages(prev => [...prev, { id: Date.now() + 1, role: 'agent' as const, text: r[agentIdx.current % r.length], time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]); agentIdx.current++; setAgentTyping(false) }, 1200)
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: f }}>
      {/* SIDEBAR */}
      <aside style={{ position: 'fixed', left: 0, top: 0, width: '220px', height: '100vh', background: 'var(--d-glass-bg)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderRight: '1px solid var(--d-glass-border)', display: 'flex', flexDirection: 'column', zIndex: 40, transition: 'all 0.3s ease' }}>
        <div style={{ padding: '18px 16px 22px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="status-dot" />
          <span style={{ fontWeight: 700, fontSize: '15px' }}><span className="gradient-text">dyspersia</span></span>
        </div>
        <nav style={{ flex: 1, padding: '0 8px' }}>
          {NAV_ITEMS.map(item => {
            const active = activeNav === item
            return (
              <button key={item} onClick={() => setActiveNav(item)} style={{
                display: 'flex', alignItems: 'center', gap: '10px', width: '100%', height: '38px', padding: '0 14px',
                background: active ? 'var(--d-accent-light)' : 'transparent', border: 'none',
                cursor: 'pointer', transition: 'all 0.15s ease', borderRadius: '10px', marginBottom: '2px',
                borderLeft: active ? '3px solid var(--d-accent)' : '3px solid transparent',
              }}
                onMouseEnter={e => { if (!active) (e.currentTarget as HTMLButtonElement).style.background = 'var(--d-bg-secondary)' }}
                onMouseLeave={e => { if (!active) (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}>
                <span style={{ fontSize: '13px', color: active ? 'var(--d-accent)' : 'var(--d-text-secondary)', fontWeight: active ? 600 : 400, transition: 'color 0.15s ease' }}>{item}</span>
              </button>
            )
          })}
        </nav>
        <div style={{ padding: '14px 16px', borderTop: '1px solid var(--d-border-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '10px', background: 'var(--d-gradient-subtle)', border: '1px solid var(--d-accent-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 600 }}><span className="gradient-text">{userInitials}</span></div>
            <span style={{ fontSize: '12px', color: 'var(--d-text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '130px' }}>{userEmail}</span>
          </div>
        </div>
      </aside>

      {/* TOP */}
      <header style={{ position: 'fixed', left: '220px', right: 0, top: 0, height: '56px', background: 'var(--d-glass-bg)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid var(--d-glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', zIndex: 30, transition: 'all 0.3s ease' }}>
        <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--d-text)', letterSpacing: '-0.01em' }}>{activeNav}</span>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <ThemeToggle />
          <button onClick={() => setDemoMode(true)} style={{ background: 'var(--d-glass-bg)', backdropFilter: 'blur(8px)', border: '1px solid var(--d-border)', color: 'var(--d-text-secondary)', fontFamily: f, fontSize: '12px', padding: '6px 14px', cursor: 'pointer', borderRadius: '8px', transition: 'all 0.2s ease' }}>⚡ Demo</button>
          <button onClick={() => setAgentOpen(!agentOpen)} style={{ background: 'var(--d-accent)', color: '#fff', border: 'none', padding: '7px 16px', fontFamily: f, fontSize: '12px', fontWeight: 600, cursor: 'pointer', borderRadius: '8px', transition: 'all 0.2s ease', boxShadow: '0 2px 12px rgba(16,185,129,0.25)' }}>Agent</button>
        </div>
      </header>

      {/* MAIN */}
      <main style={{ marginLeft: '220px', paddingTop: '56px', flex: 1, minHeight: '100vh', paddingBottom: '40px' }}>
        <div style={{ padding: '24px', maxWidth: agentOpen ? 'calc(100% - 360px)' : '100%', transition: 'max-width 0.2s ease' }}>

          {/* OVERVIEW */}
          {activeNav === 'Overview' && (
            <div style={{ animation: 'fade-in 0.25s ease' }}>

              {/* Greeting */}
              <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--d-text)', letterSpacing: '-0.02em', margin: 0 }}>Good morning 👋</h1>
                <p style={{ fontSize: '13px', color: 'var(--d-text-muted)', marginTop: '4px' }}>{today} · 4 episodes this month · 3 pending repurpose</p>
              </div>

              {/* ── ROW 1: Stat Cards ── */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '24px' }}>
                {/* Episodes This Month */}
                <div className="glass-card" style={{ padding: '20px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--d-text-muted)', fontWeight: 600, letterSpacing: '0.04em', marginBottom: '10px' }}>EPISODES THIS MONTH</div>
                  <div style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '12px' }}>
                    <span className="gradient-text">4</span>
                    <span style={{ fontSize: '14px', color: 'var(--d-text-muted)', fontWeight: 400 }}>/8</span>
                  </div>
                  {/* Usage bar */}
                  <div style={{ height: '4px', background: 'var(--d-bg-tertiary)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ width: '50%', height: '100%', background: 'var(--d-gradient)', borderRadius: '2px' }} />
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--d-text-muted)', marginTop: '6px' }}>4 remaining in plan</div>
                </div>

                {/* Clips Generated */}
                <div className="glass-card" style={{ padding: '20px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--d-text-muted)', fontWeight: 600, letterSpacing: '0.04em', marginBottom: '10px' }}>CLIPS GENERATED</div>
                  <div style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '12px' }}>
                    <span className="gradient-text">38</span>
                  </div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {['9:16', '1:1', '16:9'].map(f => (
                      <span key={f} style={{ fontSize: '10px', padding: '2px 7px', borderRadius: '100px', background: 'var(--d-accent-light)', border: '1px solid var(--d-accent-border)', color: 'var(--d-accent)', fontWeight: 600 }}>{f}</span>
                    ))}
                  </div>
                </div>

                {/* Content Pieces */}
                <div className="glass-card" style={{ padding: '20px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--d-text-muted)', fontWeight: 600, letterSpacing: '0.04em', marginBottom: '10px' }}>CONTENT PIECES</div>
                  <div style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '12px' }}>
                    <span className="gradient-text">127</span>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--d-text-muted)' }}>Across 10 formats this month</div>
                </div>

                {/* Brain Strength */}
                <div className="glass-card" style={{ padding: '20px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--d-text-muted)', fontWeight: 600, letterSpacing: '0.04em', marginBottom: '10px' }}>BRAIN STRENGTH</div>
                  <div style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '12px' }}>
                    <span className="gradient-text">78%</span>
                  </div>
                  <div style={{ height: '4px', background: 'var(--d-bg-tertiary)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ width: '78%', height: '100%', background: 'var(--d-gradient)', borderRadius: '2px' }} />
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--d-text-muted)', marginTop: '6px' }}>+6% from last month</div>
                </div>
              </div>

              {/* ── ROW 2: Recent Episodes ── */}
              <div className="glass-card" style={{ padding: '0', overflow: 'hidden', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid var(--d-border-light)' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--d-text)', letterSpacing: '-0.01em' }}>Recent Episodes</span>
                  <button style={{ fontSize: '12px', color: 'var(--d-accent)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: f, fontWeight: 600 }}>+ New Episode</button>
                </div>
                {/* Table header */}
                <div style={{ display: 'grid', gridTemplateColumns: '2.5fr 1fr 1fr 1fr', padding: '10px 20px', background: 'var(--d-bg-secondary)' }}>
                  {['Episode', 'Date', 'Status', 'Actions'].map(h => (
                    <span key={h} style={{ fontSize: '11px', color: 'var(--d-text-muted)', fontWeight: 600, letterSpacing: '0.03em' }}>{h}</span>
                  ))}
                </div>
                {[
                  { title: 'EP 12 — The Compound Effect', date: 'Apr 14', status: 'Ready' },
                  { title: 'EP 11 — Hiring Your First VA',   date: 'Apr 7',  status: 'Processing' },
                  { title: 'EP 10 — Revenue Streams',        date: 'Mar 31', status: 'Ready' },
                  { title: 'EP 09 — Building in Public',     date: 'Mar 24', status: 'Draft' },
                ].map((ep, i, arr) => {
                  const statusColors: Record<string, { bg: string; color: string; border: string }> = {
                    Ready:      { bg: 'var(--d-accent-light)', color: 'var(--d-accent)',      border: 'var(--d-accent-border)' },
                    Processing: { bg: 'rgba(251,191,36,0.1)',  color: '#fbbf24',              border: 'rgba(251,191,36,0.3)' },
                    Draft:      { bg: 'var(--d-glass-bg)',     color: 'var(--d-text-muted)',  border: 'var(--d-border)' },
                  }
                  const sc = statusColors[ep.status]
                  return (
                    <div key={ep.title} style={{ display: 'grid', gridTemplateColumns: '2.5fr 1fr 1fr 1fr', padding: '13px 20px', borderBottom: i < arr.length - 1 ? '1px solid var(--d-border-light)' : 'none', alignItems: 'center' }}>
                      <span style={{ fontSize: '13px', color: 'var(--d-text)', fontWeight: 500 }}>{ep.title}</span>
                      <span style={{ fontSize: '12px', color: 'var(--d-text-muted)' }}>{ep.date}</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '3px 10px', borderRadius: '100px', background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`, fontSize: '11px', fontWeight: 600, width: 'fit-content' }}>
                        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: sc.color, flexShrink: 0, animation: ep.status === 'Processing' ? 'pulse-subtle 1.2s ease-in-out infinite' : undefined }} />
                        {ep.status}
                      </span>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button onClick={() => setActiveNav('Transcription')} style={{ fontSize: '11px', fontWeight: 600, padding: '5px 12px', background: 'var(--d-glass-bg)', border: '1px solid var(--d-border)', color: 'var(--d-text-secondary)', borderRadius: '7px', cursor: 'pointer', fontFamily: f, transition: 'all 0.15s ease' }}
                          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--d-accent-border)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--d-accent)' }}
                          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--d-border)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--d-text-secondary)' }}>
                          Open
                        </button>
                        <button onClick={() => setActiveNav('Reels')} style={{ fontSize: '11px', fontWeight: 600, padding: '5px 12px', background: 'var(--d-glass-bg)', border: '1px solid var(--d-border)', color: 'var(--d-text-secondary)', borderRadius: '7px', cursor: 'pointer', fontFamily: f, transition: 'all 0.15s ease' }}
                          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--d-accent-border)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--d-accent)' }}
                          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--d-border)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--d-text-secondary)' }}>
                          Outputs
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* ── ROW 3: Quick Actions ── */}
              <div style={{ marginBottom: '10px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--d-text-muted)', letterSpacing: '0.04em', display: 'block', marginBottom: '14px' }}>QUICK ACTIONS</span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                  {[
                    { icon: '⬆️', label: 'New Episode',           sub: 'Upload URL or file',           tab: 'Transcription' },
                    { icon: '✂️', label: 'Cut Clips',             sub: 'Find best moments',            tab: 'Reels' },
                    { icon: '✍️', label: 'Generate Content Pack', sub: '10 formats, your voice',      tab: 'Content Pack' },
                    { icon: '🔍', label: 'Research Guest',        sub: 'LinkedIn · press · Twitter',   tab: 'Editorial' },
                  ].map(action => (
                    <button
                      key={action.label}
                      onClick={() => setActiveNav(action.tab)}
                      className="glass-card"
                      style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                        padding: '20px', cursor: 'pointer', border: '1px solid var(--d-glass-border)',
                        background: 'var(--d-glass-bg)', textAlign: 'left', fontFamily: f,
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                        borderRadius: '14px',
                      }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLButtonElement
                        el.style.transform = 'translateY(-3px)'
                        el.style.boxShadow = '0 8px 28px rgba(16,185,129,0.12)'
                        el.style.borderColor = 'var(--d-accent-border)'
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLButtonElement
                        el.style.transform = 'translateY(0)'
                        el.style.boxShadow = ''
                        el.style.borderColor = 'var(--d-glass-border)'
                      }}
                    >
                      <span style={{ fontSize: '22px', marginBottom: '12px' }}>{action.icon}</span>
                      <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--d-text)', letterSpacing: '-0.01em', display: 'block', marginBottom: '4px' }}>{action.label}</span>
                      <span style={{ fontSize: '12px', color: 'var(--d-text-muted)', lineHeight: 1.4 }}>{action.sub}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* CREATOR BRAIN */}
          {activeNav === 'Creator Brain' && (
            <div style={{ animation: 'fade-in 0.2s ease', maxWidth: '640px' }}>
              {[
                { label: 'Voice profile', val: brainVoice, set: setBrainVoice, h: 100 },
                { label: 'Audience profile', val: brainAudience, set: setBrainAudience, h: 80 },
              ].map(x => (
                <div key={x.label} style={{ marginBottom: '24px' }}>
                  <label style={lblStyle}>{x.label}</label>
                  <textarea style={{ ...inputStyle, minHeight: `${x.h}px`, lineHeight: 1.6 }} value={x.val} onChange={e => x.set(e.target.value)} />
                </div>
              ))}
              <label style={lblStyle}>Knowledge base</label>
              <textarea style={{ ...inputStyle, minHeight: '140px', lineHeight: 1.6 }} placeholder="Paste newsletters, brand docs, scripts..." value={brainKnowledge} onChange={e => setBrainKnowledge(e.target.value)} />
              <button onClick={() => { setBrainTraining(true); setTimeout(() => { setBrainTraining(false); setBrainTrained(true) }, 2000) }}
                style={{ padding: '8px 20px', background: 'var(--d-accent)', color: '#fff', border: 'none', fontFamily: f, fontSize: '13px', fontWeight: 500, cursor: 'pointer', borderRadius: '6px', transition: 'opacity 0.15s ease' }}>
                {brainTraining ? 'Training...' : brainTrained ? '✓ Updated' : 'Train brain →'}
              </button>
            </div>
          )}

          {/* TRANSCRIPTION */}
          {activeNav === 'Transcription' && (
            <div style={{ animation: 'fade-in 0.2s ease' }}>
              {!transcriptLoaded && <button onClick={() => setTranscriptLoaded(true)} style={{ padding: '8px 20px', background: 'var(--d-accent)', color: '#fff', border: 'none', fontFamily: f, fontSize: '13px', fontWeight: 500, cursor: 'pointer', borderRadius: '6px', marginBottom: '20px' }}>Load demo ⚡</button>}
              {transcriptLoaded && (
                <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '16px' }}>
                  <div>
                    <div style={{ background: 'var(--d-surface)', border: '1px solid var(--d-border)', padding: '10px 14px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px', borderRadius: '6px' }}>
                      <span style={{ fontSize: '14px', color: 'var(--d-accent)', cursor: 'pointer' }}>▶</span>
                      <div style={{ flex: 1, height: '20px', background: 'var(--d-bg-secondary)', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '1px', padding: '0 4px' }}>
                        {Array.from({ length: 50 }).map((_, i) => <div key={i} style={{ width: '2px', height: `${Math.random() * 100}%`, background: i < 12 ? 'var(--d-accent)' : 'var(--d-border)', borderRadius: '1px' }} />)}
                      </div>
                      <span style={{ fontSize: '11px', color: 'var(--d-text-muted)' }}>08:45 / 46:22</span>
                    </div>
                    <input placeholder="Search transcript..." style={{ ...inputStyle }} />
                    <div style={{ background: 'var(--d-surface)', border: '1px solid var(--d-border)', padding: '16px', borderRadius: '8px', maxHeight: '440px', overflowY: 'auto' }}>
                      {TRANSCRIPT.map((seg, i) => (
                        <div key={i} style={{ marginBottom: '14px', paddingBottom: '14px', borderBottom: i < TRANSCRIPT.length - 1 ? '1px solid var(--d-border-light)' : 'none' }}>
                          <div style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}>
                            <span style={{ fontSize: '11px', color: 'var(--d-accent)', fontWeight: 500 }}>{seg.speaker}</span>
                            <span style={{ fontSize: '11px', color: 'var(--d-text-muted)' }}>{seg.time}</span>
                          </div>
                          <p style={{ fontSize: '13px', color: 'var(--d-text)', lineHeight: 1.7 }}>{seg.text}</p>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: '6px', marginTop: '12px' }}>
                      {['DOCX', 'SRT', 'JSON'].map(fmt => (
                        <button key={fmt} style={{ padding: '6px 12px', background: 'transparent', border: '1px solid var(--d-border)', color: 'var(--d-text-muted)', fontFamily: f, fontSize: '12px', cursor: 'pointer', borderRadius: '6px', transition: 'all 0.15s ease' }}>{fmt}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--d-text)', display: 'block', marginBottom: '8px' }}>Topics</span>
                    {['00:00 — Introduction', '02:14 — Guest Background', '05:30 — The Data', '08:45 — Core Framework', '24:30 — The 90-Day Cliff', '35:00 — Real Numbers', '41:00 — Wrap Up'].map((t, i) => (
                      <div key={t} style={{ padding: '8px 12px', background: i === 3 ? 'var(--d-accent-light)' : 'transparent', border: '1px solid ' + (i === 3 ? 'var(--d-accent-border)' : 'var(--d-border-light)'), marginBottom: '3px', cursor: 'pointer', borderRadius: '6px', transition: 'all 0.15s ease' }}>
                        <span style={{ fontSize: '12px', color: i === 3 ? 'var(--d-accent)' : 'var(--d-text-secondary)' }}>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* REELS */}
          {activeNav === 'Reels' && (
            <div style={{ animation: 'fade-in 0.2s ease' }}>
              {!reelsLoaded && <button onClick={() => setReelsLoaded(true)} style={{ padding: '8px 20px', background: 'var(--d-accent)', color: '#fff', border: 'none', fontFamily: f, fontSize: '13px', fontWeight: 500, cursor: 'pointer', borderRadius: '6px', marginBottom: '20px' }}>Load demo ⚡</button>}
              {reelsLoaded && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--d-text)', display: 'block', marginBottom: '8px' }}>Clip finder</span>
                    <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
                      <textarea placeholder="What clips do you want?" rows={2} style={{ ...inputStyle, marginBottom: 0, flex: 1 }} />
                      <button onClick={() => { setReelAnalyzing(true); setTimeout(() => setReelAnalyzing(false), 1500) }}
                        style={{ padding: '8px 14px', background: 'var(--d-accent)', color: '#fff', border: 'none', fontFamily: f, fontSize: '12px', fontWeight: 500, cursor: 'pointer', borderRadius: '6px', alignSelf: 'flex-end' }}>
                        {reelAnalyzing ? '...' : 'Analyze'}
                      </button>
                    </div>
                    {CLIPS.map(clip => (
                      <div key={clip.id} onClick={() => { setSelectedClip(clip.id); setClipExported(false) }}
                        style={{ background: selectedClip === clip.id ? 'var(--d-accent-light)' : 'var(--d-surface)', border: `1px solid ${selectedClip === clip.id ? 'var(--d-accent-border)' : 'var(--d-border)'}`, padding: '12px', marginBottom: '6px', cursor: 'pointer', borderRadius: '8px', transition: 'all 0.15s ease' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span style={{ fontSize: '11px', color: 'var(--d-text-muted)' }}>{clip.start} — {clip.end}</span>
                          <span style={{ fontSize: '13px', fontWeight: 600, color: clip.score >= 85 ? 'var(--d-accent)' : clip.score >= 70 ? 'var(--d-status-warning)' : 'var(--d-text-muted)' }}>{clip.score}</span>
                        </div>
                        <p style={{ fontSize: '13px', color: 'var(--d-text)', lineHeight: 1.5, marginBottom: '6px' }}>{clip.hook}</p>
                        <div style={{ display: 'flex', gap: '4px' }}>
                          {clip.tags.map(t => <span key={t} style={{ fontSize: '10px', color: 'var(--d-accent)', background: 'var(--d-accent-light)', padding: '1px 6px', borderRadius: '3px' }}>{t}</span>)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--d-text)', display: 'block', marginBottom: '8px' }}>Editor</span>
                    <div style={{ background: 'var(--d-surface)', border: '1px solid var(--d-border)', aspectRatio: reelFormat === '9:16' ? '9/16' : reelFormat === '1:1' ? '1/1' : '16/9', maxHeight: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px', borderRadius: '8px' }}>
                      <span style={{ fontSize: '28px', color: 'var(--d-text-muted)', cursor: 'pointer' }}>▶</span>
                    </div>
                    <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
                      {['9:16', '1:1', '16:9'].map(fmt => (
                        <button key={fmt} onClick={() => setReelFormat(fmt)} style={{ flex: 1, padding: '6px', fontFamily: f, fontSize: '12px', cursor: 'pointer', borderRadius: '6px', transition: 'all 0.15s ease',
                          background: reelFormat === fmt ? 'var(--d-accent-light)' : 'transparent', border: reelFormat === fmt ? '1px solid var(--d-accent-border)' : '1px solid var(--d-border)', color: reelFormat === fmt ? 'var(--d-accent)' : 'var(--d-text-muted)' }}>{fmt}</button>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '12px', color: 'var(--d-text-secondary)' }}>Captions</span>
                      <button onClick={() => setCaptionOn(!captionOn)} style={{ padding: '3px 10px', fontFamily: f, fontSize: '11px', cursor: 'pointer', borderRadius: '4px', background: captionOn ? 'var(--d-accent)' : 'transparent', color: captionOn ? '#fff' : 'var(--d-text-muted)', border: captionOn ? 'none' : '1px solid var(--d-border)' }}>{captionOn ? 'On' : 'Off'}</button>
                      {captionOn && ['Minimal', 'Bold', 'Branded', 'Futuristic'].map(s => (
                        <button key={s} onClick={() => setCaptionStyle(s)} style={{ padding: '3px 8px', fontFamily: f, fontSize: '10px', cursor: 'pointer', borderRadius: '4px', transition: 'all 0.15s ease',
                          background: captionStyle === s ? 'var(--d-accent-light)' : 'transparent', border: captionStyle === s ? '1px solid var(--d-accent-border)' : '1px solid var(--d-border)', color: captionStyle === s ? 'var(--d-accent)' : 'var(--d-text-muted)' }}>{s}</button>
                      ))}
                    </div>
                    <button onClick={handleExport} style={{ width: '100%', padding: '10px', background: 'var(--d-accent)', color: '#fff', border: 'none', fontFamily: f, fontSize: '13px', fontWeight: 500, cursor: 'pointer', borderRadius: '6px', marginBottom: '10px' }}>
                      {exportingClip ? 'Exporting...' : clipExported ? '✓ Exported' : 'Export clip'}
                    </button>
                    {clipExported && (
                      <div style={{ display: 'flex', gap: '6px' }}>
                        {['9:16', '1:1', '16:9'].map(d => (
                          <button key={d} style={{ flex: 1, padding: '6px', background: 'transparent', border: '1px solid var(--d-border)', color: 'var(--d-text-secondary)', fontFamily: f, fontSize: '11px', cursor: 'pointer', borderRadius: '6px' }}>Download {d}</button>
                        ))}
                      </div>
                    )}
                    <div style={{ marginTop: '20px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--d-text)', display: 'block', marginBottom: '8px' }}>Performance predictor</span>
                      {[{ l: 'Hook Strength', v: 88 }, { l: 'Retention', v: 74 }, { l: 'Emotional Arc', v: 81 }, { l: 'Platform Fit', v: 91 }].map(m => (
                        <div key={m.l} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                          <span style={{ fontSize: '12px', color: 'var(--d-text-muted)', width: '100px' }}>{m.l}</span>
                          <div style={{ flex: 1, height: '3px', background: 'var(--d-bg-tertiary)', borderRadius: '2px' }}>
                            <div style={{ width: `${m.v}%`, height: '100%', background: 'var(--d-accent)', borderRadius: '2px' }} />
                          </div>
                          <span style={{ fontSize: '12px', color: 'var(--d-text-secondary)', width: '30px', textAlign: 'right' }}>{m.v}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* EDITORIAL */}
          {activeNav === 'Editorial' && (
            <div style={{ animation: 'fade-in 0.2s ease', display: 'grid', gridTemplateColumns: '2fr 3fr', gap: '20px' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--d-text)', display: 'block', marginBottom: '12px' }}>Guest intelligence</span>
                {[{ l: 'Guest name', v: guestName, s: setGuestName, ph: 'Marcus Chen' }, { l: 'Company', v: guestCompany, s: setGuestCompany, ph: 'ContentOS' }, { l: 'LinkedIn', v: guestLinkedin, s: setGuestLinkedin, ph: 'linkedin.com/in/...' }, { l: 'Twitter', v: guestTwitter, s: setGuestTwitter, ph: '@handle' }].map(x => (
                  <div key={x.l} style={{ marginBottom: '8px' }}>
                    <label style={lblStyle}>{x.l}</label>
                    <input value={x.v} onChange={e => x.s(e.target.value)} placeholder={x.ph} style={inputStyle} />
                  </div>
                ))}
                <button onClick={handleResearch} style={{ width: '100%', padding: '8px', background: 'var(--d-accent)', color: '#fff', border: 'none', fontFamily: f, fontSize: '13px', fontWeight: 500, cursor: 'pointer', borderRadius: '6px', marginBottom: '12px' }}>
                  {researchLoading ? researchStep : 'Research guest'}
                </button>
                {researchDone && (
                  <div style={{ background: 'var(--d-surface)', border: '1px solid var(--d-border)', padding: '14px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--d-text)', marginBottom: '2px' }}>Marcus Chen</div>
                    <div style={{ fontSize: '12px', color: 'var(--d-text-muted)', marginBottom: '10px' }}>CEO, ContentOS · San Francisco</div>
                    <span style={{ fontSize: '11px', color: 'var(--d-accent)', fontWeight: 500 }}>Core beliefs</span>
                    {['Consistency beats talent', 'Data over gut feelings', 'Systems thinking scales content'].map(b => (
                      <div key={b} style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                        <span style={{ color: 'var(--d-accent)', fontSize: '8px', marginTop: '5px' }}>●</span>
                        <span style={{ fontSize: '12px', color: 'var(--d-text-secondary)', lineHeight: 1.5 }}>{b}</span>
                      </div>
                    ))}
                    <button onClick={() => setBriefGenerated(true)} style={{ width: '100%', padding: '8px', background: 'transparent', border: '1px solid var(--d-border)', color: 'var(--d-text-secondary)', fontFamily: f, fontSize: '12px', cursor: 'pointer', borderRadius: '6px', marginTop: '12px', transition: 'all 0.15s ease' }}>Generate edit brief →</button>
                  </div>
                )}
              </div>
              <div>
                {briefGenerated && (
                  <div style={{ background: 'var(--d-surface)', border: '1px solid var(--d-border)', padding: '20px', borderRadius: '8px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--d-text)', display: 'block', marginBottom: '16px' }}>Edit brief — EP 12</span>
                    {[
                      { ts: '00:00 - 02:14', what: 'Guest intro, personal story hook', ref: 'Matches LinkedIn post, Mar 2024', dir: 'Let this breathe. Strong opener.', clip: 'High' },
                      { ts: '08:45 - 12:30', what: '"Million dollar mistake" story', ref: 'Referenced in TechCrunch interview', dir: 'Cut to 90s. Hero Reel.', clip: 'High ⚡' },
                      { ts: '24:30 - 28:00', what: 'Controversial take on VC funding', ref: 'Matches viral tweet, 12k likes', dir: 'This will go viral. Prioritize.', clip: 'Viral 🔥' },
                    ].map(b => (
                      <div key={b.ts} style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--d-border-light)' }}>
                        <span style={{ fontSize: '12px', color: 'var(--d-accent)', fontWeight: 500, display: 'block', marginBottom: '4px' }}>[{b.ts}]</span>
                        <div style={{ fontSize: '13px', color: 'var(--d-text-secondary)', lineHeight: 1.7 }}>
                          <div><strong style={{ color: 'var(--d-text-muted)', fontWeight: 500 }}>What:</strong> {b.what}</div>
                          <div><strong style={{ color: 'var(--d-text-muted)', fontWeight: 500 }}>Cross-ref:</strong> {b.ref}</div>
                          <div><strong style={{ color: 'var(--d-text-muted)', fontWeight: 500 }}>Direction:</strong> {b.dir}</div>
                          <div><strong style={{ color: 'var(--d-text-muted)', fontWeight: 500 }}>Clip:</strong> <span style={{ color: 'var(--d-accent)' }}>{b.clip}</span></div>
                        </div>
                      </div>
                    ))}
                    <button style={{ padding: '6px 14px', background: 'transparent', border: '1px solid var(--d-border)', color: 'var(--d-text-muted)', fontFamily: f, fontSize: '12px', cursor: 'pointer', borderRadius: '6px' }}>Export DOCX</button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* CONTENT PACK */}
          {activeNav === 'Content Pack' && (
            <div style={{ animation: 'fade-in 0.2s ease', display: 'grid', gridTemplateColumns: '180px 1fr', gap: '16px' }}>
              <div>
                {CONTENT_TOOLS.map(t => (
                  <button key={t} onClick={() => setActiveContentTool(t)} style={{
                    display: 'block', width: '100%', padding: '8px 10px', textAlign: 'left', fontFamily: f, fontSize: '12px', cursor: 'pointer', borderRadius: '6px', marginBottom: '1px', transition: 'all 0.12s ease', border: 'none',
                    background: activeContentTool === t ? 'var(--d-accent-light)' : 'transparent',
                    color: activeContentTool === t ? 'var(--d-accent)' : 'var(--d-text-muted)',
                    fontWeight: activeContentTool === t ? 500 : 400,
                  }}>{t}</button>
                ))}
              </div>
              <div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', alignItems: 'center' }}>
                  <select style={{ padding: '6px 12px', background: 'var(--d-bg)', border: '1px solid var(--d-border)', color: 'var(--d-text)', fontFamily: f, fontSize: '13px', outline: 'none', borderRadius: '6px' }}>
                    <option>Episode 12: The Compound Effect</option>
                    <option>Episode 11: Hiring Your First VA</option>
                  </select>
                  <button onClick={() => { setContentLoading(true); setTimeout(() => { setContentLoading(false); setContentGenerated(true) }, 1500) }}
                    style={{ padding: '6px 14px', background: 'var(--d-accent)', color: '#fff', border: 'none', fontFamily: f, fontSize: '12px', fontWeight: 500, cursor: 'pointer', borderRadius: '6px' }}>
                    {contentLoading ? 'Generating...' : 'Generate'}
                  </button>
                </div>
                {contentGenerated && (
                  <div>
                    <textarea value={MOCK_CONTENT[activeContentTool] || `Content for ${activeContentTool}`} readOnly
                      style={{ ...inputStyle, minHeight: '380px', lineHeight: 1.7, background: 'var(--d-surface)' }} />
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {['Copy', 'Export DOCX', 'Regenerate'].map(b => (
                        <button key={b} style={{ padding: '6px 14px', background: 'transparent', border: '1px solid var(--d-border)', color: 'var(--d-text-muted)', fontFamily: f, fontSize: '12px', cursor: 'pointer', borderRadius: '6px', transition: 'all 0.15s ease' }}>{b}</button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* DISTRIBUTION */}
          {activeNav === 'Distribution' && (
            <div style={{ animation: 'fade-in 0.2s ease' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px', marginBottom: '24px' }}>
                {['YouTube', 'Spotify', 'Twitter', 'LinkedIn'].map(p => (
                  <div key={p} style={{ background: 'var(--d-surface)', border: `1px solid ${platformConnected[p] ? 'var(--d-accent-border)' : 'var(--d-border)'}`, padding: '16px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--d-text)', marginBottom: '6px' }}>{p}</div>
                    {platformConnected[p] ? (
                      <div>
                        <span style={{ fontSize: '12px', color: 'var(--d-accent)' }}>✓ Connected</span>
                        <div style={{ fontSize: '11px', color: 'var(--d-text-muted)', marginTop: '6px', lineHeight: 1.5 }}>
                          {p === 'YouTube' && '2,840 views · 68% retention'}
                          {p === 'Spotify' && '1,240 plays · 89% completion'}
                          {p === 'LinkedIn' && '4.8k impressions · 312 engagements'}
                          {p === 'Twitter' && '845 impressions · 42 likes'}
                        </div>
                      </div>
                    ) : (
                      <button onClick={() => handleConnect(p)} style={{ padding: '6px 12px', background: 'transparent', border: '1px solid var(--d-border)', color: 'var(--d-text-muted)', fontFamily: f, fontSize: '12px', cursor: 'pointer', borderRadius: '6px', transition: 'all 0.15s ease' }}>
                        {connectingPlatform === p ? 'Connecting...' : 'Connect'}
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '24px' }}>
                {[{ l: 'Total Views', v: '12,840' }, { l: 'Total Plays', v: '8,200' }, { l: 'Impressions', v: '42k' }, { l: 'Engagement', v: '3.8%' }].map(s => (
                  <div key={s.l} style={{ background: 'var(--d-surface)', border: '1px solid var(--d-border)', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--d-accent)', marginBottom: '2px', letterSpacing: '-0.02em' }}>{s.v}</div>
                    <div style={{ fontSize: '11px', color: 'var(--d-text-muted)' }}>{s.l}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: 'var(--d-surface)', border: '1px solid var(--d-border)', padding: '16px', borderRadius: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--d-text)', display: 'block', marginBottom: '12px' }}>Weekly views</span>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '100px' }}>
                  {[45, 72, 60, 85, 93, 68, 78].map((h, i) => (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                      <div style={{ width: '100%', height: `${h}%`, background: 'var(--d-accent)', borderRadius: '3px 3px 0 0', opacity: 0.6, transition: 'height 0.3s ease' }} />
                      <span style={{ fontSize: '10px', color: 'var(--d-text-muted)' }}>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* AGENT */}
          {activeNav === 'Agent' && (
            <div style={{ animation: 'fade-in 0.2s ease', maxWidth: '640px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--d-text)' }}>Dyspersia Agent</span>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--d-accent)' }} />
                <span style={{ fontSize: '11px', color: 'var(--d-text-muted)' }}>Online</span>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--d-text-muted)', marginBottom: '16px' }}>Web · Telegram · Discord · WhatsApp</div>
              <div ref={agentScrollRef} style={{ background: 'var(--d-surface)', border: '1px solid var(--d-border)', borderRadius: '8px', padding: '16px', minHeight: '360px', maxHeight: '440px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '12px' }}>
                {agentMessages.map(m => (
                  <div key={m.id} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                    <div style={{
                      padding: '10px 12px', fontSize: '13px', lineHeight: 1.6,
                      ...(m.role === 'agent' ? { background: 'var(--d-accent-light)', borderLeft: '2px solid var(--d-accent)', borderRadius: '0 8px 8px 0', color: 'var(--d-text)' } : { background: 'var(--d-bg-secondary)', borderRadius: '8px', color: 'var(--d-text)' }),
                    }}>{m.text}</div>
                    <div style={{ fontSize: '10px', color: 'var(--d-text-muted)', marginTop: '3px', textAlign: m.role === 'user' ? 'right' : 'left' }}>{m.time}</div>
                  </div>
                ))}
                {agentTyping && <div style={{ alignSelf: 'flex-start' }}><div style={{ background: 'var(--d-accent-light)', borderLeft: '2px solid var(--d-accent)', padding: '10px 12px', borderRadius: '0 8px 8px 0' }}><span style={{ fontSize: '13px', color: 'var(--d-text-muted)' }}>Thinking...</span></div></div>}
              </div>
              <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
                <textarea value={agentInput} onChange={e => setAgentInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAgentSend() } }}
                  rows={1} placeholder="Message agent..."
                  style={{ flex: 1, background: 'var(--d-bg-secondary)', border: '1px solid var(--d-border)', color: 'var(--d-text)', fontFamily: f, fontSize: '13px', padding: '8px 12px', outline: 'none', resize: 'none', borderRadius: '6px' }} />
                <button onClick={handleAgentSend} style={{ background: 'var(--d-accent)', color: '#fff', border: 'none', padding: '8px 14px', fontFamily: f, fontSize: '13px', fontWeight: 500, cursor: 'pointer', borderRadius: '6px' }}>Send</button>
              </div>
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                {['Cut clips', 'Research guest', 'Weekly brief', 'Performance'].map(s => (
                  <button key={s} onClick={() => setAgentInput(s)} style={{ background: 'var(--d-bg-secondary)', border: '1px solid var(--d-border)', color: 'var(--d-text-muted)', fontSize: '11px', padding: '4px 8px', cursor: 'pointer', borderRadius: '4px', fontFamily: f, transition: 'color 0.15s ease' }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--d-accent)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--d-text-muted)' }}>{s}</button>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      <AgentSidebar isOpen={agentOpen} onClose={() => setAgentOpen(false)} />
    </div>
  )
}