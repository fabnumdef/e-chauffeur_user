<template>
  <div class="footer buttons is-centered">
    <button
      type="submit"
      class="button is-primary"
      :disabled="disabled"
    >
      <slot>Valider</slot>
    </button>
    <help-button class="is-pulled-right">
      Une urgence ? Besoin d'aide ?
    </help-button>
  </div>
</template>

<script>
import helpButton from '~/components/help.vue';

export default {
  components: {
    helpButton,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
