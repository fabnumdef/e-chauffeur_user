<template>
  <div>
    <client-only>
      <l-map
        ref="map"
        :zoom="13"
        :center="mapCenter"
      >
        <l-tile-layer url="//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <template
          v-for="(line, index) in flavoredMarkers"
        >
          <l-geo-json
            :key="`${line.id}-${index}`"
            :geojson="line"
            :options="line.options"
            :options-style="line.style"
            @click="onClick(line)"
          />
          <l-marker
            v-for="({ label: lb, position }, i) in line.stops"
            :key="`${line.id}--${i}`"
            :lat-lng="position"
            @click="onClick(line)"
          >
            <l-icon
              :icon-anchor="[5,5]"
            >
              <l-tooltip
                :content="lb"
                :options="{ permanent: false }"
              />
            </l-icon>
          </l-marker>
        </template>
      </l-map>
    </client-only>
  </div>
</template>

<script>
import setMap from '~/components/maps/mixins/set-map';

// @todo add programmatic color generation or extend this array
const lineColors = ['#007aff', '#1abc9c', '#f1c40f', '#8e44ad', '#34495e', '#27ae60'];

export default {
  mixins: [
    setMap({
      flavoredMarkers() {
        return this.shuttleFactories.map(({ id, label, stops }, index) => ({
          id,
          label,
          index,
          stops: stops.map((stop) => ({
            id: stop.id,
            label: stop.label,
            position: [...stop.location.coordinates].reverse(),
          })),
          type: 'LineString',
          coordinates: stops.map((stop) => stop.location.coordinates),
          options: {
            onEachFeature: (feature, layer) => layer.bindTooltip(
              `<div>Ligne ${feature.label}</div>`,
              { permanent: false, sticky: true },
            ),
          },
          style: {
            weight: 10,
            color: lineColors[index],
            className: 'line',
          },
        }));
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

  /deep/ .leaflet-interactive.line {
    opacity: .6;
    &:hover {
      opacity: 1;
    }
  }
  /deep/ .leaflet-marker-icon {
    border-radius: 100%;
    background-color: white;
    border: 1px solid;
    color: black;
    height: 2em;
    width: 2em;
    .tag {
      opacity: 0;
      margin-left: 2em;
      &.color--0 {
        background-color: #007aff;
      }
      &.color--0 {
        background-color: #1abc9c;
      }
      &.color--0 {
        background-color: #f1c40f;
      }
      &.color--0 {
        background-color: #8e44ad;
      }
      &.color--0 {
        background-color: #34495e;
      }
      &.color--0 {
        background-color: #27ae60;
      }
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
