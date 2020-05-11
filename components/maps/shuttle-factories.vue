<template>
  <div>
    <client-only>
      <l-map
        ref="map"
        :zoom="13"
        :center="mapCenter"
      >
        <l-tile-layer url="//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <l-marker
          v-for="stop in flavoredMarkers"
          :key="stop.id"
          :lat-lng="stop.position"
          @click="onClick(stop)"
        >
<!--          <l-icon-->
<!--            :icon-size="[48,48]"-->
<!--            :icon-anchor="[24, 48]"-->
<!--            :class="`line&#45;&#45;${stop.line.index}`"-->
<!--          >-->
<!--            <div class="marker-icon departure" />-->
<!--            <b-tag-->
<!--              class="tag"-->
<!--              type="is-primary"-->
<!--              size="is-medium"-->
<!--            >-->
<!--              {{ stop.label }}-->
<!--            </b-tag>-->
<!--          </l-icon>-->
        </l-marker>
      </l-map>
    </client-only>
  </div>
</template>

<script>
import setMap from '~/components/maps/mixins/set-map';

export default {
  mixins: [
    setMap({
      flavoredMarkers() {
        return this.shuttleFactories.reduce((acc, shuttleFactory, i) => [
          ...acc,
          ...shuttleFactory.stops.map((stop) => ({
            ...stop,
            position: [...stop.location.coordinates.reverse()],
            line: {
              label: shuttleFactory.label,
              index: i,
            },
          })),
        ], []);
      },
    }),
  ],
  props: {
    campus: {
      type: Object,
      required: true,
    },
    shuttleFactories: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
  @import "~assets/css/head";
  /deep/ .is-primary {
    color: $primary;
  }
  /deep/ .leaflet-marker-icon {
    .tag {
      opacity: 0;
    }
    &:hover .tag {
      opacity: 1;
      transition: $speed * 3;
    }
  }
  .map {
    margin: $gap 0;
    height: 500px;
    /deep/ .vue2leaflet-map {
      z-index: 0;
    }
    .marker-icon {
      margin: 0;
      padding: 0;
      background-color: $blue-medium;
      border: 2px solid $white;
      border-radius: 100%;
      height: 15px;
      width: 15px;
      &.departure, &.arrival {
        background-color: $red;
      }
      &:hover {
        opacity: .8;
      }
    }
  }
</style>
