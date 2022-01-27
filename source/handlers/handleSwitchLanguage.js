import mappingInputs from '../mapping/mappingInputs';
import elements from '../components/elements';

export default (state) => (evt) => {
  const { lng } = evt.target.dataset;

  state.selectedLanguage = lng;

  Object.entries(state.forms.fileForm.fields).forEach(([, value]) => {
    if (value.error) mappingInputs(elements.forms.fileForm, state);
  });

  Object.entries(state.forms.accordionForm.fields).forEach(([, value]) => {
    if (value.error) mappingInputs(elements.forms.accordionForm, state);
  });
};
