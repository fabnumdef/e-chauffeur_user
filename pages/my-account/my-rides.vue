<template>
  <section class="section">
    <div class="columns">
      <div class="column is-6">
        <nav>
          <FilterDropdown
            type="year"
            :current="filter.year"
            :list="years"
            @filter-results="setFilter"
          />
          <FilterDropdown
            type="month"
            :current="filter.month"
            :list="months"
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

let years = [];
for (let year = 2019; year <= new Date().getFullYear(); year += 1) {
  years.push(year);
}

let months = [];
for (let month = 0; month < 12; month += 1 ) {
  months.push(new Date(null, month).toLocaleString('fr-FR', { month: 'long'}));
}

export default {
  name: 'Rides',
  data() {
    return {
      years,
      months,
      filter: {
        year: new Date().getFullYear().toString(),
        month: new Date().toLocaleString('fr-FR', { month: 'long' }),
      }
    };
  },
  components: {
    RideCard,
    FilterDropdown,
  },
  methods: {
    setFilter({ key, value }) {
      console.log(key, value);
      console.log(this.filter.year, this.filter.month);
      this.filter = {
        ...this.filter,
        [key]: value,
      }
      console.log(this.filter.year, this.filter.month);
    },
    fetchFilter(value) {
      console.log(value);
      console.log(this.filter);
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
