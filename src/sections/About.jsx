import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const secRef  = useRef(null);
  const barTop  = useRef(null);
  const barBot  = useRef(null);
  const textRef = useRef(null);
  const terminalRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Cinematic bars close then open to reveal
      const tl = gsap.timeline({
        scrollTrigger: { 
          trigger: secRef.current, 
          start: 'top 70%', 
          toggleActions: 'play none none reverse' 
        }
      });
      
      tl.from(barTop.current, { yPercent: -100, duration: 0.7, ease: 'power3.inOut' })
        .from(barBot.current, { yPercent: 100, duration: 0.7, ease: 'power3.inOut' }, '<')
        .to([barTop.current, barBot.current], { yPercent: 0, duration: 0.05 }) // The flash moment
        .to(barTop.current, { yPercent: -100, duration: 0.6, ease: 'power3.inOut', delay: 0.2 })
        .to(barBot.current, { yPercent: 100, duration: 0.6, ease: 'power3.inOut' }, '<');

      // 2. Text Content Reveal
      gsap.from('.about-p', {
        scrollTrigger: { trigger: textRef.current, start: 'top 75%' },
        y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 0.2
      });

      // 3. Stat Cards Pop-in
      gsap.from('.about-stat-item', {
        scrollTrigger: { trigger: textRef.current, start: 'top 70%' },
        scale: 0.8, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(1.5)', delay: 0.6
      });

      // 4. Terminal Float Animation (Continuous)
      gsap.to(terminalRef.current, {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={secRef} className="relative w-full py-24 md:py-32 px-6 md:px-12 bg-[#020205] overflow-hidden">
      
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40" style={{
        backgroundImage: 'linear-gradient(rgba(0,240,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,240,255,0.04) 1px,transparent 1px)',
        backgroundSize: '50px 50px'
      }}/>
      
      {/* Abstract Glow behind the terminal */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-cyber-cyan/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      {/* Cinematic Bars (GSAP Controlled) */}
      <div ref={barTop} className="absolute top-0 left-0 w-full h-[50vh] bg-black z-[100] -translate-y-full shadow-[0_10px_30px_#00F0FF]"/>
      <div ref={barBot} className="absolute bottom-0 left-0 w-full h-[50vh] bg-black z-[100] translate-y-full shadow-[0_-10px_30px_#FF003C]"/>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Top Tagline */}
        <div className="flex items-center gap-3 mb-8">
          <span className="font-mono text-xs text-cyber-pink tracking-widest">//</span>
          <span className="font-mono text-xs text-cyber-pink tracking-widest uppercase">System_Lore</span>
          <div className="w-16 h-[1px] bg-cyber-pink/40 shadow-[0_0_10px_#FF003C]"/>
        </div>

        {/* Main Content Layout (Responsive Flex instead of rigid grid) */}
        <div ref={textRef} className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">

          {/* LEFT: Lore & Stats */}
          <div className="w-full lg:w-1/2">
            <h2 className="about-p font-orbitron font-black leading-[1.1] mb-6 uppercase" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
              The <span className="text-cyber-cyan drop-shadow-[0_0_20px_rgba(0,240,255,0.6)]">Grid</span><br/>
              <span className="text-transparent" style={{ WebkitTextStroke: '2px #FF003C' }}>Anomaly</span>
            </h2>
            
            <div className="about-p border-l-2 border-cyber-cyan pl-6 mb-8">
              <p className="font-inter text-gray-400 text-lg leading-relaxed mb-4">
                Legacy hackathons are bloated, corporate, and lack the true hacker ethos. Participants navigate broken platforms instead of pushing the boundaries of code. <span className="text-white font-semibold">The system is flawed.</span>
              </p>
              <p className="font-inter text-gray-400 text-lg leading-relaxed">
                NEXUS is the system override. A hyper-immersive, decentralized battleground where elite developers, designers, and web3 architects unite to build the future. No optics. Just pure execution.
              </p>
            </div>

            {/* Interactive Stat Cards Grid */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { val: 'JUL 25', label: 'IGNITION', color: '#00F0FF', shadow: 'hover:shadow-[0_0_20px_#00F0FF]' },
                { val: 'GLOBAL', label: 'SCALE', color: '#FF003C', shadow: 'hover:shadow-[0_0_20px_#FF003C]' },
                { val: 'WEB3', label: 'CORE THEME', color: '#FFE600', shadow: 'hover:shadow-[0_0_20px_#FFE600]' },
                { val: '48 HRS', label: 'TIME LIMIT', color: '#7B2FBE', shadow: 'hover:shadow-[0_0_20px_#7B2FBE]' },
              ].map((s) => (
                <div key={s.label} className={`about-stat-item group relative p-6 bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg transition-all duration-300 hover:-translate-y-2 hover:border-[${s.color}]/50 ${s.shadow} cursor-default overflow-hidden`}>
                  {/* Subtle hover background glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" style={{ backgroundColor: s.color }}></div>
                  
                  <div className="relative z-10 font-orbitron font-black text-2xl md:text-3xl" style={{ color: s.color, textShadow: `0 0 15px ${s.color}50` }}>
                    {s.val}
                  </div>
                  <div className="relative z-10 font-mono text-[10px] text-gray-500 tracking-widest mt-2 group-hover:text-white transition-colors duration-300">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: The Terminal Dashboard */}
          <div className="w-full lg:w-1/2" ref={terminalRef}>
            <div className="relative group rounded-xl overflow-hidden border border-cyber-cyan/30 bg-black/60 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] transition-all duration-500 hover:border-cyber-cyan/80 hover:shadow-[0_0_50px_rgba(0,240,255,0.2)]">
              
              {/* Terminal Header */}
              <div className="px-5 py-3 border-b border-cyber-cyan/20 bg-cyber-cyan/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-cyber-pink shadow-[0_0_8px_#FF003C]"/>
                  <div className="w-3 h-3 rounded-full bg-cyber-yellow shadow-[0_0_8px_#FFE600]"/>
                  <div className="w-3 h-3 rounded-full bg-[#00FF88] shadow-[0_0_8px_#00FF88]"/>
                </div>
                <span className="font-mono text-[10px] text-cyber-cyan/60 tracking-widest uppercase">nexus@mainframe:~/status</span>
              </div>
              
              {/* Terminal Body */}
              <div className="p-8 font-mono text-sm leading-relaxed text-cyber-cyan/80 relative">
                <div className="flex flex-col gap-3">
                  {[
                    ['SYS_STATUS', 'OPERATIONAL', '#00FF88'],
                    ['ACTIVE_NODES', '2,500+ DEV_UNITS', '#00F0FF'],
                    ['GLOBAL_PING', '32 REGIONS', '#00F0FF'],
                    ['ACTIVE_TRACKS', '4 CLUSTERS', '#00F0FF'],
                    ['BOUNTY_POOL', '$50,000 USD', '#FFE600'],
                    ['TIME_REMAINING', '47:59:59', '#FF003C'],
                  ].map(([k, v, color]) => (
                    <div key={k} className="flex items-start md:items-center flex-col md:flex-row gap-1 md:gap-4 hover:bg-white/5 p-1 rounded transition-colors">
                      <span className="text-white/30 shrink-0">{'>'} {k}:</span>
                      <span className="font-bold drop-shadow-[0_0_8px_currentColor]" style={{ color: color }}>{v}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 flex items-center gap-2">
                  <span className="text-cyber-pink font-semibold">{'>'} AWAITING_CONNECTION</span>
                  <span className="w-2 h-4 bg-cyber-cyan animate-pulse shadow-[0_0_10px_#00F0FF]"></span>
                </div>

                {/* Vertical Scanner Line Effect */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyber-cyan to-transparent opacity-50" 
                     style={{ animation: 'scanline 3s linear infinite' }}/>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes scanline { 
          0% { top: 0; opacity: 1; } 
          100% { top: 100%; opacity: 0.1; } 
        }
      `}</style>
    </section>
  );
}