<template>
  <nuxt-child :campus="campus" />
</template>

<script>
export default {
  layout: 'ride-creation',
  async asyncData({ params, $api }) {
    try {
      const { data: campus } = await $api
        .query('campuses')
        .setMask('id,label,location(coordinates),defaultReservationScope')
        .get(params.campus_id);
      return {
        campus,
      };
    } catch (e) {
      throw new Error(`Impossible de trouver ou accéder aux informations de la base "${params.campus_id}"`);
    }
  },
};
</script>
