<template>
  <main>
    <div class="columns is-centered">
      <div class="title has-text-centered column is-6">
        Pour vous inscrire, entrez tout d'abord votre courriel professionnel
      </div>
    </div>

    <div class="columns is-centered">
      <pre-register
        :is-white="true"
        class="column is-6"
      />
    </div>
  </main>
</template>

<script>
import preRegister from '~/components/pre-register.vue';

export default {
  auth: false,
  layout: 'blue-background',
  components: {
    preRegister,
  },
};
</script>

<style lang="scss" scoped>
  @import "~assets/css/head";
  .title {
    font-size: 2em;
    margin-top: 5em;
    color: $white;
  }

  a {
    display: block;
    color: $blue-light;
  }

  input::placeholder {
    color: $white;
  }
</style>
