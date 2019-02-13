<template>
  <div
    :class="classes"
    class="notification"
  >
    <slot />
  </div>
</template>
<script>
const classModifiers = ['primary'];

export default {
  props: {
    ...classModifiers.reduce((acc, curr) => Object.assign(acc, { [curr]: { type: Boolean, default: false } }), {}),
  },
  computed: {
    classes() {
      return {
        ...classModifiers.reduce((acc, curr) => Object.assign(acc, { [`is-${curr}`]: !!this[curr] }), {}),
      };
    },
  },
};
</script>
<style lang="scss">
  @import "~assets/css/head";
  @import "~bulma/sass/elements/notification.sass";
</style>
