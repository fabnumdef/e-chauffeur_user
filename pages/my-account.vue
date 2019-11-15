<template>
  <main>
    <section
      class="section"
    >
      <div class="columns">
        <div class="column is-4">
          <h1 class="title">
            Bienvenue sur votre compte e-Chauffeur
          </h1>
          <p>Ici vous pouvez éditer vos informations personnelles et accéder à vos données de courses</p>
        </div>
      </div>
      <div class="columns">
        <div class="column is-6">
          <nav>
            <ul>
              <li>
                <nuxt-link
                to="/my-account/edit-account"
                >
                  Vos informations
                </nuxt-link></li>
              <li>
                <nuxt-link
                  to="/my-account/current-rides"
                >
                  Réservation en cours
                </nuxt-link>
              </li>
              <li>
                <nuxt-link
                to="/my-account/my-rides"
                >
                Historique des courses
                </nuxt-link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
    <nuxt-child />
  </main>
</template>

<script>
export default {
  name: 'MyAccount',
  computed: {
    currentPath() {
      return this.$route.path;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '~assets/css/head';

  $select-color-placeholder: rgba(28,28,28,0.3);
  $select-color-placeholder-options: $black;
  $select-border-color: #abb8cb;
  $btn-submit-bg-color-disabled: #c8d3e0;
  $text-color: $blue-medium;

  $form-pading-left-right: $control-padding-horizontal;

  main {
    color: $text-color;
    section.section {
      padding-bottom: 0;
    }
    .title {
      color: $text-color;
      text-align: left;
    }
    nav > ul {
      display: flex;
      justify-content: space-between;
      align-items: center;
      a {
        color: $text-color;
        text-transform: uppercase;
        font-weight: 700;
        font-size: .9em;
        &.nuxt-link-active {
          color: $primary;
          border-bottom: 2px solid $primary;
        }
      }
    }
    @media screen and (max-width: $desktop - 1) {
      nav > ul {
        flex-direction: column;
        justify-content: center;
        li {
          margin-bottom: 1em;
        }
      }
    }
  }
</style>
