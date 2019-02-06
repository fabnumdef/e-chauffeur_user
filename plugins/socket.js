import Vue from 'vue';
import VueSocketio from 'vue-socket.io-extended';
import io from 'socket.io-client';


export default function ({ env, store }, inject) {
  const ioInstance = io(env.apiUrl, { autoConnect: false });
  Vue.use(VueSocketio, ioInstance, { store });
  inject('io', ioInstance);
}
