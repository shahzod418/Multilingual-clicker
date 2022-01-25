import author from '../components/author.json';

export default (i18n, elements) => {
  elements.footerText.innerHTML = '';

  const link = document.createElement('a');
  link.setAttribute('target', '_blank');
  link.setAttribute('href', author.link);
  link.textContent = author.name;

  const text = document.createTextNode(`${i18n.t('footer')} `);

  elements.footerText.append(text, link);
};
