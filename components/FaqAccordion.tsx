'use client'

import { useState } from 'react'

const FAQS = [
  {
    q: 'How does Dispersia learn my voice?',
    a: 'Every time you generate content, the Creator Brain stores how you write and what you approve. After 3–5 episodes it starts sounding genuinely like you, not generic AI.',
  },
  {
    q: 'What does the Dyspersia Agent actually do?',
    a: 'It runs in the background 24/7. It cuts clips, researches your next guest, monitors your content performance, and sends you a weekly briefing. You can also message it from Discord, Telegram, or WhatsApp at any time and it will execute tasks while you sleep.',
  },
  {
    q: 'How do I upload my podcast?',
    a: 'Paste a YouTube URL, a podcast RSS link, or connect your Google Drive. For local files, we use resumable upload so a 20GB file uploads in the background without issues.',
  },
  {
    q: 'Do I need to learn new tools?',
    a: 'No. The agent lives in your existing apps. Your editor gets a brief document. Your clips arrive in your phone via Telegram. The web app is there when you want to go deeper.',
  },
  {
    q: 'What makes this different from Descript or Riverside?',
    a: 'Those tools record and edit. Dispersia takes your finished episode and handles everything after: clips, content, visuals, distribution, and a growing brain that learns your specific voice. They are not competing with the same workflow.',
  },
]

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section style={{ maxWidth: '760px', margin: '0 auto', padding: '100px 24px' }}>
      {/* Heading */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em' }}>
          <span className="gradient-text">FAQ</span>
        </span>
        <h2 style={{
          fontSize: '36px', fontWeight: 800, marginTop: '8px',
          letterSpacing: '-0.03em', color: 'var(--d-text)',
        }}>
          Questions.
        </h2>
      </div>

      {/* Accordion */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {FAQS.map((faq, i) => {
          const isOpen = open === i
          return (
            <div
              key={i}
              className="glass-card"
              style={{
                overflow: 'hidden',
                cursor: 'pointer',
                borderColor: isOpen ? 'var(--d-accent-border)' : undefined,
                boxShadow: isOpen ? '0 4px 24px rgba(16,185,129,0.08)' : undefined,
                transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
              }}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              {/* Header row */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                padding: '20px 24px',
              }}>
                <span style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: isOpen ? 'var(--d-text)' : 'var(--d-text-secondary)',
                  lineHeight: 1.4,
                  transition: 'color 0.2s ease',
                }}>
                  {faq.q}
                </span>

                {/* +/× icon */}
                <span style={{
                  flexShrink: 0,
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  display: 'grid',
                  placeItems: 'center',
                  background: isOpen ? 'var(--d-accent-light)' : 'var(--d-surface-solid)',
                  border: `1px solid ${isOpen ? 'var(--d-accent-border)' : 'var(--d-border)'}`,
                  color: isOpen ? 'var(--d-accent)' : 'var(--d-text-muted)',
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: 1,
                  transition: 'all 0.25s ease',
                  transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                }}>
                  +
                </span>
              </div>

              {/* Answer — smooth height via max-height */}
              <div style={{
                maxHeight: isOpen ? '320px' : '0px',
                opacity: isOpen ? 1 : 0,
                transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease',
                overflow: 'hidden',
              }}>
                <p style={{
                  padding: '0 24px 20px',
                  fontSize: '14px',
                  color: 'var(--d-text-secondary)',
                  lineHeight: 1.75,
                  margin: 0,
                  borderTop: '1px solid var(--d-border-light)',
                  paddingTop: '16px',
                }}>
                  {faq.a}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
