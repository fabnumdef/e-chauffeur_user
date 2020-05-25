import { DRAFTED } from '@fabnumdef/e-chauffeur_lib-vue/api/status/states';
import { DateTime } from 'luxon';

export default () => ({
  computed: {
    isDraft() {
      return !this.displacement.status || this.displacement.status === DRAFTED;
    },
    maxReservationDate() {
      return DateTime.local().plus({ seconds: this.campus.defaultReservationScope });
    },
  },
  methods: {
    selectPoi(poi) {
      if (this.displacement.departure.id === poi.id) {
        this.displacement.departure = { id: null, label: null };
      } else if (this.displacement.arrival.id === poi.id) {
        this.displacement.arrival = { id: null, label: null };
      } else if (this.displacement.departure.id === null) {
        Object.assign(this.displacement.departure, poi);
      } else if (this.displacement.arrival.id === null) {
        Object.assign(this.displacement.arrival, poi);
      }
    },

  },
});
