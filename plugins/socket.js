import { DELIVERED } from '@fabnumdef/e-chauffeur_lib-vue/api/status/states';
import { CANCELED_STATUSES } from '@fabnumdef/e-chauffeur_lib-vue/api/status';

export default function ({ store, app }) {
  const ioInstance = app.$io;
  ioInstance.on('connect', () => {
    ioInstance.emit(
      'roomJoinRide',
      { id: store.getters['ride/ride'].id, token: store.getters['ride/ride'].token },
    );
  });
  ioInstance.on('rideUpdate', (ride) => {
    if (ride && (ride.status === DELIVERED || CANCELED_STATUSES.indexOf(ride.status) !== -1)) {
      ioInstance.close();
    }
  });
  const autoConnect = (ride) => {
    if (ride && ride.id && ride.status !== DELIVERED && CANCELED_STATUSES.indexOf(ride.status) === -1) {
      ioInstance.open();
    } else {
      ioInstance.close();
    }
  };
  autoConnect(store.getters['ride/ride']);
  store.watch((state, getters) => getters['ride/ride'], autoConnect);
}
