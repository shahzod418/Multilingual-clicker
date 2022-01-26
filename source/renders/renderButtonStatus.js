export default (i18n, status, element) => {
  switch (status) {
    case 'copied':
    case 'loaded':
      element.textContent = '\u2713';
      element.setAttribute('style', 'pointer-events: none;');
      break;

    case 'uncopied':
    case 'unloaded':
      if (element.id === 'file-form-input') {
        element.textContent = i18n.t('forms.file');
      } else {
        element.textContent = i18n.t('forms.copy');
      }
      element.removeAttribute('style');
      break;

    default:
      break;
  }
};
