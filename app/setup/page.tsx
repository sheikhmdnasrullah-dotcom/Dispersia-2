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

    const { data: show } = await supabase
      .from('shows')
      .insert({ user_id: user.id, name: showName, niche })
      .select()
      .single()

    if (show) {
      await supabase.from('creator_brain').insert({
        show_id: show.id,
        audience_persona: audience,
        tone,
        content_pillars: pillars,
        goals: '',
        platform_priority: platforms,
        rejected_styles: badContent,
      })
    }

    router.push('/dashboard')
  }

  return (
    <div style={{ maxWidth: 560, margin: '60px auto', padding: 24 }}>

      <p style={{ color: '#888', marginBottom: 8 }}>Step {step} of 5</p>
      <div style={{ height: 4, background: '#222', borderRadius: 4, marginBottom: 32 }}>
        <div style={{ height: 4, background: '#6366f1', borderRadius: 4, width: `${(step / 5) * 100}%`, transition: 'width 0.3s' }} />
      </div>

      {step === 1 && (
        <div>
          <h2 style={{ marginBottom: 24 }}>Tell us about your show</h2>
          <input placeholder="Show name" value={showName} onChange={e => setShowName(e.target.value)}
            style={{ display: 'block', width: '100%', marginBottom: 12, padding: 10 }} />
          <input placeholder="Niche (e.g. personal finance, true crime, tech)" value={niche} onChange={e => setNiche(e.target.value)}
            style={{ display: 'block', width: '100%', marginBottom: 12, padding: 10 }} />
          <textarea placeholder="Describe your target audience (who listens, what they care about)" value={audience} onChange={e => setAudience(e.target.value)}
            rows={3} style={{ display: 'block', width: '100%', marginBottom: 12, padding: 10 }} />
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 style={{ marginBottom: 8 }}>Your content pillars</h2>
          <p style={{ color: '#888', marginBottom: 24 }}>Add 3 to 5 recurring themes your show covers</p>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <input placeholder="e.g. Mindset" value={pillarInput} onChange={e => setPillarInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addPillar()}
              style={{ flex: 1, padding: 10 }} />
            <button onClick={addPillar} style={{ padding: '10px 16px', background: '#6366f1', color: 'white', border: 'none', cursor: 'pointer' }}>Add</button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {pillars.map(p => (
              <span key={p} style={{ background: '#6366f1', color: 'white', padding: '4px 12px', borderRadius: 20, fontSize: 14 }}>
                {p} <span onClick={() => setPillars(pillars.filter(x => x !== p))} style={{ cursor: 'pointer', marginLeft: 6 }}>x</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 style={{ marginBottom: 24 }}>What is your tone?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {TONES.map(t => (
              <div key={t.id} onClick={() => setTone(t.id)}
                style={{ padding: 16, border: `2px solid ${tone === t.id ? '#6366f1' : '#333'}`, borderRadius: 8, cursor: 'pointer' }}>
                <strong>{t.label}</strong>
                <p style={{ color: '#888', marginTop: 4, fontSize: 14 }}>{t.example}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 style={{ marginBottom: 24 }}>Where do you publish?</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {PLATFORMS.map(p => (
              <div key={p} onClick={() => togglePlatform(p)}
                style={{ padding: '10px 20px', border: `2px solid ${platforms.includes(p) ? '#6366f1' : '#333'}`, borderRadius: 8, cursor: 'pointer' }}>
                {p}
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 5 && (
        <div>
          <h2 style={{ marginBottom: 24 }}>Train your Creator Brain</h2>
          <p style={{ color: '#888', marginBottom: 8 }}>Paste content you are proud of</p>
          <textarea value={goodContent} onChange={e => setGoodContent(e.target.value)}
            rows={4} placeholder="Content you love and want to sound like..."
            style={{ display: 'block', width: '100%', marginBottom: 20, padding: 10 }} />
          <p style={{ color: '#888', marginBottom: 8 }}>Paste content you do NOT want to sound like</p>
          <textarea value={badContent} onChange={e => setBadContent(e.target.value)}
            rows={4} placeholder="Content styles you hate..."
            style={{ display: 'block', width: '100%', marginBottom: 20, padding: 10 }} />
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32 }}>
        {step > 1 && (
          <button onClick={() => setStep(step - 1)}
            style={{ padding: '12px 24px', background: '#222', color: 'white', border: 'none', cursor: 'pointer' }}>
            Back
          </button>
        )}
        <div style={{ marginLeft: 'auto' }}>
          {step < 5 ? (
            <button onClick={() => setStep(step + 1)}
              style={{ padding: '12px 24px', background: '#6366f1', color: 'white', border: 'none', cursor: 'pointer' }}>
              Next
            </button>
          ) : (
            <button onClick={handleFinish} disabled={loading}
              style={{ padding: '12px 24px', background: '#6366f1', color: 'white', border: 'none', cursor: 'pointer' }}>
              {loading ? 'Saving...' : 'Finish setup'}
            </button>
          )}
        </div>
      </div>

    </div>
  )
}