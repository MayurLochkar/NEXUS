import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const events = [
  { phase: 'PHASE_01', date:'JUNE 1, 2026', title:'System Ignition // Registration', desc:'Portal goes live. Early bird teams get exclusive system access and mentorship slots.', color:'#00F0FF', align:'left' },
  { phase: 'PHASE_02', date:'JULY 1, 2026', title:'Squad Lockdown', desc:'Finalize your crew of 2–4 members. Lone wolves (solo entries) are also accepted into the grid.', color:'#FF003C', align:'right' },
  { phase: 'PHASE_03', date:'JULY 15, 2026', title:'Skill Inject // Workshops', desc:'Live encrypted streams on Web3, AI, and Cybersecurity from industry masters.', color:'#FFE600', align:'left' },
  { phase: 'PHASE_04', date:'JULY 25, 2026', title:'The Hack Begins // 00:00', desc:'48-hour countdown starts. The firewall drops. Build, create, innovate, and survive.', color:'#00F0FF', align:'right' },
  { phase: 'PHASE_05', date:'JULY 27, 2026', title:'Code Freeze // Demo Day', desc:'Upload your source code and prepare your pitches for the Master Control Program.', color:'#7B2FBE', align:'left' },
  { phase: 'PHASE_06', date:'AUG 1, 2026', title:'Bounty Claim // Winners', desc:'Global livestreamed awards ceremony. Champions claim their bounty and eternal glory.', color:'#00FF88', align:'right' },
];

export default function Timeline() {
  const secRef  = useRef(null);
  const lineRef = useRef(null);
  const eventsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Center Glowing Line Animation (Grows down as you scroll)
      if (lineRef.current) {
        gsap.fromTo(lineRef.current, 
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: 'top center',
            scrollTrigger: { 
              trigger: secRef.current, 
              start: 'top 60%', 
              end: 'bottom 80%', 
              scrub: 1 
            },
            ease: 'none'
          }
        );
      }

      // 2. Timeline Cards Pop-in Animation
      eventsRef.current.forEach((el, i) => {
        // Mobile par sab left se aayenge, desktop par left/right se
        const isLeft = events[i].align === 'left';
        
        gsap.fromTo(el, 
          { opacity: 0, x: isLeft ? -50 : 50, y: 30 },
          {
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            },
            opacity: 1, x: 0, y: 0, 
            duration: 0.8, 
            ease: 'back.out(1.2)'
          }
        );
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="timeline" ref={secRef} className="relative w-full py-32 bg-[#020205] overflow-hidden">
      
      {/* Background Grid & Glows */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage:'linear-gradient(rgba(0,240,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,240,255,1) 1px,transparent 1px)',
        backgroundSize:'40px 40px'
      }}/>
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-cyber-pink/5 blur-[120px] rounded-full pointer-events-none"/>
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-cyber-cyan/5 blur-[120px] rounded-full pointer-events-none"/>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-24">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-xs text-cyber-pink tracking-[0.3em]">//</span>
            <span className="font-mono text-xs text-cyber-pink tracking-[0.3em] uppercase">Chronology</span>
            <div className="w-16 h-[1px] bg-cyber-pink/40 shadow-[0_0_10px_#FF003C]"/>
          </div>
          <h2 className="font-orbitron font-black text-white text-center uppercase leading-tight" style={{ fontSize: 'clamp(32px, 5vw, 60px)' }}>
            Mission <span className="text-transparent" style={{ WebkitTextStroke: '2px #FF003C', filter: 'drop-shadow(0 0 15px rgba(255,0,60,0.5))' }}>Timeline</span>
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          
          {/* THE GLOWING CENTER LINE (Desktop: Center, Mobile: Left) */}
          <div ref={lineRef} 
               className="absolute top-0 bottom-0 w-[2px] md:left-1/2 left-[19px] md:-translate-x-1/2 rounded-full origin-top"
               style={{ 
                 background: 'linear-gradient(180deg, transparent 0%, #00F0FF 10%, #FF003C 90%, transparent 100%)',
                 boxShadow: '0 0 15px rgba(0,240,255,0.5)'
               }}
          />

          {/* Timeline Events */}
          <div className="flex flex-col gap-12 md:gap-24">
            {events.map((ev, i) => (
              <div key={i} 
                   ref={el => eventsRef.current[i] = el} 
                   className={`relative flex items-center w-full ${ev.align === 'left' ? 'md:justify-start' : 'md:justify-end'} justify-start`}
              >
                
                {/* THE NODE (DOT) */}
                <div className="absolute md:left-1/2 left-[20px] md:-translate-x-1/2 -translate-x-1/2 flex items-center justify-center z-20">
                  {/* Outer Pulsing Ring */}
                  <div className="absolute w-8 h-8 rounded-full animate-ping opacity-30" style={{ backgroundColor: ev.color }}/>
                  {/* Inner Solid Dot */}
                  <div className="w-4 h-4 rounded-full border-2 border-[#020205] relative z-10" 
                       style={{ backgroundColor: ev.color, boxShadow: `0 0 20px ${ev.color}` }}/>
                </div>

                {/* EVENT CARD */}
                {/* Mobile: Full width minus padding. Desktop: Half width minus padding */}
                <div className="w-full pl-16 md:pl-0 md:w-[45%] group cursor-default">
                  
                  <div className="relative p-6 md:p-8 bg-black/40 backdrop-blur-md rounded-xl border border-white/5 transition-all duration-500 hover:-translate-y-2"
                       style={{ 
                         boxShadow: '0 10px 30px -10px rgba(0,0,0,0.8)'
                       }}
                       onMouseEnter={e => {
                         e.currentTarget.style.borderColor = `${ev.color}60`;
                         e.currentTarget.style.boxShadow = `0 15px 35px -5px ${ev.color}20, inset 0 0 20px ${ev.color}10`;
                       }}
                       onMouseLeave={e => {
                         e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                         e.currentTarget.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.8)';
                       }}
                  >
                    {/* Cyberpunk Tech Corner Accents */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l opacity-50 transition-colors duration-300" style={{ borderColor: ev.color }}/>
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r opacity-50 transition-colors duration-300" style={{ borderColor: ev.color }}/>

                    {/* Meta Data (Phase & Date) */}
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-mono text-[10px] tracking-widest px-2 py-1 bg-white/5 rounded-sm" style={{ color: ev.color }}>
                        [{ev.phase}]
                      </span>
                      <span className="font-mono text-xs tracking-widest text-gray-400 group-hover:text-white transition-colors duration-300">
                        {ev.date}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-orbitron text-xl md:text-2xl font-bold text-white mb-3 tracking-wide" style={{ textShadow: `0 0 10px ${ev.color}40` }}>
                      {ev.title}
                    </h3>

                    {/* Description */}
                    <p className="font-inter text-sm md:text-base text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {ev.desc}
                    </p>

                    {/* Abstract Data Bar (Decorative) */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500" style={{ background: ev.color, boxShadow: `0 0 10px ${ev.color}` }}/>
                  </div>

                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}