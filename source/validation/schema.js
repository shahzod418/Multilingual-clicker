import * as yup from 'yup';
import { i18n } from '../init';
import readFileAsync from '../functions/readFileAsync';
import validateData from './validateData';

yup.setLocale({
  mixed: {
    required: () => i18n.t('validate.require'),
  },
  string: {
    required: () => i18n.t('validate.require'),
    matches: () => i18n.t('validate.matches'),
  },
});

export default {
  file: yup
    .mixed()
    .required()
    .test('fileSize', (file) => {
      if (file) {
        if (file.size <= 2000) return true;
        throw new Error(i18n.t('validate.require'));
      }
      return null;
    })
    .test('fileType', (file) => {
      if (file) {
        if (file.type === 'application/json') return true;
        throw new Error(i18n.t('validate.type'));
      }
      return null;
    })
    .test('fileFormat', (file) =>
      readFileAsync(file).then((data) => {
        try {
          JSON.parse(data);
          return true;
        } catch (error) {
          throw new Error(i18n.t('validate.format'));
        }
      }),
    )
    .test('fileData', (file) => readFileAsync(file).then((data) => validateData(data))),
  input: yup
    .string()
    .required()
    .matches(/^[a-zA-Z]+$/g),
  json: yup
    .string()
    .required()
    .test('jsonFormat', (data) => {
      if (data === '') return null;
      try {
        JSON.parse(data);
        return true;
      } catch (error) {
        throw new Error(i18n.t('validate.format'));
      }
    })
    .test('jsonData', (data) => {
      if (data === '') return null;
      return validateData(data);
    }),
};
