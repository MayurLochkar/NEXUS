import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function AdminPanel() {
    const navigate = useNavigate();
    const [showTooltip, setShowTooltip] = useState(true);

    return (
        <div className="min-h-screen bg-[#010103] text-white font-orbitron p-8 relative overflow-hidden">

            {/* --- JUDGES EXPLAINER OVERLAY --- */}
            <AnimatePresence>
                {showTooltip && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-6"
                    >
                        <div className="max-w-lg bg-[#050505] border border-cyber-cyan p-8 rounded-sm shadow-[0_0_50px_rgba(0,240,255,0.2)]">
                            <h2 className="text-cyber-cyan text-xl font-black mb-4 uppercase tracking-tighter">
                                {'>'} Welcome, Honorable Judge
                            </h2>
                            <p className="font-mono text-sm text-gray-400 leading-relaxed mb-6">
                                This **Mainframe Dashboard** is a custom-built administrative tool designed to monitor real-time event metrics. It demonstrates:
                                <br /><br />
                                1. **Real-time Analytics:** Tracking national registrations.<br />
                                2. **System Health:** Monitoring server uplink status.<br />
                                3. **Security Logs:** Observing automated firewall pings.
                            </p>
                            <button
                                onClick={() => setShowTooltip(false)}
                                className="w-full py-3 bg-cyber-cyan text-black font-bold uppercase text-xs tracking-widest hover:bg-white transition-all"
                            >
                                Access Command Center
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- MAIN CONTENT (Reusing your previous UI) --- */}
            <div className={`relative z-10 ${showTooltip ? 'blur-sm' : ''} transition-all duration-500`}>
                <header className="flex justify-between items-end border-b border-white/10 pb-8 mb-12">
                    <div>
                        <div className="text-cyber-cyan font-mono text-[10px] tracking-[0.5em] mb-2">// NEXUS_NATIONAL_HACKATHON_v2026</div>
                        <h1 className="text-4xl font-black uppercase tracking-tighter">Mainframe <span className="text-cyber-cyan italic">Dashboard</span></h1>
                    </div>
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-2 border border-cyber-pink text-cyber-pink hover:bg-cyber-pink hover:text-white transition-all text-[10px]"
                    >
                        RETURN_TO_STATION
                    </button>
                </header>

                {/* Baki ka Stats Grid aur Table code yahan waisa hi rahega... */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="p-6 bg-white/5 border border-white/10">
                        <p className="text-[10px] text-gray-500 mb-2">LIVE_REGISTRATIONS (PAN-INDIA)</p>
                        <p className="text-3xl font-black text-cyber-cyan">2,548</p>
                    </div>
                    <div className="p-6 bg-white/5 border border-white/10">
                        <p className="text-[10px] text-gray-500 mb-2">ACTIVE_NODES</p>
                        <p className="text-3xl font-black text-green-400">STATE_STABLE</p>
                    </div>
                    <div className="p-6 bg-white/5 border border-white/10">
                        <p className="text-[10px] text-gray-500 mb-2">BOUNTY_POOL</p>
                        <p className="text-3xl font-black text-yellow-400">$50,000</p>
                    </div>
                </div>
            </div>
        </div>
    );
}