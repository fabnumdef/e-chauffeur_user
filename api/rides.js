export const ENTITY_PLURAL = 'rides';
export const ENTITY = 'ride';

export default axios => mask => ({
  async getRide(id, token) {
    return axios.get(
      `/${ENTITY_PLURAL}/${id}`,
      {
        params: {
          mask,
          token,
        },
      },
    );
  },

  async getDriverPosition(id, token) {
    try {
      return await axios.get(
        `/${ENTITY_PLURAL}/${id}/position`,
        {
          params: {
            mask: 'driver,date,position',
            token,
          },
        },
      );
    } catch (e) {
      return {};
    }
  },

  async mutateRide(id, action) {
    return axios.post(
      `/${ENTITY_PLURAL}/${id}/${action}`,
      {},
      {
        params: { mask },
      },
    );
  },
});
