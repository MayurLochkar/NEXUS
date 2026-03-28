import { motion } from 'framer-motion'

const navLinks = ['Home', 'About', 'Tracks', 'Timeline', 'Prizes']
const resources = ['FAQ', 'Rules', 'Judging', 'Sponsor Us']
const connect = [
  { label: 'Discord', url: 'https://discord.gg/your-link' }, // <-- Link yahan daalo
  { label: 'Telegram', url: 'https://t.me/your-link' },
  { label: 'Newsletter', url: '#' },
  { label: 'Contact', url: 'mailto:nexus@hack.com' }
]

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-20 px-6 md:px-12 bg-[#020205] border-t border-cyber-cyan/10 overflow-hidden">

      {/* Background Visuals */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(0,240,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,240,255,1) 1px,transparent 1px)',
        backgroundSize: '45px 45px'
      }} />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyber-cyan/5 blur-[120px] rounded-full pointer-events-none animate-pulse" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyber-pink/5 blur-[120px] rounded-full pointer-events-none animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 max-w-7xl mx-auto">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

          {/* Brand Identity */}
          <div className="flex flex-col items-start">
            <div className="font-orbitron text-3xl font-black tracking-[0.2em] mb-6 select-none cursor-default">
              <span className="text-cyber-cyan drop-shadow-[0_0_15px_#00F0FF]">NEX</span>
              <span className="text-transparent" style={{ WebkitTextStroke: '1px #FF003C', filter: 'drop-shadow(0 0 10px #FF003C)' }}>US</span>
            </div>
            <p className="font-inter text-sm text-gray-500 leading-relaxed mb-8 max-w-[280px]">
              The world's most immersive national-level hackathon. Redefining innovation through decentralized protocols and high-velocity code.
            </p>

            {/* Social Icons - Inki URLs yahan edit karo */}
            <div className="flex gap-4">
              {[
                { label: 'TW', url: 'https://twitter.com/your-profile', path: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
                { label: 'LD', url: 'https://linkedin.com/in/your-profile', path: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z' },
                { label: 'GH', url: 'https://github.com/your-profile', path: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22' }
              ].map((social, i) => (
                <motion.a
                  key={i} href={social.url} target="_blank" rel="noopener noreferrer" whileHover={{ y: -5, scale: 1.1 }}
                  className="w-10 h-10 border border-white/10 flex items-center justify-center text-gray-500 hover:text-cyber-cyan transition-all duration-300 rounded-sm hover:border-cyber-cyan hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                  style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d={social.path} />
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          <div>
            <h4 className="font-orbitron text-[11px] font-bold tracking-[0.4em] text-white/40 uppercase mb-8">Navigation</h4>
            <ul className="space-y-4">
              {navLinks.map(link => (
                <li key={link}>
                  <motion.a href={`#${link.toLowerCase().replace(/\s+/g, '')}`} whileHover={{ x: 8 }} className="group flex items-center gap-2 font-mono text-[12px] text-gray-500 hover:text-white transition-all duration-300">
                    <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-cyber-cyan">{'>'}</span>
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-orbitron text-[11px] font-bold tracking-[0.4em] text-white/40 uppercase mb-8">Resources</h4>
            <ul className="space-y-4">
              {resources.map(link => (
                <li key={link}>
                  <motion.a href={`#${link.toLowerCase().replace(/\s+/g, '')}`} whileHover={{ x: 8 }} className="group flex items-center gap-2 font-mono text-[12px] text-gray-500 hover:text-white transition-all duration-300">
                    <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-cyber-pink">{'>'}</span>
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-orbitron text-[11px] font-bold tracking-[0.4em] text-white/40 uppercase mb-8">Connect</h4>
            <ul className="space-y-4">
              {connect.map(item => (
                <li key={item.label}>
                  <motion.a href={item.url} target={item.label !== 'Contact' ? "_blank" : undefined} whileHover={{ x: 8 }} className="group flex items-center gap-2 font-mono text-[12px] text-gray-500 hover:text-white transition-all duration-300">
                    <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-yellow-400">{'>'}</span>
                    {item.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-2.5 h-2.5 rounded-full bg-[#00FF88] animate-pulse shadow-[0_0_10px_#00FF88]" />
            <span className="font-mono text-[10px] text-gray-600 tracking-widest uppercase">
              Mainframe_Status: Operational // © {currentYear} NEXUS_HACK
            </span>
          </div>
          <div className="font-mono text-[10px] text-gray-700 tracking-widest uppercase italic">
            Built for hackers // by agents of innovation
          </div>
        </div>

      </div>
    </footer>
  )
}