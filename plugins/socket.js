import Vue from 'vue';
import VueSocketio from 'vue-socket.io-extended';
import io from 'socket.io-client';


export default function ({ env, store }, inject) {
  const ioInstance = io(env.apiUrl, { autoConnect: false });
  Vue.use(VueSocketio, ioInstance, { store });
  inject('io', ioInstance);
  ioInstance.on('connect', () => {
    ioInstance.emit('roomJoinRide', { id: store.state.rideId });
  });
  const autoConnect = (rideId) => {
    if (rideId) {
      ioInstance.open();
    } else {
      ioInstance.close();
    }
  };
  autoConnect(store.state.rideId);
  store.watch(state => state.rideId, autoConnect);
}
