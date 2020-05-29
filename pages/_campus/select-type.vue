<template>
  <main>
    <section class="section">
      <div class="title">
        Choisissez votre type de transport e-Chauffeur
      </div>
      <div class="subtitle">
        Selon la capacité dont vous avez besoin.
      </div>
    </section>
    <section class="white-section">
      <div class="buttons">
        <button
          class="select-button car"
          :class="{ selected: selected === RIDE }"
          @click="selected = RIDE"
        >
          <img
            src="~/assets/images/car.svg"
            alt="car"
          >
          <h2 class="title">
            Véhicule léger
          </h2>
          <h3 class="title">
            <strong>1 à 7 personnes</strong>
          </h3>
          <p>
            Service e-Chauffeur historique,
            vous pouvez réserver un véhicule jusqu'à huit places pour un trajet ponctuel ou récurent
          </p>
          <div class="radio" />
        </button>
        <button
          class="select-button shuttle"
          :class="{ selected: selected === SHUTTLE }"
          @click="selected = SHUTTLE"
        >
          <img
            src="~/assets/images/shuttle.svg"
            alt="car"
          >
          <h2 class="title">
            Navette
          </h2>
          <h3 class="title">
            <strong>8 à 50 personnes</strong>
          </h3>
          <p>
            Service e-Navette, permet de réserver par arrêt une place disponible sur une ligne de bus mise à disposition
          </p>
          <div class="radio" />
        </button>
        <button
          class="select-button transport"
          :class="{ selected: selected === TRANSPORT }"
          @click="selected = TRANSPORT"
        >
          <img
            src="~/assets/images/transport.svg"
            alt="car"
          >
          <h2 class="title">
            Transport en commun
          </h2>
          <h3 class="title">
            <strong>8 à 50 personnes</strong>
          </h3>
          <p>Service de transport collectif, permet de réserver ponctuellement un bus, jusqu'à 50 personnes.</p>
          <div class="radio" />
        </button>
      </div>

      <button
        class="button is-primary"
        @click="validateType"
      >
        Valider
      </button>
    </section>
  </main>
</template>

<script>
import {
  RIDE, SHUTTLE, TRANSPORT, isValidType,
} from '~/store/displacement';

export default {
  props: {
    campus: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      selected: null,
      campusId: this.campus.id,
      RIDE,
      SHUTTLE,
      TRANSPORT,
    };
  },
  methods: {
    validateType() {
      if (isValidType(this.selected)) {
        this.$router.push({
          name: this.selected === SHUTTLE ? 'campus-shuttles-book' : `campus-${this.selected}-new`,
          params: { campus: this.campusId },
        });
      } else {
        this.$toast.error('Veuillez sélectionner un type de transport');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~assets/css/head';

.section {
  text-align: center;
  .title, .subtitle {
    max-width: 350px;
    margin: auto;
  }
}
.white-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  .buttons {
    width: 50%;
    margin: 7em auto 2em;
    display: grid;
    grid-gap: 1.5em;
    grid-template-areas:
      'car shuttle transport'
    ;
    button {
      position: relative;
      padding: 0 1em 2em 1em;
      background-color: $white;
      border: 3px solid $gray;
      border-radius: .5em;
      cursor: pointer;
      &:hover {
        border-color: $primary;
      }
      &.selected {
        border-color: $primary;
        background-color: rgba($light-gray, .5);
        .radio {
          background-color: $primary;
          box-shadow: inset 0 0 0 4px $light-gray;
        }
      }
      h2, h3 {
        font-size: 1.2em;
        color: inherit;
        margin: 0;
        font-weight: 500;
      }
      h3 {
        font-weight: 700;
      }
      img {
        transform: scale(.5);
      }
      .radio {
        position: absolute;
        background-color: $white;
        height: 2em;
        width: 2em;
        border: inherit;
        border-radius: 100%;
        left: calc(50% - 1em);
        bottom: -1em;
      }
      p {
        margin: 1em;
      }
      &.transport {
        grid-area: transport;
        color: $green;
      }
      &.car {
        grid-area: car;
        color: $primary;
      }
      &.shuttle {
        grid-area: shuttle;
        color: $orange;
      }
    }
    .white-section > a:nth-child(2) {
      margin: auto !important;
      display: block;
    }
  }
  @media screen and (max-width: 600px) {
    .buttons {
      width: 80%;
      margin: 7em auto 2em;
      display: flex;
      flex-direction: column;
      button {
        width: 100%;
      }
    }
  }
}

</style>
