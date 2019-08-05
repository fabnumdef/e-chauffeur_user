<template>
  <div>
    <div class="container">
      <div
        id="shape-top-right"
      />
      <div
        id="shape-bottom-left"
        class="is-hidden-touch"
      />
      <ec-header logo-color="blue" />
      <nuxt />
    </div>
    <ec-footer />
  </div>
</template>

<script>
import ecHeader from '~/components/header.vue';
import ecFooter from '~/components/footer.vue';

export default {
  components: {
    ecHeader,
    ecFooter,
  },
};
</script>
<style lang="scss" scoped>
  @import "~assets/css/head";

  .container {
    position: initial;
  }

  #shape-top-right {
    position: absolute;
    top: 0;
    z-index: -1;
    right: 0;
    height: 500px;
    width: 35%;
    background-image: linear-gradient(to right, #5534ff, #288eff 51%, #9df8cf);
    border-bottom-left-radius: 100% 100%;
  }

  #shape-bottom-left {
    position: absolute;
    z-index: -1;
    top: 450px;
    left: 0;
    height: 500px;
    width: 8%;
    background-image: linear-gradient(to top, #ff82a2, #ff5071);
    border-top-right-radius: 150% 65%;
    border-bottom-right-radius: 150% 100%;
  }
</style>
