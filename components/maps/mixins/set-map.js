import lGet from 'lodash.get';

export default ({
  key,
  initQuery = null,
  flavoredMarkers = function markers() {
    return this[key].map((k) => ({
      ...k,
      position: lGet(k, 'location.coordinates', []).reverse(),
    })).filter((k) => k.position.length > 0);
  },
}) => ({
  data() {
    if (key) {
      return {
        [key]: [],
      };
    }
    return {};
  },
  async mounted() {
    if (initQuery) {
      const { data } = await initQuery.call(this);
      this[key] = data;
    }
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
    flavoredMarkers() {
      return flavoredMarkers.call(this);
    },
  },
  methods: {
    onClick(data) {
      this.$emit('click', data);
    },
  },
});
