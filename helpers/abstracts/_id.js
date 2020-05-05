function passProps(props) {
  return Object.keys(props).map((k) => ({ [k]: this[k] }));
}

export default ({
  id = 'id',
  query,
  mask,
  key,
  props = {},
  layout = 'default',
  customGet = (cb) => cb,
  customQuery = (cb) => cb,
} = {}) => ({
  layout,
  props,
  async asyncData({ $api, store, params }) {
    const { data } = customGet(
      customQuery(
        $api.query(query).setMask(mask),
        { store, params },
      ).get(params[id]),
      { store, params },
    );

    return {
      [key]: data,
    };
  },
  render(createElement) {
    return createElement('nuxt-child', { attrs: { [key]: this[key], ...passProps(this.props) } });
  },
});
