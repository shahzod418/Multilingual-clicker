import readFileAsync from './readFileAsync';

export default async (formData) => {
  const name = formData.get('language');

  if (formData.has('file')) {
    const file = formData.get('file');
    const code = file.name.match(/[^.json]/gm).join('');
    const fileData = await readFileAsync(file);

    return { code, value: JSON.parse(fileData), name };
  }

  const json = formData.get('json');

  return { code: formData.get('code'), value: JSON.parse(json), name };
};
