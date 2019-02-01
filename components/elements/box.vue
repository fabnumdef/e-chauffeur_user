<template>
  <div class="box" :class="classes">
    <slot />
  </div>
</template>
<script>
export default {
  props: {
  },
  computed: {
    classes() {
      return {
      };
    },
  },
};
</script>
<style lang="scss">
  @import "~assets/css/head";
  @import "~bulma/sass/elements/box.sass";

</style>
