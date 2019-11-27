<template>
  <main>
    <div class="columns">
      <div class="title has-text-centered column is-6 is-offset-2">
        Pour vous inscrire, entrez tout d'abord votre courriel professionnel
      </div>
    </div>

    <div class="columns">
      <pre-register class="column is-6 is-offset-2" />

    </div>

  </main>
</template>

<script>
import PreRegister from '~/components/pre-register';

export default {
  auth: false,
  components: {
    PreRegister,
  },
};
</script>

<style lang="scss" scoped>
  @import "~assets/css/head";
  .title {
    font-size: 2em;
    margin-top: 5em;
    color: $primary;
  }
</style>
