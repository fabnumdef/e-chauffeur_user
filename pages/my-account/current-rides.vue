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
              :day="ride.day"
              :hour="ride.hour"
              :departure="ride.departure"
              :arrival="ride.arrival"
              :passengersCount="ride.passengersCount"
              :luggage="ride.luggage"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CurrentRides',
  data() {
    return {
    }
  },
  async created() {

  }
};
</script>

<style scoped>

</style>
