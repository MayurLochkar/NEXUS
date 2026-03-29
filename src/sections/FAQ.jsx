/**
 * FAQ.jsx
 * DEPS: npm install three gsap framer-motion
 */
import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useWebGL from './useWebGL';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  { q: 'Who can participate in NEXUS?', a: 'NEXUS is open to all students, professionals, and enthusiasts aged 16+ worldwide. No prior hackathon experience required — just bring your skills and passion for building.' },
  { q: 'Is there a registration fee?', a: 'No. NEXUS is completely free to participate. We believe in removing financial barriers to innovation. Register, show up, and hack.' },
  { q: 'What is the team size limit?', a: 'Teams can have 2 to 4 members. Solo participation is also allowed. You can form teams before or after registration using our team-matching system on Discord.' },
  { q: 'Can I participate remotely?', a: 'Yes! NEXUS is a hybrid event. You can participate fully online or join us at our physical venue. All resources, mentors, and judging are equally accessible remotely.' },
  { q: 'What technologies are allowed?', a: 'Any and all! Use whatever stack, language, or framework you prefer. The only requirement: your project must be built during the 48-hour window.' },
  { q: 'How are projects judged?', a: 'Projects are evaluated on Innovation, Technical Complexity, Real-world Impact, Presentation Quality, and Feasibility. Each track has specialized judges from the industry.' },
  { q: 'Will there be mentors available?', a: 'Yes! We have 50+ mentors from top tech companies and startups who will be available throughout the event for 1:1 sessions and workshops.' },
];

const CYAN = '#00F0FF';

export default function FAQ() {
  const [open, setOpen] = useState(0);
  const secRef = useRef(null);
  const canvasRef = useRef(null);
  const barTop = useRef(null);
  const barBot = useRef(null);

  useWebGL(canvasRef, { particleCount: 600, hexCount: 7, lineCount: 10, particleColor: 0x00f0ff, accentColor: 0x7b2fbe });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: { trigger: secRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
      })
        .to(barTop.current, { yPercent: -100, duration: 1, ease: 'expo.inOut' })
        .to(barBot.current, { yPercent: 100, duration: 1, ease: 'expo.inOut' }, '<');

      gsap.from('.faq-header-reveal', {
        scrollTrigger: { trigger: secRef.current, start: 'top 78%' },
        y: 36, opacity: 0, duration: .9, stagger: .1, ease: 'power4.out'
      });

      gsap.from('.faq-item', {
        scrollTrigger: { trigger: secRef.current, start: 'top 72%' },
        y: 24, opacity: 0, duration: .6, stagger: .08, ease: 'power3.out'
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="faq" ref={secRef} className="relative w-full py-24 px-5 bg-[#020205] overflow-hidden">

      <div ref={canvasRef} className="absolute inset-0 w-full h-full z-[0] pointer-events-none" />

      {/* Grid overlay */}
      <div className="absolute inset-0 z-[1] pointer-events-none opacity-[.04]" style={{
        backgroundImage: `linear-gradient(${CYAN}1px,transparent 1px),linear-gradient(90deg,${CYAN}1px,transparent 1px)`,
        backgroundSize: '40px 40px'
      }} />

      <div ref={barTop} className="absolute top-0 left-0 w-full h-[50.5vh] bg-black z-[50] border-b border-[rgba(0,240,255,.1)]" />
      <div ref={barBot} className="absolute bottom-0 left-0 w-full h-[50.5vh] bg-black z-[50] border-t border-[rgba(123,47,190,.1)]" />

      <div className="relative z-10 max-w-[850px] mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="faq-header-reveal inline-flex items-center gap-3 mb-4">
            <span style={{ color: CYAN, fontFamily: 'monospace', fontSize: 12, letterSpacing: '4px' }}>// KNOWLEDGE_BASE</span>
            <div style={{ width: 50, height: 1, background: CYAN, opacity: .5 }} />
          </div>
          <h2 className="faq-header-reveal font-orbitron font-black text-white uppercase tracking-[2px] m-0" style={{ fontSize: 'clamp(28px,5vw,50px)' }}>
            Data <span style={{ color: CYAN, textShadow: `0 0 20px ${CYAN}80` }}>Queries</span>
          </h2>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isActive = open === i;
            return (
              <div key={i} className="faq-item overflow-hidden rounded-md transition-colors duration-300"
                style={{ border: `1px solid ${isActive ? `${CYAN}66` : 'rgba(255,255,255,.1)'}`, background: isActive ? 'rgba(0,240,255,.04)' : 'rgba(255,255,255,.02)' }}>
                <button onClick={() => setOpen(isActive ? -1 : i)}
                  className="w-full px-6 py-[22px] flex justify-between items-center bg-transparent border-none cursor-pointer text-left">
                  <span className="font-orbitron text-[13px] font-bold uppercase tracking-[1px] transition-colors duration-300"
                    style={{ color: isActive ? CYAN : 'rgba(255,255,255,.75)' }}>
                    {faq.q}
                  </span>
                  <span className="ml-4 flex-shrink-0 transition-all duration-300 text-2xl font-light leading-none"
                    style={{ color: isActive ? CYAN : 'rgba(255,255,255,.4)', transform: isActive ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                    +
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: .35, ease: [.04, .62, .23, .98] }}
                    >
                      <div className="px-6 pb-6 pt-4" style={{ borderTop: `1px solid ${CYAN}1A` }}>
                        <div className="font-mono text-[14px] leading-[1.8] text-white/55 flex gap-3">
                          <span className="flex-shrink-0" style={{ color: CYAN }}>{'>'}</span>
                          <span>{faq.a}</span>
                        </div>
                        <div className="mt-5 w-[30%] h-[1px]" style={{ background: `linear-gradient(90deg,${CYAN},transparent)` }} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-14 text-center opacity-25">
          <p className="font-mono text-[10px] text-white tracking-[4px] uppercase m-0">
            [END_OF_TRANS] // Connection: STABLE
          </p>
        </div>
      </div>
    </section>
  );
}