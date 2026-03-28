import { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const faqs = [
  { q: 'Who can participate in NEXUS?', a: 'NEXUS is open to all students, professionals, and enthusiasts aged 16+ worldwide. No prior hackathon experience required — just bring your skills and passion for building.' },
  { q: 'Is there a registration fee?', a: 'No. NEXUS is completely free to participate. We believe in removing financial barriers to innovation. Register, show up, and hack.' },
  { q: 'What is the team size limit?', a: 'Teams can have 2 to 4 members. Solo participation is also allowed. You can form teams before or after registration using our team-matching system on Discord.' },
  { q: 'Can I participate remotely?', a: 'Yes! NEXUS is a hybrid event. You can participate fully online or join us at our physical venue. All resources, mentors, and judging are equally accessible remotely.' },
  { q: 'What technologies are allowed?', a: 'Any and all! Use whatever stack, language, or framework you prefer. The only requirement: your project must be built during the 48-hour window.' },
  { q: 'How are projects judged?', a: 'Projects are evaluated on Innovation, Technical Complexity, Real-world Impact, Presentation Quality, and Feasibility. Each track has specialized judges from the industry.' },
  { q: 'Will there be mentors available?', a: 'Yes! We have 50+ mentors from top tech companies and startups who will be available throughout the event for 1:1 sessions and workshops.' },
]

export default function FAQ() {
  const [open, setOpen] = useState(0)
  const secRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.faq-item', {
        scrollTrigger: {
          trigger: secRef.current,
          start: 'top 80%',
        },
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
      })
    }, secRef)
    return () => ctx.revert()
  }, [])

  const cyan = '#00F0FF'

  return (
    <section
      id="faq"
      ref={secRef}
      style={{
        width: '100%',
        padding: '100px 20px',
        backgroundColor: '#020205',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Grid */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.04,
        backgroundImage: `linear-gradient(${cyan} 1px, transparent 1px), linear-gradient(90deg, ${cyan} 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '850px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span style={{ color: cyan, fontFamily: 'monospace', fontSize: '12px', letterSpacing: '4px' }}>// KNOWLEDGE_BASE</span>
            <div style={{ width: '50px', height: '1px', background: cyan, opacity: 0.5 }} />
          </div>
          <h2 style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: 'clamp(28px, 5vw, 50px)',
            fontWeight: 900,
            color: '#fff',
            margin: 0,
            textTransform: 'uppercase',
            letterSpacing: '2px',
          }}>
            Data <span style={{ color: cyan, textShadow: `0 0 20px ${cyan}80` }}>Queries</span>
          </h2>
        </div>

        {/* Accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqs.map((faq, i) => {
            const isActive = open === i
            return (
              <div
                key={i}
                className="faq-item"
                style={{
                  border: `1px solid ${isActive ? `${cyan}66` : 'rgba(255,255,255,0.1)'}`,
                  background: isActive ? 'rgba(0,240,255,0.04)' : 'rgba(255,255,255,0.02)',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  transition: 'border-color 0.3s, background 0.3s',
                }}
              >
                <button
                  onClick={() => setOpen(isActive ? -1 : i)}
                  style={{
                    width: '100%',
                    padding: '22px 24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span style={{
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: isActive ? cyan : 'rgba(255,255,255,0.75)',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    transition: 'color 0.3s',
                  }}>
                    {faq.q}
                  </span>
                  <div style={{
                    color: isActive ? cyan : 'rgba(255,255,255,0.4)',
                    fontSize: '24px',
                    fontWeight: 300,
                    lineHeight: 1,
                    transform: isActive ? 'rotate(45deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s, color 0.3s',
                    flexShrink: 0,
                    marginLeft: '16px',
                  }}>+</div>
                </button>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div style={{
                        padding: '0 24px 24px',
                        borderTop: `1px solid ${cyan}1A`,
                        paddingTop: '16px',
                      }}>
                        <div style={{
                          fontFamily: 'monospace',
                          fontSize: '14px',
                          lineHeight: 1.8,
                          color: 'rgba(255,255,255,0.55)',
                          display: 'flex',
                          gap: '12px',
                        }}>
                          <span style={{ color: cyan, flexShrink: 0 }}>{'>'}</span>
                          <span>{faq.a}</span>
                        </div>
                        <div style={{
                          marginTop: '20px',
                          width: '30%',
                          height: '1px',
                          background: `linear-gradient(90deg, ${cyan}, transparent)`,
                        }} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div style={{ marginTop: '60px', textAlign: 'center', opacity: 0.25 }}>
          <p style={{ fontFamily: 'monospace', fontSize: '10px', color: '#fff', letterSpacing: '4px', textTransform: 'uppercase', margin: 0 }}>
            [END_OF_TRANS] // Connection: STABLE
          </p>
        </div>
      </div>
    </section>
  )
}