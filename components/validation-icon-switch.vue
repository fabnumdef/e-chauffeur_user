<template>
  <fa-icon
    v-if="state"
    icon="check-circle"
    class="icon is-success"
  />
  <fa-icon
    v-else
    icon="times-circle"
    class="icon is-danger"
  />
</template>
<script>
export default {
  props: {
    state: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss" scoped>
  @import "~assets/css/head";

  .icon {
    &.is-success {
      color: $success;
    }
    &.is-danger {
      color: $danger;
    }
  }
</style>
