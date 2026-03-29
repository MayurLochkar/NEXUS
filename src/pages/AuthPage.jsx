import { useRef, useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

/* ══════════════════════════════════════════
   GLOBAL STYLES
══════════════════════════════════════════ */
const GlobalStyles = () => {
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Share+Tech+Mono&family=Rajdhani:wght@300;400;600;700&display=swap');
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      body { overflow-x: hidden; }

      @keyframes blink          { 0%,100%{opacity:1} 50%{opacity:0} }
      @keyframes pulse-ring     { 0%{transform:scale(.8);opacity:1} 100%{transform:scale(2.8);opacity:0} }
      @keyframes scanline-sweep { 0%{top:-4px} 100%{top:100vh} }
      @keyframes float-idle     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
      @keyframes type-bob       { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
      @keyframes celebrate-jump { 0%{transform:translateY(0) rotate(0deg)} 25%{transform:translateY(-28px) rotate(-5deg)} 50%{transform:translateY(-32px) rotate(5deg)} 75%{transform:translateY(-12px) rotate(-3deg)} 100%{transform:translateY(0) rotate(0deg)} }
      @keyframes shake-no       { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-8px)} 80%{transform:translateX(8px)} }
      @keyframes glitch-shift   { 0%,90%,100%{transform:translate(0)} 92%{transform:translate(-4px,0)} 95%{transform:translate(4px,0)} 98%{transform:translate(-2px,0)} }
      @keyframes glitch-clip    { 0%,90%,100%{clip-path:none} 92%{clip-path:polygon(0 15%,100% 15%,100% 30%,0 30%)} 95%{clip-path:polygon(0 55%,100% 55%,100% 75%,0 75%)} 98%{clip-path:polygon(0 70%,100% 70%,100% 85%,0 85%)} }
      @keyframes eye-scan       { 0%,35%,100%{transform:translateX(0)} 40%{transform:translateX(3px)} 50%{transform:translateX(-3px)} 60%{transform:translateX(2px)} 70%{transform:translateX(0)} }
      @keyframes chest-pulse    { 0%,70%,100%{opacity:.3} 75%,90%{opacity:1} }
      @keyframes holo-shimmer   { 0%,100%{left:-100%} 50%{left:150%} }
      @keyframes bar-fill       { from{width:0} to{width:var(--w)} }
      @keyframes pop-in         { 0%{transform:scale(0) translateX(-20px);opacity:0} 70%{transform:scale(1.05) translateX(2px)} 100%{transform:scale(1) translateX(0);opacity:1} }
      @keyframes slide-up-in    { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }
      @keyframes neon-flicker   { 0%,19%,21%,23%,25%,54%,56%,100%{opacity:1} 20%,24%,55%{opacity:.4} }
      @keyframes warp-in        { 0%{transform:scaleX(0) scaleY(2);opacity:0;filter:blur(10px)} 60%{transform:scaleX(1.02) scaleY(.98)} 100%{transform:scale(1);opacity:1;filter:blur(0)} }
      @keyframes status-blink   { 0%,49%{background:#00FF88;box-shadow:0 0 6px #00FF88} 50%,100%{background:#00cc66;box-shadow:0 0 2px #00cc66} }
      @keyframes success-explode{ 0%{transform:scale(0);opacity:0} 60%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }

      .robot-idle      { animation: float-idle 2.8s ease-in-out infinite; }
      .robot-typing    { animation: type-bob .22s ease-in-out infinite; }
      .robot-celebrate { animation: celebrate-jump .7s cubic-bezier(.17,.67,.35,1.5) forwards; }
      .robot-error     { animation: shake-no .45s ease-in-out; }
      .glitch-text     { animation: glitch-shift 5s infinite, glitch-clip 5s infinite; }
      .eye-scan        { animation: eye-scan 5s ease-in-out infinite; }
      .blink           { animation: blink 1s step-end infinite; }
      .neon-flicker    { animation: neon-flicker 3s linear infinite; }
      .warp-in         { animation: warp-in .7s cubic-bezier(.22,1,.36,1) forwards; }

      input:-webkit-autofill { -webkit-box-shadow:0 0 0 1000px rgba(0,0,0,0.7) inset!important; -webkit-text-fill-color:#fff!important; }
      input::placeholder { color:rgba(0,240,255,0.18); font-family:"Share Tech Mono",monospace; }
      input:focus { outline:none; }
      button { cursor:pointer; }
      ::-webkit-scrollbar { width:3px; }
      ::-webkit-scrollbar-thumb { background:rgba(0,240,255,0.3); border-radius:2px; }

      @media (max-width:960px) {
        .page-grid   { flex-direction:column!important; padding:68px 16px 60px!important; gap:20px!important; align-items:center!important; }
        .left-panel  { flex-direction:row!important; flex-wrap:wrap!important; justify-content:center!important; width:100%!important; gap:14px!important; }
        .robot-col   { align-items:center!important; }
        .radar-panel,.mission-panel { display:none!important; }
        .right-panel { max-width:100%!important; width:100%!important; }
      }
      @media (max-width:600px) {
        .left-panel  { display:none!important; }
        .mobile-dialogue { display:flex!important; }
        .right-panel { padding:0!important; }
        .form-inner  { padding:22px 16px!important; }
      }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])
  return null
}

/* ══════════════════════════════════════════
   CONSTANTS
══════════════════════════════════════════ */
const DIALOGUES = {
  idle: ["BIOMETRIC SCAN COMPLETE.\nHUMAN DETECTED. AWAITING\nCREDENTIALS...", "NEXUS FIREWALL: ARMED.\nINSERT AUTH TOKEN\nTO PROCEED, AGENT.", "SCANNING PERIMETER...\nALL SECTORS CLEAR.\nREADY FOR LOGIN.", "AGENT, IDENTITY MUST\nBE VERIFIED BEFORE\nACCESS IS GRANTED.", "WARNING: UNAUTHORIZED\nACCESS TRIGGERS\nFULL SYSTEM LOCKDOWN."],
  typing: ["INPUT DETECTED.\nNEURAL PATTERN\nANALYSIS ACTIVE...", "KEYLOG ENCRYPTED.\nPROCESSING YOUR\nCREDENTIALS...", "DATA STREAM RECEIVED.\nCROSS-REFERENCING\nNEXUS DATABASE..."],
  loading: ["AUTHENTICATING...\nFIREWALL BYPASS\nIN PROGRESS...", "IDENTITY CHECK:\nLAYER 3 OF 3...\nHOLD POSITION.", "ALMOST THERE...\nDECRYPTING AGENT\nPROFILE DATA..."],
  celebrate: ["ACCESS GRANTED!\nWELCOME BACK,\nAGENT. NEXUS YOURS.", "IDENTITY CONFIRMED.\nALL SYSTEMS GREEN.\nINITIATING TRANSFER."],
  error: ["ACCESS DENIED!\nINVALID CREDENTIALS.\nRETRY, AGENT.", "SECURITY ALERT!\nWRONG AUTH TOKEN.\nRETRY SEQUENCE NOW."],
}

const SECURITY_STATS = [
  { label: 'THREAT LVL', value: 'LOW', color: '#00FF88', w: '18%' },
  { label: 'FIREWALL', value: '99.8%', color: '#00F0FF', w: '99%' },
  { label: 'ENCRYPTION', value: 'AES-512', color: '#FFE600', w: '85%' },
  { label: 'UPTIME', value: '99.99%', color: '#00F0FF', w: '100%' },
]

const INIT_LOGS = [
  { time: '00:00:01', msg: 'NEXUS v2.5 BOOT OK', c: '#00FF88' },
  { time: '00:00:03', msg: 'FIREWALL ARMED', c: 'rgba(255,0,60,0.8)' },
  { time: '00:00:05', msg: 'SCAN: ALL CLEAR', c: '#00F0FF' },
  { time: '00:00:08', msg: 'AUTH MODULE: READY', c: '#FFE600' },
  { time: '00:00:12', msg: 'AWAITING INPUT...', c: 'rgba(0,240,255,0.5)' },
]

const getRand = arr => arr[Math.floor(Math.random() * arr.length)]

/* ══════════════════════════════════════════
   MATRIX RAIN
══════════════════════════════════════════ */
function MatrixRain({ opacity = 0.05 }) {
  const ref = useRef()
  useEffect(() => {
    const c = ref.current; if (!c) return
    const ctx = c.getContext('2d')
    const setSize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight }
    setSize()
    const CHARS = 'NEXUS01アイウエオABCDEF!@#$%^01'
    const cols = Math.floor(c.width / 13)
    const drops = Array(cols).fill(1)
    let raf
    const draw = () => {
      ctx.fillStyle = `rgba(2,2,8,0.05)`; ctx.fillRect(0, 0, c.width, c.height)
      ctx.fillStyle = `rgba(0,240,255,${opacity})`; ctx.font = '11px "Share Tech Mono",monospace'
      drops.forEach((y, i) => {
        ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], i * 13, y * 13)
        if (y * 13 > c.height && Math.random() > .975) drops[i] = 0
        drops[i]++
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    const ro = new ResizeObserver(setSize); ro.observe(c)
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [opacity])
  return <canvas ref={ref} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />
}

/* ══════════════════════════════════════════
   PARTICLE FIELD
══════════════════════════════════════════ */
function ParticleField() {
  const ref = useRef()
  useEffect(() => {
    const c = ref.current; const ctx = c.getContext('2d')
    let W = c.width = window.innerWidth, H = c.height = window.innerHeight
    const onR = () => { W = c.width = window.innerWidth; H = c.height = window.innerHeight }
    window.addEventListener('resize', onR)
    const pts = Array.from({ length: 80 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .28, vy: (Math.random() - .5) * .28,
      a: Math.random() * Math.PI * 2, s: Math.random() * 1.2 + .4,
    }))
    let raf
    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.a += .006
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0
        ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,240,255,${.12 + Math.sin(p.a) * .08})`; ctx.fill()
      })
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.hypot(dx, dy)
        if (d < 120) { ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.strokeStyle = `rgba(0,240,255,${(1 - d / 120) * .065})`; ctx.lineWidth = .35; ctx.stroke() }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onR) }
  }, [])
  return <canvas ref={ref} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />
}

/* ══════════════════════════════════════════
   RADAR CANVAS
══════════════════════════════════════════ */
function Radar() {
  const ref = useRef()
  useEffect(() => {
    const c = ref.current; const ctx = c.getContext('2d')
    const S = 100; c.width = S; c.height = S
    const cx = S / 2, cy = S / 2, r = S / 2 - 5
    const blips = Array.from({ length: 4 }, () => ({ a: Math.random() * Math.PI * 2, d: Math.random() * r * .8 }))
    let angle = 0, raf
    const draw = () => {
      ctx.clearRect(0, 0, S, S)
        ;[1, .66, .33].forEach(f => { ctx.beginPath(); ctx.arc(cx, cy, r * f, 0, Math.PI * 2); ctx.strokeStyle = 'rgba(0,240,255,0.13)'; ctx.lineWidth = 1; ctx.stroke() })
      ctx.strokeStyle = 'rgba(0,240,255,0.08)'; ctx.lineWidth = .5
        ;[[cx, cy - r, cx, cy + r], [cx - r, cy, cx + r, cy]].forEach(([x1, y1, x2, y2]) => { ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke() })
      // Sweep
      const g = ctx.createRadialGradient ? null : null
      ctx.save(); ctx.translate(cx, cy)
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, r, angle - .5, angle); ctx.fillStyle = 'rgba(0,240,255,0.12)'; ctx.fill()
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r); ctx.strokeStyle = 'rgba(0,240,255,0.75)'; ctx.lineWidth = 1.5; ctx.stroke()
      ctx.restore()
      blips.forEach(b => {
        const bx = cx + Math.cos(b.a) * b.d, by = cy + Math.sin(b.a) * b.d
        const diff = ((b.a - angle) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2)
        const alpha = diff < .6 ? 1 - diff / .6 : 0
        if (alpha > 0) { ctx.beginPath(); ctx.arc(bx, by, 3, 0, Math.PI * 2); ctx.fillStyle = `rgba(255,0,60,${alpha})`; ctx.shadowColor = '#FF003C'; ctx.shadowBlur = 8; ctx.fill(); ctx.shadowBlur = 0 }
      })
      angle = (angle + .03) % (Math.PI * 2)
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(raf)
  }, [])
  return <canvas ref={ref} style={{ width: 100, height: 100 }} />
}

/* ══════════════════════════════════════════
   SPEECH BUBBLE — LEFT SIDE
══════════════════════════════════════════ */
function SpeechBubbleLeft({ text, mood }) {
  const [displayed, setDisplayed] = useState('')
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    setVisible(false); if (!text) return
    const t = setTimeout(() => {
      setVisible(true); setDisplayed(''); let i = 0
      const iv = setInterval(() => { setDisplayed(text.slice(0, i)); i++; if (i > text.length) clearInterval(iv) }, 26)
      return () => clearInterval(iv)
    }, 60)
    return () => clearTimeout(t)
  }, [text])

  const bc = mood === 'error' ? '#FF003C' : mood === 'celebrate' ? '#FFE600' : '#00F0FF'
  if (!visible) return null

  return (
    <div style={{
      position: 'absolute', right: '106%', top: '8%',
      width: 185, background: 'rgba(2,2,10,0.97)',
      border: `1px solid ${bc}`, borderRadius: '6px 6px 0 6px',
      padding: '11px 13px', fontFamily: '"Share Tech Mono",monospace',
      fontSize: 9.5, color: bc, letterSpacing: .8, lineHeight: 1.85,
      zIndex: 30, boxShadow: `0 0 22px ${bc}22, inset 0 0 10px ${bc}05`,
      animation: 'pop-in .3s cubic-bezier(.175,.885,.32,1.275) forwards',
      whiteSpace: 'pre-line', transition: 'border-color .3s, color .3s',
    }}>
      {/* Right-pointing tail */}
      <div style={{ position: 'absolute', top: 18, right: -8, width: 0, height: 0, borderTop: '7px solid transparent', borderBottom: '7px solid transparent', borderLeft: `8px solid ${bc}`, transition: 'border-left-color .3s' }} />
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 6, opacity: .55 }}>
        <div style={{ width: 4, height: 4, borderRadius: '50%', background: bc, boxShadow: `0 0 4px ${bc}` }} />
        <span style={{ fontSize: 7.5, letterSpacing: 2 }}>AGENT_X</span>
      </div>
      <span style={{ color: 'rgba(255,230,0,0.65)' }}>{'> '}</span>
      {displayed}
      <span className="blink">▌</span>
    </div>
  )
}

/* ══════════════════════════════════════════
   ROBOT
══════════════════════════════════════════ */
function HackerRobot({ mood, dialogue }) {
  const [cls, setCls] = useState('robot-idle')
  useEffect(() => {
    setCls('')
    const t = setTimeout(() => setCls(
      mood === 'idle' ? 'robot-idle' :
        mood === 'typing' ? 'robot-typing' :
          mood === 'loading' ? 'robot-typing' :
            mood === 'celebrate' ? 'robot-celebrate' :
              mood === 'error' ? 'robot-error' : 'robot-idle'
    ), 20)
    return () => clearTimeout(t)
  }, [mood])

  const ec = mood === 'celebrate' ? '#FFE600' : mood === 'error' ? '#FF003C' : '#00F0FF'
  const eyH = (mood === 'typing' || mood === 'loading') ? 5 : 13

  return (
    <div style={{ position: 'relative' }}>
      {/* Speech bubble — LEFT */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <SpeechBubbleLeft text={dialogue} mood={mood} />
      </div>

      <div className={cls} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, userSelect: 'none' }}>

        {/* HEAD */}
        <div style={{ width: 76, height: 76, background: 'linear-gradient(160deg,#080820,#04040f)', border: `2px solid ${ec}`, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', boxShadow: `0 0 30px ${ec}33, inset 0 0 14px ${ec}05`, transition: 'border-color .3s, box-shadow .3s' }}>
          {/* Antenna */}
          <div style={{ position: 'absolute', top: -34, left: '50%', transform: 'translateX(-50%)', width: 2, height: 34, background: `linear-gradient(to top,${ec},transparent)`, opacity: .8 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: mood === 'celebrate' ? '#FFE600' : '#FF003C', position: 'absolute', top: -5, left: -4, boxShadow: `0 0 12px ${mood === 'celebrate' ? '#FFE600' : '#FF003C'}` }}>
              {[1, 2].map(i => <div key={i} style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `1.5px solid ${mood === 'celebrate' ? '#FFE600' : '#FF003C'}`, animation: `pulse-ring ${.8 + i * .4}s ease-out ${i * .3}s infinite` }} />)}
            </div>
          </div>
          {/* Visor */}
          <div style={{ position: 'absolute', top: 21, left: -3, right: -3, height: 22, background: `${ec}05`, borderTop: `1px solid ${ec}28`, borderBottom: `1px solid ${ec}28` }} />
          {/* Eyes */}
          <div className="eye-scan" style={{ display: 'flex', gap: 16, zIndex: 2 }}>
            {[0, 1].map(i => <div key={i} style={{ width: 14, height: eyH, background: ec, borderRadius: 2, boxShadow: `0 0 10px ${ec}, 0 0 22px ${ec}50`, transition: 'all .2s, background .3s' }} />)}
          </div>
          {/* Mouth */}
          <div style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', width: mood === 'celebrate' ? 34 : mood === 'error' ? 22 : 18, height: mood === 'celebrate' ? 10 : 3, background: mood === 'error' ? '#FF003C' : mood === 'celebrate' ? '#FFE600' : ec, borderRadius: mood === 'celebrate' ? '0 0 12px 12px' : mood === 'error' ? '10px 10px 0 0' : 2, boxShadow: `0 0 8px ${mood === 'error' ? '#FF003C' : ec}`, transition: 'all .3s' }} />
          {/* LEDs */}
          <div style={{ position: 'absolute', bottom: 4, display: 'flex', gap: 5 }}>
            {['#00F0FF', mood === 'error' ? '#FF003C' : '#00FF88', '#FFE600'].map((c, i) => <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: c, boxShadow: `0 0 5px ${c}`, opacity: .75 }} />)}
          </div>
          {/* Top stripe */}
          <div style={{ position: 'absolute', top: 5, left: 8, right: 8, height: 2, background: `linear-gradient(90deg,transparent,${ec},transparent)`, opacity: .25 }} />
        </div>

        {/* NECK segments */}
        <div style={{ display: 'flex', gap: 3 }}>
          {[0, 1, 2].map(i => <div key={i} style={{ width: 8, height: 10, background: '#080820', border: `1px solid ${ec}22` }} />)}
        </div>

        {/* BODY */}
        <div style={{ width: 96, height: 88, background: 'linear-gradient(160deg,#080820,#04040f)', border: `2px solid ${ec}40`, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', boxShadow: `inset 0 0 28px ${ec}04`, transition: 'border-color .3s' }}>
          {/* Chest screen */}
          <div style={{ width: 54, height: 40, background: 'rgba(0,0,0,0.75)', border: `1px solid ${ec}28`, borderRadius: 4, overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5, padding: 5 }}>
            {[0, 1, 2].map(i => <div key={i} style={{ height: 2, width: `${50 + i * 18}%`, background: ec, borderRadius: 1, opacity: .4, animation: `chest-pulse ${.5 + i * .35}s step-end infinite`, transition: 'background .3s' }} />)}
          </div>
          {/* Shoulder bolts */}
          {[-1, 1].map(s => <div key={s} style={{ position: 'absolute', top: 10, [s === -1 ? 'left' : 'right']: 7, width: 9, height: 9, borderRadius: '50%', background: `${ec}12`, border: `1px solid ${ec}30` }} />)}
          {/* Side vents */}
          {[-1, 1].map(s => (
            <div key={s} style={{ position: 'absolute', [s === -1 ? 'left' : 'right']: 4, top: '30%', display: 'flex', flexDirection: 'column', gap: 3 }}>
              {[0, 1, 2].map(i => <div key={i} style={{ width: 5, height: 1.5, background: `${ec}38` }} />)}
            </div>
          ))}
        </div>

        {/* ARMS */}
        <div style={{ display: 'flex', gap: 4, marginTop: -8 }}>
          {[
            { rot: mood === 'celebrate' ? '-40deg' : mood === 'typing' ? '-22deg' : '-12deg' },
            { space: 100 },
            { rot: mood === 'celebrate' ? '40deg' : mood === 'typing' ? '22deg' : '12deg' },
          ].map((item, i) => item.space
            ? <div key={i} style={{ width: item.space }} />
            : <div key={i} style={{ width: 19, height: 56, background: 'linear-gradient(to bottom,#080820,#04040f)', border: `1.5px solid ${ec}28`, borderRadius: '5px 5px 12px 12px', transform: `rotate(${item.rot})`, transformOrigin: 'top center', transition: 'transform .4s' }}>
              <div style={{ margin: '8px 4px 0', height: 1, background: `${ec}22` }} />
              <div style={{ margin: '5px 4px 0', height: 1, background: `${ec}14` }} />
            </div>
          )}
        </div>

        {/* LEGS */}
        <div style={{ display: 'flex', gap: 14, marginTop: 6 }}>
          {[0, 1].map(i => (
            <div key={i} style={{ width: 24, height: 48, background: 'linear-gradient(to bottom,#080820,#04040f)', border: `1.5px solid ${ec}20`, borderRadius: '3px 3px 10px 10px', position: 'relative' }}>
              <div style={{ margin: '10px 5px 0', height: 1, background: `${ec}18` }} />
              <div style={{ margin: '7px 5px 0', height: 1, background: `${ec}10` }} />
              <div style={{ position: 'absolute', bottom: 0, left: -3, right: -3, height: 8, background: `${ec}12`, border: `1px solid ${ec}22`, borderRadius: '0 0 6px 6px' }} />
            </div>
          ))}
        </div>

        {/* Shadow */}
        <div style={{ width: 78, height: 10, background: `radial-gradient(ellipse,${ec}1E,transparent)`, borderRadius: '50%', marginTop: 6 }} />

        {/* Label */}
        <div style={{ fontFamily: '"Share Tech Mono",monospace', fontSize: 8, color: ec, letterSpacing: 2.5, marginTop: 5, textShadow: `0 0 8px ${ec}`, opacity: .85, transition: 'color .3s' }}>
          {mood === 'idle' ? '● AGENT_X ONLINE' : mood === 'typing' || mood === 'loading' ? '◌ PROCESSING...' : mood === 'celebrate' ? '★ GRANTED!' : '✕ DENIED'}
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   STAT BAR
══════════════════════════════════════════ */
function StatBar({ label, value, color, w }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontFamily: '"Share Tech Mono",monospace', fontSize: 7.5, color: 'rgba(0,240,255,0.45)', letterSpacing: 1.5 }}>{label}</span>
        <span style={{ fontFamily: '"Share Tech Mono",monospace', fontSize: 7.5, color, letterSpacing: 1 }}>{value}</span>
      </div>
      <div style={{ height: 3, background: 'rgba(255,255,255,0.05)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ '--w': w, height: '100%', width: w, background: `linear-gradient(90deg,${color}70,${color})`, borderRadius: 2, boxShadow: `0 0 8px ${color}`, animation: 'bar-fill .9s ease forwards' }} />
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   CYBER INPUT
══════════════════════════════════════════ */
function CyberInput({ label, type = 'text', value, onChange, placeholder, icon }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ marginBottom: 14, animation: 'slide-up-in .3s ease forwards' }}>
      <label style={{ fontFamily: '"Share Tech Mono",monospace', fontSize: 8.5, color: focused ? '#00F0FF' : 'rgba(0,240,255,0.4)', letterSpacing: 2, display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5, transition: 'color .2s' }}>
        <span style={{ color: focused ? '#FFE600' : 'rgba(255,230,0,.3)', fontSize: 11 }}>{icon}</span>
        {label}
        {focused && <span className="blink" style={{ color: '#00F0FF', fontSize: 10 }}>_</span>}
      </label>
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: -1, left: -1, width: 10, height: 10, borderTop: `2px solid ${focused ? '#FFE600' : 'transparent'}`, borderLeft: `2px solid ${focused ? '#FFE600' : 'transparent'}`, transition: 'border-color .2s', zIndex: 2 }} />
        <div style={{ position: 'absolute', bottom: -1, right: -1, width: 10, height: 10, borderBottom: `2px solid ${focused ? '#FFE600' : 'transparent'}`, borderRight: `2px solid ${focused ? '#FFE600' : 'transparent'}`, transition: 'border-color .2s', zIndex: 2 }} />
        <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{ width: '100%', background: focused ? 'rgba(0,240,255,0.03)' : 'rgba(0,0,0,0.55)', border: `1px solid ${focused ? '#00F0FF' : 'rgba(0,240,255,0.16)'}`, color: '#fff', padding: '12px 14px', fontFamily: '"Share Tech Mono",monospace', fontSize: 13, transition: 'all .25s', letterSpacing: .5, boxShadow: focused ? '0 0 22px rgba(0,240,255,0.1),inset 0 0 10px rgba(0,240,255,0.03)' : 'none' }}
        />
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   MAIN
══════════════════════════════════════════ */
export default function AuthPage() {
  const navigate = useNavigate()
  const [mood, setMood] = useState('idle')
  const [dialogue, setDialogue] = useState(getRand(DIALOGUES.idle))
  const [tab, setTab] = useState('login')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')
  const [typed, setTyped] = useState('')
  const [logs, setLogs] = useState(INIT_LOGS)
  const [loginCount, setLoginCount] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)
  const [clock, setClock] = useState(new Date())
  const dTimer = useRef(null)

  // Navigate to /main after showing success screen
  useEffect(() => {
    if (showSuccess) {
      const t = setTimeout(() => navigate('/main'), 2500)
      return () => clearTimeout(t)
    }
  }, [showSuccess, navigate])

  useEffect(() => { const iv = setInterval(() => setClock(new Date()), 1000); return () => clearInterval(iv) }, [])

  useEffect(() => {
    const msg = '> NEXUS_AUTH_TERMINAL v2.5 :: SECURE_CHANNEL'
    let i = 0; const iv = setInterval(() => { setTyped(msg.slice(0, i)); i++; if (i > msg.length) clearInterval(iv) }, 44)
    return () => clearInterval(iv)
  }, [])

  useEffect(() => {
    const iv = setInterval(() => { if (mood === 'idle') setDialogue(getRand(DIALOGUES.idle)) }, 4500)
    return () => clearInterval(iv)
  }, [mood])

  const setMoodDial = useCallback((m, d) => {
    setMood(m); setDialogue(d || getRand(DIALOGUES[m] || DIALOGUES.idle))
    clearTimeout(dTimer.current)
    if (m !== 'idle') dTimer.current = setTimeout(() => { setMood('idle'); setDialogue(getRand(DIALOGUES.idle)) }, 3500)
  }, [])

  const addLog = useCallback((msg, c) => {
    const n = new Date(), t = `${String(n.getHours()).padStart(2, '0')}:${String(n.getMinutes()).padStart(2, '0')}:${String(n.getSeconds()).padStart(2, '0')}`
    setLogs(prev => [...prev.slice(-7), { time: t, msg, c }])
  }, [])

  const mkHandler = setter => val => {
    setter(val)
    if (mood === 'idle') setMoodDial('typing')
    clearTimeout(dTimer.current)
    dTimer.current = setTimeout(() => setMoodDial('idle'), 1300)
  }

  const handleLogin = async () => {
    if (!email || !pass) { setErr('> MISSING FIELDS — ALL INPUTS REQUIRED'); setMoodDial('error'); addLog('AUTH FAILED: MISSING FIELDS', 'rgba(255,0,60,.8)'); return }
    setErr(''); setLoading(true); setMoodDial('loading')
    addLog('INITIATING AUTH SEQUENCE...', 'rgba(255,230,0,.7)')
    await new Promise(r => setTimeout(r, 900))
    addLog('FIREWALL: BYPASSING LAYER 2...', 'rgba(0,240,255,.5)')
    await new Promise(r => setTimeout(r, 700))
    addLog('NEXUS DB: CROSS-REFERENCING...', 'rgba(0,240,255,.5)')
    await new Promise(r => setTimeout(r, 600))
    setLoading(false); setLoginCount(p => p + 1); setMoodDial('celebrate')
    addLog('ACCESS GRANTED :: WELCOME AGENT', '#00FF88')
    setTimeout(() => setShowSuccess(true), 800)
  }

  const handleGoogle = async () => {
    setErr(''); setLoading(true); setMoodDial('loading')
    addLog('GOOGLE OAUTH :: HANDSHAKE...', 'rgba(255,230,0,.7)')
    await new Promise(r => setTimeout(r, 1300))
    addLog('OAUTH VERIFIED :: AGENT CLEARED', '#00FF88')
    setLoading(false); setLoginCount(p => p + 1); setMoodDial('celebrate')
    setTimeout(() => setShowSuccess(true), 700)
  }

  /* ── SUCCESS SCREEN ── */
  if (showSuccess) return (
    <>
      <GlobalStyles />
      <div style={{ minHeight: '100vh', background: '#020208', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 28, position: 'relative', overflow: 'hidden' }}>
        <ParticleField />
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', animation: 'success-explode .5s ease forwards' }}>
          <HackerRobot mood="celebrate" dialogue={"ACCESS GRANTED!\nWELCOME TO NEXUS.\nINITIATING TRANSFER..."} />
          <div style={{ marginTop: 28, fontFamily: 'Orbitron,sans-serif', fontWeight: 900, fontSize: 26, color: '#00F0FF', letterSpacing: 5 }} className="glitch-text neon-flicker">ACCESS GRANTED</div>
          <div style={{ marginTop: 8, fontFamily: '"Share Tech Mono",monospace', fontSize: 11, color: '#FFE600', letterSpacing: 4 }}>WELCOME TO NEXUS, AGENT</div>
          <div style={{ marginTop: 22, fontFamily: '"Share Tech Mono",monospace', fontSize: 9, color: 'rgba(0,240,255,.4)', letterSpacing: 2 }}>INITIALIZING DASHBOARD<span className="blink">...</span></div>
        </div>
      </div>
    </>
  )

  const fmt = d => `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`

  /* ── MAIN ── */
  return (
    <>
      <GlobalStyles />
      <div style={{ minHeight: '100vh', background: '#020208', position: 'relative', overflow: 'hidden' }}>
        <ParticleField />
        {/* BG grid */}
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, backgroundImage: 'linear-gradient(rgba(0,240,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(0,240,255,.02) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
        {/* Scanline */}
        <div style={{ position: 'fixed', left: 0, right: 0, height: 3, zIndex: 2, pointerEvents: 'none', background: 'linear-gradient(90deg,transparent,rgba(0,240,255,.07),transparent)', animation: 'scanline-sweep 8s linear infinite' }} />

        {/* ── TOP NAV ── */}
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(2,2,8,0.94)', borderBottom: '1px solid rgba(0,240,255,0.09)', backdropFilter: 'blur(18px)', padding: '0 24px', height: 46, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ fontFamily: 'Orbitron,sans-serif', fontWeight: 900, fontSize: 14, color: '#00F0FF', letterSpacing: 4, textShadow: '0 0 18px rgba(0,240,255,.55)' }} className="neon-flicker">NEXUS</div>
            <div style={{ width: 1, height: 18, background: 'rgba(0,240,255,0.18)' }} />
            <div style={{ fontFamily: '"Share Tech Mono",monospace', fontSize: 8, color: 'rgba(0,240,255,0.35)', letterSpacing: 2 }}>SECURE TERMINAL</div>
          </div>
          <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
            {[['STATUS', 'ONLINE', '#00FF88'], ['SEC', 'LVL-A', '#FFE600'], ['LOGINS', String(loginCount).padStart(3, '0'), '#00F0FF']].map(([k, v, c]) => (
              <div key={k} style={{ fontFamily: '"Share Tech Mono",monospace', fontSize: 8, color: 'rgba(0,240,255,0.3)', letterSpacing: 1.5 }}>{k}: <span style={{ color: c }}>{v}</span></div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', animation: 'status-blink 2s ease-in-out infinite' }} />
              <span style={{ fontFamily: '"Share Tech Mono",monospace', fontSize: 8, color: '#00FF88', letterSpacing: 2 }}>ARMED</span>
            </div>
            <div style={{ fontFamily: '"Share Tech Mono",monospace', fontSize: 8, color: 'rgba(0,240,255,0.3)', letterSpacing: 1 }}>{fmt(clock)}</div>
          </div>
        </div>

        {/* Mobile dialogue */}
        <div className="mobile-dialogue" style={{ display: 'none', position: 'fixed', top: 46, left: 0, right: 0, zIndex: 90, background: 'rgba(0,0,0,0.85)', borderBottom: '1px solid rgba(0,240,255,0.1)', padding: '6px 16px', fontFamily: '"Share Tech Mono",monospace', fontSize: 9, color: '#00F0FF', letterSpacing: 1.2, justifyContent: 'center', gap: 6 }}>
          <span style={{ color: '#FFE600' }}>{'> '}</span>
          <span style={{ color: 'rgba(0,240,255,.65)' }}>{dialogue.replace(/\n/g, ' ')}</span>
        </div>

        {/* ── PAGE GRID ── */}
        <div className="page-grid" style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: 28, padding: '62px 24px 60px', maxWidth: 1180, margin: '0 auto', minHeight: '100vh' }}>

          {/* ════ LEFT PANEL ════ */}
          <div className="left-panel" style={{ display: 'flex', flexDirection: 'column', gap: 18, flex: '0 0 auto', width: 276, paddingTop: 18 }}>

            {/* Robot */}
            <div className="robot-col" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <HackerRobot mood={mood} dialogue={dialogue} />
            </div>

            {/* SYS LOG */}
            <div style={{ background: 'rgba(0,0,0,0.52)', border: '1px solid rgba(0,240,255,0.11)', padding: '11px 13px', position: 'relative', overflow: 'hidden' }}>
              <MatrixRain opacity={0.04} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ fontFamily: 'Orbitron,sans-serif', fontSize: 7.5, fontWeight: 700, color: 'rgba(0,240,255,0.45)', letterSpacing: 3, marginBottom: 9, display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{ width: 4, height: 4, background: '#00F0FF', borderRadius: '50%' }} /> SYS LOG
                </div>
                {logs.map((l, i) => (
                  <div key={i} style={{ display: 'flex', gap: 7, alignItems: 'baseline', opacity: .35 + (i / logs.length) * .65, marginBottom: 3 }}>
                    <span style={{ fontFamily: '"Share Tech Mono",monospace', fontSize: 7, color: 'rgba(0,240,255,0.3)', flex: '0 0 auto' }}>{l.time}</span>
                    <span style={{ fontFamily: '"Share Tech Mono",monospace', fontSize: 7.5, color: l.c, letterSpacing: .4 }}>{l.msg}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SECURITY STATS */}
            <div style={{ background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(0,240,255,0.11)', padding: '11px 13px' }}>
              <div style={{ fontFamily: 'Orbitron,sans-serif', fontSize: 7.5, fontWeight: 700, color: 'rgba(0,240,255,0.45)', letterSpacing: 3, marginBottom: 9, display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 4, height: 4, background: '#FFE600', borderRadius: '50%' }} /> SYSTEM INTEGRITY
              </div>
              {SECURITY_STATS.map(s => <StatBar key={s.label} {...s} />)}
            </div>

            {/* RADAR */}
            <div className="radar-panel" style={{ background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(0,240,255,0.11)', padding: '11px 13px' }}>
              <div style={{ fontFamily: 'Orbitron,sans-serif', fontSize: 7.5, fontWeight: 700, color: 'rgba(0,240,255,0.45)', letterSpacing: 3, marginBottom: 9, display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 4, height: 4, background: '#FF003C', borderRadius: '50%', animation: 'status-blink 1.2s infinite' }} /> THREAT RADAR
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Radar />
                <div style={{ fontFamily: '"Share Tech Mono",monospace', fontSize: 8, color: 'rgba(0,240,255,0.4)', lineHeight: 2.1 }}>
                  {[['SECTOR', 'CLEAR', '#00FF88'], ['THREATS', '0', '#FF003C'], ['PING', '4ms', '#FFE600'], ['NODES', '7', '#00F0FF']].map(([k, v, c]) => (
                    <div key={k}>{k}: <span style={{ color: c }}>{v}</span></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ════ RIGHT PANEL ════ */}
          <div className="right-panel" style={{ flex: '1 1 auto', maxWidth: 450, paddingTop: 18 }}>

            {/* Form card */}
            <div className="warp-in" style={{ border: '1px solid rgba(0,240,255,0.16)', background: 'rgba(2,2,12,0.96)', backdropFilter: 'blur(28px)', position: 'relative', boxShadow: '0 0 100px rgba(0,240,255,0.04), inset 0 0 60px rgba(0,240,255,0.01)' }}>
              {/* Corner brackets */}
              {[{ t: 0, l: 0 }, { t: 0, r: 0 }, { b: 0, l: 0 }, { b: 0, r: 0 }].map((pos, i) => (
                <div key={i} style={{ position: 'absolute', width: 16, height: 16, top: pos.t, bottom: pos.b, left: pos.l, right: pos.r, borderTop: pos.t === 0 ? '2px solid #00F0FF' : 'none', borderBottom: pos.b === 0 ? '2px solid #00F0FF' : 'none', borderLeft: pos.l === 0 ? '2px solid #00F0FF' : 'none', borderRight: pos.r === 0 ? '2px solid #00F0FF' : 'none' }} />
              ))}

              <div className="form-inner" style={{ padding: '34px 34px 26px' }}>
                {/* Terminal header */}
                <div style={{ fontFamily: '"Share Tech Mono",monospace', fontSize: 8.5, color: 'rgba(0,240,255,0.38)', letterSpacing: 1.5, marginBottom: 4 }}>
                  {typed}<span className="blink">|</span>
                </div>
                {/* Title */}
                <div className="glitch-text" style={{ fontFamily: 'Orbitron,sans-serif', fontWeight: 900, fontSize: 21, color: '#fff', letterSpacing: 4, textShadow: '0 0 32px rgba(0,240,255,0.28)', marginBottom: 4 }}>
                  AUTHENTICATION
                </div>
                <div style={{ fontFamily: '"Share Tech Mono",monospace', fontSize: 8, color: 'rgba(0,240,255,0.3)', letterSpacing: 2, marginBottom: 22 }}>
                  NEXUS SECURE ACCESS PORTAL · LEVEL ALPHA
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', marginBottom: 22, borderBottom: '1px solid rgba(0,240,255,0.07)' }}>
                  {['login', 'signup'].map(t => (
                    <button key={t} onClick={() => { setTab(t); setErr('') }} style={{ flex: 1, padding: '9px 0', background: 'none', border: 'none', borderBottom: tab === t ? '2px solid #00F0FF' : '2px solid transparent', color: tab === t ? '#00F0FF' : 'rgba(255,255,255,0.2)', fontFamily: 'Orbitron,sans-serif', fontSize: 9, fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase', transition: 'all .25s', marginBottom: -1, textShadow: tab === t ? '0 0 14px rgba(0,240,255,.5)' : 'none' }}>
                      {t === 'login' ? '⌨ LOGIN' : '⊕ REGISTER'}
                    </button>
                  ))}
                </div>

                {/* Fields */}
                {tab === 'signup' && <CyberInput label="AGENT DESIGNATION" value={name} onChange={mkHandler(setName)} placeholder="AGENT_47" icon="◈" />}
                <CyberInput label="SECURE EMAIL" type="email" value={email} onChange={mkHandler(setEmail)} placeholder="agent@nexus.io" icon="◉" />
                <CyberInput label="PASSPHRASE" type="password" value={pass} onChange={mkHandler(setPass)} placeholder="••••••••••••" icon="◆" />

                {/* Error */}
                {err && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px', border: '1px solid rgba(255,0,60,.28)', background: 'rgba(255,0,60,.04)', marginBottom: 10, animation: 'slide-up-in .2s ease' }}>
                    <span style={{ color: '#FF003C', fontSize: 14 }}>⚠</span>
                    <span style={{ fontFamily: '"Share Tech Mono",monospace', fontSize: 9, color: '#FF003C', letterSpacing: .8 }}>{err}</span>
                  </div>
                )}

                {/* Execute */}
                <button onClick={handleLogin} disabled={loading} style={{ width: '100%', marginTop: 4, padding: '14px 0', background: loading ? 'transparent' : 'linear-gradient(135deg,#cc0028,#FF003C)', border: `1px solid ${loading ? '#00F0FF' : '#FF003C'}`, color: loading ? '#00F0FF' : '#fff', fontFamily: 'Orbitron,sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: 3, clipPath: 'polygon(12px 0,100% 0,100% calc(100% - 12px),calc(100% - 12px) 100%,0 100%,0 12px)', transition: 'all .3s', boxShadow: loading ? '0 0 28px rgba(0,240,255,.2)' : '0 0 28px rgba(255,0,60,.28)', position: 'relative', overflow: 'hidden' }}
                  onMouseEnter={e => { if (!loading) { e.currentTarget.style.boxShadow = '0 0 50px rgba(255,0,60,.55)'; e.currentTarget.style.transform = 'translateY(-1px)' } }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 28px rgba(255,0,60,.28)'; e.currentTarget.style.transform = '' }}>
                  {loading ? <><span className="blink">▮</span> AUTHENTICATING...</> : tab === 'login' ? '▶  EXECUTE LOGIN' : '▶  CREATE AGENT PROFILE'}
                  {!loading && <div style={{ position: 'absolute', top: 0, height: '100%', width: '45%', background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)', transform: 'skewX(-20deg)', animation: 'holo-shimmer 2.8s ease-in-out infinite', pointerEvents: 'none' }} />}
                </button>

                {/* Divider */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '16px 0' }}>
                  <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.04)' }} />
                  <span style={{ fontFamily: '"Share Tech Mono",monospace', fontSize: 8, color: 'rgba(255,255,255,0.16)', letterSpacing: 3 }}>OR</span>
                  <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.04)' }} />
                </div>

                {/* Google */}
                <button onClick={handleGoogle} disabled={loading} style={{ width: '100%', padding: '11px 0', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.5)', fontFamily: 'Orbitron,sans-serif', fontSize: 9, fontWeight: 600, letterSpacing: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, transition: 'all .25s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.16)'; e.currentTarget.style.color = 'rgba(255,255,255,0.75)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  GOOGLE AUTH PROTOCOL
                </button>

                {/* Switch */}
                <div style={{ marginTop: 16, textAlign: 'center', fontFamily: '"Share Tech Mono",monospace', fontSize: 9, color: 'rgba(255,255,255,0.14)', letterSpacing: 1 }}>
                  {tab === 'login'
                    ? <span>No account? <span onClick={() => setTab('signup')} style={{ color: '#00F0FF', cursor: 'pointer' }}>Register Agent ›</span></span>
                    : <span>Have credentials? <span onClick={() => setTab('login')} style={{ color: '#00F0FF', cursor: 'pointer' }}>Login ›</span></span>
                  }
                </div>
              </div>
            </div>

            {/* MISSION BRIEFING */}
            <div className="mission-panel" style={{ marginTop: 14, background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(0,240,255,0.09)', padding: '13px 17px' }}>
              <div style={{ fontFamily: 'Orbitron,sans-serif', fontSize: 7.5, fontWeight: 700, color: 'rgba(0,240,255,0.38)', letterSpacing: 3, marginBottom: 9 }}>⚑ MISSION BRIEFING</div>
              <div style={{ fontFamily: '"Share Tech Mono",monospace', fontSize: 8.5, color: 'rgba(0,240,255,0.3)', lineHeight: 1.95, letterSpacing: .4 }}>
                Authentication required to access NEXUS infrastructure. All transmissions encrypted via AES-512. Unauthorized access attempts are logged and reported to NEXUS Command.
              </div>
              <div style={{ marginTop: 10, display: 'flex', gap: 14 }}>
                {[['ENC', 'AES-512', '#00F0FF'], ['VPN', 'ACTIVE', '#00FF88'], ['ANON', 'ON', '#FFE600']].map(([k, v, c]) => (
                  <div key={k} style={{ fontFamily: '"Share Tech Mono",monospace', fontSize: 7.5 }}>
                    <span style={{ color: 'rgba(0,240,255,0.28)' }}>{k}: </span><span style={{ color: c }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(2,2,8,0.92)', borderTop: '1px solid rgba(0,240,255,0.07)', backdropFilter: 'blur(14px)', padding: '5px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: '"Share Tech Mono",monospace', fontSize: 7.5, color: 'rgba(0,240,255,0.2)', letterSpacing: 2 }}>NEXUS CORP © 2025 · ALL ACCESS MONITORED</div>
          <div style={{ display: 'flex', gap: 14 }}>
            {['ENCRYPTED', 'MONITORED', 'PROTECTED'].map(t => (
              <div key={t} style={{ fontFamily: '"Share Tech Mono",monospace', fontSize: 7, color: 'rgba(0,240,255,0.18)', letterSpacing: 1.5, display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 3, height: 3, borderRadius: '50%', background: '#00FF88' }} /> {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}