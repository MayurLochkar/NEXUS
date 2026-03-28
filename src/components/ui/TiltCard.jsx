import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function TiltCard({ children, style = {} }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const sx = useSpring(x, { stiffness: 200, damping: 20 })
  const sy = useSpring(y, { stiffness: 200, damping: 20 })

  const rotX = useTransform(sy, [-0.5, 0.5], ['12deg', '-12deg'])
  const rotY = useTransform(sx, [-0.5, 0.5], ['-12deg', '12deg'])

  const onMouseMove = e => {
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width  - 0.5)
    y.set((e.clientY - rect.top)  / rect.height - 0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      style={{
        rotateX: rotX, rotateY: rotY,
        transformStyle: 'preserve-3d',
        perspective: 800,
        ...style
      }}
    >
      {children}
    </motion.div>
  )
}