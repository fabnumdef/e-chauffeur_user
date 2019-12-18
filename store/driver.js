/* eslint-disable no-param-reassign */

export const state = () => ({
  user: {},
  date: '',
  position: {},
});

export const getters = {
  position: (s) => s.position,
  carPosition: (s) => {
    const [lon, lat] = s.position.coordinates;
    return [lat, lon];
  },
};

export const mutations = {
  setUser(s, user) {
    s.user = user;
  },
  setDriverPosition(s, { position, date }) {
    s.position = position;
    s.date = date;
  },
};
