/* eslint-disable no-param-reassign */

export const state = () => ({});

export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('campus/fetchCampuses');
  },
  socket_positionUpdate({ commit }, { position, date }) {
    const pos = {
      coordinates: position,
    };
    commit('driver/setDriverPosition', { position: pos, date });
  },
  socket_rideUpdate({ commit }, payload) {
    commit('ride/setRide', payload);
  },
};
