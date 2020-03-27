<template>
  <main>
    <section
      v-if="ride"
      class="map"
    >
      <client-only>
        <ride-map
          ref="map"
          :zoom="13"
          :ride="ride"
          :center="arrivalCoordinates"
        >
          <l-marker
            v-if="departureCoordinates"
            :lat-lng="departureCoordinates"
          >
            <l-icon>
              <fa-icon
                :icon="['fas', 'map-marker-alt']"
                class="primary-bubble"
              />
            </l-icon>
          </l-marker>

          <l-marker
            v-if="arrivalCoordinates"
            :lat-lng="arrivalCoordinates"
          >
            <l-icon>
              <fa-icon
                :icon="['fas', 'flag']"
                class="primary-bubble"
              />
            </l-icon>
          </l-marker>

          <l-marker :lat-lng="carPosition" v-if="carPosition">
            <l-icon icon-url="/icon.svg" />
          </l-marker>

          <l-marker
            v-if="userLocation && !inCar"
            :lat-lng="userLocation"
          >
            <l-icon>
              <fa-icon
                :icon="['fas', 'dot-circle']"
                class="current-position"
              />
            </l-icon>
          </l-marker>

          <l-polyline
            v-if="userLocation && departureCoordinates && !inCar"
            :lat-lngs="[userLocation, departureCoordinates]"
            class-name="dotted-line"
            :fill="false"
          />
        </ride-map>
      </client-only>
    </section>
    <section class="elements container">
      <ec-notif
        v-if="!inCar"
        primary
      >
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
          {{ ride.driver.firstname }}
        </div>
      </ec-box>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';
import get from 'lodash.get';
import { DELIVERED, IN_PROGRESS } from '@fabnumdef/e-chauffeur_lib-vue/api/status/states';
import ecNotif from '~/components/elements/notification.vue';
import ecBox from '~/components/elements/box.vue';

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
  },
  auth: false,
  layout: 'ride',
  async asyncData({
    $api,
    query: { token = null } = {},
    params: { ride_id: rideId },
    store,
  }) {
    try {
      const { data: ride } = await $api
        .query('rides')
        .setMask('id,departure(label,location(coordinates)),arrival(label,location(coordinates)),'
          + 'driver(id,firstname),car(id,model(label)),position,status,token')
        .get(rideId)
        .authWithRideToken(token);

      const { data: { position, date } } = await $api.query('rides')
        .setMask('driver,date,position')
        .getDriverPosition(rideId)
        .authWithRideToken(token);

      if (position) {
        store.commit('driver/setDriverPosition', {
          position,
          date,
        });
      }
      store.commit('ride/setRide', ride);
      store.commit('driver/setUser', ride.driver);

      return {
        userLocation: null,
      };
    } catch (e) {
      throw new Error('Cette course n\'a pas été trouvée, ou n\'est pas accessible.');
    }
  },
  computed: {
    ...mapGetters({
      ride: 'ride/ride',
      carPosition: 'driver/carPosition',
    }),
    departureCoordinates: reverseCoordinates('departure'),
    arrivalCoordinates: reverseCoordinates('arrival'),
    inCar() {
      return this.ride.status === IN_PROGRESS || this.ride.status === DELIVERED;
    },
  },

  mounted() {
    if (navigator && navigator.geolocation && navigator.geolocation.watchPosition) {
      this.listener = navigator.geolocation.watchPosition(({ coords: { latitude, longitude } }) => {
        this.userLocation = [latitude, longitude];
      });
    }
  },

  beforeDestroy() {
    if (this.listener && navigator && navigator.geolocation && navigator.geolocation.clearWatch) {
      navigator.geolocation.clearWatch(this.listener);
    }
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
