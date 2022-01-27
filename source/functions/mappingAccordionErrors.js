import buildError from './buildError';

export default (path, error, elements) => {
  switch (path) {
    case 'language':
      buildError(elements.forms.accordionForm.languageInput, error);
      break;

    case 'code':
      buildError(elements.forms.accordionForm.codeInput, error);
      break;

    case 'json':
      buildError(elements.forms.accordionForm.jsonInput, error);
      break;

    default:
      break;
  }
};
