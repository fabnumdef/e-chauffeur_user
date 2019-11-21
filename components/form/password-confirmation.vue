<template>
  <div>
    <input
      v-validate="'required'"
      v-bind="$attrs"
      type="password"
      class="input"
      :class="{ 'is-danger': !isValid || errors.has('password')}"
      :value="val || value"
      name="password_confirmation"
      data-vv-as="Mot de passe (confirmation)"
      :placeholder="'Tapez votre mot de passe (confirmation)'"
      @input="input"
    >
    <p
      v-if="!isValid"
      class="help is-danger"
    >
      La confirmation de mot de passe ne correspond pas.
    </p>
  </div>
</template>
<script>

export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    compareTo: {
      type: String,
      default: '',
    },
    minLength: {
      type: Number,
      default: 8,
    },
  },
  data: () => ({
    val: null,
  }),
  computed: {
    isValid() {
      return (this.compareTo || '') === (this.val || this.value || '');
    },
  },
  methods: {
    input({ target = {} } = {}) {
      this.val = target.value;
      this.$emit(
        'input',
        target.value,
      );
    },
  },
};
</script>
