const dataVuexModule = {
  state: {
    creator: false,
  },

  mutations: {
    setCreator: (state, c) => (state.creator = c),
  },

  getters: {
    creator: (state) => state.creator,
  },
};

export default dataVuexModule;
