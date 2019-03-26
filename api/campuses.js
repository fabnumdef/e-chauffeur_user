export const ENTITY_PLURAL = 'campuses';

export default axios => ({
  async getCampuses(mask, { search = null } = {}) {
    const response = await axios.get(
      `/${ENTITY_PLURAL}`,
      {
        params: { mask, search },
      },
    );

    return response;
  },
});
