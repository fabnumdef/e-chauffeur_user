<template>
  <creation-step
    :previous-step="{
      name: 'campus-transports-id-passengers-list',
      params: { campus: campus.id, id: transport.id }
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
            label="Lieu de départ souhaité"
            label-for="departure"
          >
            <input
              id="departure"
              :value="transport.wishedDeparture"
              disabled
              class="input"
            >
          </b-field>

          <b-field
            label="Lieu d'arrivée souhaité"
            label-for="arrival"
          >
            <input
              id="arrival"
              :value="transport.wishedArrival"
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
              :value="transport.passengersCount"
              class="input"
              disabled
            >
          </b-field>

          <b-field
            label="Passagers"
            label-for="passengersCount"
          >
            <input
              id="passengersList"
              :value="passengersList"
              class="input"
              disabled
            >
          </b-field>

          <b-field
            label="Présence de bagages"
          >
            <input
              :value="transport.luggage ? 'Oui':'Non'"
              class="input"
              disabled
            >
          </b-field>

          <b-field
            v-if="transport.userComments"
            label="Commentaires / motif"
          >
            {{ transport.userComments }}
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
import errorsManagement from '~/helpers/mixins/errors-management';
import { MASK } from '~/pages/_campus/transports/_id';

export default {
  components: {
    formButton,
    creationStep,
  },
  mixins: [
    errorsManagement(),
  ],
  props: {
    campus: {
      type: Object,
      default: () => ({}),
    },
  },
  async asyncData({ $api, params }) {
    try {
      const { data: transport } = await $api.query('rides').setMask(MASK).get(params.id);
      return {
        transport,
      };
    } catch (e) {
      throw new Error(`Impossible de trouver ou accéder aux informations de la course "${params.id}"`);
    }
  },
  computed: {
    formattedStart() {
      return DateTime.fromISO(this.transport.start).toLocaleString(DateTime.DATETIME_MED);
    },
    passengersList() {
      return this.transport.passengersList
        .reduce((acc, passenger) => (acc
          ? `${acc}, ${passenger.firstname || '--'} ${passenger.lastname || '--'}`
          : `${passenger.firstname || '--'} ${passenger.lastname || '--'}`),
        '');
    },
  },
  methods: {
    async submit() {
      this.handleCommonErrorsBehavior(async () => {
        await this.$api.query('rides')
          .setCampus(this.campus.id)
          .setMask(MASK)
          .mutate(this.ride.id, CREATE);
        this.$toast.success('Votre transport a été créé avec succès, '
          + 'la régulation reviendra vers vous pour confirmer les lieux de ramassages');
      });
    },
  },
};
</script>
