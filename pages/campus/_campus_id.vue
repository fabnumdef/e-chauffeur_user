<template>
  <nuxt-child :campus="campus" />
</template>

<script>
export default {
  layout: 'ride-creation',
  async asyncData({ params, $api }) {
    try {
      const { data: campus } = await $api.campuses.getCampus(
        params.campus_id,
        'id,name,location(coordinates),defaultReservationScope',
      );
      return {
        campus,
      };
    } catch (e) {
      throw new Error(`Impossible de trouver ou accéder aux informations de la base "${params.campus_id}"`);
    }
  },
};
</script>
