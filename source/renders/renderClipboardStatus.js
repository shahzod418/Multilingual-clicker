export default (status, element) => {
  switch (status) {
    case 'copied':
      element.firstChild.classList.remove('bi-clipboard');
      element.firstChild.classList.add('bi-clipboard-check');
      element.setAttribute('style', 'pointer-events: none;');
      break;

    case 'uncopied':
      element.firstChild.classList.remove('bi-clipboard-check');
      element.firstChild.classList.add('bi-clipboard');
      element.removeAttribute('style');
      break;

    default:
      break;
  }
};
