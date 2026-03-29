/**
 * Tracks.jsx
 * DEPS: npm install three gsap @react-three/fiber @react-three/drei
 * Needs: useWebGL.js (same folder), TiltCard.jsx at src/components/ui/TiltCard.jsx
 */
import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Sparkles, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useWebGL from './useWebGL';
import TiltCard from '../components/ui/TiltCard';

gsap.registerPlugin(ScrollTrigger);

// ─── i18n ─────────────────────────────────────────────────────────────────────
const i18n = {
  en: {
    heading: 'Choose Your', accent: 'Battleground', tagline: '// SECTORS', dir: 'ltr', tracks: [
      { name: 'Web3 & DeFi', desc: 'Build decentralized apps, smart contracts, DAOs and next-gen financial protocols on-chain.', tags: ['Solidity', 'Ethereum', 'IPFS'] },
      { name: 'AI & Machine Learning', desc: 'Leverage AI and ML to build intelligent systems, generative models, and real-world automation.', tags: ['Python', 'TensorFlow', 'LLMs'] },
      { name: 'Cybersecurity', desc: 'Develop cutting-edge security tools, ethical hacking solutions and privacy-preserving protocols.', tags: ['CTF', 'Cryptography', 'Pentesting'] },
      { name: 'Open Innovation', desc: 'No boundaries. Build anything that creates meaningful impact — AR/VR, IoT, climate tech, and more.', tags: ['No Limits', 'Any Stack', 'Impact'] },
    ]
  },
  ja: {
    heading: '戦場を', accent: '選択せよ', tagline: '// セクター', dir: 'ltr', tracks: [
      { name: 'Web3 & DeFi', desc: '分散型アプリ、スマートコントラクト、DAO、次世代金融プロトコルをオンチェーンで構築。', tags: ['Solidity', 'Ethereum', 'IPFS'] },
      { name: 'AI & ML', desc: 'AIとMLを活用してインテリジェントシステム、生成モデル、自動化ソリューションを開発。', tags: ['Python', 'TensorFlow', 'LLMs'] },
      { name: 'サイバーセキュリティ', desc: '最先端のセキュリティツール、倫理的ハッキング、プライバシー保護プロトコルを開発。', tags: ['CTF', '暗号', 'ペンテスト'] },
      { name: 'オープンイノベーション', desc: '制限なし。AR/VR、IoT、気候技術など、意義あるインパクトを生む何でも構築。', tags: ['無制限', '技術自由', 'インパクト'] },
    ]
  },
  de: {
    heading: 'Wähle Dein', accent: 'Schlachtfeld', tagline: '// SEKTOREN', dir: 'ltr', tracks: [
      { name: 'Web3 & DeFi', desc: 'Dezentrale Apps, Smart Contracts, DAOs und Finanzprotokolle der nächsten Generation bauen.', tags: ['Solidity', 'Ethereum', 'IPFS'] },
      { name: 'KI & ML', desc: 'KI und ML nutzen, um intelligente Systeme, generative Modelle und Automatisierung zu bauen.', tags: ['Python', 'TensorFlow', 'LLMs'] },
      { name: 'Cybersicherheit', desc: 'Modernste Sicherheitstools, Ethical Hacking und datenschutzerhaltende Protokolle entwickeln.', tags: ['CTF', 'Kryptografie', 'Pentesting'] },
      { name: 'Offene Innovation', desc: 'Keine Grenzen. Baue alles, was echten Einfluss schafft — AR/VR, IoT, Klimatechnologie.', tags: ['Keine Grenzen', 'Jeder Stack', 'Impact'] },
    ]
  },
  fr: {
    heading: 'Choisis Ton', accent: 'Champ de Bataille', tagline: '// SECTEURS', dir: 'ltr', tracks: [
      { name: 'Web3 & DeFi', desc: 'Construis des dApps, smart contracts, DAOs et protocoles financiers de prochaine génération.', tags: ['Solidity', 'Ethereum', 'IPFS'] },
      { name: 'IA & ML', desc: "Exploite l'IA et le ML pour des systèmes intelligents, modèles génératifs et automatisation.", tags: ['Python', 'TensorFlow', 'LLMs'] },
      { name: 'Cybersécurité', desc: 'Développe des outils de sécurité de pointe, solutions de hacking éthique et protocoles de confidentialité.', tags: ['CTF', 'Cryptographie', 'Pentesting'] },
      { name: 'Innovation Ouverte', desc: "Aucune limite. Construis tout ce qui crée un impact — AR/VR, IoT, technologies climatiques.", tags: ['Sans Limites', 'Toute Stack', 'Impact'] },
    ]
  },
  zh: {
    heading: '选择你的', accent: '战场', tagline: '// 赛道', dir: 'ltr', tracks: [
      { name: 'Web3 & DeFi', desc: '构建去中心化应用、智能合约、DAO及下一代链上金融协议。', tags: ['Solidity', '以太坊', 'IPFS'] },
      { name: 'AI & ML', desc: '利用人工智能和机器学习构建智能系统、生成模型和自动化解决方案。', tags: ['Python', 'TensorFlow', 'LLMs'] },
      { name: '网络安全', desc: '开发前沿安全工具、道德黑客解决方案和隐私保护协议。', tags: ['CTF', '密码学', '渗透测试'] },
      { name: '开放创新', desc: '没有边界。构建任何具有重大影响力的事物——AR/VR、物联网、气候科技等。', tags: ['无限制', '任意技术栈', '影响力'] },
    ]
  },
  ar: {
    heading: 'اختر', accent: 'ساحة المعركة', tagline: '// القطاعات', dir: 'rtl', tracks: [
      { name: 'Web3 & DeFi', desc: 'ابنِ تطبيقات لامركزية وعقوداً ذكية وDAOs وبروتوكولات مالية من الجيل التالي.', tags: ['Solidity', 'Ethereum', 'IPFS'] },
      { name: 'الذكاء الاصطناعي', desc: 'استخدم الذكاء الاصطناعي لبناء أنظمة ذكية ونماذج توليدية وأتمتة حقيقية.', tags: ['Python', 'TensorFlow', 'LLMs'] },
      { name: 'الأمن السيبراني', desc: 'طوّر أدوات أمان متطورة وحلول اختبار الاختراق وبروتوكولات حماية الخصوصية.', tags: ['CTF', 'تشفير', 'اختبار اختراق'] },
      { name: 'الابتكار المفتوح', desc: 'لا حدود. ابنِ أي شيء يُحدث أثراً — AR/VR وإنترنت الأشياء وتقنيات المناخ.', tags: ['بلا حدود', 'أي تقنية', 'تأثير'] },
    ]
  },
};

const COLORS = ['#00F0FF', '#FF003C', '#FFE600', '#7B2FBE'];
const LABELS = ['01', '02', '03', '04'];
const LOCALES = [{ key: 'en', label: 'EN' }, { key: 'ja', label: '日本語' }, { key: 'de', label: 'DE' }, { key: 'fr', label: 'FR' }, { key: 'zh', label: '中文' }, { key: 'ar', label: 'عربي' }];

function hexRgb(hex) {
  return `${parseInt(hex.slice(1, 3), 16)},${parseInt(hex.slice(3, 5), 16)},${parseInt(hex.slice(5, 7), 16)}`;
}

const ICONS = [
  <svg key="w3" viewBox="0 0 48 48" fill="none" width="44" height="44"><rect x="4" y="4" width="40" height="40" rx="4" stroke="currentColor" strokeWidth="1.5" /><path d="M14 24h20M24 14v20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="1.5" /><circle cx="24" cy="24" r="2" fill="currentColor" opacity=".5" /></svg>,
  <svg key="ai" viewBox="0 0 48 48" fill="none" width="44" height="44"><path d="M24 4L44 14V34L24 44L4 34V14L24 4Z" stroke="currentColor" strokeWidth="1.5" /><path d="M24 4v40M4 14l40 20M44 14L4 34" stroke="currentColor" strokeWidth=".8" opacity=".4" /><circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="1.5" /><circle cx="24" cy="24" r="2" fill="currentColor" opacity=".6" /></svg>,
  <svg key="sc" viewBox="0 0 48 48" fill="none" width="44" height="44"><rect x="8" y="16" width="32" height="22" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M16 16V12a8 8 0 0116 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="24" cy="27" r="4" stroke="currentColor" strokeWidth="1.5" /><path d="M24 31v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>,
  <svg key="op" viewBox="0 0 48 48" fill="none" width="44" height="44"><circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1.5" /><path d="M16 24c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="24" cy="24" r="3" fill="currentColor" opacity=".6" /><path d="M24 8v4M24 36v4M8 24h4M36 24h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>,
];

// ─── Tracks 3D figure ─────────────────────────────────────────────────────────
function TracksSoldier({ progressRef }) {
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
    root.position.set(-3.2, -1.5, 0); root.rotation.y = Math.PI / 4;
    scene.add(root); sg.current = root;

    Box(root, .5, .5, .5, M(0x0a0a0a, { metalness: 1 }), 0, 1.4, 0);
    Box(root, .42, .12, .05, ME(0x7B2FBE, 10), 0, 1.45, .26);
    Cyl(root, .52, .38, 1.15, 8, M(0x080810, { metalness: .92 }), 0, .9, 0);
    Box(root, .06, .52, .09, ME(0x7B2FBE, 2.2), -.2, .96, .34);
    Box(root, .06, .52, .09, ME(0x7B2FBE, 2.2), .2, .96, .34);
    [-.24, .24].forEach(x => {
      Cyl(root, .24, .19, .72, 8, M(0x080810, { metalness: .88 }), x, -.22, 0);
      Box(root, .22, .06, .28, ME(0x7B2FBE, 1.4), x, -.1, .15);
    });

    const gun = new THREE.Group(); gun.position.set(.44, .6, .48); gun.rotation.set(Math.PI / 2, 0, .2);
    Box(gun, .18, 1.4, .3, M(0x000), 0, 0, 0);
    const bar = new THREE.Mesh(new THREE.CylinderGeometry(.04, .04, 1), ME(0x7B2FBE, 15));
    bar.position.set(0, -.9, 0); gun.add(bar);
    root.add(gun); gg.current = gun;

    return () => { scene.remove(root); root.traverse(o => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose(); }); };
  }, [scene]);

  useFrame((_, delta) => {
    t.current += delta;
    if (!sg.current) return;
    sg.current.position.y = -1.5 + Math.sin(t.current * 1.2) * .15;
    const p = progressRef.current || 0;
    sg.current.rotation.y = Math.PI / 4 - (p * Math.PI / 2);
    sg.current.position.x = -3.2 + (p * 2);
    if (gg.current) gg.current.rotation.x = (Math.PI / 2) + Math.sin(t.current * 2.5) * .04;
  });
  return null;
}

export default function Tracks() {
  const secRef = useRef(null);
  const canvasRef = useRef(null);
  const barTop = useRef(null);
  const barBot = useRef(null);
  const progress = useRef(0);
  const [locale, setLocale] = useState('en');
  const data = i18n[locale] || i18n.en;

  useWebGL(canvasRef, { particleCount: 800, hexCount: 10, lineCount: 14, particleColor: 0x7b2fbe, accentColor: 0x00f0ff });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: { trigger: secRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
      })
        .to(barTop.current, { yPercent: -100, duration: 1, ease: 'expo.inOut' })
        .to(barBot.current, { yPercent: 100, duration: 1, ease: 'expo.inOut' }, '<');

      ScrollTrigger.create({
        trigger: secRef.current, start: 'top bottom', end: 'bottom top',
        onUpdate: self => { progress.current = self.progress; }
      });

      gsap.from('.trk-reveal', {
        scrollTrigger: { trigger: secRef.current, start: 'top 75%' },
        y: 44, opacity: 0, duration: 1, stagger: .12, ease: 'power4.out'
      });

      gsap.from('.trk-card-item', {
        scrollTrigger: { trigger: secRef.current, start: 'top 68%' },
        scale: .9, opacity: 0, y: 55, duration: .85, stagger: .12, ease: 'back.out(1.6)', delay: .3
      });
    }, secRef);
    return () => ctx.revert();
  }, [locale]);

  return (
    <section id="tracks" ref={secRef} className="relative w-full min-h-screen py-32 px-6 md:px-12 bg-[#010103] overflow-hidden flex flex-col items-center">

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none" />

      <div className="absolute inset-0 z-[1] pointer-events-none">
        <Canvas dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={40} />
          <ambientLight intensity={1} />
          <pointLight position={[-10, 10, 10]} color="#7B2FBE" intensity={5} />
          <pointLight position={[10, -5, 5]} color="#00F0FF" intensity={3} />
          <Stars radius={100} depth={50} count={2000} factor={4} fade speed={1} />
          <Sparkles count={70} scale={10} size={2} color="#7B2FBE" />
          <TracksSoldier progressRef={progress} />
          <Environment preset="night" />
        </Canvas>
      </div>

      <div ref={barTop} className="absolute top-0 left-0 w-full h-[50.5vh] bg-black z-[50] border-b border-[rgba(0,240,255,.1)]" />
      <div ref={barBot} className="absolute bottom-0 left-0 w-full h-[50.5vh] bg-black z-[50] border-t border-[rgba(123,47,190,.1)]" />

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center">

        {/* Tagline */}
        <div className="trk-reveal flex items-center gap-3 mb-8">
          <span className="font-mono text-[10px] text-[#00F0FF] bg-[rgba(0,240,255,.05)] border border-[rgba(0,240,255,.2)] px-4 py-1 tracking-[0.4em] font-bold uppercase">
            {data.tagline}
          </span>
          <div className="w-16 h-[1px] bg-gradient-to-r from-[rgba(0,240,255,.4)] to-transparent" />
        </div>

        {/* Heading */}
        <h2 className="trk-reveal font-orbitron font-black text-white text-center uppercase leading-[0.95] mb-10 select-none" style={{ fontSize: 'clamp(44px,8vw,100px)' }}>
          <span className="text-white">{data.heading}&nbsp;</span>
          <br />
          <span style={{ color: 'transparent', WebkitTextStroke: '2px #FF003C', filter: 'drop-shadow(0 0 12px rgba(255,0,60,0.4))' }}>
            {data.accent}
          </span>
        </h2>

        {/* Locale switcher */}
        <div className="trk-reveal flex flex-wrap justify-center gap-3 mb-14">
          {LOCALES.map(l => (
            <button key={l.key} onClick={() => setLocale(l.key)}
              className={`font-mono text-[10px] px-4 py-2 border transition-all duration-300 rounded-sm ${locale === l.key ? 'bg-[rgba(0,240,255,.1)] border-[#00F0FF] text-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.3)]' : 'border-white/10 text-gray-500 hover:border-white/30'}`}>
              {l.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full" dir={data.dir}>
          {data.tracks.map((track, i) => {
            const color = COLORS[i]; const rgb = hexRgb(color);
            const bN = `1px solid rgba(${rgb},.28)`; const bH = `1px solid rgba(${rgb},.72)`;
            const sN = '0 8px 32px -8px rgba(0,0,0,.85)'; const sH = `0 0 44px rgba(${rgb},.22),inset 0 0 22px rgba(${rgb},.07)`;
            return (
              <div key={`${locale}-${i}`} className="trk-card-item">
                <TiltCard className="min-h-[360px] md:h-[460px]">
                  <div className="relative h-full bg-[rgba(5,5,12,.82)] backdrop-blur-xl rounded-xl overflow-hidden flex flex-col p-5 md:p-8 group transition-all duration-400"
                    style={{ border: bN, boxShadow: sN, '--c': color }}
                    onMouseEnter={e => { const el = e.currentTarget; el.style.border = bH; el.style.background = `linear-gradient(175deg,rgba(${rgb},.12) 0%,rgba(5,5,12,.92) 100%)`; el.style.boxShadow = sH; }}
                    onMouseLeave={e => { const el = e.currentTarget; el.style.border = bN; el.style.background = 'rgba(5,5,12,.82)'; el.style.boxShadow = sN; }}
                  >
                    {/* Neon top */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-400 group-hover:h-[3px]" style={{ background: color, boxShadow: `0 0 14px ${color}` }} />
                    {/* Scanline */}
                    <div className="absolute left-0 right-0 h-[2px] opacity-0 group-hover:opacity-[.65] pointer-events-none z-[5]" style={{ background: `linear-gradient(90deg,transparent,${color},transparent)`, animation: 'trk-scan 2.6s linear infinite' }} />
                    {/* Watermark */}
                    <div className="absolute -bottom-3 -right-2 font-orbitron font-black text-[115px] leading-none opacity-[.03] group-hover:opacity-[.09] transition-opacity pointer-events-none select-none" style={{ color }}>{LABELS[i]}</div>

                    <div className="flex justify-between items-start mb-5">
                      <span className="font-mono text-[11px] tracking-[.25em]" style={{ color: `rgba(${rgb},.65)` }}>{LABELS[i]}</span>
                      <div className="transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" style={{ color, filter: `drop-shadow(0 0 9px rgba(${rgb},.65))` }}>{ICONS[i]}</div>
                    </div>

                    <div className="font-orbitron text-[17px] font-bold mb-3 tracking-[.04em]" style={{ color, textShadow: `0 0 10px rgba(${rgb},.35)` }}>{track.name}</div>
                    <p className="font-rajdhani text-[rgba(175,175,200,.72)] text-[14px] leading-[1.65] flex-grow group-hover:text-[rgba(210,210,230,.9)] transition-colors duration-300">{track.desc}</p>

                    <div className="flex flex-wrap gap-2 mt-auto pt-4">
                      {track.tags.map(tag => (
                        <span key={tag} className="font-mono text-[10px] px-[10px] py-1 rounded-sm bg-black/40 group-hover:bg-black/65 transition-colors" style={{ border: `1px solid rgba(${rgb},.28)`, color: `rgba(${rgb},.78)` }}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="absolute bottom-0 right-0 w-4 h-4 transition-all duration-400 group-hover:w-6 group-hover:h-6" style={{ borderTop: `2px solid rgba(${rgb},.48)`, borderLeft: `2px solid rgba(${rgb},.48)` }} />
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`@keyframes trk-scan{0%{top:0%;opacity:0}8%{opacity:1}92%{opacity:1}100%{top:100%;opacity:0}}`}</style>
    </section>
  );
}