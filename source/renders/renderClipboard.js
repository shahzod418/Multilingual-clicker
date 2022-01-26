export default (i18n, status, element) => {
  switch (status) {
    case 'copied':
      element.textContent = '\u2713';
      break;

    case 'uncopied':
      element.textContent = i18n.t('forms.copy');
      break;

    default:
      break;
  }
};
