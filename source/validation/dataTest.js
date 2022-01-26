import validateJsonData from './validateJsonData';

export default (data) => {
  const errors = validateJsonData(JSON.parse(data));
  if (errors.length === 0) return true;
  throw new Error(`Keys not found: ${errors.join(', ')}`);
};
