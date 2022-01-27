export default (state, element) => {
  element.innerHTML = '';

  Object.entries(state.languages).forEach(([code, language]) => {
    const btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.setAttribute('data-lng', code);
    const className = state.selectedLanguage === code ? 'btn-primary' : 'btn-outline-primary';
    btn.classList.add('btn', 'mb-3', className);
    btn.textContent = language;
    element.append(btn);
  });
};
