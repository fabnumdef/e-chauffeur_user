<template>
  <main>
    <section
      class="section"
    >
      <div class="title">
        Réservez votre e-Chauffeur dès maintenant !
      </div>
    </section>
    <section class="white-section">
      <form
        class="form blue-box"
        @submit.prevent="create(ride)"
      >
        <fieldset class="fields-box">
          <b-field
            label="Date et heure de départ"
            label-for="start"
            :type="getType('start')"
            :message="getError('start', 'Date de départ')"
          >
            <client-only>
              <date-time
                id="start"
                v-model="ride.start"
                :not-before="new Date()"
                lang="fr"
                append-to-body
                type="datetime"
                :minute-step="10"
                format="YYYY-MM-DD HH:mm"
                required="required"
                :input-class="`${getType('start') || ''} input`"
              >
                <template #calendar-icon>
                  &nbsp;
                </template>
              </date-time>
            </client-only>
          </b-field>
          <div class="columns">
            <div class="column">
              <b-field
                label="Lieu de départ"
                label-for="departure"
                :type="getType('departure')"
                :message="getError('departure', 'Lieu de départ')"
              >
                <search-poi
                  id="departure"
                  v-model="ride.departure"
                  :campus="campus"
                />
              </b-field>
            </div>
            <div class="column">
              <b-field
                label="Lieu d'arrivée"
                label-for="arrival"
                :type="getType('arrival')"
                :message="getError('arrival', 'Lieu d\'arrivée')"
              >
                <search-poi
                  id="arrival"
                  v-model="ride.arrival"
                  :campus="campus"
                />
              </b-field>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <b-field
                label="Nombre de passagers"
                label-for="passengersCount"
                :type="getType('passengersCount')"
                :message="getError('passengersCount', 'Nombre de passagers')"
              >
                <number-input
                  id="passengersCount"
                  v-model="ride.passengersCount"
                  :min="1"
                  :max="10"
                />
              </b-field>
            </div>
            <div class="column">
              <b-field
                label="Présence de bagages"
                :type="getType('luggage')"
                :message="getError('luggage', 'Présence de bagages')"
              >
                <b-switch
                  v-model="ride.luggage"
                >
                  <template v-if="ride.luggage">
                    Oui
                  </template>
                  <template v-else>
                    Non
                  </template>
                </b-switch>
              </b-field>
            </div>
          </div>
          <b-field
            label="Commentaires"
            :type="getType('userComments')"
            :message="getError('userComments', 'Commentaires')"
          >
            <b-input
              v-model="ride.userComments"
              maxlength="400"
              type="text"
            />
          </b-field>
        </fieldset>
        <help-button class="is-pulled-right">
          Besoin d'aide ?
        </help-button>
        <div class="buttons is-centered">
          <button
            type="submit"
            class="button is-primary"
          >
            Passer à l'étape suivante
          </button>
        </div>
      </form>
      <poi-map
        class="map"
        :campus="campus"
        :departure="ride.departure"
        :arrival="ride.arrival"
      />
    </section>
  </main>
</template>

<script>
import lGet from 'lodash.get';
import searchPoi from '~/components/form/search-poi';
import numberInput from '~/components/form/number-input';
import poiMap from '~/components/poi-map';
import helpButton from '~/components/help.vue';

export default {
  components: {
    searchPoi,
    poiMap,
    numberInput,
    helpButton,
  },
  props: {
    campus: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      apiErrors: null,
      loading: false,
      ride: {
        start: null,
        departure: {
          id: null,
        },
        arrival: {
          id: null,
        },
        luggage: null,
        passengersCount: 1,
        userComments: null,
      },
    };
  },
  methods: {
    async create(ride) {
      try {
        this.loading = true;
        this.apiErrors = {};
        const { data } = await this.$api.rides(this.campus.id, 'id,status').postRide(ride);
        this.$router.push({
          name: 'campus-campus_id-rides-ride_id-confirm',
          params: { campus_id: this.campus.id, ride_id: data.id },
        });
      } catch (e) {
        this.$toast.error('Une erreur est survenue lors de la création de votre course. '
          + 'Celle-ci n\'a pas été créée. Vérifiez vos informations puis réessayez.');
        this.apiErrors = lGet(e, 'response.data', {});
      } finally {
        this.loading = false;
      }
    },
    getError(path, label) {
      const error = (this.apiErrors || {})[path];
      if (!error) {
        return null;
      }
      switch (error.kind) {
        case 'required':
          return `Le champ ${label} est requis`;
        default:
          return `Le champ ${label} comporte une erreur`;
      }
    },
    getType(path) {
      if (!this.apiErrors) {
        return null;
      }
      return this.apiErrors[path] ? 'is-danger' : 'is-success';
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
