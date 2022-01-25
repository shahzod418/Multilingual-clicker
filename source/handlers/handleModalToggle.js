export default (watched) => () => {
  watched.uiState.modal.visibility =
    watched.uiState.modal.visibility === 'hidden' ? 'shown' : 'hidden';
};
