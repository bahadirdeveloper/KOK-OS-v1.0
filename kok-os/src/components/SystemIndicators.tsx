'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface SystemStatus {
    layer: string;
}

export default function SystemIndicators() {
    const [status, setStatus] = useState<SystemStatus>({
        layer: 'HERO',
    });

    useEffect(() => {
        // Scroll listener for active layer
        const handleScroll = () => {
            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            let layer = 'HERO';
            if (scrollPercent > 80) layer = 'FOOTER';
            else if (scrollPercent > 65) layer = 'CTA';
            else if (scrollPercent > 50) layer = 'MODULES';
            else if (scrollPercent > 35) layer = 'ARCH';
            else if (scrollPercent > 20) layer = 'PIPELINE';
            else if (scrollPercent > 10) layer = 'TARGET';

            setStatus(prev => ({ ...prev, layer }));
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return null; // System indicators moved to HeroSection and Header
}
