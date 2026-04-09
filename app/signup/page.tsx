'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSignup() {
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) { setError(error.message); setLoading(false) }
    else router.push('/setup')
  }

  async function handleGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: 'https://dyspersia.tanim.tech/setup' }
    })
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#080808',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'IBM Plex Mono', monospace",
      backgroundImage: `
        linear-gradient(rgba(0,255,128,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,255,128,0.03) 1px, transparent 1px)
      `,
      backgroundSize: '40px 40px',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .input-field {
          display: block; width: 100%; padding: 14px 16px;
          background: #0f0f0f; border: 1px solid #1e1e1e;
          color: #e8e8e8; font-family: 'IBM Plex Mono', monospace;
          font-size: 13px; outline: none; transition: border-color 0.2s;
          margin-bottom: 12px;
        }
        .input-field:focus { border-color: #00ff80; }
        .input-field::placeholder { color: #333; }
        .btn-primary {
          width: 100%; padding: 14px; background: #00ff80;
          color: #080808; border: none; cursor: pointer;
          font-family: 'IBM Plex Mono', monospace; font-size: 13px;
          font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase;
          transition: opacity 0.2s; margin-bottom: 10px;
        }
        .btn-primary:hover { opacity: 0.85; }
        .btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }
        .btn-ghost {
          width: 100%; padding: 14px; background: transparent;
          color: #555; border: 1px solid #1e1e1e; cursor: pointer;
          font-family: 'IBM Plex Mono', monospace; font-size: 12px;
          letter-spacing: 0.05em; transition: border-color 0.2s, color 0.2s;
        }
        .btn-ghost:hover { border-color: #333; color: #888; }
      `}</style>

      <div style={{ width: '100%', maxWidth: 420, padding: '0 24px' }}>

        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{ width: 8, height: 8, background: '#00ff80', borderRadius: '50%' }} />
            <span style={{ color: '#00ff80', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Dispersia
            </span>
          </div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 36, fontWeight: 800, color: '#f0f0f0', lineHeight: 1.1 }}>
            Start building<br />your brain.
          </h1>
          <p style={{ color: '#333', fontSize: 12, marginTop: 10, letterSpacing: '0.05em' }}>
            30 days to a live, paying product.
          </p>
        </div>

        <input className="input-field" type="email" placeholder="email@domain.com"
          value={email} onChange={e => setEmail(e.target.value)} />
        <input className="input-field" type="password" placeholder="choose a password"
          value={password} onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSignup()} />

        {error && (
          <p style={{ color: '#ff4444', fontSize: 12, marginBottom: 12, padding: '10px 12px', background: 'rgba(255,68,68,0.05)', border: '1px solid rgba(255,68,68,0.1)' }}>
            {error}
          </p>
        )}

        <button className="btn-primary" onClick={handleSignup} disabled={loading}>
          {loading ? 'Creating account...' : 'Create account'}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '16px 0' }}>
          <div style={{ flex: 1, height: 1, background: '#1a1a1a' }} />
          <span style={{ color: '#2a2a2a', fontSize: 11 }}>or</span>
          <div style={{ flex: 1, height: 1, background: '#1a1a1a' }} />
        </div>

        <button className="btn-ghost" onClick={handleGoogle}>
          Continue with Google
        </button>

        <p style={{ textAlign: 'center', marginTop: 28, color: '#2a2a2a', fontSize: 12 }}>
          Already have an account?{' '}
          <a href="/login" style={{ color: '#00ff80', textDecoration: 'none' }}>Log in</a>
        </p>

      </div>
    </div>
  )
}