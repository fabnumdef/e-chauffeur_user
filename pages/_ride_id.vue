<template>
  <main>
    <section class="map">
      <no-ssr>
        <l-map
          :zoom="13"
          :center="[47.413220, -1.219482]"
        >
          <l-tile-layer url="//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <l-marker :lat-lng="[47.413220, -1.219482]" />
        </l-map>
      </no-ssr>
    </section>
    <section class="elements">
      {{ rideId }}
    </section>
  </main>
</template>

<script>
export default {
  asyncData: ({ params: { ride_id: rideId } }) => ({
    rideId,
  }),
};
</script>

<style scoped lang="scss">
  .map {
    position: fixed;
    height: 100%;
    width: 100%;
    z-index: 0;
  }
  .elements {
    z-index: 1;
    position: relative;
    color: red;
  }
</style>
