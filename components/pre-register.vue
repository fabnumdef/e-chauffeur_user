<template>
  <section>
    <form
      class="field has-addons is-fullwidth"
      @submit.prevent="sendToken"
    >
      <div class="control is-expanded">
        <input
          v-model="email"
          type="email"
          class="input"
          :class="colorClass"
          placeholder="john@doe.tld"
        >
      </div>
      <div class="control">
        <button
          class="button"
          :class="colorClass"
          :disabled="isEmailEmpty || isLoading"
        >
          OK
        </button>
      </div>
    </form>
    <div
      class="title has-text-centered"
      :class="colorClass"
    >
      Code de vérification
    </div>
    <form
      class="token"
      @submit.prevent="goToForm"
    >
      <div class="field">
        <div class="control">
          <input
            v-model="token"
            type="text"
            :class="colorClass"
            class="input"
            placeholder="a0bg47"
            maxlength="6"
          >
        </div>
      </div>
      <button
        class="button"
        :class="colorClass"
        :disabled="isTokenNotFull"
      >
        Confirmer
      </button>
    </form>
  </section>
</template>
<script>
import lGet from 'lodash.get';

export default {
  props: {
    isWhite: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isLoading: false,
      email: '',
      token: '',
    };
  },
  computed: {
    isEmailEmpty() {
      return this.email.length < 1;
    },
    isTokenNotFull() {
      return this.token.length !== 6;
    },
    colorClass() {
      return this.isWhite ? 'is-white' : 'is-primary';
    },
  },
  methods: {
    async sendToken() {
      this.isLoading = true;
      try {
        await this.$api.users.postUser({ email: this.email }, '', {
          sendToken: true,
        });
        this.$toast.success('Un email a été envoyé. Pour poursuivre, entrez ci-dessous le code qu\'il contient.');
      } catch ({ response }) {
        const whitelistDomains = lGet(response, 'data.whitelistDomains', []);
        this.$toast.error(`Une erreur est survenue lors de l'enregistrement de votre email. ${
          whitelistDomains.length > 0 ? `Ce dernier doit être valide et finir par ${whitelistDomains.join(', ')}` : ''
        }`);
      } finally {
        this.isLoading = false;
      }
    },
    goToForm() {
      this.$router.push({
        name: 'edit-account',
        query: {
          email: this.email,
          token: this.token,
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
  @import "~assets/css/head";
  $char-w: 1ch;
  $gap: .5*$char-w;
  $n-char: 6;
  $in-w: $n-char*($char-w + $gap);
  .is-white {
    &.input {
      color: $white;
    }
  }
  .token {
    .input {
      display: block;
      margin: 0 auto;
      text-transform: lowercase;
      border: 0;
      padding: 0;
      width: $in-w;
      letter-spacing: $gap;
      font: 4ch monospace;
      border-radius: 0;
      &.is-white {
        background: repeating-linear-gradient(90deg,
          $white 0, $white $char-w,
          transparent 0, transparent $char-w + $gap)
        0 80%/ #{$in-w - $gap} 2px no-repeat;
        &::placeholder {
          color: $white;
        }
      }
      &.is-primary {
        background: repeating-linear-gradient(90deg,
          $primary 0, $primary $char-w,
          transparent 0, transparent $char-w + $gap)
        0 80%/ #{$in-w - $gap} 2px no-repeat;
        &::placeholder {
          color: $primary;
        }
      }

    }
    .button {
      display: block;
      margin: 0 auto;
    }
  }
  .title {
    font-size: 1.7rem;
    margin: 25px 0;
    &.is-primary {
      color: $primary;
    }
  }
</style>
