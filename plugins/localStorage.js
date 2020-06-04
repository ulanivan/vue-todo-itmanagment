import createPersistedState from 'vuex-persistedstate';

export default ({store}) => {
  window.onNuxtReady(() => {
    createPersistedState({
      key: 'notes',
      paths: ['notes'],
    })(store);
  });
};
