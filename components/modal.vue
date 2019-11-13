<template>
  <div
    class="modal"
    :class="active && 'is-active'"
  >
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ title }}</p>
        <button
          class="delete"
          aria-label="close"
          @click="toggleModal"
        />
      </header>
      <section class="modal-card-body">
        <p>{{ content }}</p>
        <div>
          <button
            class="button is-primary"
            @click="emitAction"
          >Confirmer</button>
          <button
            class="button"
            @click="toggleModal"
          >Annuler</button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  export default {
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
      }
    },
    methods: {
      toggleModal() {
        this.$emit('toggle-modal');
      },
      emitAction() {
        this.$emit('action');
      }
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
      display: flex;
      justify-content: center;
      button {
        margin: 1em;
      }
    }
  }
</style>
