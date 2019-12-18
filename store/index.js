/* eslint-disable no-param-reassign */

export const state = () => ({});

export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('campus/fetchCampuses');
  },
  socket_positionUpdate({ commit }, { position, date }) {
    commit('driver/setDriverPosition', { position, date });
  },
  socket_rideUpdate({ commit }, payload) {
    commit('ride/setRide', payload);
  },
};
