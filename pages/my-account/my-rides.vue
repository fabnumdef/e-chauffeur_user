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
      <div class="column is-6">
        <ul class="">
          <li><RideCard /></li>
          <li><RideCard /></li>
          <li><RideCard /></li>
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
        const { start, end } = filterManager.getFilter(this.currents.year, this.currents.month);
        const rides = await this.$api.rides().getRides(this.$auth.user.id, start, end);
        console.log(rides);
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "~assets/css/head";

  $select-color-placeholder: rgba(28,28,28,0.3);
  $select-color-placeholder-options: $black;
  $select-border-color: #abb8cb;
  $btn-submit-bg-color-disabled: #c8d3e0;
  $text-color: $blue-medium;

  .title {
    color: $text-color;
  }
</style>
