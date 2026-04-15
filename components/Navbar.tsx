'use client'

import { useState } from 'react'
import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'

const NAV_LINKS = [
  { label: 'Tools',        href: '#tools' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Pricing',      href: '#pricing' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      {/* ═══ SINGLE FLOATING PILL NAV ═══ */}
      <header className="dys-header">
        <nav className="dys-nav" aria-label="Main navigation">

          {/* ── Left: Logo ── */}
          <Link href="/" className="dys-nav__logo" aria-label="Home">
            dyspersia
          </Link>

          {/* ── Centre: Nav links (desktop only) ── */}
          <div className="dys-nav__menu" aria-hidden={menuOpen ? undefined : undefined}>
            <ul className="dys-nav__list">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="dys-nav__link" onClick={() => setMenuOpen(false)}>
                    <span>{link.label}</span>
                    <span aria-hidden="true">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Divider (desktop only) ── */}
          <div className="dys-nav__divider" aria-hidden="true" />

          {/* ── Right: Theme + Log in + Get Started (desktop) / Get Started only (mobile) ── */}
          <div className="dys-nav__actions">
            <ThemeToggle />
            <Link href="/login" className="dys-action-btn dys-action-btn--ghost">
              <span>Log in</span>
              <span aria-hidden="true">Log in</span>
            </Link>
            <Link href="/signup" className="dys-action-btn dys-action-btn--primary">
              <span>Get Started</span>
              <span aria-hidden="true">Get Started ✦</span>
            </Link>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            className={`dys-nav__toggle${menuOpen ? ' dys-nav__toggle--active' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </nav>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="dys-nav__dropdown" role="menu">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="dys-nav__dropdown-link"
                role="menuitem"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Backdrop to close on mobile */}
      {menuOpen && (
        <div
          className="dys-nav__backdrop"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}
