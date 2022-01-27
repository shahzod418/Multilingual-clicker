export default (status, element) => {
  const bi = element.firstChild;

  if (bi.classList.contains('bi-clipboard')) {
    bi.classList.toggle('bi-clipboard');
    bi.classList.toggle('bi-clipboard-check');
  } else {
    bi.classList.toggle('bi-file-arrow-down');
    bi.classList.toggle('bi-file-check');
  }

  switch (status) {
    case 'copied':
    case 'loaded':
      element.setAttribute('style', 'pointer-events: none;');
      break;

    case 'uncopied':
    case 'unloaded':
      element.removeAttribute('style');
      break;

    default:
      throw new Error(`Unknown status: ${status}`);
  }
};
