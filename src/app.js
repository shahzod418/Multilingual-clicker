import * as yup from 'yup';
import has from 'lodash/has.js';
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
      .required()
    .test('fileSize', 'File Size is too large', (file) => file.size <= 200000)
    .test('fileType', 'Unsupported File Format', (file) => file.type === 'application/json')
    .test('JSON', 'Invalid JSON format', (file) => readFileAsync(file).then((data) => {
      try {
        JSON.parse(data)
        return true;
      } catch (error) {
        return false;
      }
    })),
  input: yup.string().required().matches(/^[a-zA-Z]+$/g, 'Latin letters only without space'),
  json: yup
    .string()
    .required()
    .test('JSON', 'Invalid JSON format', (string) => {
      try {
        JSON.parse(string)
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
          const field = target.dataset.field;
          const type = target.dataset.validate;
          let error;
          if (target.files) {
            error = await validate(type, target.files[0])
          } else {
            error = await validate(type, target.value);
          }
          if (error) {
            watched.forms[form].fields[field].error = error;
            watched.forms.valid = false;
            return;
          }

          watched.forms[form].fields[field].error = null;
          watched.forms.valid = true;
        };

const handleSwitchLanguage = (state) => (evt) => {
  const { lng } = evt.target.dataset;

  state.selectedLanguage = lng;
};

const handleClicksCount = (state) => () => {
  state.clicksCount += 1;
};

const resetClicksCount = (state) => () => {
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

  elements.clicksButton.addEventListener('click', handleClicksCount(watched));

  elements.resetButton.addEventListener('click', resetClicksCount(watched));

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

  elements.forms.fileForm.form.addEventListener('submit', (event) => {
    event.preventDefault();

    Object.entries(elements.forms.fileForm).forEach(([, element]) => {
      if (has(element.attributes, 'data-form')) {
        handleInputValid(watched)({ target: element });
      }
    });

    event.target.reset();
  });

  elements.forms.accordionForm.form.addEventListener('submit', (event) => {
    event.preventDefault();

    Object.entries(elements.forms.accordionForm).forEach(([, element]) => {
      if (has(element.attributes, 'data-form')) {
        handleInputValid(watched)({ target: element });
      }
    });

    event.target.reset();
  });
};
