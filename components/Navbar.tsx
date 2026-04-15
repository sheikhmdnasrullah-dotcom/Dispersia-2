'use client'

import { useState } from 'react'
import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'

const NAV_LINKS = [
  { label: 'Tools', href: '#tools' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      {/* ═══ TOP-RIGHT ACTIONS (separate from nav) ═══ */}
      <div className="dys-actions">
        <ThemeToggle />
        <Link href="/login" className="dys-action-btn">
          <span>Log in</span>
          <span>Log in →</span>
        </Link>
        <Link href="/signup" className="dys-action-btn dys-action-btn--primary">
          <span>Get started</span>
          <span>Let's go ✦</span>
        </Link>
      </div>

      {/* ═══ CENTERED FLOATING NAV ═══ */}
      <header className="dys-header">
        <nav className="dys-nav">
          {/* Logo icon */}
          <Link href="/" className="dys-nav__logo" aria-label="Home">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </Link>

          {/* Links */}
          <div className={`dys-nav__menu ${menuOpen ? 'dys-nav__menu--open' : ''}`}>
            <ul className="dys-nav__list">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="dys-nav__link"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span>{link.label}</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`dys-nav__toggle ${menuOpen ? 'dys-nav__toggle--active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
      </header>
    </>
  )
}
