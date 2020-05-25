<template>
  <creation-step
    form-title="Réservez un transport"
    :previous-step="{ name: 'campus-select-type', params: { campus: campus.id }}"
  >
    <template #title>
      Réservez votre tranport dès maintenant !
    </template>
    <template #subtitle>
      Une fois que vous aurez renseigné votre adresse de départ et d'arrivée,
      nous vous proposerons les points de rencontre les plus proches.
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
                v-model="transport.start"
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
            label="Lieu de départ"
            label-for="departure"
            class="departure"
          >
            <b-input
              id="departure"
              v-model="transport.departure.address"
              placeholder="Adresse de départ souhaitée"
            />
          </b-field>

          <b-field
            label="Lieu d'arrivée"
            label-for="arrival"
            class="arrival"
          >
            <b-input
              id="arrival"
              v-model="transport.arrival.address"
              placeholder="Adresse d'arrivée souhaitée"
            />
          </b-field>

          <b-field
            label="Nombre de passagers"
            label-for="passengersCount"
            class="passengers"
          >
            <number-input
              id="passengersCount"
              v-model="transport.passengersCount"
              :min="8"
              :max="55"
            />
          </b-field>

          <b-field
            label="Présence de bagages"
            label-for="luggage"
            class="luggage"
          >
            <b-switch
              v-model="transport.luggage"
            >
              <template v-if="transport.luggage">
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
              v-model="transport.userComments"
              maxlength="150"
              type="text"
            />
          </b-field>
        </fieldset>
        <form-button
          :disabled="!transport.start || !transport.departure.address || !transport.arrival.address"
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
    transport: {
      type: Object,
      default: () => ({
        start: null,
        departure: {
          address: null,
        },
        arrival: {
          address: null,
        },
        luggage: false,
        passengersCount: 8,
        userComments: null,
        passengersList: [],
      }),
    },
  },
  async asyncData({ $api }) {
    const { data } = await $api.query('jwt').setMask('gprd,phone(confirmed)').user();
    return { user: data };
  },
  computed: {
    maxReservationDate() {
      if (this.transport.campus) {
        return DateTime.local().plus({ seconds: this.transport.campus.defaultReservationScope });
      }
      return false;
    },
  },
  methods: {
    async create() {
      const transport = {
        ...this.transport,
        campus: this.campus,
      };
      this.handleCommonErrorsBehavior(async () => {
        let res;
        const RideQuery = this.$api.query('rides').setMask('id').setCampus(this.campus.id);
        if (transport.id) {
          res = await RideQuery.edit(transport.id, transport);
        } else {
          res = await RideQuery.create(transport);
        }
        this.$router.push({
          name: 'campus-transports-id-passengers-list',
          params: {
            campus: this.campus.id,
            id: res.data.id,
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
      grid-template-areas:
        'start start'
        'departure arrival'
        'passengers luggages'
        'comments comments'
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
