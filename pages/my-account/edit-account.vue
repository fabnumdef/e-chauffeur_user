<template>
  <main>
    <form @submit.prevent="sendForm()">
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
              type="text"
              class="input"
              name="firstname"
              data-vv-as="Prénom"
              :class="{ 'is-danger': errors.has('firstname') }"
              placeholder="Tapez votre prénom"
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
              type="text"
              class="input"
              name="lastname"
              data-vv-as="nom"
              :class="{ 'is-danger': errors.has('lastname') }"
              placeholder="Tapez votre nom"
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
                  placeholder="Tapez votre email"
                >
                <p class="help is-danger">
                  {{ errors.first('email') }}
                </p>
              </div>
              <div
                v-if="old.email !== fields.email || !fields.email_confirmed"
                class="control"
              >
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
            v-if="old.email !== fields.email || !fields.email_confirmed"
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
                  placeholder="Tapez le jeton de confirmation reçu sur votre courriel"
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
                  @click="sendForm('email')"
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
                <client-only>
                  <phone-number-input
                    id="phone"
                    v-model="fields.phone.original"
                    name="phone"
                    default-country-code="FR"
                    size="sm"
                    color="#abb8cb"
                    class="input-phone"
                    valid-color="#23d160"
                    :preferred-countries="['FR', 'BE', 'DE']"
                    :translations="{
                      countrySelectorLabel: 'Prefix',
                      countrySelectorError: 'Choisir un pays',
                      phoneNumberLabel: 'Tapez votre numéro de téléphone',
                      example: 'Exemple :'
                    }"
                  />
                </client-only>
                <p class="help is-danger">
                  {{ errors.first('email') }}
                </p>
              </div>
              <div class="control">
                <button
                  v-if="old.phone.original !== fields.phone.original || !fields.phone.confirmed"
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
            v-if="old.phone.original !== fields.phone.original || !fields.phone.confirmed"
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
                  placeholder="Tapez le code de confirmation reçu sur votre téléphone"
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
            <ec-password
              id="password"
              v-model="fields.password"
              :is-invalid="errors.has('password')"
            />
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
            <ec-password-confirmation
              id="password_confirm"
              v-model="fields.password_confirm"
              :compare-to="fields.password"
              :is-invalid="errors.has('password_confirm')"
            />
            <p class="help is-danger">
              {{ errors.first('password_confirm') }}
            </p>
          </ec-field>
        </div>
      </div>
      <ec-field class="rgpd">
        <input
          v-model="fields.gprd"
          required
          :true-value="fields.gprd || new Date()"
          type="checkbox"
        >
        J’accepte que mes données soient traitées par le régulateur du service e-Chauffeur afin que ma demande de course
        soit prise en compte, sous <nuxt-link :to="{name: 'conditions'}">
          les conditions suivantes
        </nuxt-link>.
      </ec-field>
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
        <button
          type="button"
          class="delete-button"
          @click="toggleModal"
        >
          Vous souhaitez supprimer votre compte ?
        </button>
      </div>
    </form>
    <modal
      :active="isModalActive"
      title="Suppression du compte"
      content="Êtes-vous sûr de vouloir supprimer votre compte ?"
      @toggle-modal="toggleModal"
      @action="deleteAccount"
    />
  </main>
</template>

<script>
import merge from 'lodash.merge';
import ecField from '~/components/form/field.vue';
import helpButton from '~/components/help.vue';
import modal from '~/components/modal.vue';
import ecPassword from '~/components/form/password.vue';
import ecPasswordConfirmation from '~/components/form/password-confirmation.vue';

import validationIconSwitch from '~/components/validation-icon-switch.vue';

const UPDATABLE_FIELDS = ['email', 'email_confirmed', 'firstname', 'lastname', 'phone(original,confirmed)', 'gprd'];
export default {
  auth: false,
  components: {
    ecField,
    ecPassword,
    ecPasswordConfirmation,
    helpButton,
    validationIconSwitch,
    modal,
  },
  async asyncData({
    redirect, $auth, $api, query: { token, email },
  }) {
    if (token && email) {
      try {
        await $auth.login({ data: { token, email } });
      } catch (e) {
        throw new Error('Email ou code de vérification non reconnu.');
      }
    }
    if (!$auth.loggedIn) {
      return redirect({ name: 'login' });
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
      old: merge({ email: null, phone: { original: null } }, fields),
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
  data() {
    return {
      isModalActive: false,
    };
  },
  watchQuery: ['token', 'email'],
  methods: {
    async sendForm(sendToken = false) {
      if ((this.fields.password || '') !== (this.fields.password_confirm || '')) {
        this.$toast.error('Le mot de passe et sa confirmation ne correspondent pas.');
        return;
      }
      try {
        const { data: updatedUser } = await this.$api.users.patchUser(
          this.id,
          this.fields,
          UPDATABLE_FIELDS.join(','),
          { sendToken },
        );
        merge(this.fields, updatedUser);
        merge(this.old, updatedUser);
        if (sendToken) {
          this.$toast.success('Un code de confirmation vous a été envoyé.');
        } else {
          this.$toast.success('La mise à jour de votre compte a été prise en compte. '
            + 'Pour commander une course, rendez vous dans le menu "Nouvelle course".');
        }
      } catch (e) {
        if (sendToken) {
          this.$toast.error('Une erreur est survenue lors de l\'envoi du code de confirmation');
        } else {
          this.$toast.error('Une erreur est survenue lors de l\'enregistrement de vos modifications.');
        }
      }
    },
    async deleteAccount() {
      try {
        await this.$api.users.deleteUser(this.$auth.user.id);
        this.$auth.logout();
      } catch (e) {
        this.$toast.error('Une erreur est survenue lors de la suppression du compte');
      } finally {
        this.$router.push('/');
        this.$toast.success('Compte supprimé avec succès, vous êtes maintenant déconnecté.');
      }
    },
    toggleModal() {
      this.isModalActive = !this.isModalActive;
    },
  },
};
</script>
<style lang="scss" scoped>
  @import "~assets/css/head";
  $field-color: #abb8cb;
  $text-color: $blue-medium;

  main {
    margin-top: 1em;
  }

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

  .rgpd {
    color: $blue-medium;
    a {
      color: $blue-medium;
      text-decoration: underline;
    }
  }

  @media screen and (max-width: $desktop - 1) {
    form {
      padding: 10px;
    }
  }
  .input-phone /deep/ {
    .field.vue-input-ui .field-input, .country-selector .field-input[data-v-334d91fc] {
      border: 1px solid $field-color;
      border-radius: 0;
    }
  }

  .delete-button {
    background: none;
    border: none;
    color: $primary;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
  }
</style>
