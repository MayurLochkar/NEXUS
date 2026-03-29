/**
 * Contact.jsx
 * DEPS: npm install three gsap framer-motion
 */
import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useWebGL from './useWebGL';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const secRef = useRef(null);
  const canvasRef = useRef(null);
  const formRef = useRef(null);
  const barTop = useRef(null);
  const barBot = useRef(null);

  const [form, setForm] = useState({ team: '', track: 'Web3 & DeFi', name: '', email: '', idea: '' });
  const [status, setStatus] = useState('idle');
  const [typedCmd, setTypedCmd] = useState('');

  useWebGL(canvasRef, { particleCount: 600, hexCount: 7, lineCount: 10, particleColor: 0xff003c, accentColor: 0x00f0ff });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: { trigger: secRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
      })
        .to(barTop.current, { yPercent: -100, duration: 1, ease: 'expo.inOut' })
        .to(barBot.current, { yPercent: 100, duration: 1, ease: 'expo.inOut' }, '<');

      gsap.from('.cnt-header', {
        scrollTrigger: { trigger: secRef.current, start: 'top 78%' },
        y: 36, opacity: 0, duration: .9, stagger: .12, ease: 'power4.out'
      });

      gsap.from(formRef.current, {
        scrollTrigger: { trigger: secRef.current, start: 'top 72%' },
        y: 70, opacity: 0, duration: 1.1, ease: 'power4.out'
      });
    }, secRef);

    // Typing effect
    const cmd = 'nexus@hackathon:~/register $ _';
    let i = 0;
    const iv = setInterval(() => {
      setTypedCmd(cmd.slice(0, i)); i++;
      if (i > cmd.length) clearInterval(iv);
    }, 60);

    return () => { ctx.revert(); clearInterval(iv); };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.team) { setStatus('error'); setTimeout(() => setStatus('idle'), 3000); return; }
    setStatus('loading');
    await new Promise(r => setTimeout(r, 2000));
    setStatus('success');
    setForm({ team: '', track: 'Web3 & DeFi', name: '', email: '', idea: '' });
    setTimeout(() => setStatus('idle'), 5000);
  };

  const inp = "w-full bg-black/40 border border-[rgba(0,240,255,.2)] px-4 py-3 text-white font-mono text-sm outline-none focus:border-[#00F0FF] focus:shadow-[0_0_15px_rgba(0,240,255,.2)] transition-all duration-300 rounded-sm";
  const lbl = "font-mono text-[10px] text-[rgba(0,240,255,.6)] tracking-[0.2em] uppercase block mb-2";

  return (
    <section id="contact" ref={secRef} className="relative py-32 px-6 bg-[#020205] overflow-hidden">

      <div ref={canvasRef} className="absolute inset-0 w-full h-full z-[0] pointer-events-none" />

      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none z-[1] opacity-[.03]" style={{
        backgroundImage: 'linear-gradient(rgba(0,240,255,1)1px,transparent 1px),linear-gradient(90deg,rgba(0,240,255,1)1px,transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      <div ref={barTop} className="absolute top-0 left-0 w-full h-[50.5vh] bg-black z-[50] border-b border-[rgba(255,0,60,.1)]" />
      <div ref={barBot} className="absolute bottom-0 left-0 w-full h-[50.5vh] bg-black z-[50] border-t border-[rgba(0,240,255,.1)]" />

      <div className="relative z-10 max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex flex-col items-center mb-16">
          <div className="cnt-header flex items-center gap-4 mb-4">
            <span className="font-mono text-xs text-[#FF003C] tracking-[0.3em]">//</span>
            <span className="font-mono text-xs text-[#FF003C] tracking-[0.3em] uppercase">Uplink_Terminal</span>
            <div className="w-16 h-[1px] bg-[rgba(255,0,60,.4)]" style={{ boxShadow: '0 0 10px #FF003C' }} />
          </div>
          <h2 className="cnt-header font-orbitron font-black text-white text-center uppercase leading-tight" style={{ fontSize: 'clamp(32px,5vw,56px)' }}>
            Establish{' '}
            <span style={{ color: 'transparent', WebkitTextStroke: '2px #FF003C', filter: 'drop-shadow(0 0 15px rgba(255,0,60,.5))' }}>
              Registration
            </span>
          </h2>
        </div>

        {/* Terminal form */}
        <div ref={formRef} className="relative group bg-black/80 border border-[rgba(0,240,255,.15)] backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,.8)] overflow-hidden rounded-sm">

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-[#FF003C] transition-all duration-500 group-hover:w-16 group-hover:h-16 z-20" />
          <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-[#FF003C] transition-all duration-500 group-hover:w-16 group-hover:h-16 z-20" />

          {/* Terminal bar */}
          <div className="px-5 py-3 border-b border-white/10 bg-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF003C]" style={{ boxShadow: '0 0 10px #FF003C' }} />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFE600]" style={{ boxShadow: '0 0 10px #FFE600' }} />
              <div className="w-2.5 h-2.5 rounded-full bg-[#00FF88]" style={{ boxShadow: '0 0 10px #00FF88' }} />
            </div>
            <span className="font-mono text-[10px] text-[rgba(0,240,255,.5)] tracking-widest uppercase truncate max-w-[160px] sm:max-w-none ml-4 overflow-hidden">{typedCmd}</span>
          </div>

          <form className="p-4 md:p-12 space-y-6 md:space-y-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className={lbl}>{'>'} TEAM_IDENTIFIER *</label>
                <input value={form.team} onChange={e => setForm({ ...form, team: e.target.value })} placeholder="AGENT_NEXUS" className={inp} />
              </div>
              <div>
                <label className={lbl}>{'>'} ASSIGNED_SECTOR</label>
                <select value={form.track} onChange={e => setForm({ ...form, track: e.target.value })} className={`${inp} cursor-pointer appearance-none`}>
                  <option className="bg-[#050510]">Web3 & DeFi</option>
                  <option className="bg-[#050510]">AI & Machine Learning</option>
                  <option className="bg-[#050510]">Cybersecurity</option>
                  <option className="bg-[#050510]">Open Innovation</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className={lbl}>{'>'} LEAD_AGENT_NAME *</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="NEO_ANDERSON" className={inp} />
              </div>
              <div>
                <label className={lbl}>{'>'} SECURE_COMM_LINK *</label>
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="agent@matrix.io" className={inp} />
              </div>
            </div>
            <div>
              <label className={lbl}>{'>'} MISSION_OBJECTIVES</label>
              <textarea value={form.idea} onChange={e => setForm({ ...form, idea: e.target.value })} rows={4} placeholder="Describe the system anomaly you plan to exploit..." className={`${inp} resize-none`} />
            </div>

            <AnimatePresence>
              {status === 'error' && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                  className="font-mono text-xs text-[#FF003C] p-3 border border-[rgba(255,0,60,.2)] bg-[rgba(255,0,60,.05)]">
                  [FATAL_ERROR]: Missing required data clusters. Please check (*) fields.
                </motion.div>
              )}
              {status === 'success' && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                  className="font-mono text-xs text-[#00FF88] p-3 border border-[rgba(0,255,136,.2)] bg-[rgba(0,255,136,.05)]" style={{ boxShadow: '0 0 15px rgba(0,255,136,.1)' }}>
                  [UPLINK_ESTABLISHED]: Data transmitted to the mainframe. Welcome to NEXUS.
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: .98 }} onClick={handleSubmit}
              disabled={status === 'loading' || status === 'success'}
              className="relative w-full py-4 overflow-hidden group/btn font-orbitron font-black text-sm tracking-[0.3em] transition-all duration-300"
              style={{
                background: status === 'success' ? 'rgba(0,255,136,.2)' : status === 'loading' ? 'rgba(0,240,255,.1)' : '#FF003C',
                color: status === 'success' ? '#00FF88' : status === 'loading' ? '#00F0FF' : '#fff',
                clipPath: 'polygon(15px 0,100% 0,100% calc(100% - 15px),calc(100% - 15px) 100%,0 100%,0 15px)',
                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                boxShadow: status === 'idle' ? '0 0 30px rgba(255,0,60,.5)' : 'none'
              }}>
              <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover/btn:left-[100%] transition-all duration-700" />
              <span className="relative z-10">
                {status === 'loading' ? '> ENCRYPTING_PACKETS...' : status === 'success' ? '> CONNECTION_SECURED ✓' : '> EXECUTE_UPLINK_PROTOCOL'}
              </span>
            </motion.button>
          </form>

          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent opacity-20" style={{ animation: 'scan-h 4s linear infinite' }} />
        </div>

        <div className="mt-12 text-center">
          <p className="font-mono text-[10px] text-gray-600 tracking-[0.5em] uppercase">
            // Secure connection enabled // AES-256 standard // Discord: @nexus_hq
          </p>
        </div>
      </div>

      <style>{`@keyframes scan-h{0%{transform:scaleX(0);opacity:0}50%{transform:scaleX(1);opacity:1}100%{transform:scaleX(0);opacity:0}}`}</style>
    </section>
  );
}