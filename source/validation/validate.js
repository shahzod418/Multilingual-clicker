import * as yup from 'yup';
import isUndefined from 'lodash/isUndefined';
import readFileAsync from '../readFile/readFileAsync';

const schema = {
  file: yup
    .mixed()
    .test('Empty', 'Add file', (file) => !isUndefined(file))
    .test('fileSize', 'File Size is too large', (file) => {
      if (isUndefined(file)) return true;
      return file.size <= 2000;
    })
    .test('fileType', 'Unsupported File Format', (file) => {
      if (isUndefined(file)) return true;
      return file.type === 'application/json';
    })
    .test('JSON', 'Invalid JSON format', (file) =>
      readFileAsync(file).then((data) => {
        try {
          JSON.parse(data);
          return true;
        } catch (error) {
          return false;
        }
      }),
    ),
  input: yup
    .string()
    .required()
    .matches(/^[a-zA-Z]+$/g, 'Latin letters only without space'),
  json: yup
    .string()
    .required()
    .test('JSON', 'Invalid JSON format', (string) => {
      try {
        JSON.parse(string);
        return true;
      } catch (error) {
        return false;
      }
    }),
};

export default async (type, value) => {
  try {
    await schema[type].validate(value);
    return null;
  } catch (error) {
    return error.message;
  }
};
