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
            :to="{name: 'edit-account'}"
          >
            Mon compte
          </nuxt-link>
          <nuxt-link
            class="navbar-item"
            :to="{name: 'contact'}"
          >
            Nous contacter
          </nuxt-link>
          <button
            class="navbar-item"
            @click="logout()"
            title="Déconnexion"
            v-if="$auth.user"
          >
            <fa-icon icon="sign-out-alt" />
          </button>
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
    menuColor: {
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
        'is-blue': this.menuColor === 'blue',
      };
    },
  },
  methods: {
    toogleBurgerMenu() {
      this.isBurgerMenu = !this.isBurgerMenu;
    },
    logout() {
      try {
        this.$auth.logout();
      } finally {
        this.$toasted.success('À bientôt !');
        this.$router.push('/');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "~assets/css/head";

  $text-color: $blue-medium;

  header {
    background-color: transparent;
    padding: 30px 0;

    nav {
      background: transparent;

      .navbar-menu {
        background: rgba($white, 0.3);
        @include desktop {
          background: transparent;
        }
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
      button.navbar-item {
        background: transparent;
        border: 0;
        cursor: pointer;
        font-size: 1em;

      }
    }
  }
</style>
