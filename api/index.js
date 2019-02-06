import rides from './rides';
import status from './status';

export default function (ctx, inject) {
  const api = {
    rides: rides(ctx.$axios),
    status,
  };
  ctx.$api = api;
  inject('api', api);
}
