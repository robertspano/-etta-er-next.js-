'use client';

import React from 'react';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from '../../../contexts/TranslationsContext';
import JobPostingWizard from '../../../components/JobPostingWizard';

const HousingAssociationsPostingWrapper = () => {
  const { translations, language } = useTranslations();
  const searchParams = useSearchParams();
  const subcategory = searchParams.get('subcategory');

  return (
    <JobPostingWizard 
      translations={translations} 
      language={language} 
      category="housingAssociations"
      subcategory={subcategory}
    />
  );
};

const HousingAssociationsPostingPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HousingAssociationsPostingWrapper />
    </Suspense>
  );
};

export default HousingAssociationsPostingPage;