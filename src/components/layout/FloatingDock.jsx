import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const items = [
  { id:'hero',     label:'HOME',     color:'#00F0FF',
    icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { id:'about',    label:'ABOUT',    color:'#00F0FF',
    icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg> },
  { id:'tracks',   label:'TRACKS',   color:'#FF003C',
    icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg> },
  { id:'timeline', label:'TIMELINE', color:'#FFE600',
    icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
  { id:'prizes',   label:'PRIZES',   color:'#FFE600',
    icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20"><path d="M8 21h8M12 17v4M7 4H4l3 7a5 5 0 0010 0l3-7h-3"/><path d="M7 4h10"/></svg> },
  { id:'faq',      label:'FAQ',      color:'#7B2FBE',
    icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> },
  { id:'contact',  label:'CONTACT',  color:'#FF003C',
    icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
]

export default function FloatingDock() {
  const [hovered, setHovered] = useState(null)

  const scrollTo = id => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ delay: 1, duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed', bottom: 20, left: '50%',
        transform: 'translateX(-50%)', zIndex: 400,
        background: 'rgba(5,5,16,0.85)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(0,240,255,0.15)',
        padding: '8px 12px',
        display: 'flex', gap: 4, alignItems: 'flex-end',
        clipPath: 'polygon(12px 0,100% 0,100% calc(100% - 12px),calc(100% - 12px) 100%,0 100%,0 12px)',
        boxShadow: '0 0 30px rgba(0,240,255,0.08)',
        maxWidth: 'calc(100vw - 32px)',
      }}
    >
      {items.map(item => (
        <div key={item.id} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Tooltip */}
          <AnimatePresence>
            {hovered === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{  opacity: 0, y: 4 }}
                style={{
                  position: 'absolute', bottom: '110%',
                  background: 'rgba(5,5,16,0.95)',
                  border: `1px solid ${item.color}`,
                  padding: '4px 10px', whiteSpace: 'nowrap',
                  fontFamily: '"Share Tech Mono",monospace',
                  fontSize: 9, letterSpacing: 2, color: item.color,
                  pointerEvents: 'none',
                  boxShadow: `0 0 10px ${item.color}40`
                }}>
                {item.label}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            onClick={() => scrollTo(item.id)}
            onMouseEnter={() => setHovered(item.id)}
            onMouseLeave={() => setHovered(null)}
            whileHover={{ scale: 1.4, y: -8 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            style={{
              width: 'clamp(32px,8vw,44px)', height: 'clamp(32px,8vw,44px)',
              background: hovered === item.id ? `${item.color}15` : 'transparent',
              border: `1px solid ${hovered === item.id ? item.color : 'rgba(255,255,255,0.08)'}`,
              borderRadius: 8, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: hovered === item.id ? item.color : 'rgba(255,255,255,0.4)',
              transition: 'background 0.2s, border 0.2s, color 0.2s',
              flexShrink: 0,
            }}>
            {item.icon}
          </motion.button>
        </div>
      ))}
    </motion.div>
  )
}