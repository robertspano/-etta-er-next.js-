'use client';

import { useTranslations } from '../../../contexts/TranslationsContext';
import HouseGardenCategoryPage from '../../../components/HouseGardenCategoryPage';

export default function HouseGardenPage() {
  const { translations, language } = useTranslations();
  
  return <HouseGardenCategoryPage translations={translations} language={language} />;
}