import onChange from 'on-change';

import renderModal from './renders/renderModal';
import renderForm from './renders/renderForm';
import renderError from './renders/renderError';
import renderClicksCount from './renders/renderClicksCount';
import renderButtons from './renders/renderButtons';
import renderTexts from './renders/renderTexts';
import renderFooter from './renders/renderFooter';

export default (i18n, state, elements) => {
  const mapping = {
    'uiState.modal.visibility': () => renderModal(state.uiState.modal.visibility, elements),
    'forms.valid': () => {
      elements.forms.fileForm.submitButton.disabled = !state.forms.valid;
      elements.forms.accordionForm.submitButton.disabled = !state.forms.valid;
    },
    'forms.status': () => {
      renderForm(state.forms.status, elements.forms);
    },
    'forms.fileForm.fields.file.error': () =>
      renderError(state.forms.fileForm.fields.file.error, elements.forms.fileForm.fileInput),
    'forms.fileForm.fields.language.error': () =>
      renderError(
        state.forms.fileForm.fields.language.error,
        elements.forms.fileForm.languageInput,
      ),
    'forms.accordionForm.fields.language.error': () =>
      renderError(
        state.forms.accordionForm.fields.language.error,
        elements.forms.accordionForm.languageInput,
      ),
    'forms.accordionForm.fields.code.error': () =>
      renderError(
        state.forms.accordionForm.fields.code.error,
        elements.forms.accordionForm.codeInput,
      ),
    'forms.accordionForm.fields.json.error': () =>
      renderError(
        state.forms.accordionForm.fields.json.error,
        elements.forms.accordionForm.jsonInput,
      ),
    clicksCount: () => renderClicksCount(i18n, state, elements.clicksButton),
    languages: () => renderButtons(state),
    selectedLanguage: () =>
      i18n.changeLanguage(state.selectedLanguage).then(() => {
        renderButtons(state, elements.lngToggle);
        renderClicksCount(i18n, state, elements.clicksButton);
        renderTexts(i18n, elements);
        renderFooter(i18n, elements);
      }),
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
