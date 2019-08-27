<template>
  <main>
    <div class="container">
      <div class="title has-text-centered">
        Renseignez votre adresse mail, un code de réinitialisation de mot de passe vous sera envoyé.
      </div>
      <pre-register is-white />
      <p class="has-text-centered">
        <help-button>Besoin d'aide ?</help-button>
      </p>
    </div>
  </main>
</template>

<script>
import preRegister from '~/components/pre-register.vue';
import helpButton from '~/components/help.vue';

export default {
  layout: 'blue-background',
  auth: false,
  components: {
    preRegister,
    helpButton,
  },
};
</script>

<style scoped lang="scss">
  @import "~assets/css/head";
  .container {
    margin: 10px auto;
    width: 100%;
    max-width: 440px;
  }

  .title {
    font-size: 1.7rem;
    margin: 50px 0;
  }
</style>
