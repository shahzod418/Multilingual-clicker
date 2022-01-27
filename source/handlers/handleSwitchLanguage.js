import mappingInputs from '../functions/mappingInputs';
import elements from '../components/elements';

export default (state) => async (evt) => {
  const { lng } = evt.target.dataset;

  state.selectedLanguage = lng;

  await mappingInputs(elements.forms.fileForm, state);
  await mappingInputs(elements.forms.accordionForm, state);
};
