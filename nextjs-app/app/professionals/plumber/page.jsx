'use client';

import React from 'react';
import PlumberPage from '../../../components/PlumberPage';
import { useTranslations } from '../../../contexts/TranslationsContext';

export default function PlumberPageRoute() {
  const { language, translations } = useTranslations();
  
  return (
    <PlumberPage 
      translations={translations} 
      language={language} 
    />
  );
}