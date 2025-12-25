import { BrandShowcase } from '@/components/BrandShowcase';
import { HeroSection } from '@/components/HeroSection';
import { NavigationHeader } from '@/components/NavigationHeader';
import { PainPointsSection } from '@/components/sections/PainPointsSection';
import { ValuePropsSection } from '@/components/sections/ValuePropsSection';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { PricingSection } from '@/components/sections/PricingSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { FinalCTASection } from '@/components/sections/FinalCTASection';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <div className='flex flex-1 flex-col bg-bg-white-0 text-text-strong-950'>
      <NavigationHeader />
      <main className='flex flex-1 flex-col'>
        <HeroSection />
        <BrandShowcase />
        <PainPointsSection />
        <ValuePropsSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}
