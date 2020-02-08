<template>
  <div>
    <button
      class="button is-text has-text-centered open-button"
      type="button"
      @click="toggle(true)"
    >
      <slot />
    </button>
    <div
      v-if="open"
      class="modal is-active"
    >
      <div
        class="modal-background"
      />
      <div class="modal-content">
        <div class="title">
          Un problème ou des difficultés pour créer votre réservation ?
        </div>
        <p>
          Sélectionnez la base la plus proche pour obtenir le numéro de téléphone de la régulation qui
          sera en mesure de prendre votre réservation.
        </p>
        <div class="field">
          <div class="control">
            <search-campus
              v-model="campus"
              class="search-campus"
            />
          </div>
        </div>
        <div
          class="button is-primary"
          @click="toggle(false)"
        >
          Fermer la fenêtre
        </div>
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        @click="toggle(false)"
      >
        Fermer
      </button>
    </div>
  </div>
</template>
<script>
import searchCampus from '~/components/form/search-campus.vue';

export default {
  components: {
    searchCampus,
  },
  props: {
    isWhite: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      open: false,
      campus: null,
    };
  },
  methods: {
    toggle(state) {
      this.open = state || !this.open;
    },
  },
};
</script>

<style scoped lang="scss">
  @import "~assets/css/head";
  .open-button {
    box-shadow: none;
    text-transform: none;
    &:hover {
      background: transparent;
    }
  }
  /deep/ .modal-content {
    overflow: visible;
  }
  .modal-background {
    background-color: rgba(#00245F, 0.97);
  }
  .search-campus {
    max-width: 90%;
    margin: 15px auto;
    /deep/ {
      .multiselect__single {
        background: transparent;
        color: $white;
      }
      .multiselect__tags {
        background: transparent;

      }
      .multiselect__option {
        &--highlight {
          background-color: $primary;
        }
        &--selected {
          background-color: $dark-gray;
        }
      }
    }
  }
</style>
