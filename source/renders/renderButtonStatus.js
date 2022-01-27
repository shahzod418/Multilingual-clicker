export default (status, element) => {
  const bi = element.firstChild;

  switch (status) {
    case 'copied':
    case 'loaded':
      if (bi.classList.contains('bi-clipboard')) {
        bi.classList.remove('bi-clipboard');
        bi.classList.add('bi-clipboard-check');
      } else {
        bi.classList.remove('bi-file-arrow-down');
        bi.classList.add('bi-file-check');
      }
      element.setAttribute('style', 'pointer-events: none;');
      break;

    case 'uncopied':
    case 'unloaded':
      if (bi.classList.contains('bi-clipboard')) {
        bi.classList.remove('bi-clipboard-check');
        bi.classList.add('bi-clipboard');
      } else {
        bi.classList.remove('bi-file-check');
        bi.classList.add('bi-file-arrow-down');
      }
      element.removeAttribute('style');
      break;

    default:
      throw new Error(`Unknown status: ${status}`);
  }
};
