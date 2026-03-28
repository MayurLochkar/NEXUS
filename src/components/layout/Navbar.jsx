import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Tracks', href: '#tracks' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Prizes', href: '#prizes' },
]

// --- UFO Icon (Keep same as before) ---
const UfoIcon = ({ isActive, isHovered }) => (
  <motion.div
    animate={{ y: [0, -4, 0], filter: (isActive || isHovered) ? 'drop-shadow(0 0 8px #00F0FF)' : 'drop-shadow(0 0 2px rgba(0,240,255,0.2))' }}
    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
    style={{ marginBottom: '4px', display: 'flex', justifyContent: 'center' }}
  >
    <svg width="20" height="12" viewBox="0 0 24 14" fill="none">
      <path d="M2 8C2 8 4 4 12 4C20 4 22 8 22 8C22 8 20 12 12 12C4 12 2 8 2 8Z" stroke={isActive || isHovered ? "#00F0FF" : "rgba(0,240,255,0.4)"} strokeWidth="1.5" />
      <circle cx="12" cy="8" r="0.5" fill="#FF003C" />
    </svg>
  </motion.div>
)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('hero')
  const [isOpen, setIsOpen] = useState(false) // State for Mobile Menu

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      const ids = ['hero', 'about', 'tracks', 'timeline', 'prizes']
      let cur = 'hero'
      ids.forEach(id => {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) cur = id
      })
      setActive(cur)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href) => {
    setIsOpen(false) // Close mobile menu on click
    const targetId = href.replace('#', '');
    const el = document.getElementById(targetId) || document.getElementById('tracks-section');
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        style={{
          position: 'fixed', top: scrolled ? 10 : 0, left: scrolled ? '5%' : 0, right: scrolled ? '5%' : 0,
          zIndex: 500, background: scrolled ? 'rgba(5, 5, 16, 0.95)' : 'rgba(5, 5, 16, 0.4)',
          backdropFilter: 'blur(20px)', borderRadius: scrolled ? 50 : 0,
          padding: scrolled ? '10px 25px' : '20px 40px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          borderBottom: scrolled ? '1px solid rgba(0, 240, 255, 0.2)' : '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        {/* Logo */}
        <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 18, fontWeight: 900, color: '#00F0FF', letterSpacing: 3, cursor: 'pointer' }} onClick={() => scrollTo('#hero')}>
          NEX<span style={{ color: '#FF003C' }}>US</span>
        </div>

        {/* Desktop Links (Hidden on Mobile) */}
        <ul style={{ display: 'flex', gap: 30, listStyle: 'none', margin: 0, padding: 0 }} className="desktop-nav">
          {links.map(l => (
            <li key={l.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <UfoIcon isActive={active === l.href.slice(1)} />
              <button onClick={() => scrollTo(l.href)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Orbitron, sans-serif', fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: active === l.href.slice(1) ? '#00F0FF' : 'rgba(255, 255, 255, 0.5)', transition: 'all 0.3s' }}>
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Action Buttons & Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Admin Button (Hidden on very small screens to save space) */}
          <button
            onClick={() => { localStorage.setItem('adminToken', 'JUDGE_BYPASS'); window.location.href = '/admin-mainframe'; }}
            className="desktop-nav"
            style={{ fontFamily: 'monospace', fontSize: 10, padding: '8px 12px', background: 'rgba(0,240,255,0.1)', color: '#00F0FF', border: '1px solid #00F0FF', borderRadius: 4, cursor: 'pointer' }}
          >
            [ ADMIN ]
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mobile-toggle"
            style={{ background: 'none', border: 'none', color: '#00F0FF', fontSize: '24px', cursor: 'pointer', display: 'none' }}
          >
            {isOpen ? '✕' : '☰'}
          </button>

          <button onClick={() => scrollTo('#contact')} style={{
            fontFamily: 'Orbitron, sans-serif', fontSize: 9, fontWeight: 800, padding: '10px 18px',
            background: '#FF003C', color: '#fff', border: 'none', cursor: 'pointer',
            clipPath: 'polygon(8px 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)', textTransform: 'uppercase'
          }}>
            Register_
          </button>
        </div>
      </motion.nav>

      {/* --- Mobile Sidebar Menu --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed', top: 0, right: 0, width: '75%', height: '100vh',
              background: 'rgba(2, 2, 5, 0.98)', backdropFilter: 'blur(15px)',
              zIndex: 1000, display: 'flex', flexDirection: 'column', padding: '100px 40px',
              borderLeft: '1px solid rgba(0, 240, 255, 0.2)'
            }}
          >
            <div style={{ marginBottom: '40px', fontFamily: 'Orbitron', fontSize: '10px', color: '#00F0FF', letterSpacing: '4px' }}>// SYSTEM_MENU</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '30px' }}>
              {links.map(l => (
                <li key={l.label}>
                  <button
                    onClick={() => scrollTo(l.href)}
                    style={{ background: 'none', border: 'none', color: active === l.href.slice(1) ? '#00F0FF' : '#fff', fontFamily: 'Orbitron', fontSize: '18px', fontWeight: 900, textAlign: 'left', cursor: 'pointer', textTransform: 'uppercase' }}
                  >
                    {l.label}
                  </button>
                </li>
              ))}
              <li style={{ marginTop: '20px' }}>
                <button
                  onClick={() => window.location.href = '/admin-mainframe'}
                  style={{ background: 'none', border: '1px solid #00F0FF', color: '#00F0FF', padding: '15px', width: '100%', fontFamily: 'monospace', fontSize: '14px' }}
                >
                  {'>'} ACCESS_ADMIN_PANEL
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </>
  )
}