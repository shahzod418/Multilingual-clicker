export default (watched) =>
  ({ target }) => {
    if (target.id === 'modal' || target.dataset.bs === 'modal') {
      watched.uiState.modal.visibility =
        watched.uiState.modal.visibility === 'hidden' ? 'shown' : 'hidden';
    }
  };
