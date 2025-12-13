'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function SystemArchitectureV2() {
    const { t } = useLanguage();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [activeNode, setActiveNode] = useState<string | null>(null);
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    // Dynamic system nodes based on language
    const systemNodes = [
        {
            id: 'identity',
            title: t('arch.identity.title'),
            subtitle: t('arch.identity.subtitle'),
            status: 'ACTIVE',
            description: t('arch.identity.desc'),
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
            ),
            color: '#c8ff00',
            layer: 1,
        },
        {
            id: 'infrastructure',
            title: t('arch.infrastructure.title'),
            subtitle: t('arch.infrastructure.subtitle'),
            status: 'ACTIVE',
            description: t('arch.infrastructure.desc'),
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
            ),
            color: '#4488ff',
            layer: 2,
        },
        {
            id: 'automation',
            title: t('arch.automation.title'),
            subtitle: t('arch.automation.subtitle'),
            status: 'STANDBY',
            description: t('arch.automation.desc'),
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            color: '#ff8844',
            layer: 3,
        },
        {
            id: 'growth',
            title: t('arch.growth.title'),
            subtitle: t('arch.growth.subtitle'),
            status: 'STANDBY',
            description: t('arch.growth.desc'),
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
            ),
            color: '#44ffaa',
            layer: 4,
        },
    ];

    return (
        <section id="architecture" className="py-16 sm:py-20 md:py-24 lg:py-32 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 grid-bg-deep opacity-30"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/50 to-transparent"></div>

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
                        {t('arch.badge')}
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">
                        <span className="text-[#ededed]">{t('arch.title.part1')}</span>{' '}
                        <span className="text-[#c8ff00]">{t('arch.title.part2')}</span>
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-[#888888] max-w-2xl mx-auto px-4 sm:px-0">
                        {t('arch.subtitle')}
                    </p>
                </motion.div>

                {/* Node-Based System Map */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                >
                    {/* Connection Lines - SVG overlay */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden lg:block" style={{ minHeight: '400px' }}>
                        <defs>
                            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#c8ff00" stopOpacity="0.3" />
                                <stop offset="50%" stopColor="#c8ff00" stopOpacity="0.1" />
                                <stop offset="100%" stopColor="#c8ff00" stopOpacity="0.3" />
                            </linearGradient>
                        </defs>
                        {/* Animated connection lines */}
                        <motion.path
                            d="M 200 100 Q 350 50 500 100"
                            stroke="url(#lineGradient)"
                            strokeWidth="1"
                            fill="none"
                            strokeDasharray="5,5"
                            initial={{ pathLength: 0 }}
                            animate={isInView ? { pathLength: 1 } : {}}
                            transition={{ duration: 2, delay: 0.5 }}
                        />
                    </svg>

                    {/* Node Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 relative z-10">
                        {systemNodes.map((node, index) => (
                            <motion.div
                                key={node.id}
                                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                                transition={{ duration: 0.6, delay: 0.1 * index }}
                                onMouseEnter={() => setHoveredNode(node.id)}
                                onMouseLeave={() => setHoveredNode(null)}
                                onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
                                className="relative group cursor-pointer"
                            >
                                {/* Connection dots */}
                                <div className="absolute -left-3 top-1/2 w-2 h-2 rounded-full bg-[#333333] hidden lg:block lg:first:hidden" />
                                <div className="absolute -right-3 top-1/2 w-2 h-2 rounded-full bg-[#333333] hidden lg:block lg:last:hidden" />

                                <div
                                    className={`relative p-4 sm:p-5 md:p-6 bg-[#0f0f0f] border rounded-xl transition-all duration-500 ${hoveredNode === node.id || activeNode === node.id
                                        ? 'border-opacity-60 transform -translate-y-2'
                                        : 'border-[#1a1a1a]'
                                        }`}
                                    style={{
                                        borderColor: hoveredNode === node.id || activeNode === node.id ? node.color : '#1a1a1a',
                                        boxShadow: hoveredNode === node.id || activeNode === node.id
                                            ? `0 20px 60px ${node.color}20, 0 0 40px ${node.color}10`
                                            : 'none',
                                    }}
                                >
                                    {/* Status Indicator */}
                                    <div className="absolute top-4 right-4 flex items-center gap-2">
                                        <motion.span
                                            animate={{
                                                scale: node.status === 'ACTIVE' ? [1, 1.2, 1] : 1,
                                                opacity: node.status === 'ACTIVE' ? [1, 0.7, 1] : 0.5,
                                            }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className={`w-2 h-2 rounded-full ${node.status === 'ACTIVE' ? 'bg-[#44ff88]' : 'bg-[#555555]'
                                                }`}
                                            style={{
                                                boxShadow: node.status === 'ACTIVE' ? '0 0 10px #44ff88' : 'none',
                                            }}
                                        />
                                        <span className={`font-mono text-[10px] ${node.status === 'ACTIVE' ? 'text-[#44ff88]' : 'text-[#555555]'
                                            }`}>
                                            {node.status}
                                        </span>
                                    </div>

                                    {/* Layer Number */}
                                    <div className="absolute top-4 left-4 font-mono text-xs text-[#333333]">
                                        L{node.layer}
                                    </div>

                                    {/* Icon */}
                                    <div
                                        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-3 sm:mb-4 mt-4 sm:mt-6 transition-all duration-300`}
                                        style={{
                                            backgroundColor: hoveredNode === node.id ? node.color : `${node.color}15`,
                                            color: hoveredNode === node.id ? '#0a0a0a' : node.color,
                                        }}
                                    >
                                        {node.icon}
                                    </div>

                                    {/* Title & Subtitle */}
                                    <h3 className="text-lg sm:text-xl font-semibold text-[#ededed] mb-1">{node.title}</h3>
                                    <p className="text-xs sm:text-sm text-[#555555] font-mono mb-3 sm:mb-4">{node.subtitle}</p>

                                    {/* Expandable Description */}
                                    <motion.div
                                        initial={false}
                                        animate={{
                                            height: hoveredNode === node.id || activeNode === node.id ? 'auto' : 0,
                                            opacity: hoveredNode === node.id || activeNode === node.id ? 1 : 0,
                                        }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="text-xs sm:text-sm text-[#888888] leading-relaxed pt-3 sm:pt-4 border-t border-[#1a1a1a]">
                                            {node.description}
                                        </p>
                                    </motion.div>

                                    {/* Expand Indicator */}
                                    <div className="mt-4 flex items-center gap-2">
                                        <motion.div
                                            animate={{
                                                rotate: hoveredNode === node.id || activeNode === node.id ? 90 : 0,
                                            }}
                                            className="text-[#555555]"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </motion.div>
                                        <span className="font-mono text-xs text-[#555555]">
                                            {hoveredNode === node.id || activeNode === node.id ? t('arch.detail') : t('arch.expand')}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Bottom Legend */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-[#1a1a1a]"
                >
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#44ff88] shadow-[0_0_10px_#44ff88]"></span>
                        <span className="font-mono text-xs text-[#888888]">ACTIVE</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#555555]"></span>
                        <span className="font-mono text-xs text-[#888888]">STANDBY</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-[#111111] rounded-lg border border-[#1a1a1a]">
                        <span className="font-mono text-xs text-[#555555]">{t('arch.totalLayers')}</span>
                        <span className="font-mono text-xs text-[#c8ff00]">4</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-[#111111] rounded-lg border border-[#1a1a1a]">
                        <span className="font-mono text-xs text-[#555555]">{t('arch.activeLayers')}</span>
                        <span className="font-mono text-xs text-[#44ff88]">2</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
