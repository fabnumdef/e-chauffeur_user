<template>
  <vue-multiselect
    :options="list"
    track-by="id"
    label="label"
    :loading="loading"
    :searchable="false"
    :show-labels="false"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script>
import lazyDataset from '~/components/form/selects/mixins/lazy-dataset';

const POIS = 'pois';

export default {
  mixins: [lazyDataset(POIS, {
    mask: 'id,label',
    listQuery: async function listQuery(api, options = {}) {
      return api.query(this.entity)
        .setCampus(this.campus.id)
        .setMask(this.mask)
        .list()
        .setOffset(0)
        .setLimit(30)
        .setSearchTerm(options.search);
    },
  })],
  props: {
    campus: {
      type: Object,
      required: true,
    },
  },
};
</script>
