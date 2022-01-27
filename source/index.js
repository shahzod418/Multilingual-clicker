import '../assets/style.scss';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import initApp from './init';
import app from './app';

initApp().then((state) => app(state));
