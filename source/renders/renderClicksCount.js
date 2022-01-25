export default (i18n, state, clicksButton) => {
  clicksButton.textContent = i18n.t('buttons.counter.count_interval', {
    postProcess: 'interval',
    count: state.clicksCount,
  });
};
