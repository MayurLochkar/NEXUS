import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Lenis from '@studio-freight/lenis'
import AuthPage from './pages/AuthPage'
import MainPage from './pages/MainPage'

function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.4, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    const raf = time => { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"     element={<AuthPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="*"     element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App