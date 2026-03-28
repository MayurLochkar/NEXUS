import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const links = [
  { label: 'Home',     href: '#hero' },
  { label: 'About',    href: '#about' },
  { label: 'Tracks',   href: '#tracks' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Prizes',   href: '#prizes' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active,   setActive]   = useState('hero')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      const ids = ['hero','about','tracks','timeline','prizes','faq','contact']
      let cur = 'hero'
      ids.forEach(id => {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.5) cur = id
      })
      setActive(cur)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = href => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0,    opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
      style={{
        position: 'fixed', top: scrolled ? 16 : 0,
        left: scrolled ? '5%' : 0, right: scrolled ? '5%' : 0,
        zIndex: 500,
        background: scrolled
          ? 'rgba(5,5,16,0.85)'
          : 'rgba(5,5,16,0.6)',
        backdropFilter: 'blur(20px)',
        border: scrolled ? '1px solid rgba(0,240,255,0.2)' : 'none',
        borderBottom: scrolled ? 'none' : '1px solid rgba(0,240,255,0.08)',
        borderRadius: scrolled ? 50 : 0,
        padding: scrolled ? '12px 32px' : '18px 60px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transition: 'all 0.4s ease',
        boxShadow: scrolled ? '0 0 30px rgba(0,240,255,0.08)' : 'none',
      }}
    >
      {/* Logo */}
      <div style={{
        fontFamily: 'Orbitron,sans-serif', fontSize: 20, fontWeight: 900,
        color: '#00F0FF', letterSpacing: 4,
        textShadow: '0 0 20px rgba(0,240,255,0.6)',
        cursor: 'pointer'
      }} onClick={() => scrollTo('#hero')}>
        NEX<span style={{ color: '#FF003C', textShadow: '0 0 20px #FF003C' }}>US</span>
      </div>

      {/* Desktop Links */}
      <ul style={{ display: 'flex', gap: 36, listStyle: 'none', margin: 0, padding: 0 }}
        className="hide-mobile">
        {links.map(l => (
          <li key={l.label}>
            <button onClick={() => scrollTo(l.href)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'Orbitron,sans-serif', fontSize: 10, fontWeight: 700,
              letterSpacing: 2, textTransform: 'uppercase',
              color: active === l.href.slice(1) ? '#00F0FF' : 'rgba(255,255,255,0.5)',
              textShadow: active === l.href.slice(1) ? '0 0 10px #00F0FF' : 'none',
              transition: 'all 0.3s', padding: '4px 0',
              borderBottom: active === l.href.slice(1) ? '1px solid #00F0FF' : '1px solid transparent'
            }}>
              {l.label}
            </button>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button onClick={() => scrollTo('#contact')} style={{
        fontFamily: 'Orbitron,sans-serif', fontSize: 10, fontWeight: 700,
        letterSpacing: 2, padding: '10px 24px',
        border: '1px solid #FF003C', color: '#FF003C',
        background: 'rgba(255,0,60,0.05)', cursor: 'pointer',
        clipPath: 'polygon(8px 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%,0 8px)',
        transition: 'all 0.3s', textTransform: 'uppercase',
        boxShadow: '0 0 15px rgba(255,0,60,0.2)'
      }}
      onMouseEnter={e => { e.currentTarget.style.background='#FF003C'; e.currentTarget.style.color='#fff' }}
      onMouseLeave={e => { e.currentTarget.style.background='rgba(255,0,60,0.05)'; e.currentTarget.style.color='#FF003C' }}>
        Register
      </button>
    </motion.nav>
  )
}