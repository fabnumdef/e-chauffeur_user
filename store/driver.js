/* eslint-disable no-param-reassign */

export const state = () => ({
  user: {},
  date: '',
  position: {},
});

export const getters = {
  position: (s) => s.position,
  carPosition: (s) => {
    if (
      s.position
      && s.position.coordinates
    ) {
      /*
       * Error report :
       * s.position.coordinates is an array composed of lon & lat fetched in asyncData
       * Websockets send back new datas when driver's position update
       * Data is sent with correct format by API but
       * when it arrives in this function, it becomes an object : s.position.coordinates.coordinates
       *
       * Here is a dummy fix to make the magic but it's not the cleanest one.
       */
      if (s.position.coordinates.coordinates) {
        const [lon, lat] = s.position.coordinates.coordinates;
        return [lat, lon];
      }
      const [lon, lat] = s.position.coordinates;
      return [lat, lon];
    }
    return null;
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
