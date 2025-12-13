'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBoot } from '@/contexts/BootContext';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const { t } = useLanguage();
  const { startBoot, isBooting } = useBoot();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
          }`}
      >
        <div className="container-system">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
            {/* Logo & Version */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 relative">
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path d="M8 8H14V14H8V8Z" fill="#c8ff00" />
                  <path d="M18 8H24V14H18V8Z" fill="#c8ff00" />
                  <path d="M8 18H14V24H8V18Z" fill="#c8ff00" />
                  <path d="M18 18H24V24H18V18Z" fill="#c8ff00" opacity="0.5" />
                </svg>
              </div>
              <span className="font-bold text-base sm:text-lg tracking-tight">KÖK-OS</span>
              <span className="hidden xs:inline text-[10px] sm:text-xs font-mono text-[#c8ff00] px-1.5 sm:px-2 py-0.5 bg-[#c8ff00]/10 rounded border border-[#c8ff00]/20">v2.5.1</span>
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden lg:flex items-center gap-8">
              <a href="#modules" className="text-sm text-[#888888] hover:text-white transition-colors">{t('header.nav.modules')}</a>
              <a href="#architecture" className="text-sm text-[#888888] hover:text-white transition-colors">{t('header.nav.architecture')}</a>
              <a href="#process" className="text-sm text-[#888888] hover:text-white transition-colors">{t('header.nav.process')}</a>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Language Switcher - Always visible */}
              <LanguageSwitcher />

              {/* Login - Desktop only */}
              <span className="text-sm text-[#888888] hidden md:inline cursor-pointer hover:text-white transition-colors">{t('header.login')}</span>
              
              {/* Boot Button - Hidden on small mobile, shown on sm+ */}
              <motion.button
                onClick={startBoot}
                disabled={isBooting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`hidden sm:flex relative overflow-hidden group px-3 sm:px-5 py-2 sm:py-2.5 font-semibold text-xs sm:text-sm rounded-lg transition-all duration-300 ${isBooting
                  ? 'bg-[#c8ff00]/20 text-[#c8ff00] border border-[#c8ff00]/40'
                  : 'bg-[#c8ff00] text-[#0a0a0a] hover:shadow-[0_0_30px_rgba(200,255,0,0.4)]'
                  }`}
              >
                {/* Hover tooltip - Desktop only */}
                <span className="hidden lg:block absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#1a1a1a] text-[#c8ff00] text-[10px] font-mono rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-[#c8ff00]/20">
                  {t('header.bootTooltip')}
                </span>

                {/* Loading bar animation */}
                {isBooting && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2.5 }}
                    className="absolute bottom-0 left-0 h-0.5 bg-[#c8ff00]"
                  />
                )}

                <span className="relative z-10 flex items-center gap-2">
                  {isBooting ? (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-[#c8ff00] border-t-transparent rounded-full"
                    />
                  ) : (
                    <span className="text-sm sm:text-lg">⚡</span>
                  )}
                  <span className="hidden sm:inline">
                    {isBooting ? 'Başlatılıyor...' : t('header.bootButton')}
                  </span>
                </span>
              </motion.button>

              {/* Hamburger Menu Button - Mobile only */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg bg-[#111111] border border-[#1a1a1a] hover:border-[#c8ff00]/30 transition-colors"
                aria-label="Toggle menu"
              >
                <motion.span
                  animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="w-5 h-0.5 bg-[#ededed] rounded-full mb-1.5"
                />
                <motion.span
                  animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-5 h-0.5 bg-[#ededed] rounded-full mb-1.5"
                />
                <motion.span
                  animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="w-5 h-0.5 bg-[#ededed] rounded-full"
                />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] lg:hidden"
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-full max-w-[320px] h-full bg-[#0d0d0d] border-l border-[#1a1a1a] z-[70] lg:hidden"
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between px-6 h-14 sm:h-16 border-b border-[#1a1a1a]">
                <span className="font-mono text-sm text-[#c8ff00]">// MENU</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center text-[#888888] hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Menu Content */}
              <div className="px-6 py-8">
                {/* Navigation Links */}
                <nav className="space-y-2 mb-8">
                  <a
                    href="#modules"
                    onClick={handleNavClick}
                    className="flex items-center gap-4 px-4 py-3 text-[#ededed] hover:text-[#c8ff00] bg-[#111111] hover:bg-[#1a1a1a] rounded-lg transition-all"
                  >
                    <span className="font-mono text-xs text-[#555555]">01</span>
                    <span>{t('header.nav.modules')}</span>
                  </a>
                  <a
                    href="#architecture"
                    onClick={handleNavClick}
                    className="flex items-center gap-4 px-4 py-3 text-[#ededed] hover:text-[#c8ff00] bg-[#111111] hover:bg-[#1a1a1a] rounded-lg transition-all"
                  >
                    <span className="font-mono text-xs text-[#555555]">02</span>
                    <span>{t('header.nav.architecture')}</span>
                  </a>
                  <a
                    href="#process"
                    onClick={handleNavClick}
                    className="flex items-center gap-4 px-4 py-3 text-[#ededed] hover:text-[#c8ff00] bg-[#111111] hover:bg-[#1a1a1a] rounded-lg transition-all"
                  >
                    <span className="font-mono text-xs text-[#555555]">03</span>
                    <span>{t('header.nav.process')}</span>
                  </a>
                </nav>

                {/* Boot Button - Mobile */}
                <button
                  onClick={() => {
                    startBoot();
                    setMobileMenuOpen(false);
                  }}
                  disabled={isBooting}
                  className="w-full py-4 bg-[#c8ff00] text-[#0a0a0a] font-semibold rounded-lg mb-4 flex items-center justify-center gap-2"
                >
                  {isBooting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-[#0a0a0a] border-t-transparent rounded-full animate-spin" />
                      <span>Başlatılıyor...</span>
                    </>
                  ) : (
                    <>
                      <span>⚡</span>
                      <span>{t('header.bootButton')}</span>
                    </>
                  )}
                </button>

                {/* Login Link */}
                <button className="w-full py-3 text-[#888888] hover:text-white border border-[#1a1a1a] hover:border-[#333333] rounded-lg transition-all">
                  {t('header.login')}
                </button>

                {/* Status Indicator */}
                <div className="mt-8 pt-6 border-t border-[#1a1a1a]">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#555555]">
                    <span className="w-2 h-2 rounded-full bg-[#44ff88] animate-pulse" />
                    <span>ALL_SYSTEMS_NOMINAL</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
