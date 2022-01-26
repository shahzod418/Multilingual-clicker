import * as yup from 'yup';
import readFileAsync from '../functions/readFileAsync';
import validateJsonData from './validateJsonData';

const schema = {
  file: yup
    .mixed()
    .required()
    .test('fileSize', 'File Size is too large', (file) => {
      if (file) {
        return file.size <= 2000;
      }
      return null;
    })
    .test('fileType', 'Unsupported File Format', (file) => {
      if (file) {
        return file.type === 'application/json';
      }
      return null;
    })
    .test('fileFormat', 'Invalid JSON format', (file) =>
      readFileAsync(file).then((data) => {
        try {
          JSON.parse(data);
          return true;
        } catch (error) {
          return null;
        }
      }),
    )
    .test('fileData', (file) =>
      readFileAsync(file).then((data) => {
          const errors = validateJsonData(JSON.parse(data));
          if (errors.length === 0) return true;
          throw new Error(`Keys not found: ${errors.join((', '))}`);
      }),
    ),
  input: yup
    .string()
    .required()
    .matches(/^[a-zA-Z]+$/g, 'Latin letters only without space'),
  json: yup
    .string()
    .required()
    .test('jsonFormat', 'Invalid JSON format', (data) => {
      try {
        JSON.parse(data);
        return true;
      } catch (error) {
        return false;
      }
    })
    .test('jsonData', (data) => {
        const errors = validateJsonData(JSON.parse(data));
        if (errors.length === 0) return true;
        throw new Error(`Keys not found: ${errors.join((', '))}`);
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
