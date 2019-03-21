import Vue from 'vue';
import VueSocketio from 'vue-socket.io-extended';
import io from 'socket.io-client';


export default function ({ env, store, query }, inject) {
  const ioInstance = io(env.apiUrl, { autoConnect: false });
  Vue.use(VueSocketio, ioInstance, { store });
  inject('io', ioInstance);
  ioInstance.on('connect', () => {
    const { token = null } = query;
    ioInstance.emit('roomJoinRide', { id: store.getters['ride/rideId'], token });
  });
  const autoConnect = (rideId) => {
    if (rideId) {
      ioInstance.open();
    } else {
      ioInstance.close();
    }
  };
  autoConnect(store.getters['ride/rideId']);
  store.watch((state, getters) => getters['ride/rideId'], autoConnect);
}
