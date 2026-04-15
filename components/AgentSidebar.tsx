'use client'

import { useState, useRef, useEffect } from 'react'

interface AgentSidebarProps {
  isOpen: boolean
  onClose: () => void
}

interface Message { id: number; role: 'agent' | 'user'; text: string; time: string }

const INITIAL: Message[] = [
  { id: 1, role: 'user', text: "What's the status on episode 12?", time: '8:02 AM' },
  { id: 2, role: 'agent', text: "Episode 12 is fully processed. Transcript ready. 8 clip candidates found (top score: 91). Content Pack not generated yet. Want me to run it?", time: '8:02 AM' },
  { id: 3, role: 'user', text: 'Yes, run the content pack and cut the top 3 clips', time: '8:03 AM' },
  { id: 4, role: 'agent', text: "On it. Content Pack queued (ETA: 45s). Clips rendering for 08:45, 24:30, 41:00. I'll notify you when done.", time: '8:03 AM' },
  { id: 5, role: 'agent', text: '✓ Content Pack complete. ✓ 3 clips exported.', time: '8:04 AM' },
]

const RESPONSES = [
  "Processing now. Found 5 clips above score 80. Top clip starts at 08:45 with hook strength 91. Want me to export all 5?",
  "Weekly brief ready. 4.2k impressions, 312 engagements, 89 new followers. Top reel: 'The compound effect' — 1,841 views on TikTok.",
  "Guest researched: Sarah Kim, Founder of DataLayer. Profile ready, 10 questions generated. Want the edit brief sent to your email?",
  "Performance check: YouTube 2,840 views (68% retention), LinkedIn 1.2k impressions. LinkedIn posts outperform other platforms by 3.2x.",
]

export default function AgentSidebar({ isOpen, onClose }: AgentSidebarProps) {
  const [messages, setMessages] = useState<Message[]>(INITIAL)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const idx = useRef(0)

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight }, [messages])

  function send() {
    const text = input.trim() || 'What should I work on?'
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])
    setInput(''); setTyping(true)
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'agent', text: RESPONSES[idx.current % RESPONSES.length], time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])
      idx.current++; setTyping(false)
    }, 1200)
  }

  if (!isOpen) return null

  return (
    <div style={{
      position: 'fixed', right: 0, top: '56px', height: 'calc(100vh - 56px - 32px)',
      width: '380px', background: 'var(--d-glass-bg)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
      borderLeft: '1px solid var(--d-glass-border)',
      display: 'flex', flexDirection: 'column', zIndex: 50, animation: 'slide-in-right 0.25s ease',
      fontFamily: "'Inter', sans-serif",
    }}>
      <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--d-border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
            <span style={{ fontSize: '14px', fontWeight: 700 }}><span className="gradient-text">Agent</span></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div className="status-dot" />
            <span style={{ fontSize: '11px', color: 'var(--d-text-muted)' }}>Online</span>
          </div>
        </div>
        <button onClick={onClose} style={{ background: 'var(--d-glass-bg)', border: '1px solid var(--d-border)', color: 'var(--d-text-muted)', fontSize: '14px', cursor: 'pointer', padding: '4px 10px', borderRadius: '8px', transition: 'all 0.15s ease' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--d-accent-border)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--d-border)' }}>✕</button>
      </div>

      <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '16px 22px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {messages.map(m => (
          <div key={m.id} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
            <div style={{
              padding: '10px 14px', fontSize: '13px', lineHeight: 1.6,
              ...(m.role === 'agent'
                ? { background: 'var(--d-accent-light)', borderLeft: '2px solid var(--d-accent)', borderRadius: '0 10px 10px 0', color: 'var(--d-text)' }
                : { background: 'var(--d-bg-secondary)', borderRadius: '10px', color: 'var(--d-text)' }),
            }}>{m.text}</div>
            <div style={{ fontSize: '10px', color: 'var(--d-text-muted)', marginTop: '3px', textAlign: m.role === 'user' ? 'right' : 'left' }}>{m.time}</div>
          </div>
        ))}
        {typing && (
          <div style={{ alignSelf: 'flex-start' }}>
            <div style={{ background: 'var(--d-accent-light)', borderLeft: '2px solid var(--d-accent)', padding: '10px 14px', borderRadius: '0 10px 10px 0' }}>
              <span style={{ fontSize: '13px', color: 'var(--d-text-muted)' }}>Thinking...</span>
            </div>
          </div>
        )}
      </div>

      <div style={{ padding: '14px 22px', borderTop: '1px solid var(--d-border-light)' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
          <textarea value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
            rows={1} placeholder="Message agent..."
            style={{ flex: 1, background: 'var(--d-surface-solid)', border: '1px solid var(--d-border)', color: 'var(--d-text)', fontFamily: "'Inter', sans-serif", fontSize: '13px', padding: '10px 14px', outline: 'none', resize: 'none', borderRadius: '10px', transition: 'border-color 0.2s ease' }}
            onFocus={e => { (e.target as HTMLTextAreaElement).style.borderColor = 'var(--d-accent)' }}
            onBlur={e => { (e.target as HTMLTextAreaElement).style.borderColor = 'var(--d-border)' }} />
          <button onClick={send} style={{ background: 'var(--d-accent)', color: '#fff', border: 'none', padding: '10px 16px', fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, cursor: 'pointer', borderRadius: '10px', boxShadow: '0 2px 12px rgba(16,185,129,0.25)' }}>Send</button>
        </div>
        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
          {['Cut clips', 'Research guest', 'Weekly brief', 'Performance'].map(s => (
            <button key={s} onClick={() => setInput(s)} style={{
              background: 'var(--d-glass-bg)', border: '1px solid var(--d-border)',
              color: 'var(--d-text-muted)', fontSize: '11px', padding: '5px 10px',
              cursor: 'pointer', borderRadius: '8px', transition: 'all 0.15s ease', fontFamily: "'Inter', sans-serif",
            }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--d-accent)'; e.currentTarget.style.borderColor = 'var(--d-accent-border)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--d-text-muted)'; e.currentTarget.style.borderColor = 'var(--d-border)' }}>
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
