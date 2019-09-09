<template>
  <main>
    <section
      class="section"
    >
      <div class="title">
        Vérifiez vos informations, puis lancez votre réservation !
      </div>
    </section>
    <section class="white-section">
      <form
        class="form blue-box"
        @submit.prevent="update(ride)"
      >
        <fieldset class="fields-box">
          <b-field
            label="Date et heure de départ"
            label-for="start"
          >
            <input
              id="start"
              :value="formattedDate"
              disabled
              class="input"
            >
          </b-field>
          <div class="columns">
            <div class="column">
              <b-field
                label="Lieu de départ"
                label-for="departure"
              >
                <input
                  id="departure"
                  :value="ride.departure.label"
                  disabled
                  class="input"
                >
              </b-field>
            </div>
            <div class="column">
              <b-field
                label="Lieu d'arrivée"
                label-for="arrival"
              >
                <input
                  id="arrival"
                  :value="ride.arrival.label"
                  disabled
                  class="input"
                >
              </b-field>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <b-field
                label="Nombre de passagers"
                label-for="passengersCount"
              >
                <input
                  id="passengersCount"
                  :value="ride.passengersCount"
                  class="input"
                  disabled
                >
              </b-field>
            </div>
            <div class="column">
              <b-field
                label="Présence de bagages"
              >
                <input
                  :value="ride.luggage ? 'Oui':'Non'"
                  class="input"
                  disabled
                >
              </b-field>
            </div>
          </div>
          <b-field
            v-if="ride.userComments"
            label="Commentaires"
          >
            {{ ride.userComments }}
          </b-field>
        </fieldset>
        <help-button class="is-pulled-right">
          Besoin d'aide ?
        </help-button>
        <div class="buttons is-centered">
          <button
            type="submit"
            class="button is-primary"
            :disabled="loading || !isDraft"
          >
            Envoyer ma demande
          </button>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { DateTime } from 'luxon';
import { DRAFTED } from '@fabnumdef/e-chauffeur_lib-vue/api/status/states';
import { CREATE } from '@fabnumdef/e-chauffeur_lib-vue/api/status/transitions';
import helpButton from '~/components/help.vue';

export default {
  components: {
    helpButton,
  },
  props: {
    campus: {
      type: Object,
      default: () => ({}),
    },
    ride: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      apiErrors: null,
      loading: false,
    };
  },
  computed: {
    isDraft() {
      return this.ride.status === DRAFTED;
    },
    formattedDate() {
      return DateTime.fromISO(this.ride.start).toLocaleString(DateTime.DATETIME_MED);
    },
  },
  methods: {
    async update(ride) {
      try {
        this.loading = true;
        this.apiErrors = {};
        await this.$api.rides(this.campus.id, 'id,status').mutateRide(ride, CREATE);
        this.$toast.success('Votre demande de course a bien été reçue, '
          + 'nous allons la traiter dans les meilleurs délais.');
      } catch (e) {
        this.$toast.error('Une erreur est survenue lors de l\'envoi de votre course. '
            + 'Celle-ci n\'a pas été créée. Vérifiez votre connexion puis réessayez');
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
  @import "~assets/css/head";
  .form {
    max-width: 806px;
    margin: 0 auto;
    &.blue-box {
      background: $blue-dark;
      border: 2px solid $primary;
      border-radius: 13px;
      padding: $gap;
      box-sizing: border-box;
    }
    .fields-box {
      padding-bottom: $gap;
      /deep/ .input {
        border: none;
        color: $white;
        font-weight: bold;
        border-bottom: 1px solid $primary;
      }
      /deep/.multiselect {
        border-bottom: 1px solid $primary;
        &__select {
          border: 0;
          &:before {
            border-color: $primary transparent transparent;
          }
        }
        &__tags, &__single {
          background: transparent;
          color: $white;
          font-weight: bold;
          border: 0;
        }
      }
    }
  }

  .map {
    margin: $gap 0;
    height: 500px;
    /deep/ .vue2leaflet-map {
      z-index: 0;
    }
  }
  .title {
    text-align: center;
  }
</style>
