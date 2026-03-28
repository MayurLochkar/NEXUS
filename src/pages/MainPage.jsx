import { useState, useEffect, useRef, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Float, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

// Components
import Preloader from '../components/animations/Preloader'
import CustomCursor from '../components/animations/CustomCursor'
import Navbar from '../components/layout/Navbar'
import FloatingDock from '../components/layout/FloatingDock'
import Footer from '../components/layout/Footer'

// Sections
import Hero from '../sections/Hero'
import About from '../sections/About'
import Tracks from '../sections/Tracks'
import Timeline from '../sections/Timeline'
import Prizes from '../sections/Prizes'
import FAQ from '../sections/FAQ'
import Contact from '../sections/Contact'

// =========================================================================
// GLOBAL WEBGL BACKGROUND (Floating Cyber-Dust & Interaction)
// =========================================================================
function GlobalBackground() {
  const pointsRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (pointsRef.current) {
      // Slow rotation for the whole galaxy
      pointsRef.current.rotation.y = t * 0.05
      pointsRef.current.rotation.x = Math.sin(t * 0.1) * 0.1
    }
  })

  return (
    <group ref={pointsRef}>
      <Stars radius={150} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[10, 5, -20]}>
          <sphereGeometry args={[2, 32, 32]} />
          <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={2} wireframe />
        </mesh>
      </Float>
    </group>
  )
}

// =========================================================================
// MAIN PAGE COMPONENT
// =========================================================================
export default function MainPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Scroll Lock during loading
    document.body.style.overflow = loading ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [loading])

  return (
    <div className="relative bg-[#010103] selection:bg-cyber-cyan selection:text-black">

      {/* 1. Global Preloader & Cursor */}
      <CustomCursor />
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[999]"
          >
            <Preloader onComplete={() => setLoading(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Global Three.js Background Canvas */}
      {/* Is canvas ko background mein fixed rakha hai taaki sections ke peeche dikhe */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} color="#00F0FF" intensity={2} />
          <Suspense fallback={null}>
            <GlobalBackground />
          </Suspense>
        </Canvas>
      </div>

      {/* 3. Main Content Layer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative z-10"
      >
        <Navbar />

        <main>
          {/* Har section ke beech mein smooth gap and transitions */}
          <section className="relative min-h-screen">
            <Hero />
          </section>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <About />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <Tracks />
          </motion.div>

          <Timeline />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Prizes />
          </motion.div>

          <FAQ />
          <Contact />
        </main>

        <Footer />
        <FloatingDock />
      </motion.div>

      {/* 4. Global Scanline Overlay (TV Static Effect) */}
      <div className="fixed inset-0 z-[50] pointer-events-none opacity-[0.03] overflow-hidden">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.1)_1px,transparent_1px,transparent_2px)] bg-[length:100%_3px]" />
      </div>

    </div>
  )
}