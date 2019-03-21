const CONTENT_TYPE_JSON = 'application/json';
export const ENTITY_PLURAL = 'forms';

export default axios => ({
  async postFormContact(fields) {
    return axios.post(
      `/${ENTITY_PLURAL}/contact`,
      JSON.stringify(fields),
      {
        headers: {
          'Content-Type': CONTENT_TYPE_JSON,
        },
      },
    );
  },
});
