import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TiltCard from '../components/ui/TiltCard';

gsap.registerPlugin(ScrollTrigger);

const tracks = [
  {
    color:'#00F0FF', label:'01',
    name:'Web3 & DeFi',
    desc:'Build decentralized applications, smart contracts, DAOs and next-gen financial protocols on-chain.',
    tags:['Solidity','Ethereum','IPFS'],
    icon:(
      <svg viewBox="0 0 48 48" fill="none" width="44" height="44" className="transition-transform duration-500 group-hover:scale-110">
        <rect x="4" y="4" width="40" height="40" rx="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M14 24h20M24 14v20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="24" cy="24" r="2" fill="currentColor" opacity=".5"/>
      </svg>
    )
  },
  {
    color:'#FF003C', label:'02',
    name:'AI & Machine Learning',
    desc:'Leverage AI and ML to build intelligent systems, generative models, and real-world automation.',
    tags:['Python','TensorFlow','LLMs'],
    icon:(
      <svg viewBox="0 0 48 48" fill="none" width="44" height="44" className="transition-transform duration-500 group-hover:scale-110">
        <path d="M24 4L44 14V34L24 44L4 34V14L24 4Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M24 4v40M4 14l40 20M44 14L4 34" stroke="currentColor" strokeWidth=".8" opacity=".4"/>
        <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="24" cy="24" r="2" fill="currentColor" opacity=".6"/>
      </svg>
    )
  },
  {
    color:'#FFE600', label:'03',
    name:'Cybersecurity',
    desc:'Develop cutting-edge security tools, ethical hacking solutions and privacy-preserving protocols.',
    tags:['CTF','Cryptography','Pentesting'],
    icon:(
      <svg viewBox="0 0 48 48" fill="none" width="44" height="44" className="transition-transform duration-500 group-hover:scale-110">
        <rect x="8" y="16" width="32" height="22" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M16 16V12a8 8 0 0116 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="24" cy="27" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M24 31v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    color:'#7B2FBE', label:'04',
    name:'Open Innovation',
    desc:'No boundaries. Build anything that creates meaningful impact — AR/VR, IoT, climate tech, and more.',
    tags:['No Limits','Any Stack','Impact'],
    icon:(
      <svg viewBox="0 0 48 48" fill="none" width="44" height="44" className="transition-transform duration-500 group-hover:scale-110">
        <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M16 24c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="24" cy="24" r="3" fill="currentColor" opacity=".6"/>
        <path d="M24 8v4M24 36v4M8 24h4M36 24h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )
  }
];

export default function Tracks() {
  const secRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating entry for the header
      gsap.from('.tracks-header', {
        scrollTrigger: { trigger: secRef.current, start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out'
      });

      // Staggered 3D pop-in for the cards
      gsap.fromTo('.track-card-wrap', 
        { y: 80, opacity: 0, scale: 0.95 },
        {
          scrollTrigger: { trigger: secRef.current, start: 'top 75%' },
          y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: 'back.out(1.2)'
        }
      );
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="tracks" ref={secRef} className="relative py-32 px-6 bg-[#020205] overflow-hidden">
      
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyber-purple/5 blur-[150px] rounded-full pointer-events-none z-0"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header Tag */}
        <div className="tracks-header flex flex-col items-center mb-20">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-xs text-cyber-cyan tracking-[0.3em]">//</span>
            <span className="font-mono text-xs text-cyber-cyan tracking-[0.3em] uppercase">Sectors</span>
            <div className="w-16 h-[1px] bg-cyber-cyan/40 shadow-[0_0_10px_#00F0FF]"/>
          </div>
          <h2 className="font-orbitron font-black text-white text-center uppercase leading-tight" style={{ fontSize: 'clamp(32px, 5vw, 60px)' }}>
            Choose Your <br/>
            <span className="text-cyber-cyan drop-shadow-[0_0_25px_rgba(0,240,255,0.5)]">Battleground</span>
          </h2>
        </div>

        {/* CSS Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tracks.map(t => (
            <TiltCard key={t.name} className="h-[420px]">
              
              <div className="track-card-wrap group relative flex flex-col h-full bg-[#05050A]/80 backdrop-blur-md rounded-xl overflow-hidden transition-all duration-500 cursor-default"
                style={{
                  border: `1px solid ${t.color}30`,
                  boxShadow: `0 10px 30px -10px rgba(0,0,0,0.8)`
                }}
                onMouseEnter={e => { 
                  e.currentTarget.style.borderColor = `${t.color}80`; 
                  e.currentTarget.style.background = `linear-gradient(180deg, ${t.color}15 0%, #05050A 100%)`;
                  e.currentTarget.style.boxShadow = `0 0 30px ${t.color}30, inset 0 0 20px ${t.color}10`;
                }}
                onMouseLeave={e => { 
                  e.currentTarget.style.borderColor = `${t.color}30`; 
                  e.currentTarget.style.background = '#05050A80';
                  e.currentTarget.style.boxShadow = `0 10px 30px -10px rgba(0,0,0,0.8)`;
                }}
              >
                {/* --- Visual Upgrades Inside Card --- */}

                {/* 1. Top Neon Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 transition-all duration-500 group-hover:h-2" style={{ background: t.color, boxShadow: `0 0 15px ${t.color}` }}/>

                {/* 2. Giant Background Watermark Number */}
                <div className="absolute -bottom-6 -right-4 font-orbitron font-black text-[120px] leading-none opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500 pointer-events-none select-none" style={{ color: t.color }}>
                  {t.label}
                </div>

                {/* 3. Hover Scanline Animation */}
                <div className="absolute top-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
                     style={{ 
                       background: `linear-gradient(90deg, transparent, ${t.color}, transparent)`,
                       animation: 'card-scan 2s linear infinite'
                     }}
                />

                {/* Content Container */}
                <div className="relative z-20 p-8 flex flex-col h-full">
                  
                  {/* Label & Icon Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="font-mono text-xs tracking-widest" style={{ color: `${t.color}80` }}>{t.label}</div>
                    <div className="drop-shadow-lg" style={{ color: t.color, filter: `drop-shadow(0 0 10px ${t.color}80)` }}>
                      {t.icon}
                    </div>
                  </div>

                  {/* Name */}
                  <div className="font-orbitron text-xl font-bold tracking-wide mb-3 transition-colors duration-300" style={{ color: t.color, textShadow: `0 0 10px ${t.color}40` }}>
                    {t.name}
                  </div>

                  {/* Desc */}
                  <p className="font-inter text-sm text-gray-400 leading-relaxed mb-6 flex-grow group-hover:text-gray-300 transition-colors duration-300">
                    {t.desc}
                  </p>

                  {/* Tags / Terminal Chips */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {t.tags.map(tag => (
                      <span key={tag} className="font-mono text-[10px] px-3 py-1.5 rounded-sm transition-all duration-300 bg-black/40 group-hover:bg-black/60"
                        style={{ border: `1px solid ${t.color}30`, color: `${t.color}90` }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Cyberpunk Corner Accent */}
                <div className="absolute bottom-0 right-0 w-8 h-8 transition-all duration-500 group-hover:w-12 group-hover:h-12" style={{ borderTop: `2px solid ${t.color}50`, borderLeft: `2px solid ${t.color}50` }}/>
              </div>
              
            </TiltCard>
          ))}
        </div>
      </div>

      {/* Global Style for the Card Scanline */}
      <style>{`
        @keyframes card-scan { 
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; } 
        }
      `}</style>
    </section>
  );
}