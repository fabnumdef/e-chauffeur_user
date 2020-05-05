<template>
  <main>
    <section class="section">
      <div class="title">
        <slot name="title" />
      </div>
      <div
        v-if="$slots.subtitle"
        class="subtitle"
      >
        <slot name="subtitle" />
      </div>
    </section>
    <section class="white-section">
      <nuxt-link class="back-history-link" :to="previousStep">Précédent</nuxt-link>
      <slot
        v-if="$slots.alert"
        name="alert"
      />
      <slot
        v-else
        name="form"
      />
      <slot name="footer" />
    </section>
  </main>
</template>

<script>
export default {
  props: {
    displayForm: {
      type: Boolean,
      default: true,
    },
    previousStep: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "~assets/css/head";
  .back-history-link {
    color: $blue-light;
    font-weight: 700;
    font-size: .8em;
    text-transform: uppercase;
    text-decoration: underline;
    position: absolute;
    top: 415px;
    left: 125px;
  }
  .title, .subtitle {
    text-align: center;
    width: 50%;
    margin: 0 auto 1em;
  }

    @media screen and (max-width: 600px) {
      .title, .subtitle {
        width: 100%;
      }
      .back-history-link {
        display: none;
      }
    }

    .form {
    max-width: 800px;
    margin: 0 auto;
      z-index: 20;
      opacity: 1;
    .title {
      text-align: center;
    }
    /deep/ .field {
      margin: .5em;
    }
    &.blue-box {
      background: $blue-dark;
      border: 2px solid $primary;
      border-radius: 13px;
      padding: $gap;
      box-sizing: border-box;
    }
    .fields-box {
      padding-bottom: 1em;
      /deep/ .label {
        color: $blue-light;
      }
      /deep/ .input {
        border: none;
        color: $white;
        font-weight: bold;
        border-bottom: 1px solid $primary;
      }
      /deep/.multiselect {
        border-bottom: 1px solid $primary;
        &__select {
          border: 0;
          &:before {
            border-color: $primary transparent transparent;
          }
        }
        &__tags, &__single {
          background: transparent;
          color: $white;
          font-weight: bold;
          border: 0;
        }
      }
    }
    .footer {
      flex-direction: column;
      .button {
        padding: .5em 3em;
      }
    }
  }
</style>
