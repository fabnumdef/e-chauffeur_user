<template>
  <vue-multiselect
    :options="pois"
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
export default {
  props: {
    campus: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      pois: [],
      loading: false,
    };
  },
  async mounted() {
    this.loading = true;
    const { data } = await this.$api.pois(this.campus, 'id,label').getPois({ offset: 0, limit: 1000 });
    this.loading = false;
    this.pois = data;
  },
};
</script>
