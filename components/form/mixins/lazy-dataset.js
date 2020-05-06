import errorsManagementMixin from '~/helpers/mixins/errors-management';

export default (entity, {
  key = entity, mask = ',', listQuery = ((api, options = {}) => api.query(entity)
    .setMask(mask)
    .list()
    .setOffset(0)
    .setLimit(30)
    .setSearchTerm(options.search)),
} = {}) => ({
  mixins: [
    errorsManagementMixin(),
  ],
  props: {
    [key]: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      list: this[key] || (this.value ? [].concat(this.value) : []),
    };
  },
  async mounted() {
    if (this[key]) {
      return;
    }
    await this.handleCommonErrorsBehavior(async () => {
      const { data } = await listQuery.call(this, this.$api);
      this.list = data;
    });
  },
  computed: {
    getObjectValue() {
      return this.list.find(({ id } = {}) => this.value && (id === this.value.id));
    },
  },
});
