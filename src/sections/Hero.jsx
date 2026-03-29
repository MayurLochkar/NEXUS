/**
 * Hero.jsx
 * DEPS: npm install three gsap @react-three/fiber @react-three/drei
 * Put useWebGL.js in same folder (or adjust path)
 * Put MagneticButton in src/components/ui/MagneticButton.jsx
 */
import { useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Sparkles, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useWebGL from './useWebGL';
import MagneticButton from '../components/ui/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

// ─── Imperative Cyber Soldier ─────────────────────────────────────────────────
function CyberpunkSoldier({ pausedRef }) {
  const { scene } = useThree();
  const soldierRef = useRef(null);
  const gunGRef = useRef(null);
  const visorMatsRef = useRef([]);
  const muzzleRef = useRef(null);
  const muzzleMatRef = useRef(null);
  const muzzleLRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const M = (hex, opts = {}) => new THREE.MeshStandardMaterial({ color: hex, ...opts });
    const ME = (hex, intensity = 3) => new THREE.MeshStandardMaterial({ color: hex, emissive: new THREE.Color(hex), emissiveIntensity: intensity, toneMapped: false });
    const Box = (g, w, h, d, mat, x, y, z, rx = 0, ry = 0, rz = 0) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); m.position.set(x, y, z); m.rotation.set(rx, ry, rz); g.add(m); return m; };
    const Cyl = (g, rt, rb, h, s, mat, x, y, z, rx = 0, ry = 0, rz = 0) => { const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, s), mat); m.position.set(x, y, z); m.rotation.set(rx, ry, rz); g.add(m); return m; };
    const Sph = (g, r, mat, x, y, z) => { const m = new THREE.Mesh(new THREE.SphereGeometry(r, 16, 16), mat); m.position.set(x, y, z); g.add(m); return m; };
    const Cone = (g, r, h, s, mat, x, y, z, rx = 0, ry = 0, rz = 0) => { const m = new THREE.Mesh(new THREE.ConeGeometry(r, h, s), mat); m.position.set(x, y, z); m.rotation.set(rx, ry, rz); g.add(m); return m; };

    const sg = new THREE.Group();
    sg.position.set(2.5, -0.9, 0); sg.rotation.y = -Math.PI / 5;
    scene.add(sg); soldierRef.current = sg;

    // Hair
    Sph(sg, .35, M(0x050508, { metalness: .1, roughness: .85 }), 0, 2.32, 0);
    [[0, .42, -.08, -.25, 0], [.12, .38, -.04, -.28, .18], [-.12, .38, -.04, -.28, -.18], [.22, .32, .02, -.3, .32], [-.22, .32, .02, -.3, -.32]].forEach(([ox, oh, oz, rx, rz]) => Cone(sg, .062, oh + .15, 5, M(0x030305, { metalness: .15, roughness: .85 }), ox, 2.58 + oh * .35, oz, rx, 0, rz));
    // Head
    Box(sg, .60, .58, .64, M(0x080810, { metalness: .95, roughness: .12 }), 0, 1.92, 0);
    Box(sg, .52, .14, .14, M(0x0c0c1e, { metalness: .9, roughness: .2 }), 0, 2.16, .3);
    // Goggles
    Box(sg, .58, .2, .09, M(0x050508, { metalness: 1, roughness: .04 }), 0, 2.0, .33);
    const eyeL = Box(sg, .2, .13, .07, ME(0xFF2D9B, 5), -.145, 2.0, .37);
    const eyeR = Box(sg, .2, .13, .07, ME(0xFF2D9B, 5), .145, 2.0, .37);
    visorMatsRef.current = [eyeL.material, eyeR.material];
    // Mask
    Box(sg, .52, .22, .12, M(0x0a0a1a, { metalness: .85, roughness: .25 }), 0, 1.77, .33);
    Cyl(sg, .065, .065, .24, 8, M(0x080810, { metalness: .9 }), -.36, 1.96, -.1, 0, 0, Math.PI / 2);
    Sph(sg, .075, ME(0x00F0FF, 3.5), -.5, 1.97, -.1);
    // Neck
    Cyl(sg, .13, .16, .24, 8, M(0x080810, { metalness: .9 }), 0, 1.6, 0);
    // Torso
    Cyl(sg, .52, .38, 1.15, 8, M(0x080810, { metalness: .92, roughness: .15 }), 0, .9, 0);
    Box(sg, .58, .65, .14, M(0x0b0b1c, { metalness: .88, roughness: .25 }), 0, .98, .28);
    Box(sg, .06, .55, .09, ME(0x00F0FF, 2.2), -.2, .96, .34);
    Box(sg, .06, .55, .09, ME(0x00F0FF, 2.2), .2, .96, .34);
    // Shoulders
    const lSh = new THREE.Group(); lSh.position.set(-.78, 1.15, 0); lSh.rotation.z = .2;
    Box(lSh, .4, .68, .4, M(0x0b0b1c, { metalness: .9, roughness: .2 }), 0, 0, 0);
    Box(lSh, .38, .11, .38, ME(0xFF2D9B, 1.8), 0, .42, 0); sg.add(lSh);
    const rSh = new THREE.Group(); rSh.position.set(.78, 1.15, 0); rSh.rotation.z = -.18;
    Box(rSh, .4, .68, .4, M(0x0b0b1c, { metalness: .9, roughness: .2 }), 0, 0, 0);
    Box(rSh, .38, .11, .38, ME(0x00F0FF, 1.8), 0, .42, 0); sg.add(rSh);
    // Legs
    [-.24, .24].forEach(x => { Cyl(sg, .24, .19, .72, 8, M(0x080810, { metalness: .88 }), x, -.22, 0); Box(sg, .22, .06, .28, ME(0x00F0FF, 1.4), x, -.1, .15); });
    // Sniper Rifle
    const gg = new THREE.Group(); gg.position.set(.66, .58, .38); gg.rotation.set(.14, -.06, 0);
    Box(gg, .13, .16, .58, M(0x080810, { metalness: .92, roughness: .1 }), 0, .01, -.34);
    Box(gg, .14, .2, .7, M(0x1a1a2e, { metalness: 1, roughness: .06 }), 0, .03, .12);
    Cyl(gg, .052, .06, .95, 8, M(0x1a1a2e, { metalness: 1, roughness: .05 }), 0, 0, .68, Math.PI / 2, 0, 0);
    const bGlow = new THREE.Mesh(new THREE.CylinderGeometry(.056, .056, .05, 8), ME(0x00F0FF, 9));
    bGlow.position.set(0, 0, 1.28); bGlow.rotation.x = Math.PI / 2; gg.add(bGlow);
    Cyl(gg, .06, .06, .55, 8, M(0x0a0a18, { metalness: .9 }), 0, .17, .14, Math.PI / 2, 0, 0);
    const mMat = new THREE.MeshStandardMaterial({ color: 0x00F0FF, emissive: new THREE.Color(0x00F0FF), emissiveIntensity: 0, toneMapped: false, transparent: true, opacity: .9, side: THREE.DoubleSide });
    const mFlash = new THREE.Mesh(new THREE.ConeGeometry(.18, .52, 16, 1, true), mMat);
    mFlash.position.set(0, 0, 1.54); mFlash.rotation.x = -Math.PI / 2; mFlash.visible = false; gg.add(mFlash);
    muzzleRef.current = mFlash; muzzleMatRef.current = mMat;
    const mLight = new THREE.PointLight(0x00F0FF, 0, 8); mLight.position.set(0, 0, 1.6); gg.add(mLight);
    muzzleLRef.current = mLight;
    sg.add(gg); gunGRef.current = gg;

    return () => { scene.remove(sg); sg.traverse(o => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose(); }); };
  }, [scene]);

  useFrame((_, delta) => {
    if (!pausedRef.current) timeRef.current += delta;
    const t = timeRef.current; const sg = soldierRef.current; const gg = gunGRef.current;
    if (!sg) return;
    sg.position.y = -0.9 + Math.sin(t * 1.4) * .15;
    sg.rotation.y = -Math.PI / 5 + Math.sin(t * .75) * .1;
    if (gg) { gg.rotation.x = .14 + Math.sin(t * 2.2) * .022; }
    const vI = 4.5 + Math.sin(t * 8) * 2.8;
    visorMatsRef.current.forEach(m => { if (m) m.emissiveIntensity = vI; });
    const firing = Math.sin(t * 30) > .78 && Math.sin(t * 17) > -.2;
    if (muzzleRef.current) { muzzleRef.current.visible = firing; if (firing) muzzleRef.current.rotation.y = t * 18; }
    if (muzzleMatRef.current) muzzleMatRef.current.emissiveIntensity = firing ? 25 : 0;
    if (muzzleLRef.current) muzzleLRef.current.intensity = firing ? 22 : 0;
  });
  return null;
}

const stats = [
  { num: '2500+', label: 'Participants' },
  { num: '48H', label: 'Hacking Time' },
  { num: '$50K', label: 'Prize Pool' },
  { num: '32', label: 'Countries' },
];

export default function Hero() {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const pausedRef = useRef(false);

  useWebGL(canvasRef, { particleCount: 700, hexCount: 8, lineCount: 12, particleColor: 0x00f0ff, accentColor: 0xff2d9b });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-word', { y: 120, opacity: 0, duration: 1.1, stagger: .15, ease: 'power4.out', delay: .3 });
      gsap.from('.hw-accent', { y: 120, opacity: 0, duration: 1.1, ease: 'power4.out', delay: .45 });
      gsap.from('.hero-sub', { opacity: 0, x: -22, duration: 1.2, delay: 1, ease: 'power2.out' });
      gsap.from('.hero-badge', { opacity: 0, scale: .6, duration: .52, stagger: .12, delay: 1.45, ease: 'back.out(1.7)' });
      gsap.from('.hero-btn', { opacity: 0, y: 22, duration: .8, stagger: .18, delay: 1.85, ease: 'power3.out' });
      gsap.from('.hero-stat', { opacity: 0, y: 32, duration: .8, stagger: .13, delay: 2.2, ease: 'expo.out' });
      gsap.from('.t-line', { opacity: 0, duration: .7, delay: .25 });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const handleMouseMove = e => { pausedRef.current = e.clientX > window.innerWidth * .44; };
  const handleMouseLeave = () => { pausedRef.current = false; };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center bg-[#010103] overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* WebGL bg canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none" />

      {/* R3F soldier canvas layered on top */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, .3, 9]} fov={50} />
          <ambientLight intensity={3} color="#111133" />
          <pointLight position={[-5, 4, 6]} color="#00F0FF" intensity={10} />
          <pointLight position={[7, 2, 4]} color="#FF2D9B" intensity={7} />
          <pointLight position={[2, 7, -6]} color="#ffffff" intensity={4} />
          <pointLight position={[0, -5, 3]} color="#0044ff" intensity={3} />
          <Stars radius={100} depth={50} count={2000} factor={4} fade speed={1.5} />
          <Sparkles count={80} scale={12} size={2} speed={0.4} opacity={0.7} color="#FCEE0A" />
          <Sparkles count={40} scale={10} size={1.5} speed={0.6} opacity={0.5} color="#FF2D9B" />
          <CyberpunkSoldier pausedRef={pausedRef} />
        </Canvas>
      </div>

      {/* Perspective grid overlay */}
      <div className="absolute inset-0 z-[2] pointer-events-none opacity-[.25]" style={{
        backgroundImage: 'linear-gradient(rgba(0,240,255,.08)1px,transparent 1px),linear-gradient(90deg,rgba(0,240,255,.08)1px,transparent 1px)',
        backgroundSize: '60px 60px',
        transform: 'perspective(700px) rotateX(62deg) scaleX(1.4)',
        transformOrigin: '50% 100%'
      }} />

      {/* Vignette */}
      <div className="absolute inset-0 z-[3] pointer-events-none" style={{ background: 'radial-gradient(ellipse at center,transparent 22%,rgba(1,1,3,.93)100%)' }} />
      {/* Scanlines */}
      <div className="absolute inset-0 z-[3] pointer-events-none opacity-[.04]" style={{ background: 'repeating-linear-gradient(0deg,#fff,#fff 1px,transparent 1px,transparent 3px)', backgroundSize: '100% 3px' }} />

      {/* Corner brackets */}
      {['top-[18px] left-[18px] border-t-2 border-l-2', 'top-[18px] right-[18px] border-t-2 border-r-2', 'bottom-[108px] left-[18px] border-b-2 border-l-2', 'bottom-[108px] right-[18px] border-b-2 border-r-2'].map((c, i) => (
        <div key={i} className={`absolute z-10 pointer-events-none w-14 h-14 border-[rgba(0,240,255,.55)] ${c}`} />
      ))}

      {/* Right HUD - hidden on mobile */}
      <div className="absolute right-7 top-1/2 -translate-y-1/2 z-10 flex-col gap-2.5 pointer-events-none hidden md:flex">
        {[{ c: '#00F0FF', l: 'NODE_ACTIVE', d: '0s' }, { c: '#FF2D9B', l: 'FIREWALL_DOWN', d: '.5s' }, { c: '#FCEE0A', l: 'UPLINK_STABLE', d: '1s' }, { c: '#00F0FF', l: 'COMBAT_READY', d: '.3s' }].map(({ c, l, d }) => (
          <div key={l} className="flex items-center gap-2" style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, color: 'rgba(0,240,255,.45)', letterSpacing: '.12em' }}>
            <span className="w-[5px] h-[5px] rounded-full animate-pulse" style={{ background: c, animationDelay: d }} />
            {l}
          </div>
        ))}
      </div>

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-14 pointer-events-none">
        <div className="w-full lg:w-[56%] flex flex-col items-center md:items-start text-center md:text-left">
          <div className="t-line font-mono text-[10px] md:text-[11px] tracking-[.2em] md:tracking-[.26em] text-[#00F0FF] mb-4 md:mb-6 opacity-90" style={{ fontFamily: "'Share Tech Mono',monospace" }}>
            {'>'} INITIATING_UPLINK // SOLDIER_READY <span className="inline-block w-2 h-[13px] bg-[#00F0FF] ml-1 animate-pulse" />
          </div>
          <h1 style={{ fontFamily: "'Orbitron',sans-serif" }} className="font-black leading-[.88] mb-5 md:mb-6 uppercase select-none">
            {['HACK', 'THE'].map(w => (
              <span key={w} className="hero-word block" style={{ fontSize: 'clamp(40px,8.5vw,108px)', color: '#fff', textShadow: '0 0 30px rgba(255,255,255,.15)' }}>
                {w}
              </span>
            ))}
            <span className="hw-accent block" style={{ fontSize: 'clamp(40px,8.5vw,108px)', color: 'transparent', WebkitTextStroke: '2px #FF2D9B', filter: 'drop-shadow(0 0 22px rgba(255,45,155,.55))' }}>
              SYSTEM
            </span>
          </h1>
          <p className="hero-sub max-w-xl leading-relaxed mb-7 md:mb-9" style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 'clamp(13px,1.5vw,19px)', color: 'rgba(200,205,230,.72)' }}>
            "NEXUS is India's premier national-level tactical hackathon. Join 2500+ elite minds across the country to override legacy systems, bypass security clusters, and engineer the future of the digital frontier. The grand bounty awaits the ultimate architects."
          </p>
          <div className="flex flex-wrap gap-2 md:gap-3 mb-8 md:mb-11 justify-center md:justify-start">
              {[{ t: 'COMBAT_ZONE', b: 'rgba(255,45,155,.35)', bg: 'rgba(255,45,155,.07)' }, { t: '$50,000 BOUNTY', b: 'rgba(0,240,255,.35)', bg: 'rgba(0,240,255,.07)' }, { t: 'GLOBAL_NODES', b: 'rgba(255,45,155,.25)', bg: 'rgba(255,45,155,.05)' }, { t: 'NO_LIMITS', b: 'rgba(252,238,10,.28)', bg: 'rgba(252,238,10,.05)' }].map(({ t, b, bg }) => (
                <span key={t} className="hero-badge text-white/80 uppercase" style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, letterSpacing: '.14em', padding: '7px 12px', border: `1px solid ${b}`, background: bg, clipPath: 'polygon(8px 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%,0 8px)' }}>
                  {t}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 md:gap-5 pointer-events-auto justify-center md:justify-start">
              <MagneticButton className="hero-btn" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                style={{ fontFamily: "'Orbitron',sans-serif", padding: '14px 32px', background: '#00F0FF', color: '#000', fontSize: 11, fontWeight: 800, letterSpacing: 2, clipPath: 'polygon(13px 0,100% 0,100% calc(100% - 13px),calc(100% - 13px) 100%,0 100%,0 13px)', boxShadow: '0 0 40px rgba(0,240,255,.6),0 0 80px rgba(0,240,255,.18)', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}>
                Initialize_
              </MagneticButton>
              <button className="hero-btn text-white/60 uppercase transition-all hover:text-[#FF2D9B] hover:border-[#FF2D9B]" style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 10, letterSpacing: '.14em', padding: '12px 24px', background: 'transparent', border: '1px solid rgba(255,255,255,.2)', cursor: 'pointer' }} onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
                View Protocol
              </button>
            </div>
        </div>
      </div>

      {/* Stats footer */}
      <div className="absolute bottom-0 left-0 w-full grid grid-cols-2 md:flex md:justify-around items-center border-t border-[#00F0FF]/10 px-4 md:px-8 py-3 md:py-[18px] z-20 bg-black/60 backdrop-blur-xl">
        {stats.map((s, i) => (
          <div key={s.label} className="hero-stat flex flex-col items-center gap-1 py-2 md:py-0">
            <span className="font-black text-white tracking-tight" style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 'clamp(18px,3.5vw,40px)', textShadow: '0 0 18px rgba(255,255,255,.2)' }}>
              {s.num}
            </span>
            <span className="uppercase" style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 8, color: '#00F0FF', letterSpacing: '.18em', opacity: .8 }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}