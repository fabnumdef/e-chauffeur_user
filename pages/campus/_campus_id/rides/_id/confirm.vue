<template>
  <creation-step
    :previous-step="{
      name: 'campus-campus_id-rides-ride_id-select-pois',
      params: { campus_id: campus.id, ride_id: ride.id }
    }"
  >
    <template #title>
      Confirmez vos informations pour lancer la demande de réservation
    </template>
    <template #subtitle>
      Une fois la demande faite, vous recevrez un SMS ou un e-mail de confirmation.
    </template>
    <template #form>
      <form
        class="form blue-box"
        @submit.prevent="submit"
      >
        <fieldset class="fields-box">
          <b-field
            label="Date et heure de départ"
            label-for="start"
          >
            <input
              id="start"
              :value="formattedStart"
              disabled
              class="input"
            >
          </b-field>

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

          <b-field
            label="Présence de bagages"
          >
            <input
              :value="ride.luggage ? 'Oui':'Non'"
              class="input"
              disabled
            >
          </b-field>

          <b-field
            v-if="ride.userComments"
            label="Commentaires / motif"
          >
            {{ ride.userComments }}
          </b-field>
        </fieldset>
        <form-button>
          Lancer la réservation
        </form-button>
      </form>
    </template>
  </creation-step>
</template>

<script>
import { DateTime } from 'luxon';
import { CREATE } from '@fabnumdef/e-chauffeur_lib-vue/api/status/transitions';
import creationStep from '~/components/creation-step/generic.vue';
import formButton from '~/components/creation-step/form-button.vue';

const FETCHED_DATA = 'id,start,status,departure(id,label),arrival(id,label),luggage,passengersCount,userComments';

export default {
  components: {
    formButton,
    creationStep,
  },
  props: {
    campus: {
      type: Object,
      default: () => ({}),
    },
  },
  async asyncData({ $api, params }) {
    try {
      const { data: ride } = await $api.rides(null, FETCHED_DATA).getRide(params.ride_id);
      return {
        ride,
      };
    } catch (e) {
      throw new Error(`Impossible de trouver ou accéder aux informations de la course "${params.ride_id}"`);
    }
  },
  data() {
    return {
      apiErrors: null,
      loading: false,
    };
  },
  computed: {
    formattedStart() {
      return DateTime.fromISO(this.ride.start).toLocaleString(DateTime.DATETIME_MED);
    },
  },
  methods: {
    async submit() {
      try {
        this.loading = true;
        this.apiErrors = {};
        await this.$api.rides(this.campus.id, FETCHED_DATA).mutateRide(CREATE, this.ride);
        this.$toast.success('Votre demande de course a bien été reçue, '
            + 'nous allons la traiter dans les meilleurs délais.');
        this.$router.push('/');
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
  .back-button {
    box-shadow: none;
    text-transform: none;
    &:hover {
      background: transparent;
    }
  }
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
      /deep/ .label {
        color: $blue-light;
      }
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
