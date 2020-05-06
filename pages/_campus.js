import abstractRoute from '~/helpers/abstracts/_id';

export default abstractRoute({
  id: 'campus',
  query: 'campuses',
  layout: 'ride-creation',
  mask: 'id,name,location(coordinates),defaultReservationScope',
  key: 'campus',
});
