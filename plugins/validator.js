import Vue from 'vue';
import VeeValidate from 'vee-validate';

const dictionary = {
  fr: {
    messages: {
      required: (field) => `Le champ ${field} est requis.`,
      email: (field) => `Le champ ${field} doit être une adresse courriel valide.`,
      numeric: (field) => `Le champ ${field} ne doit contenir que des chiffres.`,
    },
  },
};

VeeValidate.Validator.localize(dictionary);

const config = {
  fieldsBagName: 'veeFields',
  locale: 'fr',
};

Vue.use(VeeValidate, config);
