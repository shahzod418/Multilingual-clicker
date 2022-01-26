export default (state) =>
  ({ target }) => {
    if (target.id === 'modal' || target.dataset.bs === 'modal') {
      state.uiState.modal.visibility =
        state.uiState.modal.visibility === 'hidden' ? 'shown' : 'hidden';
    }
  };
