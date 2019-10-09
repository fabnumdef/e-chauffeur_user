<template>
  <l-map
    v-bind="$attrs"
    @leaflet:load="setRouting"
  >
    <l-tile-layer url="//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    <slot />
    <l-polyline
      v-if="routePolyLine"
      :lat-lngs="routePolyLine"
      class-name="primary-line"
      :fill="false"
    />
  </l-map>
</template>

<script>
import polyUtil from 'polyline-encoded';
import get from 'lodash.get';

import { getRoute } from '../helpers/routing';

export default {
  props: {
    ride: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      routePolyLine: null,
    };
  },

  methods: {
    async setRouting() {
      try {
        if (!this.ride) {
          return;
        }
        const arrival = get(this.ride, 'arrival.location.coordinates');
        const departure = get(this.ride, 'departure.location.coordinates');
        if (!arrival || !departure) {
          return;
        }
        const { routes: [{ geometry }] } = await getRoute(departure, arrival);
        this.routePolyLine = polyUtil.decode(geometry);
      } catch (e) {
        // eslint-disable-next-line
        console.error(e);
      }
    },
  },
};
</script>

<style scoped lang="scss">
  @import "~assets/css/head";

  /deep/ .primary-line {
    stroke: $primary;
  }
</style>
