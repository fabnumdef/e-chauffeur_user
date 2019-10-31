<template>
  <main>
    <section
      id="satisfaction-header"
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
        </div>
      </div>
    </section>
    <div class="columns is-centered">
      <form action="">
        <ec-field
          id="ec-form-gsbdd"
          label="À quel GSBdD êtes-vous rattaché ? *"
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
            </select>
          </div>
        </ec-field>

        <ec-field
          id="ec-form-ux-grade"
          label="Sur une échelle de 1 à 5, comment évaluez-vous l'expérience e-Chauffeur ? *"
        >
          <div
            v-for="index in 5"
            :key="index"
            class="control"
          >
            <label :for="`ec-form-ux-grade-${index}`">
              <input
                v-model="uxGrade"
                :value="index"
                type="radio"
                :name="`ec-form-ux-grade-${index}`"
                class="radio"
              >
              {{ index }}
            </label>
          </div>
        </ec-field>
        <ec-field
          id="ec-form-recommandation-grade"
          label="Sur une échelle de 1 à 5, recommanderiez-vous e-Chauffeur au personnel du ministère des Armées ? *"
        >
          <div
            v-for="index in 5"
            :key="index"
            class="custom-control custom-radio custom-control-inline"
          >
            <input
              id="customRadioInline1"
              v-model="recommandationGrade"
              type="radio"
              name="customRadioInline1"
              class="custom-control-input"
            >
            <label
              class="custom-control-label"
              for="customRadioInline1"
            >{{ index }}</label>
          </div>
        </ec-field>
        <ec-field
          id="ec-form-recommandation-grade"
          label="Avez-vous des suggestions pour améliorer cette offre de mobilité ?"
        >
          <textarea
            id="ec-form-recommandation-grade"
            v-validate="'required'"
            class="textarea"
            name="message"
            :class="{ 'is-danger': errors.has('message') }"
            :placeholder="'Tapez votre message'"
          />
        </ec-field>
        <div class="columns">
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
        gsbdd: '',
        uxGrade: null,
        recommandationGrade: null,
        message: null,
      },
      notification: {},
      pending: false,
      gsbddList: this.$store.state.gsbdd.list,
    };
  },
  methods: {
    hasNotifications() {
      return Object.keys(this.notification).length > 0;
    },

    closeNotification() {
      this.notification = {};
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

  #satisfaction-header {
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
    #ec-form-ux-grade {
        display: flex;
    }
  }

  @keyframes slide-show {
    0% { transform: translateX(0); }
    100% { transform: translateX(-250px); }
  }

  form {
    width: 50%;
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
</style>
