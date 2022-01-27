import validate from '../validation/validate';

export default (state) =>
  async ({ target }) => {
    const { form } = target.dataset;
    const { field } = target.dataset;
    const type = target.dataset.validate;

    if (target.files) {
      const error = await validate(type, target.files[0]);

      if (!error) {
        state.uiState.file.status = 'loaded';
      }

      state.forms.errors = error;
    } else {
      state.forms.errors = await validate(type, target.value);
    }

    if (state.forms.errors) {
      state.forms[form].fields[field].error = state.forms.errors;
      state.forms.valid = false;
      return state.forms.errors;
    }

    state.forms[form].fields[field].error = null;
    state.forms.valid = true;

    return null;
  };
