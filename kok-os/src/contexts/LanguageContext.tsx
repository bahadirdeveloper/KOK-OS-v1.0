'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'tr' | 'en';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation keys
const translations = {
    tr: {
        // Header
        'header.login': 'Login',
        'header.bootButton': 'Sistemi Başlat',
        'header.bootTooltip': 'Boot Sequence Ready',
        'header.initializing': 'Başlatılıyor...',
        'header.loadingCore': 'Çekirdek yükleniyor...',
        'header.systemReady': 'Sistem hazır',
        'header.nav.modules': 'Modüller',
        'header.nav.architecture': 'Mimari',
        'header.nav.process': 'Süreç',

        // Hero Section
        'hero.badge': 'SYSTEM_ONLINE',
        'hero.title.part1': 'Bu bir web sitesi ',
        'hero.title.part2': 'değil.',
        'hero.subtitle.part1': 'Bu, işletmenizin',
        'hero.subtitle.part2': 'dijital işletim sistemi.',
        'hero.description': 'Markanızı dijitalde doğurur, süreçlere bağlar, otomatikleştirir ve ölçekler.',
        'hero.terminal.line1': 'İşletme çekirdeği başlatılıyor…',
        'hero.terminal.line2': 'Marka kimliği yükleniyor…',
        'hero.terminal.line3': 'Otomasyon modülleri bağlanıyor…',
        'hero.terminal.line4': 'Sistem hazır.',
        'hero.cta.primary': 'Sistemi Başlat',
        'hero.cta.primarySub': 'İşletmeni KÖK\'ten başlat',
        'hero.cta.secondary': 'Nasıl Çalışır?',
        'hero.statusBar.cpu': 'CPU',
        'hero.statusBar.memory': 'MEM',
        'hero.statusBar.network': 'NET',
        'hero.statusBar.activeLayer': 'ACTIVE LAYER',

        // Modal
        'modal.howItWorks.badge': 'SYSTEM_OVERVIEW',
        'modal.howItWorks.title': 'KÖK-OS Nasıl Çalışır?',
        'modal.howItWorks.step1.title': 'Çekirdek Kurulumu',
        'modal.howItWorks.step1.desc': 'İşletmenizin dijital DNA\'sını oluşturuyoruz. Marka kimliği, domain ve temel altyapı.',
        'modal.howItWorks.step2.title': 'Katman Aktivasyonu',
        'modal.howItWorks.step2.desc': 'Web, otomasyon ve içerik katmanlarını ihtiyacınıza göre aktive ediyoruz.',
        'modal.howItWorks.step3.title': 'Sürekli Operasyon',
        'modal.howItWorks.step3.desc': 'Sistem 7/24 çalışır, otomasyon süreçleri işler, büyüme devam eder.',
        'modal.howItWorks.cta': 'Anladım, Başlayalım',

        // System Status
        'system.layerActive': 'Yerel Sistem Katmanı Aktif',
        'system.layerNotification': 'Dil Katmanı Değiştirildi',

        // Module Cards
        'module.identity': 'Kimlik',
        'module.infrastructure': 'Altyapı',
        'module.automation': 'Otomasyon',
        'module.content': 'İçerik & Büyüme',
        'module.status.active': 'AKTİF',
        'module.status.standby': 'BEKLEMEDE',

        // System Bar
        'systemBar.layer': 'AKTİF KATMAN',
        'systemBar.core': 'ÇEKİRDEK',
        'systemBar.network': 'AĞ',
        'systemBar.connected': 'BAĞLI',
        'systemBar.memory': 'BELLEK',
        'systemBar.process': 'İŞLEM',

        // Architecture Section
        'arch.badge': 'SYSTEM_ARCHITECTURE',
        'arch.title.part1': 'Sistem',
        'arch.title.part2': 'Mimarisi',
        'arch.subtitle': 'Dört ana katman. Her biri bağımsız çalışır, birlikte güçlenir.',
        'arch.identity.title': 'Kimlik',
        'arch.identity.subtitle': 'Marka / Domain / Görsel Dil',
        'arch.identity.desc': 'İşletmenizin dijital DNA\'sı. Logo, renk paleti, tipografi ve marka sesi.',
        'arch.infrastructure.title': 'Altyapı',
        'arch.infrastructure.subtitle': 'Web / Hosting / Güvenlik',
        'arch.infrastructure.desc': 'Performanslı web sistemleri, güvenli barındırma ve SSL sertifikaları.',
        'arch.automation.title': 'Otomasyon',
        'arch.automation.subtitle': 'Formlar / CRM / Botlar',
        'arch.automation.desc': 'İş süreçlerini otomatikleştiren workflow\'lar, chatbotlar ve entegrasyonlar.',
        'arch.growth.title': 'İçerik & Büyüme',
        'arch.growth.subtitle': 'SEO / Sosyal / Reklam',
        'arch.growth.desc': 'Arama motoru optimizasyonu, sosyal medya yönetimi ve performans reklamları.',
        'arch.expand': 'Genişlet',
        'arch.detail': 'Detay',
        'arch.totalLayers': 'Toplam Katman:',
        'arch.activeLayers': 'Aktif:',

        // Target Modules
        'targets.badge': 'TARGET_SECTORS',
        'targets.title.part1': 'Kimler İçin',
        'targets.title.part2': 'Tasarlandı?',
        'targets.subtitle': 'Her sektör için özelleştirilmiş sistem modülleri. Tek çekirdek, farklı çıktılar.',
        'targets.local.title': 'Yerel İşletmeler',
        'targets.local.desc': 'Restoranlar, klinikler, perakende mağazalar için dijital sistem altyapısı.',
        'targets.agriculture.title': 'Tarım & Üretim',
        'targets.agriculture.desc': 'Çiftlikler, üretim tesisleri, kooperatifler için entegre veri sistemleri.',
        'targets.education.title': 'Eğitim & Akademi',
        'targets.education.desc': 'Okullar, kurslar, e-öğrenme platformları için öğrenme yönetim sistemleri.',
        'targets.startup.title': 'Girişimler (Startup)',
        'targets.startup.desc': 'Ölçeklenebilir MVP\'ler, hızlı iterasyon ve çevik sistem mimarisi.',
        'targets.moduleActive': 'MODULE ACTIVE',

        // Operation Pipeline
        'pipeline.badge': 'OPERATION_PIPELINE',
        'pipeline.title.part1': 'Nasıl',
        'pipeline.title.part2': 'Çalışıyoruz?',
        'pipeline.subtitle': 'Toplantı bağımlısı değiliz. Asenkron, verimli ve sonuç odaklı.',
        'pipeline.step1.title': 'Form & Başvuru',
        'pipeline.step1.desc': 'Hızlı dijital form ile ihtiyaçlarınızı anlıyoruz.',
        'pipeline.step2.title': 'Analiz & Strateji',
        'pipeline.step2.desc': 'Asenkron analiz. Toplantı bağımlısı değiliz.',
        'pipeline.step3.title': 'Sistem Kurulumu',
        'pipeline.step3.desc': 'Çekirdek mimari ve modüllerin entegrasyonu.',
        'pipeline.step4.title': 'Otomasyon Entegrasyonu',
        'pipeline.step4.desc': 'AI ve otomasyon katmanlarının aktivasyonu.',
        'pipeline.step5.title': 'Büyüme & Destek',
        'pipeline.step5.desc': 'Sürekli optimizasyon ve sistem bakımı.',
        'pipeline.noMeeting': 'NO_MEETING_DEPENDENCY',
        'pipeline.async': 'Asenkron & Verimli',

        // CTA Section
        'cta.terminalCommand': 'kok-os --init --project your-business',
        'cta.title.part1': 'Sisteminizi',
        'cta.title.part2': 'başlatmaya',
        'cta.title.part3': 'hazır mısınız?',
        'cta.desc.line1': 'İşletmeniz için dijital bir işletim sistemi inşa edelim.',
        'cta.desc.line2': 'Süreç başlatın, 24 saat içinde dönüş yapalım.',
        'cta.primary': 'Sistemi Başlat',
        'cta.secondary': 'Soru Sor',
        'cta.trust1': 'Ücretsiz Başvuru',
        'cta.trust2': '24 Saat Dönüş',
        'cta.trust3': 'Toplantısız Süreç',

        // Modular System
        'modular.badge': 'MODULAR_SYSTEM',
        'modular.title.part1': 'Modüler',
        'modular.title.part2': 'Yapı',
        'modular.subtitle': 'Dört ana sistem modülü. İhtiyacınıza göre aktive edin veya genişletin.',
        'modular.dna.title': 'Dijital Kimlik (DNA)',
        'modular.dna.desc': 'Marka stratejisi, görsel kimlik, ses tonu ve dijital varlık tasarımı.',
        'modular.dna.feature1': 'Logo & Görsel Sistem',
        'modular.dna.feature2': 'Marka Stratejisi',
        'modular.dna.feature3': 'Dijital Varlık Seti',
        'modular.web.title': 'Web & Altyapı',
        'modular.web.desc': 'Performanslı, SEO uyumlu ve ölçeklenebilir web sistemleri.',
        'modular.web.feature1': 'Next.js / React',
        'modular.web.feature2': 'Headless CMS',
        'modular.web.feature3': 'Performans Optimizasyonu',
        'modular.automation.title': 'Otomasyon & AI',
        'modular.automation.desc': 'İş süreçlerini otomatikleştiren yapay zeka entegrasyonları.',
        'modular.automation.feature1': 'Chatbot & Asistanlar',
        'modular.automation.feature2': 'Workflow Otomasyonu',
        'modular.automation.feature3': 'AI İçerik Üretimi',
        'modular.design.title': 'Sistem Tasarımı',
        'modular.design.desc': 'UI/UX tasarım, prototipleme ve kullanıcı deneyimi optimizasyonu.',
        'modular.design.feature1': 'UI/UX Tasarım',
        'modular.design.feature2': 'Prototipleme',
        'modular.design.feature3': 'Kullanılabilirlik Testi',
        'modular.active': 'MODULE ACTIVE',
        'modular.standby': 'STANDBY',
    },
    en: {
        // Header
        'header.login': 'Login',
        'header.bootButton': 'Start the System',
        'header.bootTooltip': 'Boot Sequence Ready',
        'header.initializing': 'Initializing...',
        'header.loadingCore': 'Loading core...',
        'header.systemReady': 'System ready',
        'header.nav.modules': 'Modules',
        'header.nav.architecture': 'Architecture',
        'header.nav.process': 'Process',

        // Hero Section
        'hero.badge': 'SYSTEM_ONLINE',
        'hero.title.part1': 'This is not a website',
        'hero.title.part2': '',
        'hero.subtitle.part1': 'This is your business',
        'hero.subtitle.part2': 'operating system.',
        'hero.description': 'It births your brand digitally, connects processes, automates and scales.',
        'hero.terminal.line1': 'Initializing business core…',
        'hero.terminal.line2': 'Loading brand identity layer…',
        'hero.terminal.line3': 'Connecting automation modules…',
        'hero.terminal.line4': 'System ready.',
        'hero.cta.primary': 'Start the System',
        'hero.cta.primarySub': 'Launch your business from ROOT',
        'hero.cta.secondary': 'How It Works',
        'hero.statusBar.cpu': 'CPU',
        'hero.statusBar.memory': 'MEM',
        'hero.statusBar.network': 'NET',
        'hero.statusBar.activeLayer': 'ACTIVE LAYER',

        // Modal
        'modal.howItWorks.badge': 'SYSTEM_OVERVIEW',
        'modal.howItWorks.title': 'How KÖK-OS Works?',
        'modal.howItWorks.step1.title': 'Core Setup',
        'modal.howItWorks.step1.desc': 'We create your business digital DNA. Brand identity, domain and core infrastructure.',
        'modal.howItWorks.step2.title': 'Layer Activation',
        'modal.howItWorks.step2.desc': 'We activate web, automation and content layers based on your needs.',
        'modal.howItWorks.step3.title': 'Continuous Operation',
        'modal.howItWorks.step3.desc': 'System runs 24/7, processes automation workflows, growth continues.',
        'modal.howItWorks.cta': 'Got it, Let\'s Start',

        // System Status
        'system.layerActive': 'Global System Layer Active',
        'system.layerNotification': 'Language Layer Changed',

        // Module Cards
        'module.identity': 'Identity',
        'module.infrastructure': 'Infrastructure',
        'module.automation': 'Automation',
        'module.content': 'Content & Growth',
        'module.status.active': 'ACTIVE',
        'module.status.standby': 'STANDBY',

        // System Bar
        'systemBar.layer': 'ACTIVE LAYER',
        'systemBar.core': 'CORE',
        'systemBar.network': 'NETWORK',
        'systemBar.connected': 'CONNECTED',
        'systemBar.memory': 'MEMORY',
        'systemBar.process': 'CPU',

        // Architecture Section
        'arch.badge': 'SYSTEM_ARCHITECTURE',
        'arch.title.part1': 'System',
        'arch.title.part2': 'Architecture',
        'arch.subtitle': 'Four main layers. Each works independently, together they empower.',
        'arch.identity.title': 'Identity',
        'arch.identity.subtitle': 'Brand / Domain / Visual Language',
        'arch.identity.desc': 'Your business digital DNA. Logo, color palette, typography and brand voice.',
        'arch.infrastructure.title': 'Infrastructure',
        'arch.infrastructure.subtitle': 'Web / Hosting / Security',
        'arch.infrastructure.desc': 'High-performance web systems, secure hosting and SSL certificates.',
        'arch.automation.title': 'Automation',
        'arch.automation.subtitle': 'Forms / CRM / Bots',
        'arch.automation.desc': 'Workflows that automate business processes, chatbots and integrations.',
        'arch.growth.title': 'Content & Growth',
        'arch.growth.subtitle': 'SEO / Social / Ads',
        'arch.growth.desc': 'Search engine optimization, social media management and performance advertising.',
        'arch.expand': 'Expand',
        'arch.detail': 'Detail',
        'arch.totalLayers': 'Total Layers:',
        'arch.activeLayers': 'Active:',

        // Target Modules
        'targets.badge': 'TARGET_SECTORS',
        'targets.title.part1': 'Who Is It',
        'targets.title.part2': 'Designed For?',
        'targets.subtitle': 'Customized system modules for every sector. One core, different outputs.',
        'targets.local.title': 'Local Businesses',
        'targets.local.desc': 'Digital system infrastructure for restaurants, clinics, retail stores.',
        'targets.agriculture.title': 'Agriculture & Production',
        'targets.agriculture.desc': 'Integrated data systems for farms, production facilities, cooperatives.',
        'targets.education.title': 'Education & Academy',
        'targets.education.desc': 'Learning management systems for schools, courses, e-learning platforms.',
        'targets.startup.title': 'Startups',
        'targets.startup.desc': 'Scalable MVPs, rapid iteration and agile system architecture.',
        'targets.moduleActive': 'MODULE ACTIVE',

        // Operation Pipeline
        'pipeline.badge': 'OPERATION_PIPELINE',
        'pipeline.title.part1': 'How We',
        'pipeline.title.part2': 'Work?',
        'pipeline.subtitle': 'No meeting dependency. Async, efficient and result-oriented.',
        'pipeline.step1.title': 'Form & Application',
        'pipeline.step1.desc': 'Understanding your needs through quick digital form.',
        'pipeline.step2.title': 'Analysis & Strategy',
        'pipeline.step2.desc': 'Async analysis. No meeting dependency.',
        'pipeline.step3.title': 'System Setup',
        'pipeline.step3.desc': 'Core architecture and module integration.',
        'pipeline.step4.title': 'Automation Integration',
        'pipeline.step4.desc': 'Activation of AI and automation layers.',
        'pipeline.step5.title': 'Growth & Support',
        'pipeline.step5.desc': 'Continuous optimization and system maintenance.',
        'pipeline.noMeeting': 'NO_MEETING_DEPENDENCY',
        'pipeline.async': 'Async & Efficient',

        // CTA Section
        'cta.terminalCommand': 'kok-os --init --project your-business',
        'cta.title.part1': 'Ready to',
        'cta.title.part2': 'start',
        'cta.title.part3': 'your system?',
        'cta.desc.line1': 'Let\'s build a digital operating system for your business.',
        'cta.desc.line2': 'Start the process, we\'ll respond within 24 hours.',
        'cta.primary': 'Start the System',
        'cta.secondary': 'Ask a Question',
        'cta.trust1': 'Free Application',
        'cta.trust2': '24h Response',
        'cta.trust3': 'No Meeting Process',

        // Modular System
        'modular.badge': 'MODULAR_SYSTEM',
        'modular.title.part1': 'Modular',
        'modular.title.part2': 'Structure',
        'modular.subtitle': 'Four main system modules. Activate or expand based on your needs.',
        'modular.dna.title': 'Digital Identity (DNA)',
        'modular.dna.desc': 'Brand strategy, visual identity, tone of voice and digital asset design.',
        'modular.dna.feature1': 'Logo & Visual System',
        'modular.dna.feature2': 'Brand Strategy',
        'modular.dna.feature3': 'Digital Asset Set',
        'modular.web.title': 'Web & Infrastructure',
        'modular.web.desc': 'High-performance, SEO-friendly and scalable web systems.',
        'modular.web.feature1': 'Next.js / React',
        'modular.web.feature2': 'Headless CMS',
        'modular.web.feature3': 'Performance Optimization',
        'modular.automation.title': 'Automation & AI',
        'modular.automation.desc': 'Artificial intelligence integrations that automate business processes.',
        'modular.automation.feature1': 'Chatbots & Assistants',
        'modular.automation.feature2': 'Workflow Automation',
        'modular.automation.feature3': 'AI Content Generation',
        'modular.design.title': 'System Design',
        'modular.design.desc': 'UI/UX design, prototyping and user experience optimization.',
        'modular.design.feature1': 'UI/UX Design',
        'modular.design.feature2': 'Prototyping',
        'modular.design.feature3': 'Usability Testing',
        'modular.active': 'MODULE ACTIVE',
        'modular.standby': 'STANDBY',
    },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>('tr');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        // Load saved language preference
        const savedLang = localStorage.getItem('kok-os-language') as Language;
        if (savedLang && (savedLang === 'tr' || savedLang === 'en')) {
            setLanguageState(savedLang);
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        if (isClient) {
            localStorage.setItem('kok-os-language', lang);
        }
    };

    const t = (key: string): string => {
        return translations[language][key as keyof typeof translations.tr] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
