import abstractRoute from '~/helpers/abstracts/_id';

export default abstractRoute({
  query: 'rides',
  key: 'ride',
  mask: 'id,start,status,departure(id,label),arrival(id,label),luggage,passengersCount,userComments',
  propsToPass: ['campus'],
  props: {
    campus: {
      type: Object,
      default: () => ({}),
    },
  },
});
