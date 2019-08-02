<template>
  <header>
    <nav class="navbar">
      <div class="navbar-brand">
        <nuxt-link
          class="navbar-item"
          :to="{name: 'index'}"
        >
          <img
            :src="`/logo_ec${logoColor?'_'+logoColor:''}.svg`"
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
        :class="burgerMenuClasses"
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

export default {
  props: {
    logoColor: {
      type: String,
      default: null,
    },
  },
  data: () => ({
    isBurgerMenu: false,
  }),
  computed: {
    burgerMenuClasses() {
      return {
        'is-active': this.isBurgerMenu,
        'is-blue': this.logoColor === 'blue',
      };
    },
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
    padding: 30px 0;

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
