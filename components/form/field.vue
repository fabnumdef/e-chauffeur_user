<template>
  <div
    class="field"
    :type="getType(id)"
    :message="getError(id, label)"
  >
    <label
      v-if="label || $slots.label"
      :for="id"
      class="label"
    >
      <slot name="label">
        {{ label }}
      </slot>
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
  methods: {
    getError(path, label) {
      const error = (this.errors || {})[path];
      if (!error) {
        return null;
      }
      switch (error.kind) {
        case 'required':
          return `Le champ ${label} est requis`;
        default:
          return `Le champ ${label} comporte une erreur`;
      }
    },
    getType(path) {
      if (!this.errors) {
        return null;
      }
      return this.errors[path] ? 'is-danger' : 'is-success';
    },
  },
};
</script>

<style lang="scss" scoped>
  .label::first-letter {
    text-transform: capitalize;
  }
</style>
