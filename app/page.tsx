'use client'

export default function HomePage() {
  return (
    <div style={{
      minHeight: '100vh', background: '#080808',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: "'IBM Plex Mono', monospace",
      backgroundImage: `
        linear-gradient(rgba(0,255,128,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,255,128,0.03) 1px, transparent 1px)
      `,
      backgroundSize: '40px 40px',
      padding: '40px 24px', textAlign: 'center',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 40 }}>
        <div style={{ width: 8, height: 8, background: '#00ff80', borderRadius: '50%' }} />
        <span style={{ color: '#00ff80', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          Dispersia
        </span>
      </div>

      <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 52, fontWeight: 800, color: '#f0f0f0', lineHeight: 1.1, marginBottom: 20, maxWidth: 600 }}>
        The AI brain for podcast creators.
      </h1>

      <p style={{ color: '#333', fontSize: 13, marginBottom: 48, maxWidth: 400, lineHeight: 1.8, letterSpacing: '0.03em' }}>
        One upload. Clips, captions, show notes, titles, newsletters, thumbnails. All in your voice.
      </p>

      <div style={{ display: 'flex', gap: 12 }}>
        <a href="/signup" style={{
          padding: '14px 32px', background: '#00ff80', color: '#080808',
          textDecoration: 'none', fontSize: 12, fontFamily: "'IBM Plex Mono', monospace",
          fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase',
        }}>
          Get started
        </a>
        <a href="/login" style={{
          padding: '14px 32px', background: 'transparent', color: '#444',
          textDecoration: 'none', fontSize: 12, fontFamily: "'IBM Plex Mono', monospace",
          letterSpacing: '0.08em', border: '1px solid #1e1e1e',
        }}>
          Log in
        </a>
      </div>
    </div>
  )
}