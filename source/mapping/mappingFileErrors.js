import buildError from '../functions/buildError';

export default (field, error, elements) => {
  switch (field) {
    case 'file':
      buildError(elements.forms.fileForm.fileLabel, error);
      break;

    case 'language':
      buildError(elements.forms.fileForm.languageInput, error);
      break;

    default:
      break;
  }
};
