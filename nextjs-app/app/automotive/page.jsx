'use client';

import React from 'react';
import AutomotivePage from '../../components/AutomotivePage';
import { useTranslations } from '../../contexts/TranslationsContext';

export default function AutomotivePageRoute() {
  const { language, translations } = useTranslations();
  
  return (
    <AutomotivePage 
      translations={translations} 
      language={language} 
    />
  );
}