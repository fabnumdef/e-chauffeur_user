<template>
  <main>
    <section
      class="section"
    >
      <div class="title">
        Réservez votre e-Chauffeur à <span>{{ campus.name }}</span> dès maintenant !
      </div>
    </section>
    <section class="white-section">
      <section
        v-if="!user.gprd"
        class="white-section"
      >
        <fieldset class="form blue-box">
          Avant toute commande de course, vous devez accepter les conditions d'utilisation
          <nuxt-link :to="{name: 'my-account-edit-account'}">
            au sein de votre compte
          </nuxt-link>.
          <help-button class="has-text-centered">
            Une urgence ? Besoin d'aide ?
          </help-button>
        </fieldset>
      </section>
      <form
        v-else
        class="form blue-box"
        @submit.prevent="save(ride)"
      >
        <fieldset class="fields-box">
          <b-field v-if="!user.phone || !user.phone.confirmed">
            Si vous souhaitez être notifié sur votre téléphone, vous devez
            <nuxt-link :to="{name: 'my-account-edit-account'}">
              renseigner et confirmer votre numéro de téléphone
            </nuxt-link>.
          </b-field>
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
                :not-after="maxReservationDate"
                lang="fr"
                append-to-body
                type="datetime"
                :first-day-of-week="1"
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
            label="Commentaires / motif"
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
        <div class="buttons is-centered">
          <button
            v-if="isDraft"
            type="submit"
            class="button is-primary"
          >
            Passer à l'étape suivante
          </button>
          <button
            v-else
            class="button is-danger"
            disabled
          >
            Impossible de modifier une demande déjà validée.
          </button>
          <help-button class="is-pulled-right">
            Une urgence ? Besoin d'aide ?
          </help-button>
        </div>
      </form>
      <poi-map
        class="map"
        :campus="campus"
        :departure="ride.departure"
        :arrival="ride.arrival"
        @click="selectPoi"
      />
    </section>
  </main>
</template>

<script>
import lGet from 'lodash.get';
import merge from 'lodash.merge';
import { DateTime } from 'luxon';
import { DRAFTED } from '@fabnumdef/e-chauffeur_lib-vue/api/status/states';
import searchPoi from '~/components/form/search-poi.vue';
import numberInput from '~/components/form/number-input.vue';
import poiMap from '~/components/poi-map.vue';
import helpButton from '~/components/help.vue';

export default {
  // @todo get POI before calling components, and pass data as parameters to prevent 1 querying
  components: {
    searchPoi,
    poiMap,
    numberInput,
    helpButton,
  },
  props: {
    ride: {
      type: Object,
      default: () => ({
        start: null,
        departure: {
          id: null,
          label: null,
        },
        arrival: {
          id: null,
          label: null,
        },
        luggage: null,
        passengersCount: 1,
        userComments: null,
      }),
    },
    campus: {
      type: Object,
      default: () => ({}),
    },
  },
  async asyncData({ $api }) {
    const { data } = await $api.query('jwt').setMask('gprd,phone(confirmed)').user();
    return { user: data };
  },
  data() {
    return {
      apiErrors: null,
      loading: false,
    };
  },
  computed: {
    isDraft() {
      return !this.ride.status || this.ride.status === DRAFTED;
    },
    maxReservationDate() {
      return DateTime.local().plus({ seconds: this.campus.defaultReservationScope });
    },
  },
  methods: {
    async save(ride) {
      try {
        this.loading = true;
        this.apiErrors = {};
        let data = {};
        merge(ride, { campus: this.campus });
        const rideQuery = this.$api.query('rides').setMask('id,status');
        if (ride.id) {
          ({ data } = await rideQuery.edit(ride.id, ride));
        } else {
          ({ data } = await rideQuery.create(ride));
        }
        this.$router.push({
          name: 'campus-campus_id-rides-ride_id-confirm',
          params: { campus_id: this.campus.id, ride_id: data.id },
        });
      } catch ({ response }) {
        if (response.status === 422) {
          this.$toast.error('Erreur : Veuillez vérifier les données renseignées.');
        } else {
          this.$toast.error('Une erreur est survenue lors de la création de votre course. '
            + 'Celle-ci n\'a pas été créée. Vérifiez vos informations puis réessayez.');
          this.apiErrors = lGet(response, 'data', {});
        }
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
    selectPoi(poi) {
      if (this.ride.departure.id === poi.id) {
        this.ride.departure = { id: null, label: null };
      } else if (this.ride.arrival.id === poi.id) {
        this.ride.arrival = { id: null, label: null };
      } else if (this.ride.departure.id === null) {
        Object.assign(this.ride.departure, poi);
      } else if (this.ride.arrival.id === null) {
        Object.assign(this.ride.arrival, poi);
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
      a {
        text-decoration: underline;
        font-weight: bold;
      }
    }
    .fields-box {
      /deep/ .label {
        color: $blue-light;
      }
      /deep/ .input {
        border: none;
        color: $white;
        font-weight: bold;
        border-bottom: 1px solid $primary;
        &::placeholder {
          color: $white;
        }
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
    span {
      color: $blue-dark;
    }
  }
</style>
