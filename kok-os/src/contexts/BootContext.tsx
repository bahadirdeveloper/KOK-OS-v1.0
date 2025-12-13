'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type BootStep = 'IDLE' | 'WAKE_UP' | 'IDENTITY' | 'EXISTING_BUSINESS' | 'SETUP' | 'ONLINE' | 'CLOSURE' | 'FORM_FILLING' | 'AUTOMATION_BOOT' | 'BUSINESS_BIRTH';

interface AutomationConfig {
    purpose?: string;
    trigger?: string;
    dataFields: string[];
    dataTarget?: string;
    postAction?: string;
}

interface IntakeData {
    answers: Record<string, any>;
    conditionalAnswers: Record<string, any>;
    completedAt?: string;
}

interface BootData {
    businessName?: string;
    sector?: string;
    priority?: string;
    modules: string[];
    automationConfig: AutomationConfig;
    intakeData?: IntakeData;
}

interface BootContextType {
    step: BootStep;
    bootData: BootData;
    startBoot: () => void;
    setStep: (step: BootStep) => void;
    updateBootData: (data: Partial<BootData>) => void;
    isBooting: boolean;
}

const BootContext = createContext<BootContextType | undefined>(undefined);

export function BootProvider({ children }: { children: ReactNode }) {
    const [step, setStep] = useState<BootStep>('IDLE');
    const [bootData, setBootData] = useState<BootData>({
        modules: [],
        automationConfig: {
            dataFields: []
        }
    });

    const startBoot = () => {
        setStep('WAKE_UP');
    };

    const updateBootData = (data: Partial<BootData>) => {
        setBootData((prev) => ({ ...prev, ...data }));
    };

    const isBooting = step !== 'IDLE';

    return (
        <BootContext.Provider value={{ step, bootData, startBoot, setStep, updateBootData, isBooting }}>
            {children}
        </BootContext.Provider>
    );
}

export function useBoot() {
    const context = useContext(BootContext);
    if (context === undefined) {
        throw new Error('useBoot must be used within a BootProvider');
    }
    return context;
}
