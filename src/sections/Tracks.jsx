/**
 * Tracks.jsx — Full Cyberpunk Hackathon Tracks Section
 *
 * DEPENDENCIES (install before use):
 *   npm install three gsap
 *
 * USAGE:
 *   Place TiltCard.jsx in the same folder (or adjust the import path).
 *   Import and drop <Tracks /> anywhere in your app.
 *
 * FONTS (add to your index.html <head>):
 *   <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&family=Rajdhani:wght@300;400;600&display=swap" rel="stylesheet" />
 */

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import TiltCard from '../components/ui/TiltCard';

// ─── i18n data ────────────────────────────────────────────────────────────────
const i18n = {
  en: {
    heading: 'Choose Your',
    accent: 'Battleground',
    tagline: '// SECTORS',
    dir: 'ltr',
    tracks: [
      {
        name: 'Web3 & DeFi',
        desc: 'Build decentralized apps, smart contracts, DAOs and next-gen financial protocols on-chain.',
        tags: ['Solidity', 'Ethereum', 'IPFS'],
      },
      {
        name: 'AI & Machine Learning',
        desc: 'Leverage AI and ML to build intelligent systems, generative models, and real-world automation.',
        tags: ['Python', 'TensorFlow', 'LLMs'],
      },
      {
        name: 'Cybersecurity',
        desc: 'Develop cutting-edge security tools, ethical hacking solutions and privacy-preserving protocols.',
        tags: ['CTF', 'Cryptography', 'Pentesting'],
      },
      {
        name: 'Open Innovation',
        desc: 'No boundaries. Build anything that creates meaningful impact — AR/VR, IoT, climate tech, and more.',
        tags: ['No Limits', 'Any Stack', 'Impact'],
      },
    ],
  },
  ja: {
    heading: '戦場を',
    accent: '選択せよ',
    tagline: '// セクター',
    dir: 'ltr',
    tracks: [
      {
        name: 'Web3 & DeFi',
        desc: '分散型アプリ、スマートコントラクト、DAO、次世代金融プロトコルをオンチェーンで構築。',
        tags: ['Solidity', 'Ethereum', 'IPFS'],
      },
      {
        name: 'AI & ML',
        desc: 'AIとMLを活用してインテリジェントシステム、生成モデル、自動化ソリューションを開発。',
        tags: ['Python', 'TensorFlow', 'LLMs'],
      },
      {
        name: 'サイバーセキュリティ',
        desc: '最先端のセキュリティツール、倫理的ハッキング、プライバシー保護プロトコルを開発。',
        tags: ['CTF', '暗号', 'ペンテスト'],
      },
      {
        name: 'オープンイノベーション',
        desc: '制限なし。AR/VR、IoT、気候技術など、意義あるインパクトを生む何でも構築。',
        tags: ['無制限', '技術自由', 'インパクト'],
      },
    ],
  },
  de: {
    heading: 'Wähle Dein',
    accent: 'Schlachtfeld',
    tagline: '// SEKTOREN',
    dir: 'ltr',
    tracks: [
      {
        name: 'Web3 & DeFi',
        desc: 'Dezentrale Apps, Smart Contracts, DAOs und Finanzprotokolle der nächsten Generation bauen.',
        tags: ['Solidity', 'Ethereum', 'IPFS'],
      },
      {
        name: 'KI & ML',
        desc: 'KI und ML nutzen, um intelligente Systeme, generative Modelle und Automatisierung zu bauen.',
        tags: ['Python', 'TensorFlow', 'LLMs'],
      },
      {
        name: 'Cybersicherheit',
        desc: 'Modernste Sicherheitstools, Ethical Hacking und datenschutzerhaltende Protokolle entwickeln.',
        tags: ['CTF', 'Kryptografie', 'Pentesting'],
      },
      {
        name: 'Offene Innovation',
        desc: 'Keine Grenzen. Baue alles, was echten Einfluss schafft — AR/VR, IoT, Klimatechnologie.',
        tags: ['Keine Grenzen', 'Jeder Stack', 'Impact'],
      },
    ],
  },
  fr: {
    heading: 'Choisis Ton',
    accent: 'Champ de Bataille',
    tagline: '// SECTEURS',
    dir: 'ltr',
    tracks: [
      {
        name: 'Web3 & DeFi',
        desc: 'Construis des dApps, smart contracts, DAOs et protocoles financiers de prochaine génération.',
        tags: ['Solidity', 'Ethereum', 'IPFS'],
      },
      {
        name: 'IA & ML',
        desc: "Exploite l'IA et le ML pour des systèmes intelligents, modèles génératifs et automatisation.",
        tags: ['Python', 'TensorFlow', 'LLMs'],
      },
      {
        name: 'Cybersécurité',
        desc: 'Développe des outils de sécurité de pointe, solutions de hacking éthique et protocoles de confidentialité.',
        tags: ['CTF', 'Cryptographie', 'Pentesting'],
      },
      {
        name: 'Innovation Ouverte',
        desc: "Aucune limite. Construis tout ce qui crée un impact — AR/VR, IoT, technologies climatiques.",
        tags: ['Sans Limites', 'Toute Stack', 'Impact'],
      },
    ],
  },
  zh: {
    heading: '选择你的',
    accent: '战场',
    tagline: '// 赛道',
    dir: 'ltr',
    tracks: [
      {
        name: 'Web3 & DeFi',
        desc: '构建去中心化应用、智能合约、DAO及下一代链上金融协议。',
        tags: ['Solidity', '以太坊', 'IPFS'],
      },
      {
        name: 'AI & ML',
        desc: '利用人工智能和机器学习构建智能系统、生成模型和自动化解决方案。',
        tags: ['Python', 'TensorFlow', 'LLMs'],
      },
      {
        name: '网络安全',
        desc: '开发前沿安全工具、道德黑客解决方案和隐私保护协议。',
        tags: ['CTF', '密码学', '渗透测试'],
      },
      {
        name: '开放创新',
        desc: '没有边界。构建任何具有重大影响力的事物——AR/VR、物联网、气候科技等。',
        tags: ['无限制', '任意技术栈', '影响力'],
      },
    ],
  },
  ar: {
    heading: 'اختر',
    accent: 'ساحة المعركة',
    tagline: '// القطاعات',
    dir: 'rtl',
    tracks: [
      {
        name: 'Web3 & DeFi',
        desc: 'ابنِ تطبيقات لامركزية وعقوداً ذكية وDAOs وبروتوكولات مالية من الجيل التالي.',
        tags: ['Solidity', 'Ethereum', 'IPFS'],
      },
      {
        name: 'الذكاء الاصطناعي',
        desc: 'استخدم الذكاء الاصطناعي لبناء أنظمة ذكية ونماذج توليدية وأتمتة حقيقية.',
        tags: ['Python', 'TensorFlow', 'LLMs'],
      },
      {
        name: 'الأمن السيبراني',
        desc: 'طوّر أدوات أمان متطورة وحلول اختبار الاختراق وبروتوكولات حماية الخصوصية.',
        tags: ['CTF', 'تشفير', 'اختبار اختراق'],
      },
      {
        name: 'الابتكار المفتوح',
        desc: 'لا حدود. ابنِ أي شيء يُحدث أثراً — AR/VR وإنترنت الأشياء وتقنيات المناخ.',
        tags: ['بلا حدود', 'أي تقنية', 'تأثير'],
      },
    ],
  },
};

// ─── Track config ──────────────────────────────────────────────────────────────
const COLORS = ['#00F0FF', '#FF003C', '#FFE600', '#7B2FBE'];
const LABELS = ['01', '02', '03', '04'];

const ICONS = [
  // Web3
  <svg key="web3" viewBox="0 0 48 48" fill="none" width="44" height="44">
    <rect x="4" y="4" width="40" height="40" rx="4" stroke="currentColor" strokeWidth="1.5" />
    <path d="M14 24h20M24 14v20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="24" cy="24" r="2" fill="currentColor" opacity=".5" />
  </svg>,
  // AI
  <svg key="ai" viewBox="0 0 48 48" fill="none" width="44" height="44">
    <path d="M24 4L44 14V34L24 44L4 34V14L24 4Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M24 4v40M4 14l40 20M44 14L4 34" stroke="currentColor" strokeWidth=".8" opacity=".4" />
    <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="24" cy="24" r="2" fill="currentColor" opacity=".6" />
  </svg>,
  // Security
  <svg key="sec" viewBox="0 0 48 48" fill="none" width="44" height="44">
    <rect x="8" y="16" width="32" height="22" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M16 16V12a8 8 0 0116 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="24" cy="27" r="4" stroke="currentColor" strokeWidth="1.5" />
    <path d="M24 31v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>,
  // Open
  <svg key="open" viewBox="0 0 48 48" fill="none" width="44" height="44">
    <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1.5" />
    <path d="M16 24c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="24" cy="24" r="3" fill="currentColor" opacity=".6" />
    <path d="M24 8v4M24 36v4M8 24h4M36 24h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>,
];

// ─── Locale button labels ──────────────────────────────────────────────────────
const LOCALE_BUTTONS = [
  { key: 'en', label: 'EN' },
  { key: 'ja', label: '日本語' },
  { key: 'de', label: 'DE' },
  { key: 'fr', label: 'FR' },
  { key: 'zh', label: '中文' },
  { key: 'ar', label: 'عربي' },
];

// ─── Helper: hex → "r,g,b" ────────────────────────────────────────────────────
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

// ─── WebGL background hook ─────────────────────────────────────────────────────
function useWebGLBackground(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 30);

    // ── Grid floor ──
    const gridLines = [];
    const GS = 80, STEP = 4, GOFF = 40;
    for (let x = -GS; x <= GS; x += STEP) {
      gridLines.push(x, -GOFF, -GS, x, -GOFF, GS);
    }
    for (let z = -GS; z <= GS; z += STEP) {
      gridLines.push(-GS, -GOFF, z, GS, -GOFF, z);
    }
    const gridGeo = new THREE.BufferGeometry();
    gridGeo.setAttribute('position', new THREE.Float32BufferAttribute(gridLines, 3));
    const gridMat = new THREE.LineBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.12 });
    scene.add(new THREE.LineSegments(gridGeo, gridMat));

    // ── Cyan particles ──
    const PCOUNT = 1200;
    const pPos = new Float32Array(PCOUNT * 3);
    const pVel = [];
    for (let i = 0; i < PCOUNT; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 120;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 80;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 80;
      pVel.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.015,
        z: (Math.random() - 0.5) * 0.01,
      });
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ color: 0x00f0ff, size: 0.22, transparent: true, opacity: 0.55, sizeAttenuation: true });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ── Red accent particles ──
    const P2COUNT = 400;
    const p2Pos = new Float32Array(P2COUNT * 3);
    for (let i = 0; i < P2COUNT; i++) {
      p2Pos[i * 3] = (Math.random() - 0.5) * 100;
      p2Pos[i * 3 + 1] = (Math.random() - 0.5) * 60;
      p2Pos[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    const p2Geo = new THREE.BufferGeometry();
    p2Geo.setAttribute('position', new THREE.BufferAttribute(p2Pos, 3));
    const p2Mat = new THREE.PointsMaterial({ color: 0xff003c, size: 0.18, transparent: true, opacity: 0.35, sizeAttenuation: true });
    const particles2 = new THREE.Points(p2Geo, p2Mat);
    scene.add(particles2);

    // ── Neon energy lines ──
    const lineColors = [0x00f0ff, 0xff003c, 0xffe600, 0x7b2fbe];
    for (let i = 0; i < 20; i++) {
      const col = lineColors[Math.floor(Math.random() * lineColors.length)];
      const pts = [
        new THREE.Vector3((Math.random() - 0.5) * 80, (Math.random() - 0.5) * 40, -20),
        new THREE.Vector3((Math.random() - 0.5) * 80, (Math.random() - 0.5) * 40, -20),
      ];
      const lg = new THREE.BufferGeometry().setFromPoints(pts);
      const lm = new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: Math.random() * 0.25 + 0.05 });
      scene.add(new THREE.Line(lg, lm));
    }

    // ── Floating hexagons ──
    const hexMeshes = [];
    for (let i = 0; i < 12; i++) {
      const r = Math.random() * 3 + 1.5;
      const shape = new THREE.Shape();
      for (let s = 0; s < 6; s++) {
        const a = (Math.PI / 3) * s;
        if (s === 0) shape.moveTo(Math.cos(a) * r, Math.sin(a) * r);
        else shape.lineTo(Math.cos(a) * r, Math.sin(a) * r);
      }
      shape.closePath();
      const pts = shape.getPoints(6);
      const hGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const hMat = new THREE.LineBasicMaterial({
        color: lineColors[i % 4],
        transparent: true,
        opacity: 0.18 + Math.random() * 0.15,
      });
      const hex = new THREE.LineLoop(hGeo, hMat);
      hex.position.set(
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 30 - 10
      );
      hex.rotation.z = Math.random() * Math.PI;
      hex.userData = {
        rotSpeed: (Math.random() - 0.5) * 0.004,
        floatSpeed: Math.random() * 0.003 + 0.001,
        floatAmp: Math.random() * 2 + 1,
        baseY: hex.position.y,
      };
      scene.add(hex);
      hexMeshes.push(hex);
    }

    // ── Mouse & scroll state ──
    let mouseX = 0, mouseY = 0, scrollY = 0;
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', onScroll);

    // ── Animation loop ──
    let t = 0;
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      t += 0.008;

      camera.position.x += (mouseX * 3 - camera.position.x) * 0.04;
      camera.position.y += (mouseY * 2 - camera.position.y) * 0.04;
      camera.position.z = 30 - scrollY * 0.02;
      camera.lookAt(0, 0, 0);

      // particle drift
      const pp = pGeo.attributes.position.array;
      for (let i = 0; i < PCOUNT; i++) {
        pp[i * 3] += pVel[i].x;
        pp[i * 3 + 1] += pVel[i].y;
        pp[i * 3 + 2] += pVel[i].z;
        if (pp[i * 3] > 60 || pp[i * 3] < -60) pVel[i].x *= -1;
        if (pp[i * 3 + 1] > 40 || pp[i * 3 + 1] < -40) pVel[i].y *= -1;
        if (pp[i * 3 + 2] > 40 || pp[i * 3 + 2] < -40) pVel[i].z *= -1;
      }
      pGeo.attributes.position.needsUpdate = true;
      particles.rotation.y = t * 0.04;
      particles2.rotation.y = -t * 0.03;
      particles2.rotation.x = t * 0.015;

      gridMat.opacity = 0.08 + Math.sin(t) * 0.04;

      hexMeshes.forEach((h) => {
        h.rotation.z += h.userData.rotSpeed;
        h.position.y = h.userData.baseY + Math.sin(t * h.userData.floatSpeed * 30) * h.userData.floatAmp;
      });

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ──
    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, [canvasRef]);
}

// ─── Scroll reveal hook ────────────────────────────────────────────────────────
function useScrollReveal(selector, threshold = 0.15) {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('tr-visible');
        });
      },
      { threshold }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [selector]);
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function Tracks() {
  const canvasRef = useRef(null);
  const secRef = useRef(null);
  const [locale, setLocale] = useState('en');

  useWebGLBackground(canvasRef);
  useScrollReveal('.tr-card', 0.12);
  useScrollReveal('.tr-header-el', 0.2);

  const data = i18n[locale];

  return (
    <>
      {/* ── Injected CSS ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&family=Rajdhani:wght@300;400;600&display=swap');

        /* Reset inside section */
        #tracks-section * { box-sizing: border-box; }

        /* Canvas background */
        #tracks-webgl-bg {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          z-index: 0;
          pointer-events: none;
        }

        /* Section */
        #tracks-section {
          position: relative;
          z-index: 10;
          padding: 80px 24px 120px;
          background: #020205;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Purple ambient blob */
        #tracks-section::before {
          content: '';
          position: absolute;
          top: 0; right: 0;
          width: 600px; height: 600px;
          background: rgba(123, 47, 190, 0.05);
          filter: blur(150px);
          border-radius: 50%;
          pointer-events: none;
        }

        /* ── Header reveal animations ── */
        .tr-header-el {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .tr-header-el.tr-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Tag line */
        .tr-tagline {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 18px;
          transition-delay: 0s;
        }
        .tr-tagline-slash {
          font-family: 'Share Tech Mono', monospace;
          font-size: 11px;
          color: #00F0FF;
          letter-spacing: 0.3em;
        }
        .tr-tagline-bar {
          width: 60px;
          height: 1px;
          background: linear-gradient(90deg, #00F0FF, transparent);
          box-shadow: 0 0 8px #00F0FF;
        }

        /* Heading */
        .tr-heading {
          font-family: 'Orbitron', monospace;
          font-weight: 900;
          font-size: clamp(28px, 5vw, 58px);
          color: #fff;
          text-align: center;
          text-transform: uppercase;
          line-height: 1.1;
          margin-bottom: 16px;
          transition-delay: 0.1s;
        }
        .tr-heading-accent {
          color: #00F0FF;
          text-shadow: 0 0 30px rgba(0,240,255,0.5), 0 0 60px rgba(0,240,255,0.2);
          animation: tr-glitch 6s infinite;
        }
        @keyframes tr-glitch {
          0%, 94% { clip-path: none; transform: none; }
          95% { clip-path: inset(20% 0 60% 0); transform: translateX(-3px); }
          96% { clip-path: inset(55% 0 10% 0); transform: translateX(3px); }
          97% { clip-path: none; transform: none; }
        }

        /* Locale bar */
        .tr-locale-bar {
          display: flex;
          gap: 8px;
          margin-bottom: 52px;
          flex-wrap: wrap;
          justify-content: center;
          transition-delay: 0.2s;
        }
        .tr-locale-btn {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          padding: 5px 12px;
          border: 1px solid rgba(0,240,255,0.3);
          color: rgba(0,240,255,0.6);
          background: transparent;
          cursor: pointer;
          letter-spacing: 0.15em;
          border-radius: 2px;
          transition: all 0.25s ease;
        }
        .tr-locale-btn:hover,
        .tr-locale-btn.tr-active {
          border-color: #00F0FF;
          color: #00F0FF;
          background: rgba(0,240,255,0.08);
          box-shadow: 0 0 12px rgba(0,240,255,0.2);
        }

        /* Grid */
        .tr-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 24px;
          width: 100%;
          max-width: 1120px;
        }

        /* ── Card reveal ── */
        .tr-card {
          opacity: 0;
          transform: translateY(60px) scale(0.96);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .tr-card.tr-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .tr-card:nth-child(1) { transition-delay: 0s; }
        .tr-card:nth-child(2) { transition-delay: 0.12s; }
        .tr-card:nth-child(3) { transition-delay: 0.24s; }
        .tr-card:nth-child(4) { transition-delay: 0.36s; }

        /* Card inner */
        .tr-card-inner {
          position: relative;
          width: 100%;
          height: 420px;
          background: rgba(5,5,12,0.82);
          backdrop-filter: blur(12px);
          border-radius: 12px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          cursor: default;
          transition: border-color 0.4s, background 0.4s, box-shadow 0.4s;
        }

        /* Neon top line */
        .tr-neon-top {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          transition: height 0.4s;
        }
        .tr-card-inner:hover .tr-neon-top { height: 3px; }

        /* Scanline */
        .tr-scan {
          position: absolute;
          left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--tr-color), transparent);
          opacity: 0;
          pointer-events: none;
          z-index: 5;
          animation: tr-scan 2.5s linear infinite;
        }
        .tr-card-inner:hover .tr-scan { opacity: 0.7; }
        @keyframes tr-scan {
          0%   { top: 0%;   opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }

        /* Watermark */
        .tr-watermark {
          position: absolute;
          bottom: -10px; right: -8px;
          font-family: 'Orbitron', monospace;
          font-weight: 900;
          font-size: 110px;
          line-height: 1;
          opacity: 0.03;
          pointer-events: none;
          user-select: none;
          transition: opacity 0.4s;
        }
        .tr-card-inner:hover .tr-watermark { opacity: 0.09; }

        /* Corner accent */
        .tr-corner {
          position: absolute;
          bottom: 0; right: 0;
          width: 16px; height: 16px;
          transition: all 0.4s;
        }
        .tr-card-inner:hover .tr-corner { width: 24px; height: 24px; }

        /* Content */
        .tr-content {
          position: relative;
          z-index: 10;
          padding: 28px;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .tr-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
        }
        .tr-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.25em;
        }
        .tr-icon {
          transition: transform 0.5s;
        }
        .tr-card-inner:hover .tr-icon { transform: scale(1.1); }
        .tr-card-name {
          font-family: 'Orbitron', monospace;
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 10px;
          letter-spacing: 0.05em;
        }
        .tr-card-desc {
          font-family: 'Rajdhani', sans-serif;
          font-size: 14px;
          color: rgba(180,180,200,0.75);
          line-height: 1.65;
          flex-grow: 1;
          transition: color 0.3s;
        }
        .tr-card-inner:hover .tr-card-desc { color: rgba(210,210,230,0.9); }
        .tr-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: auto;
          padding-top: 16px;
        }
        .tr-tag {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          padding: 4px 10px;
          border-radius: 2px;
          background: rgba(0,0,0,0.4);
          letter-spacing: 0.1em;
          transition: background 0.3s, border-color 0.3s;
        }
        .tr-card-inner:hover .tr-tag {
          background: rgba(0,0,0,0.65);
        }
      `}</style>

      {/* ── WebGL Canvas (fixed, behind everything) ── */}
      <canvas id="tracks-webgl-bg" ref={canvasRef} />

      {/* ── Section ── */}
      <section id="tracks-section" ref={secRef}>

        {/* Header */}
        <div className="tr-tagline tr-header-el tr-visible" style={{ transitionDelay: '0s' }}>
          <span className="tr-tagline-slash">{data.tagline}</span>
          <div className="tr-tagline-bar" />
        </div>

        <h2 className="tr-heading tr-header-el tr-visible" style={{ transitionDelay: '0.1s' }}>
          {data.heading}&nbsp;
          <br />
          <span className="tr-heading-accent">{data.accent}</span>
        </h2>

        {/* Locale switcher */}
        <div className="tr-locale-bar tr-header-el tr-visible" style={{ transitionDelay: '0.2s' }}>
          {LOCALE_BUTTONS.map((btn) => (
            <button
              key={btn.key}
              className={`tr-locale-btn${locale === btn.key ? ' tr-active' : ''}`}
              onClick={() => setLocale(btn.key)}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div className="tr-grid" dir={data.dir}>
          {data.tracks.map((track, i) => {
            const color = COLORS[i];
            const rgb = hexToRgb(color);

            const borderNormal = `1px solid rgba(${rgb}, 0.3)`;
            const boxShadowNormal = '0 10px 30px -10px rgba(0,0,0,0.8)';

            return (
              <TiltCard key={`${locale}-${i}`} className="tr-card">
                <div
                  className="tr-card-inner"
                  style={{
                    '--tr-color': color,
                    border: borderNormal,
                    boxShadow: boxShadowNormal,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `rgba(${rgb}, 0.7)`;
                    e.currentTarget.style.background = `linear-gradient(180deg, rgba(${rgb},0.12) 0%, rgba(5,5,12,0.9) 100%)`;
                    e.currentTarget.style.boxShadow = `0 0 40px rgba(${rgb},0.25), inset 0 0 20px rgba(${rgb},0.08)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `rgba(${rgb}, 0.3)`;
                    e.currentTarget.style.background = 'rgba(5,5,12,0.82)';
                    e.currentTarget.style.boxShadow = boxShadowNormal;
                  }}
                >
                  {/* Neon top */}
                  <div
                    className="tr-neon-top"
                    style={{ background: color, boxShadow: `0 0 12px ${color}` }}
                  />

                  {/* Scanline */}
                  <div className="tr-scan" />

                  {/* Watermark number */}
                  <div className="tr-watermark" style={{ color }}>
                    {LABELS[i]}
                  </div>

                  {/* Content */}
                  <div className="tr-content">
                    <div className="tr-card-header">
                      <div className="tr-label" style={{ color: `rgba(${rgb}, 0.7)` }}>
                        {LABELS[i]}
                      </div>
                      <div
                        className="tr-icon"
                        style={{
                          color,
                          filter: `drop-shadow(0 0 8px rgba(${rgb}, 0.7))`,
                        }}
                      >
                        {ICONS[i]}
                      </div>
                    </div>

                    <div
                      className="tr-card-name"
                      style={{
                        color,
                        textShadow: `0 0 10px rgba(${rgb}, 0.4)`,
                      }}
                    >
                      {track.name}
                    </div>

                    <p className="tr-card-desc">{track.desc}</p>

                    <div className="tr-tags">
                      {track.tags.map((tag) => (
                        <span
                          key={tag}
                          className="tr-tag"
                          style={{
                            border: `1px solid rgba(${rgb}, 0.3)`,
                            color: `rgba(${rgb}, 0.8)`,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Corner accent */}
                  <div
                    className="tr-corner"
                    style={{
                      borderTop: `2px solid rgba(${rgb}, 0.5)`,
                      borderLeft: `2px solid rgba(${rgb}, 0.5)`,
                    }}
                  />
                </div>
              </TiltCard>
            );
          })}
        </div>
      </section>
    </>
  );
}