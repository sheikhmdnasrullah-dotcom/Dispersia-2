'use client'

import Link from 'next/link'
import Navbar from '@/components/Navbar'

const TOOLS = [
  { num: '01', name: 'Transcription', desc: 'Multi-speaker diarization with semantic chunking and click-to-seek search', icon: '🎙️', size: 'wide' },
  { num: '02', name: 'Editorial Direction', desc: 'Guest intelligence from LinkedIn, press, Twitter — auto-generated edit briefs', icon: '📋', size: 'normal' },
  { num: '03', name: 'Podcast to Reels', desc: 'AI finds, scores, and captions your best clips in 9:16, 1:1, and 16:9', icon: '🎬', size: 'normal' },
  { num: '04', name: 'Content Pack', desc: 'Show notes, blog posts, titles, newsletters, social posts — all in your exact voice', icon: '✍️', size: 'wide' },
  { num: '05', name: 'Visual Engine', desc: 'Brand-aware thumbnails, quote cards, and audiogram frames rendered automatically', icon: '🎨', size: 'normal' },
  { num: '06', name: 'Distribution', desc: 'Schedule across YouTube, Spotify, LinkedIn, TikTok with unified analytics', icon: '📡', size: 'normal' },
  { num: '07', name: 'Dyspersia Agent', desc: 'Your 24/7 AI producer — message it from Telegram, Discord, or WhatsApp', icon: '🤖', size: 'wide' },
]

const PRICING = [
  { name: 'Starter', price: '$49', features: ['3 episodes/month', 'All content tools', 'Transcription + Reels', 'Email support'] },
  { name: 'Pro', price: '$99', badge: true, features: ['15 episodes/month', 'Everything in Starter', 'Editorial Direction', 'Dyspersia Agent (web)', 'Priority processing'] },
  { name: 'Studio', price: '$199', features: ['Unlimited episodes', 'Everything in Pro', 'Agent everywhere', 'Visual Engine', 'Distribution + Analytics'] },
]

export default function HomePage() {
  const f = "'Inter', sans-serif"

  return (
    <div style={{ minHeight: '100vh', fontFamily: f, overflow: 'hidden' }}>
      {/* ── NAV ── */}
      <Navbar />

      {/* ── HERO ── */}
      <section style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center', textAlign: 'center',
        padding: '120px 24px 80px', position: 'relative',
      }}>
        {/* Floating blobs */}
        <div className="blob blob-1" style={{ top: '10%', left: '10%' }} />
        <div className="blob blob-2" style={{ top: '60%', right: '5%' }} />
        <div className="blob blob-3" style={{ bottom: '10%', left: '30%' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(44px, 7vw, 80px)', fontWeight: 800, lineHeight: 1.05,
            marginBottom: '24px', letterSpacing: '-0.04em',
          }}>
            <span style={{ color: 'var(--d-text)' }}>The AI brain for</span>
            <br />
            <span className="gradient-text">podcast creators.</span>
          </h1>

          {/* Subhead */}
          <p style={{
            fontSize: '17px', color: 'var(--d-text-secondary)', lineHeight: 1.7,
            maxWidth: '500px', margin: '0 auto 36px', fontWeight: 400,
          }}>
            Upload one episode. Get clips, captions, show notes, titles, newsletters,
            thumbnails and more — all written in your exact voice.
          </p>

          {/* CTA */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '16px' }}>
            <Link href="/signup" style={{
              padding: '14px 32px', background: 'var(--d-accent)', color: '#fff',
              textDecoration: 'none', fontSize: '15px', fontWeight: 600, borderRadius: '10px',
              transition: 'all 0.2s ease', boxShadow: '0 4px 24px rgba(16,185,129,0.25)',
            }}>Start for free →</Link>
            <Link href="/login" style={{
              padding: '14px 32px', background: 'var(--d-glass-bg)', backdropFilter: 'blur(12px)',
              border: '1px solid var(--d-border)', color: 'var(--d-text-secondary)',
              textDecoration: 'none', fontSize: '15px', fontWeight: 500, borderRadius: '10px',
              transition: 'all 0.2s ease',
            }}>Log in</Link>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--d-text-muted)' }}>
            No credit card · First episode free · Cancel anytime
          </p>
        </div>

        {/* Floating terminal mockup */}
        <div style={{
          position: 'relative', zIndex: 1, marginTop: '60px', width: '100%', maxWidth: '680px',
        }}>
          <div className="glass-card" style={{
            padding: '20px', boxShadow: 'var(--d-shadow-lg)',
          }}>
            {/* Terminal header dots */}
            <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#febc2e' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28c840' }} />
              <span style={{ marginLeft: '12px', fontSize: '11px', color: 'var(--d-text-muted)', fontWeight: 500 }}>dyspersia agent — active</span>
            </div>
            {/* Chat lines */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '12px', color: 'var(--d-text-muted)', minWidth: '32px', fontWeight: 500 }}>you</span>
                <span style={{ fontSize: '13px', color: 'var(--d-text)', lineHeight: 1.5, background: 'var(--d-bg-secondary)', padding: '8px 14px', borderRadius: '8px' }}>Cut the 3 best clips from episode 42 and send them to my phone</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '12px', minWidth: '32px', fontWeight: 500 }}>
                  <span className="gradient-text">ai</span>
                </span>
                <span style={{ fontSize: '13px', color: 'var(--d-text)', lineHeight: 1.5, padding: '8px 14px', borderRadius: '0 8px 8px 0', borderLeft: '2px solid var(--d-accent)', background: 'var(--d-accent-light)' }}>
                  Done. 3 clips exported. Scores: 91, 87, 82. Formats: 9:16 for TikTok/Reels. Sent to your Telegram.
                </span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '12px', minWidth: '32px', fontWeight: 500 }}>
                  <span className="gradient-text">ai</span>
                </span>
                <span style={{ fontSize: '13px', color: 'var(--d-text)', lineHeight: 1.5, padding: '8px 14px', borderRadius: '0 8px 8px 0', borderLeft: '2px solid var(--d-accent)', background: 'var(--d-accent-light)' }}>
                  Also — I noticed clip #1 has 91% hook strength. I&apos;ve drafted a Twitter thread and LinkedIn post around it. Want me to schedule?
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TOOLS (Bento Grid) ── */}
      <section id="tools" style={{ maxWidth: '1000px', margin: '0 auto', padding: '100px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em' }}>
            <span className="gradient-text">TOOLS</span>
          </span>
          <h2 style={{ fontSize: '36px', fontWeight: 800, marginTop: '8px', letterSpacing: '-0.03em', color: 'var(--d-text)' }}>
            Everything you need. Nothing you don&apos;t.
          </h2>
        </div>

        <div className="bento-grid">
          {TOOLS.map((tool, i) => (
            <div
              key={tool.num}
              className="glass-card"
              style={{
                padding: '28px',
                cursor: 'default',
                gridColumn: tool.size === 'wide' ? 'span 2' : 'span 1',
                animation: `fade-in 0.4s ease ${i * 0.06}s both`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span style={{ fontSize: '24px' }}>{tool.icon}</span>
                <div>
                  <span style={{ fontSize: '10px', color: 'var(--d-text-muted)', fontWeight: 500 }}>{tool.num}</span>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--d-text)', letterSpacing: '-0.01em', lineHeight: 1.2 }}>{tool.name}</h3>
                </div>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--d-text-secondary)', lineHeight: 1.6 }}>{tool.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" style={{ padding: '100px 24px', position: 'relative' }}>
        <div className="blob blob-2" style={{ top: '20%', right: '10%', opacity: 0.5 }} />
        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em' }}>
              <span className="gradient-text">PROCESS</span>
            </span>
            <h2 style={{ fontSize: '36px', fontWeight: 800, marginTop: '8px', letterSpacing: '-0.03em', color: 'var(--d-text)' }}>
              Three steps. Zero effort.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {[
              { n: '01', title: 'Upload', body: 'YouTube URL, RSS link, or drag-and-drop. Google Drive and resumable uploads supported.', icon: '⬆️' },
              { n: '02', title: 'Process', body: 'Dyspersia transcribes, analyzes, researches, scores clips, and generates content — one background job.', icon: '⚡' },
              { n: '03', title: 'Create', body: 'Clips captioned. Blog written. Show notes timestamped. Titles ranked. Download or schedule.', icon: '✨' },
            ].map((s, i) => (
              <div key={s.n} className="glass-card" style={{ padding: '32px', textAlign: 'center', animation: `fade-in 0.4s ease ${i * 0.1}s both` }}>
                <div style={{ fontSize: '28px', marginBottom: '16px' }}>{s.icon}</div>
                <div style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-0.04em', marginBottom: '4px' }}>
                  <span className="gradient-text">{s.n}</span>
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--d-text)', marginBottom: '10px', letterSpacing: '-0.01em' }}>{s.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--d-text-secondary)', lineHeight: 1.6 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CREATOR BRAIN ── */}
      <section style={{ padding: '100px 24px', background: 'var(--d-gradient-subtle)', borderTop: '1px solid var(--d-border)', borderBottom: '1px solid var(--d-border)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', gap: '48px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 380px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em' }}>
              <span className="gradient-text">CREATOR BRAIN</span>
            </span>
            <h2 style={{ fontSize: '30px', fontWeight: 800, color: 'var(--d-text)', margin: '8px 0 16px', lineHeight: 1.15, letterSpacing: '-0.03em' }}>
              It learns your voice.<br />Then it <span className="gradient-text">writes like you.</span>
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--d-text-secondary)', lineHeight: 1.7, marginBottom: '24px' }}>
              Every generation improves. Feed it a newsletter, brand doc, or philosophy.
              It stores your voice fingerprint, audience profile, and performance history.
            </p>
            {['Voice fingerprint and writing rhythm', 'Audience profile and vocabulary', 'Brand colors, fonts, caption style', 'Performance data across platforms', 'Custom knowledge base'].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span style={{ color: 'var(--d-accent)', fontSize: '14px' }}>✓</span>
                <span style={{ fontSize: '14px', color: 'var(--d-text-secondary)' }}>{item}</span>
              </div>
            ))}
          </div>
          <div style={{ flex: '1 1 320px' }}>
            <div className="glass-card" style={{ padding: '24px', boxShadow: 'var(--d-shadow-md)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--d-text)' }}>Creator Brain</span>
                <span style={{ fontSize: '11px', fontWeight: 500, padding: '2px 10px', borderRadius: '6px', background: 'var(--d-accent-light)', color: 'var(--d-accent)' }}>Active</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <div style={{ flex: 1, height: '6px', background: 'var(--d-bg-tertiary)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '78%', height: '100%', borderRadius: '3px', background: 'var(--d-gradient)' }} />
                </div>
                <span style={{ fontSize: '12px', fontWeight: 600 }}><span className="gradient-text">78%</span></span>
              </div>
              {[{ l: 'Voice', v: 'Conversational, data-driven' }, { l: 'Audience', v: 'Founders, operators' }, { l: 'Style', v: 'Bold Highlight' }, { l: 'Updated', v: '2 hours ago' }].map(r => (
                <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid var(--d-border-light)' }}>
                  <span style={{ fontSize: '12px', color: 'var(--d-text-muted)' }}>{r.l}</span>
                  <span style={{ fontSize: '12px', color: 'var(--d-text-secondary)' }}>{r.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ maxWidth: '1000px', margin: '0 auto', padding: '100px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em' }}>
            <span className="gradient-text">PRICING</span>
          </span>
          <h2 style={{ fontSize: '36px', fontWeight: 800, marginTop: '8px', letterSpacing: '-0.03em', color: 'var(--d-text)' }}>
            Simple. Transparent. Cancel anytime.
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {PRICING.map(plan => (
            <div key={plan.name} className={plan.badge ? '' : 'glass-card'} style={{
              padding: '32px', borderRadius: '12px', position: 'relative',
              ...(plan.badge ? {
                background: 'var(--d-surface-solid)',
                border: '2px solid transparent',
                backgroundClip: 'padding-box',
                boxShadow: '0 0 0 2px var(--d-accent), var(--d-shadow-lg)',
              } : {}),
            }}>
              {plan.badge && (
                <div style={{
                  position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
                  padding: '4px 14px', borderRadius: '8px', fontSize: '11px', fontWeight: 600, color: '#fff',
                  background: 'var(--d-gradient)', boxShadow: '0 2px 12px rgba(16,185,129,0.3)',
                }}>Popular</div>
              )}
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--d-text-secondary)', marginBottom: '6px' }}>{plan.name}</div>
              <div style={{ marginBottom: '24px' }}>
                <span style={{ fontSize: '42px', fontWeight: 800, letterSpacing: '-0.04em' }}>
                  <span className="gradient-text">{plan.price}</span>
                </span>
                <span style={{ fontSize: '14px', color: 'var(--d-text-muted)' }}>/mo</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                {plan.features.map(f => (
                  <div key={f} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{ color: 'var(--d-accent)', fontSize: '14px' }}>✓</span>
                    <span style={{ fontSize: '13px', color: 'var(--d-text-secondary)' }}>{f}</span>
                  </div>
                ))}
              </div>
              <Link href="/signup" style={{
                display: 'block', textAlign: 'center', padding: '12px',
                background: plan.badge ? 'var(--d-accent)' : 'transparent',
                color: plan.badge ? '#fff' : 'var(--d-accent)',
                border: plan.badge ? 'none' : '1px solid var(--d-accent-border)',
                textDecoration: 'none', fontSize: '14px', fontWeight: 600, borderRadius: '8px',
                transition: 'all 0.2s ease',
                ...(plan.badge ? { boxShadow: '0 2px 12px rgba(16,185,129,0.25)' } : {}),
              }}>Get started →</Link>
            </div>
          ))}
        </div>
        <p style={{ fontSize: '12px', color: 'var(--d-text-muted)', textAlign: 'center', marginTop: '28px' }}>
          All plans include Creator Brain · Semantic Search · Cross-episode memory · 7-day trial
        </p>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '100px 24px', textAlign: 'center', position: 'relative' }}>
        <div className="blob blob-1" style={{ bottom: '0', left: '20%', opacity: 0.4 }} />
        <div className="blob blob-3" style={{ top: '0', right: '15%', opacity: 0.3 }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, letterSpacing: '-0.04em', marginBottom: '12px' }}>
            <span style={{ color: 'var(--d-text)' }}>Start building your </span>
            <span className="gradient-text">content OS.</span>
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--d-text-muted)', marginBottom: '32px' }}>20 tools. One upload. Your voice.</p>
          <Link href="/signup" style={{
            display: 'inline-block', padding: '16px 40px', fontSize: '16px', fontWeight: 700,
            color: '#fff', textDecoration: 'none', borderRadius: '12px',
            background: 'var(--d-gradient)', boxShadow: '0 4px 24px rgba(16,185,129,0.3)',
            transition: 'all 0.2s ease',
          }}>Start for free →</Link>
          <p style={{ fontSize: '12px', color: 'var(--d-text-muted)', marginTop: '14px' }}>No credit card required.</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: 'var(--d-bg-secondary)', borderTop: '1px solid var(--d-border)', padding: '56px 24px 80px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
              <div className="status-dot" />
              <span style={{ fontWeight: 700 }}><span className="gradient-text">dyspersia</span></span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--d-text-muted)', lineHeight: 1.5 }}>The AI brain for podcast creators.</p>
            <p style={{ fontSize: '11px', color: 'var(--d-text-muted)', marginTop: '8px' }}>© 2026 Dyspersia / Slidein Venture</p>
          </div>
          {[
            { title: 'Tools', items: ['Transcription', 'Editorial', 'Reels', 'Content Pack', 'Distribution', 'Agent'] },
            { title: 'Product', items: ['Pricing', 'How it Works', 'Creator Brain', 'Changelog'] },
            { title: 'Company', items: ['About', 'Twitter', 'LinkedIn', 'Discord', 'Contact'] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--d-text)', marginBottom: '14px' }}>{col.title}</div>
              {col.items.map(item => (
                <div key={item} style={{ marginBottom: '7px' }}>
                  <span style={{ fontSize: '13px', color: 'var(--d-text-muted)', cursor: 'pointer', transition: 'color 0.2s ease' }}
                    onMouseEnter={e => { (e.target as HTMLSpanElement).style.color = 'var(--d-text)' }}
                    onMouseLeave={e => { (e.target as HTMLSpanElement).style.color = 'var(--d-text-muted)' }}>{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </footer>
    </div>
  )
}