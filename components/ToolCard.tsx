'use client'

interface ToolCardProps {
  title: string
  description: string
  status: 'ready' | 'coming-soon'
  onOpen: () => void
}

export default function ToolCard({ title, description, status, onOpen }: ToolCardProps) {
  return (
    <div
      onClick={onOpen}
      className="glass-card"
      style={{ padding: '18px', cursor: 'pointer' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--d-text)', letterSpacing: '-0.01em' }}>{title}</span>
        <span style={{
          fontSize: '11px', padding: '3px 10px', borderRadius: '6px', fontWeight: 600,
          ...(status === 'ready'
            ? { color: 'var(--d-accent)', background: 'var(--d-accent-light)' }
            : { color: 'var(--d-text-muted)', background: 'var(--d-bg-tertiary)' }),
        }}>
          {status === 'ready' ? 'Ready' : 'Soon'}
        </span>
      </div>
      <p style={{ fontSize: '13px', color: 'var(--d-text-secondary)', lineHeight: 1.5 }}>{description}</p>
    </div>
  )
}
