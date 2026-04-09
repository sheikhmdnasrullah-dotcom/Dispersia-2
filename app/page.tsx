'use client'

const TOOLS = [
  { id: 1, name: 'Reel Finder', desc: 'AI finds your best clips automatically', icon: '◈' },
  { id: 2, name: 'Auto Captions', desc: 'Burned-in captions in 3 style presets', icon: '◉' },
  { id: 3, name: 'Multi-Platform Resizer', desc: '9:16, 1:1, 16:9 in one click', icon: '⊞' },
  { id: 4, name: 'Show Notes Generator', desc: 'Formatted notes with timestamps', icon: '◎' },
  { id: 5, name: 'Chapter Markers', desc: 'YouTube chapters from your transcript', icon: '▤' },
  { id: 6, name: 'Blog Post Writer', desc: 'Long-form SEO post from any episode', icon: '◍' },
  { id: 7, name: 'YouTube Description', desc: 'Optimized descriptions that rank', icon: '▣' },
  { id: 8, name: 'Title Generator', desc: '10 title variants ranked by click potential', icon: '◆' },
  { id: 9, name: 'Newsletter Writer', desc: 'Ready-to-send newsletter from episode', icon: '◇' },
  { id: 10, name: 'Transcript Editor', desc: 'Click any word to jump to timestamp', icon: '▦' },
  { id: 11, name: 'Silence Remover', desc: 'Remove dead air from your audio', icon: '◑' },
  { id: 12, name: 'Filler Word Detector', desc: 'Find every um, uh, like in your episode', icon: '◐' },
  { id: 13, name: 'Audio Cleanup', desc: 'Noise removal, -14 LUFS normalization', icon: '◒' },
  { id: 14, name: 'Thumbnail Generator', desc: 'Branded thumbnails in seconds', icon: '▨' },
  { id: 15, name: 'Quote Card Generator', desc: '10 shareable cards per episode', icon: '◈' },
  { id: 16, name: 'Audiogram Generator', desc: 'Waveform video for LinkedIn and Twitter', icon: '◉' },
  { id: 17, name: 'Guest Research Brief', desc: '10 interview questions, auto-generated', icon: '◎' },
  { id: 18, name: 'Sponsor Pitch Generator', desc: 'Full pitch deck from your stats', icon: '◆' },
  { id: 19, name: 'Publishing Checklist', desc: 'AI checks off tasks it already completed', icon: '▤' },
  { id: 20, name: 'Show Manager Agent', desc: 'Weekly briefing while you sleep', icon: '◍' },
]

export default function HomePage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#080808',
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
        .tool-card {
          padding: 24px;
          border: 1px solid #111;
          background: #090909;
          transition: border-color 0.2s, background 0.2s;
          position: relative;
          overflow: hidden;
        }
        .tool-card:hover {
          border-color: #1e1e1e;
          background: #0d0d0d;
        }
        .tool-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,255,128,0.1), transparent);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .tool-card:hover::before { opacity: 1; }
        .nav-btn {
          padding: '10px 24px';
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s;
        }
      `}</style>

      {/* Navbar */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 40px', borderBottom: '1px solid #111',
        position: 'sticky', top: 0, background: 'rgba(8,8,8,0.95)',
        backdropFilter: 'blur(10px)', zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 7, height: 7, background: '#00ff80', borderRadius: '50%' }} />
          <span style={{ color: '#00ff80', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Dispersia
          </span>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <a href="/login" style={{
            padding: '10px 20px', background: 'transparent', color: '#444',
            border: '1px solid #1e1e1e', textDecoration: 'none',
            fontSize: 11, fontFamily: "'IBM Plex Mono', monospace",
            letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>
            Log in
          </a>
          <a href="/signup" style={{
            padding: '10px 20px', background: '#00ff80', color: '#080808',
            textDecoration: 'none', fontSize: 11,
            fontFamily: "'IBM Plex Mono', monospace",
            fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>
            Get started
          </a>
        </div>
      </nav>

      {/* Hero */}
      <div style={{
        maxWidth: 800, margin: '0 auto',
        padding: '100px 40px 80px', textAlign: 'center',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '6px 14px', border: '1px solid rgba(0,255,128,0.15)',
          background: 'rgba(0,255,128,0.04)', marginBottom: 32,
        }}>
          <div style={{ width: 5, height: 5, background: '#00ff80', borderRadius: '50%' }} />
          <span style={{ color: '#00ff80', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            20 tools. One upload. Your voice.
          </span>
        </div>

        <h1 style={{
          fontFamily: "'Syne', sans-serif", fontSize: 58, fontWeight: 800,
          color: '#f0f0f0', lineHeight: 1.05, marginBottom: 24,
        }}>
          The AI brain for<br />
          <span style={{ color: '#00ff80' }}>podcast creators.</span>
        </h1>

        <p style={{
          color: '#333', fontSize: 13, lineHeight: 1.9,
          marginBottom: 48, maxWidth: 480, margin: '0 auto 48px',
          letterSpacing: '0.03em',
        }}>
          Upload one episode. Get clips, captions, show notes, titles, newsletters,
          thumbnails and more. All written in your exact voice.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <a href="/signup" style={{
            padding: '16px 40px', background: '#00ff80', color: '#080808',
            textDecoration: 'none', fontSize: 12,
            fontFamily: "'IBM Plex Mono', monospace",
            fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>
            Start for free
          </a>
          <a href="/login" style={{
            padding: '16px 40px', background: 'transparent', color: '#444',
            textDecoration: 'none', fontSize: 12,
            fontFamily: "'IBM Plex Mono', monospace",
            letterSpacing: '0.08em', border: '1px solid #1e1e1e',
          }}>
            Log in
          </a>
        </div>
      </div>

      {/* Tools Grid */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px 100px' }}>
        <div style={{ marginBottom: 40, display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ color: '#222', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            20 tools included
          </span>
          <div style={{ flex: 1, height: 1, background: '#111' }} />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 1, background: '#111',
        }}>
          {TOOLS.map(tool => (
            <div key={tool.id} className="tool-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <span style={{ color: '#1a1a1a', fontSize: 20 }}>{tool.icon}</span>
                <span style={{
                  fontSize: 9, color: '#1e1e1e', letterSpacing: '0.1em',
                  textTransform: 'uppercase', border: '1px solid #161616',
                  padding: '3px 8px',
                }}>
                  {String(tool.id).padStart(2, '0')}
                </span>
              </div>
              <div style={{ color: '#555', fontSize: 12, fontWeight: 500, marginBottom: 6, letterSpacing: '0.03em' }}>
                {tool.name}
              </div>
              <div style={{ color: '#222', fontSize: 11, lineHeight: 1.6 }}>
                {tool.desc}
              </div>
              <div style={{ marginTop: 16 }}>
                <a href="/signup" style={{
                  fontSize: 10, color: '#2a2a2a', textDecoration: 'none',
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  borderBottom: '1px solid #1a1a1a', paddingBottom: 2,
                }}>
                  Unlock
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{
        borderTop: '1px solid #111', padding: '80px 40px',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontFamily: "'Syne', sans-serif", fontSize: 36, fontWeight: 800,
          color: '#f0f0f0', marginBottom: 16,
        }}>
          Ready to build your brain?
        </h2>
        <p style={{ color: '#333', fontSize: 12, marginBottom: 32, letterSpacing: '0.05em' }}>
          First episode is free. No credit card required.
        </p>
        <a href="/signup" style={{
          padding: '16px 48px', background: '#00ff80', color: '#080808',
          textDecoration: 'none', fontSize: 12,
          fontFamily: "'IBM Plex Mono', monospace",
          fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase',
        }}>
          Get started free
        </a>
      </div>

    </div>
  )
}