/* eslint-disable no-param-reassign */
export const RIDE = 'rides';
export const SHUTTLE = 'shuttles';
export const TRANSPORT = 'transports';

export function isValidType(type) {
  return [RIDE, SHUTTLE, TRANSPORT].includes(type);
}

export const state = () => ({
  displacement: {},
  type: null,
});

export const getters = {
  type: (s) => s.type,
  displacement: (s) => s.displacement,
  displacementId: (s, g) => g.displacement.id,
};

export const mutations = {
  setDisplacement(s, displacement) {
    s.displacement = displacement;
  },
  setPois(s, pois) {
    s.displacement = {
      ...s.displacement,
      ...pois,
    };
  },
  setType(s, type) {
    if (isValidType(type)) {
      s.type = type;
    }
  },
};
