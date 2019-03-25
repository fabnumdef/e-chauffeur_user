export const ENTITY_PLURAL = 'forms';

export default axios => ({
  async postFormContact(fields) {
    return axios.post(
      `/${ENTITY_PLURAL}/contact`,
      fields,
    );
  },
});
