import example from '../components/example.json';

export default (state) => async () => {
  try {
    await navigator.clipboard.writeText(JSON.stringify(example, null, '  '));
    state.uiState.clipboard.status = 'copied';
    setTimeout(() => {
      state.uiState.clipboard.status = 'uncopied';
    }, 5000);
  } catch (error) {
    state.uiState.clipboard.status = 'uncopied';
  }
};
