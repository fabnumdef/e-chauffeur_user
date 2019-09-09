<template>
  <nuxt-child
    :ride="ride"
    :campus="campus"
  />
</template>

<script>
const FETCHED_DATA = 'id,start,status,departure(id,label),arrival(id,label),luggage,passengersCount,userComments';
export default {
  layout: 'ride-creation',
  props: {
    campus: {
      type: Object,
      default: () => ({}),
    },
  },
  async asyncData({ params, $api }) {
    try {
      const { data: ride } = await $api.rides(params.campus_id, FETCHED_DATA)
        .getRide(params.ride_id);
      return {
        ride,
      };
    } catch (e) {
      throw new Error(`Impossible de trouver ou accéder aux informations de la course "${params.ride_id}"`);
    }
  },
};
</script>
