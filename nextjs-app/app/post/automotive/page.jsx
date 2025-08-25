'use client';

import React from 'react';
import AutomotiveStep1 from '../../../components/AutomotiveStep1';
import { useTranslations } from '../../../contexts/TranslationsContext';

export default function AutomotivePostPage() {
  const { language, translations } = useTranslations();
  
  return (
    <AutomotiveStep1 
      translations={translations} 
      language={language}
    />
  );
}