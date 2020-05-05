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
      <div>
        <button
          class="select-button car"
          :class="{ active: active === RIDE }"
          @click="active = RIDE"
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
            vous pouvez reserver un vehicule jusqu'a huit places pour un trajet ponctuel ou recurent
          </p>
          <div class="radio" />
        </button>
        <button
          class="select-button shuttle"
          :class="{ active: active === TRANSPORT }"
          @click="active = TRANSPORT"
        >
          <img
            src="~/assets/images/shuttle.svg"
            alt="car"
          >
          <h2 class="title">
            Transport en commun
          </h2>
          <h3 class="title">
            <strong>8 a 50 personnes</strong>
          </h3>
          <p>Service de transport collectif, permet de reserver ponctuellement un bus, jusqu'a 50 personnes.</p>
          <div class="radio" />
        </button>
        <button
          class="select-button bus"
          :class="{ active: active === SHUTTLE }"
          @click="active = SHUTTLE"
        >
          <img
            src="~/assets/images/transport.svg"
            alt="car"
          >
          <h2 class="title">
            Navette
          </h2>
          <h3 class="title">
            <strong>8 a 50 personnes</strong>
          </h3>
          <p>
            Service e-Navette, permet de reserver par arret une place disponible sur une ligne de bus mise a disposition
          </p>
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
  layout: 'ride-creation',
  data() {
    return {
      active: null,
      campusId: this.$route.params.campus_id,
      RIDE,
      SHUTTLE,
      TRANSPORT,
    };
  },
  methods: {
    validateType() {
      if (isValidType(this.active)) {
        console.log(this.campusId, this.active);
        const name = `campus-campus_id-${this.active}-new`;
        this.$router.push({
          name,
          params: { campus_id: this.campusId },
        });
      } else {
        this.$toast.error('Veuillez selectionner un type de transports');
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
    width: 350px;
    margin: auto;
  }
}
.white-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  & > div {
    width: 50%;
    margin: 7em auto 2em;
    display: grid;
    grid-gap: 1.5em;
    grid-template-areas:
      'car shuttle bus'
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
      &.active {
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
      &.bus {
        grid-area: bus;
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
}

@media screen and (max-width: 600px) {
  .white-section > div {
    width: 80%;
    grid-template-areas: 'car' 'shuttle' 'bus';
  }
}


</style>
