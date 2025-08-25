'use client';

import React from 'react';
import AllCategoriesOverview from '../../components/AllCategoriesOverview';
import { useTranslations } from '../../contexts/TranslationsContext';

export default function AllCategoriesPage() {
  const { language, translations } = useTranslations();
  
  return (
    <AllCategoriesOverview 
      translations={translations} 
      language={language}
    />
  );
}