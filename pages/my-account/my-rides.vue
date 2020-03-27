<template>
  <section class="section">
    <div class="columns">
      <div class="column is-6">
        <nav>
          <filter-dropdown
            type="year"
            :current="currents.year.toString()"
            :list="selects.years"
            @filter-results="setFilter"
          />
          <filter-dropdown
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
        <p
          v-if="rides === null || rides.length < 1"
          class="alert-message"
        >
          Aucunes courses réalisées en {{ currents.monthName }} {{ currents.year }}
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
            />
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import { DateTime } from 'luxon';
import RideCard from '~/components/ride-card.vue';
import FilterDropdown from '~/components/elements/filter-dropdown.vue';
import FilterManager from '~/helpers/filter-manager';

const filterManager = new FilterManager(2019);
const selects = filterManager.getSelects();
const currents = filterManager.getCurrents();

const mask = 'id,departure(label),arrival(label),createdAt,luggage,passengersCount';

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
    FilterDropdown,
  },
  async asyncData({ $api, $auth }) {
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
      selects,
      currents,
    };
  },
  methods: {
    setFilter({ key, value }) {
      this.currents = {
        ...this.currents,
        [key]: value,
      };
      this.currents.monthName = DateTime
        .local(parseInt(this.currents.year, 10), parseInt(this.currents.month, 10))
        .toLocaleString({ month: 'long' });
      this.fetchFilter();
    },
    async fetchFilter() {
      const { start, end } = FilterManager.getFilter(this.currents);
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
