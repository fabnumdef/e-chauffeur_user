<template>
  <creation-step
    form-title="Planifier un trajet"
    :previous-step="{ name: 'campus-select-type', params: { campus: campus.id }}"
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
            </nuxt-link>
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
        <form-button
          :disabled="!ride.start"
        />
      </form>
    </template>
    <template #footer>
      <information-icons />
    </template>
  </creation-step>
</template>

<script>
import { DateTime } from 'luxon';
import gprdWarning from '~/components/creation-step/gprd-warning.vue';
import informationIcons from '~/components/informations-icons.vue';
import creationStep from '~/components/creation-step/generic.vue';
import formButton from '~/components/creation-step/form-button.vue';
import numberInput from '~/components/form/number-input.vue';
import errorsManagement from '~/helpers/mixins/errors-management';

export default {
  components: {
    informationIcons,
    creationStep,
    gprdWarning,
    formButton,
    numberInput,
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
      default: () => ({
        start: null,
        luggage: false,
        passengersCount: 1,
        userComments: null,
      }),
    },
  },
  async asyncData({ $api }) {
    const { data } = await $api.query('jwt').setMask('gprd,phone(confirmed)').user();
    return { user: data };
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
      this.handleCommonErrorsBehavior(async () => {
        let data = {};
        const RideQuery = this.$api.query('rides').setMask('id,status').setCampus(this.campus.id);
        if (ride.id) {
          ({ data } = await RideQuery.edit(ride.id, ride));
        } else {
          ({ data } = await RideQuery.create(ride));
        }
        this.$router.push({
          name: 'campus-rides-id-select-pois',
          params: {
            campus: this.campus.id,
            id: data.id,
          },
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
  @import "~assets/css/head";
  .form {
    fieldset {
      display: grid;
      grid-template-areas: 'start start' 'passengers luggages' 'comments comments';

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
  }

</style>
