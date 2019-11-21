<template>
  <div>
    <div class="columns">
      <div class="column is-5">
        <p class="alert-message" v-if="rides === null || rides.length < 1">
          Aucune réservation en cours
        </p>
        <ul v-else>
          <li
            v-for="ride in rides"
          >
            <RideCard
              :id="ride.id"
              :day="ride.day"
              :hour="ride.hour"
              :departure="ride.departure"
              :arrival="ride.arrival"
              :passengersCount="ride.passengersCount"
              :luggage="ride.luggage"
              :status="ride.status"
              @delete-ride="deleteRide"
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
import Modal from '~/components/modal'
import RideCard from '~/components/ride-card';
import FilterManager from '~/helpers/FilterManager';

const filterManager = new FilterManager(2019);
const currents =  filterManager.getCurrents();

const mask = 'id,departure(label),arrival(label),createdAt,luggage,passengersCount,status';

const formatData = (data) => data.map((ride) => {
  const { day, hour } = (filterManager.formatDate(ride.createdAt));
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
  data() {
    return {
      isModalActive: false,
    }
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
  methods: {
    toggleModal() {
      this.isModalActive = !this.isModalActive;
    },
    async deleteRide(id) {
      try {
        await this.$api.rides().deleteRide(
          this.$auth.user.id,
          id,
        );
      } catch (err) {
        this.$toast.error('Une erreur est survenue lors de la suppression.');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  div.columns {
    margin-top: 2em;
  }
</style>
