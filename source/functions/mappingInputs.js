import has from 'lodash/has';
import handleInputValid from '../handlers/handleInputValid';

export default async (elements, state, errors) => {
  return Promise.all(
    Object.entries(elements).map(async ([, element]) => {
      if (has(element.attributes, 'data-form')) {
        const error = await handleInputValid(state)({ target: element });
        if (error) {
          if (errors) errors.push(error);
        }
      }
    }),
  );
};
