'use client';

import React from 'react';
import PasswordlessLogin from '../../components/PasswordlessLogin';
import { useTranslations } from '../../contexts/TranslationsContext';

export default function PasswordlessLoginPage() {
  const { language, setLanguage } = useTranslations();
  
  return (
    <PasswordlessLogin language={language} setLanguage={setLanguage} />
  );
}