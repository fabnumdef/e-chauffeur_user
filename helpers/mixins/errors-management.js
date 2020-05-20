export default () => ({
  data() {
    return {
      errors: null,
    };
  },
  methods: {
    async handleCommonErrorsBehavior(callback, ...customMessages) {
      this.errors = null;
      try {
        await callback();
      } catch ({ message: errorMessage, response: { status, data: { errors, message } = {} } = {} }) {
        this.errors = errors;
        this.$toast.error([
          ...customMessages,
          [`Erreur ${status || ''}`, message || errorMessage].join(' : '),
          ...Array.isArray(errors) ? errors : Object.values(errors || {}).map((e) => e.message),
        ]);
      }
    },
  },
});
