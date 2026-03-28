import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, Sparkles, Html } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import MagneticButton from '../components/ui/MagneticButton';

// =========================================================================
// THE CYBER-MECHA BOT (With Game-Style Floating Text)
// =========================================================================
function CyberMecha() {
  const groupRef = useRef();
  const gunArmRef = useRef();
  const visorRef = useRef();

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();
    
    // Character floating and breathing animation
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 2) * 0.1;
      // Make the bot slightly look at the mouse horizontally
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, (pointer.x * Math.PI) / 4, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, (-pointer.y * Math.PI) / 8, 0.05);
    }

    // Gun recoil / aiming animation
    if (gunArmRef.current) {
      gunArmRef.current.rotation.x = Math.sin(t * 4) * 0.05; 
    }

    // Visor pulse effect
    if (visorRef.current) {
      visorRef.current.material.emissiveIntensity = 2 + Math.sin(t * 8) * 1.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={groupRef} position={[2, -0.5, 0]} scale={1.2}>
        
        {/* --- GAME STYLE FLOATING TEXT (NAMEPLATE) --- */}
        <Html position={[0, 2.2, 0]} center zIndexRange={[100, 0]}>
          <div className="flex flex-col items-center pointer-events-none w-48">
            <div className="text-cyber-cyan font-orbitron text-xs font-bold tracking-widest uppercase bg-black/60 px-3 py-1 border border-cyber-cyan/50 backdrop-blur-sm rounded-sm whitespace-nowrap shadow-[0_0_15px_rgba(0,240,255,0.4)]">
              [Lvl 99] SYS_ADMIN
            </div>
            {/* Health Bar UI */}
            <div className="w-24 h-1.5 bg-black/80 border border-cyber-pink/50 mt-1 rounded-full overflow-hidden">
              <div className="w-full h-full bg-cyber-pink shadow-[0_0_10px_#FF003C]"></div>
            </div>
          </div>
        </Html>

        {/* Head / Helmet */}
        <mesh position={[0, 1.2, 0]}>
          <boxGeometry args={[0.6, 0.6, 0.7]} />
          <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Glowing Visor (Cyberpunk Pink) */}
        <mesh ref={visorRef} position={[0, 1.25, 0.36]}>
          <boxGeometry args={[0.5, 0.15, 0.05]} />
          <meshStandardMaterial color="#FF003C" emissive="#FF003C" emissiveIntensity={3} toneMapped={false} />
        </mesh>

        {/* Main Torso (Armor) */}
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.5, 0.3, 1, 8]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.3} />
        </mesh>

        {/* Neon Accents on Torso */}
        <mesh position={[0, 0.4, 0.26]}>
          <boxGeometry args={[0.2, 0.6, 0.1]} />
          <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={2} />
        </mesh>

        {/* Left Arm (Shield/Plating) */}
        <mesh position={[-0.7, 0.5, 0]} rotation={[0, 0, 0.2]}>
          <boxGeometry args={[0.3, 0.8, 0.3]} />
          <meshStandardMaterial color="#222" metalness={0.7} roughness={0.4} />
        </mesh>

        {/* Right Arm (THE GUN) */}
        <group ref={gunArmRef} position={[0.7, 0.6, 0.2]}>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color="#111" />
          </mesh>
          <mesh position={[0, 0, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.1, 0.15, 1.2, 8]} />
            <meshStandardMaterial color="#050505" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0, 0, 1.2]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.2, 8]} />
            <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={5} toneMapped={false} />
          </mesh>
        </group>

      </group>
    </Float>
  );
}

// =========================================================================
// MAIN HERO SECTION
// =========================================================================

const stats = [
  { num: '2500+', label: 'Participants' },
  { num: '48H',   label: 'Hacking Time' },
  { num: '$50K',  label: 'Prize Pool'   },
  { num: '32',    label: 'Countries'    },
];

export default function Hero() {
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-word', { y: 80, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.5 });
      gsap.from('.hero-sub', { opacity: 0, y: 30, duration: 1, delay: 1.2, ease: 'power2.out' });
      gsap.from('.hero-badge', { opacity: 0, scale: 0.8, duration: 0.5, stagger: 0.1, delay: 1.5 });
      gsap.from('.hero-btn',   { opacity: 0, y: 20, duration: 0.6, stagger: 0.15, delay: 1.8 });
      gsap.from('.hero-stat',  { opacity: 0, y: 20, duration: 0.6, stagger: 0.1,  delay: 2.2 });
    }, titleRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={titleRef} style={{
      minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'flex-start',
      overflow: 'hidden', background: '#020205'
    }}>
      
      {/* Dynamic Grid Floor */}
      <div style={{
        position:'absolute', inset:0,
        backgroundImage:'linear-gradient(rgba(0,240,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,240,255,0.05) 1px,transparent 1px)',
        backgroundSize:'60px 60px', transform: 'perspective(500px) rotateX(60deg)', transformOrigin: 'bottom', opacity: 0.4
      }}/>

      {/* THREE.JS CANVAS - Proper Lighting Included */}
      <div style={{ position:'absolute', inset:0, zIndex:0 }}>
        <Canvas camera={{ position:[0, 0, 6], fov:50 }}>
          <ambientLight intensity={2.5} />
          <directionalLight position={[0, 2, 5]} color="#ffffff" intensity={3} />
          <directionalLight position={[5, 2, 5]} color="#00F0FF" intensity={6} />
          <directionalLight position={[-5, -2, 5]} color="#FF003C" intensity={5} />
          
          <Stars radius={80} depth={60} count={3000} factor={3} fade speed={1.5} />
          <Sparkles count={200} scale={10} size={2} speed={0.4} opacity={0.5} color="#FCEE0A" />
          
          <CyberMecha />
        </Canvas>
      </div>

      {/* Vignette & Scanlines */}
      <div style={{ position:'absolute',inset:0,zIndex:1, background:'radial-gradient(circle at center,transparent 10%,rgba(2,2,5,0.9) 100%)' }}/>
      <div style={{ position:'absolute',inset:0,zIndex:1,pointerEvents:'none', background:'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.1) 2px,rgba(0,0,0,0.1) 4px)' }}/>

      {/* CONTENT UI */}
      <div style={{ position:'relative', zIndex:2, textAlign:'left', padding:'0 5%', maxWidth: 1200, width: '100%' }}>
        <div style={{ width: '60%' }}> 
          <div style={{ fontFamily:'"Share Tech Mono",monospace',fontSize:14,color:'#00F0FF', letterSpacing:4,marginBottom:24,opacity:0.9 }}>
            {'>'} SYS.OVERRIDE_ENABLED // BOT_ACTIVE
          </div>
          <h1 style={{ fontFamily:'Orbitron,sans-serif',lineHeight:1.1,marginBottom:16 }}>
            {['HACK','THE'].map(w=>(
              <span key={w} className="hero-word" style={{
                display:'inline-block',fontSize:'clamp(40px,7vw,90px)', fontWeight:900,color:'#fff',marginRight:20,
                textShadow:'0 0 30px rgba(0,240,255,0.3)'
              }}>{w} </span>
            ))}
            <br/>
            <span className="hero-word" style={{
              display:'inline-block', fontSize:'clamp(40px,7vw,90px)',fontWeight:900,
              WebkitTextStroke:'2px #FF003C',color:'transparent', filter:'drop-shadow(0 0 20px rgba(255,0,60,0.6))', textShadow:'none'
            }}>SYSTEM</span>
          </h1>
          <p className="hero-sub" style={{
            fontSize:18,color:'rgba(255,255,255,0.6)', maxWidth:500,margin:'24px 0 40px',lineHeight:1.6, fontFamily: 'Inter, sans-serif'
          }}>
            The world's most immersive cyberpunk hackathon. Build tech, bypass security, and secure the mainframe. Are you in?
          </p>
          <div style={{ display:'flex',gap:12,justifyContent:'flex-start',flexWrap:'wrap',marginBottom:44 }}>
            {['COMBAT ZONE','$50,000 BOUNTY','GLOBAL','NO LIMITS'].map(b=>(
              <span key={b} className="hero-badge" style={{
                fontFamily:'"Share Tech Mono",monospace',fontSize:11, padding:'6px 16px',border:'1px solid rgba(255,0,60,0.4)',
                color:'rgba(255,255,255,0.8)',letterSpacing:2, background:'rgba(255,0,60,0.05)', borderRadius: '2px'
              }}>{b}</span>
            ))}
          </div>
          <div style={{ display:'flex',gap:20,justifyContent:'flex-start',flexWrap:'wrap' }}>
            <MagneticButton className="hero-btn" onClick={()=>document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})}
              style={{
                padding:'16px 40px',background:'#00F0FF',color:'#000', fontFamily:'Orbitron,sans-serif',fontSize:13,fontWeight:800,letterSpacing:1,
                clipPath:'polygon(15px 0,100% 0,100% calc(100% - 15px),calc(100% - 15px) 100%,0 100%,0 15px)',
                boxShadow:'0 0 25px rgba(0,240,255,0.6)',textTransform:'uppercase', border: 'none', cursor: 'pointer'
              }}>
              Initialize_
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, width: '100%', display:'flex',gap:0,justifyContent:'space-around',
        borderTop:'1px solid rgba(0,240,255,0.15)',padding:'30px 5%', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', zIndex: 3
      }}>
        {stats.map((s)=>(
          <div key={s.label} className="hero-stat" style={{ textAlign:'center' }}>
            <div style={{ fontFamily:'Orbitron,sans-serif',fontSize:'clamp(24px, 3vw, 36px)',fontWeight:900, color:'#fff',textShadow:'0 0 15px rgba(255,255,255,0.3)' }}>{s.num}</div>
            <div style={{ fontFamily:'"Share Tech Mono",monospace',fontSize:12, color:'#00F0FF',letterSpacing:2,marginTop:6 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}