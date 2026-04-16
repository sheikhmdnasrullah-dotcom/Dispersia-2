'use client'

import { useState, useEffect, useRef } from 'react'

const FOURTH_MSG = 'Monday brief ready. 4 clips queued. Guest research for Thursday episode complete.'
const LOOP_MS   = 8000  // full loop period

const MSGS = [
  {
    role: 'you',
    text: 'Cut the 3 best clips from episode 42 and send them to my phone',
  },
  {
    role: 'ai',
    text: 'Done. 3 clips exported. Scores: 91, 87, 82. Formats: 9:16 for TikTok/Reels. Sent to your Telegram.',
  },
  {
    role: 'ai',
    text: 'Also — I noticed clip #1 has 91% hook strength. I\'ve drafted a Twitter thread and LinkedIn post around it. Want me to schedule?',
  },
]

export default function TerminalMockup() {
  // How many of the first 3 messages are visible
  const [visible, setVisible] = useState(0)
  // The typed text of the 4th message (looping)
  const [typed, setTyped]     = useState('')
  const [showFourth, setShowFourth] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Stagger the first 3 messages, then start the loop
  useEffect(() => {
    let i = 0
    const show = () => {
      i++
      setVisible(i)
      if (i < MSGS.length) {
        timerRef.current = setTimeout(show, 800)
      } else {
        // After all 3 are shown, start the 4th-message loop
        timerRef.current = setTimeout(startFourth, 3000)
      }
    }
    timerRef.current = setTimeout(show, 300)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [])

  function startFourth() {
    setShowFourth(true)
    typeChar(0)
  }

  function typeChar(idx: number) {
    if (idx <= FOURTH_MSG.length) {
      setTyped(FOURTH_MSG.slice(0, idx))
      timerRef.current = setTimeout(() => typeChar(idx + 1), 28)
    } else {
      // Full message shown — pause then loop: hide → retype
      timerRef.current = setTimeout(() => {
        setTyped('')
        timerRef.current = setTimeout(() => typeChar(0), 600)
      }, LOOP_MS)
    }
  }

  const aiRow = (text: string, style?: React.CSSProperties) => (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', ...style }}>
      <span style={{ fontSize: '12px', minWidth: '32px', fontWeight: 500 }}>
        <span className="gradient-text">ai</span>
      </span>
      <span style={{
        fontSize: '13px', color: 'var(--d-text)', lineHeight: 1.5,
        padding: '8px 14px', borderRadius: '0 8px 8px 0',
        borderLeft: '2px solid var(--d-accent)', background: 'var(--d-accent-light)',
      }}>
        {text}
      </span>
    </div>
  )

  return (
    <div style={{
      position: 'relative', zIndex: 1, marginTop: '60px',
      width: '100%', maxWidth: '680px',
    }}>
      <div className="glass-card" style={{ padding: '20px', boxShadow: 'var(--d-shadow-lg)' }}>
        {/* Terminal chrome */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28c840' }} />
          <span style={{
            marginLeft: '12px', fontSize: '11px',
            color: 'var(--d-text-muted)', fontWeight: 500,
          }}>
            dyspersia — processing pipeline
          </span>
        </div>

        {/* Chat rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

          {/* Message 1 — user */}
          {visible >= 1 && (
            <div style={{
              display: 'flex', gap: '10px', alignItems: 'flex-start',
              animation: 'msg-fade-in 0.45s ease both',
            }}>
              <span style={{ fontSize: '12px', color: 'var(--d-text-muted)', minWidth: '32px', fontWeight: 500 }}>you</span>
              <span style={{
                fontSize: '13px', color: 'var(--d-text)', lineHeight: 1.5,
                background: 'var(--d-bg-secondary)', padding: '8px 14px', borderRadius: '8px',
              }}>
                {MSGS[0].text}
              </span>
            </div>
          )}

          {/* Message 2 — ai */}
          {visible >= 2 && aiRow(MSGS[1].text, {
            animation: 'msg-fade-in 0.45s ease both',
          })}

          {/* Message 3 — ai */}
          {visible >= 3 && aiRow(MSGS[2].text, {
            animation: 'msg-fade-in 0.45s ease both',
          })}

          {/* Message 4 — ai (looping typewriter) */}
          {showFourth && (
            <div style={{
              display: 'flex', gap: '10px', alignItems: 'flex-start',
              animation: 'msg-fade-in 0.45s ease both',
            }}>
              <span style={{ fontSize: '12px', minWidth: '32px', fontWeight: 500 }}>
                <span className="gradient-text">ai</span>
              </span>
              <span style={{
                fontSize: '13px', color: 'var(--d-text)', lineHeight: 1.5,
                padding: '8px 14px', borderRadius: '0 8px 8px 0',
                borderLeft: '2px solid var(--d-accent)', background: 'var(--d-accent-light)',
              }}>
                {typed}
                {/* Blinking cursor — always visible on the 4th message */}
                <span style={{
                  display: 'inline-block',
                  width: '2px', height: '13px',
                  background: 'var(--d-accent)',
                  marginLeft: '2px',
                  verticalAlign: 'text-bottom',
                  animation: 'cursor-blink 0.9s step-start infinite',
                }} />
              </span>
            </div>
          )}

          {/* Blinking cursor shown on msg 3 before msg 4 appears */}
          {visible >= 3 && !showFourth && (
            <div style={{ paddingLeft: '42px' }}>
              <span style={{
                display: 'inline-block',
                width: '2px', height: '13px',
                background: 'var(--d-accent)',
                verticalAlign: 'text-bottom',
                animation: 'cursor-blink 0.9s step-start infinite',
              }} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
