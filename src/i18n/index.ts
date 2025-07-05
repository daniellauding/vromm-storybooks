import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation files
import enTranslations from './locales/en.json';
import svTranslations from './locales/sv.json';
import esTranslations from './locales/es.json';

const resources = {
  en: {
    translation: enTranslations,
  },
  sv: {
    translation: svTranslations,
  },
  es: {
    translation: esTranslations,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    
    interpolation: {
      escapeValue: false, // react already does escaping
    },
    
    // Development only
    debug: (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') || false,
    
    // Translation loading
    load: 'languageOnly',
    
    // Pluralization
    pluralSeparator: '_',
    contextSeparator: '_',
    
    // React specific options
    react: {
      useSuspense: false,
    },
  });

export default i18n; 