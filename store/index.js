/* eslint-disable no-param-reassign */

export const state = () => ({
  rideId: '',
  driverPosition: null,
});

export const mutations = {
  setRideId(s, rideId) {
    s.rideId = rideId;
  },
  setDriverPosition(s, position) {
    s.driverPosition = position;
  },
};

export const actions = {
  socket_positionUpdate({ commit }, payload) {
    const position = {
      coordinates: payload.position,
    };
    commit('setDriverPosition', position);
  },
};
