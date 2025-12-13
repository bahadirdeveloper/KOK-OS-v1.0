'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBoot } from '@/contexts/BootContext';

export default function HeroSection() {
    const { t } = useLanguage();
    const { startBoot } = useBoot();
    const [cpuLoad, setCpuLoad] = useState(12);
    const [memoryUsage, setMemoryUsage] = useState(34);
    const [networkSpeed, setNetworkSpeed] = useState(128);
    const [activeLayer, setActiveLayer] = useState('BASE');
    const [visibleLines, setVisibleLines] = useState<number[]>([]);
    const [showHowItWorks, setShowHowItWorks] = useState(false);
    const terminalRef = useRef<HTMLDivElement>(null);

    // Dynamic terminal lines based on language
    const terminalLines = [
        { text: t('hero.terminal.line1'), delay: 0 },
        { text: t('hero.terminal.line2'), delay: 1200 },
        { text: t('hero.terminal.line3'), delay: 2400 },
        { text: t('hero.terminal.line4'), delay: 3600, highlight: true },
    ];

    useEffect(() => {
        // Simulate system metrics
        const interval = setInterval(() => {
            setCpuLoad(Math.floor(Math.random() * 15) + 8);
            setMemoryUsage(Math.floor(Math.random() * 20) + 30);
            setNetworkSpeed(Math.floor(Math.random() * 50) + 100);
        }, 2000);

        // Cycle through active layers
        const layers = ['BASE', 'CORE', 'AUTOMATION', 'AI'];
        let layerIndex = 0;
        const layerInterval = setInterval(() => {
            layerIndex = (layerIndex + 1) % layers.length;
            setActiveLayer(layers[layerIndex]);
        }, 5000);

        // Terminal animation
        terminalLines.forEach((line, index) => {
            setTimeout(() => {
                setVisibleLines(prev => [...prev, index]);
            }, line.delay);
        });

        return () => {
            clearInterval(interval);
            clearInterval(layerInterval);
        };
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20">
            {/* Deep Grid Background */}
            <div className="absolute inset-0 grid-bg-deep opacity-40"></div>

            {/* Subtle radial gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,255,0,0.03)_0%,transparent_60%)]"></div>

            {/* Floating Orb */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.1, 1],
                    x: [0, 20, 0],
                    y: [0, -30, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-[15%] left-[5%] sm:left-[12%] w-10 h-10 sm:w-16 sm:h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 blur-sm"
                style={{
                    boxShadow: '0 0 60px rgba(99, 102, 241, 0.4), 0 0 120px rgba(139, 92, 246, 0.2)'
                }}
            />

            {/* System Layer Status Badge */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute top-20 sm:top-28 left-1/2 -translate-x-1/2 z-30"
            >
                <div className="px-3 sm:px-4 py-1 sm:py-1.5 bg-[#111111]/80 backdrop-blur-sm border border-[#1a1a1a] rounded-full">
                    <span className="text-[10px] sm:text-xs font-mono text-[#888888]">
                        {t('system.layerActive')}
                    </span>
                </div>
            </motion.div>

            {/* Content */}
            <div className="container-system relative z-20 text-center py-12 sm:py-16 md:py-24 px-4 sm:px-6">
                {/* System Status Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="inline-flex items-center gap-2 sm:gap-3 mb-6 sm:mb-10 md:mb-12"
                >
                    <div className="system-badge">
                        <span className="status-dot"></span>
                        {t('hero.badge')}
                    </div>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-[1.1] mb-4 sm:mb-6 md:mb-8 tracking-tight"
                >
                    <span className="text-[#ededed]">{t('hero.title.part1')}</span>
                    {t('hero.title.part2') && (
                        <span className="text-[#c8ff00] relative inline-block">
                            {t('hero.title.part2')}
                            {/* Strikethrough effect */}
                            <span className="absolute left-0 right-0 top-1/2 h-[3px] md:h-[4px] bg-[#c8ff00] transform -translate-y-1/2"></span>
                        </span>
                    )}
                    <br />
                    <span className="text-[#888888] text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl block mt-2 sm:mt-3 md:mt-4">
                        {t('hero.subtitle.part1')}{' '}
                        <span className="text-[#c8ff00] text-glow font-bold">{t('hero.subtitle.part2')}</span>
                    </span>
                </motion.h1>

                {/* Description */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10 px-2 sm:px-0"
                >
                    <p className="text-base sm:text-lg md:text-xl text-[#888888] leading-relaxed">
                        {t('hero.description')}
                    </p>
                </motion.div>

                {/* Terminal Lines */}
                <motion.div
                    ref={terminalRef}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="max-w-xl mx-auto mb-8 sm:mb-10 md:mb-12 text-left"
                >
                    <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-lg p-3 sm:p-4 font-mono text-xs sm:text-sm">
                        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#1a1a1a]">
                            <span className="w-3 h-3 rounded-full bg-[#ff5f56]"></span>
                            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]"></span>
                            <span className="w-3 h-3 rounded-full bg-[#27ca40]"></span>
                            <span className="ml-2 sm:ml-4 text-[10px] sm:text-xs text-[#555555] truncate">kok-os://terminal</span>
                        </div>
                        <div className="space-y-1.5 sm:space-y-2 min-h-[100px] sm:min-h-[120px]">
                            {terminalLines.map((line, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={visibleLines.includes(index) ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.3 }}
                                    className={`flex items-center gap-2 ${line.highlight ? 'text-[#c8ff00]' : 'text-[#888888]'
                                        }`}
                                >
                                    <span className="text-[#c8ff00]">$</span>
                                    <TypingText text={line.text} show={visibleLines.includes(index)} highlight={line.highlight} />
                                </motion.div>
                            ))}
                            {visibleLines.length === terminalLines.length && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="inline-block w-2 h-4 bg-[#c8ff00] animate-pulse ml-4"
                                />
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
                >
                    {/* Primary CTA */}
                    <motion.button
                        onClick={startBoot}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative overflow-hidden flex flex-col items-center gap-1 w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5 bg-[#c8ff00] text-[#0a0a0a] rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 hover:shadow-[0_0_40px_rgba(200,255,0,0.5)]"
                    >
                        <span className="flex items-center gap-3">
                            {t('hero.cta.primary')}
                            <span className="font-mono text-sm opacity-70">&gt;_</span>
                        </span>
                        <span className="text-xs font-normal opacity-70">{t('hero.cta.primarySub')}</span>
                    </motion.button>

                    {/* Secondary CTA */}
                    <motion.button
                        onClick={() => setShowHowItWorks(true)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group flex items-center justify-center gap-3 w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5 bg-[#111111] border-2 border-[#333333] text-[#ededed] rounded-lg font-semibold text-base sm:text-lg hover:border-[#555555] hover:bg-[#1a1a1a] transition-all duration-300"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {t('hero.cta.secondary')}
                    </motion.button>
                </motion.div>
            </div>

            {/* Bottom System Status Bar */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                className="absolute bottom-0 left-0 right-0 z-20 py-2 sm:py-3 md:py-4 bg-[#0a0a0a]/80 backdrop-blur-sm border-t border-[#1a1a1a]"
            >
                <div className="container-system">
                    <div className="flex items-center justify-between text-[#555555] overflow-x-auto gap-4 sm:gap-6 scrollbar-hide">
                        {/* Left - System Metrics */}
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2 flex-shrink-0">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                                </svg>
                                <span className="font-mono text-[10px] sm:text-xs whitespace-nowrap">{t('hero.statusBar.cpu')}: <span className="text-[#888888]">{cpuLoad}%</span></span>
                            </div>
                            <div className="hidden sm:flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                </svg>
                                <span className="font-mono text-xs whitespace-nowrap">{t('hero.statusBar.memory')}: <span className="text-[#888888]">{memoryUsage}%</span></span>
                            </div>
                            <div className="hidden md:flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                <span className="font-mono text-xs whitespace-nowrap">{t('hero.statusBar.network')}: <span className="text-[#888888]">{networkSpeed}KB/s</span></span>
                            </div>
                        </div>

                        {/* Right - Active Layer */}
                        <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] sm:text-xs whitespace-nowrap">{t('hero.statusBar.activeLayer')}:</span>
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={activeLayer}
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    className="font-mono text-[10px] sm:text-xs text-[#c8ff00] font-bold"
                                >
                                    {activeLayer}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* How It Works Modal */}
            <AnimatePresence>
                {showHowItWorks && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#0a0a0a]/90 backdrop-blur-md"
                        onClick={() => setShowHowItWorks(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-2xl bg-[#111111] border border-[#1a1a1a] rounded-xl p-4 sm:p-6 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
                        >
                            <button
                                onClick={() => setShowHowItWorks(false)}
                                className="absolute top-4 right-4 text-[#555555] hover:text-white transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                                <span className="w-3 h-3 rounded-full bg-[#c8ff00] animate-pulse"></span>
                                <span className="font-mono text-sm text-[#c8ff00]">{t('modal.howItWorks.badge')}</span>
                            </div>

                            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{t('modal.howItWorks.title')}</h3>

                            <div className="space-y-3 sm:space-y-4 text-[#888888]">
                                <div className="flex gap-3 sm:gap-4 items-start p-3 sm:p-4 bg-[#0a0a0a] rounded-lg border border-[#1a1a1a]">
                                    <span className="text-[#c8ff00] font-mono text-sm">01</span>
                                    <div>
                                        <h4 className="text-white font-semibold mb-1">{t('modal.howItWorks.step1.title')}</h4>
                                        <p className="text-sm">{t('modal.howItWorks.step1.desc')}</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start p-4 bg-[#0a0a0a] rounded-lg border border-[#1a1a1a]">
                                    <span className="text-[#c8ff00] font-mono text-sm">02</span>
                                    <div>
                                        <h4 className="text-white font-semibold mb-1">{t('modal.howItWorks.step2.title')}</h4>
                                        <p className="text-sm">{t('modal.howItWorks.step2.desc')}</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start p-4 bg-[#0a0a0a] rounded-lg border border-[#1a1a1a]">
                                    <span className="text-[#c8ff00] font-mono text-sm">03</span>
                                    <div>
                                        <h4 className="text-white font-semibold mb-1">{t('modal.howItWorks.step3.title')}</h4>
                                        <p className="text-sm">{t('modal.howItWorks.step3.desc')}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-[#1a1a1a] text-center">
                                <button
                                    onClick={() => setShowHowItWorks(false)}
                                    className="px-6 py-3 bg-[#c8ff00] text-[#0a0a0a] rounded-lg font-semibold hover:shadow-[0_0_30px_rgba(200,255,0,0.4)] transition-all"
                                >
                                    {t('modal.howItWorks.cta')}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

// Typing animation component
function TypingText({ text, show, highlight }: { text: string; show: boolean; highlight?: boolean }) {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        if (!show) return;

        let i = 0;
        const timer = setInterval(() => {
            if (i <= text.length) {
                setDisplayText(text.slice(0, i));
                i++;
            } else {
                clearInterval(timer);
            }
        }, 30);

        return () => clearInterval(timer);
    }, [show, text]);

    return (
        <span className={highlight ? 'text-[#c8ff00] font-bold' : ''}>
            {displayText}
        </span>
    );
}
