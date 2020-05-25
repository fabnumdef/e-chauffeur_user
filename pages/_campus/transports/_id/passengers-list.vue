<template>
  <creation-step
    form-title="Réservez votre transport"
    :previous-step="{
      name: 'campus-transports-id-edit',
      params: { campus: campus.id, id: transport.id }
    }"
  >
    <template #title>
      Réservez votre tranport dès maintenant !
    </template>
    <template #subtitle>
      Une fois que vous aurez renseigné votre adresse de départ et d'arrivée,
      nous vous proposerons les points de rencontre les plus proches.
    </template>
    <template #form>
      <form
        class="form blue-box"
        @submit.prevent="submit"
      >
        <b-field
          label="Renseignez les noms et prénoms de tous les passagers"
          label-for="passengersList"
        >
          <textarea
            id="passengersList"
            v-model="passengersString"
            maxlength="1000"
            rows="12"
            placeholder="Ex: Patrick Martin, Brigitte Moreau, etc."
          />
        </b-field>
        <form-button :disabled="!passengersString" />
      </form>
    </template>
    <template #footer>
      <informations-icons />
    </template>
  </creation-step>
</template>

<script>
import creationStep from '~/components/creation-step/generic.vue';
import formButton from '~/components/creation-step/form-button.vue';
import informationsIcons from '~/components/informations-icons.vue';
import errorsManagement from '~/helpers/mixins/errors-management';

export default {
  components: {
    creationStep,
    formButton,
    informationsIcons,
  },
  mixins: [errorsManagement()],
  props: {
    campus: {
      type: Object,
      default: () => ({}),
    },
    transport: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      passengersString: null,
    };
  },
  methods: {
    submit() {
      if (this.passengersString) {
        const passengersList = this.passengersString
          .split(',')
          .map((slice) => ({
            name: slice
              .toLowerCase()
              .trim()
              .split(' ')
              .map((n) => n.charAt(0).toUpperCase() + n.slice(1))
              .join(' '),
          }));

        this.handleCommonErrorsBehavior(async () => {
          await this.$api.query('rides').edit(this.transport.id, { passengersList });
          this.$router.push({
            name: 'campus-transports-id-confirm',
            params: { campus: this.campus.id, id: this.transport.id },
          });
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '~assets/css/head';
  textarea {
    width: 100%;
    border: 1px solid $blue-medium;
    border-bottom: 1px solid white;
    background-color: $blue-dark;
    color: $white;
    margin-bottom: 1em;
    padding: .5em;
  }
</style>
