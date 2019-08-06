<template>
  <div class="container">
    <h1 class="title">
      Une erreur s'est produite
    </h1>
    <div class="box">
      <p>
        {{ error.message }}
      </p>

      <nuxt-link
        class="button is-primary"
        to="/"
      >
        Retour à l'accueil
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => ({}),
    },
  },
  layout: 'blue-background',
};
</script>

<style scoped lang="scss">
  @import "~assets/css/head";
  .box p {
    padding-bottom: 2rem;
  }
</style>
