import onChange from 'on-change';
import author from '../locales/author';
import example from '../locales/example.json';
import * as bootstrap from 'bootstrap';

const renderButtons = (state, container) => {
  container.innerHTML = '';

  Object.entries(state.languages).forEach(([code, language]) => {
    const btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.setAttribute('data-lng', code);
    const className = state.selectedLanguage === code ? 'btn-primary' : 'btn-outline-primary';
    btn.classList.add('btn', 'mb-3', className);
    btn.textContent = language;
    container.append(btn);
  });
};

const renderTexts = (i18n, elements) => {
  elements.modal.title.textContent = i18n.t('forms.example');
  elements.modal.closeButton.textContent = i18n.t('forms.close');
  elements.header.textContent = i18n.t('header');
  elements.resetButton.textContent = i18n.t('buttons.reset');
  elements.forms.fileForm.addLanguageLabel.textContent = i18n.t('forms.label');
  elements.forms.fileForm.fileLabel.textContent = i18n.t('forms.file');
  elements.forms.fileForm.languageLabel.textContent = i18n.t('forms.languageLabel');
  elements.forms.fileForm.languageInput.setAttribute(
    'placeholder',
    i18n.t('forms.languagePlaceholder'),
  );
  elements.forms.fileForm.submitButton.textContent = i18n.t('forms.submit');
  elements.forms.accordionForm.header.textContent = i18n.t('forms.accordionHeader');
  elements.forms.accordionForm.languageLabel.textContent = i18n.t('forms.placeholder');
  elements.forms.accordionForm.languageLabelLarge.textContent = i18n.t('forms.placeholder');
  elements.forms.accordionForm.codeLabel.textContent = i18n.t('forms.code');
  elements.forms.accordionForm.codeLabelLarge.textContent = i18n.t('forms.code');
  elements.forms.accordionForm.exampleButton.textContent = i18n.t('forms.example');
  elements.forms.accordionForm.submitButton.textContent = i18n.t('forms.submit');
};

const renderFooter = (i18n, elements) => {
  elements.footerText.innerHTML = '';

  const link = document.createElement('a');
  link.setAttribute('target', '_blank');
  link.setAttribute('href', author.link);
  link.textContent = author.name;

  const text = document.createTextNode(`${i18n.t('footer')} `);

  elements.footerText.append(text, link);
};

const renderClicksCount = (i18n, state, clicksButton) => {
  clicksButton.textContent = i18n.t('buttons.counter.count', { count: state.clicksCount });
};

const renderForm = () => {};

const renderAccordion = (status, elements) => {
  switch (status) {
    case 'hidden':
      elements.forms.accordionForm.form.classList.remove('show');
      break;

    case 'shown':
      elements.forms.accordionForm.form.classList.add('show');
      break;

    default:
      throw new Error(`Unknown status: ${status}`);
  }
};

const renderModal = (status, elements) => {
  elements.modal.body.innerHTML = '';

  const text = document.createElement('pre');
  text.textContent = JSON.stringify(example,null, '  ');
  elements.modal.body.append(text);

  const modal = new bootstrap.Modal(elements.modal.element);

  switch (status) {
    case 'hidden':
      modal.hide();
      break;

    case 'shown':
      modal.show();
      break;

    default:
      throw new Error(`Unknown status: ${status}`);
  }
};

export default (i18n, state, elements) => {
  const mapping = {
    'uiState.accordion.visibility': () =>
      renderAccordion(state.uiState.accordion.visibility, elements),
    'uiState.modal.visibility': () =>
        renderModal(state.uiState.modal.visibility, elements),
    languages: () => renderButtons(state),
    selectedLanguage: () =>
      i18n.changeLanguage(state.selectedLanguage).then(() => {
        renderButtons(state, elements.lngToggle);
        renderClicksCount(i18n, state, elements.clicksButton);
        renderTexts(i18n, elements);
        renderFooter(i18n, elements);
      }),
    clicksCount: () => renderClicksCount(i18n, state, elements.clicksButton),
    'forms.fileForm.status': () => renderForm(state.forms.fileForm.status, elements),
    'forms.accordionForm.status': () => {},
  };

  const watchedState = onChange(state, (path) => {
    if (mapping[path]) {
      mapping[path]();
    }
  });

  renderButtons(state, elements.lngToggle);
  renderTexts(i18n, elements);
  renderClicksCount(i18n, state, elements.clicksButton);
  renderFooter(i18n, elements);

  return watchedState;
};
