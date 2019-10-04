<template>
  <div class="background">
    <section class="wrapper">
      <div class="container">
        <ec-header />
      </div>
      <nuxt />
    </section>
    <ec-footer class="footer" />
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
<style scoped lang="scss">
  @import "~assets/css/head";
  .background {
    background: linear-gradient(75deg, rgb(80, 62, 255), rgb(41, 143, 255), rgb(116, 211, 224)) no-repeat top;
    background-size:100% 100%;
    @include desktop {
      background-size:100% 540px;
    }

    height: 100vh;
    margin: 0;
    position: relative;
  }
  .wrapper, .footer {
    z-index: 1;
  }
  .wrapper {
    min-height: 100%;
    margin-bottom: -$footer-height;
    &:after {
      content: " ";
      display: block;
      width: 0;
      height: $footer-height;
    }
  }
</style>
