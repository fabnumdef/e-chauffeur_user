/* eslint-disable no-param-reassign */
export const state = () => ({
  ride: {},
});

export const getters = {
  ride: (s) => s.ride,
  rideId: (s, g) => g.ride.id,
};

export const mutations = {
  setRide(s, ride) {
    s.ride = ride;
  },
};
