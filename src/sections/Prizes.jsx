/**
 * Prizes.jsx
 * DEPS: npm install three gsap framer-motion
 */
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useWebGL from './useWebGL';

gsap.registerPlugin(ScrollTrigger);

const prizes = [
  { rank: 'Runner Up', amount: '$15,000', color: '#00F0FF', label: 'Silver', perks: ['Internship Offers', 'Global Recognition', 'Exclusive Merch'], grand: false },
  { rank: 'Grand Champion', amount: '$25,000', color: '#FFE600', label: 'Gold', perks: ['VC Pitch Session', '1-Year Mentorship', 'Global Recognition', 'Merch Kit'], grand: true },
  { rank: '2nd Runner Up', amount: '$10,000', color: '#FF003C', label: 'Bronze', perks: ['Internship Offers', 'System Recognition', 'Exclusive Swag'], grand: false },
];

export default function Prizes() {
  const secRef = useRef(null);
  const canvasRef = useRef(null);
  const barTop = useRef(null);
  const barBot = useRef(null);

  useWebGL(canvasRef, { particleCount: 700, hexCount: 9, lineCount: 14, particleColor: 0xffe600, accentColor: 0xff003c });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: { trigger: secRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
      })
        .to(barTop.current, { yPercent: -100, duration: 1, ease: 'expo.inOut' })
        .to(barBot.current, { yPercent: 100, duration: 1, ease: 'expo.inOut' }, '<');

      // Header
      gsap.from('.prz-header', {
        scrollTrigger: { trigger: secRef.current, start: 'top 78%' },
        y: 40, opacity: 0, duration: .9, stagger: .12, ease: 'power4.out'
      });

      // Cards pop
      gsap.fromTo('.prize-card',
        { y: 80, opacity: 0, scale: 0.88 },
        {
          scrollTrigger: { trigger: secRef.current, start: 'top 72%' },
          y: 0, opacity: 1, scale: 1, duration: .85, stagger: .18, ease: 'back.out(1.3)'
        }
      );

      // Footer tag
      gsap.from('.prz-footer', {
        scrollTrigger: { trigger: secRef.current, start: 'bottom 90%' },
        opacity: 0, y: 20, duration: .8, ease: 'power2.out'
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="prizes" ref={secRef} className="relative w-full py-32 px-6 bg-[#020205] overflow-hidden">

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none" />

      {/* Ambient blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none z-[1]" style={{ background: 'radial-gradient(ellipse,rgba(255,230,0,.06),transparent 70%)' }} />
      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none z-[1] opacity-[.025]" style={{
        backgroundImage: 'linear-gradient(rgba(255,230,0,1)1px,transparent 1px),linear-gradient(90deg,rgba(255,230,0,1)1px,transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      <div ref={barTop} className="absolute top-0 left-0 w-full h-[50.5vh] bg-black z-[50] border-b border-[rgba(255,230,0,.1)]" />
      <div ref={barBot} className="absolute bottom-0 left-0 w-full h-[50.5vh] bg-black z-[50] border-t border-[rgba(255,230,0,.1)]" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col items-center mb-20">
          <div className="prz-header flex items-center gap-4 mb-4">
            <span className="font-mono text-xs text-[#FFE600] tracking-[0.3em]">//</span>
            <span className="font-mono text-xs text-[#FFE600] tracking-[0.3em] uppercase">Rewards</span>
            <div className="w-16 h-[1px] bg-[rgba(255,230,0,.4)]" style={{ boxShadow: '0 0 10px #FFE600' }} />
          </div>
          <h2 className="prz-header font-orbitron font-black text-white text-center uppercase leading-tight" style={{ fontSize: 'clamp(32px,5vw,60px)' }}>
            System{' '}
            <span style={{ color: 'transparent', WebkitTextStroke: '2px #FFE600', filter: 'drop-shadow(0 0 15px rgba(255,230,0,0.5))' }}>
              Bounties
            </span>
          </h2>
        </div>

        {/* Podium grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 items-end lg:px-10">
          {prizes.map(p => (
            <motion.div key={p.rank}
              className={`prize-card relative flex flex-col items-center bg-[rgba(5,5,10,.82)] backdrop-blur-md rounded-xl overflow-hidden cursor-default transition-all duration-500 ${p.grand ? 'lg:h-[550px] lg:-translate-y-8 lg:scale-105 z-10' : 'lg:h-[480px] z-0'}`}
              whileHover={{ y: p.grand ? -40 : -10, transition: { duration: .3 } }}
              style={{
                border: `1px solid ${p.color}${p.grand ? '80' : '30'}`,
                boxShadow: p.grand ? `0 20px 50px -10px ${p.color}40,inset 0 0 20px ${p.color}10` : '0 10px 30px -10px rgba(0,0,0,.8)'
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-1 md:h-2" style={{ background: p.color, boxShadow: `0 0 15px ${p.color}` }} />
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(circle at top,${p.color}20 0%,transparent 70%)` }} />

              <div className="relative z-20 w-full h-full flex flex-col items-center text-center p-8 md:p-10">
                {p.grand && (
                  <div className="font-mono text-[10px] md:text-xs tracking-widest text-black font-bold uppercase mb-8 px-4 py-1.5 rounded-sm shadow-[0_0_15px_#FFE600]" style={{ background: p.color }}>
                    Highest Clearance
                  </div>
                )}
                <div className="mb-6 transition-transform duration-500 hover:scale-110" style={{ color: p.color, filter: `drop-shadow(0 0 15px ${p.color}80)` }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width={p.grand ? "70" : "50"} height={p.grand ? "70" : "50"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={p.grand ? "1.5" : "1"} strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
                    <polyline points="12 22 12 15.5" /><polyline points="22 8.5 12 15.5 2 8.5" />
                    <polyline points="2 15.5 12 8.5 22 15.5" /><polyline points="12 2 12 8.5" />
                  </svg>
                </div>
                <div className="font-mono text-[10px] tracking-[0.3em] uppercase mb-2 opacity-60" style={{ color: p.color }}>{p.rank}</div>
                <div className="font-orbitron font-black leading-none mb-2" style={{ fontSize: p.grand ? 'clamp(40px,4vw,56px)' : 'clamp(32px,3vw,42px)', color: p.color, textShadow: `0 0 20px ${p.color}60` }}>
                  {p.amount}
                </div>
                <div className="font-inter text-xs text-white/40 uppercase tracking-widest mb-8">USD Bounty</div>
                <div className="w-full mt-auto pt-6 border-t border-white/10">
                  {p.perks.map(pk => (
                    <div key={pk} className="flex items-center justify-center gap-3 mb-3">
                      <div className="w-1.5 h-1.5 rotate-45" style={{ background: p.color, boxShadow: `0 0 5px ${p.color}` }} />
                      <span className="font-mono text-[10px] md:text-xs text-white/60 tracking-wider uppercase">{pk}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-0 right-0 w-8 h-8" style={{ borderTop: `1px solid ${p.color}50`, borderLeft: `1px solid ${p.color}50` }} />
              <div className="absolute top-0 left-0 w-4 h-4" style={{ borderBottom: `1px solid ${p.color}50`, borderRight: `1px solid ${p.color}50` }} />
            </motion.div>
          ))}
        </div>

        <div className="prz-footer text-center mt-20 opacity-40 hover:opacity-100 transition-opacity duration-300">
          <span className="font-mono text-[10px] md:text-xs text-white tracking-[0.2em] uppercase">
            + Track-specific hardware bounties + Security clearance awards + Partner tokens
          </span>
        </div>
      </div>
    </section>
  );
}