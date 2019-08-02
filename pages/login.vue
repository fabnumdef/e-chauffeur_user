<template>
  <main>
    <form
      class="container"
      @submit.prevent="login(user)"
    >
      <div class="title">
        Accédez à votre compte e-Chauffeur ici, si vous n'avez pas de compte, cliquez sur Inscription.
      </div>
      <ec-field
        label="Votre courriel"
        field-id="email"
        :icon-left="['fas', 'user']"
      >
        <input
          id="email"
          v-model="user.email"
          required="required"
          class="input is-white"
          type="email"
          placeholder="john@doe.com"
          autofocus="autofocus"
        >
      </ec-field>

      <ec-field
        label="Votre mot de passe"
        field-id="password"
        :icon-left="['fas', 'key']"
      >
        <input
          id="password"
          v-model="user.password"
          required="required"
          class="input is-white"
          type="password"
        >
      </ec-field>
      <div class="level">
        <!-- Left side -->
        <div class="level-left">
          <div class="level-item">
            <button class="button is-white">
              Me connecter
            </button>
          </div>
          <div class="level-item">
            <nuxt-link class="is-reset-password" :to="{ name: 'reset-password' }">
              Mot de passe oublié ?
            </nuxt-link>
          </div>
        </div>

        <!-- Right side -->
        <div class="level-right">
          <p class="level-item"><nuxt-link :to="{name: 'index'}" class="button is-white">
            Inscription
          </nuxt-link></p>
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import ecField from '~/components/form/field';

export default {
  layout: 'blue-background',
  components: {
    ecField,
  },
  async asyncData() {
    return {
      user: {
        email: null,
        password: null,
      },
    };
  },
  methods: {
    async login(data) {
      try {
        await this.$auth.login({ data });
        this.$router.push('/');
        this.$toast.success('Bienvenue !');
      } catch ({ response: { status }, message }) {
        switch (status) {
          case 404:
            this.$toast.error('Impossible de se connecter, l\'utilisateur n\'existe pas. '
              + 'Merci de vérifier votre identifiant.\n'
              + 'Si le problème persiste, contactez nous pour confirmer votre identifiant.');
            break;
          case 403:
            this.$toast.error('Impossible de se connecter, le mot de passe est incorrect. '
              + 'Merci de retaper votre mot de passe.\n'
              + 'Si le problème persiste, contactez nous pour réinitialiser votre mot de passe.');
            this.user.password = null;
            break;
          default:
            this.$toast.error('Une erreur est survenue, merci de vérifier votre email et mot de passe. \n'
            + 'Si le problème persiste, contactez nous pour réinitialiser votre mot de passe.');
        }
      }
    },


  },
};
</script>

<style scoped lang="scss">
  @import "~assets/css/head";
  /deep/ .label {
    color: $white;
    text-align: left;
    font-weight: normal;
    font-size: $size-6;
  }
  /deep/ .field {
    padding: 15px 0;
  }
  .level {
    padding-top: 30px;
    align-items: start;
    .level-left {
      flex-direction: column;
      .is-reset-password {
        padding-top: 10px;
      }
    }
  }
  .container {
    margin: 10px auto;
    width: 100%;
    max-width: 440px;
  }

  .title {
    font-size: 1.7rem;
    margin: 50px 0;
  }
</style>
