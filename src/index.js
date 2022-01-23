import '../assets/style.scss';
import initApp from './init';
import app from './app';

initApp().then(({ i18n, state }) => app(i18n, state));

// const form = document.getElementById('collapse-form');
//
// form.addEventListener('submit', (event) => {
//     event.preventDefault();
//
//     const formData = new FormData(event.target);
//     if (formData.get('language-xxl')) console.log('xxl');
//     if (formData.get('language')) console.log('sm');
// });
