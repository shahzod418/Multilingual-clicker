import * as yup from 'yup';
import readFileAsync from '../functions/readFileAsync';
import dataTest from './dataTest';

yup.setLocale({});

export default {
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
    .test('fileData', (file) => readFileAsync(file).then((data) => dataTest(data))),
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
    .test('jsonData', (data) => dataTest(data)),
};
