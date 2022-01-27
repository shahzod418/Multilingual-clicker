import onChange from 'on-change';

import renderClicksCount from './renders/renderClicksCount';
import renderButtons from './renders/renderButtons';
import renderTexts from './renders/renderTexts';
import renderFooter from './renders/renderFooter';
import mappingView from './functions/mappingView';

export default (i18n, state, elements) => {
  const watchedState = onChange(state, (path) => {
    if (mappingView(state)[path]) {
      mappingView(state)[path]();
    }
  });

  renderButtons(state, elements.lngToggle);
  renderTexts(i18n, elements);
  renderClicksCount(i18n, state, elements.clicksButton);
  renderFooter(i18n, elements);

  return watchedState;
};
