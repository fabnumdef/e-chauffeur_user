<template>
  <div class="container">
    <div
      id="shape-top-right"
    />
    <div
      id="shape-bottom-left"
      class="is-hidden-touch"
    />
    <ec-header />
    <main>
      <section
        id="ec-questions"
        class="section"
      >
        <div class="columns">
          <div class="column is-5">
            <h1 class="title">
              Des questions sur le service e-Chauffeur ?
            </h1>
            <p>
              Si vous avez la moindre question, n’hésitez pas à remplir le formulaire ci-dessous.
              Nous tâcherons de revenir vers vous dans les plus brefs délais.
            </p>
          </div>
        </div>
      </section>

      <form @submit.prevent="sendForm">
        <div class="columns">
          <div class="column">
            <ec-field
              id="ec-form-firstname"
              label="votre prénom"
            >
              <input
                id="ec-form-firstname"
                v-model="fields.firstname"
                v-validate="'required'"
                type="text"
                class="input"
                name="firstname"
                data-vv-as="prénom"
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
              id="ec-form-lastname"
              label="votre nom"
            >
              <input
                id="ec-form-nom"
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
              id="ec-form-email"
              label="votre courriel"
            >
              <input
                id="ec-form-email"
                v-model="fields.email"
                v-validate="'required|email'"
                type="email"
                class="input"
                name="email"
                data-vv-as="courriel"
                :class="{ 'is-danger': errors.has('email') }"
                :placeholder="'Tapez votre courriel'"
              >
              <p class="help is-danger">
                {{ errors.first('email') }}
              </p>
            </ec-field>
          </div>

          <div class="column">
            <ec-field
              id="ec-form-phone"
              label="votre numéro de téléphone"
            >
              <input
                id="ec-form-phone"
                v-model="fields.phone"
                v-validate="'numeric'"
                type="tel"
                class="input"
                name="phone"
                data-vv-as="téléphone"
                :class="{ 'is-danger': errors.has('phone') }"
                :placeholder="'Tapez votre numéro de téléphone'"
              >
              <p class="help is-danger">
                {{ errors.first('phone') }}
              </p>
            </ec-field>
          </div>
        </div>

        <div class="columns">
          <div class="column is-6">
            <ec-field
              id="ec-form-gsbdd"
              label="votre GSBdD"
            >
              <div
                class="select is-full"
                :class="{ 'is-danger': errors.has('gsbdd') }"
              >
                <select
                  id="ec-form-gsbdd"
                  v-model="fields.gsbdd"
                  v-validate="'required'"
                  name="gsbdd"
                  :class="{ 'placeholder': !fields.gsbdd }"
                >
                  <option value="">
                    Sélectionnez votre GSBdD
                  </option>
                  <option>Toulon</option>
                  <option>Brest</option>
                </select>
              </div>
              <p class="help is-danger">
                {{ errors.first('gsbdd') }}
              </p>
            </ec-field>
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <ec-field
              id="ec-form-message"
              label="votre message"
            >
              <textarea
                id="ec-form-message"
                v-model="fields.message"
                v-validate="'required'"
                class="textarea"
                name="message"
                :class="{ 'is-danger': errors.has('message') }"
                :placeholder="'Tapez votre message'"
              />
              <p class="help is-danger">
                {{ errors.first('message') }}
              </p>
            </ec-field>
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <div class="control has-text-right">
              <button
                class="button is-primary submit"
                :class="{ 'is-loading': pending }"
                :disabled="isBtnSubDisabled"
              >
                <span class="message">
                  <em>envoyer</em> mon <em>message</em>
                </span>
                <span>
                  <fa-icon
                    :icon="['fas', 'chevron-right']"
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </form>

      <div
        v-if="hasNotifications()"
        class="notification"
        :class="notification.class"
      >
        <button
          class="delete"
          @click="closeNotification()"
        />
        {{ notification.mess }}
      </div>
    </main>
  </div>
</template>

<script>
import ecHeader from '~/components/header.vue';
import ecField from '~/components/form/field.vue';

export default {
  components: {
    ecHeader,
    ecField,
  },

  data() {
    return {
      fields: {
        firstname: null,
        lastname: null,
        email: null,
        phone: null,
        gsbdd: '',
        message: null,
      },
      notification: {},
      pending: false,
    };
  },

  computed: {
    isBtnSubDisabled() {
      return (!this.fields.firstname || !this.fields.lastname || !this.fields.gsbdd
          || !this.fields.email || !this.fields.message);
    },
  },

  methods: {
    hasNotifications() {
      return Object.keys(this.notification).length > 0;
    },

    closeNotification() {
      this.notification = {};
    },

    async validateForm() {
      await this.$validator.validate();
      return !Object.keys(this.veeFields).some(key => this.veeFields[key].valid === false);
    },

    async sendForm() {
      const validation = await this.validateForm();
      if (!validation) {
        return;
      }

      this.pending = true;

      try {
        await this.$api.forms.postFormContact(this.fields);
        this.notification = {
          class: 'is-success',
          mess: 'votre message a bien été envoyé.',
        };
      } catch (e) {
        this.notification = {
          class: 'is-danger',
          mess: 'un problème est survenue dans l\'envoi de votre message.',
        };
      }

      this.pending = false;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "~assets/css/head";

  $select-color-placeholder: rgba(28,28,28,0.3);
  $select-color-placeholder-options: $black;
  $select-border-color: #abb8cb;
  $btn-submit-bg-color-disabled: #c8d3e0;
  $text-color: $blue-medium;

  $form-pading-left-right: $control-padding-horizontal;

  .container {
    position: initial;
  }

  #ec-questions {
    position: relative;
    color: $text-color;

    h1 {
      color: $text-color;
    }

    p {
      margin-top: 20px;
      margin-bottom: 20px;
    }

  }
  main {
    .notification {
      animation: slide-show 1s 1 forwards ;
      position: fixed;
      top: 15px;
      right: -225px;
      width: 225px;
      z-index: 1500;

      &::first-letter {
        text-transform: capitalize;
      }
    }
  }

  @keyframes slide-show {
    0% { transform: translateX(0); }
    100% { transform: translateX(-250px); }
  }

  form {
    margin-top: 150px;
    padding-left: $form-pading-left-right;
    padding-right: $form-pading-left-right;

    .select {
      &:not(.is-multiple):not(.is-loading)::after {
        border-color: $select-border-color;
      }

      &.is-full {
        width: 100%;
        select {
          width: 100%;

          &.placeholder {
            color: $select-color-placeholder;
            option {
              color: $select-color-placeholder-options;
            }
          }
        }
      }
    }

    .button.submit {
      height: auto;
      text-align: left;

      em {
        font-weight: bold;
        font-style: normal;
      }

       &[disabled] {
         background-color: $btn-submit-bg-color-disabled;
       }

      .message {
        display: inline-block;
        margin-right: 15px;
        vertical-align: middle;

        em:first-child {
          display: block;

          &::first-letter {
            text-transform: capitalize;
          }
        }
      }
    }
  }

  #shape-top-right {
    position: absolute;
    top: 0px;
    right: 0;
    height: 500px;
    width: 35%;
    background-image: linear-gradient(to right, #5534ff, #288eff 51%, #9df8cf);
    border-bottom-left-radius: 100% 100%;
  }

  #shape-bottom-left {
    position: absolute;
    top: 450px;
    left: 0;
    height: 500px;
    width: 8%;
    background-image: linear-gradient(to top, #ff82a2, #ff5071);
    border-top-right-radius: 150% 65%;
    border-bottom-right-radius: 150% 100%;
  }
</style>

<style lang="scss">
  form {
    label[for=ec-form-phone]::after {
      content: " - facultatif";
      font-style: italic;
      font-weight: normal;
    }
  }
</style>
