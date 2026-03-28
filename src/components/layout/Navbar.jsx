import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Tracks', href: '#tracks' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Prizes', href: '#prizes' },
]

const UfoIcon = ({ isActive, isHovered }) => (
  <motion.div
    animate={{ y: [0, -4, 0], filter: (isActive || isHovered) ? 'drop-shadow(0 0 8px #00F0FF)' : 'drop-shadow(0 0 2px rgba(0,240,255,0.2))' }}
    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
    style={{ marginBottom: '4px', display: 'flex', justifyContent: 'center' }}
  >
    <svg width="24" height="14" viewBox="0 0 24 14" fill="none">
      <path d="M2 8C2 8 4 4 12 4C20 4 22 8 22 8C22 8 20 12 12 12C4 12 2 8 2 8Z" stroke={isActive || isHovered ? "#00F0FF" : "rgba(0,240,255,0.4)"} strokeWidth="1.5" />
      <path d="M8 5C8 5 9 2 12 2C15 2 16 5 16 5" stroke={isActive || isHovered ? "#00F0FF" : "rgba(0,240,255,0.3)"} strokeWidth="1.2" />
      <circle cx="8" cy="8" r="0.5" fill="#00F0FF" /><circle cx="12" cy="8" r="0.5" fill="#FF003C" /><circle cx="16" cy="8" r="0.5" fill="#00F0FF" />
    </svg>
  </motion.div>
)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      const ids = ['hero', 'about', 'tracks', 'timeline', 'prizes']
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

  const scrollTo = (href) => {
    const el = document.getElementById(href.replace('#', '')) || document.getElementById('tracks-section');
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 100, behavior: 'smooth' });
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      style={{
        position: 'fixed', top: scrolled ? 15 : 0, left: scrolled ? '5%' : 0, right: scrolled ? '5%' : 0,
        zIndex: 500, background: scrolled ? 'rgba(5, 5, 16, 0.95)' : 'rgba(5, 5, 16, 0.4)',
        backdropFilter: 'blur(20px)', borderRadius: scrolled ? 100 : 0,
        padding: scrolled ? '12px 40px' : '20px 60px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        borderBottom: scrolled ? '1px solid rgba(0, 240, 255, 0.2)' : '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 20, fontWeight: 900, color: '#00F0FF', letterSpacing: 4, cursor: 'pointer' }} onClick={() => scrollTo('#hero')}>
        NEX<span style={{ color: '#FF003C' }}>US</span>
      </div>

      <ul style={{ display: 'flex', gap: 35, listStyle: 'none', margin: 0, padding: 0 }} className="hide-mobile">
        {links.map(l => (
          <li key={l.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <UfoIcon isActive={active === l.href.slice(1)} />
            <button onClick={() => scrollTo(l.href)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Orbitron, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: active === l.href.slice(1) ? '#00F0FF' : 'rgba(255,255,255,0.5)', transition: 'all 0.3s' }}>
              {l.label}
            </button>
          </li>
        ))}
      </ul>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* JUDGES ACCESSIBLE BUTTON */}
        <button
          onClick={() => {
            localStorage.setItem('adminToken', 'JUDGE_BYPASS_GRANTED'); // Security Bypass
            window.location.href = '/admin-mainframe';
          }}
          style={{
            fontFamily: 'Share Tech Mono, monospace', fontSize: '10px', padding: '10px 18px',
            background: 'rgba(0, 240, 255, 0.1)', color: '#00F0FF', border: '1px solid #00F0FF',
            cursor: 'pointer', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '1px'
          }}
          onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 15px #00F0FF'}
          onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
        >
          [ ADMIN_PANEL ]
        </button>

        <button onClick={() => scrollTo('#contact')} style={{
          fontFamily: 'Orbitron, sans-serif', fontSize: 10, fontWeight: 800, padding: '10px 22px',
          background: '#FF003C', color: '#fff', border: 'none', cursor: 'pointer',
          clipPath: 'polygon(10px 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)', textTransform: 'uppercase'
        }}>
          Register_
        </button>
      </div>
    </motion.nav>
  )
}