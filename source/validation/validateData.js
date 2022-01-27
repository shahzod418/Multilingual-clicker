import validateJsonData from './validateJsonData';
import { i18n } from '../init';

export default (data) => {
  const errors = validateJsonData(JSON.parse(data));
  if (errors.length === 0) return true;
  throw new Error(`${i18n.t('validate.data')}: ${errors.join(', ')}`);
};
