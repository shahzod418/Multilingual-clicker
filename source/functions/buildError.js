export default (element, error) => {
  const container = element.parentElement;

  const invalidFeedback = container.querySelector('.invalid-feedback');
  if (invalidFeedback) invalidFeedback.remove();

  if (!error) {
    element.classList.remove('is-invalid');
    return;
  }

  element.classList.add('is-invalid');

  const feedback = document.createElement('div');
  feedback.classList.add('invalid-feedback', 'text-center');
  feedback.textContent = error;

  element.after(feedback);
};
