export default (status, elements) => {
  switch (status) {
    case 'hidden':
      elements.forms.accordionForm.form.classList.remove('show');
      break;

    case 'shown':
      elements.forms.accordionForm.form.classList.add('show');
      break;

    default:
      throw new Error(`Unknown status: ${status}`);
  }
};
