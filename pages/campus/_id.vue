<template>
  <nuxt-child :campus="campus" />
</template>

<script>
export default {
  layout: 'ride-creation',
  async asyncData({ params, $api }) {
    try {
      const { data: campus } = await $api.campuses.getCampus(params.id, 'id,label,location(coordinates)');
      return {
        campus,
      };
    } catch (e) {
      throw new Error(`Impossible de trouver ou accéder aux informations de la base "${params.id}"`);
    }
  },
};
</script>
