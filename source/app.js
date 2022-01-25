import elements from './components/elements';

import initView from './view';
import handleSwitchLanguage from './handlers/handleSwitchLanguage';
import handleAddClicksCount from './handlers/handleAddClicksCount';
import handleResetClicksCount from './handlers/handleResetClicksCount';
import handleInputValid from './handlers/handleInputValid';
import handleModalOpen from './handlers/handleModalOpen';
import handleAccordionToggle from './handlers/handleAccordionToggle';
import handleModalClose from './handlers/handleModalClose';
import handleAddLanguage from './handlers/handleAddLanguage';

export default (i18n, state) => {
  const watched = initView(i18n, state, elements);

  elements.lngToggle.addEventListener('click', handleSwitchLanguage(watched));
  elements.clicksButton.addEventListener('click', handleAddClicksCount(watched));
  elements.resetButton.addEventListener('click', handleResetClicksCount(watched));
  elements.forms.fileForm.fileInput.addEventListener('change', handleInputValid(watched));
  elements.forms.accordionForm.header.addEventListener(
    'click',
    handleAccordionToggle(elements, watched),
  );
  elements.modal.openButton.addEventListener('click', handleModalOpen(watched));
  elements.modal.closeButton.addEventListener('click', handleModalClose(watched));
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
