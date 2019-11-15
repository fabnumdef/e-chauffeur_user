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

const mask = 'id,departure(label),arrival(label),createdAt,luggage,passengersCount';

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
        $api.rides(null, mask).getRides,
        {
          userId:  $auth.user.id,
          start,
          end,
          current: false,
        },
      );
    } catch (err) {
      $toast.error(err);
    }

    const rides = formatData(data);

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

        this.rides = formatData(data);
      } catch (err) {
        this.$toast.error(err);
      }
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
