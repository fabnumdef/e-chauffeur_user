import Vue from 'vue';
import VueSocketio from 'vue-socket.io-extended';
import io from 'socket.io-client';
import { CANCELED_STATUSES, DELIVERED } from '../api/status';


export default function ({ env, store }, inject) {
  const ioInstance = io(env.apiUrl, { autoConnect: false });
  Vue.use(VueSocketio, ioInstance, { store });
  inject('io', ioInstance);
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
