import renderModal from '../renders/renderModal';
import renderForm from '../renders/renderForm';
import renderToast from '../renders/renderToast';
import renderError from '../renders/renderError';
import renderClicksCount from '../renders/renderClicksCount';
import renderButtons from '../renders/renderButtons';
import renderTexts from '../renders/renderTexts';
import renderFooter from '../renders/renderFooter';
import renderButtonStatus from '../renders/renderButtonStatus';
import { i18n } from '../init';
import elements from '../components/elements';

export default (state) => {
  return {
    'uiState.modal.visibility': () => renderModal(state.uiState.modal.visibility, elements),
    'uiState.file.status': () =>
      renderButtonStatus(state.uiState.file.status, elements.forms.fileForm.fileLabel),
    'uiState.clipboard.status': () =>
      renderButtonStatus(state.uiState.clipboard.status, elements.modal.clipboardButton),
    'forms.valid': () => {
      elements.forms.fileForm.submitButton.disabled = !state.forms.valid;
      elements.forms.accordionForm.submitButton.disabled = !state.forms.valid;
    },
    'forms.status': () => {
      renderForm(state.forms.status, elements.forms);
    },
    'forms.error': () => renderToast(elements.toast.container),
    'forms.fileForm.fields.file.error': () => renderError(state, elements),
    'forms.fileForm.fields.language.error': () => renderError(state, elements),
    'forms.accordionForm.fields.language.error': () => renderError(state, elements),
    'forms.accordionForm.fields.code.error': () => renderError(state, elements),
    'forms.accordionForm.fields.json.error': () => renderError(state, elements),
    clicksCount: () => renderClicksCount(i18n, state, elements.clicksButton),
    languages: () => renderButtons(state),
    selectedLanguage: () =>
      i18n.changeLanguage(state.selectedLanguage).then(() => {
        renderButtons(state, elements.lngToggle);
        renderClicksCount(i18n, state, elements.clicksButton);
        renderTexts(i18n, elements);
        renderFooter(i18n, elements);
        renderError(state, elements);
      }),
  };
};
