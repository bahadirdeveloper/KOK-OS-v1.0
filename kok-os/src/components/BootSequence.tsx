'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBoot } from '@/contexts/BootContext';
import AutomationBoot from './AutomationBoot';
import BusinessBirthIntake from './BusinessBirthIntake';

export default function BootSequence() {
    const { step, setStep, updateBootData, bootData } = useBoot();
    const [logs, setLogs] = useState<string[]>([]);
    const [setupStep, setSetupStep] = useState(0); // 0: Name, 1: Priority, 2: Modules
    const logsEndRef = useRef<HTMLDivElement>(null);

    // Scroll locking
    useEffect(() => {
        if (step !== 'IDLE') {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [step]);

    // STEP 1: WAKE UP LOGS
    useEffect(() => {
        if (step === 'WAKE_UP') {
            const systemLogs = [
                "Temel çekirdek yükleniyor...",
                "Bellek blokları ayrıştırıldı [0x84F2A]",
                "İşletme profili algılanıyor...",
                "Yerel sistem katmanı doğrulanıyor...",
                "Ağ protokolleri: OK",
                "Güvenlik modülü: AKTİF",
                "Modüller kontrol ediliyor...",
                "Kullanıcı yetkilendirmesi başlatıldı...",
                "Sistem hazır."
            ];

            let delay = 0;
            setLogs([]);

            systemLogs.forEach((log, index) => {
                delay += Math.random() * 300 + 100;
                setTimeout(() => {
                    setLogs(prev => [...prev, `> ${log}`]);
                    if (index === systemLogs.length - 1) {
                        setTimeout(() => setStep('IDENTITY'), 800);
                    }
                }, delay);
            });
        }
    }, [step, setStep]);

    // Auto scroll logs
    useEffect(() => {
        logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [logs]);

    if (step === 'IDLE') return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black/95 text-white font-mono flex flex-col items-center justify-center overflow-hidden">
            {/* Background Grid & Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(200,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(200,255,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
            </div>

            {/* CORE CONTENT CONTAINER */}
            <div className="relative z-10 w-full max-w-4xl p-8 flex flex-col h-full md:h-auto md:min-h-[600px] justify-center">

                {/* STEP 1: TERMINAL LOGS */}
                {step === 'WAKE_UP' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full max-w-2xl mx-auto border border-[#c8ff00]/20 bg-black/50 backdrop-blur-md rounded-lg p-6 shadow-[0_0_50px_rgba(200,255,0,0.1)]"
                    >
                        <div className="flex items-center justify-between mb-4 border-b border-[#c8ff00]/10 pb-2">
                            <span className="text-[#c8ff00] text-xs tracking-widest">SİSTEM ÖNYÜKLEME</span>
                            <div className="flex gap-2">
                                <div className="w-2 h-2 rounded-full bg-[#c8ff00]/50 animate-pulse" />
                                <div className="w-2 h-2 rounded-full bg-[#c8ff00]/30" />
                                <div className="w-2 h-2 rounded-full bg-[#c8ff00]/10" />
                            </div>
                        </div>
                        <div className="h-64 overflow-y-auto font-mono text-sm space-y-2 scrollbar-thin scrollbar-thumb-[#c8ff00]/20">
                            {logs.map((log, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-gray-300"
                                >
                                    <span className="text-[#c8ff00] mr-2">➜</span>
                                    {log.replace('> ', '')}
                                </motion.div>
                            ))}
                            <div ref={logsEndRef} />
                        </div>
                    </motion.div>
                )}

                {/* STEP 2: IDENTITY DECISION */}
                {step === 'IDENTITY' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center space-y-12"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            Bu sistemi kimin için başlatıyoruz?
                        </h1>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            {[
                                { label: "Yeni İşletme Kur", sub: "KÖK'ten doğur", action: () => setStep('SETUP') },
                                { label: "Var Olan İşletme", sub: "Bağlantı kur", action: () => setStep('EXISTING_BUSINESS') },
                                { label: "Demo Mod", sub: "Sistemi incele", action: () => setStep('ONLINE') }
                            ].map((opt, idx) => (
                                <motion.button
                                    key={idx}
                                    whileHover={{ scale: 1.02, borderColor: 'rgba(200,255,0,0.5)' }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={opt.action}
                                    className="group relative p-8 border border-white/10 bg-white/5 hover:bg-white/10 rounded-xl text-left transition-all duration-300"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#c8ff00]/0 to-[#c8ff00]/0 group-hover:from-[#c8ff00]/5 group-hover:to-transparent transition-all rounded-xl" />
                                    <h3 className="text-xl font-bold text-white mb-2">{opt.label}</h3>
                                    <p className="text-sm text-gray-400 font-mono group-hover:text-[#c8ff00] transition-colors">{opt.sub}</p>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* STEP 2.5: EXISTING BUSINESS LOGIN */}
                {step === 'EXISTING_BUSINESS' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full max-w-md mx-auto p-8 border border-white/10 rounded-xl bg-white/5 backdrop-blur-md"
                    >
                        <h2 className="text-2xl font-bold mb-6 text-center">Sistem Bağlantısı</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-mono text-gray-500 mb-2">İŞLETME ID / ERİŞİM ANAHTARI</label>
                                <input
                                    type="text"
                                    placeholder="KÖK-XXXX-XXXX"
                                    className="w-full bg-black/50 border border-white/20 rounded p-3 font-mono text-[#c8ff00] outline-none focus:border-[#c8ff00] transition-colors"
                                />
                            </div>
                            <button
                                onClick={() => setStep('ONLINE')}
                                className="w-full bg-[#c8ff00] text-black font-bold py-3 rounded hover:bg-[#ffe600] transition-colors"
                            >
                                BAĞLANTIYI KUR
                            </button>
                            <button
                                onClick={() => setStep('IDENTITY')}
                                className="w-full text-gray-500 text-sm hover:text-white transition-colors"
                            >
                                Geri Dön
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* STEP 3: CORE SETUP */}
                {step === 'SETUP' && (
                    <SetupFlow
                        step={setupStep}
                        setStep={setSetupStep}
                        onComplete={() => setStep('ONLINE')}
                        updateBootData={updateBootData}
                        bootData={bootData}
                    />
                )}

                {/* STEP 4: SYSTEM ONLINE */}
                {step === 'ONLINE' && (
                    <OnlineDashboard onExit={() => setStep('BUSINESS_BIRTH')} />
                )}

                {/* STEP 5: AUTOMATION BOOT */}
                {step === 'AUTOMATION_BOOT' && (
                    <AutomationBoot />
                )}

                {/* STEP 6: BUSINESS BIRTH INTAKE */}
                {step === 'BUSINESS_BIRTH' && (
                    <BusinessBirthIntake />
                )}

            </div>

            {/* Permanent Terminal Footer in Setup/Online Phase */}
            {(step === 'SETUP' || step === 'ONLINE' || step === 'EXISTING_BUSINESS') && (
                <motion.div
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    className="fixed bottom-0 left-0 right-0 h-12 bg-black border-t border-white/10 flex items-center px-6 font-mono text-xs text-gray-400"
                >
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-3" />
                    <span className="mr-4">SİSTEM: {step}</span>
                    <span className="flex-1">
                        {step === 'SETUP' ? 'Konfigürasyon bekleniyor...' : 'Tüm sistemler aktif.'}
                    </span>
                    <span className="text-[#c8ff00]">v2.5.1 STABLE</span>
                </motion.div>
            )}
        </div>
    );
}

// --- SUB COMPONENTS ---

function SetupFlow({ step, setStep, onComplete, updateBootData, bootData }: any) {
    const steps = [
        {
            title: "Kimlik Tanımlama",
            question: "İşletmenin adı nedir?",
            type: "input",
            field: "businessName"
        },
        {
            title: "Sistem Önceliği",
            question: "Bu işletim sistemi en çok neye odaklanacak?",
            type: "select",
            options: ["Satış", "Operasyon", "İçerik", "Otomasyon"],
            field: "priority"
        },
        {
            title: "Modül Aktivasyonu",
            question: "Hangi dijital modülleri aktif edelim?",
            type: "multi",
            options: ["Web Arayüzü", "WhatsApp Bot", "CRM Çekirdeği", "Pazarlama Otomasyonu"],
            field: "modules"
        }
    ];

    const currentStepData = steps[step];

    const handleNext = () => {
        if (step < steps.length - 1) {
            setStep(step + 1);
        } else {
            onComplete();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            key={step}
            className="w-full max-w-xl mx-auto space-y-8"
        >
            <div className="flex items-center gap-4 text-sm text-gray-500 font-mono mb-8">
                <span>ADIM {step + 1}/{steps.length}</span>
                <div className="h-[1px] flex-1 bg-white/10" />
                <span className="text-[#c8ff00]">{currentStepData.title}</span>
            </div>

            <h2 className="text-3xl font-bold mb-8">{currentStepData.question}</h2>

            {currentStepData.type === 'input' && (
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Örn: Acme A.Ş."
                        className="w-full bg-transparent border-b-2 border-white/20 py-4 text-2xl outline-none focus:border-[#c8ff00] transition-colors placeholder:text-gray-700"
                        autoFocus
                        onChange={(e) => updateBootData({ [currentStepData.field]: e.target.value })}
                        onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                    />
                    <button onClick={handleNext} className="mt-8 text-[#c8ff00] hover:underline font-mono">
                        Onayla [ENTER]
                    </button>
                </div>
            )}

            {currentStepData.type === 'select' && (
                <div className="grid grid-cols-2 gap-4">
                    {currentStepData.options!.map((opt: string) => (
                        <button
                            key={opt}
                            onClick={() => {
                                updateBootData({ [currentStepData.field]: opt });
                                handleNext();
                            }}
                            className="p-6 border border-white/10 hover:border-[#c8ff00] hover:bg-[#c8ff00]/5 text-left rounded-lg transition-all"
                        >
                            <span className="text-xl font-semibold">{opt}</span>
                        </button>
                    ))}
                </div>
            )}

            {currentStepData.type === 'multi' && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-3">
                        {currentStepData.options!.map((opt: string) => {
                            const isSelected = bootData.modules?.includes(opt);
                            return (
                                <button
                                    key={opt}
                                    onClick={() => {
                                        const current = bootData.modules || [];
                                        const newData = isSelected
                                            ? current.filter((m: string) => m !== opt)
                                            : [...current, opt];
                                        updateBootData({ modules: newData });
                                    }}
                                    className={`p-4 border text-left rounded-lg transition-all flex items-center justify-between ${isSelected
                                        ? 'border-[#c8ff00] bg-[#c8ff00]/10 text-[#c8ff00]'
                                        : 'border-white/10 hover:border-white/30'
                                        }`}
                                >
                                    <span>{opt}</span>
                                    <span className="font-mono text-xs">
                                        {isSelected ? '[AKTİF]' : '[PASİF]'}
                                    </span>
                                </button>
                            )
                        })}
                    </div>
                    <button
                        onClick={handleNext}
                        className="w-full bg-[#c8ff00] text-black font-bold py-4 rounded-lg hover:bg-[#bbe000] transition-colors"
                    >
                        KURULUMU TAMAMLA
                    </button>
                </div>
            )}
        </motion.div>
    );
}

function OnlineDashboard({ onExit }: { onExit: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-5xl mx-auto mt-[-50px]"
        >
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]" />
                    <span className="font-mono text-green-500">SYSTEM_ONLINE</span>
                </div>
                <div className="font-mono text-xs text-gray-500">UPTIME: 00:00:01</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-2 p-8 border border-white/10 rounded-xl bg-white/5 backdrop-blur">
                    <h3 className="text-gray-400 mb-6 font-mono text-sm uppercase">Sistem Durumu</h3>
                    <div className="space-y-6">
                        <div className="flex justify-between items-center pb-4 border-b border-white/5">
                            <span>Çekirdek Modüller</span>
                            <span className="text-[#c8ff00]">4/4 Aktif</span>
                        </div>
                        <div className="flex justify-between items-center pb-4 border-b border-white/5">
                            <span>Veri Akışı</span>
                            <span className="text-blue-400">Beklemede</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>Otomasyon Tetikleyicileri</span>
                            <span className="text-orange-400">Yapılandırılmadı</span>
                        </div>
                    </div>

                    <div className="mt-12">
                        <button onClick={onExit} className="bg-[#c8ff00] text-black px-6 py-3 rounded font-bold hover:shadow-[0_0_20px_rgba(200,255,0,0.4)] transition-all flex items-center gap-2">
                            <span className="text-lg">⚡</span>
                            İlk Otomasyonu Çalıştır
                        </button>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="p-6 border border-white/10 rounded-xl bg-black/40">
                        <h4 className="text-xs font-mono text-gray-500 mb-4">LOG AKIŞI</h4>
                        <div className="space-y-2 font-mono text-xs text-green-500/80">
                            <p>&gt; Sistem başlatıldı</p>
                            <p>&gt; Dashboard render edildi</p>
                            <p>&gt; Kullanıcı girdisi bekleniyor...</p>
                        </div>
                    </div>
                    <div className="p-6 border border-white/10 rounded-xl bg-black/40">
                        <h4 className="text-xs font-mono text-gray-500 mb-4">ÖNERİLEN AKSİYONLAR</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li className="flex items-center gap-2 opacity-50">
                                <div className="w-1 h-1 bg-white rounded-full" />
                                WhatsApp Bağla
                            </li>
                            <li className="flex items-center gap-2 opacity-50">
                                <div className="w-1 h-1 bg-white rounded-full" />
                                Ürün Katalogu Yükle
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function ClosureScreen({ onComplete }: { onComplete: () => void }) {
    useEffect(() => {
        // Simulate URL change
        window.history.pushState({}, "", "/core");

        // Auto-redirect to Form Filling after animation
        const timer = setTimeout(() => {
            onComplete();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center"
        >
            <div className="w-16 h-16 mx-auto bg-[#c8ff00] rounded-full flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(200,255,0,0.5)]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-8 h-8 text-black" strokeWidth="3">
                    <path d="M20 6L9 17L4 12" />
                </svg>
            </div>
            <h1 className="text-3xl font-bold mb-2">KÖK aktif.</h1>
            <p className="text-gray-400">Artık işleyen bir sistemin var.</p>
        </motion.div>
    )
}
