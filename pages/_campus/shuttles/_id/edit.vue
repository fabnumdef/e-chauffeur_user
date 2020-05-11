<template>
  <creation-step
    form-title="Réservez un shuttle"
    :previous-step="{ name: 'campus-select-type', params: { campus: campus.id }}"
  >
    <template #title>
      Réservez votre navette dès maintenant !
    </template>
    <template #subtitle>
      Sélectionnez d'abord la date et le trajet que vous souhaitez emprunter.
    </template>
    <template
      v-if="!user.gprd"
      #alert
    >
      <gprd-warning />
    </template>
    <template #form>
      <form
        class="form blue-box"
        @submit.prevent="create"
      >
        <fieldset class="fields-box">
          <b-field v-if="!user.phone || !user.phone.confirmed">
            Si vous souhaitez être notifié sur votre téléphone, vous devez
            <nuxt-link :to="{name: 'my-account-edit-account'}">
              renseigner et confirmer votre numéro de téléphone
            </nuxt-link>
          </b-field>

          <b-field
            label="Date et heure de départ"
            label-for="start"
          >
            <client-only>
              <date-time
                id="start"
                v-model="date"
                :not-before="new Date()"
                :not-after="maxReservationDate"
                lang="fr"
                append-to-body
                type="datetime"
                :minute-step="10"
                format="YYYY-MM-DD HH:mm"
                required="required"
                input-class="input"
                placeholder="Sélectionner une date"
              />
            </client-only>
          </b-field>

          <b-field
            label="Trajets possibles"
            label-for="shuttle-factory"
          >
            <vue-multiselect
              v-model="shuttleFactory"
              placeholder="Sélectionner une navette"
              :options="shuttleFactories"
              track-by="id"
              label="label"
            />
          </b-field>
        </fieldset>
        <form-button />
      </form>
    </template>
    <template #footer>
      <shuttle-factories-map
        class="map"
        :campus="campus"
        :shuttle-factories="shuttleFactories"
        @click="selectShuttleFactory"
      />
    </template>
  </creation-step>
</template>

<script>
import { DateTime } from 'luxon';
import gprdWarning from '~/components/creation-step/gprd-warning.vue';
import creationStep from '~/components/creation-step/generic.vue';
import formButton from '~/components/creation-step/form-button.vue';
import errorsManagement from '~/helpers/mixins/errors-management';
import shuttleFactoriesMap from '~/components/maps/shuttle-factories.vue';
import { SHUTTLE_FACTORIES_MASK } from '~/pages/_campus/shuttles/_id';

export default {
  components: {
    shuttleFactoriesMap,
    creationStep,
    gprdWarning,
    formButton,
  },
  mixins: [
    errorsManagement(),
  ],
  props: {
    campus: {
      type: Object,
      default: () => ({}),
    },
  },
  async asyncData({ $api, params }) {
    const { data: user } = await $api.query('jwt').setMask('gprd,phone(confirmed)').user();
    const { data: shuttleFactories } = await $api.query('shuttleFactories')
      .setMask(SHUTTLE_FACTORIES_MASK).list()
      .setFilter('campus', params.campus);
    return { user, shuttleFactories };
  },
  data() {
    return {
      date: null,
      shuttleFactory: null,
    };
  },
  computed: {
    maxReservationDate() {
      if (this.campus) {
        return DateTime.local().plus({ seconds: this.campus.defaultReservationScope });
      }
      return false;
    },
  },
  methods: {
    selectShuttleFactory(data) {
      console.log('select factory', data);
      this.shuttleFactory = data;
    },
    async create() {
      console.log('create');
    },
  },
};
</script>
<style lang="scss" scoped>
  @import "~assets/css/head";
  .form {
    position: relative;
    .mx-datepicker {
      width: 100%;
      margin-bottom: 1em;
    }
  }
</style>
