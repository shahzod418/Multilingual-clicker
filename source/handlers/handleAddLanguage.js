import isEmpty from 'lodash/isEmpty';
import getLanguage from '../functions/getLanguage';
import mappingInputs from '../functions/mappingInputs';

export default (elements, state, i18n) => async (event) => {
  event.preventDefault();
  const errors = [];

  await mappingInputs(elements, state, errors);

  if (!isEmpty(errors)) return;

  const formData = new FormData(event.target);

  const language = await getLanguage(formData);

  try {
    state.forms.status = 'loading';
    await i18n.addResourceBundle(language.code, 'translation', language.value);
    await i18n.reloadResources();
    state.uiState.file.status = 'unloaded';
    state.forms.status = 'filling';
    state.languages[language.code] = language.name;
    state.selectedLanguage = language.code;
    elements.form.reset();
  } catch (error) {
    state.forms.status = 'failed';
    state.forms.error = error;
  }
};
