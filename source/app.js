import elements from './components/elements';

import initView from './view';
import handleSwitchLanguage from './handlers/handleSwitchLanguage';
import handleAddClicksCount from './handlers/handleAddClicksCount';
import handleResetClicksCount from './handlers/handleResetClicksCount';
import handleInputValid from './handlers/handleInputValid';
import handleModalToggle from './handlers/handleModalToggle';
import handleAddLanguage from './handlers/handleAddLanguage';
import handleWriteClipboard from './handlers/handleWriteClipboard';

export default (i18n, state) => {
  const watched = initView(i18n, state, elements);

  elements.lngToggle.addEventListener('click', handleSwitchLanguage(watched));
  elements.clicksButton.addEventListener('click', handleAddClicksCount(watched));
  elements.resetButton.addEventListener('click', handleResetClicksCount(watched));
  elements.forms.fileForm.fileInput.addEventListener('change', handleInputValid(watched));
  elements.modal.element.addEventListener('click', handleModalToggle(watched));
  elements.modal.openButton.addEventListener('click', handleModalToggle(watched));
  elements.modal.clipboardButton.addEventListener('click', handleWriteClipboard(watched));
  elements.forms.fileForm.languageInput.addEventListener('input', handleInputValid(watched));
  elements.forms.accordionForm.languageInput.addEventListener('input', handleInputValid(watched));
  elements.forms.accordionForm.codeInput.addEventListener('input', handleInputValid(watched));
  elements.forms.accordionForm.jsonInput.addEventListener('input', handleInputValid(watched));
  elements.forms.fileForm.form.addEventListener(
    'submit',
    handleAddLanguage(elements.forms.fileForm, watched, i18n),
  );
  elements.forms.accordionForm.form.addEventListener(
    'submit',
    handleAddLanguage(elements.forms.accordionForm, watched, i18n),
  );
};
