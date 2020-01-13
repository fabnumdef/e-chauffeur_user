<template>
  <div>
    <div class="columns">
      <div class="column is-5">
        <p
          v-if="rides === null || rides.length < 1"
          class="alert-message"
        >
          Aucune réservation en cours
        </p>
        <ul v-else>
          <li
            v-for="(ride, index) in rides"
            :key="index"
          >
            <RideCard
              :id="ride.id"
              :day="ride.day"
              :hour="ride.hour"
              :departure="ride.departure"
              :arrival="ride.arrival"
              :passengers-count="ride.passengersCount"
              :luggage="ride.luggage"
              :status="ride.translatedStatus"
              @delete-ride="toggleModal"
            />
          </li>
        </ul>
      </div>
    </div>
    <Modal
      :active="isModalActive"
      title="Suppression de la course"
      content="Êtes-vous sûr de vouloir supprimer cette course ?"
      @toggle-modal="toggleModal"
      @action="deleteRide"
    />
  </div>
</template>

<script>
import {
  CREATED, VALIDATED, ACCEPTED, STARTED, WAITING, IN_PROGRESS, CANCEL_REQUESTED_CUSTOMER,
} from '@fabnumdef/e-chauffeur_lib-vue/api/status/states';
import Modal from '~/components/modal.vue';
import RideCard from '~/components/ride-card.vue';
import FilterManager from '~/helpers/filter-manager';

const filterManager = new FilterManager(2019);
const currents = filterManager.getCurrents();

const mask = 'id,departure(label),arrival(label),createdAt,luggage,passengersCount,status';

const translateStatus = (status) => {
  switch (status) {
    case CREATED:
      return 'Créée';
    case VALIDATED:
      return 'Validée';
    case ACCEPTED:
      return 'Acceptée';
    case STARTED:
      return 'Commencée';
    case WAITING:
      return 'En attente';
    case IN_PROGRESS:
      return 'En cours';
    default:
      return '';
  }
};

const formatData = (data) => data.map((ride) => {
  const { day, hour } = (FilterManager.formatDate(ride.createdAt));
  return {
    ...ride,
    translatedStatus: translateStatus(ride.status),
    departure: ride.departure.label,
    arrival: ride.arrival.label,
    day,
    hour,
  };
});

const fetchRides = async (apiCall, userId) => {
  const { start, end } = filterManager.getFilter(currents);
  const { data } = await apiCall(
    start, end, {},
    {
      filter: {
        userId,
        current: true,
      },
    },
  );
  return formatData(data);
};

export default {
  components: {
    RideCard,
    Modal,
  },
  async asyncData({ $api, $auth }) {
    const rides = await fetchRides($api.rides(null, mask).getRides, $auth.user.id);
    return { rides };
  },
  data() {
    return {
      isModalActive: false,
      currentRide: null,
    };
  },
  methods: {
    toggleModal(id) {
      this.isModalActive = !this.isModalActive;
      if (id) {
        [this.currentRide] = this.rides.filter((ride) => ride.id === id);
      }
    },
    async deleteRide() {
      try {
        await this.$api.rides().mutateRide(
          this.currentRide,
          CANCEL_REQUESTED_CUSTOMER,
        );
        this.$toast.success('Course supprimée avec succès');
      } catch (err) {
        this.$toast.error('Une erreur est survenue lors de la suppression.');
      }

      this.toggleModal();
      this.rides = await fetchRides(this.$api.rides(null, mask).getRides, this.$auth.user.id);
    },
  },
};
</script>

<style lang="scss" scoped>
  div.columns {
    margin-top: 2em;
  }
</style>
