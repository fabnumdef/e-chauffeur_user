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
        class="form"
        @submit.prevent="create(ride)"
      >
        <b-field
          label="Date et heure de départ"
          label-for="start"
          :type="getType('start')"
          :message="getError('start', 'Date de départ')"
        >
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
              <b-numberinput
                id="passengersCount"
                v-model="ride.passengersCount"
                :min="1"
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
        <button
          type="submit"
          class="button is-primary"
        >
          Demander
        </button>
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
import poiMap from '~/components/poi-map';

export default {
  components: {
    searchPoi,
    poiMap,
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
        await this.$api.rides(this.campus.id).postRide(ride);
        this.$toast.success('Votre course a bien été commandée !');
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
<style lang="scss">
  @import "~assets/css/head";
  .form {
    max-width: 806px;
    margin: 0 auto;

    background: #00245F;
    border: 2px solid #007AFF;
    box-sizing: border-box;
    border-radius: 13px;
    padding: $gap;
  }
  .map {
    margin: $gap 0;
    height: 500px;
  }
  .title {
    text-align: center;
  }
</style>
