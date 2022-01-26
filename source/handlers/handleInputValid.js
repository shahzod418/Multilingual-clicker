import validate from '../validation/validate';

export default (watched) =>
  async ({ target }) => {
    const { form } = target.dataset;
    const { field } = target.dataset;
    const type = target.dataset.validate;

    if (target.files) {
      const error = await validate(type, target.files[0]);

      if (!error) {
        watched.uiState.file.status = 'loaded';
      }

      watched.forms.errors = error;
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
