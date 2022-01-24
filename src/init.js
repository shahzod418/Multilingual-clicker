import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resources from './resources';

export default async () => {
  const i18n = i18next.createInstance();
  await i18n.use(LanguageDetector).init({
    debug: false,
    resources,
  });

  const state = {
    uiState: {
      accordion: {
        visibility: 'hidden',
      },
      modal: {
        visibility: 'hidden',
      },
    },
    languages: {
      en: 'English',
      ru: 'Русский',
    },
    selectedLanguage: i18n.language,
    clicksCount: 0,
    forms: {
      fileForm: {
        valid: true,
        status: 'filling',
        fields: {
          file: {
            error: null,
            value: '',
          },
          language: {
            error: null,
            value: '',
          },
        },
      },
      accordionForm: {
        valid: true,
        status: 'filling',
        fields: {
          language: {
            error: null,
            value: '',
          },
          code: {
            error: null,
            value: '',
          },
          json: {
            error: null,
            value: '',
          },
        },
      },
    },
  };

  return { i18n, state };
};
