<template>
  <div class="field">
    <label
      v-if="label"
      :for="id"
      class="label"
    >
      {{ label }}
    </label>
    <div class="control">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: null,
    },
    id: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
  .label::first-letter {
    text-transform: capitalize;
  }
</style>
