import mappingFileErrors from '../functions/mappingFileErrors';
import mappingAccordionErrors from '../functions/mappingAccordionErrors';

export default (state, elements) => {
  Object.entries(state.forms.fileForm.fields).forEach(([field, value]) => {
    if (value.error) {
      mappingFileErrors(field, value.error, elements);
    }
  });

  Object.entries(state.forms.accordionForm.fields).forEach(([field, value]) => {
    if (value.error) {
      mappingAccordionErrors(field, value.error, elements);
    }
  });
};
