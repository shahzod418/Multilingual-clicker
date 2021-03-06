export default (i18n, elements) => {
  elements.toast.body.textContent = i18n.t('toast');
  elements.modal.title.textContent = i18n.t('forms.example');
  elements.modal.openButton.textContent = i18n.t('forms.example');
  elements.header.textContent = i18n.t('header');
  elements.resetButton.textContent = i18n.t('buttons.reset');
  elements.forms.fileForm.addLanguageLabel.textContent = i18n.t('forms.label');
  elements.forms.fileForm.languageLabel.textContent = i18n.t('forms.languageLabel');
  elements.forms.fileForm.languageInput.setAttribute('placeholder', i18n.t('forms.placeholder'));
  elements.forms.fileForm.submitButton.textContent = i18n.t('forms.submit');
  elements.forms.accordionForm.header.textContent = i18n.t('forms.accordionHeader');
  elements.forms.accordionForm.languageLabel.textContent = i18n.t('forms.placeholder');
  elements.forms.accordionForm.codeLabel.textContent = i18n.t('forms.code');
  elements.forms.accordionForm.submitButton.textContent = i18n.t('forms.submit');

  const clipboardIcon = document.createElement('i');
  clipboardIcon.classList.add('bi', 'bi-clipboard');
  const clipboardText = document.createTextNode(` ${i18n.t('forms.copy')}`);

  elements.modal.clipboardButton.innerHTML = '';
  elements.modal.clipboardButton.append(clipboardIcon, clipboardText);

  const fileLoadIcon = document.createElement('i');
  fileLoadIcon.classList.add('bi', 'bi-file-arrow-down');
  const fileLoadText = document.createTextNode(` ${i18n.t('forms.file')}`);

  elements.forms.fileForm.fileLabel.innerHTML = '';
  elements.forms.fileForm.fileLabel.append(fileLoadIcon, fileLoadText);
};
