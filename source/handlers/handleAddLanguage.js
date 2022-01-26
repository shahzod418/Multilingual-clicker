import has from 'lodash/has';
import isNull from 'lodash/isNull';
import isEmpty from 'lodash/isEmpty';
import handleInputValid from './handleInputValid';
import readFileAsync from '../readFile/readFileAsync';

const mappingInputs = async (elements, watched, errors) => {
  return Promise.all(
    Object.entries(elements).map(async ([, element]) => {
      if (has(element.attributes, 'data-form')) {
        const error = await handleInputValid(watched)({ target: element });
        if (!isNull(error)) errors.push(error);
      }
    }),
  );
};

const getLanguage = async (formData) => {
  const name = formData.get('language');

  if (formData.has('file')) {
    const file = formData.get('file');
    const code = file.name.match(/[^.json]/gm).join('');
    const fileData = await readFileAsync(file);

    return { code, value: JSON.parse(fileData), name };
  }

  const json = formData.get('json');

  return { code: formData.get('code'), value: JSON.parse(json), name };
};

export default (elements, watched, i18n) => async (event) => {
  event.preventDefault();
  const errors = [];

  await mappingInputs(elements, watched, errors);

  if (!isEmpty(errors)) return;

  const formData = new FormData(event.target);

  const language = await getLanguage(formData);

  try {
    watched.forms.status = 'loading';
    await i18n.addResourceBundle(language.code, 'translation', language.value);
    await i18n.reloadResources();
    watched.uiState.file.status = 'unloaded';
    watched.forms.status = 'filling';
    watched.languages[language.code] = language.name;
    watched.selectedLanguage = language.code;
    elements.form.reset();
  } catch (error) {
    watched.forms.status = 'failed';
    throw error;
  }
};
