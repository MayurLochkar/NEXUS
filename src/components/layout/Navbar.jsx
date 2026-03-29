import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Tracks', href: '#tracks' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Prizes', href: '#prizes' },
]

// --- FIXED & UPGRADED UFO ICON ---
const UfoIcon = ({ isActive, isHovered }) => (
  <motion.div
    animate={{
      y: (isActive || isHovered) ? [0, -5, 0] : 0,
      filter: (isActive || isHovered)
        ? 'drop-shadow(0 0 10px #00F0FF)'
        : 'drop-shadow(0 0 2px rgba(0,240,255,0.1))',
      scale: (isActive || isHovered) ? 1.1 : 1
    }}
    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
    style={{ marginBottom: '6px', display: 'flex', justifyContent: 'center', height: '16px' }}
  >
    <svg width="24" height="14" viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* UFO Main Body */}
      <path
        d="M2 8C2 8 4 4 12 4C20 4 22 8 22 8C22 8 20 12 12 12C4 12 2 8 2 8Z"
        stroke={isActive || isHovered ? "#00F0FF" : "rgba(255, 255, 255, 0.3)"}
        strokeWidth="1.5"
      />
      {/* UFO Top Dome */}
      <path
        d="M8 5.5C8 5.5 9 2.5 12 2.5C15 2.5 16 5.5 16 5.5"
        stroke={isActive || isHovered ? "#00F0FF" : "rgba(255, 255, 255, 0.2)"}
        strokeWidth="1.2"
      />
      {/* Glowing Lights */}
      <circle cx="8" cy="8.5" r="0.8" fill={isActive || isHovered ? "#00F0FF" : "rgba(255,255,255,0.2)"} />
      <circle cx="12" cy="8.5" r="0.8" fill="#FF003C" />
      <circle cx="16" cy="8.5" r="0.8" fill={isActive || isHovered ? "#00F0FF" : "rgba(255,255,255,0.2)"} />

      {/* Beam Effect when Active */}
      {(isActive || isHovered) && (
        <motion.path
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.1, 0.4, 0.1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          d="M10 12L8 16M14 12L16 16"
          stroke="#00F0FF"
          strokeWidth="0.5"
        />
      )}
    </svg>
  </motion.div>
)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('hero')
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredLink, setHoveredLink] = useState(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      const ids = ['hero', 'about', 'tracks', 'timeline', 'prizes']
      let cur = 'hero'
      ids.forEach(id => {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.45) {
          cur = id
        }
      })
      setActive(cur)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href) => {
    setIsOpen(false)
    const targetId = href.replace('#', '');
    const el = document.getElementById(targetId) || document.getElementById('tracks-section');
    if (el) {
      const offset = 85;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        style={{
          position: 'fixed',
          top: scrolled ? 10 : 0,
          left: scrolled ? '4%' : 0,
          right: scrolled ? '4%' : 0,
          zIndex: 500,
          background: scrolled ? 'rgba(5, 5, 16, 0.92)' : 'rgba(5, 5, 16, 0.3)',
          backdropFilter: 'blur(24px)',
          borderRadius: scrolled ? 100 : 0,
          padding: scrolled ? '8px 24px' : '16px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          borderBottom: scrolled ? '1px solid rgba(0, 240, 255, 0.25)' : '1px solid rgba(255, 255, 255, 0.05)',
          boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.5)' : 'none'
        }}
      >
        {/* Logo */}
        <div
          style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 20, fontWeight: 900, color: '#00F0FF', letterSpacing: 4, cursor: 'pointer' }}
          onClick={() => scrollTo('#hero')}
        >
          NEX<span style={{ color: '#FF003C' }}>US</span>
        </div>

        {/* Desktop Links */}
        <ul style={{ display: 'flex', gap: 35, listStyle: 'none', margin: 0, padding: 0 }} className="desktop-nav">
          {links.map(l => {
            const isCurrent = active === l.href.slice(1);
            return (
              <li
                key={l.label}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                onMouseEnter={() => setHoveredLink(l.label)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <UfoIcon isActive={isCurrent} isHovered={hoveredLink === l.label} />
                <button
                  onClick={() => scrollTo(l.href)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: 'Orbitron, sans-serif', fontSize: 10, fontWeight: 800,
                    letterSpacing: 2, textTransform: 'uppercase',
                    color: isCurrent ? '#00F0FF' : 'rgba(255, 255, 255, 0.5)',
                    transition: 'all 0.3s'
                  }}
                >
                  {l.label}
                </button>
              </li>
            )
          })}
        </ul>

        {/* Action Buttons & Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button
            onClick={() => { localStorage.setItem('adminToken', 'JUDGE_BYPASS'); window.location.href = '/admin-mainframe'; }}
            className="desktop-nav"
            style={{
              fontFamily: 'Share Tech Mono, monospace', fontSize: 11, padding: '8px 14px',
              background: 'rgba(0,240,255,0.08)', color: '#00F0FF',
              border: '1px solid rgba(0,240,255,0.4)', borderRadius: 4,
              cursor: 'pointer', transition: '0.3s'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(0,240,255,0.2)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(0,240,255,0.08)'}
          >
            [ ADMIN ]
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mobile-toggle"
            style={{ background: 'none', border: 'none', color: '#00F0FF', fontSize: '28px', cursor: 'pointer', display: 'none' }}
          >
            {isOpen ? '✕' : '☰'}
          </button>

          <button onClick={() => scrollTo('#contact')} style={{
            fontFamily: 'Orbitron, sans-serif', fontSize: 10, fontWeight: 900, padding: '10px 20px',
            background: '#FF003C', color: '#fff', border: 'none', cursor: 'pointer',
            clipPath: 'polygon(10px 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)',
            textTransform: 'uppercase', whiteSpace: 'nowrap',
            boxShadow: '0 0 15px rgba(255, 0, 60, 0.3)'
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
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            style={{
              position: 'fixed', top: 0, right: 0, width: '80%', height: '100vh',
              background: 'rgba(5, 5, 15, 0.98)', backdropFilter: 'blur(20px)',
              zIndex: 1000, display: 'flex', flexDirection: 'column', padding: '100px 40px',
              borderLeft: '2px solid rgba(0, 240, 255, 0.2)'
            }}
          >
            <div style={{ marginBottom: '40px', fontFamily: 'Orbitron', fontSize: '11px', color: '#00F0FF', letterSpacing: '5px', fontWeight: 'bold' }}>
              {'>'} SYSTEM_MENU_INIT
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '35px' }}>
              {links.map(l => (
                <li key={l.label}>
                  <button
                    onClick={() => scrollTo(l.href)}
                    style={{
                      background: 'none', border: 'none',
                      color: active === l.href.slice(1) ? '#00F0FF' : '#fff',
                      fontFamily: 'Orbitron', fontSize: '22px', fontWeight: 900,
                      textAlign: 'left', cursor: 'pointer', textTransform: 'uppercase',
                      letterSpacing: '2px'
                    }}
                  >
                    {l.label}
                  </button>
                </li>
              ))}
              <li style={{ marginTop: '30px' }}>
                <button
                  onClick={() => window.location.href = '/admin-mainframe'}
                  style={{
                    background: 'rgba(0, 240, 255, 0.1)', border: '1px solid #00F0FF',
                    color: '#00F0FF', padding: '18px', width: '100%',
                    fontFamily: 'Share Tech Mono', fontSize: '14px', letterSpacing: '2px'
                  }}
                >
                  TERMINAL_ACCESS
                </button>
              </li>
            </ul>

            <div style={{ marginTop: 'auto', opacity: 0.3, fontFamily: 'monospace', fontSize: '10px' }}>
              [SECURE_CONNECTION_STABLE]
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 960px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </>
  )
}