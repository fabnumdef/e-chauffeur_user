<template>
  <main>
    <form @submit.prevent="sendForm">
      <div class="columns">
        <div class="column">
          <ec-field
            id="firstname"
          >
            <template #label>
              Votre prénom <small>facultatif</small>
            </template>
            <input
              id="firstname"
              v-model="fields.firstname"
              v-validate="'required'"
              type="text"
              class="input"
              name="firstname"
              data-vv-as="Prénom"
              :class="{ 'is-danger': errors.has('firstname') }"
              :placeholder="'Tapez votre prénom'"
            >
            <p class="help is-danger">
              {{ errors.first('firstname') }}
            </p>
          </ec-field>
        </div>

        <div class="column">
          <ec-field
            id="lastname"
          >
            <template #label>
              Votre nom <small>facultatif</small>
            </template>
            <input
              id="lastname"
              v-model="fields.lastname"
              v-validate="'required'"
              type="text"
              class="input"
              name="lastname"
              data-vv-as="nom"
              :class="{ 'is-danger': errors.has('lastname') }"
              :placeholder="'Tapez votre nom'"
            >
            <p class="help is-danger">
              {{ errors.first('lastname') }}
            </p>
          </ec-field>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <ec-field
            id="email"
          >
            <template #label>
              Votre Email <validation-icon-switch :state="fields.email_confirmed" />
            </template>
            <div class="field has-addons">
              <div class="control is-expanded">
                <input
                  id="email"
                  v-model="fields.email"
                  v-validate="'required'"
                  type="text"
                  class="input"
                  name="email"
                  data-vv-as="Email"
                  :class="{ 'is-danger': errors.has('email') }"
                  :placeholder="'Tapez votre email'"
                >
                <p class="help is-danger">
                  {{ errors.first('email') }}
                </p>
              </div>
              <div class="control">
                <button
                  type="button"
                  class="button is-primary"
                  @click="sendForm('email')"
                >
                  Vérifier
                </button>
              </div>
            </div>
          </ec-field>
        </div>
        <div class="column">
          <ec-field
            id="email_token"
            label="Code de confirmation courriel"
          >
            <div class="field has-addons">
              <div class="control is-expanded">
                <input
                  id="email_token"
                  v-model="fields.email_token"
                  v-validate="'required'"
                  type="text"
                  class="input"
                  name="email_token"
                  data-vv-as="Code de confirmation (email)"
                  :disabled="fields.email_confirmed"
                  :class="{ 'is-danger': errors.has('email_token') }"
                  :placeholder="'Tapez le jeton de confirmation reçu sur votre courriel'"
                >
                <p class="help is-danger">
                  {{ errors.first('email_token') }}
                </p>
              </div>
              <div class="control">
                <button
                  type="button"
                  class="button is-primary"
                  :disabled="fields.email_confirmed"
                  @click="sendForm('phone')"
                >
                  OK
                </button>
              </div>
            </div>
          </ec-field>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <ec-field
            id="phone"
          >
            <template #label>
              Votre numéro de téléphone <validation-icon-switch :state="fields.phone.confirmed" />
            </template>
            <div class="field has-addons">
              <div class="control is-expanded">
                <input
                  id="phone"
                  v-model="fields.phone.original"
                  v-validate="'required'"
                  type="text"
                  class="input"
                  name="phone"
                  data-vv-as="Téléphone"
                  :class="{ 'is-danger': errors.has('phone') }"
                  :placeholder="'Tapez votre numéro de téléphone'"
                >
                <p class="help is-danger">
                  {{ errors.first('email') }}
                </p>
              </div>
              <div class="control">
                <button
                  type="button"
                  class="button is-primary"
                  @click="sendForm('phone')"
                >
                  Vérifier
                </button>
              </div>
            </div>
            <p class="help is-danger">
              {{ errors.first('phone') }}
            </p>
          </ec-field>
        </div>
        <div class="column">
          <ec-field
            id="phone_token"
            label="Code de confirmation téléphone"
          >
            <div class="field has-addons">
              <div class="control is-expanded">
                <input
                  id="phone_token"
                  v-model="fields.phone.token"
                  v-validate="'required'"
                  type="text"
                  class="input"
                  name="phone_token"
                  data-vv-as="Code de confirmation (téléphone)"
                  :disabled="fields.phone.confirmed"
                  :class="{ 'is-danger': errors.has('phone.token') }"
                  :placeholder="'Tapez le code de confirmation reçu sur votre téléphone'"
                >
                <p class="help is-danger">
                  {{ errors.first('phone.token') }}
                </p>
              </div>
              <div class="control">
                <button
                  type="button"
                  class="button is-primary"
                  :disabled="fields.phone.confirmed"
                  @click="sendForm()"
                >
                  OK
                </button>
              </div>
            </div>
            <p class="help is-danger">
              {{ errors.first('phone.token') }}
            </p>
          </ec-field>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <ec-field
            id="password"
            label="Votre mot de passe"
          >
            <input
              id="password"
              v-model="fields.password"
              v-validate="'required'"
              type="password"
              class="input"
              name="password"
              data-vv-as="Mot de passe"
              :class="{ 'is-danger': errors.has('password') }"
              :placeholder="'Tapez votre mot de passe'"
            >
            <p class="help is-danger">
              {{ errors.first('password') }}
            </p>
          </ec-field>
        </div>

        <div class="column">
          <ec-field
            id="password_confirm"
            label="Confirmation de mot de passe"
          >
            <input
              id="password_confirm"
              v-model="fields.password_confirm"
              v-validate="'required'"
              type="password"
              class="input"
              name="password_confirm"
              data-vv-as="Mot de passe (confirmation)"
              :class="{ 'is-danger': errors.has('password_confirm') }"
              :placeholder="'Tapez votre mot de passe (confirmation)'"
            >
            <p class="help is-danger">
              {{ errors.first('password_confirm') }}
            </p>
          </ec-field>
        </div>
      </div>
      <div class="has-text-centered">
        <button
          type="submit"
          class="button is-primary"
        >
          Sauvegarder
        </button>
        <help-button class="help-button">
          Besoin d'aide ?
        </help-button>
      </div>
    </form>
  </main>
</template>

<script>
import merge from 'lodash.merge';
import ecField from '~/components/form/field.vue';
import helpButton from '~/components/help.vue';

import validationIconSwitch from '~/components/validation-icon-switch.vue';

const UPDATABLE_FIELDS = ['email', 'firstname', 'lastname', 'phone(original,confirmed)'];
export default {
  auth: false,
  components: {
    ecField,
    helpButton,
    validationIconSwitch,
  },
  watchQuery: ['token', 'email'],
  async asyncData({ $auth, $api, query: { token, email } }) {
    if (token && email) {
      try {
        await $auth.login({ data: { token, email } });
      } catch (e) {
        throw new Error('Email ou code de vérification non reconnu.');
      }
    }
    const fields = {};
    try {
      const { data } = await $api.jwt.getUser(UPDATABLE_FIELDS.concat('id').join(','));
      Object.assign(fields, data);
    } catch (e) {
      throw new Error('Erreur dans la récupération de vos données utilisateur. '
        + 'Essayez de vous déconnecter puis de vous reconnecter');
    }
    return {
      token,
      email,
      id: fields.id,
      fields: merge({
        firstname: null,
        lastname: null,
        email: null,
        email_token: null,
        phone: {
          original: null,
          token: null,
        },
        password: null,
      }, fields),
    };
  },
  methods: {
    async sendForm(sendToken = false) {
      const { data: updatedUser } = await this.$api.users.patchUser(
        this.id,
        this.fields,
        UPDATABLE_FIELDS.join(','),
        { sendToken },
      );
      merge(this.fields, updatedUser);
    },
  },
};
</script>
<style lang="scss" scoped>
  @import "~assets/css/head";

  /deep/ .label small {
    font-weight: normal;
    &:before {
      content: ' - ';
    }
  }

  .help-button /deep/ .button {
    color: $primary;
    text-decoration: none;
  }

</style>
