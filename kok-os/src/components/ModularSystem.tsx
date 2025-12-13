'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ModularSystem() {
    const { t } = useLanguage();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [activeModule, setActiveModule] = useState<string | null>(null);

    const systemModules = [
        {
            id: 'dna',
            title: t('modular.dna.title'),
            description: t('modular.dna.desc'),
            features: [
                t('modular.dna.feature1'),
                t('modular.dna.feature2'),
                t('modular.dna.feature3')
            ],
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
            ),
            status: 'MODULE_001',
            color: '#c8ff00',
        },
        {
            id: 'web',
            title: t('modular.web.title'),
            description: t('modular.web.desc'),
            features: [
                t('modular.web.feature1'),
                t('modular.web.feature2'),
                t('modular.web.feature3')
            ],
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
            ),
            status: 'MODULE_002',
            color: '#4488ff',
        },
        {
            id: 'automation',
            title: t('modular.automation.title'),
            description: t('modular.automation.desc'),
            features: [
                t('modular.automation.feature1'),
                t('modular.automation.feature2'),
                t('modular.automation.feature3')
            ],
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            status: 'MODULE_003',
            color: '#ff8844',
        },
        {
            id: 'design',
            title: t('modular.design.title'),
            description: t('modular.design.desc'),
            features: [
                t('modular.design.feature1'),
                t('modular.design.feature2'),
                t('modular.design.feature3')
            ],
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
            ),
            status: 'MODULE_004',
            color: '#44ffaa',
        },
    ];

    return (
        <section className="py-16 sm:py-20 md:py-24 lg:py-32 relative">
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
                        {t('modular.badge')}
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">
                        <span className="text-[#ededed]">{t('modular.title.part1')}</span>{' '}
                        <span className="text-[#c8ff00]">{t('modular.title.part2')}</span>
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-[#888888] max-w-2xl mx-auto px-4 sm:px-0">
                        {t('modular.subtitle')}
                    </p>
                </motion.div>

                {/* Module Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                    {systemModules.map((module, index) => (
                        <motion.div
                            key={module.id}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 * index }}
                            onMouseEnter={() => setActiveModule(module.id)}
                            onMouseLeave={() => setActiveModule(null)}
                            className="relative group"
                        >
                            <div
                                className="p-5 sm:p-6 md:p-8 bg-[#111111] border border-[#1a1a1a] rounded-xl transition-all duration-500"
                                style={{
                                    borderColor: activeModule === module.id ? `${module.color}40` : '#1a1a1a',
                                    boxShadow: activeModule === module.id ? `0 0 40px ${module.color}15` : 'none',
                                }}
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between mb-4 sm:mb-6">
                                    <div
                                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center transition-all duration-300"
                                        style={{
                                            backgroundColor: activeModule === module.id ? module.color : '#1a1a1a',
                                            color: activeModule === module.id ? '#0a0a0a' : module.color,
                                        }}
                                    >
                                        {module.icon}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span
                                            className="w-2 h-2 rounded-full transition-all duration-300"
                                            style={{
                                                backgroundColor: activeModule === module.id ? module.color : '#555555',
                                                boxShadow: activeModule === module.id ? `0 0 10px ${module.color}` : 'none',
                                            }}
                                        ></span>
                                        <span className="font-mono text-[10px] text-[#555555]">{module.status}</span>
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-[#ededed]">{module.title}</h3>
                                <p className="text-sm sm:text-base text-[#888888] leading-relaxed mb-4 sm:mb-6">{module.description}</p>

                                {/* Features */}
                                <div className="space-y-2">
                                    {module.features.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <svg
                                                className="w-4 h-4 transition-colors duration-300"
                                                style={{ color: module.color }}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                                            </svg>
                                            <span className="text-sm text-[#888888]">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Active Indicator */}
                                <div
                                    className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t transition-all duration-300"
                                    style={{ borderColor: activeModule === module.id ? `${module.color}20` : '#1a1a1a' }}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-mono text-xs text-[#555555]">
                                            {activeModule === module.id ? t('modular.active') : t('modular.standby')}
                                        </span>
                                        <motion.div
                                            animate={{
                                                scale: activeModule === module.id ? [1, 1.2, 1] : 1,
                                            }}
                                            transition={{
                                                duration: 1,
                                                repeat: activeModule === module.id ? Infinity : 0,
                                            }}
                                            className="w-3 h-3 rounded-full transition-colors duration-300"
                                            style={{
                                                backgroundColor: activeModule === module.id ? module.color : '#333333',
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
