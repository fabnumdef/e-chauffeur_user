<template>
  <nuxt-child
    :transport="transport"
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
      const { data: transport } = await $api.transports(null, FETCHED_DATA).getRide(params.transport_id);
      return {
        transport,
      };
    } catch (e) {
      throw new Error(`Impossible de trouver ou accéder aux informations de la course "${params.transport_id}"`);
    }
  },
};
</script>
