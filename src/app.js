import * as yup from 'yup';
import has from 'lodash/has';
import isNull from "lodash/isNull";
import isUndefined from 'lodash/isUndefined';
import isEmpty from "lodash/isEmpty";
import initView from './view';

const readFileAsync = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = reject;

    reader.readAsText(file);
  });
};

const schema = {
  file: yup
    .mixed()
      .test('Empty', 'Add file', (file) => !isUndefined(file))
    .test('fileSize', 'File Size is too large', (file) => {
      if (isUndefined(file)) return true;
      return file.size <= 2000;
    })
    .test('fileType', 'Unsupported File Format', (file) => {
      if (isUndefined(file)) return true;
      return file.type === 'application/json';
    })
    .test('JSON', 'Invalid JSON format', (file) =>
      readFileAsync(file).then((data) => {
        try {
          JSON.parse(data);
          return true;
        } catch (error) {
          return false;
        }
      }),
    ),
  input: yup
    .string()
    .required()
    .matches(/^[a-zA-Z]+$/g, 'Latin letters only without space'),
  json: yup
    .string()
    .required()
    .test('JSON', 'Invalid JSON format', (string) => {
      try {
        JSON.parse(string);
        return true;
      } catch (error) {
        return false;
      }
    }),
};

const validate = async (type, value) => {
  try {
    await schema[type].validate(value);
    return null;
  } catch (error) {
    return error.message;
  }
};

const handleInputValid =
  (watched) =>
  async ({ target }) => {
    const { form } = target.dataset;
    const { field } = target.dataset;
    const type = target.dataset.validate;

    if (target.files) {
      watched.forms.errors = await validate(type, target.files[0]);
    } else {
      watched.forms.errors = await validate(type, target.value);
    }

    if (watched.forms.errors) {
      watched.forms[form].fields[field].error = watched.forms.errors;
      watched.forms.valid = false;
      return watched.forms.errors;
    }

    watched.forms[form].fields[field].error = null;
    watched.forms.valid = true;

    return null;
  };

const handleSwitchLanguage = (state) => (evt) => {
  const { lng } = evt.target.dataset;

  state.selectedLanguage = lng;
};

const handleAddClicksCount = (state) => () => {
  state.clicksCount += 1;
};

const handleResetClicksCount = (state) => () => {
  state.clicksCount = 0;
};

const handleAccordionToggle = (elements, watched) => () => {
  if (elements.forms.accordionForm.form.classList.contains('show')) {
    watched.uiState.accordion.visibility = 'hidden';
  } else {
    watched.uiState.accordion.visibility = 'shown';
  }
};

const handleModalOpen = (watched) => () => {
  watched.uiState.modal.visibility = 'shown';
};

const handleModalClose = (watched) => () => {
  watched.uiState.modal.visibility = 'hidden';
};

export default (i18n, state) => {
  const elements = {
    header: document.querySelector('h1'),
    lngToggle: document.querySelector('[role="group"]'),
    clickerContainer: document.querySelector('#clicker'),
    clicksButton: document.querySelector('#clicksButton'),
    resetButton: document.querySelector('#resetButton'),
    modal: {
      element: document.querySelector('#modal'),
      title: document.querySelector('.modal-title'),
      body: document.querySelector('.modal-body'),
      openButton: document.querySelector('#example'),
      closeButton: document.querySelector('[data-bs-dismiss="modal"]'),
    },
    forms: {
      fileForm: {
        form: document.querySelector('#file-form'),
        addLanguageLabel: document.querySelector('label[for="add-language"]'),
        fileInput: document.querySelector('#file-form-input'),
        fileLabel: document.querySelector('label[for="file-form-input"]'),
        languageInput: document.querySelector('#file-form-language'),
        languageLabel: document.querySelector('label[for="file-form-language"]'),
        submitButton: document.querySelector('#add-language'),
      },
      accordionForm: {
        form: document.querySelector('#accordion-form'),
        header: document.querySelector('button[data-bs-toggle="collapse"]'),
        languageLabel: document.querySelector('label[for="input-language"]'),
        languageInput: document.querySelector('#input-language'),
        codeLabel: document.querySelector('label[for="input-code"]'),
        codeInput: document.querySelector('#input-code'),
        jsonLabel: document.querySelector('label[for="input-json"]'),
        jsonInput: document.querySelector('#input-json'),
        submitButton: document.querySelector('#add-json'),
      },
    },
    footerText: document.querySelector('#footer-text'),
  };

  const watched = initView(i18n, state, elements);

  elements.lngToggle.addEventListener('click', handleSwitchLanguage(watched));

  elements.clicksButton.addEventListener('click', handleAddClicksCount(watched));

  elements.resetButton.addEventListener('click', handleResetClicksCount(watched));

  elements.forms.fileForm.fileInput.addEventListener('change', handleInputValid(watched));

  elements.forms.accordionForm.header.addEventListener(
    'click',
    handleAccordionToggle(elements, watched),
  );

  elements.modal.openButton.addEventListener('click', handleModalOpen(watched));

  elements.modal.closeButton.addEventListener('click', handleModalClose(watched));

  const textInputs = document.querySelectorAll('input[type="text"]');
  textInputs.forEach((input) => input.addEventListener('input', handleInputValid(watched)));

  elements.forms.accordionForm.jsonInput.addEventListener('input', handleInputValid(watched));

  const handleAddLanguage = (elements, watched) => async (event) => {
    event.preventDefault();
    const language = {};
    const errors = [];

    await Promise.all(Object.entries(elements).map(async ([, element]) => {
      if (has(element.attributes, 'data-form')) {
        const error = await (handleInputValid(watched)({ target: element }));
        if (!isNull(error)) errors.push(error);
      }
    }));

    if (!isEmpty(errors)) return;

    const formData = new FormData(event.target);

    if (formData.has('file')) {
      const file = formData.get('file');
      const code = file.name.match(/[^\.json]/gm).join('');
      const fileData = await readFileAsync(file);
      language.code = code;
      language.value = JSON.parse(fileData);
    } else {
      const json = formData.get('json');
      language.code = formData.get('code');
      language.value = JSON.parse(json);
    }

    language.name = formData.get('language');

    try {
      watched.forms.status = 'loading';
      await i18n.addResourceBundle(language.code, 'translation', language.value);
      await i18n.reloadResources();
      watched.forms.status = 'filling';
      watched.languages[language.code] = language.name;
      watched.selectedLanguage = language.code;
      elements.form.reset();
    } catch (error) {
      watched.forms.status = 'failed';
      throw error;
    }
  };

  elements.forms.fileForm.form.addEventListener('submit', handleAddLanguage(elements.forms.fileForm, watched));

  elements.forms.accordionForm.form.addEventListener('submit', handleAddLanguage(elements.forms.accordionForm, watched));
};
