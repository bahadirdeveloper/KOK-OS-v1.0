'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function TargetModules() {
    const { t } = useLanguage();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const modules = [
        {
            id: 'local',
            title: t('targets.local.title'),
            description: t('targets.local.desc'),
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            ),
            status: 'ACTIVE',
        },
        {
            id: 'agriculture',
            title: t('targets.agriculture.title'),
            description: t('targets.agriculture.desc'),
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            status: 'ACTIVE',
        },
        {
            id: 'education',
            title: t('targets.education.title'),
            description: t('targets.education.desc'),
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
            status: 'ACTIVE',
        },
        {
            id: 'startup',
            title: t('targets.startup.title'),
            description: t('targets.startup.desc'),
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            status: 'ACTIVE',
        },
    ];

    return (
        <section id="modules" className="py-16 sm:py-20 md:py-24 lg:py-32 relative">
            <div className="container-system">
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
                        {t('targets.badge')}
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">
                        <span className="text-[#ededed]">{t('targets.title.part1')}</span>{' '}
                        <span className="text-[#c8ff00]">{t('targets.title.part2')}</span>
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-[#888888] max-w-2xl mx-auto px-4 sm:px-0">
                        {t('targets.subtitle')}
                    </p>
                </motion.div>

                {/* Module Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                    {modules.map((module, index) => (
                        <motion.div
                            key={module.id}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 * index }}
                            className="module-card group p-4 sm:p-5 md:p-6"
                        >
                            {/* Status Indicator */}
                            <div className="flex items-center justify-between mb-4 sm:mb-6">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#1a1a1a] flex items-center justify-center text-[#c8ff00] group-hover:bg-[#c8ff00] group-hover:text-[#0a0a0a] transition-all duration-300">
                                    {module.icon}
                                </div>
                                <span className="font-mono text-[10px] text-[#555555] group-hover:text-[#c8ff00] transition-colors">
                                    {module.status}
                                </span>
                            </div>

                            {/* Content */}
                            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-[#ededed]">{module.title}</h3>
                            <p className="text-sm sm:text-base text-[#888888] leading-relaxed">{module.description}</p>

                            {/* Hover Indicator */}
                            <div className="mt-4 sm:mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="w-2 h-2 rounded-full bg-[#c8ff00] animate-pulse"></span>
                                <span className="font-mono text-xs text-[#c8ff00]">{t('targets.moduleActive')}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
