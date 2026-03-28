/**
 * About.jsx
 * DEPS: npm install three gsap @react-three/fiber @react-three/drei
 */
import { useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Sparkles, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useWebGL from './useWebGL';

gsap.registerPlugin(ScrollTrigger);

// ─── Animated Soldier ─────────────────────────────────────────────────────────
function AnimatedSoldier({ progressRef }) {
  const { scene } = useThree();
  const soldierRef = useRef(null);
  const gunRef = useRef(null);
  const visorRef = useRef([]);
  const timeRef = useRef(0);

  useEffect(() => {
    const M = (hex, opts = {}) => new THREE.MeshStandardMaterial({ color: hex, ...opts });
    const ME = (hex, i = 4) => new THREE.MeshStandardMaterial({ color: hex, emissive: new THREE.Color(hex), emissiveIntensity: i, toneMapped: false });
    const Box = (g, w, h, d, mat, x, y, z) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); m.position.set(x, y, z); g.add(m); return m; };
    const Cyl = (g, rt, rb, h, s, mat, x, y, z, rx = 0, ry = 0, rz = 0) => { const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, s), mat); m.position.set(x, y, z); m.rotation.set(rx, ry, rz); g.add(m); return m; };
    const Sph = (g, r, mat, x, y, z) => { const m = new THREE.Mesh(new THREE.SphereGeometry(r, 16, 16), mat); m.position.set(x, y, z); g.add(m); return m; };

    const sg = new THREE.Group();
    sg.position.set(-2.8, -1.5, 0); sg.rotation.y = Math.PI / 5;
    scene.add(sg); soldierRef.current = sg;

    // Head
    Box(sg, .5, .5, .5, M(0x0a0a0a, { metalness: 1 }), 0, 1.4, 0);
    Box(sg, .52, .14, .14, M(0x0c0c1e, { metalness: .9 }), 0, 1.62, .3);
    Box(sg, .42, .12, .05, ME(0xFF003C, 10), 0, 1.45, .26);
    // Neck
    Cyl(sg, .13, .16, .22, 8, M(0x080810, { metalness: .9 }), 0, 1.62, 0);
    // Torso
    Cyl(sg, .52, .38, 1.15, 8, M(0x080810, { metalness: .92 }), 0, .9, 0);
    Box(sg, .58, .65, .14, M(0x0b0b1c, { metalness: .88 }), 0, .98, .28);
    Box(sg, .06, .52, .09, ME(0x00F0FF, 2.2), -.2, .96, .34);
    Box(sg, .06, .52, .09, ME(0x00F0FF, 2.2), .2, .96, .34);
    Box(sg, .18, .05, .1, ME(0x00F0FF, 1.8), 0, 1.16, .34);
    // Shoulders
    Cyl(sg, .18, .15, .65, 8, M(0x080810, { metalness: .88 }), -.78, .72, 0);
    Cyl(sg, .18, .15, .65, 8, M(0x080810, { metalness: .88 }), .78, .72, 0);
    // Earpiece
    Sph(sg, .072, ME(0x00F0FF, 3.5), -.5, 1.42, -.08);
    // Legs
    [-.24, .24].forEach(x => {
      Cyl(sg, .24, .19, .72, 8, M(0x080810, { metalness: .88 }), x, -.22, 0);
      Box(sg, .22, .06, .28, ME(0x00F0FF, 1.4), x, -.1, .15);
    });
    // Gun
    const gg = new THREE.Group(); gg.position.set(.44, .6, .48); gg.rotation.set(Math.PI / 2, 0, .2);
    Box(gg, .18, 1.4, .3, M(0x000), 0, 0, 0);
    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(.04, .04, 1), ME(0x00F0FF, 15));
    barrel.position.set(0, -.9, 0); gg.add(barrel);
    sg.add(gg); gunRef.current = gg;

    return () => { scene.remove(sg); sg.traverse(o => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose(); }); };
  }, [scene]);

  useFrame((_, delta) => {
    timeRef.current += delta;
    const t = timeRef.current; const sg = soldierRef.current;
    if (!sg) return;
    sg.position.y = -1.5 + Math.sin(t * 1.2) * .15;
    const p = progressRef.current || 0;
    sg.rotation.y = Math.PI / 5 - (p * Math.PI / 2);
    sg.position.x = -2.8 + (p * 1.8);
    if (gunRef.current) gunRef.current.rotation.x = (Math.PI / 2) + Math.sin(t * 2.5) * .04;
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

  useWebGL(canvasRef, { particleCount: 700, hexCount: 9, lineCount: 14, particleColor: 0x00f0ff, accentColor: 0xff003c });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cinematic bars
      gsap.timeline({
        scrollTrigger: { trigger: secRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
      })
        .to(barTop.current, { yPercent: -100, duration: 1, ease: 'expo.inOut' })
        .to(barBot.current, { yPercent: 100, duration: 1, ease: 'expo.inOut' }, '<');

      // Scroll progress for 3D
      ScrollTrigger.create({
        trigger: secRef.current, start: 'top bottom', end: 'bottom top',
        onUpdate: self => { progress.current = self.progress; }
      });

      // Text stagger
      gsap.from('.about-reveal', {
        scrollTrigger: { trigger: contentRef.current, start: 'top 75%' },
        y: 44, opacity: 0, duration: 1, stagger: .14, ease: 'power4.out'
      });

      // Stats pop
      gsap.from('.stat-card-box', {
        scrollTrigger: { trigger: contentRef.current, start: 'top 70%' },
        y: 22, opacity: 0, scale: .88, duration: .8, stagger: .1, ease: 'back.out(1.7)', delay: .4
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={secRef} className="relative w-full min-h-screen py-32 px-6 md:px-12 bg-[#010103] overflow-hidden flex items-center">

      {/* WebGL bg */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none" />

      {/* R3F soldier */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <Canvas dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={40} />
          <ambientLight intensity={1} />
          <pointLight position={[10, 10, 10]} color="#FF003C" intensity={5} />
          <pointLight position={[-10, -5, 5]} color="#00F0FF" intensity={3} />
          <Stars radius={100} depth={50} count={2000} factor={4} fade speed={1} />
          <Sparkles count={60} scale={10} size={2} color="#00F0FF" />
          <AnimatedSoldier progressRef={progress} />
          <Environment preset="night" />
        </Canvas>
      </div>

      {/* Cinematic bars */}
      <div ref={barTop} className="absolute top-0 left-0 w-full h-[50.5vh] bg-black z-[50] border-b border-[rgba(0,240,255,0.1)]" />
      <div ref={barBot} className="absolute bottom-0 left-0 w-full h-[50.5vh] bg-black z-[50] border-t border-[rgba(255,0,60,0.1)]" />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="max-w-2xl">

          {/* Tagline */}
          <div className="about-reveal flex items-center gap-3 mb-10">
            <span className="font-mono text-[10px] text-[#00F0FF] bg-[rgba(0,240,255,.05)] border border-[rgba(0,240,255,.2)] px-3 py-1 tracking-[0.4em] font-bold uppercase">
              // CORE_MISSION: ESTABLISHED
            </span>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-[rgba(0,240,255,.3)] to-transparent" />
          </div>

          {/* Heading */}
          <h2 className="about-reveal font-orbitron font-black leading-[0.9] mb-10 uppercase select-none" style={{ fontSize: 'clamp(44px,8vw,100px)' }}>
            <span className="text-white">THE </span>
            <span style={{ color: '#00F0FF', filter: 'drop-shadow(0 0 25px rgba(0,240,255,0.4))' }}>GRID </span>
            <br />
            <span style={{ color: 'transparent', WebkitTextStroke: '2px #FF003C', filter: 'drop-shadow(0 0 12px rgba(255,0,60,0.4))' }}>
              ANOMALY
            </span>
          </h2>

          {/* Lore text */}
          <div className="about-reveal relative mb-12">
            <div className="absolute left-0 top-0 w-1 h-full" style={{ background: 'linear-gradient(180deg,#00F0FF,#FF003C)' }} />
            <p className="font-inter text-gray-400 text-lg md:text-xl leading-relaxed pl-8">
              Legacy hackathons are bloated relics of the past.
              <span className="text-white font-bold px-1">NEXUS</span> is the system override—a decentralized arena for elite architects to build, deploy, and dominate the digital frontier.
              <br />
              <span className="font-mono text-sm text-[#00F0FF] mt-4 block tracking-widest uppercase font-bold">
                {'>'} STATUS: SYSTEM_CRITICAL // NO_EXIT_FOUND
              </span>
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 about-reveal">
            {[
              { val: 'JUL 25', label: 'IGNITION', col: '#00F0FF' },
              { val: 'GLOBAL', label: 'CONNECT', col: '#FF003C' },
              { val: 'WEB3', label: 'LAYER', col: '#FFE600' },
              { val: '48HRS', label: 'EXECUTE', col: '#00FF88' },
            ].map(s => (
              <div key={s.label} className="stat-card-box group relative p-5 bg-white/[0.02] border border-white/10 backdrop-blur-md rounded-sm transition-all duration-500 hover:bg-white/[0.05] hover:border-white/20">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{ background: s.col }} />
                <div className="relative z-10 font-orbitron font-black text-2xl mb-1 tracking-tighter" style={{ color: s.col, textShadow: `0 0 10px ${s.col}50` }}>
                  {s.val}
                </div>
                <div className="relative z-10 font-mono text-[9px] text-gray-500 tracking-[0.2em] font-bold uppercase">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}