<template>
  <main>
    <section class="map" v-if="ride">
      <no-ssr>
        <l-map
          ref="map"
          :zoom="13"
          :center="arrivalCoordinates"
          @leaflet:load="setRouting"
        >
          <l-tile-layer url="//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <l-marker
            v-if="departureCoordinates"
            :lat-lng="departureCoordinates"
          >
            <l-icon>
              <fa-icon :icon="['fas', 'map-marker-alt']" class="primary-bubble" />
            </l-icon>
          </l-marker>

          <l-marker
            v-if="arrivalCoordinates"
            :lat-lng="arrivalCoordinates"
          >
            <l-icon>
             <fa-icon :icon="['fas', 'flag']" class="primary-bubble" />
            </l-icon>
          </l-marker>

          <l-marker :lat-lng="carPosition">
            <l-icon icon-url="/icon.svg" />
          </l-marker>

          <l-marker
            v-if="userLocation"
            :lat-lng="userLocation"
          >
            <l-icon>
              <fa-icon :icon="['fas', 'dot-circle']" class="current-position" />
            </l-icon>
          </l-marker>

          <l-polyline
            v-if="routePolyLine"
            :lat-lngs="routePolyLine"
            class-name="primary-line"
            :fill="false"
          />

          <l-polyline
            v-if="userLocation && departureCoordinates"
            :lat-lngs="[userLocation, departureCoordinates]"
            class-name="dotted-line"
            :fill="false"
          />
        </l-map>
      </no-ssr>
    </section>
    <section class="elements container">
      <ec-notif primary>
        <fa-icon :icon="['fas', 'map-marker-alt']" /> Retrouvez votre chauffeur à <em>{{ ride.departure.label }}</em>.
      </ec-notif>
      <ec-box>
        <div class="columns">
          <div class="column" />
          <div class="column is-right">
            <strong v-if="ride.car && ride.car.model && ride.car.model.label">
              {{ ride.car.model.label }}
            </strong>
            <span v-if="ride.car && ride.car.id">
              {{ ride.car.id }}
            </span>
          </div>
        </div>
        <div class="is-strong">
          {{ ride.driver.name }}
        </div>
        <hr>
        <ec-button
          danger
          inverted
          fullwidth
        >
          Annuler la course
        </ec-button>
      </ec-box>
    </section>
  </main>
</template>

<script>
import ecNotif from '~/components/elements/notification.vue';
import ecBox from '~/components/elements/box.vue';
import ecButton from '~/components/elements/button.vue';

import 'polyline-encoded';
import { L } from 'vue2-leaflet';
import get from 'lodash.get';

function reverseCoordinates(key) {
  return function computed() {
    if (!this.ride) {
      return null;
    }
    const coord = get(this.ride[key], 'location.coordinates', null);
    if (!coord) {
      return null;
    }
    const [lon, lat] = coord;
    return [lat, lon];
  };
}

export default {
  components: {
    ecNotif,
    ecBox,
    ecButton,
  },
  async asyncData({
    app,
    $api,
    query: { token = null } = {},
    params: { ride_id: rideId },
    redirect,
  }) {
    try {
      const rideAPI = $api
        .rides('departure(label,location(coordinates)),arrival(label,location(coordinates)),'
          + 'driver(id,name),car(id,model(label)),position');

      const { data: ride } = await rideAPI.getRide(rideId, token);
      const { data: driverPosition } = await rideAPI.getDriverPosition(rideId, token);

      return {
        ride,
        driverPosition,
        userLocation: null,
        routePolyLine: null,
      };
    } catch (e) {
      app.$toast.error('Cette course n\'a pas été trouvée, ou n\'est pas accessible.');
      redirect('/');
      return {};
    }
  },

  computed: {
    carPosition() {
      if (
        this.driverPosition
        && this.driverPosition.position
        && this.driverPosition.position.coordinates
      ) {
        const [lon, lat] = this.driverPosition.position.coordinates;
        return [lat, lon];
      }
      return null;
    },
    departureCoordinates: reverseCoordinates('departure'),
    arrivalCoordinates: reverseCoordinates('arrival'),
  },

  mounted() {
    this.$socket.connect();
    this.$options.sockets.positionUpdate = (data) => {
      this.driverPosition = data;
    };

    if (navigator && navigator.geolocation && navigator.geolocation.watchPosition) {
      this.listener = navigator.geolocation.watchPosition(({ coords: { latitude, longitude } }) => {
        this.userLocation = [latitude, longitude];
      });
    }
  },

  beforeDestroy() {
    this.$socket.disconnect();
    if (this.listener && navigator && navigator.geolocation && navigator.geolocation.clearWatch) {
      navigator.geolocation.clearWatch(this.listener);
    }
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
        const { routes: [{ geometry }] } = await this.$api.routing
          .getRoute(departure, arrival);
        this.routePolyLine = L.PolylineUtil.decode(geometry);
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

  .map {
    position: fixed;
    height: 100%;
    width: 100%;
    z-index: 0;
  }
  .elements {
    z-index: 1;
    position: relative;
    padding-top: $size-small;
    height: 100vh;
    display: block;
    pointer-events: none;
  }

  hr {
    background: $light-gray;
    margin: $size-small;
  }

  /deep/ .box {
    position: absolute;
    bottom: $size-small;
    width: 100%;
    pointer-events: auto;
  }

  .is-right {
    text-align: right;
    * {
      display: block;
    }
  }

  .is-strong {
    color: $primary;
    font-weight: bold;
    text-align: center;
  }

  /deep/ .primary {
    &-bubble {
      background: $primary;
      border-radius: 100%;
      padding: 5px;
      box-sizing: content-box;
    }
    &-line {
      stroke: $primary;
    }
  }

  /deep/ .notification .svg-inline--fa {
    margin-right: $size-small;

  }

  .current-position {
    background: $black;
    color: $white;
    border-radius: 100%;
    box-sizing: content-box;
    box-shadow: 0 0 0 5px rgba($primary, 0.6);
  }

  /deep/ .dotted-line {
    stroke: $black;
    stroke-dasharray: 1, 10;
  }
</style>
