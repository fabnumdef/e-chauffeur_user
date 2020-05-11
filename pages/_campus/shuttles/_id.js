import abstractRoute from '~/helpers/abstracts/_id';

export const SHUTTLE_FACTORIES_MASK = 'id,label,stops';

export default abstractRoute({
  query: 'shuttles',
  // key: 'shuttles',
  // mask: MASK,
  propsToPass: ['campus'],
  props: {
    campus: {
      type: Object,
      default: () => ({}),
    },
  },
});
