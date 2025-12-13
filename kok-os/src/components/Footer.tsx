'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Footer() {
    const [cpuUsage, setCpuUsage] = useState(18);
    const [memoryUsage, setMemoryUsage] = useState(42);
    const [networkIO, setNetworkIO] = useState(256);
    const [activeLayer, setActiveLayer] = useState('BASE');
    const [uptime, setUptime] = useState('14d 7h 23m');

    useEffect(() => {
        const interval = setInterval(() => {
            setCpuUsage(Math.floor(Math.random() * 20) + 10);
            setMemoryUsage(Math.floor(Math.random() * 25) + 35);
            setNetworkIO(Math.floor(Math.random() * 150) + 200);
        }, 3000);

        const layers = ['BASE', 'CORE', 'AUTOMATION'];
        let layerIndex = 0;
        const layerInterval = setInterval(() => {
            layerIndex = (layerIndex + 1) % layers.length;
            setActiveLayer(layers[layerIndex]);
        }, 5000);

        return () => {
            clearInterval(interval);
            clearInterval(layerInterval);
        };
    }, []);

    return (
        <footer className="relative border-t border-[#1a1a1a]">
            {/* Background Grid */}
            <div className="absolute inset-0 grid-bg-deep opacity-20"></div>

            {/* System Status Bar */}
            <div className="relative z-10 py-3 px-4 bg-[#0d0d0d] border-b border-[#1a1a1a]">
                <div className="container-system">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        {/* Left - System Metrics */}
                        <div className="flex items-center gap-2 sm:gap-4 md:gap-6 text-[10px] sm:text-[11px] font-mono overflow-x-auto scrollbar-hide">
                            {/* CPU */}
                            <div className="flex items-center gap-2">
                                <svg className="w-3.5 h-3.5 text-[#555555]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                                </svg>
                                <span className="text-[#555555]">CPU:</span>
                                <motion.span
                                    key={cpuUsage}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className={cpuUsage > 25 ? 'text-[#ff8844]' : 'text-[#888888]'}
                                >
                                    {cpuUsage}%
                                </motion.span>
                                {/* Mini bar */}
                                <div className="hidden xs:block w-8 sm:w-12 h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                                    <motion.div
                                        animate={{ width: `${cpuUsage}%` }}
                                        transition={{ duration: 0.5 }}
                                        className="h-full bg-[#c8ff00]"
                                    />
                                </div>
                            </div>

                            {/* Memory */}
                            <div className="hidden sm:flex items-center gap-2">
                                <svg className="w-3.5 h-3.5 text-[#555555]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                                </svg>
                                <span className="text-[#555555]">MEM:</span>
                                <motion.span
                                    key={memoryUsage}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-[#888888]"
                                >
                                    {memoryUsage}%
                                </motion.span>
                                <div className="hidden md:block w-12 h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                                    <motion.div
                                        animate={{ width: `${memoryUsage}%` }}
                                        transition={{ duration: 0.5 }}
                                        className="h-full bg-[#4488ff]"
                                    />
                                </div>
                            </div>

                            {/* Network */}
                            <div className="hidden md:flex items-center gap-2">
                                <svg className="w-3.5 h-3.5 text-[#555555]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                                </svg>
                                <span className="text-[#555555]">NET:</span>
                                <motion.span
                                    key={networkIO}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-[#44ff88]"
                                >
                                    {networkIO}KB/s
                                </motion.span>
                            </div>
                        </div>

                        {/* Right - Active Layer */}
                        <div className="flex items-center gap-4">
                            <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono">
                                <span className="text-[#555555]">UPTIME:</span>
                                <span className="text-[#888888]">{uptime}</span>
                            </div>
                            <span className="text-[#333333] hidden sm:inline">|</span>
                            <div className="flex items-center gap-2 text-[11px] font-mono">
                                <span className="text-[#555555]">ACTIVE LAYER:</span>
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={activeLayer}
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -5 }}
                                        className="text-[#c8ff00] font-bold"
                                    >
                                        {activeLayer}
                                    </motion.span>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="container-system relative z-10 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
                    {/* Left - Logo & Copyright */}
                    <div className="flex items-center gap-4">
                        <div className="w-6 h-6">
                            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-50">
                                <path d="M8 8H14V14H8V8Z" fill="#c8ff00" />
                                <path d="M18 8H24V14H18V8Z" fill="#c8ff00" />
                                <path d="M8 18H14V24H8V18Z" fill="#c8ff00" />
                                <path d="M18 18H24V24H18V18Z" fill="#c8ff00" opacity="0.5" />
                            </svg>
                        </div>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3">
                            <span className="font-mono text-[10px] sm:text-xs text-[#555555]">© 2025 KÖK_OS</span>
                            <span className="text-[#333333]">|</span>
                            <span className="font-mono text-[10px] sm:text-xs text-[#555555]">v2.5.1</span>
                            <span className="text-[#333333]">|</span>
                            <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#44ff88] shadow-[0_0_8px_#44ff88]"></span>
                                <span className="font-mono text-[10px] sm:text-xs text-[#44ff88]">ALL_SYSTEMS_NOMINAL</span>
                            </div>
                        </div>
                    </div>

                    {/* Center - Quick Links */}
                    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
                        <a href="#" className="font-mono text-[10px] text-[#555555] hover:text-[#888888] transition-colors">
                            Protokol
                        </a>
                        <a href="#" className="font-mono text-[10px] text-[#555555] hover:text-[#888888] transition-colors">
                            Sistem Şartları
                        </a>
                        <a href="#" className="font-mono text-[10px] text-[#555555] hover:text-[#888888] transition-colors">
                            Dokümantasyon
                        </a>
                    </div>

                    {/* Right - Social Links */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        <a
                            href="#"
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#111111] border border-[#1a1a1a] text-[#555555] hover:text-[#c8ff00] hover:border-[#c8ff00]/30 transition-all"
                            aria-label="GitHub"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </a>
                        <a
                            href="#"
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#111111] border border-[#1a1a1a] text-[#555555] hover:text-[#c8ff00] hover:border-[#c8ff00]/30 transition-all"
                            aria-label="LinkedIn"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                        </a>
                        <a
                            href="#"
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#111111] border border-[#1a1a1a] text-[#555555] hover:text-[#c8ff00] hover:border-[#c8ff00]/30 transition-all"
                            aria-label="Twitter/X"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Terminal Line */}
            <div className="relative z-10 py-2 px-4 bg-[#080808] border-t border-[#1a1a1a]">
                <div className="container-system">
                    <div className="flex items-center gap-2 text-[9px] sm:text-[10px] font-mono text-[#333333]">
                        <span className="text-[#c8ff00]">$</span>
                        <span className="typing-effect">kok-os status --verbose</span>
                        <span className="text-[#555555]">// All systems operational</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
