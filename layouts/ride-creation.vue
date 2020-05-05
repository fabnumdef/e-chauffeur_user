<template>
  <div>
    <div class="background">
      <div class="background-image" />
      <section class="wrapper">
        <div class="container">
          <ec-header />
        </div>
        <nuxt />
      </section>
      <ec-footer class="footer" />
    </div>
    <div id="left-shape"></div>
    <div id="right-shape"></div>
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
  #left-shape, #right-shape {
    position: absolute;
    top: 50%;
    z-index: -10;
  }
  #left-shape {
    width: 100px;
    height: 350px;
    background-image: linear-gradient(to top, #ff82a2, #ff5071);
    border-bottom-right-radius: 150% 65%;
    border-top-right-radius: 150% 100%;
  }
  #right-shape {
    right: 0;
    width: 150px;
    height: 400px;
    background-image: linear-gradient(to top, #5534ff, #288eff 51%, #9df8cf);
    border-top-left-radius: 150% 65%;
    border-bottom-left-radius: 150% 100%;
  }

  .background {
    background: linear-gradient(75deg, rgb(80, 62, 255), rgb(41, 143, 255), rgb(116, 211, 224));
    height: 400px;
    margin: 0;
    position: relative;

    @include desktop {
      background-size:100% 540px;
    }
    .background-image {
      position: absolute;
      background: url("~assets/images/header-banner.svg");
      background-size: cover;
      height: 400px;
      width: 100%;
    }
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
