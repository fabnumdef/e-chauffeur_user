<template>
  <div class="select">
    <select
      :id="type"
      @change="changeValue"
    >
      <option
        v-for="item in list"
        :key="item"
        :value="item"
        :selected="current === item"
      >
        {{ type === 'month' ? getMonthName(item) : item }}
      </option>
    </select>
  </div>
</template>

<script>
import { Info } from 'luxon';

export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    current: {
      type: String,
      required: true,
    },
    list: {
      type: Array,
      required: true,
    },
  },
  computed: {
    months() {
      return Info.months('long');
    },
  },
  methods: {
    changeValue({ target }) {
      this.$emit('filter-results', { key: this.type, value: target.value });
    },
    getMonthName(id) {
      return this.months[parseInt(id, 10) - 1];
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "~assets/css/head";
  $text-color: $blue-medium;
  .select {
    margin-right: 1em;
    select {
      border: 2px solid $text-color;
      color: $primary;
      font-weight: 700;
      text-transform: capitalize;
      option {
        color: initial;
        font-weight: initial;
      }
    }
  }

</style>
