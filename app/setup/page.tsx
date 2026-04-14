'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

const STEP_LABELS = ['VOICE', 'BRAND', 'CONTENT', 'LAUNCH']

const NICHES = [
  'Business',
  'Tech',
  'Finance',
  'Health',
  'True Crime',
  'Comedy',
  'Education',
  'Other',
]

const CAPTION_STYLES = ['MINIMAL', 'BOLD', 'BRANDED', 'FUTURISTIC']

const TOOLS_LIST = [
  'Transcription',
  'Podcast to Reels',
  'Editorial Direction',
  'Content Pack',
  'Distribution',
  'Dispersia Agent',
]

const REEL_STYLES = ['VIRAL', 'EDUCATIONAL', 'MOTIVATIONAL', 'FINANCE']

const PLATFORMS = ['YouTube', 'TikTok', 'LinkedIn', 'Instagram', 'Twitter/X']

interface FormData {
  showName: string
  niche: string
  audience: string
  voiceSample: string
  logoFile: File | null
  brandColor: string
  captionStyle: string
  tools: string[]
  reelStyle: string
  platforms: string[]
}

export default function SetupPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    showName: '',
    niche: '',
    audience: '',
    voiceSample: '',
    logoFile: null,
    brandColor: '#00FF80',
    captionStyle: '',
    tools: [],
    reelStyle: '',
    platforms: [],
  })

  function updateField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  function toggleArrayItem(key: 'tools' | 'platforms', item: string) {
    setFormData((prev) => {
      const arr = prev[key] as string[]
      return {
        ...prev,
        [key]: arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item],
      }
    })
  }

  function handleNext() {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  function handleBack() {
    if (currentStep > 0) setCurrentStep(currentStep - 1)
  }

  function handleLaunch() {
    router.push('/dashboard')
  }

  function handleLogoDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) updateField('logoFile', file)
  }

  function handleLogoSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null
    if (file) updateField('logoFile', file)
  }

  // Common input styles
  const inputStyle: React.CSSProperties = {
    display: 'block',
    width: '100%',
    padding: '12px 16px',
    background: '#0f0f0f',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#ffffff',
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: '13px',
    outline: 'none',
    borderRadius: '2px',
    transition: 'border-color 0.2s',
    marginBottom: '16px',
    resize: 'none' as const,
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: '10px',
    color: '#00FF80',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    marginBottom: '8px',
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
      }}
    >
      <div style={{ width: '100%', maxWidth: '640px' }}>
        {/* ── Step Progress Bar ── */}
        <div style={{ marginBottom: '48px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0px',
              marginBottom: '12px',
            }}
          >
            {STEP_LABELS.map((label, i) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center' }}>
                {/* Dot */}
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontFamily: "'IBM Plex Mono', monospace",
                    transition: 'all 0.3s ease',
                    ...(i < currentStep
                      ? {
                          background: '#00FF80',
                          color: '#080808',
                          border: '2px solid #00FF80',
                        }
                      : i === currentStep
                      ? {
                          background: 'transparent',
                          border: '2px solid #00FF80',
                          boxShadow: '0 0 12px rgba(0,255,128,0.25)',
                        }
                      : {
                          background: 'transparent',
                          border: '2px solid rgba(255,255,255,0.1)',
                        }),
                  }}
                >
                  {i < currentStep ? (
                    <span style={{ fontSize: '14px', lineHeight: 1 }}>✓</span>
                  ) : (
                    <div
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: i === currentStep ? '#00FF80' : 'rgba(255,255,255,0.15)',
                      }}
                    />
                  )}
                </div>
                {/* Connector line */}
                {i < STEP_LABELS.length - 1 && (
                  <div
                    style={{
                      width: '60px',
                      height: '2px',
                      background: i < currentStep ? '#00FF80' : 'rgba(255,255,255,0.08)',
                      transition: 'background 0.3s ease',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
          {/* Labels under dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0px' }}>
            {STEP_LABELS.map((label, i) => (
              <div
                key={`label-${label}`}
                style={{
                  width: i < STEP_LABELS.length - 1 ? '88px' : '28px',
                  textAlign: 'center',
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '9px',
                  letterSpacing: '0.12em',
                  color: i <= currentStep ? '#00FF80' : 'rgba(255,255,255,0.2)',
                  transition: 'color 0.3s ease',
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* ── Step Content ── */}
        <div style={{ animation: 'fade-up 0.3s ease' }} key={currentStep}>
          {/* STEP 1: Creator Voice */}
          {currentStep === 0 && (
            <div>
              <h1
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: '32px',
                  color: '#ffffff',
                  marginBottom: '32px',
                  lineHeight: 1.2,
                }}
              >
                Tell us about your show.
              </h1>

              <label style={labelStyle}>SHOW NAME</label>
              <input
                style={inputStyle}
                placeholder="e.g. The Growth Mindset"
                value={formData.showName}
                onChange={(e) => updateField('showName', e.target.value)}
                onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = '#00FF80' }}
                onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.1)' }}
              />

              <label style={labelStyle}>NICHE</label>
              <select
                style={{
                  ...inputStyle,
                  appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2300FF80' d='M2 4l4 4 4-4'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 16px center',
                  paddingRight: '40px',
                }}
                value={formData.niche}
                onChange={(e) => updateField('niche', e.target.value)}
                onFocus={(e) => { (e.target as HTMLSelectElement).style.borderColor = '#00FF80' }}
                onBlur={(e) => { (e.target as HTMLSelectElement).style.borderColor = 'rgba(255,255,255,0.1)' }}
              >
                <option value="" style={{ background: '#0f0f0f' }}>
                  Select your niche...
                </option>
                {NICHES.map((n) => (
                  <option key={n} value={n} style={{ background: '#0f0f0f' }}>
                    {n}
                  </option>
                ))}
              </select>

              <label style={labelStyle}>TARGET AUDIENCE</label>
              <textarea
                style={{ ...inputStyle, minHeight: '80px' }}
                placeholder="Describe your target audience — who listens, what they care about..."
                value={formData.audience}
                onChange={(e) => updateField('audience', e.target.value)}
                onFocus={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = '#00FF80' }}
                onBlur={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = 'rgba(255,255,255,0.1)' }}
                rows={3}
              />

              <label style={labelStyle}>VOICE SAMPLE</label>
              <textarea
                style={{ ...inputStyle, minHeight: '100px' }}
                placeholder="Paste a newsletter, blog post, or writing you love — we'll learn your voice from it"
                value={formData.voiceSample}
                onChange={(e) => updateField('voiceSample', e.target.value)}
                onFocus={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = '#00FF80' }}
                onBlur={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = 'rgba(255,255,255,0.1)' }}
                rows={4}
              />
            </div>
          )}

          {/* STEP 2: Brand Identity */}
          {currentStep === 1 && (
            <div>
              <h1
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: '32px',
                  color: '#ffffff',
                  marginBottom: '32px',
                  lineHeight: 1.2,
                }}
              >
                Your brand identity.
              </h1>

              {/* Logo Upload */}
              <label style={labelStyle}>LOGO</label>
              <div
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleLogoDrop}
                onDragOver={(e) => e.preventDefault()}
                style={{
                  border: '1.5px dashed rgba(0,255,128,0.4)',
                  padding: '48px 24px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  marginBottom: '24px',
                  transition: 'all 0.2s',
                  background: formData.logoFile
                    ? 'rgba(0,255,128,0.04)'
                    : 'transparent',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = '#00FF80'
                  ;(e.currentTarget as HTMLDivElement).style.background = 'rgba(0,255,128,0.04)'
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0,255,128,0.4)'
                  if (!formData.logoFile) {
                    ;(e.currentTarget as HTMLDivElement).style.background = 'transparent'
                  }
                }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoSelect}
                  style={{ display: 'none' }}
                />
                <div
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '12px',
                    color: formData.logoFile
                      ? '#00FF80'
                      : 'rgba(255,255,255,0.3)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  {formData.logoFile ? formData.logoFile.name : 'DROP LOGO HERE'}
                </div>
                <div
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '10px',
                    color: 'rgba(255,255,255,0.15)',
                    marginTop: '8px',
                  }}
                >
                  or click to upload
                </div>
              </div>

              {/* Brand Color */}
              <label style={labelStyle}>BRAND COLOR</label>
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'center',
                  marginBottom: '28px',
                }}
              >
                <input
                  style={{
                    ...inputStyle,
                    marginBottom: 0,
                    flex: 1,
                    textTransform: 'uppercase',
                  }}
                  value={formData.brandColor}
                  onChange={(e) => updateField('brandColor', e.target.value)}
                  placeholder="#00FF80"
                  onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = '#00FF80' }}
                  onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.1)' }}
                />
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '2px',
                    background: formData.brandColor || '#00FF80',
                    border: '1px solid rgba(255,255,255,0.1)',
                    flexShrink: 0,
                  }}
                />
              </div>

              {/* Caption Style */}
              <label style={labelStyle}>CAPTION STYLE</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {CAPTION_STYLES.map((style) => (
                  <button
                    key={style}
                    onClick={() => updateField('captionStyle', style)}
                    style={{
                      padding: '10px 20px',
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: '11px',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      borderRadius: '2px',
                      transition: 'all 0.2s',
                      border:
                        formData.captionStyle === style
                          ? '1px solid #00FF80'
                          : '1px solid rgba(255,255,255,0.1)',
                      background:
                        formData.captionStyle === style
                          ? 'rgba(0,255,128,0.1)'
                          : 'transparent',
                      color:
                        formData.captionStyle === style
                          ? '#00FF80'
                          : 'rgba(255,255,255,0.4)',
                    }}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Content Preferences */}
          {currentStep === 2 && (
            <div>
              <h1
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: '32px',
                  color: '#ffffff',
                  marginBottom: '32px',
                  lineHeight: 1.2,
                }}
              >
                Content preferences.
              </h1>

              {/* Tools checkboxes */}
              <label style={labelStyle}>WHICH TOOLS DO YOU NEED?</label>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '8px',
                  marginBottom: '28px',
                }}
              >
                {TOOLS_LIST.map((tool) => {
                  const checked = formData.tools.includes(tool)
                  return (
                    <button
                      key={tool}
                      onClick={() => toggleArrayItem('tools', tool)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '12px 14px',
                        background: checked ? 'rgba(0,255,128,0.04)' : 'transparent',
                        border: checked
                          ? '1px solid rgba(0,255,128,0.2)'
                          : '1px solid rgba(255,255,255,0.08)',
                        cursor: 'pointer',
                        borderRadius: '2px',
                        transition: 'all 0.2s',
                        textAlign: 'left',
                      }}
                    >
                      {/* Custom checkbox */}
                      <div
                        style={{
                          width: '16px',
                          height: '16px',
                          borderRadius: '2px',
                          border: checked
                            ? '2px solid #00FF80'
                            : '2px solid rgba(255,255,255,0.15)',
                          background: checked ? '#00FF80' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          transition: 'all 0.2s',
                        }}
                      >
                        {checked && (
                          <span
                            style={{
                              color: '#080808',
                              fontSize: '10px',
                              fontWeight: 700,
                              lineHeight: 1,
                            }}
                          >
                            ✓
                          </span>
                        )}
                      </div>
                      <span
                        style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: '12px',
                          color: checked ? '#ffffff' : 'rgba(255,255,255,0.5)',
                        }}
                      >
                        {tool}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Reel Style */}
              <label style={labelStyle}>DEFAULT REEL STYLE</label>
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  flexWrap: 'wrap',
                  marginBottom: '28px',
                }}
              >
                {REEL_STYLES.map((style) => (
                  <button
                    key={style}
                    onClick={() => updateField('reelStyle', style)}
                    style={{
                      padding: '10px 20px',
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: '11px',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      borderRadius: '2px',
                      transition: 'all 0.2s',
                      border:
                        formData.reelStyle === style
                          ? '1px solid #00FF80'
                          : '1px solid rgba(255,255,255,0.1)',
                      background:
                        formData.reelStyle === style
                          ? 'rgba(0,255,128,0.1)'
                          : 'transparent',
                      color:
                        formData.reelStyle === style
                          ? '#00FF80'
                          : 'rgba(255,255,255,0.4)',
                    }}
                  >
                    {style}
                  </button>
                ))}
              </div>

              {/* Target Platforms */}
              <label style={labelStyle}>TARGET PLATFORMS</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {PLATFORMS.map((p) => {
                  const selected = formData.platforms.includes(p)
                  return (
                    <button
                      key={p}
                      onClick={() => toggleArrayItem('platforms', p)}
                      style={{
                        padding: '10px 18px',
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: '11px',
                        letterSpacing: '0.06em',
                        cursor: 'pointer',
                        borderRadius: '2px',
                        transition: 'all 0.2s',
                        border: selected
                          ? '1px solid #00FF80'
                          : '1px solid rgba(255,255,255,0.1)',
                        background: selected
                          ? 'rgba(0,255,128,0.1)'
                          : 'transparent',
                        color: selected ? '#00FF80' : 'rgba(255,255,255,0.4)',
                      }}
                    >
                      {p}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* STEP 4: Connect & Launch */}
          {currentStep === 3 && (
            <div>
              <h1
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: '32px',
                  color: '#ffffff',
                  marginBottom: '12px',
                  lineHeight: 1.2,
                }}
              >
                Connect & launch.
              </h1>
              <p
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.35)',
                  marginBottom: '32px',
                  letterSpacing: '0.03em',
                }}
              >
                Link your platforms for automated distribution.
              </p>

              {/* Connection buttons */}
              {['CONNECT YOUTUBE', 'CONNECT SPOTIFY', 'CONNECT LINKEDIN'].map(
                (btn) => (
                  <button
                    key={btn}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '16px 20px',
                      background: 'transparent',
                      border: '1px solid rgba(255,255,255,0.15)',
                      color: 'rgba(255,255,255,0.6)',
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: '12px',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      borderRadius: '2px',
                      marginBottom: '10px',
                      transition: 'all 0.2s',
                      textAlign: 'left',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLButtonElement
                      el.style.borderColor = '#00FF80'
                      el.style.color = '#00FF80'
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLButtonElement
                      el.style.borderColor = 'rgba(255,255,255,0.15)'
                      el.style.color = 'rgba(255,255,255,0.6)'
                    }}
                  >
                    {btn}
                  </button>
                )
              )}

              {/* Launch button */}
              <button
                onClick={handleLaunch}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '18px 20px',
                  background: '#00FF80',
                  color: '#080808',
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: '18px',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: '2px',
                  marginTop: '24px',
                  letterSpacing: '0.04em',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLButtonElement
                  el.style.boxShadow = '0 0 24px rgba(0,255,128,0.25)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLButtonElement
                  el.style.boxShadow = 'none'
                }}
              >
                LAUNCH YOUR BRAIN →
              </button>
            </div>
          )}
        </div>

        {/* ── Navigation Buttons ── */}
        {currentStep < 3 && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '40px',
              paddingTop: '24px',
              borderTop: '1px solid rgba(255,255,255,0.04)',
            }}
          >
            {currentStep > 0 ? (
              <button
                onClick={handleBack}
                style={{
                  padding: '12px 28px',
                  background: 'transparent',
                  color: 'rgba(255,255,255,0.35)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer',
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '12px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  borderRadius: '2px',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLButtonElement
                  el.style.color = 'rgba(255,255,255,0.6)'
                  el.style.borderColor = 'rgba(255,255,255,0.2)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLButtonElement
                  el.style.color = 'rgba(255,255,255,0.35)'
                  el.style.borderColor = 'rgba(255,255,255,0.1)'
                }}
              >
                BACK
              </button>
            ) : (
              <div />
            )}
            <button
              onClick={handleNext}
              style={{
                padding: '12px 32px',
                background: '#00FF80',
                color: '#080808',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                borderRadius: '2px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLButtonElement
                el.style.boxShadow = '0 0 24px rgba(0,255,128,0.15)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLButtonElement
                el.style.boxShadow = 'none'
              }}
            >
              CONTINUE
            </button>
          </div>
        )}
      </div>
    </div>
  )
}