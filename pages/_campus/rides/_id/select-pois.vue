<template>
  <creation-step
    :previous-step="{
      name: 'campus-rides-id-edit',
      params: { campus: campus.id, id: ride.id }
    }"
  >
    <template #title>
      Choisissez votre départ et votre arrivée
    </template>
    <template #subtitle>
      Une fois que vous aurez confirmé votre point de récupération et de destination;
      vous n'aurez plus qu'à lancer votre réservation.
    </template>
    <template #form>
      <form
        class="form blue-box"
        @submit.prevent="submit"
      >
        <fieldset class="fields-box">
          <b-field
            label="Lieu de départ"
            label-for="departure"
          >
            <search-poi
              id="departure"
              v-model="departure"
              :campus="campus"
            />
          </b-field>

          <b-field
            label="Lieu d'arrivée"
            label-for="arrival"
          >
            <search-poi
              id="arrival"
              v-model="arrival"
              :campus="campus"
            />
          </b-field>
        </fieldset>
        <form-button
          :disabled="[departure, arrival].includes(null)"
        />
      </form>
    </template>
    <template #footer>
      <poi-map
        class="map"
        :campus="campus"
        :departure="departure"
        :arrival="arrival"
        @click="selectPoi"
      />
    </template>
  </creation-step>
</template>

<script>
import creationStep from '~/components/creation-step/generic.vue';
import searchPoi from '~/components/form/search-poi.vue';
import formButton from '~/components/creation-step/form-button.vue';
import poiMap from '~/components/maps/pois.vue';
import errorsManagement from '~/helpers/mixins/errors-management';

export default {
  layout: 'ride-creation',
  components: {
    searchPoi,
    poiMap,
    creationStep,
    formButton,
  },
  mixins: [
    errorsManagement(),
  ],
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
      departure: this.ride.departure || null,
      arrival: this.ride.arrival || null,
    };
  },
  methods: {
    async submit() {
      if (
        this.departure && this.arrival
        && window && window.confirm('Veuillez vérifier les données avant de passer à l\'étape suivante.')
      ) {
        this.handleCommonErrorsBehavior(async () => {
          await this.$api.query('rides')
            .setMask('id,status')
            .edit(this.ride.id, {
              departure: this.departure,
              arrival: this.arrival,
            });

          this.$router.push({
            name: 'campus-rides-id-confirm',
            params: { campus: this.campus.id, id: this.ride.id },
          });
        });
      }
    },
    selectPoi(poi) {
      if (this.departure.id === poi.id) {
        this.departure = {
          id: null,
          label: null,
        };
      } else if (this.arrival.id === poi.id) {
        this.arrival = {
          id: null,
          label: null,
        };
      } else if (this.departure.id === null) {
        Object.assign(this.departure, poi);
      } else if (this.arrival.id === null) {
        Object.assign(this.arrival, poi);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "~assets/css/head";
  fieldset {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1em;
  }
</style>
