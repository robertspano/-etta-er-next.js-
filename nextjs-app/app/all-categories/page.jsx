'use client';

import { useTranslations } from '../../contexts/TranslationsContext';
import AllCategoriesOverview from '../../components/AllCategoriesOverview';

export default function AllCategoriesPage() {
  const { translations, language } = useTranslations();
  
  return <AllCategoriesOverview translations={translations} language={language} />;
}