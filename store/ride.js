/* eslint-disable no-param-reassign */
export const state = () => ({
  ride: {},
});

export const mutations = {
  setRide(s, ride) {
    s.ride = ride;
  },
};
