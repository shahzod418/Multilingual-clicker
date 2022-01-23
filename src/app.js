import initView from './view';

const handleSwitchLanguage = (state) => (evt) => {
  const { lng } = evt.target.dataset;

  state.selectedLanguage = lng;
};

const handleAccordionToogle = (accordion, watched) => () => {
  if (accordion.classList.contains('show')) {
    watched.uiState.accordion.visibility = 'hidden';
  } else {
    watched.uiState.accordion.visibility = 'shown';
  }
};

export default (i18n, state) => {
  const elements = {
    header: document.querySelector('h1'),
    lngToggle: document.querySelector('[role="group"]'),
    clickerContainer: document.getElementById('clicker'),
    clicksButton: document.getElementById('clicksButton'),
    resetButton: document.getElementById('resetButton'),
    forms: {
      fileForm: {
        form: document.querySelector('#file-form'),
        addLanguageLabel: document.querySelector('label[for="add-language"]'),
        fileLabel: document.querySelector('label[for="file-form-input"]'),
        languageLabel: document.querySelector('label[for="file-form-language"]'),
        languageInput: document.querySelector('#file-form-language'),
        submitButton: document.querySelector('#add-language'),
      },
      accordionForm: {
        form: document.querySelector('#accordion-form'),
        header: document.querySelector('button[data-bs-toggle="collapse"]'),
        languageLabel: document.querySelector('label[for="input-language"]'),
        languageLabelLarge: document.querySelector('label[for="input-language-xxl"]'),
        languageInput: document.querySelector('#input-language'),
        languageInputLarge: document.querySelector('#input-language-xxl'),
        codeLabel: document.querySelector('label[for="input-code"]'),
        codeLabelLarge: document.querySelector('label[for="input-code-xxl"]'),
        codeInput: document.querySelector('#input-code'),
        codeInputLarge: document.querySelector('#input-code-xxl'),
        exampleButton: document.querySelector('#example'),
        submitButton: document.querySelector('#add-json'),
      },
    },
  };

  const watched = initView(i18n, state, elements);

  elements.forms.accordionForm.header.addEventListener(
    'click',
    handleAccordionToogle(elements.forms.accordionForm.form, watched),
  );

  elements.lngToggle.addEventListener('click', handleSwitchLanguage(watched));
};
