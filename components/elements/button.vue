<template>
  <button
    :class="classes"
    class="button"
  >
    <slot />
  </button>
</template>
<script>
const classModifiers = ['danger', 'inverted', 'fullwidth'];
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
