'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function OperationPipeline() {
    const { t } = useLanguage();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const steps = [
        {
            number: '01',
            title: t('pipeline.step1.title'),
            description: t('pipeline.step1.desc'),
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
        },
        {
            number: '02',
            title: t('pipeline.step2.title'),
            description: t('pipeline.step2.desc'),
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
        },
        {
            number: '03',
            title: t('pipeline.step3.title'),
            description: t('pipeline.step3.desc'),
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
        },
        {
            number: '04',
            title: t('pipeline.step4.title'),
            description: t('pipeline.step4.desc'),
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
        },
        {
            number: '05',
            title: t('pipeline.step5.title'),
            description: t('pipeline.step5.desc'),
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
            ),
        },
    ];

    return (
        <section id="process" className="py-16 sm:py-20 md:py-24 lg:py-32 relative bg-[#080808]">
            {/* Background Grid */}
            <div className="absolute inset-0 grid-bg-dense opacity-50"></div>

            <div className="container-system relative z-10">
                {/* Section Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8 sm:mb-12 md:mb-16"
                >
                    <div className="system-badge mb-6">
                        <span className="w-2 h-2 rounded-full bg-[#c8ff00]"></span>
                        {t('pipeline.badge')}
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">
                        <span className="text-[#ededed]">{t('pipeline.title.part1')}</span>{' '}
                        <span className="text-[#c8ff00]">{t('pipeline.title.part2')}</span>
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-[#888888] max-w-2xl mx-auto px-4 sm:px-0">
                        {t('pipeline.subtitle')}
                    </p>
                </motion.div>

                {/* Pipeline Steps */}
                <div className="relative">
                    {/* Connection Line */}
                    <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c8ff00]/20 to-transparent -translate-y-1/2"></div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.number}
                                initial={{ opacity: 0, y: 40 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.1 * index }}
                                className="relative group"
                            >
                                {/* Step Card */}
                                <div className="relative z-10 p-4 sm:p-5 md:p-6 bg-[#111111] border border-[#1a1a1a] rounded-xl group-hover:border-[#c8ff00]/30 transition-all duration-300">
                                    {/* Step Number */}
                                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                                        <span className="font-mono text-xl sm:text-2xl font-bold text-[#c8ff00]">{step.number}</span>
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#1a1a1a] flex items-center justify-center text-[#888888] group-hover:text-[#c8ff00] transition-colors">
                                            {step.icon}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-[#ededed]">{step.title}</h3>
                                    <p className="text-sm sm:text-base text-[#888888] leading-relaxed">{step.description}</p>
                                </div>

                                {/* Connection Dot */}
                                <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#c8ff00] shadow-[0_0_15px_rgba(200,255,0,0.5)] z-20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* No Meeting Emphasis */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="text-center mt-10 sm:mt-12 md:mt-16"
                >
                    <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-[#111111] border border-[#1a1a1a] rounded-lg">
                        <svg className="w-5 h-5 text-[#ff4444]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                        </svg>
                        <span className="font-mono text-xs sm:text-sm text-[#888888]">{t('pipeline.noMeeting')}</span>
                        <span className="text-xs sm:text-sm text-[#888888] hidden sm:inline">|</span>
                        <span className="text-xs sm:text-sm text-[#ededed]">{t('pipeline.async')}</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
