import { useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, PerspectiveCamera, Environment, Sparkles } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

// =========================================================================
// THE CYBER-SOLDIER (3D Model with Gun)
// =========================================================================
function AnimatedSoldier({ progressRef }) {
  const group = useRef();
  const gunRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      // Combat Idle: Floating and subtle rotation
      group.current.position.y = Math.sin(t * 1.2) * 0.15;

      // SCROLL ANIMATION: Character slides and rotates based on scroll progress
      // Progress 0 to 1 comes from ScrollTrigger
      const p = progressRef.current;
      group.current.rotation.y = -Math.PI / 3 + (p * Math.PI / 1.5);
      group.current.position.x = 3 - (p * 2);
    }

    if (gunRef.current) {
      // Weapon sway
      gunRef.current.rotation.x = (Math.PI / 2) + Math.sin(t * 2.5) * 0.04;
    }
  });

  return (
    <group ref={group} position={[2.5, -1.5, 0]} scale={2}>
      {/* Mecha Head */}
      <mesh position={[0, 1.4, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#0a0a0a" metalness={1} roughness={0.1} />
      </mesh>

      {/* Glowing Tactical Visor */}
      <mesh position={[0, 1.45, 0.26]}>
        <boxGeometry args={[0.42, 0.12, 0.05]} />
        <meshStandardMaterial color="#FF003C" emissive="#FF003C" emissiveIntensity={12} />
      </mesh>

      {/* Heavy Armor Torso */}
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[0.75, 1.3, 0.45]} />
        <meshStandardMaterial color="#050505" metalness={0.8} />
      </mesh>

      {/* Cyber Core (Cyan) */}
      <mesh position={[0, 0.8, 0.22]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={8} />
      </mesh>

      {/* PLASMA RIFLE */}
      <group ref={gunRef} position={[0.4, 0.6, 0.5]} rotation={[Math.PI / 2, 0, 0.2]}>
        <mesh>
          <boxGeometry args={[0.18, 1.4, 0.3]} />
          <meshStandardMaterial color="#000" />
        </mesh>
        <mesh position={[0, -0.9, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 1]} />
          <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={15} />
        </mesh>
      </group>
    </group>
  );
}

// =========================================================================
// MAIN ABOUT COMPONENT
// =========================================================================
export default function About() {
  const secRef = useRef(null);
  const barTop = useRef(null);
  const barBot = useRef(null);
  const contentScope = useRef(null);

  // Ref to store scroll progress for Three.js without triggering re-renders
  const progress = useRef(0);

  useEffect(() => {
    // GSAP Context ensures selectors like ".about-anim" are found ONLY inside secRef
    let ctx = gsap.context(() => {

      // 1. Cinematic Black Bars Reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: secRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      });

      tl.to(barTop.current, { yPercent: -100, duration: 0.8, ease: 'expo.inOut' })
        .to(barBot.current, { yPercent: 100, duration: 0.8, ease: 'expo.inOut' }, '<');

      // 2. Track Scroll Progress for the 3D Character
      ScrollTrigger.create({
        trigger: secRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          progress.current = self.progress;
        }
      });

      // 3. Text Reveal Animation (Fixed selector issue)
      if (document.querySelectorAll('.about-reveal').length > 0) {
        gsap.from('.about-reveal', {
          scrollTrigger: {
            trigger: contentScope.current,
            start: 'top 75%',
          },
          x: -60,
          opacity: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: 'power4.out'
        });
      }

      // 4. Stat Cards Scale-up
      gsap.from('.stat-card-box', {
        scrollTrigger: {
          trigger: contentScope.current,
          start: 'top 65%',
        },
        scale: 0.5,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        delay: 0.4
      });

    }, secRef); // Scope everything to secRef

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={secRef}
      className="relative w-full min-h-screen py-24 px-6 md:px-12 bg-[#010103] overflow-hidden flex items-center"
    >

      {/* 1. THREE.JS LAYER (Animated Character) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={40} />
          <ambientLight intensity={1} />
          <pointLight position={[10, 10, 10]} color="#FF003C" intensity={5} />
          <pointLight position={[-10, -5, 5]} color="#00F0FF" intensity={3} />

          <Stars radius={100} depth={50} count={3000} factor={4} fade speed={1} />
          <Sparkles count={80} scale={10} size={2} color="#00F0FF" />

          <AnimatedSoldier progressRef={progress} />
          <Environment preset="night" />
        </Canvas>
      </div>

      {/* 2. CINEMATIC BARS LAYER */}
      <div ref={barTop} className="absolute top-0 left-0 w-full h-[50.5vh] bg-black z-[100] border-b border-cyber-cyan/20" />
      <div ref={barBot} className="absolute bottom-0 left-0 w-full h-[50.5vh] bg-black z-[100] border-t border-cyber-pink/20" />

      {/* 3. CONTENT UI LAYER */}
      <div ref={contentScope} className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        <div className="max-w-2xl">
          {/* Tagline */}
          <div className="about-reveal flex items-center gap-4 mb-8">
            <span className="font-mono text-xs text-cyber-pink tracking-[0.4em] font-bold uppercase tracking-tighter shadow-sm">
              // Neural_Link_Active
            </span>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-cyber-pink/50 to-transparent" />
          </div>

          {/* Heading */}
          <h2 className="about-reveal font-orbitron font-black text-white leading-[0.95] mb-8 uppercase" style={{ fontSize: 'clamp(40px, 7vw, 90px)' }}>
            The <span className="text-cyber-cyan drop-shadow-[0_0_20px_#00F0FF]">Grid</span><br />
            <span className="text-transparent" style={{ WebkitTextStroke: '2px #FF003C', filter: 'drop-shadow(0 0 10px #FF003C)' }}>Anomaly</span>
          </h2>

          {/* Lore Text */}
          <p className="about-reveal font-inter text-gray-400 text-lg md:text-xl leading-relaxed mb-10 border-l-4 border-cyber-cyan pl-6 py-2 bg-white/5 backdrop-blur-md rounded-r-lg">
            NEXUS is the system override. A hyper-immersive, decentralized battleground where elite agents unite to rewrite the digital frontier.
            <span className="text-white block mt-2 opacity-80">48 Hours. No Limits. Zero Mercy.</span>
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 about-reveal">
            {[
              { val: 'JUL 25', label: 'IGNITION', col: '#00F0FF' },
              { val: 'GLOBAL', label: 'SCALE', col: '#FF003C' },
              { val: 'WEB3', label: 'CORE', col: '#FFE600' },
              { val: '48H', label: 'LIMIT', col: '#00FF88' },
            ].map((s) => (
              <div key={s.label} className="stat-card-box p-4 bg-black/80 border border-white/10 rounded-sm hover:border-cyber-cyan/40 transition-all text-center group">
                <div className="font-orbitron font-black text-xl mb-1 group-hover:scale-110 transition-transform" style={{ color: s.col, textShadow: `0 0 10px ${s.col}80` }}>{s.val}</div>
                <div className="font-mono text-[9px] text-gray-600 tracking-widest uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
}