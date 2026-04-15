'use client'

import { useState } from 'react'

/* ── Data ── */
const EPISODES = [
  { id: 'ep12', label: 'EP 12 — The Compound Effect of Consistency' },
  { id: 'ep11', label: 'EP 11 — Hiring Your First VA' },
  { id: 'ep10', label: 'EP 10 — Revenue Streams for Creators' },
  { id: 'ep09', label: 'EP 09 — Building in Public' },
]

const CLIP_SUGGESTIONS = ['Viral moments', 'Finance-focused', 'Motivational only', 'Under 60 seconds', 'Strong hooks only', 'Guest insights']

interface ScoreDim { label: string; value: number }
interface Clip {
  id: number
  start: string
  end: string
  duration: string
  hook: string
  platforms: string[]
  score: number
  dims: ScoreDim[]
  color: string // thumbnail gradient accent
}

const CLIPS: Clip[] = [
  {
    id: 1,
    start: '08:45', end: '10:12', duration: '1:27',
    hook: 'Consistency beats virality by 4.2x. I tracked 847 creators — the data is clear.',
    platforms: ['TikTok', 'YouTube Shorts', 'LinkedIn'],
    score: 91,
    color: '#10b981',
    dims: [
      { label: 'Hook Strength',   value: 95 },
      { label: 'Retention',       value: 88 },
      { label: 'Emotional Arc',   value: 90 },
      { label: 'Platform Fit',    value: 91 },
    ],
  },
  {
    id: 2,
    start: '24:30', end: '26:00', duration: '1:30',
    hook: '68% of podcasters quit at the 90-day mark. Right before the hockey stick.',
    platforms: ['TikTok', 'LinkedIn'],
    score: 87,
    color: '#a78bfa',
    dims: [
      { label: 'Hook Strength',   value: 89 },
      { label: 'Retention',       value: 84 },
      { label: 'Emotional Arc',   value: 86 },
      { label: 'Platform Fit',    value: 88 },
    ],
  },
  {
    id: 3,
    start: '12:45', end: '14:30', duration: '1:45',
    hook: '1% per episode. After 100 episodes, you are 270% better. That is the compound effect.',
    platforms: ['YouTube Shorts', 'LinkedIn'],
    score: 82,
    color: '#f59e0b',
    dims: [
      { label: 'Hook Strength',   value: 84 },
      { label: 'Retention',       value: 80 },
      { label: 'Emotional Arc',   value: 79 },
      { label: 'Platform Fit',    value: 85 },
    ],
  },
  {
    id: 4,
    start: '35:00', end: '36:45', duration: '1:45',
    hook: 'One upload becomes 15 pieces of content. That is a system, not luck.',
    platforms: ['TikTok', 'YouTube Shorts'],
    score: 75,
    color: '#38bdf8',
    dims: [
      { label: 'Hook Strength',   value: 76 },
      { label: 'Retention',       value: 74 },
      { label: 'Emotional Arc',   value: 70 },
      { label: 'Platform Fit',    value: 79 },
    ],
  },
  {
    id: 5,
    start: '41:00', end: '42:30', duration: '1:30',
    hook: 'Stop optimising downloads. Start building a content OS.',
    platforms: ['LinkedIn'],
    score: 68,
    color: '#fb923c',
    dims: [
      { label: 'Hook Strength',   value: 70 },
      { label: 'Retention',       value: 65 },
      { label: 'Emotional Arc',   value: 68 },
      { label: 'Platform Fit',    value: 69 },
    ],
  },
]

const CAPTION_STYLES = ['Bold Highlight', 'Minimal', 'TikTok Pop']
const FORMATS = ['9:16', '1:1', '16:9']

const PLATFORM_COLORS: Record<string, { bg: string; color: string; border: string }> = {
  TikTok:          { bg: 'rgba(0,0,0,0.3)',        color: '#fff',      border: 'rgba(255,255,255,0.15)' },
  LinkedIn:        { bg: 'rgba(10,102,194,0.15)',   color: '#60a5fa',   border: 'rgba(10,102,194,0.3)' },
  'YouTube Shorts':{ bg: 'rgba(239,68,68,0.12)',    color: '#f87171',   border: 'rgba(239,68,68,0.25)' },
}

function scoreColor(s: number) {
  if (s >= 85) return 'var(--d-accent)'
  if (s >= 75) return '#f59e0b'
  return '#94a3b8'
}

export default function ReelsPage() {
  const f = "'Inter', sans-serif"

  const [episode, setEpisode]         = useState(EPISODES[0].id)
  const [query, setQuery]             = useState('')
  const [exportClip, setExportClip]   = useState<Clip | null>(null)
  const [format, setFormat]           = useState('9:16')
  const [captionStyle, setCaptionStyle] = useState('Bold Highlight')
  const [exporting, setExporting]     = useState(false)
  const [exported, setExported]       = useState<number | null>(null)
  const [previewing, setPreviewing]   = useState<number | null>(null)

  function handleExport() {
    setExporting(true)
    setTimeout(() => {
      setExporting(false)
      setExported(exportClip?.id ?? null)
      setTimeout(() => { setExportClip(null); setExported(null) }, 1800)
    }, 2000)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '0', fontFamily: f, overflow: 'hidden' }}>

      {/* ══ TOP BAR ══ */}
      <div style={{ flexShrink: 0, padding: '0 0 16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>

        {/* Episode selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--d-text-muted)', letterSpacing: '0.04em', flexShrink: 0 }}>EPISODE</label>
          <select
            value={episode}
            onChange={e => setEpisode(e.target.value)}
            style={{
              flex: 1, maxWidth: '420px', padding: '8px 12px',
              background: 'var(--d-surface-solid)', border: '1px solid var(--d-border)',
              color: 'var(--d-text)', fontFamily: f, fontSize: '13px',
              borderRadius: '10px', outline: 'none', cursor: 'pointer', appearance: 'none',
            }}
          >
            {EPISODES.map(ep => <option key={ep.id} value={ep.id}>{ep.label}</option>)}
          </select>
          <span style={{ fontSize: '12px', color: 'var(--d-text-muted)', flexShrink: 0 }}>
            {CLIPS.length} clips found · avg score {Math.round(CLIPS.reduce((s, c) => s + c.score, 0) / CLIPS.length)}
          </span>
        </div>

        {/* Agent chat bar */}
        <div className="glass-card" style={{ padding: '8px 8px 8px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '13px', color: 'var(--d-accent)', fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, flexShrink: 0 }}>$</span>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Tell the agent what clips you want..."
            style={{
              flex: 1, background: 'none', border: 'none', outline: 'none',
              fontSize: '14px', color: 'var(--d-text)', fontFamily: f,
            }}
          />
          <button style={{
            flexShrink: 0, padding: '8px 20px', background: 'var(--d-accent)', color: '#fff',
            border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600,
            fontFamily: f, cursor: 'pointer', boxShadow: '0 2px 14px rgba(16,185,129,0.3)',
            transition: 'all 0.2s ease',
          }}
            onMouseEnter={e => { (e.currentTarget).style.boxShadow = '0 4px 24px rgba(16,185,129,0.45)'; (e.currentTarget).style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { (e.currentTarget).style.boxShadow = '0 2px 14px rgba(16,185,129,0.3)'; (e.currentTarget).style.transform = 'translateY(0)' }}
          >
            Find Clips →
          </button>
        </div>

        {/* Pill suggestions */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {CLIP_SUGGESTIONS.map(s => (
            <button
              key={s}
              onClick={() => setQuery(s)}
              style={{
                padding: '5px 14px', borderRadius: '100px', border: '1px solid var(--d-border)',
                background: query === s ? 'var(--d-accent-light)' : 'var(--d-glass-bg)',
                borderColor: query === s ? 'var(--d-accent-border)' : 'var(--d-border)',
                color: query === s ? 'var(--d-accent)' : 'var(--d-text-muted)',
                fontSize: '12px', fontWeight: 500, fontFamily: f, cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* ══ CLIP GRID ══ */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
          {CLIPS.map(clip => (
            <div key={clip.id} className="glass-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

              {/* Thumbnail placeholder */}
              <div style={{
                height: '140px', position: 'relative', overflow: 'hidden',
                background: `linear-gradient(135deg, var(--d-bg-tertiary) 0%, ${clip.color}22 100%)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {/* Simulated waveform */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '2px', padding: '0 20px', width: '100%', height: '60px' }}>
                  {Array.from({ length: 48 }).map((_, i) => (
                    <div key={i} style={{
                      flex: 1, borderRadius: '2px',
                      height: `${20 + Math.abs(Math.sin(i * 0.5 + clip.id) * 36)}%`,
                      background: clip.color,
                      opacity: 0.5 + (i / 48) * 0.4,
                    }} />
                  ))}
                </div>
                {/* Timestamp overlay */}
                <div style={{
                  position: 'absolute', bottom: '10px', left: '10px',
                  display: 'flex', gap: '6px', alignItems: 'center',
                }}>
                  <span style={{
                    fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', fontWeight: 600,
                    padding: '2px 8px', borderRadius: '6px',
                    background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
                    color: '#fff', letterSpacing: '0.02em',
                  }}>
                    {clip.start} – {clip.end}
                  </span>
                  <span style={{
                    fontFamily: "'IBM Plex Mono', monospace", fontSize: '10px',
                    padding: '2px 8px', borderRadius: '6px',
                    background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)',
                    color: 'rgba(255,255,255,0.7)',
                  }}>
                    {clip.duration}
                  </span>
                </div>
                {/* Score badge */}
                <div style={{
                  position: 'absolute', top: '10px', right: '10px',
                  width: '36px', height: '36px', borderRadius: '50%',
                  display: 'grid', placeItems: 'center',
                  background: `${clip.color}dd`,
                  boxShadow: `0 0 14px ${clip.color}66`,
                }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#fff', lineHeight: 1 }}>{clip.score}</span>
                </div>
              </div>

              {/* Card body */}
              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>

                {/* Hook text */}
                <p style={{
                  fontSize: '13px', color: 'var(--d-text)', lineHeight: 1.6, margin: 0,
                  display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                  fontStyle: 'italic',
                }}>
                  "{clip.hook}"
                </p>

                {/* Platform badges */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {clip.platforms.map(p => {
                    const pc = PLATFORM_COLORS[p] ?? { bg: 'var(--d-glass-bg)', color: 'var(--d-text-muted)', border: 'var(--d-border)' }
                    return (
                      <span key={p} style={{
                        padding: '2px 9px', borderRadius: '100px', fontSize: '10px', fontWeight: 600,
                        background: pc.bg, color: pc.color, border: `1px solid ${pc.border}`,
                      }}>{p}</span>
                    )
                  })}
                </div>

                {/* Score dimensions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  {clip.dims.map(d => (
                    <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '10px', color: 'var(--d-text-muted)', width: '84px', flexShrink: 0, fontWeight: 500 }}>{d.label}</span>
                      <div style={{ flex: 1, height: '4px', background: 'var(--d-bg-tertiary)', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{
                          width: `${d.value}%`, height: '100%', borderRadius: '2px',
                          background: scoreColor(d.value),
                          transition: 'width 0.6s cubic-bezier(0.4,0,0.2,1)',
                        }} />
                      </div>
                      <span style={{ fontSize: '10px', color: 'var(--d-text-muted)', width: '22px', textAlign: 'right', fontFamily: "'IBM Plex Mono', monospace" }}>{d.value}</span>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '8px', marginTop: 'auto', paddingTop: '4px' }}>
                  <button
                    onClick={() => setPreviewing(previewing === clip.id ? null : clip.id)}
                    style={{
                      flex: 1, padding: '8px 0', fontFamily: f, fontSize: '12px', fontWeight: 600,
                      background: previewing === clip.id ? 'var(--d-accent-light)' : 'var(--d-glass-bg)',
                      border: `1px solid ${previewing === clip.id ? 'var(--d-accent-border)' : 'var(--d-border)'}`,
                      color: previewing === clip.id ? 'var(--d-accent)' : 'var(--d-text-secondary)',
                      borderRadius: '8px', cursor: 'pointer', transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={e => { if (previewing !== clip.id) { (e.currentTarget).style.borderColor = 'var(--d-accent-border)'; (e.currentTarget).style.color = 'var(--d-accent)' } }}
                    onMouseLeave={e => { if (previewing !== clip.id) { (e.currentTarget).style.borderColor = 'var(--d-border)'; (e.currentTarget).style.color = 'var(--d-text-secondary)' } }}
                  >
                    {previewing === clip.id ? '⏹ Stop' : '▶ Preview'}
                  </button>
                  <button
                    onClick={() => { setExportClip(clip); setFormat('9:16'); setCaptionStyle('Bold Highlight') }}
                    style={{
                      flex: 1, padding: '8px 0', fontFamily: f, fontSize: '12px', fontWeight: 600,
                      background: 'var(--d-accent)', border: 'none',
                      color: '#fff', borderRadius: '8px', cursor: 'pointer',
                      boxShadow: '0 2px 12px rgba(16,185,129,0.25)', transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={e => { (e.currentTarget).style.boxShadow = '0 4px 20px rgba(16,185,129,0.4)'; (e.currentTarget).style.transform = 'translateY(-1px)' }}
                    onMouseLeave={e => { (e.currentTarget).style.boxShadow = '0 2px 12px rgba(16,185,129,0.25)'; (e.currentTarget).style.transform = 'translateY(0)' }}
                  >
                    ⬇ Export
                  </button>
                </div>

                {/* Preview expand */}
                {previewing === clip.id && (
                  <div style={{
                    borderTop: '1px solid var(--d-border-light)', paddingTop: '12px',
                    animation: 'msg-fade-in 0.25s ease',
                  }}>
                    <div style={{
                      height: '56px', borderRadius: '8px', background: 'var(--d-bg-tertiary)',
                      display: 'flex', alignItems: 'center', padding: '0 10px', gap: '2px', marginBottom: '8px',
                    }}>
                      {Array.from({ length: 60 }).map((_, i) => (
                        <div key={i} style={{
                          flex: 1, borderRadius: '1px',
                          height: `${18 + Math.abs(Math.sin(i * 0.45 + clip.id * 2) * 30)}%`,
                          background: i < 22 ? clip.color : 'var(--d-border)', opacity: i < 22 ? 0.8 : 0.35,
                        }} />
                      ))}
                    </div>
                    <p style={{ fontSize: '11px', color: 'var(--d-text-muted)', margin: 0, textAlign: 'center' }}>
                      Player connects to real media in production · {clip.start} → {clip.end}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ EXPORT MODAL ══ */}
      {exportClip && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 100,
            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'msg-fade-in 0.2s ease',
          }}
          onClick={e => { if (e.target === e.currentTarget) setExportClip(null) }}
        >
          <div className="glass-card" style={{ width: '480px', padding: '0', overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,0.5)' }}>

            {/* Modal header */}
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--d-border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--d-text)', letterSpacing: '-0.01em' }}>Export Clip</div>
                <div style={{ fontSize: '11px', color: 'var(--d-text-muted)', marginTop: '2px', fontFamily: "'IBM Plex Mono', monospace" }}>
                  {exportClip.start} – {exportClip.end} · Score {exportClip.score}
                </div>
              </div>
              <button onClick={() => setExportClip(null)} style={{
                width: '28px', height: '28px', display: 'grid', placeItems: 'center',
                background: 'var(--d-glass-bg)', border: '1px solid var(--d-border)',
                borderRadius: '8px', cursor: 'pointer', color: 'var(--d-text-muted)', fontSize: '14px',
                transition: 'all 0.15s ease',
              }}
                onMouseEnter={e => { (e.currentTarget).style.borderColor = 'var(--d-accent-border)'; (e.currentTarget).style.color = 'var(--d-accent)' }}
                onMouseLeave={e => { (e.currentTarget).style.borderColor = 'var(--d-border)'; (e.currentTarget).style.color = 'var(--d-text-muted)' }}
              >✕</button>
            </div>

            <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

              {/* Format selector */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--d-text-muted)', letterSpacing: '0.04em', marginBottom: '10px' }}>FORMAT</div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {FORMATS.map(fmt => {
                    const dims = { '9:16': [36, 64], '1:1': [54, 54], '16:9': [80, 45] }[fmt]!
                    return (
                      <button
                        key={fmt}
                        onClick={() => setFormat(fmt)}
                        style={{
                          flex: 1, padding: '14px 8px', display: 'flex', flexDirection: 'column',
                          alignItems: 'center', gap: '10px', cursor: 'pointer', fontFamily: f,
                          background: format === fmt ? 'var(--d-accent-light)' : 'var(--d-glass-bg)',
                          border: `1px solid ${format === fmt ? 'var(--d-accent-border)' : 'var(--d-border)'}`,
                          borderRadius: '10px', transition: 'all 0.15s ease',
                        }}
                      >
                        {/* Format preview box */}
                        <div style={{
                          width: `${dims[0]}px`, height: `${dims[1]}px`, borderRadius: '4px',
                          background: format === fmt ? 'var(--d-accent)' : 'var(--d-border)',
                          opacity: format === fmt ? 0.7 : 0.4,
                          transition: 'all 0.15s ease',
                        }} />
                        <span style={{ fontSize: '12px', fontWeight: 700, color: format === fmt ? 'var(--d-accent)' : 'var(--d-text-muted)', fontFamily: "'IBM Plex Mono', monospace" }}>{fmt}</span>
                        <span style={{ fontSize: '10px', color: 'var(--d-text-muted)' }}>
                          {{ '9:16': 'Reels / TikTok', '1:1': 'Feed Post', '16:9': 'YouTube' }[fmt]}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Caption style */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--d-text-muted)', letterSpacing: '0.04em', marginBottom: '10px' }}>CAPTION STYLE</div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {CAPTION_STYLES.map(cs => (
                    <button
                      key={cs}
                      onClick={() => setCaptionStyle(cs)}
                      style={{
                        flex: 1, padding: '9px 6px', fontFamily: f, fontSize: '12px', fontWeight: 600,
                        background: captionStyle === cs ? 'var(--d-accent-light)' : 'var(--d-glass-bg)',
                        border: `1px solid ${captionStyle === cs ? 'var(--d-accent-border)' : 'var(--d-border)'}`,
                        color: captionStyle === cs ? 'var(--d-accent)' : 'var(--d-text-muted)',
                        borderRadius: '8px', cursor: 'pointer', transition: 'all 0.15s ease',
                      }}
                    >
                      {cs}
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary row */}
              <div style={{ padding: '12px 14px', borderRadius: '10px', background: 'var(--d-bg-secondary)', border: '1px solid var(--d-border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '12px', color: 'var(--d-text-muted)' }}>
                  <span style={{ fontWeight: 600, color: 'var(--d-text)' }}>{format}</span> · <span style={{ fontWeight: 600, color: 'var(--d-text)' }}>{captionStyle}</span> · {exportClip.duration}
                </div>
                <span style={{ fontSize: '11px', color: 'var(--d-text-muted)' }}>Est. ~30s render</span>
              </div>

              {/* Export button */}
              <button
                onClick={handleExport}
                disabled={exporting}
                style={{
                  width: '100%', padding: '13px', fontFamily: f, fontSize: '14px', fontWeight: 700,
                  background: exported ? 'var(--d-accent-light)' : exporting ? 'var(--d-accent)' : 'var(--d-accent)',
                  color: exported ? 'var(--d-accent)' : '#fff',
                  border: exported ? '1px solid var(--d-accent-border)' : 'none',
                  borderRadius: '10px', cursor: exporting ? 'wait' : 'pointer',
                  boxShadow: exported ? 'none' : '0 4px 20px rgba(16,185,129,0.3)',
                  transition: 'all 0.3s ease',
                }}
              >
                {exported ? '✓ Exported successfully' : exporting ? 'Rendering clip...' : `Export ${format} — ${captionStyle}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
