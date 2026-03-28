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
      // Staggered reveal of FAQ items when scrolled into view
      gsap.from('.faq-item', {
        scrollTrigger: {
          trigger: secRef.current,
          start: 'top 75%',
        },
        x: -30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out'
      })
    }, secRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="faq" ref={secRef} className="relative w-full py-32 px-6 bg-[#020205] overflow-hidden">
      
      {/* Background Cyber-Aesthetic */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(0,240,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,240,255,1) 1px,transparent 1px)',
        backgroundSize: '45px 45px'
      }}/>
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyber-cyan/5 blur-[120px] rounded-full pointer-events-none"/>

      <div className="relative z-10 max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-20">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-xs text-cyber-cyan tracking-[0.3em]">//</span>
            <span className="font-mono text-xs text-cyber-cyan tracking-[0.3em] uppercase">Knowledge_Base</span>
            <div className="w-16 h-[1px] bg-cyber-cyan/40 shadow-[0_0_10px_#00F0FF]"/>
          </div>
          <h2 className="font-orbitron font-black text-white text-center uppercase leading-tight" style={{ fontSize: 'clamp(32px, 5vw, 52px)' }}>
            Data <span className="text-transparent" style={{ WebkitTextStroke: '2px #00F0FF', filter: 'drop-shadow(0 0 15px rgba(0,240,255,0.5))' }}>Queries</span>
          </h2>
        </div>

        {/* FAQ Accordion Grid */}
        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isActive = open === i;
            return (
              <div 
                key={i} 
                className="faq-item group transition-all duration-500 rounded-lg overflow-hidden border"
                style={{
                  borderColor: isActive ? 'rgba(0,240,255,0.4)' : 'rgba(255,255,255,0.08)',
                  background: isActive ? 'rgba(0,240,255,0.03)' : 'rgba(255,255,255,0.02)',
                }}
              >
                <button 
                  onClick={() => setOpen(isActive ? -1 : i)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left transition-all group-hover:bg-white/5"
                >
                  <span className={`font-orbitron text-sm md:text-base font-bold tracking-widest uppercase transition-colors duration-300 ${isActive ? 'text-cyber-cyan' : 'text-gray-400 group-hover:text-white'}`}>
                    {faq.q}
                  </span>
                  
                  {/* Custom Animated Toggle Icon */}
                  <div className={`relative flex items-center justify-center w-8 h-8 rounded-sm border transition-all duration-500 ${isActive ? 'border-cyber-cyan bg-cyber-cyan/20 rotate-180 shadow-[0_0_10px_#00F0FF]' : 'border-white/20'}`}>
                    <div className="absolute w-4 h-0.5 bg-current" style={{ color: isActive ? '#00F0FF' : 'white' }} />
                    <div className={`absolute w-0.5 h-4 bg-current transition-transform duration-500 ${isActive ? 'rotate-90 scale-0' : 'scale-100'}`} style={{ color: 'white' }} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className="px-8 pb-8 pt-0 border-t border-cyber-cyan/10">
                        <div className="font-mono text-sm md:text-base leading-relaxed text-gray-400 flex gap-4 pt-6">
                          <span className="text-cyber-cyan animate-pulse">{'>'}</span>
                          <span className="selection:bg-cyber-cyan selection:text-black">
                            {faq.a}
                          </span>
                        </div>
                        
                        {/* Interactive scan-line effect inside answer */}
                        <div className="mt-8 w-1/3 h-[1px] bg-gradient-to-r from-cyber-cyan to-transparent opacity-40 shadow-[0_0_8px_#00F0FF]" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Footer Prompt */}
        <div className="mt-16 text-center opacity-30">
          <p className="font-mono text-[10px] text-gray-400 tracking-[0.4em] uppercase">
            [END_OF_TRANS] // Connection: STABLE
          </p>
        </div>

      </div>
    </section>
  )
}