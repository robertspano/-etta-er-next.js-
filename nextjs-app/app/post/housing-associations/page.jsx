'use client';

import { useTranslations } from '../../../contexts/TranslationsContext';
import HousingAssociationsGrid from '../../../components/HousingAssociationsGrid';

export default function HousingAssociationsPage() {
  const { translations, language } = useTranslations();
  
  return <HousingAssociationsGrid translations={translations} language={language} />;
}