import abstractRoute from '~/helpers/abstracts/_id';

export const MASK = 'id,start,status,departure,arrival,luggage,passengersCount,passengersList,userComments';

export default abstractRoute({
  query: 'rides',
  key: 'transport',
  mask: MASK,
  propsToPass: ['campus'],
  props: {
    campus: {
      type: Object,
      default: () => ({}),
    },
  },
});
