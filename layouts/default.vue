<template>
  <div class="wrapper">
    <div class="container">
      <ec-header :logo-path="logoPath" />
      <nuxt />
      <ec-footer />
    </div>

    <div
      v-if="showShape.index"
      id="shape-index"
    />
    <div
      v-if="showShape.contact"
      id="shape-contact-top-right"
    />
    <div
      v-if="showShape.contact"
      id="shape-contact-bottom-left"
      class="is-hidden-touch"
    />
  </div>
</template>


<script>
import ecHeader from '~/components/header.vue';
import ecFooter from '~/components/footer.vue';

const LOGO = 'logo_ec.svg';
const LOGO_BLUE = 'logo_ec_blue.svg';

export default {
  components: {
    ecHeader,
    ecFooter,
  },

  data() {
    return {
      showShape: {
        index: null,
        contact: null,
      },
      logoPath: null,
    };
  },

  watch: {
    '$route.path': function () {
      this.init();
    },
  },

  created() {
    this.init();
  },

  methods: {
    init() {
      const keys = Object.keys(this.showShape);
      keys.forEach((k) => { this.showShape[k] = false; });
      this.showShape[this.$route.name] = true;
      this.logoPath = this.$route.name !== 'index' ? LOGO_BLUE : LOGO;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "~assets/css/head";

  .container {
    position: relative;
    z-index: 500;
  }

  #shape-index {
    position: absolute;
    top: 0;
    left: 0;
    height: 600px;
    width: 100%;
    background-image: linear-gradient(to right, #5534ff, #288eff 51%, #9df8cf);
    border-bottom-left-radius: 100% 150%;
    border-bottom-right-radius: 150% 200%;
  }

  #shape-contact-top-right {
    position: absolute;
    top: 0px;
    right: 0;
    height: 500px;
    width: 35%;
    background-image: linear-gradient(to right, #5534ff, #288eff 51%, #9df8cf);
    border-bottom-left-radius: 100% 100%;
  }

  #shape-contact-bottom-left {
    position: absolute;
    top: 450px;
    left: 0;
    height: 500px;
    width: 8%;
    background-image: linear-gradient(to top, #ff82a2, #ff5071);
    border-top-right-radius: 150% 65%;
    border-bottom-right-radius: 150% 100%;
  }

  @media screen and (max-width: $desktop) {
    #shape-index {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  @media screen and (max-width: $tablet) {
    #shape-index {
      height: 525px;
    }
  }
</style>
