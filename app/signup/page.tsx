'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)

  function handleSignup() { setLoading(true); setTimeout(() => router.push('/setup'), 800) }

  const inputStyle: React.CSSProperties = {
    display: 'block', width: '100%', padding: '12px 16px',
    background: 'var(--d-surface-solid)', border: '1px solid var(--d-border)',
    color: 'var(--d-text)', fontFamily: "'Inter', sans-serif", fontSize: '14px',
    outline: 'none', borderRadius: '10px', transition: 'border-color 0.2s ease, box-shadow 0.2s ease', marginBottom: '14px',
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', fontFamily: "'Inter', sans-serif", position: 'relative', overflow: 'hidden' }}>
      <div className="blob blob-1" style={{ top: '5%', right: '-5%' }} />
      <div className="blob blob-3" style={{ bottom: '5%', left: '-5%' }} />

      <div style={{ position: 'fixed', top: '16px', right: '80px', zIndex: 100 }}><ThemeToggle /></div>
      <button className="dev-bypass-btn" onClick={() => router.push('/setup')}>Skip to setup →</button>

      <div style={{ width: '100%', maxWidth: '380px', position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <div className="status-dot" />
            <span style={{ fontSize: '16px', fontWeight: 700 }}><span className="gradient-text">dyspersia</span></span>
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--d-text)', marginBottom: '6px', letterSpacing: '-0.03em' }}>Create your account</h1>
          <p style={{ fontSize: '14px', color: 'var(--d-text-muted)' }}>Start building your Creator Brain.</p>
        </div>

        <div className="glass-card" style={{ padding: '28px' }}>
          <label style={{ display: 'block', fontSize: '13px', color: 'var(--d-text-secondary)', marginBottom: '5px', fontWeight: 600 }}>Email</label>
          <input style={inputStyle} type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)}
            onFocus={e => { (e.target as HTMLInputElement).style.borderColor = 'var(--d-accent)'; (e.target as HTMLInputElement).style.boxShadow = '0 0 0 3px var(--d-accent-light)' }}
            onBlur={e => { (e.target as HTMLInputElement).style.borderColor = 'var(--d-border)'; (e.target as HTMLInputElement).style.boxShadow = 'none' }} />

          <label style={{ display: 'block', fontSize: '13px', color: 'var(--d-text-secondary)', marginBottom: '5px', fontWeight: 600 }}>Password</label>
          <input style={inputStyle} type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)}
            onFocus={e => { (e.target as HTMLInputElement).style.borderColor = 'var(--d-accent)'; (e.target as HTMLInputElement).style.boxShadow = '0 0 0 3px var(--d-accent-light)' }}
            onBlur={e => { (e.target as HTMLInputElement).style.borderColor = 'var(--d-border)'; (e.target as HTMLInputElement).style.boxShadow = 'none' }} />

          <label style={{ display: 'block', fontSize: '13px', color: 'var(--d-text-secondary)', marginBottom: '5px', fontWeight: 600 }}>Confirm password</label>
          <input style={inputStyle} type="password" placeholder="••••••••" value={confirm} onChange={e => setConfirm(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSignup()}
            onFocus={e => { (e.target as HTMLInputElement).style.borderColor = 'var(--d-accent)'; (e.target as HTMLInputElement).style.boxShadow = '0 0 0 3px var(--d-accent-light)' }}
            onBlur={e => { (e.target as HTMLInputElement).style.borderColor = 'var(--d-border)'; (e.target as HTMLInputElement).style.boxShadow = 'none' }} />

          <div onClick={handleSignup} style={{
            width: '100%', padding: '12px', background: 'var(--d-accent)', color: '#fff',
            fontSize: '14px', fontWeight: 600, textAlign: 'center', cursor: 'pointer',
            borderRadius: '10px', marginBottom: '12px', opacity: loading ? 0.6 : 1,
            transition: 'all 0.2s ease', boxShadow: '0 2px 16px rgba(16,185,129,0.25)',
          }}>{loading ? 'Creating account...' : 'Create account'}</div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '16px 0' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--d-border)' }} />
            <span style={{ fontSize: '12px', color: 'var(--d-text-muted)' }}>or</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--d-border)' }} />
          </div>

          <div onClick={() => { setLoading(true); setTimeout(() => router.push('/setup'), 800) }} style={{
            width: '100%', padding: '12px', background: 'var(--d-glass-bg)', backdropFilter: 'blur(8px)',
            border: '1px solid var(--d-border)', color: 'var(--d-text-secondary)', fontSize: '14px',
            textAlign: 'center', cursor: 'pointer', borderRadius: '10px', transition: 'all 0.2s ease', fontWeight: 500,
          }}>Continue with Google</div>
        </div>

        <p style={{ textAlign: 'center', marginTop: '28px', fontSize: '13px', color: 'var(--d-text-muted)' }}>
          Already have an account? <Link href="/login" style={{ color: 'var(--d-accent)', textDecoration: 'none', fontWeight: 600 }}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}