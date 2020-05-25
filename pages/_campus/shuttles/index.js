export default () => ({
  props: {
    campus: {
      type: Object,
      default: () => ({}),
    },
  },
  render(createElement) {
    return createElement('nuxt-child', {
      attrs: {
        campus: this.campus,
      },
    });
  },
});
