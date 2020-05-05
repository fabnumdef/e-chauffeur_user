/* eslint-disable no-param-reassign */
export const state = () => ({
  campuses: [],
});

export const getters = {
  campuses: (s) => s.campuses,
};

export const mutations = {
  setCampuses(s, campuses) {
    s.campuses = campuses;
  },
};

export const actions = {
  async fetchCampuses({ commit }) {
    const { data } = await this.$api.query('campuses').setMask('id,name,phone(everybody)').list();
    commit('setCampuses', data);
  },
};
