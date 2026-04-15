'use client'

import { useState, useRef, useCallback } from 'react'

/* ── Static mock transcript ── */
const MOCK_WORDS = [
  { id: 0,  speaker: 'Host',  time: '00:00', text: 'Welcome' },
  { id: 1,  speaker: 'Host',  time: '00:01', text: 'back' },
  { id: 2,  speaker: 'Host',  time: '00:02', text: 'to' },
  { id: 3,  speaker: 'Host',  time: '00:02', text: 'the' },
  { id: 4,  speaker: 'Host',  time: '00:03', text: 'show.' },
  { id: 5,  speaker: 'Host',  time: '00:18', text: 'Marcus' },
  { id: 6,  speaker: 'Host',  time: '00:19', text: 'Chen' },
  { id: 7,  speaker: 'Host',  time: '00:20', text: 'is' },
  { id: 8,  speaker: 'Host',  time: '00:21', text: 'the' },
  { id: 9,  speaker: 'Host',  time: '00:22', text: 'founder' },
  { id: 10, speaker: 'Host',  time: '00:23', text: 'of' },
  { id: 11, speaker: 'Host',  time: '00:24', text: 'ContentOS.' },
  { id: 12, speaker: 'Host',  time: '00:32', text: 'Welcome,' },
  { id: 13, speaker: 'Host',  time: '00:33', text: 'Marcus.' },
  { id: 14, speaker: 'Guest', time: '00:38', text: "Thanks" },
  { id: 15, speaker: 'Guest', time: '00:39', text: "for" },
  { id: 16, speaker: 'Guest', time: '00:40', text: "having" },
  { id: 17, speaker: 'Guest', time: '00:41', text: "me." },
  { id: 18, speaker: 'Guest', time: '00:44', text: "The" },
  { id: 19, speaker: 'Guest', time: '00:45', text: "data" },
  { id: 20, speaker: 'Guest', time: '00:46', text: "is" },
  { id: 21, speaker: 'Guest', time: '00:47', text: "fascinating." },
  { id: 22, speaker: 'Host',  time: '01:00', text: 'You' },
  { id: 23, speaker: 'Host',  time: '01:01', text: 'tracked' },
  { id: 24, speaker: 'Host',  time: '01:02', text: '847' },
  { id: 25, speaker: 'Host',  time: '01:03', text: 'creators.' },
  { id: 26, speaker: 'Guest', time: '01:28', text: 'Consistency' },
  { id: 27, speaker: 'Guest', time: '01:29', text: 'beats' },
  { id: 28, speaker: 'Guest', time: '01:30', text: 'virality' },
  { id: 29, speaker: 'Guest', time: '01:31', text: 'by' },
  { id: 30, speaker: 'Guest', time: '01:32', text: '4.2x.' },
]

const PIPELINE_STEPS = [
  { icon: '⬆️', label: 'Upload',     status: 'done'    },
  { icon: '🎙️', label: 'Transcribe', status: 'done'    },
  { icon: '👥', label: 'Diarize',    status: 'running' },
  { icon: '✂️', label: 'Chunk',      status: 'pending' },
  { icon: '📦', label: 'Export',     status: 'pending' },
]

const SPEAKER_COLORS: Record<string, string> = {
  Host:  'var(--d-accent)',
  Guest: '#a78bfa',
}

type IngestTab = 'youtube' | 'drive' | 'upload'
type PageState = 'idle' | 'processing' | 'ready'

export default function TranscriptionPage() {
  const f = "'Inter', sans-serif"

  /* ── State ── */
  const [tab, setTab]                     = useState<IngestTab>('youtube')
  const [youtubeUrl, setYoutubeUrl]       = useState('')
  const [pageState, setPageState]         = useState<PageState>('ready') // start ready to show transcript
  const [submitting, setSubmitting]       = useState(false)
  const [apiError, setApiError]           = useState('')
  const [toast, setToast]                 = useState('')
  const [dragOver, setDragOver]           = useState(false)
  const [selectedWord, setSelectedWord]   = useState<number | null>(null)
  const [editingWord, setEditingWord]     = useState<number | null>(null)
  const [words, setWords]                 = useState(MOCK_WORDS)
  const fileRef                           = useRef<HTMLInputElement>(null)

  /* ── Toast helper ── */
  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  /* ── YouTube submit → real API ── */
  async function handleYouTubeSubmit() {
    if (!youtubeUrl.trim()) return
    setSubmitting(true)
    setApiError('')
    setPageState('processing')
    try {
      const res = await fetch('/api/transcribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: youtubeUrl }),
      })
      if (!res.ok) throw new Error(`Server responded ${res.status}`)
      // If API returns transcript data, we'd update words here.
      // For now, transition to ready state with mock data.
      setPageState('ready')
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Unknown error'
      setApiError(msg)
      setPageState('idle')
    } finally {
      setSubmitting(false)
    }
  }

  /* ── Group words by speaker ── */
  const groups: { speaker: string; startTime: string; wordIds: number[] }[] = []
  words.forEach(w => {
    const last = groups[groups.length - 1]
    if (last && last.speaker === w.speaker) {
      last.wordIds.push(w.id)
    } else {
      groups.push({ speaker: w.speaker, startTime: w.time, wordIds: [w.id] })
    }
  })

  const wordById = Object.fromEntries(words.map(w => [w.id, w]))

  /* ── Drag & drop ── */
  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    showToast('File upload coming soon — API integration in progress')
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: f }}>

      {/* ══ INGEST PANEL ══ */}
      <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
        {/* Tab bar */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--d-border-light)' }}>
          {([
            { id: 'youtube', label: '▶ YouTube URL' },
            { id: 'drive',   label: '☁ Google Drive' },
            { id: 'upload',  label: '⬆ Upload File' },
          ] as { id: IngestTab; label: string }[]).map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: '12px 20px',
                fontSize: '13px',
                fontWeight: 600,
                fontFamily: f,
                border: 'none',
                borderBottom: tab === t.id ? '2px solid var(--d-accent)' : '2px solid transparent',
                background: 'none',
                color: tab === t.id ? 'var(--d-accent)' : 'var(--d-text-muted)',
                cursor: 'pointer',
                transition: 'color 0.15s ease',
                marginBottom: '-1px',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div style={{ padding: '20px 24px' }}>

          {/* YouTube */}
          {tab === 'youtube' && (
            <div>
              <p style={{ fontSize: '12px', color: 'var(--d-text-muted)', marginBottom: '12px' }}>
                Paste a YouTube video or playlist URL. Supports private videos if you connect your account.
              </p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  value={youtubeUrl}
                  onChange={e => setYoutubeUrl(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleYouTubeSubmit()}
                  placeholder="https://youtube.com/watch?v=..."
                  style={{
                    flex: 1, padding: '10px 16px',
                    background: 'var(--d-surface-solid)', border: '1px solid var(--d-border)',
                    color: 'var(--d-text)', fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px',
                    outline: 'none', borderRadius: '10px',
                    transition: 'border-color 0.2s ease',
                  }}
                  onFocus={e => (e.target.style.borderColor = 'var(--d-accent)')}
                  onBlur={e => (e.target.style.borderColor = 'var(--d-border)')}
                />
                <button
                  onClick={handleYouTubeSubmit}
                  disabled={submitting || !youtubeUrl.trim()}
                  style={{
                    padding: '10px 24px', fontFamily: f, fontSize: '13px', fontWeight: 600,
                    background: submitting ? 'var(--d-accent-light)' : 'var(--d-accent)',
                    color: submitting ? 'var(--d-accent)' : '#fff',
                    border: '1px solid var(--d-accent-border)', borderRadius: '10px',
                    cursor: submitting ? 'wait' : 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 14px rgba(16,185,129,0.25)',
                    opacity: !youtubeUrl.trim() ? 0.5 : 1,
                  }}
                >
                  {submitting ? 'Sending...' : 'Transcribe →'}
                </button>
              </div>
              {apiError && (
                <p style={{ fontSize: '12px', color: '#ef4444', marginTop: '8px' }}>
                  ⚠ {apiError}
                </p>
              )}
            </div>
          )}

          {/* Google Drive */}
          {tab === 'drive' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button
                onClick={() => showToast('Google Drive integration coming soon')}
                style={{
                  padding: '10px 20px', fontFamily: f, fontSize: '13px', fontWeight: 600,
                  background: 'var(--d-glass-bg)', border: '1px solid var(--d-border)',
                  color: 'var(--d-text-secondary)', borderRadius: '10px', cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { (e.currentTarget).style.borderColor = 'var(--d-accent-border)'; (e.currentTarget).style.color = 'var(--d-accent)' }}
                onMouseLeave={e => { (e.currentTarget).style.borderColor = 'var(--d-border)'; (e.currentTarget).style.color = 'var(--d-text-secondary)' }}
              >
                ☁ Connect Google Drive
              </button>
              <span style={{ fontSize: '12px', color: 'var(--d-text-muted)' }}>
                Connect once, then browse files without re-authenticating.
              </span>
            </div>
          )}

          {/* Upload File */}
          {tab === 'upload' && (
            <div>
              <div
                onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                onDragLeave={() => setDragOver(false)}
                onDrop={onDrop}
                onClick={() => fileRef.current?.click()}
                style={{
                  border: `2px dashed ${dragOver ? 'var(--d-accent)' : 'var(--d-border)'}`,
                  borderRadius: '12px',
                  padding: '40px 24px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  background: dragOver ? 'var(--d-accent-light)' : 'var(--d-glass-bg)',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ fontSize: '28px', marginBottom: '12px' }}>📂</div>
                <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--d-text)', marginBottom: '6px' }}>
                  Drop your file here or click to browse
                </p>
                <p style={{ fontSize: '12px', color: 'var(--d-text-muted)' }}>
                  MP3, MP4, WAV, M4A — up to 20GB. Resumable upload via TUS protocol.
                </p>
              </div>
              <input ref={fileRef} type="file" accept="audio/*,video/*" style={{ display: 'none' }}
                onChange={() => showToast('File upload coming soon — API integration in progress')} />
            </div>
          )}
        </div>
      </div>

      {/* ══ PIPELINE STATUS ══ */}
      {(pageState === 'processing' || pageState === 'ready') && (
        <div className="glass-card" style={{ padding: '18px 24px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--d-text-muted)', letterSpacing: '0.04em', marginBottom: '16px' }}>
            PROCESSING PIPELINE
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '0', overflowX: 'auto' }}>
            {PIPELINE_STEPS.map((step, i) => {
              const isDone    = step.status === 'done'
              const isRunning = step.status === 'running'
              const isPending = step.status === 'pending'
              return (
                <div key={step.label} style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="glass-card" style={{
                    padding: '14px 14px', textAlign: 'center', minWidth: '96px',
                    opacity: isPending ? 0.45 : 1,
                    borderColor: isDone ? 'var(--d-accent-border)' : undefined,
                    boxShadow: isDone ? '0 2px 14px rgba(16,185,129,0.08)' : undefined,
                  }}>
                    <div style={{ fontSize: '18px', marginBottom: '8px' }}>{step.icon}</div>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: isDone ? 'var(--d-text)' : isRunning ? 'var(--d-text)' : 'var(--d-text-muted)', marginBottom: '8px' }}>{step.label}</div>
                    {isDone && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '2px 8px', borderRadius: '100px', background: 'var(--d-accent-light)', border: '1px solid var(--d-accent-border)', fontSize: '10px', fontWeight: 600, color: 'var(--d-accent)' }}>
                        <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--d-accent)' }} />Done
                      </span>
                    )}
                    {isRunning && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '2px 8px', borderRadius: '100px', background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.25)', fontSize: '10px', fontWeight: 600, color: '#fbbf24' }}>
                        <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#fbbf24', animation: 'pulse-subtle 1.2s ease-in-out infinite' }} />Running
                      </span>
                    )}
                    {isPending && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '2px 8px', borderRadius: '100px', background: 'var(--d-glass-bg)', border: '1px solid var(--d-border)', fontSize: '10px', fontWeight: 500, color: 'var(--d-text-muted)' }}>
                        Pending
                      </span>
                    )}
                  </div>
                  {i < PIPELINE_STEPS.length - 1 && (
                    <div style={{ width: '24px', flexShrink: 0, height: '2px', background: isDone ? 'var(--d-accent)' : 'var(--d-border)', opacity: isDone ? 0.6 : 0.3 }} />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ══ TRANSCRIPT EDITOR (shown when ready) ══ */}
      {pageState === 'ready' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '20px', minHeight: '480px' }}>

          {/* Left — editable transcript */}
          <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '0', overflowY: 'auto', maxHeight: '60vh' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--d-text-muted)', letterSpacing: '0.04em', marginBottom: '16px' }}>
              TRANSCRIPT — EP 12 · 00:47:12
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {groups.map((g, gi) => (
                <div key={gi}>
                  {/* Speaker label */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: SPEAKER_COLORS[g.speaker] ?? 'var(--d-border)', flexShrink: 0 }} />
                    <span style={{ fontSize: '11px', fontWeight: 700, color: SPEAKER_COLORS[g.speaker] ?? 'var(--d-text-muted)', letterSpacing: '0.05em' }}>{g.speaker.toUpperCase()}</span>
                    <span style={{ fontSize: '10px', color: 'var(--d-text-muted)', fontFamily: "'IBM Plex Mono', monospace" }}>{g.startTime}</span>
                  </div>
                  {/* Clickable word spans */}
                  <div style={{ lineHeight: 2, flexWrap: 'wrap', display: 'flex', gap: '2px' }}>
                    {g.wordIds.map(wid => {
                      const w = wordById[wid]
                      const isSelected = selectedWord === wid
                      const isEditing  = editingWord === wid
                      if (isEditing) {
                        return (
                          <input
                            key={wid}
                            autoFocus
                            defaultValue={w.text}
                            onBlur={e => {
                              setWords(prev => prev.map(pw => pw.id === wid ? { ...pw, text: e.target.value } : pw))
                              setEditingWord(null)
                            }}
                            onKeyDown={e => {
                              if (e.key === 'Enter' || e.key === 'Escape') (e.target as HTMLInputElement).blur()
                            }}
                            style={{
                              padding: '1px 6px', fontSize: '14px', fontFamily: f,
                              background: 'var(--d-accent-light)', border: '1px solid var(--d-accent)',
                              borderRadius: '4px', color: 'var(--d-text)', outline: 'none',
                              width: `${Math.max(w.text.length * 8.5, 40)}px`,
                            }}
                          />
                        )
                      }
                      return (
                        <span
                          key={wid}
                          onClick={() => setSelectedWord(isSelected ? null : wid)}
                          onDoubleClick={() => { setSelectedWord(wid); setEditingWord(wid) }}
                          title={`${w.time} — double-click to edit`}
                          style={{
                            padding: '2px 5px', borderRadius: '4px', fontSize: '14px',
                            color: isSelected ? 'var(--d-accent)' : 'var(--d-text)',
                            background: isSelected ? 'var(--d-accent-light)' : 'transparent',
                            border: isSelected ? '1px solid var(--d-accent-border)' : '1px solid transparent',
                            cursor: 'pointer',
                            transition: 'all 0.12s ease',
                            lineHeight: 1.6,
                          }}
                        >
                          {w.text}
                        </span>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — player mock */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div className="glass-card" style={{ padding: '20px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--d-text-muted)', letterSpacing: '0.04em', marginBottom: '14px' }}>
                AUDIO PLAYER
              </div>
              {/* Waveform placeholder */}
              <div style={{
                height: '72px', borderRadius: '10px', overflow: 'hidden', position: 'relative',
                background: 'var(--d-bg-tertiary)', marginBottom: '12px',
                display: 'flex', alignItems: 'center', padding: '0 12px', gap: '2px',
              }}>
                {Array.from({ length: 80 }).map((_, i) => (
                  <div key={i} style={{
                    flex: 1, borderRadius: '2px',
                    height: `${20 + Math.abs(Math.sin(i * 0.4 + 1) * 44)}%`,
                    background: i < 30 ? 'var(--d-accent)' : 'var(--d-border)',
                    opacity: i < 30 ? 0.8 : 0.4,
                    transition: 'background 0.2s ease',
                  }} />
                ))}
                {/* Playhead */}
                <div style={{ position: 'absolute', left: `${(30 / 80) * 100}%`, top: 0, bottom: 0, width: '2px', background: 'var(--d-accent)', opacity: 0.9 }} />
              </div>
              {/* Controls */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', fontFamily: "'IBM Plex Mono', monospace", color: 'var(--d-text-muted)' }}>01:32</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['⏮', '⏪', '⏯', '⏩'].map(ctrl => (
                    <button key={ctrl} onClick={() => showToast('Player connects to real media in production')}
                      style={{ width: '32px', height: '32px', display: 'grid', placeItems: 'center', background: 'var(--d-glass-bg)', border: '1px solid var(--d-border)', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', transition: 'all 0.15s ease' }}
                      onMouseEnter={e => { (e.currentTarget).style.borderColor = 'var(--d-accent-border)'; (e.currentTarget).style.background = 'var(--d-accent-light)' }}
                      onMouseLeave={e => { (e.currentTarget).style.borderColor = 'var(--d-border)'; (e.currentTarget).style.background = 'var(--d-glass-bg)' }}
                    >{ctrl}</button>
                  ))}
                </div>
                <span style={{ fontSize: '11px', fontFamily: "'IBM Plex Mono', monospace", color: 'var(--d-text-muted)' }}>47:12</span>
              </div>
            </div>

            {/* Selected word info */}
            {selectedWord !== null && (
              <div className="glass-card" style={{ padding: '16px', animation: 'msg-fade-in 0.25s ease' }}>
                <div style={{ fontSize: '11px', color: 'var(--d-text-muted)', fontWeight: 600, letterSpacing: '0.04em', marginBottom: '8px' }}>SELECTED WORD</div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px', color: 'var(--d-text)', marginBottom: '4px' }}>"{wordById[selectedWord]?.text}"</div>
                <div style={{ fontSize: '11px', color: 'var(--d-text-muted)' }}>
                  {wordById[selectedWord]?.speaker} · {wordById[selectedWord]?.time}
                </div>
                <button onClick={() => setEditingWord(selectedWord)}
                  style={{ marginTop: '10px', fontSize: '11px', padding: '5px 12px', background: 'var(--d-accent-light)', border: '1px solid var(--d-accent-border)', color: 'var(--d-accent)', borderRadius: '6px', cursor: 'pointer', fontFamily: f, fontWeight: 600 }}>
                  Edit word
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ══ EXPORT ROW ══ */}
      {pageState === 'ready' && (
        <div className="glass-card" style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '13px', color: 'var(--d-text-muted)', fontWeight: 500 }}>
            {words.length} words · 2 speakers · 47:12
          </span>
          <div style={{ display: 'flex', gap: '10px' }}>
            {[
              { label: '⬇ Export DOCX', emoji: '📄' },
              { label: '⬇ Export SRT',  emoji: '🎬' },
              { label: '⬇ Export JSON', emoji: '📦' },
            ].map(btn => (
              <button
                key={btn.label}
                onClick={() => showToast('Export coming soon — formats ready once backend is wired')}
                style={{
                  padding: '9px 18px', fontFamily: f, fontSize: '13px', fontWeight: 600,
                  background: 'var(--d-glass-bg)', border: '1px solid var(--d-border)',
                  color: 'var(--d-text-secondary)', borderRadius: '10px', cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { (e.currentTarget).style.borderColor = 'var(--d-accent-border)'; (e.currentTarget).style.color = 'var(--d-accent)' }}
                onMouseLeave={e => { (e.currentTarget).style.borderColor = 'var(--d-border)'; (e.currentTarget).style.color = 'var(--d-text-secondary)' }}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ══ TOAST ══ */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: '28px', left: '50%', transform: 'translateX(-50%)',
          padding: '10px 22px', borderRadius: '100px',
          background: 'var(--d-surface-solid)', border: '1px solid var(--d-border)',
          boxShadow: 'var(--d-shadow-lg)',
          fontSize: '13px', fontWeight: 500, color: 'var(--d-text)', fontFamily: f,
          zIndex: 200, animation: 'msg-fade-in 0.3s ease',
          backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        }}>
          {toast}
        </div>
      )}
    </div>
  )
}
