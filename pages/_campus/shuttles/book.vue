<template>
  <creation-step
    form-title="Réservez une navette"
    :previous-step="{ name: 'campus-select-type', params: { campus: campus.id }}"
  >
    <template #title>
      Réservez votre navette dès maintenant !
    </template>
    <template #subtitle>
      Sélectionnez d'abord la date et le trajet que vous souhaitez emprunter.
    </template>
    <template
      v-if="!user.gprd"
      #alert
    >
      <gprd-warning />
    </template>
    <template #form>
      <form
        class="form blue-box"
        @submit.prevent="submit"
      >
        <fieldset class="fields-box">
          <b-field v-if="!user.phone || !user.phone.confirmed">
            Si vous souhaitez être notifié sur votre téléphone, vous devez
            <nuxt-link :to="{name: 'my-account-edit-account'}">
              renseigner et confirmer votre numéro de téléphone
            </nuxt-link>
          </b-field>

          <b-field
            label="Date et heure de départ"
            label-for="start"
            class="date"
          >
            <client-only>
              <date-time
                id="start"
                v-model="date"
                :not-before="new Date()"
                :not-after="maxReservationDate"
                lang="fr"
                append-to-body
                type="datetime"
                :minute-step="10"
                format="YYYY-MM-DD HH:mm"
                input-class="input"
                placeholder="Sélectionner une date"
              />
            </client-only>
          </b-field>

          <b-field
            label="Trajets possibles"
            label-for="shuttle-factory"
            class="shuttle-factory"
          >
            <vue-multiselect
              :value="shuttleFactory"
              placeholder="Sélectionner une navette"
              :options="shuttleFactories"
              track-by="id"
              label="label"
              :disabled="!date"
              @input="selectShuttleFactory"
            />
          </b-field>

          <template v-if="shuttles && shuttles.length > 0">
            <template v-if="shuttleFactory">
              <b-field
                label="Arrêt de départ"
                label-for="departure"
                class="departure"
              >
                <vue-multiselect
                  v-model="departure.stop"
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
                v-if="shuttleFactory"
                label="Arrêt d'arrivée"
                label-for="arrival"
                class="arrival"
              >
                <vue-multiselect
                  v-model="arrival.stop"
                  :options="endStops"
                  track-by="id"
                  label="label"
                >
                  <template #placeholder>
                    <fa-icon :icon="['fas', 'map-marker-alt']" />
                    <span>Sélectionner votre arrêt</span>
                  </template>
                </vue-multiselect>
              </b-field>
              <template v-if="departure.stop && arrival.stop">
                <b-field
                  label="Heure de passage estimée"
                  label-for="start"
                >
                  <vue-multiselect
                    :value="departure.date"
                    :options="possibleStarts"
                    track-by="id"
                    label="label"
                    :disabled="!departure.stop || !arrival.stop"
                    placeholder="Veuillez sélectionner un horaire"
                    @input="updateSelectedShuttle"
                  />
                </b-field>

                <b-field
                  label="Heure de passage estimée"
                  label-for="end"
                  class="end"
                >
                  <input
                    class="input"
                    type="text"
                    :value="ISODateToLocaleString(arrival.date, HOUR_AND_MINUTES_TWO_DIGITS)"
                    disabled
                  >
                </b-field>
              </template>
            </template>
          </template>
          <div
            v-else-if="shuttleFactory && date"
            class="alert"
          >
            Pas de navettes prévues ce jour sur ce trajet
          </div>
        </fieldset>
        <form-button :disabled="!date || !shuttleFactory || shuttles.length === 0" />
      </form>
    </template>
    <template #footer>
      <shuttle-factories-map
        class="map"
        :campus="campus"
        :shuttle-factories="shuttleFactories"
        @click="selectShuttleFactory"
      />
    </template>
  </creation-step>
</template>

<script>
import { DateTime } from 'luxon';
import gprdWarning from '~/components/creation-step/gprd-warning.vue';
import creationStep from '~/components/creation-step/generic.vue';
import formButton from '~/components/creation-step/form-button.vue';
import errorsManagement from '~/helpers/mixins/errors-management';
import shuttleFactoriesMap from '~/components/maps/shuttle-factories.vue';

const SHUTTLE_FACTORIES_MASK = 'id,label,stops';
const SHUTTLE_MASK = '*';

export default {
  components: {
    shuttleFactoriesMap,
    creationStep,
    gprdWarning,
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
  },
  async asyncData({ $api, params }) {
    const { data: user } = await $api.query('jwt').setMask('gprd,phone(confirmed)').user();
    const { data: shuttleFactories } = await $api.query('shuttleFactories')
      .setMask(SHUTTLE_FACTORIES_MASK).setCampus(params.campus).list();
    return { user, shuttleFactories };
  },
  data() {
    return {
      date: null,
      shuttleFactory: null,
      shuttles: [],
      departure: {
        stop: null,
        date: null,
      },
      arrival: {
        stop: null,
        date: null,
      },
    };
  },
  computed: {
    HOUR_AND_MINUTES_TWO_DIGITS() {
      return { hour: '2-digit', minute: '2-digit', hour12: false };
    },
    maxReservationDate() {
      if (this.campus) {
        return DateTime.local().plus({ seconds: this.campus.defaultReservationScope });
      }
      return false;
    },
    stops() {
      return this.shuttleFactory.stops.reduce((acc, stop) => (
        !acc.find(({ id }) => id === stop.id) ? [...acc, stop] : acc
      ), []);
    },
    endStops() {
      if (this.departure.stop) {
        return this.shuttleFactory.stops.reduce((acc, stop) => (
          stop.id === this.departure.stop.id ? [] : [...acc, stop]
        ), []);
      }
      return this.stops;
    },
    possibleStarts() {
      if (this.departure.stop) {
        const todayShuttles = this.shuttles.filter(({ start }) => start
          <= DateTime.fromJSDate(this.date).endOf('day').toISO());
        if (todayShuttles.length > 0) {
          return todayShuttles.map(({ id, shuttleFactory }) => {
            const concernedStop = shuttleFactory.stops.find((stop) => stop.id === this.departure.stop.id);
            return {
              id,
              label: `${this.ISODateToLocaleString(concernedStop.time, this.HOUR_AND_MINUTES_TWO_DIGITS)}`,
              ISO: concernedStop.time,
            };
          });
        }
      }
      return [];
    },
  },
  watch: {
    'arrival.stop': {
      handler() {
        if (this.selectedShuttle) {
          const concernedStop = this.selectedShuttle.shuttleFactory.stops.find((stop) => stop.id
            === this.arrival.stop.id);
          this.arrival.date = concernedStop.time;
        }
      },
    },
  },
  methods: {
    ISODateToLocaleString(date, format = {}) {
      if (date) {
        return DateTime.fromISO(date).toLocaleString(format);
      }
      return null;
    },
    updateSelectedShuttle(stop) {
      this.selectedShuttle = this.shuttles.find((shuttle) => shuttle.id === stop.id);
      this.departure.date = stop;
      if (this.arrival.stop) {
        const endStop = this.selectedShuttle.shuttleFactory.stops.find((s) => s.id === this.arrival.stop.id);
        this.arrival.date = endStop.time;
      }
    },
    async selectShuttleFactory(data) {
      this.shuttleFactory = data;
      const end = DateTime.fromJSDate(this.date).plus({ days: 30 }).toISO();
      this.handleCommonErrorsBehavior(async () => {
        const { data: shuttles } = await this.$api.query('shuttles')
          .setMask(SHUTTLE_MASK)
          .setCampus(this.campus.id)
          .list(this.date, end)
          .setFilter('shuttleFactory._id', this.shuttleFactory.id);
        this.shuttles = shuttles;
      });
    },
    submit() {
      this.$router.push({
        name: 'campus-shuttles-confirm',
        params: { campus: this.campus.id },
        query: {
          shuttle: this.selectedShuttle.id,
          departure: this.departure.stop.id,
          arrival: this.arrival.stop.id,
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
  @import "~assets/css/head";
  .form {
    position: relative;
    .mx-datepicker {
      width: 100%;
      margin-bottom: 1em;
    }
    fieldset {
      display: grid;
      grid-template-areas:
        'date shuttle-factory'
        'departure arrival'
        'start end'
    ;
      .date {
        grid-area: date;
        grid-template-columns: repeat(2, 1fr);
        .mx-datepicker {
          width: 100%;
        }
      }
      .shuttle-factory {
        grid-area: shuttle-factory;
      }
      .departure {
        grid-area: departure;
      }
      .arrival {
        grid-area: arrival;
      }
      .start {
        grid-area: start;
      }
      .end {
        grid-area: end;
      }
      .alert {
        font-weight: 700;
        text-align: center;
      }
    }
  }
</style>
