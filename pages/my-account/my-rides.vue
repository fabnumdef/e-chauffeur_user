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
              :id="ride.id"
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
    const { start, end } = filterManager.getFilter(currents);
    try {
      data = await filterManager.fetchDatas(
        $api.rides().getRides,
        {
          userId:  $auth.user.id,
          start,
          end,
          current: false,
        },
      );
    } catch (err) {
      console.log(err);
    }

    const rides = data.map(({
      _id,
      departure,
      arrival,
      createdAt,
      luggage,
      passengersCount,
    }) => {
      const { day, hour } = (filterManager.formatDate(createdAt));
      return {
        id: _id,
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
        const { start, end } = filterManager.getFilter(this.currents);
        const data = await filterManager.fetchDatas(
          this.$api.rides().getRides,
          {
            userId: this.$auth.user.id,
            start,
            end,
            current: false,
          }
        );

        this.rides = data.map(({
          departure,
          arrival,
          createdAt,
          luggage,
          passengersCount,
          _id,
        }) => {
          const { day, hour } = (filterManager.formatDate(createdAt));
          return {
            id: _id,
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
