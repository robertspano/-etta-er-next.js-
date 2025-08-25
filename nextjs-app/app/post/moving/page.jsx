'use client';

import React from 'react';
import MovingCategoryPicker from '../../../components/MovingCategoryPicker';
import { useTranslations } from '../../../contexts/TranslationsContext';

export default function MovingPostPage() {
  const { language, translations } = useTranslations();
  
  return (
    <MovingCategoryPicker 
      translations={translations} 
      language={language}
    />
  );
}