<template>
  <main>
    <section
      id="rating-header"
      class="section"
    >
      <div class="columns">
        <div class="column is-5">
          <h1 class="title">
            Questionnaire de satisfaction du service e-Chauffeur
          </h1>
          <p>
            Vous venez d'utiliser le service e-Chauffeur.
            Dans un souci d'amélioration de notre offre,
            merci de prendre quelques secondes pour l'évaluer à travers les questions suivantes.
          </p>
          <p><em>Les champs suivis d'un * sont obligatoires</em></p>
        </div>
      </div>
    </section>
    <div class="columns is-centered">
      <form @submit.prevent="sendForm">
        <div class="column">
          <ec-field
            id="ec-form-ux-grade"
            label="Sur une échelle de 1 à 5, comment évaluez vous le service e-chauffeur ? *"
          >
            <div>
              <label
                v-for="index in 5"
                :key="index"
                class="radio"
                :for="`ux-grade--${index}`"
              >{{ index }}
                <input
                  :id="`ux-grade--${index}`"
                  v-model="fields.uxGrade"
                  type="radio"
                  :value="index"
                >
              </label>
            </div>
          </ec-field>
        </div>

        <div class="column">
          <ec-field
            id="ec-form-ux-recommandation"
            label="Sur une échelle de 1 à 5, comment évaluez vous le service e-chauffeur ? *"
          >
            <div>
              <label
                v-for="index in 5"
                :key="index"
                class="radio"
                :for="`ux-recommandation--${index}`"
              >{{ index }}
                <input
                  :id="`ux-recommandation--${index}`"
                  v-model="fields.recommandationGrade"
                  type="radio"
                  :value="index"
                >
              </label>
            </div>
          </ec-field>
        </div>

        <div class="column">
          <ec-field
            id="ec-form-message"
            label="Avez-vous des suggestions pour améliorer cette offre de mobilité ?"
          >
            <textarea
              v-model="fields.message"
              :class="{ 'is-danger': errors.has('message') }"
              :placeholder="'Tapez votre message'"
              class="textarea"
              name="message"
            />
          </ec-field>
        </div>

        <div class="column">
          <div class="control has-text-right">
            <button
              class="button is-primary submit"
              :class="{ 'is-loading': pending }"
              :disabled="isBtnSubDisabled"
            >
              <span class="message">
                Envoyer
              </span>
              <span>
                <fa-icon
                  :icon="['fas', 'chevron-right']"
                />
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
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
</template>

<script>
import ecField from '~/components/form/field.vue';

export default {
  components: {
    ecField,
  },
  data() {
    return {
      fields: {
        uxGrade: null,
        recommandationGrade: null,
        message: null,
        ride: {
          _id: this.$route.query.rideId,
        },
      },
      notification: {},
      pending: false,
    };
  },

  computed: {
    isBtnSubDisabled() {
      return (!this.fields.uxGrade || !this.fields.recommandationGrade);
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
      return !Object.keys(this.veeFields).some((key) => this.veeFields[key].valid === false);
    },

    async sendForm() {
      const validation = await this.validateForm();
      if (!validation) {
        return;
      }
      this.pending = true;

      try {
        await this.$api.forms.postRating(this.fields);
        this.notification = {
          class: 'is-success',
          mess: 'votre message a bien été envoyé.',
        };
      } catch (err) {
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

  #rating-header {
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
    label.radio {
      color: $text-color;
      margin-right: 1em;
      input {
        margin-left: .5em;
      }
    }

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
</style>
