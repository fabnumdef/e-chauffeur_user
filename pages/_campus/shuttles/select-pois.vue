<template>
  <creation-step
    :previous-step="{ name: 'campus-shuttles-select-factory', params: { campus: campus.id }}"
  >
    <template #title>
      Réservez votre navette dès maintenant !
    </template>
    <template #subtitle>
      Sélectionnez votre départ et votre arrivée suivant les horaires proposés.
    </template>
    <template #form>
      <form
        class="form blue-box"
        @submit.prevent="submit"
      >
        <schedules />
        <fieldset class="fields-box">
          <b-field
            label="Arrêt de départ"
            label-for="departure"
            class="departure"
          >
            <vue-multiselect
              v-model="departure"
              :options="stops"
              track-by="id"
              label="label"
            >
              <template #placeholder>
                <fa-icon :icon="['fas', 'map-marker-alt']" />
                <span>Sélectionner votre arrêt</span>
              </template>
            </vue-multiselect>
          </b-field>

          <b-field
            label="Arrêt d'arrivée"
            label-for="arrival"
            class="arrival"
          >
            <vue-multiselect
              v-model="arrival"
              :options="stops"
              track-by="id"
              label="label"
            >
              <template #placeholder>
                <fa-icon :icon="['fas', 'map-marker-alt']" />
                <span>Sélectionner votre arrêt</span>
              </template>
            </vue-multiselect>
          </b-field>

          <b-field
            label="Heure de passage estimée"
            label-for="start"
          >
            <vue-multiselect
              v-model="start"
              :options="starts"
              track-by="id"
              label="label"
            >
              <template #placeholder>
                <fa-icon :icon="['fas', 'clock']" />
                <span>Sélectionner votre arrêt</span>
              </template>
            </vue-multiselect>
          </b-field>

          <b-field
            label="Heure de passage estimée"
            label-for="end"
          >
            <vue-multiselect
              v-model="shuttle"
              :options="ends"
              track-by="id"
              label="label"
            >
              <template #placeholder>
                <fa-icon :icon="['fas', 'clock']" />
                <span>Sélectionner votre arrêt</span>
              </template>
            </vue-multiselect>
          </b-field>
        </fieldset>
        <form-button />
      </form>
    </template>
    <template #footer>
      <shuttle-factories-map
        class="map"
        :campus="campus"
        :shuttle-factories="[shuttleFactory]"
      />
    </template>
  </creation-step>
</template>

<script>
import { DateTime } from 'luxon';
import creationStep from '~/components/creation-step/generic.vue';
import formButton from '~/components/creation-step/form-button.vue';
import shuttleFactoriesMap from '~/components/maps/shuttle-factories.vue';
import schedules from '~/components/creation-step/schedules.vue';
import errorsManagement from '~/helpers/mixins/errors-management';

const SHUTTLE_MASK = '*';

export default {
  components: {
    creationStep,
    schedules,
    formButton,
    shuttleFactoriesMap,
  },
  mixins: [errorsManagement()],
  props: {
    campus: {
      type: Object,
      default: () => ({}),
    },
  },
  async asyncData({
    $api, store, params, query,
  }) {
    const shuttleFactory = store.getters['shuttle/factory'];
    const { campus } = params;
    const { start } = query;
    const end = DateTime.fromISO(start).plus({ days: 30 }).toISO();
    const { data: shuttles } = await $api.query('shuttles')
      .setMask(SHUTTLE_MASK)
      .setCampus(campus)
      .list(start, end)
      .setFilter('shuttleFactory', shuttleFactory.id);
    return {
      shuttleFactory,
      shuttles,
      start,
      end,
    };
  },
  data() {
    return {
      departure: null,
      arrival: null,
    };
  },
  computed: {
    stops() {
      return this.shuttleFactory.stops.reduce((acc, stop) => {
        if (!acc.find(({ id }) => id === stop.id)) {
          acc.push(stop);
        }
        return acc;
      }, []);
    },
    todayShuttles() {
      return this.shuttles.filter(({ start }) => start <= DateTime.local().endOf('day').toISO());
    },
    starts() {
      return this.todayShuttles.map(() => false);
    },
  },
};
</script>

<style lang="scss" scoped>
  .form {
    fieldset {
      display: grid;
      grid-template-areas:
        'departure arrival'
    ;
      .start {
        grid-area: start;
        .mx-datepicker {
          width: 100%;
        }
      }
      .departure {
        grid-area: departure;
      }
      .arrival {
        grid-area: arrival;
      }
    }
  }
</style>
