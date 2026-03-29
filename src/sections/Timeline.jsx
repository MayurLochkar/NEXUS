import { useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Sparkles, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useWebGL from './useWebGL'; // Keeping your custom WebGL hook

gsap.registerPlugin(ScrollTrigger);

const events = [
  { phase: 'PHASE_01', date: 'JUNE 1, 2026', title: 'System Ignition', desc: 'Portal goes live. Early bird teams get exclusive system access.', color: '#00F0FF', align: 'left' },
  { phase: 'PHASE_02', date: 'JULY 1, 2026', title: 'Squad Lockdown', desc: 'Finalize your crew of 2–4 members. Lone wolves are also accepted.', color: '#FF003C', align: 'right' },
  { phase: 'PHASE_03', date: 'JULY 15, 2026', title: 'Skill Inject', desc: 'Live encrypted streams on Web3 and AI from industry masters.', color: '#FFE600', align: 'left' },
  { phase: 'PHASE_04', date: 'JULY 25, 2026', title: 'The Hack Begins', desc: '48-hour countdown starts. The firewall drops. Build or be deleted.', color: '#00F0FF', align: 'right' },
  { phase: 'PHASE_05', date: 'JULY 27, 2026', title: 'Code Freeze', desc: 'Upload source code and prepare your pitches for the MCP.', color: '#7B2FBE', align: 'left' },
  { phase: 'PHASE_06', date: 'AUG 1, 2026', title: 'Bounty Claim', desc: 'Global awards ceremony. Champions claim their bounty and glory.', color: '#00FF88', align: 'right' },
];

function TimelineSentry({ progressRef }) {
  const { scene } = useThree();
  const sg = useRef(null);
  const gg = useRef(null);
  const t = useRef(0);

  useEffect(() => {
    const M = (hex, opts = {}) => new THREE.MeshStandardMaterial({ color: hex, ...opts });
    const ME = (hex, i = 4) => new THREE.MeshStandardMaterial({ color: hex, emissive: new THREE.Color(hex), emissiveIntensity: i, toneMapped: false });
    const Box = (g, w, h, d, mat, x, y, z) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); m.position.set(x, y, z); g.add(m); return m; };
    const Cyl = (g, rt, rb, h, s, mat, x, y, z, rx = 0, ry = 0, rz = 0) => { const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, s), mat); m.position.set(x, y, z); m.rotation.set(rx, ry, rz); g.add(m); return m; };

    const root = new THREE.Group();
    root.position.set(-3.5, -1.5, 0); root.rotation.y = Math.PI / 4;
    scene.add(root); sg.current = root;

    Box(root, .5, .5, .5, M(0x0a0a0a, { metalness: 1 }), 0, 1.4, 0);
    Box(root, .42, .12, .05, ME(0xFF003C, 10), 0, 1.45, .26);
    Cyl(root, .52, .38, 1.15, 8, M(0x080810, { metalness: .92 }), 0, .9, 0);

    const gun = new THREE.Group(); gun.position.set(.4, .7, .5); gun.rotation.set(Math.PI / 2.1, 0, .2);
    Box(gun, .15, 1.6, .25, M(0x000), 0, 0, 0);
    const muzz = new THREE.Mesh(new THREE.CylinderGeometry(.04, .04, 1), ME(0xFF003C, 15));
    muzz.position.set(0, -.9, 0); gun.add(muzz);
    root.add(gun); gg.current = gun;

    return () => { scene.remove(root); root.traverse(o => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose(); }); };
  }, [scene]);

  useFrame((_, delta) => {
    t.current += delta;
    if (!sg.current) return;
    sg.current.position.y = -1.5 + Math.sin(t.current * 1.2) * .15;
    const p = progressRef.current || 0;
    sg.current.rotation.y = Math.PI / 4 - (p * .8);
    if (gg.current) gg.current.rotation.x = (Math.PI / 2.1) + Math.sin(t.current * 2.5) * .03;
  });
  return null;
}

export default function Timeline() {
  const secRef = useRef(null);
  const canvasRef = useRef(null);
  const barTop = useRef(null);
  const barBot = useRef(null);
  const lineRef = useRef(null);
  const progress = useRef(0);

  // ── Keeping your original WebGL background logic ──
  useWebGL(canvasRef, { particleCount: 700, hexCount: 8, lineCount: 12, particleColor: 0xff003c, accentColor: 0x00f0ff });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Black Bar Reveal
      gsap.timeline({
        scrollTrigger: { trigger: secRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
      })
        .to(barTop.current, { yPercent: -100, duration: 1.2, ease: 'expo.inOut' })
        .to(barBot.current, { yPercent: 100, duration: 1.2, ease: 'expo.inOut' }, '<');

      // 2. Track Scroll for 3D Sentry
      ScrollTrigger.create({
        trigger: secRef.current, start: 'top bottom', end: 'bottom top',
        onUpdate: self => { progress.current = self.progress; }
      });

      // 3. Glowing Center Line Scrub
      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1, transformOrigin: 'top center',
          scrollTrigger: { trigger: secRef.current, start: 'top 45%', end: 'bottom 55%', scrub: 1.2 },
          ease: 'none'
        }
      );

      // 4. Advanced Card Entrance (Scrubbed)
      const cards = gsap.utils.toArray('.tl-card-anim');
      cards.forEach((card, i) => {
        const isLeft = events[i].align === 'left';
        gsap.fromTo(card,
          { opacity: 0, x: isLeft ? -120 : 120, scale: 0.85, rotateY: isLeft ? 25 : -25 },
          {
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              end: 'top 50%',
              scrub: 1
            },
            opacity: 1, x: 0, scale: 1, rotateY: 0
          }
        );
      });

      // 5. Header Stagger
      gsap.from('.tl-header-reveal', {
        scrollTrigger: { trigger: secRef.current, start: 'top 85%' },
        y: 50, opacity: 0, duration: 1, stagger: 0.15, ease: 'power4.out'
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="timeline" ref={secRef} className="relative w-full py-32 bg-[#010103] overflow-hidden" style={{ perspective: '1200px' }}>

      {/* LAYER 0: Your original WebGL Canvas */}
      <div ref={canvasRef} className="absolute inset-0 w-full h-full z-[0] pointer-events-none" />

      {/* LAYER 1: Three.js Sentry */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <Canvas dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
          <ambientLight intensity={1} />
          <pointLight position={[-10, 10, 10]} color="#00F0FF" intensity={6} />
          <pointLight position={[10, -5, 5]} color="#FF003C" intensity={4} />
          <Stars radius={100} depth={50} count={1500} factor={4} fade speed={1} />
          <Sparkles count={60} scale={14} size={2} color="#FF003C" />
          <TimelineSentry progressRef={progress} />
          <Environment preset="night" />
        </Canvas>
      </div>

      {/* LAYER 2: Grid Overlay */}
      <div className="absolute inset-0 z-[2] pointer-events-none opacity-20" style={{
        backgroundImage: 'linear-gradient(rgba(0,240,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,240,255,.05) 1px,transparent 1px)',
        backgroundSize: '50px 50px', transform: 'perspective(800px) rotateX(60deg)', transformOrigin: '50% 100%'
      }} />

      {/* Cinematic Bars */}
      <div ref={barTop} className="absolute top-0 left-0 w-full h-[50.5vh] bg-black z-[50] border-b border-cyber-cyan/10" />
      <div ref={barBot} className="absolute bottom-0 left-0 w-full h-[50.5vh] bg-black z-[50] border-t border-cyber-pink/10" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col items-center mb-16 md:mb-32">
          <div className="tl-header-reveal flex items-center gap-3 mb-6">
            <span className="font-mono text-[10px] text-[#FF003C] bg-[rgba(255,0,60,.05)] border border-[rgba(255,0,60,.2)] px-4 py-1 tracking-[0.4em] font-bold uppercase">
              // CHRONOLOGY_STABLE_V2
            </span>
          </div>
          <h2 className="tl-header-reveal font-orbitron font-black text-white text-center uppercase leading-[0.9]" style={{ fontSize: 'clamp(36px, 7vw, 80px)' }}>
            Mission <br />
            <span style={{ color: 'transparent', WebkitTextStroke: '2px #FF003C', filter: 'drop-shadow(0 0 15px rgba(255,0,60,0.5))' }}>Timeline</span>
          </h2>
        </div>

        <div className="relative">
          {/* Vertical Center Line */}
          <div ref={lineRef} className="absolute top-0 bottom-0 w-[2px] md:left-1/2 left-[19px] md:-translate-x-1/2 rounded-full"
            style={{ background: 'linear-gradient(180deg, #00F0FF, #FF003C)', boxShadow: '0 0 20px rgba(0,240,255,0.3)' }} />

          <div className="flex flex-col gap-20 md:gap-32">
            {events.map((ev, i) => (
              <div key={i} className="relative flex items-center w-full justify-start md:justify-center">

                {/* Node dot */}
                <div className="absolute md:left-1/2 left-[20px] md:-translate-x-1/2 -translate-x-1/2 flex items-center justify-center z-20">
                  <div className="absolute w-10 h-10 rounded-full animate-pulse opacity-20" style={{ backgroundColor: ev.color }} />
                  <div className="w-4 h-4 rounded-full border-2 border-black relative z-10" style={{ backgroundColor: ev.color, boxShadow: `0 0 15px ${ev.color}` }} />
                </div>

                {/* Card */}
                <div className={`tl-card-anim w-full pl-16 md:pl-0 md:w-[45%] ${ev.align === 'left' ? 'md:mr-auto' : 'md:ml-auto'} group cursor-default`}>
                  <div className="relative p-5 md:p-8 bg-black/70 backdrop-blur-xl border border-white/10 rounded-sm transition-all duration-500 hover:border-white/30 hover:-translate-y-2">
                    <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, ${ev.color}, transparent)` }} />

                    <div className="flex justify-between items-center mb-4">
                      <span className="font-mono text-[9px] tracking-widest text-white/40 uppercase">[{ev.phase}]</span>
                      <span className="font-mono text-[10px] font-bold" style={{ color: ev.color }}>{ev.date}</span>
                    </div>

                    <h3 className="font-orbitron text-xl font-bold text-white mb-3 uppercase tracking-tight">{ev.title}</h3>
                    <p className="font-inter text-sm text-gray-400 leading-relaxed group-hover:text-gray-200 transition-colors">{ev.desc}</p>

                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l opacity-50" style={{ borderColor: ev.color }} />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r opacity-50" style={{ borderColor: ev.color }} />
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