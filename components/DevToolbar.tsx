'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Login', href: '/login' },
  { label: 'Signup', href: '/signup' },
  { label: 'Setup', href: '/setup' },
  { label: 'Dashboard', href: '/dashboard' },
]

export default function DevToolbar() {
  const pathname = usePathname()

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '32px',
        background: 'var(--d-glass-bg)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid var(--d-glass-border)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <div className="status-dot" style={{ width: '5px', height: '5px' }} />
        <span style={{ fontSize: '11px', fontWeight: 600 }}><span className="gradient-text">Dev</span></span>
        <span style={{ fontSize: '10px', color: 'var(--d-text-muted)' }}>bypass active</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontSize: '11px',
                textDecoration: 'none',
                padding: '4px 10px',
                borderRadius: '6px',
                color: isActive ? 'var(--d-accent)' : 'var(--d-text-muted)',
                fontWeight: isActive ? 600 : 400,
                background: isActive ? 'var(--d-accent-light)' : 'transparent',
                transition: 'all 0.15s ease',
              }}
            >
              {link.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
