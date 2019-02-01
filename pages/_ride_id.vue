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
    <section class="elements container">
      <ec-notif primary>{{rideId}}</ec-notif>
      {{ride}}
      {{ rideId }}
      <ec-box>
        <hr />
        <ec-button danger inverted fullwidth>Annuler la course</ec-button>
      </ec-box>
    </section>
  </main>
</template>

<script>
import ecNotif from '~/components/elements/notification.vue';
import ecBox from '~/components/elements/box.vue';
import ecButton from '~/components/elements/button.vue';
export default {
  components: {
    ecNotif,
    ecBox,
    ecButton,
  },
  asyncData: ({ params: { ride_id: rideId } }) => ({
    rideId,
  }),
};
</script>

<style scoped lang="scss">
  @import "~assets/css/head";

  .map {
    position: fixed;
    height: 100%;
    width: 100%;
    z-index: 0;
  }
  .elements {
    z-index: 1;
    position: relative;
    padding-top: $size-small
  }

  hr {
    background: $light-gray;
  }
</style>
