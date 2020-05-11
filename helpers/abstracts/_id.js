export default ({
  id = 'id',
  query,
  mask,
  key,
  propsToPass = [],
  props = {},
  layout = 'default',
  customGet = (cb) => cb,
  customQuery = (cb) => cb,
} = {}) => ({
  layout,
  props,
  async asyncData({ $api, store, params }) {
    const { data } = await customGet(
      customQuery(
        $api.query(query).setMask(mask),
        { store, params },
      ).get(params[id]),
      { store, params },
    );

    console.log(data);

    return {
      [key]: data,
    };
  },
  render(createElement) {
    return createElement('nuxt-child', {
      attrs: {
        [key]: this[key],
        ...propsToPass.reduce((acc, k) => ({ ...acc, [k]: this[k] }), {}),
      },
    });
  },
});
