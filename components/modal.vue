<template>
  <div
    class="modal"
    :class="active && 'is-active'"
  >
    <div class="modal-background" />
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          {{ title }}
        </p>
        <button
          class="delete"
          aria-label="close"
          @click="toggleModal"
        />
      </header>
      <section class="modal-card-body">
        <p>{{ content }}</p>
        <search-campus
          v-if="withList"
          v-model="campus"
          :placeholder="placeholder"
          @input="emitValue"
        />
        <div>
          <button
            class="button is-primary"
            @click="emitAction"
          >
            Confirmer
          </button>
          <button
            class="button"
            @click="toggleModal"
          >
            Annuler
          </button>
        </div>
      </section>
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
    active: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    withList: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      campus: null,
    };
  },
  methods: {
    toggleModal() {
      this.$emit('toggle-modal');
    },
    emitAction() {
      this.$emit('action');
    },
    emitValue(data) {
      this.$emit('select-value', data);
    },
  },
};
</script>

<style scoped lang="scss">
  @import "~assets/css/head";
  $text-color: $blue-medium;
  .modal {
    color: $text-color;
    text-align: center;
    .modal-card-body > div {
      button {
        margin: 1em;
      }
    }
  }
</style>
