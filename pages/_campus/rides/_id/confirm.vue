<template>
  <creation-step
    :previous-step="{
      name: 'campus-rides-id-select-pois',
      params: { campus: campus.id, id: ride.id }
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
import errorsManagement from '~/helpers/mixins/errors-management';
import { MASK } from '~/pages/_campus/rides/_id';

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
      const { data: ride } = await $api.query('rides').setMask(MASK).get(params.id);
      return {
        ride,
      };
    } catch (e) {
      throw new Error(`Impossible de trouver ou accéder aux informations de la course "${params.id}"`);
    }
  },
  computed: {
    formattedStart() {
      return DateTime.fromISO(this.ride.start).toLocaleString(DateTime.DATETIME_MED);
    },
  },
  methods: {
    async submit() {
      this.handleCommonErrorsBehavior(async () => {
        await this.$api.query('rides')
          .setCampus(this.campus.id)
          .setMask(MASK)
          .mutate(this.ride.id, CREATE);
        this.$toast.success('Votre course a été créée avec succès');
        this.$router.push('/');
      });
    },
  },
};
</script>
