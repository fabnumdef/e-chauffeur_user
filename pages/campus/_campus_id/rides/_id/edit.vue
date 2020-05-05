<template>
  <creation-step
    form-title="Planifier un trajet"
    :previous-step="{ name: 'campus-campus_id-select-type', params: { campus_id: campus.id }}"
  >
    <template #title>
      Réservez votre e-Chauffeur dès maintenant !
    </template>
    <template #subtitle>
      Sélectionner d'abord une date et renseigner des informations générales.
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
        @submit.prevent="create"
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
            class="start"
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
                :minute-step="10"
                format="YYYY-MM-DD HH:mm"
                required="required"
                input-class="input"
                placeholder="Sélectionner une date"
              />
            </client-only>
          </b-field>

          <b-field
            label="Nombre de passagers"
            label-for="passengersCount"
            class="passengers"
          >
            <number-input
              id="passengersCount"
              v-model="ride.passengersCount"
              :min="1"
              :max="10"
            />
          </b-field>

          <b-field
            label="Présence de bagages"
            label-for="luggage"
            class="luggage"
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

          <b-field
            label="Commentaires"
            label-for="userComments"
            class="comments"
          >
            <b-input
              v-model="ride.userComments"
              maxlength="150"
              type="text"
            />
          </b-field>
        </fieldset>
        <form-button :disabled="!ride.start" />
      </form>
    </template>
    <template #footer>
      <information-icons />
    </template>
  </creation-step>
</template>

<script>
import lGet from 'lodash.get';
import { DateTime } from 'luxon';
import gprdWarning from '~/components/creation-step/gprd-warning.vue';
import informationIcons from '~/components/informations-icons.vue';
import creationStep from '~/components/creation-step/generic.vue';
import formButton from '~/components/creation-step/form-button.vue';
import numberInput from '~/components/form/number-input.vue';

export default {
  layout: 'ride-creation',
  components: {
    informationIcons,
    creationStep,
    gprdWarning,
    formButton,
    numberInput,
  },
  props: {
    campus: {
      type: Object,
      default: () => ({}),
    },
    ride: {
      type: Object,
      default: () => ({
        start: null,
        luggage: false,
        passengersCount: 1,
        userComments: null,
      }),
    },
  },
  async asyncData({ $api }) {
    const { data } = await $api.jwt.getUser('gprd,phone(confirmed)');
    return { user: data };
  },
  data() {
    return {
      apiErrors: null,
      loading: false,
    };
  },
  computed: {
    maxReservationDate() {
      if (this.ride.campus) {
        return DateTime.local().plus({ seconds: this.ride.campus.defaultReservationScope });
      }
      return false;
    },
  },
  methods: {
    async create() {
      const ride = {
        ...this.ride,
        campus: this.campus,
      };
      try {
        this.loading = true;
        this.apiErrors = {};
        let data = {};
        const rideQuery = this.$api.rides(this.campus.id, 'id,status');
        if (ride.id) {
          ({ data } = await rideQuery.patchRide(ride.id, ride));
        } else {
          ({ data } = await rideQuery.postRide(ride));
        }
        this.$router.push({
          name: 'campus-campus_id-rides-ride_id-select-pois',
          params: {
            campus_id: this.campus.id,
            ride_id: data.id,
          },
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
    fieldset {
      display: grid;
      grid-template-areas:
        'start start'
        'passengers luggages'
        'comments comments'
    ;
      .start {
        grid-area: start;
        .mx-datepicker {
          width: 100%;
        }
      }
      .passengers {
        grid-area: passengers;
      }
      .luggages {
        grid-area: luggages;
      }
      .comments {
        grid-area: comments;
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
  .title, .subtitle {
    text-align: center;
    span {
      color: $blue-dark;
    }
  }
</style>
