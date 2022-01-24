import initView from './view';

const handleSwitchLanguage = (state) => (evt) => {
  const { lng } = evt.target.dataset;

  state.selectedLanguage = lng;
};

const handleClicksCount = (state) => () => {
  state.clicksCount += 1;
};

const resetClicksCount = (state) => () => {
  state.clicksCount = 0;
};

const handleAccordionToggle = (elements, watched) => () => {
  if (elements.forms.accordionForm.form.classList.contains('show')) {
    watched.uiState.accordion.visibility = 'hidden';
  } else {
    watched.uiState.accordion.visibility = 'shown';
  }
};

const handleModalOpen = (watched) => () => {
  watched.uiState.modal.visibility = 'shown';
};

const handleModalClose = (watched) => () => {
  watched.uiState.modal.visibility = 'hidden';
};

export default (i18n, state) => {
  const elements = {
    header: document.querySelector('h1'),
    lngToggle: document.querySelector('[role="group"]'),
    clickerContainer: document.querySelector('#clicker'),
    clicksButton: document.querySelector('#clicksButton'),
    resetButton: document.querySelector('#resetButton'),
    modal: {
      element: document.querySelector('#modal'),
      title: document.querySelector('.modal-title'),
      body: document.querySelector('.modal-body'),
      closeButton: document.querySelector('[data-bs-dismiss="modal"]'),
    },
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
    footerText: document.querySelector('#footer-text'),
  };

  const watched = initView(i18n, state, elements);

  elements.lngToggle.addEventListener('click', handleSwitchLanguage(watched));

  elements.clicksButton.addEventListener('click', handleClicksCount(watched));

  elements.resetButton.addEventListener('click', resetClicksCount(watched));

  elements.forms.accordionForm.header.addEventListener(
    'click',
    handleAccordionToggle(elements, watched),
  );

  elements.forms.accordionForm.exampleButton.addEventListener('click', handleModalOpen(watched));

  elements.modal.closeButton.addEventListener('click', handleModalClose(watched));
};
