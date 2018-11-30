<template>
  <div
    :class="{'is-horizontal': isHorizontal}"
    class="field">
    <div
      v-if="label"
      class="field-label is-normal">
      <label
        :for="fieldId"
        class="label">{{ label }}</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control">
          <float-label>
            <slot />
          </float-label>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import floatLabel from 'vue-float-label/components/FloatLabel';

export default {
  components: {
    floatLabel,
  },
  props: {
    isHorizontal: {
      type: Boolean,
      default: true,
    },
    label: {
      type: String,
      default: null,
    },
    fieldId: {
      type: String,
      default: null,
    },
  },
};
</script>

<style scoped lang="scss">
  @import "~assets/css/head";
.control {
  margin-top: 1.3em;
}
</style>
