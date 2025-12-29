'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBoot } from '@/contexts/BootContext';

interface TerminalLog {
    message: string;
    type: 'info' | 'success' | 'system';
}

type ConfigStep = 0 | 1 | 2 | 3 | 4 | 5; // 0-4 questions, 5 = confirmation

export default function AutomationBoot({ onBack }: { onBack?: () => void }) {
    const { bootData, updateBootData, setStep } = useBoot();
    const [configStep, setConfigStep] = useState<ConfigStep>(0);
    const [terminalLogs, setTerminalLogs] = useState<TerminalLog[]>([
        { message: 'Otomasyon çekirdeği başlatılıyor...', type: 'system' },
        { message: 'Yapılandırma modülü aktif.', type: 'info' }
    ]);
    const [isActivating, setIsActivating] = useState(false);
    const [activationComplete, setActivationComplete] = useState(false);
    const terminalRef = useRef<HTMLDivElement>(null);

    // Initialize automation config if not exists
    useEffect(() => {
        if (!bootData.automationConfig) {
            updateBootData({
                automationConfig: {
                    dataFields: []
                }
            });
        }
    }, [bootData.automationConfig, updateBootData]);

    // Auto scroll terminal
    useEffect(() => {
        terminalRef.current?.scrollTo({
            top: terminalRef.current.scrollHeight,
            behavior: 'smooth'
        });
    }, [terminalLogs]);

    // Change URL when component mounts
    useEffect(() => {
        window.history.pushState({}, '', '/automation/boot');
    }, []);

    const addLog = (message: string, type: TerminalLog['type'] = 'info') => {
        setTerminalLogs(prev => [...prev, { message, type }]);
    };

    const config = bootData.automationConfig || { dataFields: [] };

    // Configuration steps data
    const steps = [
        {
            id: 'purpose',
            label: 'OTOMASYON AMACI',
            question: 'Bu otomasyon neyi başlatacak?',
            options: [
                { value: 'collect-leads', label: 'Müşteri taleplerini toplamak' },
                { value: 'sales-process', label: 'Satış sürecini başlatmak' },
                { value: 'appointment-flow', label: 'Randevu / iletişim akışı kurmak' },
                { value: 'test-only', label: 'Sadece test amaçlı' }
            ],
            logMessage: (val: string) => `Otomasyon amacı belirlendi: ${val}`
        },
        {
            id: 'trigger',
            label: 'İLK TEMAS KANALI',
            question: 'Otomasyon ilk olarak nereden tetiklenecek?',
            options: [
                { value: 'web-form', label: 'Web formu' },
                { value: 'whatsapp', label: 'WhatsApp' },
                { value: 'instagram-dm', label: 'Instagram DM' },
                { value: 'manual', label: 'Manuel (ben başlatacağım)' }
            ],
            logMessage: (val: string) => `Tetikleyici kanal eşlendi: ${val}`
        },
        {
            id: 'dataFields',
            label: 'MÜŞTERİDEN TOPLANACAK TEMEL VERİLER',
            question: 'Otomasyon hangi verilerle çalışacak?',
            options: [
                { value: 'name', label: 'Ad Soyad' },
                { value: 'phone', label: 'Telefon' },
                { value: 'email', label: 'E-posta' },
                { value: 'product-interest', label: 'Ürün / Hizmet ilgisi' },
                { value: 'message', label: 'Serbest mesaj alanı' }
            ],
            isMulti: true,
            logMessage: () => 'Veri şeması oluşturuldu'
        },
        {
            id: 'dataTarget',
            label: 'VERİ NEREYE AKSIN',
            question: 'Toplanan veriler nereye kaydedilecek?',
            options: [
                { value: 'kok-crm', label: 'KÖK-OS CRM' },
                { value: 'google-sheets', label: 'Google Sheets' },
                { value: 'temp-memory', label: 'Sadece sistem hafızası (geçici)' }
            ],
            logMessage: (val: string) => `Veri hedefi tanımlandı: ${val}`
        },
        {
            id: 'postAction',
            label: 'OTOMASYON SONRASI AKSİYON',
            question: 'Veri alındıktan sonra sistem ne yapsın?',
            options: [
                { value: 'send-notification', label: 'Bildirim gönder (WhatsApp / Mail)' },
                { value: 'auto-reply', label: 'Otomatik yanıt ver' },
                { value: 'save-wait', label: 'Sadece kaydet ve bekle' }
            ],
            logMessage: () => 'İlk aksiyon zinciri hazırlandı'
        }
    ];

    const currentStepData = steps[configStep];

    const handleSelect = (value: string) => {
        const step = steps[configStep];

        if (step.id === 'dataFields') {
            // Multi-select logic
            const currentFields = config.dataFields || [];
            const newFields = currentFields.includes(value)
                ? currentFields.filter(f => f !== value)
                : [...currentFields, value];

            updateBootData({
                automationConfig: {
                    ...config,
                    dataFields: newFields
                }
            });
        } else {
            // Single select
            updateBootData({
                automationConfig: {
                    ...config,
                    [step.id]: value
                }
            });

            // Add log and move to next step
            const label = step.options.find(o => o.value === value)?.label || value;
            addLog(step.logMessage(label), 'success');

            setTimeout(() => {
                setConfigStep(prev => (prev + 1) as ConfigStep);
            }, 300);
        }
    };

    const handleMultiConfirm = () => {
        const step = steps[configStep];
        addLog(step.logMessage(''), 'success');
        setTimeout(() => {
            setConfigStep(prev => (prev + 1) as ConfigStep);
        }, 300);
    };

    const handleActivate = async () => {
        setIsActivating(true);

        const activationLogs = [
            { message: 'Otomasyon derleniyor...', delay: 500 },
            { message: 'Bağlantılar kuruluyor...', delay: 1200 },
            { message: 'Modüller senkronize ediliyor...', delay: 1800 },
            { message: 'Sistem hazır.', delay: 2500 }
        ];

        for (const log of activationLogs) {
            await new Promise(resolve => setTimeout(resolve, log.delay - (activationLogs.indexOf(log) > 0 ? activationLogs[activationLogs.indexOf(log) - 1].delay : 0)));
            addLog(log.message, log.message === 'Sistem hazır.' ? 'success' : 'system');
        }

        await new Promise(resolve => setTimeout(resolve, 800));
        setActivationComplete(true);

        // Redirect after showing success message
        setTimeout(() => {
            window.history.pushState({}, '', '/core');
            setStep('IDLE');
        }, 3000);
    };

    const getLabelForValue = (stepId: string, value: string) => {
        const step = steps.find(s => s.id === stepId);
        return step?.options.find(o => o.value === value)?.label || value;
    };

    if (activationComplete) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center max-w-2xl px-8"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', delay: 0.2 }}
                        className="w-20 h-20 mx-auto mb-8 rounded-full bg-[#c8ff00] flex items-center justify-center shadow-[0_0_60px_rgba(200,255,0,0.6)]"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-10 h-10 text-black" strokeWidth="3">
                            <path d="M20 6L9 17L4 12" />
                        </svg>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-2xl md:text-3xl font-bold text-[#c8ff00] mb-4"
                    >
                        İlk otomasyon aktif. Sistem artık veri almaya hazır.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-gray-500 font-mono text-sm"
                    >
                        Yönlendiriliyor: /core
                    </motion.p>
                </motion.div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-black text-white font-mono overflow-hidden"
        >
            {/* Background Grid */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(200,255,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(200,255,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
            </div>

            <div className="relative z-10 h-full flex flex-col">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-shrink-0 border-b border-white/10 bg-black/80 backdrop-blur-sm"
                >
                    <div className="max-w-7xl mx-auto px-6 py-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-2 h-2 bg-[#c8ff00] rounded-full animate-pulse shadow-[0_0_10px_rgba(200,255,0,0.5)]" />
                            <span className="text-xs tracking-[0.2em] text-[#c8ff00]/80">AUTOMATION_BOOT</span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-white">
                            İlk Otomasyon Yapılandırılıyor
                        </h1>
                        <div className="flex justify-between items-start">
                            <p className="text-sm text-gray-500 mt-2">
                                Bu bilgiler otomasyon çekirdeğini oluşturur.
                            </p>
                            <button onClick={onBack} className="text-gray-500 hover:text-white text-xs border border-white/20 px-2 py-1 rounded">
                                ÇIK
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Main Content Area */}
                <div className="flex-1 flex overflow-hidden">
                    {/* Left: Configuration Panel */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-10">
                        <div className="max-w-xl mx-auto">
                            <AnimatePresence mode="wait">
                                {configStep < 5 ? (
                                    <motion.div
                                        key={configStep}
                                        initial={{ opacity: 0, x: 30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -30 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {/* Step Indicator */}
                                        <div className="flex items-center gap-4 mb-8">
                                            <span className="text-xs text-gray-500 tracking-wider">
                                                ADIM {configStep + 1}/5
                                            </span>
                                            <div className="flex-1 h-[1px] bg-white/10" />
                                            <span className="text-xs text-[#c8ff00] tracking-wider">
                                                {currentStepData.label}
                                            </span>
                                        </div>

                                        {/* Question */}
                                        <h2 className="text-xl md:text-2xl font-bold mb-8 text-white leading-relaxed">
                                            {currentStepData.question}
                                        </h2>

                                        {/* Options */}
                                        <div className="space-y-3">
                                            {currentStepData.options.map((option) => {
                                                const isSelected = currentStepData.isMulti
                                                    ? config.dataFields?.includes(option.value)
                                                    : config[currentStepData.id as keyof typeof config] === option.value;

                                                return (
                                                    <motion.button
                                                        key={option.value}
                                                        onClick={() => handleSelect(option.value)}
                                                        whileHover={{ x: 4 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        className={`w-full p-4 text-left border rounded-lg transition-all duration-200 flex items-center justify-between group ${isSelected
                                                            ? 'border-[#c8ff00] bg-[#c8ff00]/10 text-[#c8ff00]'
                                                            : 'border-white/10 hover:border-white/30 hover:bg-white/5 text-white'
                                                            }`}
                                                    >
                                                        <span className="text-sm md:text-base">{option.label}</span>
                                                        <span className={`text-xs font-mono transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                                                            }`}>
                                                            {currentStepData.isMulti
                                                                ? (isSelected ? '[SEÇİLDİ]' : '[SEÇ]')
                                                                : '→'}
                                                        </span>
                                                    </motion.button>
                                                );
                                            })}
                                        </div>

                                        {/* Multi-select confirm button */}
                                        {currentStepData.isMulti && (
                                            <motion.button
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: config.dataFields?.length ? 1 : 0.3, y: 0 }}
                                                onClick={handleMultiConfirm}
                                                disabled={!config.dataFields?.length}
                                                className={`mt-8 w-full p-4 rounded-lg font-semibold text-black transition-all ${config.dataFields?.length
                                                    ? 'bg-[#c8ff00] hover:shadow-[0_0_30px_rgba(200,255,0,0.3)] cursor-pointer'
                                                    : 'bg-gray-700 cursor-not-allowed'
                                                    }`}
                                            >
                                                {config.dataFields?.length
                                                    ? `${config.dataFields.length} Alan Seçildi — Devam Et`
                                                    : 'En az bir alan seçin'}
                                            </motion.button>
                                        )}

                                        <div className="mt-8 flex items-center justify-start">
                                            <button
                                                onClick={() => configStep > 0 ? setConfigStep(prev => (prev - 1) as ConfigStep) : onBack?.()}
                                                className="text-gray-500 hover:text-white font-mono transition-colors flex items-center gap-2"
                                            >
                                                ← Geri
                                            </button>
                                        </div>
                                    </motion.div>
                                ) : (
                                    /* Confirmation Screen */
                                    <motion.div
                                        key="confirmation"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="space-y-8"
                                    >
                                        <div>
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-3 h-3 bg-[#c8ff00] rounded-full shadow-[0_0_15px_rgba(200,255,0,0.5)]" />
                                                <span className="text-xs tracking-[0.15em] text-[#c8ff00]">SİSTEM ONAY</span>
                                            </div>
                                            <h2 className="text-2xl md:text-3xl font-bold text-white">
                                                Otomasyon Çalışmaya Hazır
                                            </h2>
                                        </div>

                                        {/* Configuration Summary */}
                                        <div className="border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm overflow-hidden">
                                            <div className="border-b border-white/10 px-6 py-4">
                                                <span className="text-xs tracking-wider text-gray-400">YAPILANDIRMA ÖZETİ</span>
                                            </div>
                                            <div className="p-6 space-y-4">
                                                <div className="flex justify-between items-start py-3 border-b border-white/5">
                                                    <span className="text-gray-500 text-sm">Amaç</span>
                                                    <span className="text-white text-sm text-right max-w-[60%]">
                                                        {getLabelForValue('purpose', config.purpose || '')}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-start py-3 border-b border-white/5">
                                                    <span className="text-gray-500 text-sm">Tetikleyici</span>
                                                    <span className="text-white text-sm text-right max-w-[60%]">
                                                        {getLabelForValue('trigger', config.trigger || '')}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-start py-3 border-b border-white/5">
                                                    <span className="text-gray-500 text-sm">Veri Seti</span>
                                                    <div className="flex flex-wrap justify-end gap-2 max-w-[60%]">
                                                        {config.dataFields?.map(field => (
                                                            <span key={field} className="px-2 py-1 bg-white/10 rounded text-xs text-[#c8ff00]">
                                                                {getLabelForValue('dataFields', field)}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-start py-3 border-b border-white/5">
                                                    <span className="text-gray-500 text-sm">Veri Hedefi</span>
                                                    <span className="text-white text-sm text-right max-w-[60%]">
                                                        {getLabelForValue('dataTarget', config.dataTarget || '')}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-start py-3">
                                                    <span className="text-gray-500 text-sm">Aksiyon</span>
                                                    <span className="text-white text-sm text-right max-w-[60%]">
                                                        {getLabelForValue('postAction', config.postAction || '')}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Activate Button */}
                                        <motion.button
                                            onClick={handleActivate}
                                            disabled={isActivating}
                                            whileHover={!isActivating ? { scale: 1.02 } : {}}
                                            whileTap={!isActivating ? { scale: 0.98 } : {}}
                                            className={`w-full p-5 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${isActivating
                                                ? 'bg-[#c8ff00]/50 text-black/50 cursor-not-allowed'
                                                : 'bg-[#c8ff00] text-black hover:shadow-[0_0_40px_rgba(200,255,0,0.4)]'
                                                }`}
                                        >
                                            {isActivating ? (
                                                <>
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                                        className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                                                    />
                                                    Derleniyor...
                                                </>
                                            ) : (
                                                <>
                                                    <span className="text-xl">▶</span>
                                                    Otomasyonu Başlat
                                                </>
                                            )}
                                        </motion.button>
                                        <div className="mt-4 flex items-center justify-center">
                                            <button
                                                onClick={() => setConfigStep(4)}
                                                className="text-gray-500 hover:text-white font-mono text-sm transition-colors"
                                            >
                                                ← Yapılandırmaya Dön
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right: Terminal Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="hidden lg:flex flex-col w-[400px] border-l border-white/10 bg-black/60 backdrop-blur-sm"
                    >
                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                            <div className="flex items-center gap-3">
                                <span className="text-xs tracking-[0.15em] text-gray-500">SİSTEM LOG</span>
                            </div>
                            <div className="flex gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500/50 animate-pulse" />
                                <div className="w-2 h-2 rounded-full bg-[#c8ff00]/30" />
                                <div className="w-2 h-2 rounded-full bg-[#c8ff00]/10" />
                            </div>
                        </div>
                        <div
                            ref={terminalRef}
                            className="flex-1 overflow-y-auto p-6 font-mono text-sm"
                        >
                            <AnimatePresence>
                                {terminalLogs.map((log, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`mb-2 flex items-start gap-2 ${log.type === 'success'
                                            ? 'text-[#c8ff00]'
                                            : log.type === 'system'
                                                ? 'text-blue-400'
                                                : 'text-gray-400'
                                            }`}
                                    >
                                        <span className="text-gray-600 select-none">&gt;</span>
                                        <span>{log.message}</span>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            <motion.div
                                animate={{ opacity: [0.2, 0.8, 0.2] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="text-gray-600 mt-2"
                            >
                                &gt; _
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Footer Status Bar */}
                <motion.div
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    className="flex-shrink-0 h-12 bg-black border-t border-white/10 flex items-center px-6 font-mono text-xs text-gray-500"
                >
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-3" />
                    <span className="mr-4">MODÜL: AUTOMATION_CONFIG</span>
                    <span className="flex-1">
                        {configStep < 5
                            ? `Yapılandırma aşaması: ${configStep + 1}/5`
                            : 'Yapılandırma tamamlandı — onay bekleniyor'}
                    </span>
                    <span className="text-[#c8ff00]">v2.5.1 STABLE</span>
                </motion.div>
            </div>
        </motion.div>
    );
}
