import abstractRoute from '~/helpers/abstracts/_id';

export const MASK = 'id,start,status,departure(id,label),arrival(id,label),luggage,passengersCount,userComments';

export default abstractRoute({
  query: 'rides',
  key: 'ride',
  mask: MASK,
  propsToPass: ['campus'],
  props: {
    campus: {
      type: Object,
      default: () => ({}),
    },
  },
});
