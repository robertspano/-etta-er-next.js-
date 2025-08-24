'use client';

import { useTranslations } from '../contexts/TranslationsContext';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import PopularProjects from '../components/PopularProjects';
import FindCompanySection from '../components/FindCompanySection';
import ReviewsSection from '../components/ReviewsSection';
import TrustSection from '../components/TrustSection';
import ProSignupSection from '../components/ProSignupSection';

export default function HomePage() {
  const { translations, language } = useTranslations();
  
  return (
    <div className="min-h-screen bg-white">
      <Hero translations={translations} language={language} />
      <HowItWorks translations={translations} language={language} />
      <PopularProjects translations={translations} language={language} />
      <FindCompanySection translations={translations} language={language} />
      <ReviewsSection translations={translations} language={language} />
      <TrustSection translations={translations} language={language} />
      <ProSignupSection translations={translations} language={language} />
    </div>
  );
}