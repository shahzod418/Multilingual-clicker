import example from '../components/example.json';

export default (watched) => async () => {
  try {
    await navigator.clipboard.writeText(JSON.stringify(example, null, '  '));
    watched.uiState.clipboard.status = 'copied';
    setTimeout(() => {
      watched.uiState.clipboard.status = 'uncopied';
    }, 5000);
  } catch (error) {
    watched.uiState.clipboard.status = 'uncopied';
  }
};
