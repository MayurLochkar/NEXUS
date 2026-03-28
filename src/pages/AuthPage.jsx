import { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'

/* ── Pixel-art hacker character via CSS ── */
function HackerCharacter({ mood }) {
  const bodyRef = useRef(null)

  useEffect(() => {
    if (!bodyRef.current) return
    const ctx = gsap.context(() => {
      if (mood === 'idle') {
        gsap.to(bodyRef.current, { y: -8, duration: 1.2, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      }
      if (mood === 'typing') {
        gsap.to(bodyRef.current, { y: -3, duration: 0.2, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      }
      if (mood === 'push') {
        gsap.to(bodyRef.current, { x: 300, duration: 0.6, ease: 'power3.in' })
      }
      if (mood === 'celebrate') {
        gsap.timeline()
          .to(bodyRef.current, { y: -30, duration: 0.3, ease: 'power2.out' })
          .to(bodyRef.current, { y: 0,   duration: 0.3, ease: 'bounce.out' })
          .to(bodyRef.current, { rotate: 10, duration: 0.1, yoyo: true, repeat: 5 })
      }
    }, bodyRef)
    return () => ctx.revert()
  }, [mood])

  return (
    <div ref={bodyRef} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:0, userSelect:'none' }}>
      {/* Head */}
      <div style={{
        width:64, height:64, background:'#0a0a1a',
        border:'2px solid #00F0FF', borderRadius:8,
        display:'flex', alignItems:'center', justifyContent:'center',
        position:'relative', boxShadow:'0 0 20px rgba(0,240,255,0.3)'
      }}>
        {/* Eyes */}
        <div style={{ display:'flex', gap:12 }}>
          <div style={{
            width:12, height: mood==='typing' ? 8 : 12,
            background: mood==='celebrate' ? '#FFE600' : '#00F0FF',
            borderRadius:2,
            boxShadow:`0 0 8px ${mood==='celebrate'?'#FFE600':'#00F0FF'}`,
            transition:'all 0.2s'
          }}/>
          <div style={{
            width:12, height: mood==='typing' ? 8 : 12,
            background: mood==='celebrate' ? '#FFE600' : '#00F0FF',
            borderRadius:2,
            boxShadow:`0 0 8px ${mood==='celebrate'?'#FFE600':'#00F0FF'}`,
            transition:'all 0.2s'
          }}/>
        </div>
        {/* Mouth */}
        <div style={{
          position:'absolute', bottom:12, left:'50%', transform:'translateX(-50%)',
          width: mood==='celebrate' ? 28 : 20,
          height: mood==='celebrate' ? 8 : 4,
          background: mood==='celebrate' ? '#FF003C' : '#00F0FF',
          borderRadius: mood==='celebrate' ? '0 0 8px 8px' : 2,
          boxShadow:'0 0 6px #FF003C',
          transition:'all 0.3s'
        }}/>
        {/* Antenna */}
        <div style={{
          position:'absolute', top:-20, left:'50%', transform:'translateX(-50%)',
          width:2, height:20, background:'#00F0FF'
        }}>
          <div style={{ width:6,height:6,background:'#FF003C',borderRadius:'50%',
            position:'absolute',top:-3,left:-2,boxShadow:'0 0 8px #FF003C',
            animation:'pulse-ring 1s ease-out infinite'
          }}/>
        </div>
        {/* VR Visor */}
        <div style={{
          position:'absolute', top:16, left:-4, right:-4, height:16,
          background:'rgba(0,240,255,0.06)', border:'1px solid rgba(0,240,255,0.3)',
          borderRadius:2
        }}/>
      </div>
      {/* Neck */}
      <div style={{ width:8, height:8, background:'#0a0a1a', border:'1px solid rgba(0,240,255,0.3)' }}/>
      {/* Body */}
      <div style={{
        width:80, height:72, background:'#0a0a1a',
        border:'2px solid rgba(0,240,255,0.4)', borderRadius:4,
        display:'flex', alignItems:'center', justifyContent:'center',
        position:'relative', boxShadow:'inset 0 0 20px rgba(0,240,255,0.05)'
      }}>
        {/* Chest screen */}
        <div style={{
          width:44, height:32, background:'rgba(0,0,0,0.6)',
          border:'1px solid rgba(0,240,255,0.3)', borderRadius:2,
          overflow:'hidden', display:'flex', flexDirection:'column',
          alignItems:'center', justifyContent:'center', gap:3
        }}>
          {[0,1,2].map(i => (
            <div key={i} style={{
              height:2, width:`${60+i*10}%`, background:'#00F0FF',
              opacity: mood==='typing'?1:0.4, borderRadius:1,
              animation: mood==='typing' ? `blink-caret ${0.5+i*0.2}s step-end infinite` : 'none'
            }}/>
          ))}
        </div>
      </div>
      {/* Arms */}
      <div style={{ display:'flex', gap:4, marginTop:-4 }}>
        <div style={{
          width:16, height:48, background:'#0a0a1a',
          border:'1.5px solid rgba(0,240,255,0.3)', borderRadius:'4px 4px 8px 8px',
          transform: mood==='push' ? 'rotate(-30deg)' : mood==='celebrate' ? 'rotate(-20deg)' : 'rotate(-8deg)',
          transformOrigin:'top center', transition:'transform 0.3s'
        }}/>
        <div style={{ width:84 }}/>
        <div style={{
          width:16, height:48, background:'#0a0a1a',
          border:'1.5px solid rgba(0,240,255,0.3)', borderRadius:'4px 4px 8px 8px',
          transform: mood==='push' ? 'rotate(30deg)' : mood==='celebrate' ? 'rotate(20deg)' : 'rotate(8deg)',
          transformOrigin:'top center', transition:'transform 0.3s'
        }}/>
      </div>
      {/* Legs */}
      <div style={{ display:'flex', gap:12, marginTop:4 }}>
        <div style={{
          width:20, height:40, background:'#0a0a1a',
          border:'1.5px solid rgba(0,240,255,0.2)', borderRadius:'2px 2px 6px 6px'
        }}/>
        <div style={{
          width:20, height:40, background:'#0a0a1a',
          border:'1.5px solid rgba(0,240,255,0.2)', borderRadius:'2px 2px 6px 6px'
        }}/>
      </div>
      {/* Shadow */}
      <div style={{
        width:60, height:8, background:'radial-gradient(ellipse,rgba(0,240,255,0.2),transparent)',
        borderRadius:'50%', marginTop:4
      }}/>
      {/* Label */}
      <div style={{ fontFamily:'"Share Tech Mono",monospace', fontSize:9,
        color:'rgba(0,240,255,0.5)', letterSpacing:2, marginTop:4 }}>
        {mood==='idle'?'AGENT_X':mood==='typing'?'HACKING...':mood==='celebrate'?'ACCESS GRANTED!':'PUSHING...'}
      </div>
    </div>
  )
}

/* ── Floating particles bg ── */
function ParticlesBg() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const c = canvasRef.current
    const ctx = c.getContext('2d')
    let W = c.width = window.innerWidth
    let H = c.height = window.innerHeight
    window.addEventListener('resize', () => { W=c.width=window.innerWidth; H=c.height=window.innerHeight })
    const pts = Array.from({length:120},()=>({
      x:Math.random()*W, y:Math.random()*H,
      vx:(Math.random()-.5)*.4, vy:(Math.random()-.5)*.4, a:Math.random()
    }))
    let raf
    function draw() {
      ctx.clearRect(0,0,W,H)
      pts.forEach(p=>{
        p.x+=p.vx; p.y+=p.vy; p.a+=.008
        if(p.x<0)p.x=W; if(p.x>W)p.x=0
        if(p.y<0)p.y=H; if(p.y>H)p.y=0
        ctx.beginPath()
        ctx.arc(p.x,p.y,1.2,0,Math.PI*2)
        ctx.fillStyle=`rgba(0,240,255,${.3+Math.sin(p.a)*.2})`
        ctx.fill()
      })
      for(let i=0;i<pts.length;i++)
        for(let j=i+1;j<pts.length;j++){
          const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y
          const d=Math.sqrt(dx*dx+dy*dy)
          if(d<90){
            ctx.beginPath(); ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y)
            ctx.strokeStyle=`rgba(0,240,255,${(1-d/90)*.12})`; ctx.lineWidth=.5; ctx.stroke()
          }
        }
      raf=requestAnimationFrame(draw)
    }
    draw()
    return ()=>cancelAnimationFrame(raf)
  },[])
  return <canvas ref={canvasRef} style={{position:'fixed',inset:0,zIndex:0,pointerEvents:'none'}}/>
}

export default function AuthPage() {
  const navigate   = useNavigate()
  const formRef    = useRef(null)
  const pageRef    = useRef(null)
  const barTop     = useRef(null)
  const barBot     = useRef(null)
  const [mood,     setMood]     = useState('idle')
  const [tab,      setTab]      = useState('login')   // login | signup
  const [email,    setEmail]    = useState('')
  const [pass,     setPass]     = useState('')
  const [name,     setName]     = useState('')
  const [loading,  setLoading]  = useState(false)
  const [err,      setErr]      = useState('')
  const [typed,    setTyped]    = useState('')

  /* typing effect on mount */
  useEffect(()=>{
    const msg = '> NEXUS LOGIN TERMINAL v2.5_'
    let i=0
    const iv=setInterval(()=>{
      setTyped(msg.slice(0,i))
      i++
      if(i>msg.length) clearInterval(iv)
    },60)
    return ()=>clearInterval(iv)
  },[])

  /* detect typing → change mood */
  const handleInput = v => {
    setMood('typing')
    setTimeout(()=>setMood('idle'),800)
    return v
  }

  /* cinematic transition */
  const doTransition = () => {
    setMood('push')
    const tl = gsap.timeline()
    // form slides out
    tl.to(formRef.current,  { x: 600, opacity:0, duration:.6, ease:'power3.in' })
    // letterbox bars close
    .fromTo(barTop.current, { yPercent:-100 }, { yPercent:0, duration:.5, ease:'power3.inOut' })
    .fromTo(barBot.current, { yPercent: 100 }, { yPercent:0, duration:.5, ease:'power3.inOut' }, '<')
    // flash + navigate
    .to(pageRef.current, { opacity:0, duration:.3, onComplete:()=>navigate('/main') })
  }

  const handleLogin = async () => {
    if(!email||!pass){ setErr('> ERROR: Fill all fields'); return }
    setLoading(true); setErr('')
    setMood('typing')
    /* DUMMY LOGIN — works without Firebase */
    await new Promise(r=>setTimeout(r,1400))
    setMood('celebrate')
    setLoading(false)
    setTimeout(doTransition, 900)
  }

  const handleGoogle = async () => {
    setLoading(true)
    setMood('typing')
    await new Promise(r=>setTimeout(r,1200))
    setMood('celebrate')
    setLoading(false)
    setTimeout(doTransition, 900)
  }

  return (
    <div ref={pageRef} style={{
      minHeight:'100vh', background:'#050510', display:'flex',
      alignItems:'center', justifyContent:'center',
      position:'relative', overflow:'hidden'
    }}>
      {/* particles */}
      <ParticlesBg/>

      {/* grid lines */}
      <div style={{
        position:'absolute', inset:0, zIndex:0,
        backgroundImage:'linear-gradient(rgba(0,240,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,240,255,0.03) 1px,transparent 1px)',
        backgroundSize:'50px 50px'
      }}/>

      {/* scanlines */}
      <div style={{
        position:'absolute',inset:0,zIndex:1,pointerEvents:'none',
        background:'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.06) 2px,rgba(0,0,0,0.06) 4px)'
      }}/>

      {/* cinematic bars */}
      <div ref={barTop} style={{
        position:'fixed',top:0,left:0,right:0,height:'50vh',
        background:'#000',zIndex:800,transform:'translateY(-100%)'
      }}/>
      <div ref={barBot} style={{
        position:'fixed',bottom:0,left:0,right:0,height:'50vh',
        background:'#000',zIndex:800,transform:'translateY(100%)'
      }}/>

      {/* main layout */}
      <div style={{
        position:'relative',zIndex:10,
        display:'flex',alignItems:'center',justifyContent:'center',
        gap:80, padding:'40px 20px', width:'100%', maxWidth:1000
      }}>

        {/* LEFT — Character */}
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:24,
          flex:'0 0 auto' }}>
          <HackerCharacter mood={mood}/>
          {/* terminal log */}
          <div style={{
            fontFamily:'"Share Tech Mono",monospace', fontSize:10,
            color:'rgba(0,240,255,0.4)', textAlign:'center', lineHeight:1.8
          }}>
            <div style={{color:'rgba(0,240,255,0.25)'}}>{'>'} SCANNING BIOMETRICS...</div>
            <div style={{color:'rgba(255,0,60,0.5)'}}>{'>'} FIREWALL BYPASSED</div>
            <div style={{color:'rgba(0,240,255,0.4)'}}>{'>'} AWAITING AUTH<span className="blink">_</span></div>
          </div>
        </div>

        {/* RIGHT — Form */}
        <div ref={formRef} style={{
          width:'100%', maxWidth:420,
          border:'1px solid rgba(0,240,255,0.2)',
          background:'rgba(5,5,16,0.92)',
          backdropFilter:'blur(20px)',
          padding:40, position:'relative'
        }}>
          {/* corner accents */}
          {[{top:0,left:0},{top:0,right:0},{bottom:0,left:0},{bottom:0,right:0}].map((s,i)=>(
            <div key={i} style={{
              position:'absolute', width:12, height:12, ...s,
              borderTop: (s.top===0)?'2px solid #00F0FF':'none',
              borderBottom:(s.bottom===0)?'2px solid #00F0FF':'none',
              borderLeft: (s.left===0)?'2px solid #00F0FF':'none',
              borderRight:(s.right===0)?'2px solid #00F0FF':'none',
            }}/>
          ))}

          {/* terminal header */}
          <div style={{
            fontFamily:'"Share Tech Mono",monospace', fontSize:11,
            color:'rgba(0,240,255,0.5)', letterSpacing:2, marginBottom:24
          }}>{typed}</div>

          {/* tabs */}
          <div style={{ display:'flex', gap:0, marginBottom:32,
            borderBottom:'1px solid rgba(0,240,255,0.1)' }}>
            {['login','signup'].map(t=>(
              <button key={t} onClick={()=>setTab(t)} style={{
                flex:1, padding:'10px 0', background:'none',
                border:'none', borderBottom: tab===t?'2px solid #00F0FF':'2px solid transparent',
                color: tab===t?'#00F0FF':'rgba(255,255,255,0.3)',
                fontFamily:'Orbitron,sans-serif', fontSize:11, fontWeight:700,
                letterSpacing:2, cursor:'pointer', textTransform:'uppercase',
                transition:'all .3s', marginBottom:-1
              }}>{t==='login'?'LOGIN':'SIGN UP'}</button>
            ))}
          </div>

          {/* fields */}
          {tab==='signup'&&(
            <div style={{marginBottom:16}}>
              <label style={{fontFamily:'"Share Tech Mono",monospace',fontSize:10,
                color:'rgba(0,240,255,0.6)',letterSpacing:2,display:'block',marginBottom:6}}>
                {'>'} AGENT NAME
              </label>
              <input value={name} onChange={e=>{setName(handleInput(e.target.value))}}
                placeholder="AGENT_47" style={{
                  width:'100%',background:'rgba(0,0,0,0.4)',
                  border:'1px solid rgba(0,240,255,0.25)',color:'#fff',
                  padding:'11px 14px',fontFamily:'"Share Tech Mono",monospace',fontSize:13,
                  outline:'none',transition:'border .3s'
                }}
                onFocus={e=>e.target.style.borderColor='#00F0FF'}
                onBlur={e=>e.target.style.borderColor='rgba(0,240,255,0.25)'}
              />
            </div>
          )}

          <div style={{marginBottom:16}}>
            <label style={{fontFamily:'"Share Tech Mono",monospace',fontSize:10,
              color:'rgba(0,240,255,0.6)',letterSpacing:2,display:'block',marginBottom:6}}>
              {'>'} EMAIL
            </label>
            <input type="email" value={email} onChange={e=>{setEmail(handleInput(e.target.value))}}
              placeholder="you@nexus.io" style={{
                width:'100%',background:'rgba(0,0,0,0.4)',
                border:'1px solid rgba(0,240,255,0.25)',color:'#fff',
                padding:'11px 14px',fontFamily:'"Share Tech Mono",monospace',fontSize:13,
                outline:'none',transition:'border .3s'
              }}
              onFocus={e=>e.target.style.borderColor='#00F0FF'}
              onBlur={e=>e.target.style.borderColor='rgba(0,240,255,0.25)'}
            />
          </div>

          <div style={{marginBottom:8}}>
            <label style={{fontFamily:'"Share Tech Mono",monospace',fontSize:10,
              color:'rgba(0,240,255,0.6)',letterSpacing:2,display:'block',marginBottom:6}}>
              {'>'} PASSWORD
            </label>
            <input type="password" value={pass} onChange={e=>{setPass(handleInput(e.target.value))}}
              placeholder="••••••••" style={{
                width:'100%',background:'rgba(0,0,0,0.4)',
                border:'1px solid rgba(0,240,255,0.25)',color:'#fff',
                padding:'11px 14px',fontFamily:'"Share Tech Mono",monospace',fontSize:13,
                outline:'none',transition:'border .3s'
              }}
              onFocus={e=>e.target.style.borderColor='#00F0FF'}
              onBlur={e=>e.target.style.borderColor='rgba(0,240,255,0.25)'}
            />
          </div>

          {err&&<div style={{fontFamily:'"Share Tech Mono",monospace',fontSize:11,
            color:'#FF003C',marginBottom:12,letterSpacing:1}}>{err}</div>}

          {/* main btn */}
          <button onClick={handleLogin} disabled={loading} style={{
            width:'100%', marginTop:16,
            padding:'13px 0', background: loading?'rgba(0,240,255,0.1)':'#FF003C',
            border: loading?'1px solid #00F0FF':'none',
            color: loading?'#00F0FF':'#fff',
            fontFamily:'Orbitron,sans-serif', fontSize:12, fontWeight:700,
            letterSpacing:2, cursor: loading?'not-allowed':'pointer',
            clipPath:'polygon(8px 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%,0 8px)',
            transition:'all .3s',
            boxShadow: loading?'0 0 20px rgba(0,240,255,0.3)':'0 0 20px rgba(255,0,60,0.4)'
          }}>
            {loading ? '> AUTHENTICATING...' : tab==='login'?'> EXECUTE LOGIN':'> CREATE ACCOUNT'}
          </button>

          {/* divider */}
          <div style={{display:'flex',alignItems:'center',gap:12,margin:'20px 0'}}>
            <div style={{flex:1,height:1,background:'rgba(255,255,255,0.07)'}}/>
            <span style={{fontFamily:'"Share Tech Mono",monospace',fontSize:10,
              color:'rgba(255,255,255,0.2)',letterSpacing:2}}>OR</span>
            <div style={{flex:1,height:1,background:'rgba(255,255,255,0.07)'}}/>
          </div>

          {/* google btn */}
          <button onClick={handleGoogle} disabled={loading} style={{
            width:'100%', padding:'12px 0',
            background:'rgba(255,255,255,0.04)',
            border:'1px solid rgba(255,255,255,0.12)',
            color:'rgba(255,255,255,0.75)',
            fontFamily:'Orbitron,sans-serif', fontSize:11, fontWeight:600,
            letterSpacing:1.5, cursor:'pointer', display:'flex',
            alignItems:'center', justifyContent:'center', gap:10, transition:'all .3s'
          }}
          onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,0.09)';e.currentTarget.style.borderColor='rgba(255,255,255,0.25)'}}
          onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.04)';e.currentTarget.style.borderColor='rgba(255,255,255,0.12)'}}>
            {/* Google SVG */}
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            CONTINUE WITH GOOGLE
          </button>

          <div style={{
            marginTop:20,textAlign:'center',
            fontFamily:'"Share Tech Mono",monospace',fontSize:10,
            color:'rgba(255,255,255,0.2)',letterSpacing:1
          }}>
            {tab==='login'
              ? <span>No account? <span onClick={()=>setTab('signup')} style={{color:'#00F0FF',cursor:'pointer'}}>Register here</span></span>
              : <span>Have account? <span onClick={()=>setTab('login')} style={{color:'#00F0FF',cursor:'pointer'}}>Login</span></span>
            }
          </div>
        </div>
      </div>
    </div>
  )
}