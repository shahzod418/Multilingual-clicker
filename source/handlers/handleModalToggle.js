export default (watched) => ({target}) => {
  if (target.id === 'modal' || target.type === 'button') {
    watched.uiState.modal.visibility =
        watched.uiState.modal.visibility === 'hidden' ? 'shown' : 'hidden';
  }
};
