import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function Preloader({ onComplete }) {
  const wrapRef    = useRef(null)
  const topRef     = useRef(null)
  const botRef     = useRef(null)
  const countRef   = useRef(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    let n = 0
    const iv = setInterval(() => {
      n += Math.floor(Math.random() * 4) + 1
      if (n >= 100) { n = 100; clearInterval(iv) }
      setCount(n)
    }, 30)

    const tl = gsap.timeline({ delay: 3.2 })
    tl.to(topRef.current, { yPercent: -100, duration: 0.8, ease: 'power4.inOut' })
      .to(botRef.current, { yPercent:  100, duration: 0.8, ease: 'power4.inOut' }, '<')
      .to(wrapRef.current, { opacity: 0, duration: 0.3, onComplete: () => onComplete?.() }, '-=0.1')

    return () => clearInterval(iv)
  }, [])

  return (
    <div ref={wrapRef} style={{
      position:'fixed', inset:0, zIndex:9999,
      display:'flex', flexDirection:'column', overflow:'hidden'
    }}>
      <div ref={topRef} style={{
        flex:1, background:'#050510', display:'flex',
        flexDirection:'column', alignItems:'center', justifyContent:'flex-end', paddingBottom:40
      }}>
        <div style={{ fontFamily:'Orbitron,sans-serif', fontSize:56, fontWeight:900,
          color:'#00F0FF', textShadow:'0 0 30px #00F0FF,0 0 60px rgba(0,240,255,0.4)',
          letterSpacing:8, marginBottom:16 }}>
          NEX<span style={{color:'#FF003C',textShadow:'0 0 20px #FF003C'}}>US</span>
        </div>
        <div style={{ width:280, height:2, background:'rgba(0,240,255,0.1)', overflow:'hidden', marginBottom:16 }}>
          <div style={{ height:'100%', width:`${count}%`, background:'#00F0FF',
            boxShadow:'0 0 10px #00F0FF', transition:'width 0.05s' }} />
        </div>
        <div ref={countRef} style={{ fontFamily:'"Share Tech Mono",monospace', fontSize:14,
          color:'rgba(0,240,255,0.7)', letterSpacing:4 }}>
          {String(count).padStart(3,'0')}%
        </div>
        <div style={{ fontFamily:'"Share Tech Mono",monospace', fontSize:10,
          color:'rgba(255,255,255,0.2)', letterSpacing:3, marginTop:8 }}>
          INITIALIZING NEXUS PROTOCOL<span className="blink">_</span>
        </div>
      </div>
      <div ref={botRef} style={{ height:4, background:'linear-gradient(90deg,#FF003C,#00F0FF,#FFE600)' }} />
    </div>
  )
}