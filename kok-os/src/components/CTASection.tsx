'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBoot } from '@/contexts/BootContext';

export default function CTASection() {
    const { t } = useLanguage();
    const { startBoot, isBooting } = useBoot();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [isHovered, setIsHovered] = useState(false);

    return (
        <section className="py-16 sm:py-20 md:py-24 lg:py-32 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a]"></div>
            <div className="absolute inset-0 grid-bg-deep opacity-30"></div>

            {/* Radial Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(200,255,0,0.05)_0%,transparent_60%)]"></div>

            <div className="container-system relative z-10">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl mx-auto text-center"
                >
                    {/* Terminal-style prompt */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#0d0d0d] border border-[#1a1a1a] rounded-lg mb-6 sm:mb-8 md:mb-10"
                    >
                        <span className="font-mono text-xs sm:text-sm text-[#c8ff00]">$</span>
                        <span className="font-mono text-xs sm:text-sm text-[#888888]">{t('cta.terminalCommand')}</span>
                        <span className="w-2 h-4 bg-[#c8ff00] animate-pulse"></span>
                    </motion.div>

                    {/* Heading */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6"
                    >
                        <span className="text-[#ededed]">{t('cta.title.part1')}</span>{' '}
                        <span className="text-[#c8ff00] text-glow">{t('cta.title.part2')}</span>{' '}
                        <span className="text-[#ededed]">{t('cta.title.part3')}</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-base sm:text-lg md:text-xl text-[#888888] mb-8 sm:mb-10 md:mb-12"
                    >
                        {t('cta.desc.line1')}
                        <br />
                        {t('cta.desc.line2')}
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
                    >
                        <motion.button
                            onClick={startBoot}
                            disabled={isBooting}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            whileHover={{ scale: isBooting ? 1 : 1.02 }}
                            whileTap={{ scale: isBooting ? 1 : 0.98 }}
                            className={`relative group flex items-center justify-center gap-3 w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 ${isBooting
                                    ? 'bg-[#c8ff00]/20 text-[#c8ff00] border border-[#c8ff00]/40 cursor-not-allowed'
                                    : 'bg-[#c8ff00] text-[#0a0a0a] hover:shadow-[0_0_50px_rgba(200,255,0,0.5)]'
                                }`}
                        >
                            {isBooting ? (
                                <>
                                    <motion.span
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                        className="w-5 h-5 border-2 border-[#c8ff00] border-t-transparent rounded-full"
                                    />
                                    <span>Sistem Başlatılıyor...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    {t('cta.primary')}
                                </>
                            )}

                            {/* Glow effect on hover */}
                            {!isBooting && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: isHovered ? 1 : 0 }}
                                    className="absolute inset-0 rounded-lg bg-[#c8ff00] blur-xl -z-10"
                                />
                            )}
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center justify-center gap-3 w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5 bg-[#111111] border-2 border-[#333333] text-[#ededed] rounded-lg font-semibold text-base sm:text-lg hover:border-[#555555] hover:bg-[#1a1a1a] transition-all duration-300"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            {t('cta.secondary')}
                        </motion.button>
                    </motion.div>

                    {/* Trust Indicators - System Style */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 mt-8 sm:mt-10 md:mt-12"
                    >
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#111111] border border-[#1a1a1a] rounded-md">
                            <span className="w-2 h-2 rounded-full bg-[#44ff88]"></span>
                            <span className="text-xs font-mono text-[#888888]">{t('cta.trust1')}</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#111111] border border-[#1a1a1a] rounded-md">
                            <span className="w-2 h-2 rounded-full bg-[#44ff88]"></span>
                            <span className="text-xs font-mono text-[#888888]">{t('cta.trust2')}</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#111111] border border-[#1a1a1a] rounded-md">
                            <span className="w-2 h-2 rounded-full bg-[#44ff88]"></span>
                            <span className="text-xs font-mono text-[#888888]">{t('cta.trust3')}</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
