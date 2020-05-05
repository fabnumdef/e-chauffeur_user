import abstractRoute from '~/helpers/abstracts/_id';

export default abstractRoute({
  query: 'rides',
  layout: 'ride-creation',
  mask: 'id,start,status,departure(id,label),arrival(id,label),luggage,passengersCount,userComments',
  props: {
    campus: {
      type: Object,
      default: () => ({}),
    },
  },
});
