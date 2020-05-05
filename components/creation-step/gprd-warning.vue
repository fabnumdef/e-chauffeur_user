<template>
  <section
    class="white-section"
  >
    <fieldset class="form blue-box">
      Avant toute commande de course, vous devez accepter les conditions d'utilisation
      <nuxt-link :to="{name: 'my-account-edit-account'}">
        au sein de votre compte
      </nuxt-link>.
      <help-button class="has-text-centered">
        Une urgence ? Besoin d'aide ?
      </help-button>
    </fieldset>
  </section>
</template>

<script>
import helpButton from '~/components/help.vue';

export default {
  components: {
    helpButton,
  },
};
</script>

<style scoped>

</style>
