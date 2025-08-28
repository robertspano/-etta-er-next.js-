'use client';

import React from 'react';
import LoginWithPassword from '../../components/LoginWithPassword';
import { useTranslations } from '../../contexts/TranslationsContext';

export default function LoginWithPasswordPage() {
  const { language, setLanguage } = useTranslations();
  
  return (
    <LoginWithPassword language={language} setLanguage={setLanguage} />
  );
}