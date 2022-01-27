export default (status, element) => {
    switch (status) {
        case 'loaded':
            element.firstChild.classList.remove('bi-file-arrow-down');
            element.firstChild.classList.add('bi-file-check');
            element.setAttribute('style', 'pointer-events: none;');
            break;

        case 'unloaded':
            element.firstChild.classList.remove('bi-file-check');
            element.firstChild.classList.add('bi-file-arrow-down');
            element.removeAttribute('style');
            break;

        default:
            break;
    }
};
