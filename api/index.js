import rides from './rides';
import routing from './routing';
import status from './status';

export default function (ctx, inject) {
  const api = {
    rides: rides(ctx.$axios),
    routing,
    status,
  };
  ctx.$api = api;
  inject('api', api);
}
