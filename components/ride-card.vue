<template>
  <article>
    <fa-icon
      v-if="status"
      :icon="['fas', 'times-circle']"
      class="delete-button"
      @click="emitDelete"
    />
    <h2>{{ day }} <span>- {{ hour }}</span></h2>
    <section>
      <div class="poi">
        <div class="icon-container">
          <fa-icon
            :icon="['fas', 'map-marker-alt']"
            class="primary-bubble"
          />
        </div>
        <div>
          <h3>Lieu de départ</h3>
          <p>{{ departure }}</p>
        </div>
      </div>
      <div class="poi">
        <div class="icon-container">
          <fa-icon
            :icon="['fas', 'flag']"
            class="primary-bubble"
          />
        </div>
        <div>
          <h3>Lieu d'arrivée</h3>
          <p>{{ arrival }}</p>
        </div>
      </div>
    </section>
    <ul>
      <li>Nombre de passagers : <em>{{ passengersCount }}</em></li>
      <li>Présence de bagages : <em>{{ luggage ? 'Oui' : 'Non' }}</em></li>
      <li v-if="status">Statut :  <em>{{ status }}</em></li>
    </ul>
  </article>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    day: {
      type: String,
      required: true,
    },
    hour: {
      type: String,
      required: true,
    },
    departure: {
      type: String,
      required: true,
    },
    arrival: {
      type: String,
      required: true,
    },
    passengersCount: {
      type: Number,
      required: true,
    },
    luggage: {
      type: Boolean,
    },
    status: {
      type: String,
    }
  },
  methods: {
    emitDelete() {
      this.$emit('delete-ride', this.id);
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "~assets/css/head";

  $text-color: $blue-medium;
  article {
    padding-bottom: 2em;
    border-bottom: 1px solid $dark-gray;
    margin: 0 .5em 2em;
    position: relative;
    h2 {
      font-size: 1.2em;
      font-weight: 700;
      text-transform: uppercase;
      padding-bottom: 1em;
      span {
        color: $primary;
      }
    }

    .delete-button {
      cursor: pointer;
      position: absolute;
      top: .5em;
      right: .5em;
      color: red;
      &:hover {
        color: $text-color;
        transition: .3s;
      }
    }

    section {
      display: flex;
      justify-content: space-between;
      font-weight: 700;
      margin-bottom: 1em;
      h3 {
        font-size: .7em;
        color: $primary;
      }
      .poi {
        display: flex;
        align-items: center;
        padding-bottom: .5em;
        border-bottom: 2px solid $primary;
        .icon-container {
          margin-right: 1em;
        }
      }
    }

    ul {
      display: flex;
      font-weight: 700;
      li {
        margin-right: 1em;
        em {
          color: $primary;
          font-style: normal;
        }
      }
    }
  }
</style>
