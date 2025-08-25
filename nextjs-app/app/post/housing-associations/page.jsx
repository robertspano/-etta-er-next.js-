'use client';

import React from 'react';
import HousingAssociationsGrid from '../../../components/HousingAssociationsGrid';
import { useTranslations } from '../../../contexts/TranslationsContext';

export default function HousingAssociationsPostPage() {
  const { language, translations } = useTranslations();
  
  return (
    <HousingAssociationsGrid 
      translations={translations} 
      language={language}
    />
  );
}