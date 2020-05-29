<template>
  <creation-step
    :previous-step="{
      name: 'campus-shuttles-book',
      params: { campus: campus.id }
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
          <h2>Départ</h2>
          <div>
            <b-field
              label="Arrêt"
              label-for="departureStop"
            >
              <input
                id="departureStop"
                :value="departure.label"
                disabled
                class="input"
              >
            </b-field>
            <b-field
              label="Horaire"
              label-for="departureDate"
            >
              <input
                id="departureDate"
                :value="ISODateToLocaleString(departure.time, FULL_DATE)"
                disabled
                class="input"
              >
            </b-field>
          </div>
          <h2>Arrivée</h2>
          <div>
            <b-field
              label="Arrêt"
              label-for="departureStop"
            >
              <input
                id="arrivalStop"
                :value="arrival.label"
                disabled
                class="input"
              >
            </b-field>
            <b-field
              label="Horaire"
              label-for="arrivalDate"
            >
              <input
                id="arrivalDate"
                :value="ISODateToLocaleString(arrival.time, FULL_DATE)"
                disabled
                class="input"
              >
            </b-field>
          </div>
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
import creationStep from '~/components/creation-step/generic.vue';
import formButton from '~/components/creation-step/form-button.vue';
import errorsManagement from '~/helpers/mixins/errors-management';

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
  async asyncData({ $api, params, query }) {
    const { data: shuttle } = await $api.query('shuttles')
      .setMask('id,passengers,shuttleFactory')
      .setCampus(params.campus)
      .get(query.shuttle);
    const departure = shuttle.shuttleFactory.stops.find((stop) => stop.id === query.departure);
    const arrival = shuttle.shuttleFactory.stops.find((stop) => stop.id === query.arrival);
    return {
      id: shuttle.id,
      passengers: shuttle.passengers,
      departure,
      arrival,
    };
  },
  computed: {
    FULL_DATE() {
      return {
        weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit',
      };
    },
  },
  methods: {
    ISODateToLocaleString(date, format = {}) {
      return DateTime.fromISO(date).toLocaleString(format);
    },
    async submit() {
      const { data: user } = await
      this.$api.query('jwt').setMask('id,email,firstname,lastname,phone(original)').user();
      const payload = {
        passengers: [
          ...this.passengers,
          {
            ...user,
            phone: user.phone.original,
            departure: this.departure,
            arrival: this.arrival,
          },
        ],
      };
      this.handleCommonErrorsBehavior(async () => {
        await this.$api.query('shuttles').setCampus(this.campus.id).edit(this.id, payload);
        this.$toast.success('Place réservée avec succès');
        this.$router.push('/');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .form {
    h2 {
      margin: 0 .5em;
      font-weight: 700;
      text-transform: uppercase;
    }
    fieldset > div  {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      margin-bottom: 1em;
    }

    @media screen and (max-width: 600px) {
      fieldset, fieldset div {
        display: flex;
        flex-direction: column;
        align-items: center;
        div, .field {
          width: 100%;
        }
      }
    }
  }
</style>
