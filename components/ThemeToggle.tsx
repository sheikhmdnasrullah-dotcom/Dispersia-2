'use client'

import { useState, useEffect } from 'react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('dyspersia-theme') as 'light' | 'dark' | null
    const current = document.documentElement.getAttribute('data-theme') as 'light' | 'dark' || 'dark'
    const initial = saved || current
    setTheme(initial)
    document.documentElement.setAttribute('data-theme', initial)
    setMounted(true)
  }, [])

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('dyspersia-theme', next)
  }

  if (!mounted) return null

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      style={{
        position: 'relative',
        background: 'var(--d-glass-bg)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid var(--d-border)',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'grid',
        placeItems: 'center',
        cursor: 'pointer',
        color: 'var(--d-text-secondary)',
        transition: 'all 0.3s ease',
        overflow: 'hidden',
        flexShrink: 0,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--d-accent-border)'
        e.currentTarget.style.boxShadow = '0 0 16px var(--d-blob-1)'
        e.currentTarget.style.color = 'var(--d-accent)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--d-border)'
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.color = 'var(--d-text-secondary)'
      }}
    >
      <span style={{
        display: 'block',
        transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: theme === 'dark' ? 'rotate(0deg)' : 'rotate(180deg)',
        fontSize: '15px',
      }}>
        {theme === 'dark' ? '☀️' : '🌙'}
      </span>
    </button>
  )
}
