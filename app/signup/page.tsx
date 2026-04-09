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
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/setup')
    }
  }

  async function handleGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: 'https://dispersia.tanim.tech/setup' }
    })
  }

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', padding: 24 }}>
      <h1 style={{ marginBottom: 24 }}>Create your Dispersia account</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ display: 'block', width: '100%', marginBottom: 12, padding: 10 }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ display: 'block', width: '100%', marginBottom: 12, padding: 10 }}
      />

      {error && <p style={{ color: 'red', marginBottom: 12 }}>{error}</p>}

      <button
        onClick={handleSignup}
        disabled={loading}
        style={{ display: 'block', width: '100%', padding: 12, marginBottom: 12, background: '#6366f1', color: 'white', border: 'none', cursor: 'pointer' }}
      >
        {loading ? 'Creating account...' : 'Sign up'}
      </button>

      <button
        onClick={handleGoogle}
        style={{ display: 'block', width: '100%', padding: 12, background: 'white', color: 'black', border: '1px solid #ccc', cursor: 'pointer' }}
      >
        Continue with Google
      </button>

      <p style={{ marginTop: 16 }}>
        Already have an account? <a href="/login">Log in</a>
      </p>
    </div>
  )
}