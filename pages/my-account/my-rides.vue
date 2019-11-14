<template>
  <section class="section">
    <div class="columns">
      <div class="column is-6">
        <nav>
          <FilterDropdown
            type="year"
            :current="currents.year"
            :list="selects.years"
            @filter-results="setFilter"
          />
          <FilterDropdown
            type="month"
            :current="currents.month"
            :list="selects.months"
            @filter-results="setFilter"
          />
        </nav>
      </div>
      </div>
    <div class="columns">
      <div class="column is-5">
        <p class="alert-message" v-if="rides.length < 1">
          Aucunes courses réalisées en {{ currents.month }} {{ currents.year }}
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
  </section>
</template>

<script>
import RideCard from '~/components/ride-card';
import FilterDropdown from '~/components/elements/filter-dropdown';
import FilterManager from '../../helpers/FilterManager';

const filterManager = new FilterManager('fr-FR', 2019);
const selects = filterManager.getSelects();
const currents =  filterManager.getCurrents();

export default {
  name: 'Rides',
  data() {
    return {
      selects,
      currents,
    };
  },
  components: {
    RideCard,
    FilterDropdown,
  },
  async asyncData({ $api, $auth, $toast }) {
    let data;
    try {
      data = await filterManager.fetchDatas(
        $api.rides().getRides,
        $auth.user.id,
        currents,
      );
    } catch (err) {
      console.log(err);
    }

    const rides = data.map(({
      departure,
      arrival,
      createdAt,
      luggage,
      passengersCount,
    }) => {
      const { day, hour } = (filterManager.formatDate(createdAt));
      return {
        departure: departure.label,
        arrival: arrival.label,
        day,
        hour,
        luggage,
        passengersCount,
      };
    });
    return { rides };
  },
  methods: {
    setFilter({ key, value }) {
      this.currents = {
        ...this.currents,
        [key]: value,
      }
      this.fetchFilter();
    },
    async fetchFilter() {
      try {
        const data = await filterManager.fetchDatas(
          this.$api.rides().getRides,
          this.$auth.user.id,
          this.currents
        );

        this.rides = data.map(({
          departure,
          arrival,
          createdAt,
          luggage,
          passengersCount,
        }) => {
          const { day, hour } = (filterManager.formatDate(createdAt));
          return {
            departure: departure.label,
            arrival: arrival.label,
            day,
            hour,
            luggage,
            passengersCount,
          }
        });
      } catch (err) {
        this.$toast.error(err);
      }
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
