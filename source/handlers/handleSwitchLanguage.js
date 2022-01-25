export default (state) => (evt) => {
  const { lng } = evt.target.dataset;

  state.selectedLanguage = lng;
};
