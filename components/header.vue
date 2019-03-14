<template>
  <header>
    <nav class="navbar">
      <div class="navbar-brand">
        <nuxt-link
          class="navbar-item"
          to="/"
        >
          <img
            :src="logoPath"
            alt="E-chauffeur"
          >
        </nuxt-link>
        <a
          class="navbar-burger burger"
          :class="{ 'is-active': isBurgerMenu }"
          @click="toogleBurgerMenu()"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>

      <div
        class="navbar-menu"
        :class="{
          'is-active': isBurgerMenu,
          'is-blue': isBurgerMenu && isBurgerMenuBlueColor
        }"
      >
        <div class="navbar-end">
          <nuxt-link
            class="navbar-item"
            to="/"
          >
            Accueil
          </nuxt-link>
          <nuxt-link
            class="navbar-item"
            to="/contact"
          >
            Nous contacter
          </nuxt-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',

  props: {
    logoPath: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      isBurgerMenu: null,
      isBurgerMenuBlueColor: null,
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
    toogleBurgerMenu() {
      this.isBurgerMenu = !this.isBurgerMenu;
    },

    init() {
      this.isBurgerMenu = false;
      this.isBurgerMenuBlueColor = this.$route.name !== 'index';
    },
  },
};


</script>

<style lang="scss" scoped>
  @import "~assets/css/head";

  $text-color: $blue-medium;

  header {
    background-color: transparent;
    margin-bottom: 50px;

    nav {
      background-color: transparent;

      .navbar-menu {
        background-color: transparent;

        &.is-blue {
          color: $text-color;
          a, a:hover {
            color: $text-color;
          }
        }

        .navbar-item {
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }

</style>
