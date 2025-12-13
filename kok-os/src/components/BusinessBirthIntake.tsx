'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBoot } from '@/contexts/BootContext';

// Type definitions
interface FollowUpQuestion {
    id: string;
    label: string;
    type: string;
    options?: string[];
    placeholder?: string;
}

interface ConditionalConfig {
    value: string;
    followUp: FollowUpQuestion[];
}

interface Question {
    id: string;
    group: number;
    label: string;
    type: 'text' | 'textarea' | 'select' | 'multi-select';
    placeholder?: string;
    options?: string[];
    required: boolean;
    skip?: boolean;
    log: string;
    conditional?: ConditionalConfig;
}

// Question Groups
const QUESTION_GROUPS = [
    { id: 'identity', label: 'KİMLİK & HEDEF', icon: '🎯', range: [0, 5] },
    { id: 'communication', label: 'İLETİŞİM & KANALLAR', icon: '📡', range: [6, 11] },
    { id: 'product', label: 'TEKLİF & FİYATLAMA', icon: '💰', range: [12, 17] },
    { id: 'brand', label: 'MARKA & İÇERİK', icon: '🎨', range: [18, 23] },
    { id: 'operation', label: 'OPERASYON & SÜREÇ', icon: '⚙️', range: [24, 29] },
    { id: 'setup', label: 'KURULUM & YETKİLER', icon: '🔐', range: [30, 35] },
];

// All 36 Questions
const QUESTIONS: Question[] = [
    // A) KİMLİK & HEDEF (0-5)
    { id: 'businessName', group: 0, label: 'İşletme adı (resmi) / marka adı (varsa)', type: 'text', placeholder: 'Örn: Acme A.Ş. / Acme', required: true, log: 'İşletme kimliği kaydedildi' },
    { id: 'sector', group: 0, label: 'Sektör + alt sektör', type: 'text', placeholder: 'Örn: Yeme-İçme > Kafe', required: true, log: 'Sektör tanımlandı' },
    { id: 'branches', group: 0, label: 'Şube sayısı / hizmet bölgesi (il/ilçe)', type: 'text', placeholder: 'Örn: 2 şube - İstanbul/Kadıköy, Beşiktaş', required: true, log: 'Hizmet bölgesi eşlendi' },
    { id: 'goal', group: 0, label: 'KÖK-OS ile ilk 30 günde ne çözmek istiyorsun?', type: 'multi-select', options: ['Daha fazla satış', 'Müşteri iletişimi', 'Operasyon düzeni', 'Görünürlük', 'Raporlama'], required: true, log: 'Hedefler belirlendi' },
    { id: 'digitalMaturity', group: 0, label: 'Mevcut dijital olgunluk seviyesi', type: 'select', options: ['Yok', 'Temel', 'Orta', 'İleri'], required: true, log: 'Dijital olgunluk seviyesi kaydedildi' },
    { id: 'contactPerson', group: 0, label: 'Onaylı iletişim kişisi (ad-soyad, rol)', type: 'text', placeholder: 'Örn: Ahmet Yılmaz, Operasyon Müdürü', required: true, log: 'İletişim kişisi tanımlandı' },

    // B) İLETİŞİM & KANALLAR (6-11)
    { id: 'phone', group: 1, label: 'Telefon numarası', type: 'text', placeholder: '+90 5XX XXX XX XX', required: true, log: 'Telefon kaydedildi' },
    { id: 'whatsappActive', group: 1, label: 'WhatsApp aktif mi?', type: 'select', options: ['Evet', 'Hayır'], required: true, log: 'WhatsApp durumu işaretlendi', conditional: { value: 'Evet', followUp: [{ id: 'whatsappBusiness', label: 'WhatsApp Business hesabı var mı?', type: 'select', options: ['Evet', 'Hayır'] }, { id: 'whatsappCatalog', label: 'WhatsApp katalog kullanılıyor mu?', type: 'select', options: ['Evet', 'Hayır'] }] } },
    { id: 'email', group: 1, label: 'E-posta adresi', type: 'text', placeholder: 'ornek@sirket.com', required: true, log: 'E-posta kaydedildi' },
    { id: 'emailCorporate', group: 1, label: 'E-posta kurumsal mı?', type: 'select', options: ['Evet', 'Hayır'], required: false, log: 'E-posta tipi belirlendi' },
    { id: 'instagram', group: 1, label: 'Instagram kullanıcı adı', type: 'text', placeholder: '@kullaniciadi veya "yok"', required: false, skip: true, log: 'Instagram bağlandı' },
    { id: 'googleBusiness', group: 1, label: 'Google Business Profile var mı?', type: 'text', placeholder: 'Link veya "yok"', required: false, skip: true, log: 'Google Business eşlendi', conditional: { value: 'link', followUp: [{ id: 'googleOwnerAccess', label: 'Profil erişimi (owner) sizde mi?', type: 'select', options: ['Evet', 'Hayır', 'Bilmiyorum'] }] } },

    // C) TEKLİF, ÜRÜN/HİZMET & FİYATLAMA (12-17)
    { id: 'website', group: 2, label: 'Mevcut web sitesi var mı?', type: 'text', placeholder: 'Domain + sağlayıcı veya "yok"', required: false, skip: true, log: 'Web sitesi durumu kaydedildi', conditional: { value: 'link', followUp: [{ id: 'hostingAccess', label: 'Hosting panel erişimi kimde?', type: 'select', options: ['Ben', 'Ajans', 'Bilmiyorum'] }, { id: 'cmsType', label: 'CMS tipi nedir?', type: 'text', placeholder: 'WordPress, Shopify, vb.' }] } },
    { id: 'leadSource', group: 2, label: 'Müşteri talepleri şu an nereden geliyor?', type: 'multi-select', options: ['WhatsApp', 'Arama', 'DM', 'Web', 'Fiziksel', 'Karışık'], required: true, log: 'Talep kaynakları eşlendi' },
    { id: 'products', group: 2, label: 'Sattığınız ana ürün/hizmet listesi (en fazla 10)', type: 'textarea', placeholder: 'Her satıra bir ürün/hizmet yazın', required: true, log: 'Ürün/hizmet listesi oluşturuldu' },
    { id: 'pricingType', group: 2, label: 'Her biri için: fiyat aralığı mı sabit fiyat mı?', type: 'select', options: ['Sabit fiyat', 'Fiyat aralığı', 'Karışık'], required: true, log: 'Fiyatlama modeli belirlendi' },
    { id: 'stockType', group: 2, label: 'Stok/kapasite durumu', type: 'select', options: ['Stoklu ürün', 'Randevulu hizmet', 'Üretim', 'Karışık'], required: true, log: 'Stok/kapasite tipi kaydedildi' },
    { id: 'orderFlow', group: 2, label: 'Sipariş/rezervasyon çalışma şekli', type: 'select', options: ['Aynı gün', '24 saat', 'Haftalık', 'Randevu'], required: true, log: 'Sipariş akışı tanımlandı' },

    // D) MARKA & İÇERİK (18-23)
    { id: 'deliveryArea', group: 3, label: 'Teslimat/servis alanı ve koşulları', type: 'textarea', placeholder: 'Teslimat bölgeleri, süreleri, koşulları...', required: false, skip: true, log: 'Teslimat koşulları kaydedildi' },
    { id: 'faq', group: 3, label: 'Sık sorulan 10 soru + standart cevaplar (varsa)', type: 'textarea', placeholder: 'S: Soru?\nC: Cevap\n\nS: Başka soru?\nC: Cevabı...', required: false, skip: true, log: 'SSS veritabanı oluşturuldu' },
    { id: 'logo', group: 3, label: 'Logo var mı?', type: 'text', placeholder: 'Dosya/link veya "yok"', required: false, skip: true, log: 'Logo durumu kaydedildi' },
    { id: 'brandColors', group: 3, label: 'Renkler / fontlar (biliyorsa)', type: 'text', placeholder: 'Örn: #c8ff00, Inter font', required: false, skip: true, log: 'Marka görsel kimliği kaydedildi' },
    { id: 'brandTone', group: 3, label: 'Marka dili', type: 'select', options: ['Resmi', 'Samimi', 'Premium', 'Genç'], required: true, log: 'Marka tonu belirlendi' },
    { id: 'competitors', group: 3, label: '3 rakip işletme (link veya isim)', type: 'textarea', placeholder: 'Her satıra bir rakip...', required: false, skip: true, log: 'Rakip analizi için veri alındı' },

    // E) OPERASYON & SÜREÇ (24-29)
    { id: 'inspirations', group: 4, label: '3 örnek beğendiğiniz web/instagram hesabı (link)', type: 'textarea', placeholder: 'Her satıra bir örnek...', required: false, skip: true, log: 'İlham kaynakları kaydedildi' },
    { id: 'contentOwner', group: 4, label: 'İçerik üretimi sorumlusu kim?', type: 'select', options: ['İç ekip', 'Dış ajans', 'Yok'], required: true, log: 'İçerik sorumluluğu tanımlandı' },
    { id: 'workingHours', group: 4, label: 'Günlük çalışma saatleri + yoğun saatler', type: 'text', placeholder: 'Örn: 09:00-18:00, yoğun: 12:00-14:00', required: true, log: 'Çalışma saatleri eşlendi' },
    { id: 'teamStructure', group: 4, label: 'Ekip yapısı: kaç kişi, roller', type: 'textarea', placeholder: 'Örn: 5 kişi - 2 satış, 2 operasyon, 1 yönetici', required: true, log: 'Ekip yapısı haritalandı' },
    { id: 'customerProcess', group: 4, label: 'Müşteri süreci şu an nasıl ilerliyor?', type: 'textarea', placeholder: 'Talep -> Teklif -> Ödeme -> Teslim -> Sonrası', required: true, log: 'Müşteri yolculuğu çıkarıldı' },
    { id: 'complaints', group: 4, label: 'Şikayet/iadeler süreci var mı?', type: 'textarea', placeholder: 'Süreç açıklaması veya "yok"', required: false, skip: true, log: 'Şikayet süreci kaydedildi' },

    // F) KURULUM & YETKİLER (30-35)
    { id: 'currentTools', group: 5, label: 'Kullanılan araçlar', type: 'multi-select', options: ['Excel', 'WhatsApp', 'POS', 'ERP', 'Muhasebe yazılımı', 'Yok'], required: true, log: 'Mevcut araçlar tarandı' },
    { id: 'reportingNeeds', group: 5, label: 'Raporlama ihtiyacı', type: 'select', options: ['Günlük satış', 'Haftalık', 'Aylık', 'Hiç'], required: true, log: 'Raporlama sıklığı belirlendi' },
    { id: 'domainAccess', group: 5, label: 'Domain/DNS erişimi kimde?', type: 'select', options: ['Ben', 'Ajans', 'Bilmiyorum'], required: true, log: 'Domain erişimi tanımlandı' },
    { id: 'metaAccess', group: 5, label: 'Meta Business / Instagram erişimi var mı?', type: 'select', options: ['Var', 'Yok', 'Bilmiyorum'], required: true, log: 'Meta erişimi kontrol edildi' },
    { id: 'googleAccess', group: 5, label: 'Google erişimi (Analytics, Search Console, Business Profile) var mı?', type: 'select', options: ['Var', 'Yok', 'Bilmiyorum'], required: true, log: 'Google erişimleri kontrol edildi' },
    { id: 'paymentNeeds', group: 5, label: 'Ödeme altyapısı isteniyor mu?', type: 'multi-select', options: ['Havale', 'Link ile ödeme', 'İyzico/Stripe', 'Kapıda ödeme', 'İstemiyorum'], required: true, log: 'Ödeme gereksinimleri belirlendi', conditional: { value: 'İyzico/Stripe', followUp: [{ id: 'paymentProvider', label: 'Tercih edilen ödeme sağlayıcı', type: 'text', placeholder: 'İyzico, Stripe, PayTR...' }, { id: 'invoiceNeeds', label: 'E-fatura entegrasyonu gerekli mi?', type: 'select', options: ['Evet', 'Hayır'] }] } },
];

// Additional questions after main 36
const FINAL_QUESTIONS: Question[] = [
    { id: 'kvkk', group: 5, label: 'KVKK / izin metinleri hazır mı?', type: 'select', options: ['Var', 'Yok', 'Bilmiyorum'], required: true, log: 'KVKK durumu kaydedildi' },
    { id: 'communicationPrefs', group: 5, label: 'Kurulum iletişim tercihleri', type: 'multi-select', options: ['WhatsApp grup', 'E-posta', 'Haftalık toplantı'], required: true, log: 'İletişim tercihleri belirlendi' },
];

const ALL_QUESTIONS: Question[] = [...QUESTIONS, ...FINAL_QUESTIONS];

interface TerminalLog {
    message: string;
    type: 'info' | 'success' | 'warning' | 'system';
    timestamp: string;
}

export default function BusinessBirthIntake() {
    const { setStep } = useBoot();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [conditionalAnswers, setConditionalAnswers] = useState<Record<string, any>>({});
    const [logs, setLogs] = useState<TerminalLog[]>([
        { message: 'İşletme doğum modülü başlatıldı', type: 'system', timestamp: getTimestamp() },
        { message: 'Çekirdek veri toplama aktif', type: 'info', timestamp: getTimestamp() }
    ]);
    const [showSummary, setShowSummary] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [multiSelectValues, setMultiSelectValues] = useState<string[]>([]);
    const [showConditional, setShowConditional] = useState(false);
    const [conditionalStep, setConditionalStep] = useState(0);
    const logRef = useRef<HTMLDivElement>(null);

    // Update URL
    useEffect(() => {
        window.history.pushState({}, '', '/birth/intake');
    }, []);

    // Auto-scroll logs
    useEffect(() => {
        logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' });
    }, [logs]);

    function getTimestamp() {
        return new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }

    const addLog = (message: string, type: TerminalLog['type'] = 'info') => {
        setLogs(prev => [...prev, { message, type, timestamp: getTimestamp() }]);
    };

    const question = ALL_QUESTIONS[currentQuestion];
    const currentGroup = QUESTION_GROUPS.find(g => currentQuestion >= g.range[0] && currentQuestion <= g.range[1]);
    const progress = ((currentQuestion + 1) / ALL_QUESTIONS.length) * 100;

    const handleAnswer = (value: any) => {
        const q = ALL_QUESTIONS[currentQuestion];
        setAnswers(prev => ({ ...prev, [q.id]: value }));
        addLog(q.log, 'success');

        // Check for conditional questions
        if (q.conditional && shouldShowConditional(q, value)) {
            setShowConditional(true);
            setConditionalStep(0);
            return;
        }

        moveToNext();
    };

    const shouldShowConditional = (q: typeof ALL_QUESTIONS[0], value: any) => {
        if (!q.conditional) return false;
        if (q.conditional.value === 'link') {
            return value && value !== 'yok' && value !== 'Hayır';
        }
        if (Array.isArray(value)) {
            return value.includes(q.conditional.value);
        }
        return value === q.conditional.value;
    };

    const handleConditionalAnswer = (value: any) => {
        const q = ALL_QUESTIONS[currentQuestion];
        const followUp = q.conditional?.followUp?.[conditionalStep];
        if (followUp) {
            setConditionalAnswers(prev => ({ ...prev, [followUp.id]: value }));
            addLog(`${followUp.label}: ${value}`, 'info');

            if (conditionalStep < (q.conditional?.followUp?.length || 0) - 1) {
                setConditionalStep(prev => prev + 1);
            } else {
                setShowConditional(false);
                moveToNext();
            }
        }
    };

    const moveToNext = () => {
        if (currentQuestion < ALL_QUESTIONS.length - 1) {
            setCurrentQuestion(prev => prev + 1);
            setInputValue('');
            setMultiSelectValues([]);
        } else {
            addLog('Tüm veriler başarıyla toplandı', 'success');
            addLog('Kurulum özeti hazırlanıyor...', 'system');
            setTimeout(() => setShowSummary(true), 500);
        }
    };

    const handleSkip = () => {
        const q = ALL_QUESTIONS[currentQuestion];
        setAnswers(prev => ({ ...prev, [q.id]: 'EKSİK' }));
        addLog(`${q.label}: Atlandı (Eksik)`, 'warning');
        moveToNext();
    };

    const handleBack = () => {
        if (showConditional) {
            if (conditionalStep > 0) {
                setConditionalStep(prev => prev - 1);
            } else {
                setShowConditional(false);
            }
        } else if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
            const prevQ = ALL_QUESTIONS[currentQuestion - 1];
            setInputValue(answers[prevQ.id] || '');
            setMultiSelectValues(Array.isArray(answers[prevQ.id]) ? answers[prevQ.id] : []);
        }
    };

    const handleSaveAndContinue = () => {
        const data = { answers, conditionalAnswers, currentQuestion, timestamp: new Date().toISOString() };
        localStorage.setItem('kok-os-intake-draft', JSON.stringify(data));
        addLog('İlerleme kaydedildi. Daha sonra devam edebilirsiniz.', 'success');
    };

    const toggleMultiSelect = (option: string) => {
        setMultiSelectValues(prev =>
            prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
        );
    };

    const renderInput = () => {
        const q = showConditional ? ALL_QUESTIONS[currentQuestion].conditional?.followUp?.[conditionalStep] : question;
        if (!q) return null;

        switch (q.type) {
            case 'text':
                return (
                    <div className="space-y-4">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder={q.placeholder}
                            className="w-full bg-transparent border-b-2 border-white/20 py-4 text-xl outline-none focus:border-[#c8ff00] transition-colors placeholder:text-gray-600"
                            autoFocus
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && inputValue.trim()) {
                                    showConditional ? handleConditionalAnswer(inputValue) : handleAnswer(inputValue);
                                }
                            }}
                        />
                        <button
                            onClick={() => showConditional ? handleConditionalAnswer(inputValue) : handleAnswer(inputValue)}
                            disabled={!inputValue.trim()}
                            className="text-[#c8ff00] hover:underline font-mono disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            Onayla [ENTER]
                        </button>
                    </div>
                );

            case 'textarea':
                return (
                    <div className="space-y-4">
                        <textarea
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder={q.placeholder}
                            rows={5}
                            className="w-full bg-black/30 border border-white/10 rounded-lg p-4 text-base outline-none focus:border-[#c8ff00] transition-colors placeholder:text-gray-600 resize-none"
                            autoFocus
                        />
                        <button
                            onClick={() => showConditional ? handleConditionalAnswer(inputValue) : handleAnswer(inputValue)}
                            disabled={!inputValue.trim() && question.required}
                            className="bg-[#c8ff00] text-black px-6 py-3 rounded font-bold hover:shadow-[0_0_20px_rgba(200,255,0,0.4)] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            Devam Et
                        </button>
                    </div>
                );

            case 'select':
                return (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {q.options?.map((option: string) => (
                            <motion.button
                                key={option}
                                whileHover={{ x: 4 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => showConditional ? handleConditionalAnswer(option) : handleAnswer(option)}
                                className="p-4 text-left border border-white/10 hover:border-[#c8ff00] hover:bg-[#c8ff00]/5 rounded-lg transition-all flex items-center justify-between group"
                            >
                                <span>{option}</span>
                                <span className="text-xs font-mono opacity-0 group-hover:opacity-50">→</span>
                            </motion.button>
                        ))}
                    </div>
                );

            case 'multi-select':
                return (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {q.options?.map((option: string) => {
                                const isSelected = multiSelectValues.includes(option);
                                return (
                                    <motion.button
                                        key={option}
                                        whileHover={{ x: 4 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => toggleMultiSelect(option)}
                                        className={`p-4 text-left border rounded-lg transition-all flex items-center justify-between ${isSelected ? 'border-[#c8ff00] bg-[#c8ff00]/10 text-[#c8ff00]' : 'border-white/10 hover:border-white/30'}`}
                                    >
                                        <span>{option}</span>
                                        <span className="text-xs font-mono">{isSelected ? '[✓]' : '[ ]'}</span>
                                    </motion.button>
                                );
                            })}
                        </div>
                        <button
                            onClick={() => handleAnswer(multiSelectValues)}
                            disabled={multiSelectValues.length === 0}
                            className="w-full bg-[#c8ff00] text-black px-6 py-4 rounded-lg font-bold hover:shadow-[0_0_20px_rgba(200,255,0,0.4)] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            {multiSelectValues.length > 0 ? `${multiSelectValues.length} Seçim — Devam Et` : 'En az bir seçim yapın'}
                        </button>
                    </div>
                );

            default:
                return null;
        }
    };

    if (showSummary) {
        return <IntakeSummary answers={answers} conditionalAnswers={conditionalAnswers} onClose={() => setStep('ONLINE')} />;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] bg-black text-white font-mono overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(200,255,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(200,255,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
            </div>

            <div className="relative z-10 h-full flex flex-col">
                {/* Header */}
                <div className="flex-shrink-0 border-b border-white/10 bg-black/80 backdrop-blur-sm">
                    <div className="max-w-7xl mx-auto px-6 py-4">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-[#c8ff00] rounded-full animate-pulse shadow-[0_0_10px_rgba(200,255,0,0.5)]" />
                                <span className="text-xs tracking-[0.2em] text-[#c8ff00]/80">BIRTH_INTAKE</span>
                            </div>
                            <span className="text-xs text-gray-500 font-mono">Adım {currentQuestion + 1} / {ALL_QUESTIONS.length}</span>
                        </div>
                        <h1 className="text-xl md:text-2xl font-bold">İşletme Doğumu: Çekirdek Veri Toplama</h1>
                        <p className="text-sm text-gray-500 mt-1">Bu bilgiler KÖK-OS kurulumunu A-Z tamamlamamız için gereklidir.</p>

                        {/* Progress Bar */}
                        <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-[#c8ff00]"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex overflow-hidden">
                    {/* Sidebar - Question Groups */}
                    <div className="hidden lg:block w-64 border-r border-white/10 bg-black/40 p-4 overflow-y-auto">
                        <div className="space-y-2">
                            {QUESTION_GROUPS.map((group, idx) => {
                                const isActive = currentQuestion >= group.range[0] && currentQuestion <= group.range[1];
                                const isCompleted = currentQuestion > group.range[1];
                                const answeredInGroup = Object.keys(answers).filter(key => {
                                    const q = ALL_QUESTIONS.find(q => q.id === key);
                                    return q && q.group === idx;
                                }).length;
                                const totalInGroup = group.range[1] - group.range[0] + 1;

                                return (
                                    <div
                                        key={group.id}
                                        className={`p-3 rounded-lg border transition-all ${isActive ? 'border-[#c8ff00] bg-[#c8ff00]/5' : isCompleted ? 'border-green-500/30 bg-green-500/5' : 'border-white/5 opacity-50'}`}
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                            <span>{group.icon}</span>
                                            <span className="text-xs font-bold">{group.label}</span>
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {isCompleted ? '✓ Tamamlandı' : `${answeredInGroup}/${totalInGroup}`}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Question Area */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-10">
                        <div className="max-w-xl mx-auto">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={showConditional ? `conditional-${conditionalStep}` : currentQuestion}
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -30 }}
                                    className="space-y-6"
                                >
                                    {/* Group Label */}
                                    <div className="flex items-center gap-3 text-sm text-gray-500">
                                        <span>{currentGroup?.icon}</span>
                                        <span>{currentGroup?.label}</span>
                                        {showConditional && <span className="text-[#c8ff00]">• Ek Bilgi</span>}
                                    </div>

                                    {/* Question */}
                                    <h2 className="text-xl md:text-2xl font-bold leading-relaxed">
                                        {showConditional
                                            ? question.conditional?.followUp?.[conditionalStep]?.label
                                            : question.label}
                                    </h2>

                                    {/* Input */}
                                    {renderInput()}

                                    {/* Navigation */}
                                    <div className="flex items-center justify-between pt-8 border-t border-white/10">
                                        <button
                                            onClick={handleBack}
                                            disabled={currentQuestion === 0 && !showConditional}
                                            className="text-gray-500 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
                                        >
                                            ← Geri
                                        </button>
                                        <div className="flex items-center gap-4">
                                            {question.skip && !showConditional && (
                                                <button onClick={handleSkip} className="text-gray-500 hover:text-orange-400 text-sm">
                                                    Atla (Eksik)
                                                </button>
                                            )}
                                            <button onClick={handleSaveAndContinue} className="text-gray-500 hover:text-[#c8ff00] text-sm flex items-center gap-1">
                                                💾 Kaydet
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Log Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="hidden lg:flex flex-col w-80 border-l border-white/10 bg-black/60"
                    >
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                            <span className="text-xs tracking-[0.15em] text-gray-500">LOG AKIŞI</span>
                            <div className="flex gap-1">
                                <div className="w-2 h-2 rounded-full bg-green-500/50 animate-pulse" />
                            </div>
                        </div>
                        <div ref={logRef} className="flex-1 overflow-y-auto p-4 font-mono text-xs space-y-2">
                            {logs.map((log, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex gap-2 ${log.type === 'success' ? 'text-[#c8ff00]' :
                                        log.type === 'warning' ? 'text-orange-400' :
                                            log.type === 'system' ? 'text-blue-400' : 'text-gray-400'
                                        }`}
                                >
                                    <span className="text-gray-600 shrink-0">[{log.timestamp}]</span>
                                    <span>&gt; {log.message}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Footer */}
                <div className="flex-shrink-0 h-12 bg-black border-t border-white/10 flex items-center px-6 font-mono text-xs text-gray-500">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-3" />
                    <span className="mr-4">MODÜL: BIRTH_INTAKE</span>
                    <span className="flex-1">{currentGroup?.label} • Soru {currentQuestion + 1}/{ALL_QUESTIONS.length}</span>
                    <span className="text-[#c8ff00]">v2.5.1 STABLE</span>
                </div>
            </div>
        </motion.div>
    );
}

// Summary Component
function IntakeSummary({ answers, conditionalAnswers, onClose }: { answers: Record<string, any>; conditionalAnswers: Record<string, any>; onClose: () => void }) {
    const [exporting, setExporting] = useState(false);

    const getAutomationCandidates = () => {
        const candidates = [];
        if (answers.leadSource?.includes('WhatsApp') || answers.whatsappActive === 'Evet') {
            candidates.push({ name: 'WhatsApp Otomatik Yanıt', desc: 'Gelen mesajlara otomatik hoşgeldin yanıtı' });
            candidates.push({ name: 'WhatsApp Bildirimler', desc: 'Yeni sipariş/talep bildirimleri' });
        }
        if (answers.goal?.includes('Müşteri iletişimi')) {
            candidates.push({ name: 'Lead Capture Routing', desc: 'Talepleri otomatik yönlendirme' });
        }
        if (answers.orderFlow === 'Randevu') {
            candidates.push({ name: 'Randevu Hatırlatıcı', desc: 'Otomatik SMS/WhatsApp hatırlatma' });
        }
        if (answers.instagram && answers.instagram !== 'yok') {
            candidates.push({ name: 'İçerik Takvimi', desc: 'Otomatik içerik planlama önerileri' });
        }
        if (answers.googleBusiness && answers.googleBusiness !== 'yok') {
            candidates.push({ name: 'Yorum İstek Otomasyonu', desc: 'Müşterilerden yorum isteme' });
        }
        candidates.push({ name: 'Google Sheets CRM Sync', desc: 'Talep verilerini otomatik senkronize et' });
        return candidates;
    };

    const getSetupChecklist = () => {
        const checklist = [];
        if (!answers.website || answers.website === 'yok') checklist.push('Web sitesi kurulumu');
        if (!answers.logo || answers.logo === 'yok') checklist.push('Logo tasarımı');
        if (answers.kvkk === 'Yok' || answers.kvkk === 'Bilmiyorum') checklist.push('KVKK metinleri hazırlama');
        if (answers.whatsappActive === 'Evet' && conditionalAnswers.whatsappBusiness === 'Hayır') checklist.push('WhatsApp Business kurulumu');
        if (answers.googleBusiness === 'yok') checklist.push('Google Business Profile oluşturma');
        if (answers.metaAccess === 'Yok') checklist.push('Meta Business Suite erişimi sağlama');
        if (answers.domainAccess === 'Bilmiyorum') checklist.push('Domain erişim bilgilerini edinme');
        checklist.push('Ürün/hizmet kataloğu düzenleme');
        checklist.push('SSS içeriklerini sisteme aktarma');
        return checklist;
    };

    const exportJSON = () => {
        setExporting(true);
        const data = { answers, conditionalAnswers, exportedAt: new Date().toISOString(), version: '1.0' };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `kok-os-intake-${answers.businessName || 'isletme'}-${Date.now()}.json`;
        a.click();
        setTimeout(() => setExporting(false), 1000);
    };

    const splitIntoTasks = () => {
        const tasks = {
            'Dijital Altyapı': ['Domain/DNS ayarları', 'Web sitesi kurulumu', 'Hosting yapılandırması'],
            'Sosyal Medya': ['Instagram bağlantısı', 'Meta Business erişimi', 'Google Business optimizasyonu'],
            'İletişim Kanalları': ['WhatsApp Business kurulumu', 'E-posta yapılandırması', 'CRM entegrasyonu'],
            'Marka & İçerik': ['Logo yerleştirme', 'Renk/font ayarları', 'SSS içerikleri', 'Ürün kataloğu']
        };
        console.log('Görev dağılımı:', tasks);
        alert('Görevler konsola yazdırıldı. Yakında ekip yönetim paneline aktarılacak.');
    };

    const automationCandidates = getAutomationCandidates();
    const checklist = getSetupChecklist();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] bg-black text-white overflow-y-auto"
        >
            <div className="max-w-5xl mx-auto px-6 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#c8ff00] flex items-center justify-center shadow-[0_0_40px_rgba(200,255,0,0.5)]"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-8 h-8 text-black" strokeWidth="3">
                            <path d="M20 6L9 17L4 12" />
                        </svg>
                    </motion.div>
                    <h1 className="text-3xl font-bold mb-2">Kurulum Özeti</h1>
                    <p className="text-gray-500">Tüm veriler başarıyla toplandı. KÖK-OS kurulumu için hazır.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Collected Data Summary */}
                    <div className="border border-white/10 rounded-xl bg-white/5 overflow-hidden">
                        <div className="px-6 py-4 border-b border-white/10 bg-black/40">
                            <h3 className="font-bold">Toplanan Veriler</h3>
                        </div>
                        <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
                            {QUESTION_GROUPS.map(group => {
                                const groupAnswers = Object.entries(answers).filter(([key]) => {
                                    const q = ALL_QUESTIONS.find(q => q.id === key);
                                    return q && q.group === QUESTION_GROUPS.indexOf(group);
                                });
                                if (groupAnswers.length === 0) return null;
                                return (
                                    <div key={group.id} className="space-y-2">
                                        <h4 className="text-xs text-[#c8ff00] font-mono">{group.icon} {group.label}</h4>
                                        {groupAnswers.map(([key, value]) => (
                                            <div key={key} className="flex justify-between text-sm border-b border-white/5 pb-2">
                                                <span className="text-gray-500">{ALL_QUESTIONS.find(q => q.id === key)?.label.slice(0, 30)}...</span>
                                                <span className={value === 'EKSİK' ? 'text-orange-400' : 'text-white'}>
                                                    {Array.isArray(value) ? value.join(', ') : String(value).slice(0, 20)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Setup Checklist */}
                    <div className="border border-white/10 rounded-xl bg-white/5 overflow-hidden">
                        <div className="px-6 py-4 border-b border-white/10 bg-black/40">
                            <h3 className="font-bold">📋 Kurulum Checklist&apos;i</h3>
                            <p className="text-xs text-gray-500 mt-1">Manuel tamamlanması gereken görevler</p>
                        </div>
                        <div className="p-6 space-y-3">
                            {checklist.map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm">
                                    <div className="w-5 h-5 border border-white/20 rounded flex items-center justify-center text-xs">
                                        {i + 1}
                                    </div>
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Automation Candidates */}
                    <div className="md:col-span-2 border border-[#c8ff00]/30 rounded-xl bg-[#c8ff00]/5 overflow-hidden">
                        <div className="px-6 py-4 border-b border-[#c8ff00]/20 bg-black/40">
                            <h3 className="font-bold text-[#c8ff00]">⚡ Otomasyona Dönüşebilir Alanlar</h3>
                            <p className="text-xs text-gray-500 mt-1">Şu an manuel kurulum planı (3-4 işletme) → sonra otomasyonlaştırma.</p>
                        </div>
                        <div className="p-6 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {automationCandidates.map((candidate, i) => (
                                <div key={i} className="p-4 border border-white/10 rounded-lg bg-black/30">
                                    <h4 className="font-bold text-sm mb-1">{candidate.name}</h4>
                                    <p className="text-xs text-gray-500">{candidate.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Export Actions */}
                <div className="mt-12 flex flex-wrap justify-center gap-4">
                    <button
                        onClick={exportJSON}
                        disabled={exporting}
                        className="px-6 py-3 bg-[#c8ff00] text-black font-bold rounded-lg hover:shadow-[0_0_20px_rgba(200,255,0,0.4)] transition-all disabled:opacity-50"
                    >
                        {exporting ? 'Dışa aktarılıyor...' : '📄 JSON İndir'}
                    </button>
                    <button
                        onClick={splitIntoTasks}
                        className="px-6 py-3 border border-white/20 text-white font-bold rounded-lg hover:border-[#c8ff00] transition-all"
                    >
                        👥 Ekip Görevlerine Böl
                    </button>
                    <button
                        onClick={onClose}
                        className="px-6 py-3 border border-white/20 text-white font-bold rounded-lg hover:border-green-500 hover:text-green-500 transition-all"
                    >
                        ✓ Sisteme Dön
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
