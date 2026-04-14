'use client'

interface CreatorBrainCardProps {
  completionPercent: number
}

export default function CreatorBrainCard({ completionPercent }: CreatorBrainCardProps) {
  return (
    <div
      style={{
        background: '#0f0f0f',
        border: '1px solid rgba(0,255,128,0.15)',
        padding: '24px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '32px',
        flexWrap: 'wrap',
      }}
    >
      {/* Left: Label + Status */}
      <div style={{ minWidth: '160px' }}>
        <div
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '11px',
            color: '#00FF80',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '8px',
          }}
        >
          CREATOR BRAIN
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#00FF80',
              animation: 'pulse-dot 2s infinite',
            }}
          />
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: '20px',
              color: '#ffffff',
            }}
          >
            ACTIVE
          </span>
        </div>
      </div>

      {/* Center: Progress Bar */}
      <div style={{ flex: 1, minWidth: '200px' }}>
        <div
          style={{
            width: '100%',
            height: '6px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '2px',
            overflow: 'hidden',
            marginBottom: '8px',
          }}
        >
          <div
            style={{
              width: `${completionPercent}%`,
              height: '100%',
              background: '#00FF80',
              borderRadius: '2px',
              animation: 'progress-fill 1.2s ease forwards',
              boxShadow: '0 0 10px rgba(0,255,128,0.3)',
            }}
          />
        </div>
        <p
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '11px',
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.03em',
          }}
        >
          {completionPercent}% complete — feed more content to improve output quality
        </p>
      </div>

      {/* Right: Action Button */}
      <button
        style={{
          background: 'transparent',
          border: '1px solid rgba(0,255,128,0.3)',
          color: '#00FF80',
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          padding: '10px 20px',
          cursor: 'pointer',
          borderRadius: '2px',
          transition: 'all 0.2s ease',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLButtonElement
          el.style.background = 'rgba(0,255,128,0.08)'
          el.style.boxShadow = '0 0 16px rgba(0,255,128,0.12)'
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLButtonElement
          el.style.background = 'transparent'
          el.style.boxShadow = 'none'
        }}
      >
        FEED YOUR BRAIN →
      </button>
    </div>
  )
}
