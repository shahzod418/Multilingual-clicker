import buildError from './buildError';

export default (path, error, elements) => {
  switch (path) {
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
