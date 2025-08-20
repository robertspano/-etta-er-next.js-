'use client';

import { useState } from 'react';
import { translations } from '../data/translations';
import Header from '../components/Header';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import PopularProjects from '../components/PopularProjects';
import ReviewsSection from '../components/ReviewsSection';
import TrustSection from '../components/TrustSection';
import ProSignupSection from '../components/ProSignupSection';
import Footer from '../components/Footer';
import { useReviews } from '../hooks/useReviews';

export default function HomePage() {
  const [language, setLanguage] = useState('en');
  const t = translations[language];
  
  // Fetch reviews using our custom hook
  const { reviews, loading: reviewsLoading, error: reviewsError } = useReviews();

  return (
    <div className="min-h-screen bg-white">
      <Header 
        language={language} 
        setLanguage={setLanguage} 
        translations={t} 
      />
      
      <main>
        <Hero translations={t} />
        <HowItWorks translations={t} />
        <PopularProjects translations={t} />
        <ReviewsSection 
          reviews={reviews}
          translations={t}
          language={language}
          loading={reviewsLoading}
          error={reviewsError}
        />
        <TrustSection translations={t} />
        <ProSignupSection translations={t} />
      </main>
      
      <Footer translations={t} />
    </div>
  );
}