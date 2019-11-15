<template>
  <div>
    <div class="columns">
      <div class="column is-5">
        <p class="alert-message" v-if="rides.length < 1">
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
  </div>
</template>

<script>
import RideCard from '~/components/ride-card';
import FilterManager from '../../helpers/FilterManager';

const filterManager = new FilterManager('fr-FR', 2019);

export default {
  name: 'CurrentRides',
    components: {
      RideCard,
    },
  data() {
    return {
    }
  },
  async asyncData({ $api, $auth, $toast}) {
    let data;
    try {
      data = await filterManager.fetchDatas(
        $api.rides().getRides,
        {
          userId: $auth.user.id,
          current: true,
        }
      );
    } catch (err) {
      $toast.error(err);
    }

    const rides = data.map(({
      _id,
      departure,
      arrival,
      createdAt,
      luggage,
      passengersCount,
      status,
    }) => {
      const { day, hour } = filterManager.formatDate(createdAt);
      return {
        id: _id,
        departure: departure.label,
        arrival: arrival.label,
        day,
        hour,
        luggage,
        passengersCount,
        status,
      };
    });

    return { rides };
  },
  methods: {
    async deleteRide(id) {
      try {
        await this.$api.rides().deleteRide(
          this.$auth.user.id,
          id,
        );
      } catch (err) {
        this.$toast.error(err);
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
