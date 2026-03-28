import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Tracks', href: '#tracks' }, // Isko check karenge
  { label: 'Timeline', href: '#timeline' },
  { label: 'Prizes', href: '#prizes' },
]

// --- Animated UFO Icon Component ---
const UfoIcon = ({ isActive, isHovered }) => (
  <motion.div
    animate={{
      y: [0, -4, 0],
      filter: (isActive || isHovered)
        ? 'drop-shadow(0 0 8px #00F0FF)'
        : 'drop-shadow(0 0 2px rgba(0,240,255,0.2))'
    }}
    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
    style={{ marginBottom: '4px', display: 'flex', justifyContent: 'center' }}
  >
    <svg width="24" height="14" viewBox="0 0 24 14" fill="none">
      <path d="M2 8C2 8 4 4 12 4C20 4 22 8 22 8C22 8 20 12 12 12C4 12 2 8 2 8Z" stroke={isActive || isHovered ? "#00F0FF" : "rgba(0,240,255,0.4)"} strokeWidth="1.5" />
      <path d="M8 5C8 5 9 2 12 2C15 2 16 5 16 5" stroke={isActive || isHovered ? "#00F0FF" : "rgba(0,240,255,0.3)"} strokeWidth="1.2" />
      <circle cx="8" cy="8" r="0.5" fill="#00F0FF" />
      <circle cx="12" cy="8" r="0.5" fill="#FF003C" />
      <circle cx="16" cy="8" r="0.5" fill="#00F0FF" />
      {(isActive || isHovered) && (
        <motion.path initial={{ opacity: 0 }} animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ repeat: Infinity, duration: 1.5 }} d="M10 12L8 16M14 12L16 16" stroke="#00F0FF" strokeWidth="0.5" />
      )}
    </svg>
  </motion.div>
)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('hero')
  const [hoveredLink, setHoveredLink] = useState(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      const ids = ['hero', 'about', 'tracks', 'tracks-section', 'timeline', 'prizes', 'faq', 'contact']
      let cur = 'hero'
      ids.forEach(id => {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.5) {
          // Mapping tracks-section back to tracks for active state
          cur = id.includes('tracks') ? 'tracks' : id
        }
      })
      setActive(cur)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // --- THE FIX: SMART SCROLL FUNCTION ---
  const scrollTo = (href) => {
    const targetId = href.replace('#', '');

    // 1. Try exact ID (tracks)
    // 2. Try your specific ID from 800+ line code (tracks-section)
    let el = document.getElementById(targetId) || document.getElementById('tracks-section');

    if (el) {
      const offset = 100; // Space for Navbar
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      console.error("Target section not found! ID check: ", targetId);
    }
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      style={{
        position: 'fixed', top: scrolled ? 15 : 0, left: scrolled ? '10%' : 0, right: scrolled ? '10%' : 0,
        zIndex: 500, background: scrolled ? 'rgba(5, 5, 16, 0.9)' : 'rgba(5, 5, 16, 0.4)',
        backdropFilter: 'blur(20px)', borderRadius: scrolled ? 100 : 0,
        padding: scrolled ? '10px 40px' : '20px 60px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        borderBottom: scrolled ? '1px solid rgba(0, 240, 255, 0.2)' : '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 22, fontWeight: 900, color: '#00F0FF', letterSpacing: 4, cursor: 'pointer' }} onClick={() => scrollTo('#hero')}>
        NEX<span style={{ color: '#FF003C' }}>US</span>
      </div>

      <ul style={{ display: 'flex', gap: 40, listStyle: 'none', margin: 0, padding: 0 }}>
        {links.map(l => {
          const isCurrent = active === l.href.slice(1);
          return (
            <li key={l.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} onMouseEnter={() => setHoveredLink(l.label)} onMouseLeave={() => setHoveredLink(null)}>
              <UfoIcon isActive={isCurrent} isHovered={hoveredLink === l.label} />
              <button onClick={() => scrollTo(l.href)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Orbitron, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: isCurrent ? '#00F0FF' : 'rgba(255, 255, 255, 0.5)', transition: 'all 0.3s' }}>
                {l.label}
              </button>
            </li>
          )
        })}
      </ul>

      <button onClick={() => scrollTo('#contact')} style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 11, fontWeight: 800, padding: '10px 24px', background: 'transparent', color: '#FF003C', border: '1px solid #FF003C', cursor: 'pointer', textTransform: 'uppercase', clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)', transition: 'all 0.3s' }}>
        Register_
      </button>
    </motion.nav>
  )
}