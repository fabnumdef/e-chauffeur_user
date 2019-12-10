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
import Modal from '~/components/modal';
import RideCard from '~/components/ride-card';
import FilterManager from '~/helpers/filter-manager';

const filterManager = new FilterManager(2019);
const currents = filterManager.getCurrents();

const mask = 'id,departure(label),arrival(label),createdAt,luggage,passengersCount,status';

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
    };
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
        this.$toast.success('Course supprimée avec succès');
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
        this.rides = formatData(data);
      } catch (err) {
        this.$toast.error('Une erreur est survenue lors de la suppression.');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  div.columns {
    margin-top: 2em;
  }
</style>
