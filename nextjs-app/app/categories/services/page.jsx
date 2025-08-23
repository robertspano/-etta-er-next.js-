'use client';

import { useTranslations } from '../../../contexts/TranslationsContext';
import ServicesCategoryPage from '../../../components/ServicesCategoryPage';

export default function ServicesPage() {
  const { translations, language } = useTranslations();
  
  return <ServicesCategoryPage translations={translations} language={language} />;
}