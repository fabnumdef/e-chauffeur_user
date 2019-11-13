<template>
  <section class="section">
    <div class="columns">
      <div class="column is-6">
        <nav>Some nav</nav>
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

export default {
  name: 'Rides',
  components: {
    RideCard,
  },
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
