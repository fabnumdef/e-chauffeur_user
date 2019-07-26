<template>
  <div>
    <div class="container">
      <div id="shape-top" />
      <ec-header />
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

  $text-color-blue: $blue-medium;

  .container {
    position: initial;
  }

  #shape-top {
    position: absolute;
    top: 0;
    left: 0;
    height: 600px;
    width: 100%;
    background-image: linear-gradient(to right, #5534ff, #288eff 51%, #9df8cf);
    border-bottom-left-radius: 100% 150%;
    border-bottom-right-radius: 150% 200%;
  }

  @media screen and (max-width: $desktop) {
    #shape-top {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  @media screen and (max-width: $tablet) {
    #shape-top {
      height: 525px;
    }
  }

</style>
