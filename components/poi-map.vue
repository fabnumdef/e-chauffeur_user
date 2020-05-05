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
          v-for="poi in flavoredPois"
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
            <div class="marker-icon departure" />
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
import lGet from 'lodash.get';

export default {
  props: {
    arrival: {
      type: Object,
      default: null,
    },
    departure: {
      type: Object,
      default: null,
    },
    campus: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      pois: [],
    };
  },
  computed: {
    mapCenter() {
      const campusCenter = lGet(this.campus, 'location.coordinates', null);
      if (!campusCenter) {
        throw new Error('Impossible de déduire le centre de la carte');
      }
      const [lon, lat] = campusCenter;
      return [lat, lon];
    },
    flavoredPois() {
      return this.pois.map((poi) => ({
        ...poi,
        position: lGet(poi, 'location.coordinates', []).reverse(),
      })).filter((poi) => poi.position.length > 0);
    },
  },
  async mounted() {
    const { data } = await this.$api.query('pois')
      .setMask('label,location(coordinates),id')
      .list()
      .setLimit(1000)
      .setFilter('campus', this.campus.id);
    this.pois = data;
  },
  methods: {
    onClick(poi) {
      this.$emit('click', poi);
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
