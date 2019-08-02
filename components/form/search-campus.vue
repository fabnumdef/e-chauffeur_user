<template>
  <vue-multiselect
    :id="id"
    :options="campuses"
    :value="value"
    track-by="id"
    label="name"
    :loading="loading"
    :searchable="false"
    :show-labels="false"
    :placeholder="placeholder"
    @input="onInput"
  >
    <template slot="singleLabel" slot-scope="{option}">
      <span class="option__title">{{ option.name }}</span>
      <span class="option__phone" v-if="option.phone && option.phone.everybody">
        {{option.phone.everybody | phone}}
      </span>
    </template>
  </vue-multiselect>
</template>
<script>

export default {
  props: {
    id: {
      type: String,
      default: '',
    },
    value: {
      type: Object,
      default: () => ({}),
    },
    placeholder: {
      type: String,
      default: null,
    },
  },
  filters: {
    phone: phone => phone.replace(/[^0-9]/g, '')
      .replace(/(\d{2})(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})/, '(+$1)$2 $3 $4 $5 $6'),
  },
  data() {
    return {
      campuses: [],
      loading: false,
    };
  },
  async mounted() {
    this.loading = true;
    const { data } = await this.$api.campuses.getCampuses('id,name,phone(everybody)');
    this.loading = false;
    this.campuses = data;
  },
  methods: {
    onInput(data) {
      this.$emit('input', data);
    },
  },
};
</script>
<style scoped lang="scss">
  @import "~assets/css/head";
  .option__title {
    text-transform: uppercase;
    font-weight: bold;
    &:after {
      content: ' :';
    }
  }
</style>
