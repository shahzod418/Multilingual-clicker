export default (elements, watched) => () => {
  if (elements.forms.accordionForm.form.classList.contains('show')) {
    watched.uiState.accordion.visibility = 'hidden';
  } else {
    watched.uiState.accordion.visibility = 'shown';
  }
};
