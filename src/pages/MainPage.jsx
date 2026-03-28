import { useState, useEffect } from 'react'
import Preloader from '../components/animations/Preloader'
import CustomCursor from '../components/animations/CustomCursor'
import Navbar from '../components/layout/Navbar'
import FloatingDock from '../components/layout/FloatingDock'
import Footer from '../components/layout/Footer'
import Hero from '../sections/Hero'
import About from '../sections/About'
import Tracks from '../sections/Tracks'
import Timeline from '../sections/Timeline'
import Prizes from '../sections/Prizes'
import FAQ from '../sections/FAQ'
import Contact from '../sections/Contact'

export default function MainPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [loading])

  return (
    <>
      <CustomCursor />
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.5s' }}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Tracks />
          <Timeline />
          <Prizes />
          <FAQ />
          <Contact />
        </main>
        <Footer />
        <FloatingDock />
      </div>
    </>
  )
}