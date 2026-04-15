'use client'

interface CreatorBrainCardProps {
  completionPercent: number
}

export default function CreatorBrainCard({ completionPercent }: CreatorBrainCardProps) {
  return (
    <div className="glass-card" style={{
      padding: '22px 24px', marginBottom: '20px',
      display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap',
    }}>
      <div style={{ minWidth: '120px' }}>
        <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '4px', letterSpacing: '0.03em' }}>
          <span className="gradient-text">CREATOR BRAIN</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div className="status-dot" />
          <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--d-text)' }}>Active</span>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: '180px' }}>
        <div style={{ width: '100%', height: '6px', background: 'var(--d-bg-tertiary)', borderRadius: '3px', overflow: 'hidden', marginBottom: '6px' }}>
          <div style={{ width: `${completionPercent}%`, height: '100%', borderRadius: '3px', background: 'var(--d-gradient)', animation: 'progress-fill 1s ease forwards' }} />
        </div>
        <p style={{ fontSize: '12px', color: 'var(--d-text-muted)' }}>
          <span className="gradient-text" style={{ fontWeight: 600 }}>{completionPercent}%</span>
          {' '}trained — feed more content to improve quality
        </p>
      </div>
      <button style={{
        background: 'var(--d-glass-bg)', backdropFilter: 'blur(8px)',
        border: '1px solid var(--d-border)', color: 'var(--d-text-secondary)',
        fontSize: '13px', fontWeight: 600, padding: '9px 18px', cursor: 'pointer', borderRadius: '10px',
        transition: 'all 0.2s ease', whiteSpace: 'nowrap', fontFamily: "'Inter', sans-serif",
      }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--d-accent-border)'; e.currentTarget.style.boxShadow = 'var(--d-shadow-sm)' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--d-border)'; e.currentTarget.style.boxShadow = 'none' }}>
        Feed your brain →
      </button>
    </div>
  )
}
