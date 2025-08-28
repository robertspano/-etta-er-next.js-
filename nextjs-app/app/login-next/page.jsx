'use client';

import React from 'react';
import LoginNext from '../../components/LoginNext';
import { useTranslations } from '../../contexts/TranslationsContext';

export default function LoginNextPage() {
  const { language, setLanguage } = useTranslations();
  
  return (
    <LoginNext language={language} setLanguage={setLanguage} />
  );
}