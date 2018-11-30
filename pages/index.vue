<template>
  <div class="container has-text-centered">
    <img
      src="~/static/logo.svg"
      alt="E-chauffeur">
    <form @submit.prevent="loadRide(rideId)">
      <ec-field>
        <input
          v-model="rideId"
          class="input"
          type="text"
          placeholder="Identifiant de course">
      </ec-field>
      <button
        :disabled="!rideId"
        class="button"
        type="submit">Voir la course</button>
    </form>
  </div>
</template>

<script>
import ecField from '~/components/form/field.vue';

export default {
  components: {
    ecField,
  },
  data: () => ({ rideId: null }),
  methods: {
    loadRide(rideId) {
      this.$router.push({ name: 'ride_id', params: { ride_id: rideId } });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/css/head";
.container {
  max-width: 500px;
  padding: $size-1;
}
</style>
