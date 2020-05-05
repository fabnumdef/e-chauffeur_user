<template>
  <div
    class="b-numberinput field"
    :class="fieldClasses"
  >
    <p class="control">
      <button
        type="button"
        class="button"
        :class="buttonClasses"
        :disabled="disabled || disabledMin"
        @click="decrement()"
      >
        <fa-icon
          icon="minus"
          pack="fas"
        />
      </button>
    </p>

    <b-input
      v-model.number="computedValue"
      type="number"
      :step="newStep"
      :max="max"
      :min="min"
      :disabled="disabled"
      custom-class="number-input"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
    />

    <p class="control">
      <button
        type="button"
        class="button"
        :class="buttonClasses"
        :disabled="disabled || disabledMax"
        @click="increment()"
      >
        <fa-icon
          icon="plus"
          pack="fas"
        />
      </button>
    </p>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: {
      type: Number,
      default: 1,
    },
    min: {
      type: [Number, String],
      default: null,
    },
    max: {
      type: [Number, String],
      default: null,
    },
    step: {
      type: [Number, String],
      default: null,
    },
    disabled: Boolean,
    type: {
      type: String,
      default: 'is-primary',
    },
    controlsPosition: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      newValue: !Number.isNaN(this.value) ? this.value : parseFloat(this.min) || 0,
      newStep: this.step || 1,
    };
  },
  computed: {
    computedValue: {
      get() {
        return this.newValue;
      },
      set(value) {
        let newValue = value;
        if (value === '') {
          newValue = parseFloat(this.min) || 0;
        }
        this.newValue = newValue;
        this.$emit('input', newValue);
      },
    },
    fieldClasses() {
      return [
        { 'has-addons': this.controlsPosition === 'compact' },
        { 'is-grouped': this.controlsPosition !== 'compact' },
      ];
    },
    buttonClasses() {
      return [
        this.type,
        this.size,
      ];
    },
    minNumber() {
      return typeof this.min === 'string'
        ? parseFloat(this.min) : this.min;
    },
    maxNumber() {
      return typeof this.max === 'string'
        ? parseFloat(this.max) : this.max;
    },
    stepNumber() {
      return typeof this.newStep === 'string'
        ? parseFloat(this.newStep) : this.newStep;
    },
    disabledMin() {
      return (this.computedValue - this.stepNumber) < this.minNumber;
    },
    disabledMax() {
      return (this.computedValue + this.stepNumber) > this.maxNumber;
    },
    stepDecimals() {
      const step = this.stepNumber.toString();
      const index = step.indexOf('.');
      if (index >= 0) {
        return step.substring(index + 1).length;
      }
      return 0;
    },
  },
  watch: {
    value(value) {
      this.newValue = value;
    },
  },
  methods: {
    decrement() {
      if (typeof this.minNumber === 'undefined'
          || (this.computedValue - this.stepNumber) >= this.minNumber) {
        const value = this.computedValue - this.stepNumber;
        this.computedValue = parseFloat(value.toFixed(this.stepDecimals));
      }
    },
    increment() {
      if (typeof this.maxNumber === 'undefined'
          || (this.computedValue + this.stepNumber) <= this.maxNumber) {
        const value = this.computedValue + this.stepNumber;
        this.computedValue = parseFloat(value.toFixed(this.stepDecimals));
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "~assets/css/head";
  /deep/ .number-input {
    text-align: center;
    -moz-appearance:textfield;
    display: inline-block;
    width: 45px;
    color: $white;
    background: $blue-light;
    border-radius: $gap;
    padding-right: calc(0.625em - 1px) !important;

    &::-webkit-inner-spin-button, &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
  .control .button {
    border: 1px solid $white;
    border-radius: $gap;
    background: transparent;
    .svg {
      height: 10px;
    }
  }
</style>
