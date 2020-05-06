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
            :to="{name: 'my-account'}"
          >
            Mon compte
          </nuxt-link>
          <div
            v-if="$auth.loggedIn"
            class="navbar-item has-dropdown"
            :class="{'is-active': isRideMenuOpen}"
          >
            <a
              class="navbar-link"
              @click="toggleRideMenu()"
            >
              Nouvelle course
            </a>

            <div class="navbar-dropdown">
              <nuxt-link
                v-for="campus of campuses"
                :key="campus.id"
                class="navbar-item"
                :to="{name: 'campus-select-type', params: { campus: campus.id }}"
              >
                {{ campus.name }}
              </nuxt-link>
            </div>
          </div>
          <nuxt-link
            class="navbar-item"
            :to="{name: 'contact'}"
          >
            Nous contacter
          </nuxt-link>
          <button
            v-if="$auth.loggedIn"
            class="navbar-item"
            title="Déconnexion"
            @click="logout()"
          >
            <fa-icon icon="sign-out-alt" />
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';

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
    isRideMenuOpen: false,
    isBurgerMenu: false,
  }),
  computed: {
    ...mapGetters('campus', ['campuses']),
    burgerMenuClasses() {
      return {
        'is-active': this.isBurgerMenu,
        'is-blue': this.menuColor === 'blue',
        'is-blue-mobile': this.menuColor === 'blue-mobile',
      };
    },
  },
  methods: {
    toogleBurgerMenu() {
      this.isBurgerMenu = !this.isBurgerMenu;
    },
    toggleRideMenu(val) {
      this.isRideMenuOpen = typeof val !== 'undefined' ? val : !this.isRideMenuOpen;
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
        @media screen and (max-width: $desktop - 1) {
          &.is-blue-mobile {
            color: $text-color;
            a, a:hover {
              color: $text-color;
            }
          }
        }

        .navbar-item {
          &:hover:not(.has-dropdown) {
            text-decoration: underline;

          }
        }
        @include desktop {
          .navbar-dropdown {
            background: rgba($white, 0.7);
            margin-top: -$gap/2;
            .navbar-item {
              color: $black;
              &:hover {
                background: rgba($white, 0.2);
              }
            }
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
