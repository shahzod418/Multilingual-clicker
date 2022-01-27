import buildError from '../functions/buildError';

export default (field, error, elements) => {
  switch (field) {
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
      throw new Error(`Unknown field: ${field}`);
  }
};
