// Hero.jsx — Fixed Cyberpunk Soldier (Imperative build — no shared material bugs)
// Required fonts in index.html:
// <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&family=Rajdhani:wght@300;400;600;700&display=swap" rel="stylesheet">

import { useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Sparkles, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import MagneticButton from '../components/ui/MagneticButton';

// ─── IMPERATIVE SOLDIER ─────────────────────────────────────────
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
    // ── Material factories (each call = new instance) ──
    const M = (hex, opts = {}) => new THREE.MeshStandardMaterial({ color: hex, ...opts });
    const ME = (hex, intensity = 3) => new THREE.MeshStandardMaterial({
      color: hex, emissive: new THREE.Color(hex), emissiveIntensity: intensity, toneMapped: false
    });

    // ── Geometry helpers (add to group, return mesh) ──
    const Box = (g, w, h, d, mat, x, y, z, rx = 0, ry = 0, rz = 0) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); m.position.set(x, y, z); m.rotation.set(rx, ry, rz); g.add(m); return m; };
    const Cyl = (g, rt, rb, h, s, mat, x, y, z, rx = 0, ry = 0, rz = 0) => { const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, s), mat); m.position.set(x, y, z); m.rotation.set(rx, ry, rz); g.add(m); return m; };
    const Sph = (g, r, mat, x, y, z) => { const m = new THREE.Mesh(new THREE.SphereGeometry(r, 16, 16), mat); m.position.set(x, y, z); g.add(m); return m; };
    const Cone = (g, r, h, s, mat, x, y, z, rx = 0, ry = 0, rz = 0) => { const m = new THREE.Mesh(new THREE.ConeGeometry(r, h, s), mat); m.position.set(x, y, z); m.rotation.set(rx, ry, rz); g.add(m); return m; };

    // ── Root group ──
    const sg = new THREE.Group();
    sg.position.set(2.5, -0.9, 0);
    sg.rotation.y = -Math.PI / 5;
    scene.add(sg);
    soldierRef.current = sg;

    // ── HAIR ──
    Sph(sg, 0.35, M(0x050508, { metalness: .1, roughness: .85 }), 0, 2.32, 0);
    [
      [0, .42, -.08, -.25, 0], [.12, .38, -.04, -.28, .18], [-.12, .38, -.04, -.28, -.18],
      [.22, .32, .02, -.3, .32], [-.22, .32, .02, -.3, -.32], [.08, .35, -.14, -.32, .1],
      [-.08, .35, -.14, -.32, -.1], [0, .38, -.18, -.38, 0], [.16, .3, -.1, -.3, .22], [-.16, .3, -.1, -.3, -.22],
    ].forEach(([ox, oh, oz, rx, rz]) =>
      Cone(sg, .062, oh + .15, 5, M(0x030305, { metalness: .15, roughness: .85 }), ox, 2.58 + oh * .35, oz, rx, 0, rz)
    );

    // ── HEAD ──
    Box(sg, .60, .58, .64, M(0x080810, { metalness: .95, roughness: .12 }), 0, 1.92, 0);
    Box(sg, .52, .14, .14, M(0x0c0c1e, { metalness: .9, roughness: .2 }), 0, 2.16, .3);
    Box(sg, .06, .32, .52, M(0x0c0c1e, { metalness: .9 }), -.32, 1.96, 0);
    Box(sg, .06, .32, .52, M(0x0c0c1e, { metalness: .9 }), .32, 1.96, 0);

    // ── GOGGLES ──
    Box(sg, .58, .2, .09, M(0x050508, { metalness: 1, roughness: .04 }), 0, 2.0, .33);
    const eyeL = Box(sg, .2, .13, .07, ME(0xFF2D9B, 5), -.145, 2.0, .37);
    const eyeR = Box(sg, .2, .13, .07, ME(0xFF2D9B, 5), .145, 2.0, .37);
    visorMatsRef.current = [eyeL.material, eyeR.material];
    Box(sg, .06, .08, .08, M(0x111122, { metalness: .9 }), 0, 2.0, .38);

    // ── LOWER MASK ──
    Box(sg, .52, .22, .12, M(0x0a0a1a, { metalness: .85, roughness: .25 }), 0, 1.77, .33);
    [-1, 0, 1].forEach(i => Box(sg, .12, .04, .13, M(0x020205, { metalness: .8 }), i * .15, 1.77, .36));
    Box(sg, .1, .14, .14, M(0x0c0c1e, { metalness: .8 }), -.23, 1.77, .3);
    Box(sg, .1, .14, .14, M(0x0c0c1e, { metalness: .8 }), .23, 1.77, .3);
    // Comm earpiece
    Cyl(sg, .065, .065, .24, 8, M(0x080810, { metalness: .9 }), -.36, 1.96, -.1, 0, 0, Math.PI / 2);
    Sph(sg, .075, ME(0x00F0FF, 3.5), -.5, 1.97, -.1);

    // ── NECK ──
    Cyl(sg, .13, .16, .24, 8, M(0x080810, { metalness: .9 }), 0, 1.6, 0);

    // ── TORSO ──
    Cyl(sg, .52, .38, 1.15, 8, M(0x080810, { metalness: .92, roughness: .15 }), 0, .9, 0);
    Box(sg, .58, .65, .14, M(0x0b0b1c, { metalness: .88, roughness: .25 }), 0, .98, .28);
    Box(sg, .5, .1, .15, M(0x1a1a2e, { metalness: 1, roughness: .06 }), 0, 1.3, .26);
    Box(sg, .44, .08, .15, M(0x1a1a2e, { metalness: 1, roughness: .06 }), 0, .65, .27);
    Box(sg, .06, .55, .09, ME(0x00F0FF, 2.2), -.2, .96, .34);
    Box(sg, .06, .55, .09, ME(0x00F0FF, 2.2), .2, .96, .34);
    Box(sg, .18, .05, .1, ME(0x00F0FF, 1.8), 0, 1.16, .34);
    Box(sg, .18, .05, .1, ME(0x00F0FF, 1.8), 0, .78, .34);
    [-1, 0, 1].forEach(i => Box(sg, .3, .13, .11, M(0x0a0a18, { metalness: .8 }), i * .12, .5 + i * .01, .28));
    Box(sg, .065, .62, .12, M(0x0d0d20, { metalness: .7 }), -.13, .9, .3, 0, 0, .15);
    Box(sg, .065, .62, .12, M(0x0d0d20, { metalness: .7 }), .13, .9, .3, 0, 0, -.15);

    // ── LEFT SHOULDER ──
    const lSh = new THREE.Group(); lSh.position.set(-.78, 1.15, 0); lSh.rotation.z = .2;
    Box(lSh, .4, .68, .4, M(0x0b0b1c, { metalness: .9, roughness: .2 }), 0, 0, 0);
    Box(lSh, .42, .14, .42, M(0x0e0e24, { metalness: .85 }), 0, .3, 0);
    Box(lSh, .38, .11, .38, ME(0xFF2D9B, 1.8), 0, .42, 0);
    sg.add(lSh);
    Cyl(sg, .18, .15, .65, 8, M(0x080810, { metalness: .88 }), -.78, .72, 0);
    Cyl(sg, .15, .13, .6, 8, M(0x0c0c1e, { metalness: .85 }), -.84, .28, .18, .55, 0, .12);
    Box(sg, .22, .2, .26, M(0x0a0a18, { metalness: .92 }), -.86, .02, .3);
    Box(sg, .18, .06, .24, ME(0xFF2D9B, 1.5), -.86, .14, .32);

    // ── RIGHT SHOULDER ──
    const rSh = new THREE.Group(); rSh.position.set(.78, 1.15, 0); rSh.rotation.z = -.18;
    Box(rSh, .4, .68, .4, M(0x0b0b1c, { metalness: .9, roughness: .2 }), 0, 0, 0);
    Box(rSh, .42, .14, .42, M(0x0e0e24, { metalness: .85 }), 0, .3, 0);
    Box(rSh, .38, .11, .38, ME(0x00F0FF, 1.8), 0, .42, 0);
    sg.add(rSh);
    Cyl(sg, .18, .15, .65, 8, M(0x080810, { metalness: .88 }), .78, .72, 0);
    Cyl(sg, .15, .13, .6, 8, M(0x0c0c1e, { metalness: .85 }), .78, .25, .22, .52, 0, -.1);

    // ── LEGS ──
    [-.24, .24].forEach(x => {
      Cyl(sg, .24, .19, .72, 8, M(0x080810, { metalness: .88 }), x, -.22, 0);
      Box(sg, .28, .13, .32, M(0x0c0c1e, { metalness: .85 }), x, -.16, .12);
      Box(sg, .22, .06, .28, ME(0x00F0FF, 1.4), x, -.1, .15);
    });
    Box(sg, .05, .5, .07, ME(0x00F0FF, 1.2), -.12, -.22, .2);
    Box(sg, .05, .5, .07, ME(0x00F0FF, 1.2), .12, -.22, .2);

    // ── SNIPER RIFLE ──
    const gg = new THREE.Group();
    gg.position.set(.66, .58, .38); gg.rotation.set(.14, -.06, 0);
    Box(gg, .13, .16, .58, M(0x080810, { metalness: .92, roughness: .1 }), 0, .01, -.34);
    Box(gg, .14, .2, .7, M(0x1a1a2e, { metalness: 1, roughness: .06 }), 0, .03, .12);
    Box(gg, .18, .12, .5, M(0x0a0a18, { metalness: .9 }), 0, .14, .12);
    Box(gg, .1, .32, .15, M(0x060608, { metalness: .7, roughness: .4 }), 0, -.18, .14);
    Cyl(gg, .052, .06, .95, 8, M(0x1a1a2e, { metalness: 1, roughness: .05 }), 0, 0, .68, Math.PI / 2, 0, 0);
    Cyl(gg, .08, .08, .2, 8, M(0x0a0a18, { metalness: .9 }), 0, 0, 1.15, Math.PI / 2, 0, 0);
    const bGlow = new THREE.Mesh(new THREE.CylinderGeometry(.056, .056, .05, 8), ME(0x00F0FF, 9));
    bGlow.position.set(0, 0, 1.28); bGlow.rotation.x = Math.PI / 2; gg.add(bGlow);
    // Bipod
    Cyl(gg, .018, .018, .38, 6, M(0x080810, { metalness: .8 }), -.14, 0, .55, .15, 0, .18);
    Cyl(gg, .018, .018, .38, 6, M(0x080810, { metalness: .8 }), .14, 0, .55, .15, 0, -.18);
    // Scope
    Cyl(gg, .06, .06, .55, 8, M(0x0a0a18, { metalness: .9 }), 0, .17, .14, Math.PI / 2, 0, 0);
    Sph(gg, .065, M(0x000005, { metalness: .1, roughness: 0, transparent: true, opacity: .8 }), 0, .17, -.14);
    Sph(gg, .065, M(0x000005, { metalness: .1, roughness: 0, transparent: true, opacity: .8 }), 0, .17, .42);
    // Magazine
    Box(gg, .09, .32, .16, M(0x080810, { metalness: .88 }), 0, -.24, -.04);
    Box(gg, .08, .05, .14, ME(0x00F0FF, 1.2), 0, -.41, -.04);
    // Muzzle flash
    const mMat = new THREE.MeshStandardMaterial({
      color: 0x00F0FF, emissive: new THREE.Color(0x00F0FF), emissiveIntensity: 0,
      toneMapped: false, transparent: true, opacity: .9, side: THREE.DoubleSide
    });
    const mFlash = new THREE.Mesh(new THREE.ConeGeometry(.18, .52, 16, 1, true), mMat);
    mFlash.position.set(0, 0, 1.54); mFlash.rotation.x = -Math.PI / 2; mFlash.visible = false; gg.add(mFlash);
    muzzleRef.current = mFlash;
    muzzleMatRef.current = mMat;
    // Muzzle light
    const mLight = new THREE.PointLight(0x00F0FF, 0, 8); mLight.position.set(0, 0, 1.6); gg.add(mLight);
    muzzleLRef.current = mLight;
    sg.add(gg);
    gunGRef.current = gg;

    return () => {
      scene.remove(sg);
      // Dispose geometries & materials
      sg.traverse(obj => { if (obj.geometry) obj.geometry.dispose(); if (obj.material) obj.material.dispose(); });
    };
  }, [scene]);

  useFrame((_, delta) => {
    if (!pausedRef.current) timeRef.current += delta;
    const t = timeRef.current;
    const sg = soldierRef.current;
    const gg = gunGRef.current;
    if (!sg) return;

    sg.position.y = -0.9 + Math.sin(t * 1.4) * .15;
    sg.rotation.y = -Math.PI / 5 + Math.sin(t * .75) * .1;
    sg.rotation.x = Math.sin(t * 1.4) * .012;

    if (gg) { gg.rotation.x = .14 + Math.sin(t * 2.2) * .022; gg.rotation.z = Math.sin(t * 1.8) * .018; }

    // Visor pulse
    const vI = 4.5 + Math.sin(t * 8) * 2.8;
    visorMatsRef.current.forEach(m => { if (m) m.emissiveIntensity = vI; });

    // Muzzle fire
    const firing = Math.sin(t * 30) > .78 && Math.sin(t * 17) > -.2;
    if (muzzleRef.current) { muzzleRef.current.visible = firing; if (firing) muzzleRef.current.rotation.y = t * 18; }
    if (muzzleMatRef.current) muzzleMatRef.current.emissiveIntensity = firing ? 25 : 0;
    if (muzzleLRef.current) muzzleLRef.current.intensity = firing ? 22 : 0;
  });

  return null; // Scene built imperatively
}

// ─── STATS ──────────────────────────────────────────────────────
const stats = [
  { num: '2500+', label: 'Participants' },
  { num: '48H', label: 'Hacking Time' },
  { num: '$50K', label: 'Prize Pool' },
  { num: '32', label: 'Countries' },
];

// ─── HERO ───────────────────────────────────────────────────────
export default function Hero() {
  const heroRef = useRef(null);
  const pausedRef = useRef(false);

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
    <section id="hero" ref={heroRef}
      className="relative min-h-screen w-full flex items-center bg-[#010103] overflow-hidden"
      onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>

      {/* Perspective grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[.3]" style={{
        backgroundImage: 'linear-gradient(rgba(0,240,255,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(0,240,255,.08) 1px,transparent 1px)',
        backgroundSize: '60px 60px',
        transform: 'perspective(700px) rotateX(62deg) scaleX(1.4)',
        transformOrigin: '50% 100%'
      }} />

      {/* Three.js Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, .3, 9]} fov={50} />
          <ambientLight intensity={3} color="#111133" />
          <pointLight position={[-5, 4, 6]} color="#00F0FF" intensity={10} />
          <pointLight position={[7, 2, 4]} color="#FF2D9B" intensity={7} />
          <pointLight position={[2, 7, -6]} color="#ffffff" intensity={4} />
          <pointLight position={[0, -5, 3]} color="#0044ff" intensity={3} />
          <Stars radius={100} depth={50} count={3000} factor={4} fade speed={1.5} />
          <Sparkles count={120} scale={12} size={2} speed={0.4} opacity={0.7} color="#FCEE0A" />
          <Sparkles count={60} scale={10} size={1.5} speed={0.6} opacity={0.5} color="#FF2D9B" />
          <gridHelper args={[44, 44, 0x00F0FF, 0x00F0FF]} position={[0, -2.4, 0]}
            // @ts-ignore
            material-opacity={0.055} material-transparent={true} />
          <CyberpunkSoldier pausedRef={pausedRef} />
        </Canvas>
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center,transparent 22%,rgba(1,1,3,.93) 100%)' }} />
      {/* Scanlines */}
      <div className="absolute inset-0 z-[1] pointer-events-none opacity-[.04]"
        style={{ background: 'repeating-linear-gradient(0deg,#fff,#fff 1px,transparent 1px,transparent 3px)', backgroundSize: '100% 3px' }} />

      {/* Corner brackets */}
      {[
        'top-[18px] left-[18px] border-t-2 border-l-2',
        'top-[18px] right-[18px] border-t-2 border-r-2',
        'bottom-[108px] left-[18px] border-b-2 border-l-2',
        'bottom-[108px] right-[18px] border-b-2 border-r-2',
      ].map((c, i) => (
        <div key={i} className={`absolute z-10 pointer-events-none w-14 h-14 border-[rgba(0,240,255,.55)] ${c}`} />
      ))}

      {/* Right HUD */}
      <div className="absolute right-7 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-2.5 pointer-events-none">
        {[
          { c: '#00F0FF', l: 'NODE_ACTIVE', d: '0s' },
          { c: '#FF2D9B', l: 'FIREWALL_DOWN', d: '.5s' },
          { c: '#FCEE0A', l: 'UPLINK_STABLE', d: '1s' },
          { c: '#00F0FF', l: 'COMBAT_READY', d: '.3s' },
        ].map(({ c, l, d }) => (
          <div key={l} className="flex items-center gap-2"
            style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, color: 'rgba(0,240,255,.45)', letterSpacing: '.12em' }}>
            <span className="w-[5px] h-[5px] rounded-full animate-pulse" style={{ background: c, animationDelay: d }} />
            {l}
          </div>
        ))}
      </div>

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-14 pointer-events-none">
        <div className="w-full lg:w-[56%] flex flex-col items-start">

          <div className="t-line font-mono text-[11px] tracking-[.26em] text-[#00F0FF] mb-6 opacity-90"
            style={{ fontFamily: "'Share Tech Mono',monospace" }}>
            {'>'} INITIATING_UPLINK // SOLDIER_READY <span className="inline-block w-2 h-[13px] bg-[#00F0FF] ml-1 animate-pulse" />
          </div>

          <h1 style={{ fontFamily: "'Orbitron',sans-serif" }} className="font-black leading-[.88] mb-6 uppercase select-none">
            {['HACK', 'THE'].map(w => (
              <span key={w} className="hero-word block"
                style={{ fontSize: 'clamp(48px,8.5vw,108px)', color: '#fff', textShadow: '0 0 30px rgba(255,255,255,.15)' }}>
                {w}
              </span>
            ))}
            <span className="hw-accent block"
              style={{
                fontSize: 'clamp(48px,8.5vw,108px)', color: 'transparent',
                WebkitTextStroke: '2px #FF2D9B',
                filter: 'drop-shadow(0 0 22px rgba(255,45,155,.55))'
              }}>
              SYSTEM
            </span>
          </h1>

          <p className="hero-sub max-w-xl leading-relaxed mb-9"
            style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 'clamp(14px,1.5vw,19px)', color: 'rgba(200,205,230,.72)' }}>
            The grid is calling. Override protocols, bypass security clusters,
            and claim the bounty. The mainframe is yours for the taking.
          </p>

          <div className="flex flex-wrap gap-3 mb-11">
            {[
              { t: 'COMBAT_ZONE', b: 'rgba(255,45,155,.35)', bg: 'rgba(255,45,155,.07)' },
              { t: '$50,000 BOUNTY', b: 'rgba(0,240,255,.35)', bg: 'rgba(0,240,255,.07)' },
              { t: 'GLOBAL_NODES', b: 'rgba(255,45,155,.25)', bg: 'rgba(255,45,155,.05)' },
              { t: 'NO_LIMITS', b: 'rgba(252,238,10,.28)', bg: 'rgba(252,238,10,.05)' },
            ].map(({ t, b, bg }) => (
              <span key={t} className="hero-badge text-white/80 uppercase"
                style={{
                  fontFamily: "'Share Tech Mono',monospace", fontSize: 10, letterSpacing: '.17em',
                  padding: '8px 16px', border: `1px solid ${b}`, background: bg,
                  clipPath: 'polygon(8px 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%,0 8px)'
                }}>
                {t}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-5 pointer-events-auto">
            <MagneticButton className="hero-btn"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                fontFamily: "'Orbitron',sans-serif", padding: '17px 46px',
                background: '#00F0FF', color: '#000', fontSize: 12, fontWeight: 800, letterSpacing: 2,
                clipPath: 'polygon(13px 0,100% 0,100% calc(100% - 13px),calc(100% - 13px) 100%,0 100%,0 13px)',
                boxShadow: '0 0 40px rgba(0,240,255,.6),0 0 80px rgba(0,240,255,.18)',
                textTransform: 'uppercase', border: 'none', cursor: 'pointer'
              }}>
              Initialize_
            </MagneticButton>
            <button className="hero-btn text-white/60 uppercase transition-all hover:text-[#FF2D9B] hover:border-[#FF2D9B]"
              style={{
                fontFamily: "'Share Tech Mono',monospace", fontSize: 10, letterSpacing: '.14em',
                padding: '15px 28px', background: 'transparent', border: '1px solid rgba(255,255,255,.2)', cursor: 'pointer'
              }}
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
              View Protocol
            </button>
          </div>
        </div>
      </div>

      {/* Stats footer */}
      <div className="absolute bottom-0 left-0 w-full flex justify-around items-center border-t border-[#00F0FF]/10 px-8 py-[18px] z-20 bg-black/60 backdrop-blur-xl">
        {stats.map((s, i) => (
          <>
            {i > 0 && <div key={`d${i}`} className="w-px h-9 bg-[#00F0FF]/12" />}
            <div key={s.label} className="hero-stat flex flex-col items-center gap-1">
              <span className="font-black text-white tracking-tight"
                style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 'clamp(22px,3.5vw,40px)', textShadow: '0 0 18px rgba(255,255,255,.2)' }}>
                {s.num}
              </span>
              <span className="uppercase"
                style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: 9, color: '#00F0FF', letterSpacing: '.22em', opacity: .8 }}>
                {s.label}
              </span>
            </div>
          </>
        ))}
      </div>

    </section>
  );
}