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
    <template
      slot="singleLabel"
      slot-scope="{option}"
    >
      <span class="option__title">{{ option.name }}</span>
      <span
        v-if="option.phone && option.phone.everybody"
        class="option__phone"
      >
        {{ option.phone.everybody | phone }}
      </span>
    </template>
  </vue-multiselect>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  filters: {
    phone: (phone) => phone.replace(/[^0-9]/g, '')
      .replace(/(\d{2})(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})/, '(+$1)$2 $3 $4 $5 $6'),
  },
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
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapGetters('campus', ['campuses']),
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
