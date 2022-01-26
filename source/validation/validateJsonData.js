import { has, isObject } from 'lodash';
import example from '../components/example.json';

export default (data) => {
  const errors = [];

  Object.entries(example).forEach(([key, value]) => {
    if (isObject(value)) {
      Object.entries(value).forEach(([keyDeep, valueDeep]) => {
        if (!isObject(valueDeep)) {
          if (has(data, `${key}.${keyDeep}`)) return;
          errors.push(keyDeep);
        }
        if (isObject(value)) return;
        errors.push(value);
      });
    }
    if (has(data, key)) return;
    errors.push(key);
  });

  return errors;
};
