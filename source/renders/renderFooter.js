import author from '../components/author.json';

export default (i18n, elements) => {
  elements.footerText.innerHTML = '';

  const link = document.createElement('a');
  link.setAttribute('target', '_blank');
  link.setAttribute('href', author.link);
  link.classList.add('text-decoration-none', 'text-muted');
  link.textContent = author.name;

  const text = document.createTextNode(`${author.copyright} `);

  elements.footerText.append(text, link);
};
