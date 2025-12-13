import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import TargetModules from '@/components/TargetModules';
import OperationPipeline from '@/components/OperationPipeline';
import SystemArchitecture from '@/components/SystemArchitecture';
import ModularSystem from '@/components/ModularSystem';
import SystemIndicators from '@/components/SystemIndicators';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0a]">
      {/* System Indicators */}
      <SystemIndicators />

      {/* Header */}
      <Header />

      {/* Hero / Boot Screen */}
      <HeroSection />

      {/* Target Sectors */}
      <TargetModules />

      {/* Operation Pipeline */}
      <OperationPipeline />

      {/* System Architecture */}
      <SystemArchitecture />

      {/* Modular System */}
      <ModularSystem />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
