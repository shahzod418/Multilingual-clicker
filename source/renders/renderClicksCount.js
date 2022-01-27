export default (i18n, state, element) => {
  element.textContent = i18n.t('buttons.counter.count_interval', {
    postProcess: 'interval',
    count: state.clicksCount,
  });
};
