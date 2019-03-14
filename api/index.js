import rides from './rides';
import routing from './routing';
import status from './status';
import campuses from './campuses';
import forms from './forms';

export default function (ctx, inject) {
  const api = {
    rides: rides(ctx.$axios),
    routing,
    status,
    campuses: campuses(ctx.$axios),
    forms: forms(ctx.$axios),
  };
  ctx.$api = api;
  inject('api', api);
}
