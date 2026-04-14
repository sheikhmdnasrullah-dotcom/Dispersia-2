'use client'

import { useState } from 'react'

interface AgentSidebarProps {
  isOpen: boolean
  onClose: () => void
}

interface Message {
  id: number
  role: 'agent' | 'user'
  text: string
  time: string
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    role: 'agent',
    text: 'Good morning. I processed Episode 12 overnight — 3 reels are queued for your review. Your guest profile for next week is also ready.',
    time: '8:02 AM',
  },
  {
    id: 2,
    role: 'user',
    text: 'Show me the reel performance from last week.',
    time: '8:15 AM',
  },
  {
    id: 3,
    role: 'agent',
    text: 'Last 7 days: 4.2k impressions, 312 engagements, 89 new followers across platforms. Your top reel was "The compound effect of consistency" — 1.8k views on TikTok. Want me to create more clips in that style?',
    time: '8:15 AM',
  },
]

const SUGGESTIONS = ['Cut best clips', 'Research next guest', 'Show performance']

export default function AgentSidebar({ isOpen, onClose }: AgentSidebarProps) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState('')

  function handleSend() {
    if (!input.trim()) return
    const newMsg: Message = {
      id: Date.now(),
      role: 'user',
      text: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    setMessages((prev) => [...prev, newMsg])
    setInput('')

    // Simulate agent response
    setTimeout(() => {
      const agentReply: Message = {
        id: Date.now() + 1,
        role: 'agent',
        text: 'Processing your request. I\'ll have results ready in a moment.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages((prev) => [...prev, agentReply])
    }, 1200)
  }

  function handleSuggestion(suggestion: string) {
    setInput(suggestion)
  }

  if (!isOpen) return null

  return (
    <div
      style={{
        position: 'fixed',
        right: 0,
        top: '56px',
        height: 'calc(100vh - 56px)',
        width: '380px',
        background: '#090909',
        borderLeft: '1px solid rgba(0,255,128,0.12)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 50,
        animation: 'slide-in-right 0.25s ease',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '20px 24px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: '14px',
              color: '#ffffff',
              marginBottom: '6px',
            }}
          >
            DISPERSIA AGENT
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#00FF80',
                animation: 'pulse-dot 2s infinite',
              }}
            />
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '10px',
                color: 'rgba(255,255,255,0.4)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              24/7 • ONLINE
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.3)',
            fontSize: '20px',
            cursor: 'pointer',
            fontFamily: "'IBM Plex Mono', monospace",
            padding: '4px 8px',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#ffffff' }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.3)' }}
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '90%',
            }}
          >
            <div
              style={{
                padding: '12px 14px',
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '13px',
                lineHeight: '1.7',
                borderRadius: '2px',
                ...(msg.role === 'agent'
                  ? {
                      background: 'rgba(0,255,128,0.04)',
                      borderLeft: '2px solid #00FF80',
                      color: 'rgba(255,255,255,0.85)',
                    }
                  : {
                      background: 'rgba(255,255,255,0.04)',
                      color: 'rgba(255,255,255,0.75)',
                    }),
              }}
            >
              {msg.text}
            </div>
            <div
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '10px',
                color: 'rgba(255,255,255,0.2)',
                marginTop: '4px',
                textAlign: msg.role === 'user' ? 'right' : 'left',
              }}
            >
              {msg.time}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
            rows={1}
            placeholder="Ask the agent..."
            style={{
              flex: 1,
              background: '#0f0f0f',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#ffffff',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '13px',
              padding: '10px 14px',
              outline: 'none',
              resize: 'none',
              borderRadius: '2px',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = '#00FF80' }}
            onBlur={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = 'rgba(255,255,255,0.1)' }}
          />
          <button
            onClick={handleSend}
            style={{
              background: '#00FF80',
              color: '#080808',
              border: 'none',
              padding: '10px 16px',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              borderRadius: '2px',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.85' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
          >
            SEND
          </button>
        </div>

        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => handleSuggestion(s)}
              style={{
                background: 'rgba(0,255,128,0.06)',
                border: '1px solid rgba(0,255,128,0.15)',
                color: 'rgba(0,255,128,0.7)',
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '10px',
                padding: '5px 10px',
                cursor: 'pointer',
                borderRadius: '2px',
                letterSpacing: '0.04em',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLButtonElement
                el.style.borderColor = '#00FF80'
                el.style.color = '#00FF80'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLButtonElement
                el.style.borderColor = 'rgba(0,255,128,0.15)'
                el.style.color = 'rgba(0,255,128,0.7)'
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
