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
          v-for="poi in flavoredMarkers"
          :key="poi.id"
          :lat-lng="poi.position"
          @click="onClick(poi)"
        >
          <l-icon
            v-if="departure && departure.id === poi.id"
            :icon-size="[48,48]"
            :icon-anchor="[24, 48]"
            class="icon"
          >
            <fa-icon
              :icon="['fas', 'map-marker-alt']"
              class="is-primary"
              size="4x"
            />
            <b-tag
              class="tag"
              type="is-primary"
              size="is-medium"
            >
              {{ poi.label }}
            </b-tag>
          </l-icon>
          <l-icon
            v-else-if="arrival && arrival.id === poi.id"
            :icon-size="[48,48]"
            :icon-anchor="[12, 48]"
            class="icon"
          >
            <div class="marker-icon arrival" />
            <b-tag
              class="tag"
              type="is-primary"
              size="is-medium"
            >
              {{ poi.label }}
            </b-tag>
          </l-icon>
          <l-icon
            v-else
            :icon-size="[24, 24]"
            :icon-anchor="[12, 24]"
            class="icon"
          >
            <div class="marker-icon" />
            <b-tag
              class="tag"
              type="is-primary"
              size="is-medium"
            >
              {{ poi.label }}
            </b-tag>
          </l-icon>
        </l-marker>
      </l-map>
    </client-only>
  </div>
</template>

<script>
import setMap from '~/components/maps/mixins/set-map';

const key = 'poi';
const entity = 'pois';
const mask = 'label,location(coordinates),id';

export default {
  mixins: [
    setMap({
      key,
      initQuery: function query() {
        return this.$api.query(entity)
          .setMask(mask)
          .setCampus(this.campus.id)
          .list()
          .setLimit(1000);
      },
    }),
  ],
  props: {
    campus: {
      type: Object,
      required: true,
    },
    departure: {
      type: Object,
      default: null,
    },
    arrival: {
      type: Object,
      default: null,
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
