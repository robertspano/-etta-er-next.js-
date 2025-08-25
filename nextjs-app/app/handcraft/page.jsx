'use client';

import React from 'react';
import HandcraftCategoryPage from '../../components/HandcraftCategoryPage';
import { useTranslations } from '../../contexts/TranslationsContext';

export default function HandcraftPage() {
  const { language, translations } = useTranslations();
  
  return (
    <HandcraftCategoryPage 
      translations={translations} 
      language={language} 
    />
  );
}