import { has, isObject } from 'lodash';
import example from '../components/example.json';

export default (data) => {
  const error = [];

  Object.entries(data).forEach(([key, value]) => {
    if (isObject(value)) {
      Object.entries(value).forEach(([keyDeep, valueDeep]) => {
        if (!isObject(valueDeep)) {
          return error.push(has(example, `${key}.${keyDeep}`));
        }
        return error.push(isObject(value));
      });
    }
    return error.push(has(example, key));
  });

  return !error.includes(false);
};
