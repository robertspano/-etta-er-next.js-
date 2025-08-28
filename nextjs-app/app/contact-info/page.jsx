'use client';

import React from 'react';
import ContactInfo from '../../components/ContactInfo';
import { useTranslations } from '../../contexts/TranslationsContext';

export default function ContactInfoPage() {
  const { language, setLanguage } = useTranslations();
  
  return (
    <ContactInfo language={language} setLanguage={setLanguage} />
  );
}