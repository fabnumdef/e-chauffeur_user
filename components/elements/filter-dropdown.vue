<template>
  <div class="select">
    <select :id="type" @change="changeValue">
      <option hidden>{{ current }}</option>
      <option
        v-for="item in list"
        :value="item"
      >{{ item }}</option>
    </select>
  </div>
</template>

<script>
  export default {
    name: 'filter-dropdown',
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
      }
    },
    methods: {
      changeValue({ target }) {
        this.$emit('filter-results', { key: this.type, value: target.value });
      }
    }
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
