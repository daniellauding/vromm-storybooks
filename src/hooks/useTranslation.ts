import { useTranslation as useI18nTranslation } from 'react-i18next';

export function useTranslation(namespace?: string) {
  const { t, i18n } = useI18nTranslation(namespace);
  
  return {
    t,
    i18n,
    language: i18n.language,
    changeLanguage: i18n.changeLanguage,
  };
}

export default useTranslation; 