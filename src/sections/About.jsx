import { useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Sparkles, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useWebGL from './useWebGL';

gsap.registerPlugin(ScrollTrigger);

// --- Animated Soldier (Background Visual) ---
function AnimatedSoldier({ progressRef }) {
  const { scene } = useThree();
  const soldierRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const M = (hex, opts = {}) => new THREE.MeshStandardMaterial({ color: hex, ...opts });
    const ME = (hex, i = 4) => new THREE.MeshStandardMaterial({ color: hex, emissive: new THREE.Color(hex), emissiveIntensity: i, toneMapped: false });
    const Box = (g, w, h, d, mat, x, y, z) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); m.position.set(x, y, z); g.add(m); return m; };
    const Cyl = (g, rt, rb, h, s, mat, x, y, z) => { const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, s), mat); m.position.set(x, y, z); g.add(m); return m; };

    const sg = new THREE.Group();
    sg.position.set(0, -2, -3);
    scene.add(sg); soldierRef.current = sg;

    Box(sg, .5, .5, .5, M(0x0a0a0a, { metalness: 1 }), 0, 1.4, 0);
    Box(sg, .42, .12, .05, ME(0xFF003C, 10), 0, 1.45, .26);
    Cyl(sg, .52, .38, 1.15, 8, M(0x080810, { metalness: .92 }), 0, .9, 0);
    sg.add(new THREE.Mesh(new THREE.BoxGeometry(0.18, 1.4, 0.3), M(0x000)).position.set(0.44, 0.6, 0.48));

    return () => { scene.remove(sg); };
  }, [scene]);

  useFrame((state, delta) => {
    timeRef.current += delta;
    if (soldierRef.current) {
      soldierRef.current.position.y = -2 + Math.sin(timeRef.current * 1.2) * .15;
      const p = progressRef.current || 0;
      soldierRef.current.rotation.y = -Math.PI / 8 + (p * Math.PI / 4);
    }
  });
  return null;
}

export default function About() {
  const secRef = useRef(null);
  const canvasRef = useRef(null);
  const barTop = useRef(null);
  const barBot = useRef(null);
  const contentRef = useRef(null);
  const progress = useRef(0);

  useWebGL(canvasRef, { particleCount: 900, hexCount: 15, lineCount: 20, particleColor: 0x00f0ff, accentColor: 0xff003c });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ scrollTrigger: { trigger: secRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } })
        .to(barTop.current, { yPercent: -100, duration: 1.2, ease: 'expo.inOut' })
        .to(barBot.current, { yPercent: 100, duration: 1.2, ease: 'expo.inOut' }, '<');

      ScrollTrigger.create({
        trigger: secRef.current, start: 'top bottom', end: 'bottom top',
        onUpdate: self => { progress.current = self.progress; }
      });

      gsap.from('.about-reveal', {
        scrollTrigger: { trigger: contentRef.current, start: 'top 75%' },
        y: 60, opacity: 0, duration: 1.2, stagger: 0.2, ease: 'power4.out'
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={secRef} className="relative w-full min-h-screen py-32 px-6 md:px-12 bg-[#010103] overflow-hidden flex flex-col items-center justify-center">

      {/* BACKGROUND LAYERS */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 opacity-40" />
      <div className="absolute inset-0 z-[1] pointer-events-none opacity-30">
        <Canvas dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={40} />
          <ambientLight intensity={1} />
          <pointLight position={[10, 10, 10]} color="#00F0FF" intensity={5} />
          <Stars radius={150} depth={50} count={3000} factor={6} fade speed={1} />
          <AnimatedSoldier progressRef={progress} />
        </Canvas>
      </div>

      <div ref={barTop} className="absolute top-0 left-0 w-full h-[50.5vh] bg-black z-[50] border-b border-cyber-cyan/10" />
      <div ref={barBot} className="absolute bottom-0 left-0 w-full h-[50.5vh] bg-black z-[50] border-t border-cyber-pink/10" />

      {/* EXPANDED CONTENT */}
      <div ref={contentRef} className="relative z-10 w-full max-w-[1300px] mx-auto text-center">

        {/* Massive Tagline */}
        <div className="about-reveal flex items-center justify-center gap-6 mb-12">
          <div className="h-[1px] w-full max-w-[150px] bg-gradient-to-l from-cyber-cyan/50 to-transparent" />
          <span className="font-mono text-[11px] md:text-sm text-cyber-cyan tracking-[0.6em] font-black uppercase">
            // NATIONAL_HACKATHON_INITIATIVE_2026
          </span>
          <div className="h-[1px] w-full max-w-[150px] bg-gradient-to-r from-cyber-cyan/50 to-transparent" />
        </div>

        {/* Heading - Bold & Wide */}
        <h2 className="about-reveal font-orbitron font-black leading-[0.85] mb-12 uppercase tracking-tighter" style={{ fontSize: 'clamp(48px, 10vw, 130px)' }}>
          <span className="text-white">THE </span>
          <span className="text-cyber-cyan drop-shadow-[0_0_30px_#00F0FF]">GRID </span>
          <br className="md:block hidden" />
          <span className="text-transparent" style={{ WebkitTextStroke: '3px #FF003C', filter: 'drop-shadow(0 0 15px #FF003C)' }}>
            ANOMALY
          </span>
        </h2>

        {/* Lore text - Detailed & Professional */}
        <div className="about-reveal mb-16 max-w-5xl mx-auto">
          <p className="font-inter text-gray-400 text-xl md:text-3xl leading-[1.2] tracking-tight px-6">
            NEXUS is India's premier <span className="text-white font-black italic">National-Level Tactical Hackathon</span>.
            We are bridging the gap between legacy engineering and the decentralized future.
            Join <span className="text-white font-bold underline decoration-cyber-cyan underline-offset-8">2500+ elite architects</span> in an
            unrestricted arena to build, deploy, and dominate the digital frontier.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-8 font-mono text-[10px] md:text-xs text-cyber-cyan font-bold tracking-[0.4em] uppercase">
            <span>{'>'} PAN_INDIA_REACH</span>
            <span className="text-white/20">|</span>
            <span>{'>'} ZERO_RESTRICTION_STACK</span>
            <span className="text-white/20">|</span>
            <span>{'>'} REAL_TIME_COMMAND_CENTER</span>
          </div>
        </div>

        {/* Stats Grid - Large & Detailed */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 about-reveal">
          {[
            { val: 'JUL 25', label: 'IGNITION_PHASE', col: '#00F0FF', desc: 'National portal activation' },
            { val: '2.5K+', label: 'AGENT_REGISTRY', col: '#FF003C', desc: 'Elite nationwide talent' },
            { val: 'INDIA', label: 'COMMAND_ZONE', col: '#FFE600', desc: 'Multi-state connectivity' },
            { val: '48HRS', label: 'EXECUTION_TIME', col: '#00FF88', desc: 'Uninterrupted hacking' },
          ].map((s, i) => (
            <div key={i} className="stat-card-box group relative p-10 bg-white/[0.03] border border-white/10 backdrop-blur-xl transition-all duration-500 hover:border-cyber-cyan/40 hover:-translate-y-2">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l" style={{ borderColor: s.col }} />
              <div className="font-orbitron font-black text-4xl md:text-5xl mb-2" style={{ color: s.col, textShadow: `0 0 15px ${s.col}50` }}>
                {s.val}
              </div>
              <div className="font-mono text-[10px] text-gray-500 tracking-[0.2em] font-bold uppercase mb-2">
                {s.label}
              </div>
              <p className="font-mono text-[8px] text-white/20 uppercase tracking-widest">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}