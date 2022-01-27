import mappingFileErrors from '../mapping/mappingFileErrors';
import mappingAccordionErrors from '../mapping/mappingAccordionErrors';

export default (state, elements) => {
  Object.entries(state.forms.fileForm.fields).forEach(([field, value]) => {
    mappingFileErrors(field, value.error, elements);
  });

  Object.entries(state.forms.accordionForm.fields).forEach(([field, value]) => {
    mappingAccordionErrors(field, value.error, elements);
  });
};
