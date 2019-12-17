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
              :status="ride.status"
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
import Modal from '~/components/modal';
import RideCard from '~/components/ride-card';
import FilterManager from '~/helpers/filter-manager';

const filterManager = new FilterManager(2019);
const currents = filterManager.getCurrents();

const mask = 'id,departure(label),arrival(label),createdAt,luggage,passengersCount,status';
const CANCEL_REQUESTED_CUSTOMER = 'cancel_requested_by_customer';

const formatData = (data) => data.map((ride) => {
  const { day, hour } = (FilterManager.formatDate(ride.createdAt));
  return {
    ...ride,
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
    const { start, end } = filterManager.getFilter(currents);
    const { data } = await $api.rides(null, mask).getRides(
      start,
      end,
      {},
      {
        filter: {
          userId: $auth.user.id,
          current: true,
        },
      },
    );

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
        await this.$api.rides().mutateRide(
          this.currentRide,
          CANCEL_REQUESTED_CUSTOMER,
        );
        this.$toast.success('Course supprimée avec succès');
      } catch (err) {
        this.$toast.error('Une erreur est survenue lors de la suppression.');
      }
      const { start, end } = filterManager.getFilter(currents);
      const { data } = await this.$api.rides(null, mask).getRides(
        start,
        end,
        {},
        {
          filter: {
            userId: this.$auth.user.id,
            current: true,
          },
        },
      );
      this.toggleModal();
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
