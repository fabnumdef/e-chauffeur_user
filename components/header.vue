<template>
  <header>
    <nav class="navbar">
      <div class="navbar-brand">
        <nuxt-link
          class="navbar-item"
          :to="{name: 'index'}"
        >
          <img
            :src="logoPath[$route.name]"
            alt="e-Chauffeur"
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
            :to="{name: 'index'}"
          >
            Accueil
          </nuxt-link>
          <nuxt-link
            class="navbar-item"
            :to="{name: 'contact'}"
          >
            Nous contacter
          </nuxt-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
const LOGO = 'logo_ec.svg';
const LOGO_BLUE = 'logo_ec_blue.svg';

export default {
  data() {
    return {
      logoPath: {
        index: LOGO,
        contact: LOGO_BLUE,
      },
      isBurgerMenu: false,
      isBurgerMenuBlueColor: this.$route.name !== 'index',
    };
  },

  methods: {
    toogleBurgerMenu() {
      this.isBurgerMenu = !this.isBurgerMenu;
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
