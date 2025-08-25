'use client';

import React from 'react';
import ElectricianPage from '../../../components/ElectricianPage';
import { useTranslations } from '../../../contexts/TranslationsContext';

export default function ElectricianPageRoute() {
  const { language, translations } = useTranslations();
  
  return (
    <ElectricianPage 
      translations={translations} 
      language={language} 
    />
  );
}