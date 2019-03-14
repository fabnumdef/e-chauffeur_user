import qs from 'qs';

export const ENTITY_PLURAL = 'forms';
export const ENTITY = 'form';

export default axios => ({
  async postFormContact(fields) {
    return axios.post(
      `/${ENTITY_PLURAL}/contact`,
      qs.stringify(fields),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
  },
});
