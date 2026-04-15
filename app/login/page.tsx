'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleLogin() { setLoading(true); setTimeout(() => router.push('/dashboard'), 800) }
  function handleGoogle() { setLoading(true); setTimeout(() => router.push('/dashboard'), 800) }

  const inputStyle: React.CSSProperties = {
    display: 'block', width: '100%', padding: '12px 16px',
    background: 'var(--d-surface-solid)', border: '1px solid var(--d-border)',
    color: 'var(--d-text)', fontFamily: "'Inter', sans-serif", fontSize: '14px',
    outline: 'none', borderRadius: '10px', transition: 'border-color 0.2s ease, box-shadow 0.2s ease', marginBottom: '14px',
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', fontFamily: "'Inter', sans-serif", position: 'relative', overflow: 'hidden' }}>
      {/* Background blobs */}
      <div className="blob blob-1" style={{ top: '-10%', left: '-5%' }} />
      <div className="blob blob-2" style={{ bottom: '-10%', right: '-5%' }} />

      <div style={{ position: 'fixed', top: '16px', right: '16px', zIndex: 100 }}><ThemeToggle /></div>
      <div style={{ width: '100%', maxWidth: '380px', position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <div className="status-dot" />
            <span style={{ fontSize: '16px', fontWeight: 700 }}><span className="gradient-text">dyspersia</span></span>
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--d-text)', marginBottom: '6px', letterSpacing: '-0.03em' }}>Welcome back</h1>
          <p style={{ fontSize: '14px', color: 'var(--d-text-muted)' }}>Sign in to your account.</p>
        </div>

        <div className="glass-card" style={{ padding: '28px' }}>
          <label style={{ display: 'block', fontSize: '13px', color: 'var(--d-text-secondary)', marginBottom: '5px', fontWeight: 600 }}>Email</label>
          <input style={inputStyle} type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)}
            onFocus={e => { (e.target as HTMLInputElement).style.borderColor = 'var(--d-accent)'; (e.target as HTMLInputElement).style.boxShadow = '0 0 0 3px var(--d-accent-light)' }}
            onBlur={e => { (e.target as HTMLInputElement).style.borderColor = 'var(--d-border)'; (e.target as HTMLInputElement).style.boxShadow = 'none' }} />

          <label style={{ display: 'block', fontSize: '13px', color: 'var(--d-text-secondary)', marginBottom: '5px', fontWeight: 600 }}>Password</label>
          <input style={inputStyle} type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            onFocus={e => { (e.target as HTMLInputElement).style.borderColor = 'var(--d-accent)'; (e.target as HTMLInputElement).style.boxShadow = '0 0 0 3px var(--d-accent-light)' }}
            onBlur={e => { (e.target as HTMLInputElement).style.borderColor = 'var(--d-border)'; (e.target as HTMLInputElement).style.boxShadow = 'none' }} />

          {error && <p style={{ color: 'var(--d-status-error)', fontSize: '13px', marginBottom: '12px', padding: '10px 14px', background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: '10px' }}>{error}</p>}

          <div onClick={handleLogin} style={{
            width: '100%', padding: '12px', background: 'var(--d-accent)', color: '#fff',
            fontSize: '14px', fontWeight: 600, textAlign: 'center', cursor: 'pointer',
            borderRadius: '10px', marginBottom: '12px', opacity: loading ? 0.6 : 1,
            transition: 'all 0.2s ease', boxShadow: '0 2px 16px rgba(16,185,129,0.25)',
          }}>{loading ? 'Signing in...' : 'Sign in'}</div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '16px 0' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--d-border)' }} />
            <span style={{ fontSize: '12px', color: 'var(--d-text-muted)' }}>or</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--d-border)' }} />
          </div>

          <div onClick={handleGoogle} style={{
            width: '100%', padding: '12px', background: 'var(--d-glass-bg)', backdropFilter: 'blur(8px)',
            border: '1px solid var(--d-border)', color: 'var(--d-text-secondary)', fontSize: '14px',
            textAlign: 'center', cursor: 'pointer', borderRadius: '10px', transition: 'all 0.2s ease', fontWeight: 500,
          }}>Continue with Google</div>
        </div>

        <p style={{ textAlign: 'center', marginTop: '28px', fontSize: '13px', color: 'var(--d-text-muted)' }}>
          No account? <Link href="/signup" style={{ color: 'var(--d-accent)', textDecoration: 'none', fontWeight: 600 }}>Sign up</Link>
        </p>
      </div>
    </div>
  )
}