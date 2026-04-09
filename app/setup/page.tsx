'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

const TONES = [
  { id: 'casual', label: 'Casual & Conversational', example: 'Hey everyone, welcome back to the show!' },
  { id: 'authoritative', label: 'Authoritative & Professional', example: 'Today we examine the key factors driving this trend.' },
  { id: 'energetic', label: 'Energetic & Hype', example: 'This is INSANE and you need to hear this right now!' },
  { id: 'calm', label: 'Calm & Thoughtful', example: 'Let us take a moment to really think about what this means.' },
]

const PLATFORMS = ['YouTube', 'Spotify', 'LinkedIn', 'Instagram', 'Twitter/X', 'TikTok']

const STEP_LABELS = ['Your Show', 'Content Pillars', 'Tone', 'Platforms', 'Train the Brain']

export default function SetupPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [showName, setShowName] = useState('')
  const [niche, setNiche] = useState('')
  const [audience, setAudience] = useState('')
  const [pillars, setPillars] = useState<string[]>([])
  const [pillarInput, setPillarInput] = useState('')
  const [tone, setTone] = useState('')
  const [platforms, setPlatforms] = useState<string[]>([])
  const [goodContent, setGoodContent] = useState('')
  const [badContent, setBadContent] = useState('')

  function addPillar() {
    if (pillarInput.trim() && pillars.length < 5) {
      setPillars([...pillars, pillarInput.trim()])
      setPillarInput('')
    }
  }

  function togglePlatform(p: string) {
    setPlatforms(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p])
  }

  async function handleFinish() {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/login'); return }
    const { data: show } = await supabase.from('shows')
      .insert({ user_id: user.id, name: showName, niche })
      .select().single()
    if (show) {
      await supabase.from('creator_brain').insert({
        show_id: show.id, audience_persona: audience,
        tone, content_pillars: pillars, goals: '',
        platform_priority: platforms, rejected_styles: badContent,
      })
    }
    router.push('/dashboard')
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#080808',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'IBM Plex Mono', monospace",
      backgroundImage: `
        linear-gradient(rgba(0,255,128,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,255,128,0.03) 1px, transparent 1px)
      `,
      backgroundSize: '40px 40px',
      padding: '40px 24px',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .field {
          display: block; width: 100%; padding: 14px 16px;
          background: #0f0f0f; border: 1px solid #1e1e1e;
          color: #e8e8e8; font-family: 'IBM Plex Mono', monospace;
          font-size: 13px; outline: none; transition: border-color 0.2s;
          margin-bottom: 12px; resize: none;
        }
        .field:focus { border-color: #00ff80; }
        .field::placeholder { color: #2a2a2a; }
        .btn-main {
          padding: 12px 28px; background: #00ff80; color: #080808;
          border: none; cursor: pointer; font-family: 'IBM Plex Mono', monospace;
          font-size: 12px; font-weight: 500; letter-spacing: 0.08em;
          text-transform: uppercase; transition: opacity 0.2s;
        }
        .btn-main:hover { opacity: 0.85; }
        .btn-main:disabled { opacity: 0.4; cursor: not-allowed; }
        .btn-back {
          padding: 12px 28px; background: transparent; color: #333;
          border: 1px solid #1e1e1e; cursor: pointer;
          font-family: 'IBM Plex Mono', monospace; font-size: 12px;
          letter-spacing: 0.08em; transition: color 0.2s;
        }
        .btn-back:hover { color: #666; }
        .tone-card {
          padding: 16px; border: 1px solid #1a1a1a; cursor: pointer;
          margin-bottom: 10px; transition: border-color 0.2s, background 0.2s;
        }
        .tone-card:hover { border-color: #2a2a2a; }
        .platform-pill {
          padding: 10px 18px; border: 1px solid #1a1a1a; cursor: pointer;
          font-size: 12px; transition: all 0.2s; letter-spacing: 0.05em;
        }
      `}</style>

      <div style={{ width: '100%', maxWidth: 540 }}>

        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
            <div style={{ width: 8, height: 8, background: '#00ff80', borderRadius: '50%' }} />
            <span style={{ color: '#00ff80', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Creator Brain Setup
            </span>
          </div>

          <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
            {STEP_LABELS.map((label, i) => (
              <div key={i} style={{ flex: 1, height: 2, background: i < step ? '#00ff80' : '#1a1a1a', transition: 'background 0.3s' }} />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#2a2a2a', fontSize: 11 }}>{STEP_LABELS[step - 1]}</span>
            <span style={{ color: '#2a2a2a', fontSize: 11 }}>{step} / 5</span>
          </div>
        </div>

        {step === 1 && (
          <div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: '#f0f0f0', marginBottom: 8 }}>
              Tell us about your show
            </h2>
            <p style={{ color: '#333', fontSize: 12, marginBottom: 28, letterSpacing: '0.05em' }}>
              This becomes the foundation of your Creator Brain.
            </p>
            <input className="field" placeholder="Show name" value={showName} onChange={e => setShowName(e.target.value)} />
            <input className="field" placeholder="Niche — e.g. personal finance, true crime, SaaS" value={niche} onChange={e => setNiche(e.target.value)} />
            <textarea className="field" placeholder="Describe your target audience. Who listens? What do they care about?" value={audience} onChange={e => setAudience(e.target.value)} rows={4} />
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: '#f0f0f0', marginBottom: 8 }}>
              Content pillars
            </h2>
            <p style={{ color: '#333', fontSize: 12, marginBottom: 28, letterSpacing: '0.05em' }}>
              Add 3 to 5 recurring themes your show covers.
            </p>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              <input className="field" style={{ marginBottom: 0, flex: 1 }} placeholder="e.g. Mindset" value={pillarInput}
                onChange={e => setPillarInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && addPillar()} />
              <button onClick={addPillar} style={{ padding: '0 20px', background: '#00ff80', color: '#080808', border: 'none', cursor: 'pointer', fontFamily: "'IBM Plex Mono', monospace", fontSize: 12 }}>
                Add
              </button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {pillars.map(p => (
                <span key={p} style={{ background: 'rgba(0,255,128,0.08)', color: '#00ff80', padding: '6px 14px', fontSize: 12, border: '1px solid rgba(0,255,128,0.2)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  {p}
                  <span onClick={() => setPillars(pillars.filter(x => x !== p))} style={{ cursor: 'pointer', color: '#00aa55', fontSize: 14 }}>×</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: '#f0f0f0', marginBottom: 8 }}>
              Your tone
            </h2>
            <p style={{ color: '#333', fontSize: 12, marginBottom: 28, letterSpacing: '0.05em' }}>
              How does your show sound? Pick the closest match.
            </p>
            {TONES.map(t => (
              <div key={t.id} className="tone-card" onClick={() => setTone(t.id)}
                style={{ borderColor: tone === t.id ? '#00ff80' : '#1a1a1a', background: tone === t.id ? 'rgba(0,255,128,0.04)' : 'transparent' }}>
                <div style={{ color: tone === t.id ? '#00ff80' : '#888', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>{t.label}</div>
                <div style={{ color: '#2a2a2a', fontSize: 12, fontStyle: 'italic' }}>{t.example}</div>
              </div>
            ))}
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: '#f0f0f0', marginBottom: 8 }}>
              Where do you publish?
            </h2>
            <p style={{ color: '#333', fontSize: 12, marginBottom: 28, letterSpacing: '0.05em' }}>
              Select all platforms you distribute on.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {PLATFORMS.map(p => (
                <div key={p} className="platform-pill" onClick={() => togglePlatform(p)}
                  style={{ borderColor: platforms.includes(p) ? '#00ff80' : '#1a1a1a', color: platforms.includes(p) ? '#00ff80' : '#444', background: platforms.includes(p) ? 'rgba(0,255,128,0.05)' : 'transparent' }}>
                  {p}
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: '#f0f0f0', marginBottom: 8 }}>
              Train the brain
            </h2>
            <p style={{ color: '#333', fontSize: 12, marginBottom: 28, letterSpacing: '0.05em' }}>
              Show it what good sounds like. And what to never produce.
            </p>
            <label style={{ color: '#444', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
              Content you are proud of
            </label>
            <textarea className="field" value={goodContent} onChange={e => setGoodContent(e.target.value)}
              rows={4} placeholder="Paste a sample of writing, a description, or a transcript you love..." />
            <label style={{ color: '#444', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 8, marginTop: 8 }}>
              Content you never want to sound like
            </label>
            <textarea className="field" value={badContent} onChange={e => setBadContent(e.target.value)}
              rows={4} placeholder="Paste examples of styles, tones, or formats you hate..." />
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 40 }}>
          {step > 1 ? (
            <button className="btn-back" onClick={() => setStep(step - 1)}>Back</button>
          ) : <div />}
          {step < 5 ? (
            <button className="btn-main" onClick={() => setStep(step + 1)}>Next</button>
          ) : (
            <button className="btn-main" onClick={handleFinish} disabled={loading}>
              {loading ? 'Saving...' : 'Launch brain'}
            </button>
          )}
        </div>

      </div>
    </div>
  )
}