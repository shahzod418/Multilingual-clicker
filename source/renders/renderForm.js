export default (status, element) => {
  switch (status) {
    case 'filling':
      element.fileForm.submitButton.removeAttribute('disabled');
      element.accordionForm.submitButton.removeAttribute('disabled');
      break;

    case 'failed':
      element.fileForm.submitButton.removeAttribute('disabled');
      element.accordionForm.submitButton.removeAttribute('disabled');
      break;

    case 'loading':
      element.fileForm.submitButton.setAttribute('disabled', true);
      element.accordionForm.submitButton.setAttribute('disabled', true);
      break;

    default:
      throw Error(`Unknown form status: ${status}`);
  }
};
