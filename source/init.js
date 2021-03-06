import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import intervalPlural from 'i18next-intervalplural-postprocessor';

import en from '../locales/en.json';
import ru from '../locales/ru.json';

const initI18n = async (i18n) => {
  await i18n.use(LanguageDetector).use(intervalPlural).init({
    debug: false,
    resources: {
      en,
      ru,
    },
  });
};

export const i18n = i18next.createInstance();

export default async () => {
  await initI18n(i18n);

  const state = {
    uiState: {
      file: {
        status: 'unloaded',
      },
      modal: {
        visibility: 'hidden',
      },
      clipboard: {
        status: 'uncopied',
      },
    },
    languages: {
      en: 'English',
      ru: 'Русский',
    },
    selectedLanguage: i18n.language,
    clicksCount: 0,
    forms: {
      valid: true,
      status: 'filling',
      error: null,
      fileForm: {
        fields: {
          file: {
            error: null,
          },
          language: {
            error: null,
          },
        },
      },
      accordionForm: {
        fields: {
          language: {
            error: null,
          },
          code: {
            error: null,
          },
          json: {
            error: null,
          },
        },
      },
    },
  };

  return state;
};
