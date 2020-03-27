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

export default {
  components: {
    RideCard,
    Modal,
  },
  async asyncData({ $api, $auth }) {
    // @todo: start/end should not be relative to month here,
    // but start should be `current date - 30d` and end should be `now`
    const { start, end } = FilterManager.getFilter(currents);
    const { data } = await $api.query('rides')
      .setMask(mask)
      .list(start, end)
      .setFilter('userId', $auth.user.id)
      .setFilter('current', false);
    return { rides: formatData(data) };
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
        await this.$api.query('rides').mutate(this.currentRide.id, CANCEL_REQUESTED_CUSTOMER);
        this.$toast.success('Course supprimée avec succès');
      } catch (err) {
        this.$toast.error('Une erreur est survenue lors de la suppression.');
      }

      this.toggleModal();
      // @todo: start/end should not be relative to month here,
      // but start should be `current date - 30d` and end should be `now`
      const { start, end } = FilterManager.getFilter(currents);
      const { data } = await this.$api.query('rides')
        .setMask(mask)
        .list(start, end)
        .setFilter('userId', this.$auth.user.id)
        .setFilter('current', false);
      this.rides = formatData(data);
    },
  },
};
</script>

<style lang="scss" scoped>
  div.columns {
    margin-top: 2em;
  }
</style>
