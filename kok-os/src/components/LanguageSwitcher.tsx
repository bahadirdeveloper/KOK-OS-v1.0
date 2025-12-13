'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { useState } from 'react';

export default function LanguageSwitcher() {
    const { language, setLanguage, t } = useLanguage();
    const [showNotification, setShowNotification] = useState(false);

    const handleLanguageChange = (lang: Language) => {
        if (lang === language) return;

        setLanguage(lang);
        setShowNotification(true);

        // Hide notification after 2 seconds
        setTimeout(() => {
            setShowNotification(false);
        }, 2000);
    };

    return (
        <>
            {/* Language Switcher */}
            <div className="relative flex items-center gap-1 px-3 py-1.5 bg-[#111111] rounded-md border border-[#1a1a1a]">
                <motion.button
                    onClick={() => handleLanguageChange('tr')}
                    className={`relative px-2.5 py-1 text-xs font-mono transition-all duration-300 rounded ${language === 'tr'
                            ? 'text-[#c8ff00] font-bold'
                            : 'text-[#555555] hover:text-[#888888]'
                        }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    TR
                    {language === 'tr' && (
                        <motion.div
                            layoutId="languageIndicator"
                            className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-[#c8ff00]"
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                    )}
                </motion.button>

                <span className="text-[#333333] text-xs">|</span>

                <motion.button
                    onClick={() => handleLanguageChange('en')}
                    className={`relative px-2.5 py-1 text-xs font-mono transition-all duration-300 rounded ${language === 'en'
                            ? 'text-[#c8ff00] font-bold'
                            : 'text-[#555555] hover:text-[#888888]'
                        }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    EN
                    {language === 'en' && (
                        <motion.div
                            layoutId="languageIndicator"
                            className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-[#c8ff00]"
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                    )}
                </motion.button>
            </div>

            {/* Language Change Notification */}
            <AnimatePresence>
                {showNotification && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.9 }}
                        className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 bg-[#111111] border border-[#c8ff00]/30 rounded-lg shadow-[0_0_30px_rgba(200,255,0,0.2)]"
                    >
                        <div className="flex items-center gap-3">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                className="w-4 h-4 border-2 border-[#c8ff00] border-t-transparent rounded-full"
                            />
                            <div>
                                <p className="text-sm font-mono text-[#c8ff00] font-bold">
                                    {t('system.layerNotification')}: {language.toUpperCase()}
                                </p>
                                <p className="text-xs text-[#888888] mt-0.5">
                                    {t('system.layerActive')}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
