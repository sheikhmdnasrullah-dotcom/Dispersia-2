'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ThemeToggle from '@/components/ThemeToggle'

const STEPS = ['Voice', 'Brand', 'Content', 'Launch']
const NICHES = ['Business', 'Tech', 'Finance', 'Health', 'Comedy', 'True Crime', 'Education', 'Other']
const CAPTION_STYLES = ['Minimal', 'Bold', 'Branded', 'Futuristic']
const TONES = ['Casual', 'Professional', 'Authoritative']
const TOOLS_LIST = ['Transcription', 'Podcast to Reels', 'Editorial Direction', 'Content Pack', 'Distribution', 'Dyspersia Agent']
const REEL_STYLES = ['Viral', 'Educational', 'Motivational', 'Finance']
const PLATFORMS_LIST = ['YouTube', 'TikTok', 'LinkedIn', 'Instagram', 'Twitter/X']

export default function SetupPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [showName, setShowName] = useState('')
  const [niche, setNiche] = useState('')
  const [audience, setAudience] = useState('')
  const [voiceSample, setVoiceSample] = useState('')
  const [logoUploaded, setLogoUploaded] = useState(false)
  const [logoProgress, setLogoProgress] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [brandColor, setBrandColor] = useState('#10b981')
  const [captionStyle, setCaptionStyle] = useState('')
  const [tone, setTone] = useState('')
  const [tools, setTools] = useState<string[]>([...TOOLS_LIST])
  const [reelStyle, setReelStyle] = useState('')
  const [platforms, setPlatforms] = useState<string[]>([])
  const [connected, setConnected] = useState<Record<string, boolean>>({})
  const [connecting, setConnecting] = useState<Record<string, boolean>>({})

  const f = "'Inter', sans-serif"

  function handleFakeUpload() {
    setUploading(true); setLogoProgress(0)
    let p = 0
    const iv = setInterval(() => { p += 5; setLogoProgress(p); if (p >= 100) { clearInterval(iv); setUploading(false); setLogoUploaded(true) } }, 100)
  }

  function handleConnect(platform: string) {
    setConnecting(prev => ({ ...prev, [platform]: true }))
    setTimeout(() => { setConnecting(prev => ({ ...prev, [platform]: false })); setConnected(prev => ({ ...prev, [platform]: true })) }, 1500)
  }

  function toggleArr(arr: string[], item: string, setter: (v: string[]) => void) {
    setter(arr.includes(item) ? arr.filter(x => x !== item) : [...arr, item])
  }

  const inputStyle: React.CSSProperties = {
    display: 'block', width: '100%', padding: '12px 16px', background: 'var(--d-surface-solid)',
    border: '1px solid var(--d-border)', color: 'var(--d-text)', fontFamily: f, fontSize: '14px',
    outline: 'none', borderRadius: '10px', transition: 'border-color 0.2s ease, box-shadow 0.2s ease', marginBottom: '16px', resize: 'none' as const,
  }

  const lblStyle: React.CSSProperties = { display: 'block', fontSize: '13px', color: 'var(--d-text-secondary)', marginBottom: '5px', fontWeight: 600, fontFamily: f }

  const pillBtn = (selected: boolean): React.CSSProperties => ({
    padding: '10px 18px', fontFamily: f, fontSize: '13px', cursor: 'pointer', borderRadius: '10px', transition: 'all 0.2s ease', fontWeight: 500,
    border: selected ? '1.5px solid var(--d-accent)' : '1px solid var(--d-border)',
    background: selected ? 'var(--d-accent-light)' : 'var(--d-glass-bg)',
    backdropFilter: 'blur(8px)',
    color: selected ? 'var(--d-accent)' : 'var(--d-text-muted)',
    boxShadow: selected ? '0 0 0 3px var(--d-accent-light)' : 'none',
  })

  const focusInput = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    (e.target as HTMLElement).style.borderColor = 'var(--d-accent)';
    (e.target as HTMLElement).style.boxShadow = '0 0 0 3px var(--d-accent-light)'
  }
  const blurInput = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    (e.target as HTMLElement).style.borderColor = 'var(--d-border)';
    (e.target as HTMLElement).style.boxShadow = 'none'
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', fontFamily: f, position: 'relative', overflow: 'hidden' }}>
      <div className="blob blob-1" style={{ top: '5%', left: '5%' }} />
      <div className="blob blob-2" style={{ bottom: '10%', right: '5%' }} />

      <div style={{ position: 'fixed', top: '16px', right: '130px', zIndex: 100 }}><ThemeToggle /></div>
      <button className="dev-bypass-btn" onClick={() => setStep(3)}>Skip all →</button>

      <div style={{ width: '100%', maxWidth: '580px', position: 'relative', zIndex: 1 }}>
        {/* Progress */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '48px' }}>
          {STEPS.map((s, i) => (
            <div key={s} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '100%', height: '4px', borderRadius: '2px', overflow: 'hidden',
                background: i <= step ? 'transparent' : 'var(--d-border)',
              }}>
                {i <= step && <div style={{ width: '100%', height: '100%', borderRadius: '2px', background: 'var(--d-gradient)' }} />}
              </div>
              <span style={{ fontSize: '11px', fontWeight: i === step ? 600 : 400, color: i <= step ? 'var(--d-accent)' : 'var(--d-text-muted)' }}>{s}</span>
            </div>
          ))}
        </div>

        <div className="glass-card" style={{ padding: '36px' }}>
          <div key={step} style={{ animation: 'fade-in 0.25s ease' }}>
            {/* STEP 1 */}
            {step === 0 && (
              <div>
                <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--d-text)', marginBottom: '6px', letterSpacing: '-0.02em' }}>Tell us about your show</h1>
                <p style={{ fontSize: '14px', color: 'var(--d-text-muted)', marginBottom: '28px' }}>This helps your Creator Brain understand your voice.</p>
                <label style={lblStyle}>Show name</label>
                <input style={inputStyle} placeholder="e.g. The Growth Mindset" value={showName} onChange={e => setShowName(e.target.value)} onFocus={focusInput} onBlur={blurInput} />
                <label style={lblStyle}>Niche</label>
                <select style={{ ...inputStyle, appearance: 'none' }} value={niche} onChange={e => setNiche(e.target.value)} onFocus={focusInput} onBlur={blurInput}>
                  <option value="">Select...</option>
                  {NICHES.map(n => <option key={n} value={n}>{n}</option>)}
                </select>
                <label style={lblStyle}>Target audience</label>
                <textarea style={{ ...inputStyle, minHeight: '70px' }} placeholder="Who listens and what do they care about?" value={audience} onChange={e => setAudience(e.target.value)} rows={3} onFocus={focusInput} onBlur={blurInput} />
                <label style={lblStyle}>Voice sample</label>
                <textarea style={{ ...inputStyle, minHeight: '100px' }} placeholder="Paste writing that represents your voice..." value={voiceSample} onChange={e => setVoiceSample(e.target.value)} rows={4} onFocus={focusInput} onBlur={blurInput} />
                <p style={{ fontSize: '12px', color: 'var(--d-text-muted)', marginTop: '-8px' }}>This trains your Creator Brain voice fingerprint.</p>
              </div>
            )}

            {/* STEP 2 */}
            {step === 1 && (
              <div>
                <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--d-text)', marginBottom: '6px', letterSpacing: '-0.02em' }}>Define your brand</h1>
                <p style={{ fontSize: '14px', color: 'var(--d-text-muted)', marginBottom: '28px' }}>Visual identity for captions, thumbnails, and templates.</p>
                <label style={lblStyle}>Logo</label>
                <div onClick={() => !logoUploaded && !uploading && handleFakeUpload()}
                  style={{ border: '2px dashed var(--d-border)', padding: '40px 20px', textAlign: 'center', cursor: 'pointer', marginBottom: '24px', borderRadius: '12px', transition: 'all 0.2s ease', background: logoUploaded ? 'var(--d-accent-light)' : 'transparent' }}>
                  {uploading ? (
                    <div>
                      <div style={{ width: '180px', height: '4px', background: 'var(--d-border)', borderRadius: '2px', margin: '0 auto 8px', overflow: 'hidden' }}>
                        <div style={{ width: `${logoProgress}%`, height: '100%', borderRadius: '2px', background: 'var(--d-gradient)', transition: 'width 0.1s linear' }} />
                      </div>
                      <span style={{ fontSize: '12px', color: 'var(--d-text-muted)' }}>Uploading... {logoProgress}%</span>
                    </div>
                  ) : logoUploaded ? (
                    <span style={{ fontSize: '13px', color: 'var(--d-accent)', fontWeight: 600 }}>✓ logo.png uploaded</span>
                  ) : (
                    <span style={{ fontSize: '13px', color: 'var(--d-text-muted)' }}>Drop logo here or click to upload</span>
                  )}
                </div>
                <label style={lblStyle}>Brand color</label>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '24px' }}>
                  <input style={{ ...inputStyle, marginBottom: 0, flex: 1 }} value={brandColor} onChange={e => setBrandColor(e.target.value)} onFocus={focusInput} onBlur={blurInput} />
                  <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: brandColor, border: '2px solid var(--d-border)', flexShrink: 0 }} />
                </div>
                <label style={lblStyle}>Caption style</label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
                  {CAPTION_STYLES.map(s => <button key={s} onClick={() => setCaptionStyle(s)} style={pillBtn(captionStyle === s)}>{s}</button>)}
                </div>
                <label style={lblStyle}>Tone</label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {TONES.map(t => <button key={t} onClick={() => setTone(t)} style={pillBtn(tone === t)}>{t}</button>)}
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 2 && (
              <div>
                <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--d-text)', marginBottom: '6px', letterSpacing: '-0.02em' }}>What do you need?</h1>
                <p style={{ fontSize: '14px', color: 'var(--d-text-muted)', marginBottom: '28px' }}>Select your tools and preferences.</p>
                <label style={lblStyle}>Tools</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '28px' }}>
                  {TOOLS_LIST.map(tool => {
                    const on = tools.includes(tool)
                    return (
                      <button key={tool} onClick={() => toggleArr(tools, tool, setTools)} style={{
                        display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px', cursor: 'pointer', borderRadius: '10px', transition: 'all 0.2s ease', textAlign: 'left', fontFamily: f, fontSize: '13px',
                        background: on ? 'var(--d-accent-light)' : 'var(--d-glass-bg)', backdropFilter: 'blur(8px)',
                        border: on ? '1.5px solid var(--d-accent-border)' : '1px solid var(--d-border)',
                        color: on ? 'var(--d-text)' : 'var(--d-text-muted)', fontWeight: on ? 500 : 400,
                      }}>
                        <div style={{ width: '18px', height: '18px', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                          border: on ? 'none' : '1.5px solid var(--d-border)', background: on ? 'var(--d-accent)' : 'transparent' }}>
                          {on && <span style={{ color: '#fff', fontSize: '10px', fontWeight: 700 }}>✓</span>}
                        </div>
                        {tool}
                      </button>
                    )
                  })}
                </div>
                <label style={lblStyle}>Default reel style</label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
                  {REEL_STYLES.map(s => <button key={s} onClick={() => setReelStyle(s)} style={pillBtn(reelStyle === s)}>{s}</button>)}
                </div>
                <label style={lblStyle}>Target platforms</label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {PLATFORMS_LIST.map(p => <button key={p} onClick={() => toggleArr(platforms, p, setPlatforms)} style={pillBtn(platforms.includes(p))}>{p}</button>)}
                </div>
              </div>
            )}

            {/* STEP 4 */}
            {step === 3 && (
              <div>
                <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--d-text)', marginBottom: '6px', letterSpacing: '-0.02em' }}>Connect your platforms</h1>
                <p style={{ fontSize: '14px', color: 'var(--d-text-muted)', marginBottom: '28px' }}>Optional — you can do this later in settings.</p>
                {['YouTube', 'Spotify', 'LinkedIn'].map(p => (
                  <button key={p} onClick={() => !connected[p] && !connecting[p] && handleConnect(p)} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '14px 18px',
                    background: connected[p] ? 'var(--d-accent-light)' : 'var(--d-glass-bg)', backdropFilter: 'blur(8px)',
                    border: connected[p] ? '1.5px solid var(--d-accent-border)' : '1px solid var(--d-border)',
                    color: connected[p] ? 'var(--d-accent)' : 'var(--d-text-secondary)', fontFamily: f, fontSize: '14px', fontWeight: 500,
                    cursor: connected[p] ? 'default' : 'pointer', borderRadius: '10px', marginBottom: '10px', transition: 'all 0.2s ease',
                  }}>
                    <span>{connecting[p] ? 'Connecting...' : `Connect ${p}`}</span>
                    {connected[p] && <span style={{ color: 'var(--d-accent)', fontSize: '14px', fontWeight: 600 }}>✓ Connected</span>}
                  </button>
                ))}
                <div onClick={() => router.push('/dashboard')} style={{
                  width: '100%', padding: '14px', fontFamily: f, fontWeight: 700, fontSize: '15px',
                  textAlign: 'center', cursor: 'pointer', borderRadius: '12px', marginTop: '24px',
                  background: 'var(--d-gradient)', color: '#fff',
                  boxShadow: '0 4px 20px rgba(16,185,129,0.3)',
                  transition: 'all 0.2s ease',
                }}>Launch your brain →</div>
              </div>
            )}
          </div>
        </div>

        {/* Nav */}
        {step < 3 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '28px' }}>
            {step > 0 ? (
              <button onClick={() => setStep(step - 1)} style={{ padding: '10px 22px', background: 'var(--d-glass-bg)', backdropFilter: 'blur(8px)', color: 'var(--d-text-muted)', border: '1px solid var(--d-border)', cursor: 'pointer', fontFamily: f, fontSize: '13px', fontWeight: 500, borderRadius: '10px', transition: 'all 0.2s ease' }}>Back</button>
            ) : <div />}
            <button onClick={() => setStep(step + 1)} style={{ padding: '10px 28px', background: 'var(--d-accent)', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: f, fontSize: '13px', fontWeight: 600, borderRadius: '10px', boxShadow: '0 2px 12px rgba(16,185,129,0.25)', transition: 'all 0.2s ease' }}>Continue</button>
          </div>
        )}
      </div>
    </div>
  )
}