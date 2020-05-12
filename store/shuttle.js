/* eslint-disable no-param-reassign */

export const state = () => ({
  factory: {},
  type: null,
});

export const getters = {
  factory: (s) => s.factory,
};

export const mutations = {
  setFactory(s, factory) {
    s.factory = factory;
  },
};
