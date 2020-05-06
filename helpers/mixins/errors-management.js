export default () => ({
  data() {
    return {
      errors: null,
    };
  },
  methods: {
    setErrors(errors = {}) {
      this.errors = errors;
    },
    async handleCommonErrorsBehavior(callback, ...customMessages) {
      this.setErrors();
      try {
        await callback();
      } catch ({ message: errorMessage, response: { status, data: { errors, message } = {} } = {} }) {
        this.setErrors(errors);
        this.$toast.error([
          ...customMessages,
          [`Erreur ${status || ''}`, message || errorMessage].join(' : '),
          ...Array.isArray(errors) ? errors : Object.values(errors || {}).map((e) => e.message),
        ]);
      }
    },
  },
});
