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
    getError(path, label) {
      const error = (this.errors || {})[path];
      if (!error) {
        return null;
      }
      switch (error.kind) {
        case 'required':
          return `Le champ ${label} est requis`;
        default:
          return `Le champ ${label} comporte une erreur`;
      }
    },
    getType(path) {
      if (!this.errors) {
        return null;
      }
      return this.errors[path] ? 'is-danger' : 'is-success';
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
