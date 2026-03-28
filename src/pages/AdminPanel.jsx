import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function AdminPanel() {
    const navigate = useNavigate();
    const [count, setCount] = useState(1458);
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
        const counter = setInterval(() => setCount(prev => prev + Math.floor(Math.random() * 2)), 4000);
        return () => { clearInterval(timer); clearInterval(counter); };
    }, []);

    const stats = [
        { label: 'TOTAL_APPLICANTS', val: count, col: '#00F0FF' },
        { label: 'NODE_STATUS', val: 'ENCRYPTED', col: '#00FF88' },
        { label: 'DATA_INTEGRITY', val: '100%', col: '#FFE600' },
    ];

    return (
        <div className="min-h-screen bg-[#010103] text-white font-orbitron p-6 md:p-10 relative overflow-hidden">

            {/* 1. Tactical Grid Background */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.05]" style={{
                backgroundImage: 'linear-gradient(#00F0FF 1px, transparent 1px), linear-gradient(90deg, #00F0FF 1px, transparent 1px)',
                backgroundSize: '40px 40px', transform: 'perspective(500px) rotateX(60deg)', transformOrigin: 'center bottom'
            }} />

            <div className="relative z-10 max-w-7xl mx-auto">

                {/* HEADER WITH RETURN BUTTON */}
                <header className="flex justify-between items-start border-b border-white/10 pb-8 mb-10">
                    <div>
                        <div className="text-cyber-cyan font-mono text-[10px] tracking-[0.5em] mb-2">// SECURITY_LEVEL: LEVEL_5</div>
                        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
                            Admin <span className="text-cyber-cyan italic">Mainframe</span>
                        </h1>
                    </div>

                    {/* THE RETURN BUTTON FOR JUDGES */}
                    <button
                        onClick={() => navigate('/')}
                        className="group relative px-6 py-3 border border-cyber-pink text-cyber-pink font-bold text-[11px] tracking-widest overflow-hidden transition-all hover:bg-cyber-pink hover:text-white"
                    >
                        <span className="relative z-10">{'<'} RETURN_TO_HOME</span>
                        <div className="absolute inset-0 bg-cyber-pink/20 blur-md group-hover:blur-xl transition-all" />
                    </button>
                </header>

                {/* TOP STATS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {stats.map((s, i) => (
                        <motion.div
                            key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                            className="bg-white/5 border border-white/10 p-6 rounded-sm relative group"
                        >
                            <div className="text-[9px] text-gray-500 tracking-[0.3em] mb-3 uppercase">{s.label}</div>
                            <div className="text-3xl font-black mb-1" style={{ color: s.col }}>{s.val}</div>
                            <div className="font-mono text-[10px] text-white/30 tracking-widest">NETWORK_LATENCY: 14ms</div>
                            {/* Corner Accent */}
                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r" style={{ borderColor: s.col }} />
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* USER TABLE AREA */}
                    <div className="lg:col-span-2">
                        <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-sm overflow-hidden">
                            <div className="p-4 bg-white/5 border-b border-white/10 font-mono text-[11px] text-cyber-cyan tracking-[0.3em] uppercase">
                                Recent_Activity_Stream
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left font-mono">
                                    <thead className="text-[10px] text-gray-500 uppercase tracking-widest bg-white/[0.02]">
                                        <tr>
                                            <th className="p-4">Agent_UID</th>
                                            <th className="p-4">Identity</th>
                                            <th className="p-4">Sector</th>
                                            <th className="p-4">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-[12px]">
                                        {[
                                            { id: 'NX-092', name: 'Agent_Lochk', track: 'AI/ML', status: 'AUTHORIZED', col: '#00FF88' },
                                            { id: 'NX-088', name: 'Cypher_Null', track: 'Cybersec', status: 'PENDING', col: '#FFE600' },
                                            { id: 'NX-042', name: 'Matrix_Rider', track: 'Web3', status: 'AUTHORIZED', col: '#00FF88' },
                                            { id: 'NX-021', name: 'Ghost_Shell', track: 'Open', status: 'FLAGGED', col: '#FF003C' },
                                        ].map((row, i) => (
                                            <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-all group">
                                                <td className="p-4 text-gray-500 group-hover:text-cyber-cyan">#{row.id}</td>
                                                <td className="p-4 font-bold uppercase">{row.name}</td>
                                                <td className="p-4 text-cyber-cyan opacity-80">{row.track}</td>
                                                <td className="p-4">
                                                    <span className="px-2 py-1 border text-[9px]" style={{ borderColor: row.col, color: row.col }}>{row.status}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* LOGS PANEL */}
                    <div className="bg-black/50 backdrop-blur-xl border border-white/10 p-6 relative">
                        <h3 className="font-mono text-[11px] text-cyber-pink tracking-widest uppercase mb-6 border-b border-white/5 pb-2">
                            {'>'} SYSTEM_LOGS
                        </h3>
                        <div className="space-y-4 font-mono text-[10px] opacity-70">
                            <p className="text-green-400">--- CONNECTION SECURE ---</p>
                            <p className="flex gap-2 text-cyber-cyan"><span className="animate-pulse">●</span> Monitoring judges link...</p>
                            <p>[INFO] Access granted to ADMIN_ROOT</p>
                            <p className="text-gray-500">[{time}] Syncing local backup...</p>
                            <p className="text-cyber-pink">[WARN] Firewall blocked 2 port-scans</p>
                            <p className="text-green-400">[SUCCESS] Cache optimized</p>
                            <p className="mt-10 text-center text-gray-600 border-t border-white/5 pt-4 uppercase">EndOfTransmission</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}