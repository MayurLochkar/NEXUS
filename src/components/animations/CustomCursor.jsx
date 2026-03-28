import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current

    const xTo = gsap.quickTo(ring, 'x', { duration: 0.4, ease: 'power3.out' })
    const yTo = gsap.quickTo(ring, 'y', { duration: 0.4, ease: 'power3.out' })

    const move = e => {
      gsap.set(dot, { x: e.clientX, y: e.clientY })
      xTo(e.clientX)
      yTo(e.clientY)
    }

    const grow = () => {
      gsap.to(ring, { scale: 1.8, duration: 0.3 })
      gsap.to(dot,  { scale: 0.4, duration: 0.3 })
    }
    const shrink = () => {
      gsap.to(ring, { scale: 1, duration: 0.3 })
      gsap.to(dot,  { scale: 1, duration: 0.3 })
    }

    document.addEventListener('mousemove', move)
    document.querySelectorAll('a,button,input,textarea,select,[data-cursor]')
      .forEach(el => { el.addEventListener('mouseenter', grow); el.addEventListener('mouseleave', shrink) })

    return () => document.removeEventListener('mousemove', move)
  }, [])

  return (
    <>
      <div ref={dotRef} style={{
        position:'fixed', top:0, left:0, width:8, height:8,
        background:'#00F0FF', borderRadius:'50%', pointerEvents:'none',
        zIndex:99999, transform:'translate(-50%,-50%)',
        boxShadow:'0 0 10px #00F0FF'
      }} />
      <div ref={ringRef} style={{
        position:'fixed', top:0, left:0, width:36, height:36,
        border:'1.5px solid #00F0FF', borderRadius:'50%', pointerEvents:'none',
        zIndex:99998, transform:'translate(-50%,-50%)',
        mixBlendMode:'difference'
      }} />
    </>
  )
}