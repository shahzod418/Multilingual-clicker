import schema from './schema';

export default async (type, value) => {
  try {
    await schema[type].validate(value);
    return null;
  } catch (error) {
    return error.message;
  }
};
