'use client'

import { useState, useRef } from 'react'
import AgentSidebar from '@/components/AgentSidebar'

/* ── Data ── */
const EPISODES = [
  { id: 'ep12', label: 'EP 12 — The Compound Effect of Consistency' },
  { id: 'ep11', label: 'EP 11 — Hiring Your First VA' },
  { id: 'ep10', label: 'EP 10 — Revenue Streams for Creators' },
  { id: 'ep09', label: 'EP 09 — Building in Public' },
]

type ToolStatus = 'idle' | 'generating' | 'done'

interface ContentTool {
  id: string
  label: string
  icon: string
}

const TOOLS: ContentTool[] = [
  { id: 'show-notes',    label: 'Show Notes',           icon: '📝' },
  { id: 'chapters',     label: 'Chapter Markers',      icon: '🔖' },
  { id: 'blog',         label: 'Blog Post',            icon: '✍️' },
  { id: 'yt-desc',      label: 'YouTube Description',  icon: '▶️' },
  { id: 'titles',       label: 'Title Variants',       icon: '💡' },
  { id: 'newsletter',   label: 'Newsletter Draft',     icon: '📧' },
  { id: 'linkedin',     label: 'LinkedIn Article',     icon: '💼' },
  { id: 'twitter',      label: 'Twitter Thread',       icon: '𝕏' },
  { id: 'instagram',    label: 'Instagram Caption',    icon: '📸' },
  { id: 'guest-promo',  label: 'Guest Promo Kit',      icon: '🎤' },
]

const MOCK_OUTPUT: Record<string, string> = {
  'show-notes': `# Episode 12: The Compound Effect of Consistency\n\n## Key Takeaways\n\n• Consistency beats intensity in creator metrics\n• The "1% daily improvement" framework works when applied to content\n• Why most creators quit at the 90-day mark\n\n## Timestamps\n\n[00:00] Introduction & housekeeping\n[02:14] Guest intro — Marcus Chen, founder of ContentOS\n[05:30] The data behind consistency\n[12:45] Framework: The 1% Content Stack\n[24:30] The 90-day cliff\n[35:00] Real numbers from Marcus's portfolio\n[41:00] Actionable takeaways\n[45:30] Wrap up`,
  'chapters': `00:00 Introduction\n02:14 Meet Marcus Chen\n05:30 The Data Behind Consistency\n12:45 Framework: The 1% Content Stack\n18:00 Case Study: 0 to 10K in 90 Days\n24:30 The 90-Day Cliff\n31:00 Building Systems That Scale\n35:00 Real Portfolio Numbers\n41:00 Actionable Takeaways\n45:30 Wrap Up`,
  'blog': `# The Compound Effect of Consistency\n\nMost creators think virality is the goal. They're wrong.\n\nIn my latest conversation with Marcus Chen, founder of ContentOS, we dug into the actual data behind creator growth.\n\n## The 1% Framework\n\nIf you improve your content by just 1% every episode, after 100 episodes you're not 100% better — you're 2.7x better.\n\nMarcus tracked 847 podcast creators over 18 months. The consistent ones outperformed sporadic publishers by 4.2x in total audience growth.\n\n## The 90-Day Cliff\n\n68% of new podcasters quit within the first 90 days. They're watching download counts instead of building systems.\n\nThe creators who succeed build a content operating system: one upload becomes 15 pieces of content.\n\n## Key Takeaway\n\nStop chasing viral moments. Start building your compound effect.`,
  'yt-desc': `The Compound Effect of Consistency | EP 12\n\nIn this episode, I sit down with Marcus Chen (founder of ContentOS) to break down the actual data behind content growth.\n\nWe cover:\n→ The 1% daily improvement framework\n→ Why 68% of podcasters quit at 90 days\n→ Real numbers from 847 creators\n→ Building a content operating system\n\nTimestamps:\n00:00 Introduction\n02:14 Meet Marcus Chen\n05:30 The Data\n12:45 The 1% Framework\n24:30 The 90-Day Cliff\n41:00 Takeaways`,
  'titles': `1. The Compound Effect of Consistency\n2. Why 68% of Podcasters Quit\n3. I Analyzed 847 Creators. Here's What Works.\n4. Stop Chasing Virality. Start Compounding.\n5. The 1% Content Framework\n6. The 90-Day Cliff: Why Creators Never Break Through\n7. One Upload, 15 Pieces of Content\n8. The Math Behind Content Growth\n9. From 0 to 10,000: A Data-Driven Approach\n10. Consistency Beats Talent Every Time`,
  'newsletter': `Subject: The math behind 100 episodes\n\nHey —\n\nI just dropped Episode 12 with Marcus Chen, and one stat changed how I think about content:\n\nIf you improve by 1% per episode, after 100 episodes you're 270% better.\n\nMarcus tracked 847 creators over 18 months. Consistent publishers outperformed sporadic ones by 4.2x.\n\nBut 68% quit in the first 90 days. They never made it to the inflection point.\n\nThe episode breaks down:\n→ Why consistency beats intensity\n→ The "1% Content Stack" framework\n→ How to build a system that runs itself\n\nListen to Episode 12 →`,
  'linkedin': `I analyzed data from 847 podcast creators.\n\nHere's what actually drives growth:\n\n1. Consistency beats intensity. The ones who published weekly grew 4.2x faster.\n\n2. The 1% compound effect is real. After 100 episodes, you're 270% better.\n\n3. 68% quit at the 90-day mark — right before the inflection point.\n\n4. Systems beat motivation. Top performers had a content operating system.\n\nFull breakdown in my latest episode →`,
  'twitter': `🧵 I tracked 847 creators for 18 months.\n\n1/ Consistency beats intensity by 4.2x. Weekly publishers grew 4.2x faster.\n\n2/ The 1% compound effect: improve 1% per episode, after 100 you're 270% better.\n\n3/ 68% quit within 90 days. Right before the hockey stick.\n\n4/ Systems > Motivation. Top performers all had a content OS.\n\n5/ Actionable version:\n→ Publish weekly\n→ Repurpose everything\n→ Survive 90 days\n→ Let compound interest work`,
  'instagram': `Stop chasing virality. Start compounding. 📈\n\nData from 847 creators:\n→ Consistent publishers grew 4.2x faster\n→ 68% quit in the first 90 days\n→ 1% daily improvement = 270% better after 100 episodes\n\nNew episode out now — link in bio 🎙️`,
  'guest-promo': `**Guest Promo Kit — Marcus Chen (ContentOS)**\n\n📌 Bio (short):\nMarcus Chen is the founder of ContentOS and has tracked 847 podcast creators over 18 months to understand what actually drives growth.\n\n📌 Bio (long):\nMarcus Chen founded ContentOS after spending 10 years in content strategy. His research into 847 creators revealed a counterintuitive truth: consistency beats virality by 4.2x. He now builds tools that help creators build sustainable content systems.\n\n📌 Social handles:\n→ Twitter: @marcuschenOS\n→ LinkedIn: /in/marcuschen\n\n📌 Suggested caption:\n"Just had a fascinating conversation with @marcuschenOS about the real data behind creator growth. Spoiler: virality is a myth. New episode out now."`,
}

export default function ContentPackPage() {
  const f = "'Inter', sans-serif"

  const [episode, setEpisode]       = useState(EPISODES[0].id)
  const [activeTool, setActiveTool] = useState<string | null>(null)
  const [toolStatus, setToolStatus] = useState<Record<string, ToolStatus>>({})
  const [outputs, setOutputs]       = useState<Record<string, string>>({})
  const [instructions, setInstructions] = useState('')
  const [enhancing, setEnhancing]   = useState(false)
  const [copied, setCopied]         = useState(false)
  const [agentOpen, setAgentOpen]   = useState(false)
  const [toast, setToast]           = useState('')
  const outputRef                   = useRef<HTMLTextAreaElement>(null)

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  function getStatus(toolId: string): ToolStatus {
    return toolStatus[toolId] ?? 'idle'
  }

  async function selectTool(toolId: string) {
    setActiveTool(toolId)
    // Already generated — just show it
    if (outputs[toolId]) return

    setToolStatus(prev => ({ ...prev, [toolId]: 'generating' }))

    if (toolId === 'show-notes') {
      // Real API call to Claude
      try {
        const res = await fetch('/api/content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tool: 'Show Notes',
            episodeId: episode,
            instructions: instructions || undefined,
          }),
        })
        const data = await res.json()
        if (data.ok && data.output) {
          setOutputs(prev => ({ ...prev, [toolId]: data.output }))
        } else {
          // API not configured → fall back to mock
          setOutputs(prev => ({ ...prev, [toolId]: MOCK_OUTPUT[toolId] ?? '' }))
        }
      } catch {
        setOutputs(prev => ({ ...prev, [toolId]: MOCK_OUTPUT[toolId] ?? '' }))
      }
    } else {
      // Simulate 2-second generation for other tools
      await new Promise(r => setTimeout(r, 2000))
      setOutputs(prev => ({ ...prev, [toolId]: MOCK_OUTPUT[toolId] ?? `# ${TOOLS.find(t => t.id === toolId)?.label}\n\nSample output for this tool. Connect the backend to generate real content in your voice.` }))
    }

    setToolStatus(prev => ({ ...prev, [toolId]: 'done' }))
  }

  async function handleRegenerate() {
    if (!activeTool) return
    // Clear output and re-run
    setOutputs(prev => { const n = { ...prev }; delete n[activeTool]; return n })
    setToolStatus(prev => ({ ...prev, [activeTool]: 'idle' }))
    await selectTool(activeTool)
  }

  async function handleEnhancePrompt() {
    if (!instructions.trim()) {
      showToast('Type some instructions first, then enhance them')
      return
    }
    setEnhancing(true)
    await new Promise(r => setTimeout(r, 1200))
    setInstructions(prev => `${prev.trim()} — emphasize practical takeaways, use active voice, keep paragraphs under 3 sentences, include a strong opening hook.`)
    setEnhancing(false)
  }

  function handleCopy() {
    if (!activeTool || !outputs[activeTool]) return
    navigator.clipboard.writeText(outputs[activeTool]).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const currentOutput = activeTool ? (outputs[activeTool] ?? '') : ''
  const currentStatus = activeTool ? getStatus(activeTool) : 'idle'
  const isGenerating  = currentStatus === 'generating'

  return (
    <div style={{ display: 'flex', height: '100%', gap: '0', position: 'relative', fontFamily: f }}>

      {/* ══ LEFT PANEL (300px) ══ */}
      <div style={{
        flexShrink: 0, width: '300px',
        borderRight: '1px solid var(--d-border)',
        display: 'flex', flexDirection: 'column',
        background: 'var(--d-glass-bg)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
      }}>
        {/* Episode selector */}
        <div style={{ padding: '18px 16px', borderBottom: '1px solid var(--d-border-light)' }}>
          <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--d-text-muted)', letterSpacing: '0.04em', display: 'block', marginBottom: '8px' }}>
            EPISODE
          </label>
          <select
            value={episode}
            onChange={e => {
              setEpisode(e.target.value)
              // Clear all outputs on episode change
              setOutputs({})
              setToolStatus({})
            }}
            style={{
              width: '100%', padding: '9px 12px',
              background: 'var(--d-surface-solid)', border: '1px solid var(--d-border)',
              color: 'var(--d-text)', fontFamily: f, fontSize: '13px',
              borderRadius: '10px', outline: 'none', cursor: 'pointer',
              appearance: 'none',
            }}
          >
            {EPISODES.map(ep => (
              <option key={ep.id} value={ep.id}>{ep.label}</option>
            ))}
          </select>
        </div>

        {/* Tool list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '10px 8px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--d-text-muted)', letterSpacing: '0.04em', padding: '6px 8px 10px' }}>
            CONTENT TOOLS
          </div>
          {TOOLS.map(tool => {
            const status = getStatus(tool.id)
            const isActive = activeTool === tool.id
            return (
              <button
                key={tool.id}
                onClick={() => selectTool(tool.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  width: '100%', padding: '10px 12px', marginBottom: '2px',
                  borderRadius: '10px', border: 'none', cursor: 'pointer', fontFamily: f,
                  background: isActive ? 'var(--d-accent-light)' : 'transparent',
                  borderLeft: `3px solid ${isActive ? 'var(--d-accent)' : 'transparent'}`,
                  transition: 'all 0.15s ease', textAlign: 'left',
                }}
                onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = 'var(--d-bg-secondary)' }}
                onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
              >
                {/* Status dot */}
                <span style={{
                  width: '7px', height: '7px', borderRadius: '50%', flexShrink: 0,
                  background: status === 'done' ? 'var(--d-accent)'
                    : status === 'generating' ? '#fbbf24'
                    : 'var(--d-border)',
                  animation: status === 'generating' ? 'pulse-subtle 1s ease-in-out infinite' : 'none',
                  transition: 'background 0.3s ease',
                }} />
                <span style={{ fontSize: '14px', flexShrink: 0 }}>{tool.icon}</span>
                <span style={{
                  fontSize: '13px', fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'var(--d-accent)' : 'var(--d-text-secondary)',
                  transition: 'color 0.15s ease',
                }}>{tool.label}</span>
                {status === 'done' && (
                  <span style={{ marginLeft: 'auto', fontSize: '10px', color: 'var(--d-accent)', fontWeight: 600 }}>✓</span>
                )}
              </button>
            )
          })}
        </div>

        {/* Generated count */}
        <div style={{ padding: '12px 16px', borderTop: '1px solid var(--d-border-light)' }}>
          <span style={{ fontSize: '11px', color: 'var(--d-text-muted)' }}>
            {Object.values(toolStatus).filter(s => s === 'done').length} / {TOOLS.length} generated
          </span>
        </div>
      </div>

      {/* ══ RIGHT PANEL ══ */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
        marginRight: agentOpen ? '340px' : '0',
        transition: 'margin-right 0.3s cubic-bezier(0.4,0,0.2,1)',
      }}>
        {!activeTool ? (
          /* Empty state */
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', color: 'var(--d-text-muted)', padding: '40px' }}>
            <span style={{ fontSize: '36px' }}>✍️</span>
            <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--d-text)' }}>Select a content tool</p>
            <p style={{ fontSize: '13px', textAlign: 'center', maxWidth: '320px', lineHeight: 1.6 }}>
              Choose any tool from the left panel. Show Notes will call Claude directly. All others generate instantly from your creator voice profile.
            </p>
          </div>
        ) : (
          <>
            {/* ── Prompt / instructions header ── */}
            <div style={{ borderBottom: '1px solid var(--d-border-light)', padding: '14px 20px', flexShrink: 0, background: 'var(--d-glass-bg)' }}>
              <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--d-text-muted)', letterSpacing: '0.04em', display: 'block', marginBottom: '8px' }}>
                ADD INSTRUCTIONS
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  value={instructions}
                  onChange={e => setInstructions(e.target.value)}
                  placeholder="e.g. Keep it under 400 words, use bullet points, include a CTA..."
                  style={{
                    flex: 1, padding: '9px 14px',
                    background: 'var(--d-surface-solid)', border: '1px solid var(--d-border)',
                    color: 'var(--d-text)', fontFamily: f, fontSize: '13px',
                    borderRadius: '10px', outline: 'none',
                    transition: 'border-color 0.2s ease',
                  }}
                  onFocus={e => (e.target.style.borderColor = 'var(--d-accent)')}
                  onBlur={e => (e.target.style.borderColor = 'var(--d-border)')}
                />
                <button
                  onClick={handleEnhancePrompt}
                  disabled={enhancing}
                  style={{
                    padding: '9px 16px', fontFamily: f, fontSize: '12px', fontWeight: 600,
                    background: 'var(--d-accent-light)', border: '1px solid var(--d-accent-border)',
                    color: 'var(--d-accent)', borderRadius: '10px', cursor: 'pointer',
                    transition: 'all 0.2s ease', flexShrink: 0,
                    opacity: enhancing ? 0.7 : 1,
                  }}
                >
                  {enhancing ? '⚡ Enhancing...' : '⚡ Enhance Prompt'}
                </button>
              </div>
            </div>

            {/* ── Output area ── */}
            <div style={{ flex: 1, padding: '20px', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '16px' }}>{TOOLS.find(t => t.id === activeTool)?.icon}</span>
                  <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--d-text)', letterSpacing: '-0.01em' }}>
                    {TOOLS.find(t => t.id === activeTool)?.label}
                  </span>
                  {currentStatus === 'generating' && (
                    <span style={{ fontSize: '11px', padding: '2px 10px', borderRadius: '100px', background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)', color: '#fbbf24', fontWeight: 600 }}>
                      Generating...
                    </span>
                  )}
                  {currentStatus === 'done' && (
                    <span style={{ fontSize: '11px', padding: '2px 10px', borderRadius: '100px', background: 'var(--d-accent-light)', border: '1px solid var(--d-accent-border)', color: 'var(--d-accent)', fontWeight: 600 }}>
                      ✓ Ready
                    </span>
                  )}
                </div>
                {/* Agent toggle */}
                <button
                  onClick={() => setAgentOpen(o => !o)}
                  style={{
                    fontSize: '12px', fontWeight: 600, padding: '6px 14px',
                    background: agentOpen ? 'var(--d-accent)' : 'var(--d-glass-bg)',
                    border: '1px solid var(--d-accent-border)', color: agentOpen ? '#fff' : 'var(--d-accent)',
                    borderRadius: '8px', cursor: 'pointer', fontFamily: f, transition: 'all 0.2s ease',
                  }}
                >
                  💬 Ask agent
                </button>
              </div>

              {/* Skeleton or output */}
              {isGenerating ? (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[100, 85, 60, 90, 70, 50, 80].map((w, i) => (
                    <div key={i} style={{
                      height: '14px', borderRadius: '4px', width: `${w}%`,
                      background: `linear-gradient(90deg, var(--d-bg-tertiary) 0%, var(--d-bg-secondary) 50%, var(--d-bg-tertiary) 100%)`,
                      backgroundSize: '200% 100%',
                      animation: `skeleton-shimmer 1.4s ease-in-out infinite`,
                      animationDelay: `${i * 0.07}s`,
                    }} />
                  ))}
                </div>
              ) : (
                <textarea
                  ref={outputRef}
                  value={currentOutput}
                  onChange={e => setOutputs(prev => ({ ...prev, [activeTool!]: e.target.value }))}
                  placeholder="Output will appear here..."
                  style={{
                    flex: 1, padding: '16px', resize: 'none',
                    background: 'var(--d-surface-solid)', border: '1px solid var(--d-border)',
                    color: 'var(--d-text)', fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px',
                    lineHeight: 1.75, borderRadius: '12px', outline: 'none',
                    transition: 'border-color 0.2s ease', minHeight: '300px',
                  }}
                  onFocus={e => (e.target.style.borderColor = 'var(--d-accent)')}
                  onBlur={e => (e.target.style.borderColor = 'var(--d-border)')}
                />
              )}
            </div>

            {/* ── Bottom action row ── */}
            <div style={{
              flexShrink: 0, padding: '14px 20px',
              borderTop: '1px solid var(--d-border-light)',
              display: 'flex', gap: '10px', alignItems: 'center',
              background: 'var(--d-glass-bg)',
            }}>
              <button
                onClick={handleCopy}
                disabled={!currentOutput || isGenerating}
                style={{
                  padding: '9px 18px', fontFamily: f, fontSize: '13px', fontWeight: 600,
                  background: copied ? 'var(--d-accent-light)' : 'var(--d-glass-bg)',
                  border: `1px solid ${copied ? 'var(--d-accent-border)' : 'var(--d-border)'}`,
                  color: copied ? 'var(--d-accent)' : 'var(--d-text-secondary)', borderRadius: '10px',
                  cursor: !currentOutput || isGenerating ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease', opacity: !currentOutput ? 0.5 : 1,
                }}
              >
                {copied ? '✓ Copied' : '⎘ Copy'}
              </button>
              <button
                onClick={() => showToast('DOCX export coming soon — document builder in progress')}
                disabled={!currentOutput || isGenerating}
                style={{
                  padding: '9px 18px', fontFamily: f, fontSize: '13px', fontWeight: 600,
                  background: 'var(--d-glass-bg)', border: '1px solid var(--d-border)',
                  color: 'var(--d-text-secondary)', borderRadius: '10px',
                  cursor: !currentOutput || isGenerating ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease', opacity: !currentOutput ? 0.5 : 1,
                }}
                onMouseEnter={e => { if (currentOutput) { (e.currentTarget).style.borderColor = 'var(--d-accent-border)'; (e.currentTarget).style.color = 'var(--d-accent)' } }}
                onMouseLeave={e => { (e.currentTarget).style.borderColor = 'var(--d-border)'; (e.currentTarget).style.color = 'var(--d-text-secondary)' }}
              >
                ⬇ Export DOCX
              </button>
              <button
                onClick={handleRegenerate}
                disabled={isGenerating}
                style={{
                  padding: '9px 18px', fontFamily: f, fontSize: '13px', fontWeight: 600,
                  background: 'var(--d-glass-bg)', border: '1px solid var(--d-border)',
                  color: 'var(--d-text-secondary)', borderRadius: '10px',
                  cursor: isGenerating ? 'wait' : 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { if (!isGenerating) { (e.currentTarget).style.borderColor = 'var(--d-accent-border)'; (e.currentTarget).style.color = 'var(--d-accent)' } }}
                onMouseLeave={e => { (e.currentTarget).style.borderColor = 'var(--d-border)'; (e.currentTarget).style.color = 'var(--d-text-secondary)' }}
              >
                {isGenerating ? '⏳ Generating...' : '↺ Regenerate'}
              </button>
              <span style={{ marginLeft: 'auto', fontSize: '12px', color: 'var(--d-text-muted)' }}>
                {currentOutput ? `${currentOutput.split(/\s+/).filter(Boolean).length} words` : '—'}
              </span>
            </div>
          </>
        )}
      </div>

      {/* ══ AGENT SIDEBAR ══ */}
      {agentOpen && (
        <div style={{ position: 'fixed', right: 0, top: '56px', width: '340px', height: 'calc(100vh - 56px)', zIndex: 60 }}>
          <AgentSidebar isOpen={agentOpen} onClose={() => setAgentOpen(false)} />
        </div>
      )}

      {/* ══ TOAST ══ */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: '28px', left: '50%', transform: 'translateX(-50%)',
          padding: '10px 22px', borderRadius: '100px',
          background: 'var(--d-surface-solid)', border: '1px solid var(--d-border)',
          boxShadow: 'var(--d-shadow-lg)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
          fontSize: '13px', fontWeight: 500, color: 'var(--d-text)', fontFamily: f,
          zIndex: 200, animation: 'msg-fade-in 0.3s ease',
        }}>
          {toast}
        </div>
      )}
    </div>
  )
}
