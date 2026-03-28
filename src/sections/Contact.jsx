import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const secRef  = useRef(null)
  const formRef = useRef(null)
  const [form, setForm] = useState({ team:'', track:'Web3 & DeFi', name:'', email:'', idea:'' })
  const [status, setStatus] = useState('idle')  // idle | loading | success | error
  const [typedCmd, setTypedCmd] = useState('')

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(formRef.current, {
        scrollTrigger: { trigger: secRef.current, start: 'top 75%' },
        y: 60, opacity: 0, duration: 1, ease: 'power4.out'
      })
    }, secRef)

    // Advanced Typing Effect with Cursor Blink
    const cmd = 'nexus@hackathon:~/register $ _'
    let i = 0
    const iv = setInterval(() => { 
      setTypedCmd(cmd.slice(0, i))
      i++
      if (i > cmd.length) clearInterval(iv) 
    }, 60)
    
    return () => { ctx.revert(); clearInterval(iv) }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.team) { 
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
      return 
    }
    setStatus('loading')
    
    // Simulate Encryption & Transmission
    await new Promise(r => setTimeout(r, 2000))
    setStatus('success')
    // Reset Form
    setForm({ team:'', track:'Web3 & DeFi', name:'', email:'', idea:'' })
    setTimeout(() => setStatus('idle'), 5000)
  }

  const inputStyles = "w-full bg-black/40 border border-cyber-cyan/20 px-4 py-3 text-white font-mono text-sm outline-none focus:border-cyber-cyan focus:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all duration-300 rounded-sm"
  const labelStyles = "font-mono text-[10px] text-cyber-cyan/60 tracking-[0.2em] uppercase block mb-2"

  return (
    <section id="contact" ref={secRef} className="relative py-32 px-6 bg-[#020205] overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(0,240,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,240,255,1) 1px,transparent 1px)',
        backgroundSize: '40px 40px'
      }}/>

      <div className="relative z-10 max-w-3xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-xs text-cyber-pink tracking-[0.3em]">//</span>
            <span className="font-mono text-xs text-cyber-pink tracking-[0.3em] uppercase">Uplink_Terminal</span>
            <div className="w-16 h-[1px] bg-cyber-pink/40 shadow-[0_0_10px_#FF003C]"/>
          </div>
          <h2 className="font-orbitron font-black text-white text-center uppercase leading-tight" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
            Establish <span className="text-transparent" style={{ WebkitTextStroke: '2px #FF003C', filter: 'drop-shadow(0 0 15px rgba(255,0,60,0.5))' }}>Registration</span>
          </h2>
        </div>

        {/* The Main Terminal Form Container */}
        <div ref={formRef} className="relative group bg-black/80 border border-cyber-cyan/15 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden">
          
          {/* Cyberpunk Tech Corner Accents */}
          <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-cyber-pink transition-all duration-500 group-hover:w-16 group-hover:h-16 z-20" />
          <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-cyber-pink transition-all duration-500 group-hover:w-16 group-hover:h-16 z-20" />

          {/* Terminal Bar */}
          <div className="px-5 py-3 border-b border-white/10 bg-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-cyber-pink shadow-[0_0_10px_#FF003C]" />
              <div className="w-2.5 h-2.5 rounded-full bg-cyber-yellow shadow-[0_0_10px_#FFE600]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#00FF88] shadow-[0_0_10px_#00FF88]" />
            </div>
            <span className="font-mono text-[10px] text-cyber-cyan/50 tracking-widest uppercase truncate ml-4">
              {typedCmd}
            </span>
          </div>

          <form className="p-8 md:p-12 space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Team Name */}
              <div className="space-y-1">
                <label className={labelStyles}>{'>'} TEAM_IDENTIFIER *</label>
                <input 
                  value={form.team} 
                  onChange={e => setForm({...form, team: e.target.value})}
                  placeholder="AGENT_NEXUS" 
                  className={inputStyles} 
                />
              </div>

              {/* Track Select */}
              <div className="space-y-1">
                <label className={labelStyles}>{'>'} ASSIGNED_SECTOR</label>
                <select 
                  value={form.track} 
                  onChange={e => setForm({...form, track: e.target.value})}
                  className={`${inputStyles} cursor-pointer appearance-none`}
                >
                  <option className="bg-[#050510]">Web3 & DeFi</option>
                  <option className="bg-[#050510]">AI & Machine Learning</option>
                  <option className="bg-[#050510]">Cybersecurity</option>
                  <option className="bg-[#050510]">Open Innovation</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* User Name */}
              <div className="space-y-1">
                <label className={labelStyles}>{'>'} LEAD_AGENT_NAME *</label>
                <input 
                  value={form.name} 
                  onChange={e => setForm({...form, name: e.target.value})}
                  placeholder="NEO_ANDERSON" 
                  className={inputStyles} 
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className={labelStyles}>{'>'} SECURE_COMM_LINK *</label>
                <input 
                  type="email" 
                  value={form.email} 
                  onChange={e => setForm({...form, email: e.target.value})}
                  placeholder="agent@matrix.io" 
                  className={inputStyles} 
                />
              </div>
            </div>

            {/* Project Idea */}
            <div className="space-y-1">
              <label className={labelStyles}>{'>'} MISSION_OBJECTIVES</label>
              <textarea 
                value={form.idea} 
                onChange={e => setForm({...form, idea: e.target.value})}
                rows={4} 
                placeholder="Describe the system anomaly you plan to exploit..."
                className={`${inputStyles} resize-none`}
              />
            </div>

            {/* Status Messages */}
            <AnimatePresence>
              {status === 'error' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                  className="font-mono text-xs text-cyber-pink p-3 border border-cyber-pink/20 bg-cyber-pink/5"
                >
                  [FATAL_ERROR]: Missing required data clusters. Please check (*) fields.
                </motion.div>
              )}

              {status === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                  className="font-mono text-xs text-[#00FF88] p-3 border border-[#00FF88]/20 bg-[#00FF88]/5 shadow-[0_0_15px_rgba(0,255,136,0.1)]"
                >
                  [UPLINK_ESTABLISHED]: Data transmitted to the mainframe. Welcome to NEXUS.
                </motion.div>
              )}
            </AnimatePresence>

            {/* Execute Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={status === 'loading' || status === 'success'}
              className="relative w-full py-4 overflow-hidden group/btn font-orbitron font-black text-sm tracking-[0.3em] transition-all duration-300"
              style={{
                background: status === 'success' ? 'rgba(0,255,136,0.2)' : status === 'loading' ? 'rgba(0,240,255,0.1)' : '#FF003C',
                color: status === 'success' ? '#00FF88' : status === 'loading' ? '#00F0FF' : '#fff',
                clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)',
                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                boxShadow: status === 'idle' ? '0 0 30px rgba(255,0,60,0.5)' : 'none'
              }}
            >
              {/* Animated Inner Glitch Line */}
              <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover/btn:left-[100%] transition-all duration-700" />
              
              <span className="relative z-10">
                {status === 'loading' ? '> ENCRYPTING_PACKETS...' : 
                 status === 'success' ? '> CONNECTION_SECURED ✓' : 
                 '> EXECUTE_UPLINK_PROTOCOL'}
              </span>
            </motion.button>
          </form>

          {/* Bottom Scanner Decoration */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-cyber-cyan to-transparent opacity-20" 
               style={{ animation: 'scan-h 4s linear infinite' }} />
        </div>

        {/* Global Footer Tag */}
        <div className="mt-12 text-center">
          <p className="font-mono text-[10px] text-gray-600 tracking-[0.5em] uppercase">
            // Secure connection enabled // AES-256 standard // Discord: @nexus_hq
          </p>
        </div>
      </div>

      <style>{`
        @keyframes scan-h { 0% { transform: scaleX(0); opacity: 0; } 50% { transform: scaleX(1); opacity: 1; } 100% { transform: scaleX(0); opacity: 0; } }
      `}</style>
    </section>
  )
}