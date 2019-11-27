<template>
  <div>
    <div class="background">
      <ec-header/>
    </div>
    <main>
      <section
        class="section columns background"
      >
        <div class="column is-6-widescreen is-offset-2-desktop">
          <h1 class="title">
            Faites vous conduire à votre prochain rendez-vous professionnel.
          </h1>
          <p>
            e-Chauffeur est un service de véhicule de transport avec chauffeur accessible à tout le personnel du
            ministère des Armées pour les trajets professionnels uniquement.
          </p>
          <ol>
            <li>Inscrivez-vous ou connectez-vous sur notre plateforme.</li>
            <li>Indiquez vos lieux de départ et de destination</li>
            <li>Suivez l'arrivée de votre e-Chauffeur sur votre téléphone</li>
          </ol>
          <p>
            Vous pouvez également effectuer votre réservation par téléphone en journée du lundi au vendredi au :
          </p>
          <search-campus
            v-model="phoneCampus"
            class="search-campus"
          />
        </div>
      </section>
      <section
        id="login-form"
        class="section white-section columns"
      >
        <div class="column is-8-widescreen is-offset-2-desktop">
          <h2 class="title">
            Se connecter
          </h2>
          <p>
            Vous êtes un nouvel utilisateur ?
            <nuxt-link :to="{name: 'login'}">
              Créez un compte
            </nuxt-link>.
          </p>
          <form action="">
            <div class="input-wrapper">
              <input
                class="input"
                type="email"
                placeholder="Tapez votre adresse e-mail..."
              >
              <input
                class="input"
                type="password"
                placeholder="Tapez votre mot de passe..."
              >
            </div>
            <div>
              <nuxt-link
                class="button is-centered"
                to="#"
              >
                Inscription
              </nuxt-link>
              <div class="button-wrapper">
                <nuxt-link to="#">
                  Mot de passe oublié ?
                </nuxt-link>
                <button
                  class="button is-primary is-centered"
                  type="submit"
                >
                  Connexion
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      <section class="section blue-section columns is-centered background">
        <div class="column is-4">
          <img
            src="/logo_ec.svg"
            alt="e-Chauffeur"
          >
          <div class="title">
            Réservez votre <strong>e-Chauffeur</strong> dès maintenant
          </div>
          <button
            to="#"
            class="button is-primary is-inverted"
          >
            C'est parti !
          </button>
        </div>
      </section>

      <section class="section white-section columns is-centered">
        <div class="wrapper column is-9">
          <div class="info blue">
            <img
              src="/calendar_icon.png"
              alt="calendar-icon"
            >
            <p><strong>Choisissez vos dates et heures</strong></p>
            <p>Planifiez votre réservation en sélectionnant vos dates, heures et le type de course</p>
          </div>
          <div class="info orange">
            <img
              src="/car_icon.png"
              alt="car-icon"
            >
            <p><strong>Paramétrez votre réservation</strong></p>
            <p>Signalez si vous êtes seul ou accompagné, la présence de bagages ou un passager spécial</p>
          </div>
          <div class="info green">
            <img
              src="/map_icon.png"
              alt="map-icon"
            >
            <p><strong>Rendez-vous à votre point de rencontre</strong></p>
            <p>Suivez votre chauffeur jusqu'au point de récupération, votre course va commencer</p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import ecHeader from '~/components/header.vue';

import searchCampus from '~/components/form/search-campus.vue';

export default {
  layout: 'home',
  auth: false,
  components: {
    searchCampus,
    ecHeader,
  },

  data() {
    return {
      phoneCampus: null,
      campuses: [],
      image: '',
      btnActive: {},
    };
  },

  async created() {
    this.campuses = await this.getCampuses();
    if (this.campuses.length) {
      this.setInformation(this.campuses[0].id);
    }
  },

  methods: {
    async getCampuses() {
      const response = await this.$api.campuses.getCampuses('id,name');
      return response.data;
    },

    setInformation(id) {
      this.campuses.forEach((campuse) => {
        this.btnActive[campuse.id] = false;
      });

      this.btnActive[id] = true;
      // @todo: Refactor this when decision on how to handle image is taken
      if (id.indexOf('BSL') > -1) {
        this.image = 'bsl.png';
      } else {
        this.image = '';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "~assets/css/head";

  $text-color-blue: $blue-medium;

  div header {
    max-width: 1152px;
    margin: auto;
  }

  p {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  ol {
    counter-reset: li; /* Initiate a counter */
    list-style: none; /* Remove default numbering */
    *list-style: decimal; /* Keep using default numbering for IE6/7 */
    font: 15px 'trebuchet MS', 'lucida sans';
    padding: 0;
    text-shadow: 0 1px 0 rgba(255,255,255,.5);

    li {
      font-weight: bold;
      position: relative;
      display: block;
      padding-left: 40px;
      margin: 20px 0;
      color: $white;
      text-decoration: none;
      border-radius: .3em;
      transition: all .3s ease-out;
      &:before {
        content: counter(li);
        counter-increment: li;
        position: absolute;
        left: 0;
        top: 10px;
        margin-top: -15px;
        height: 2em;
        width: 2em;
        line-height: 2em;
        text-align: center;
        font-weight: bold;
        background: linear-gradient(141.87deg, #FFFFFF -0.24%, #3374F7 53.22%, #5CBDEA 104.94%);
        border-radius: 2em;
      }
    }
  }
  .section {
    padding-top: 1rem;
    .title {
      font-weight: 600;
    }
  }
  @media screen and (max-width: $desktop - 1) {
    .section, .white-section {
      padding: 10px;
    }
    .white-section {
      background: $white;
    }
  }

  .white-section {
    color: $blue-dark;
    .title {
      color: $blue-dark;
      font-size: 1.7rem;
      font-weight: 600;
    }
    a {
      color: $primary;
    }
  }

  .blue-section {
    text-align: center;
    button {
      padding: 1.2em 4em;
      font-size: .9em;
    }
    .title {
      font-size: 1.7em;
      margin: .5em 0;
      font-weight: 500;
      strong {
        font-weight: 600;
      }
    }

  }

  #login-form {
    .title {
      margin-bottom: 0.5em;
      font-weight: 600;
    }

    p {
      margin-bottom: 2em;
    }

    form {
      div {
        display: flex;
        justify-content: space-between;
      }

      .input-wrapper {
        margin-bottom: 2em;
      }

      .button-wrapper {
        display: flex;
        align-items: end;

        a {
          margin: 0 1em 0 0;
        }
      }

      input {
        width: 45%;
      }

      .button {
        padding: 1.2em 4em;
        font-size: .9em;
      }
    }
  }

  .wrapper {
    display: flex;
    justify-content: space-around;
    align-items: start;
    border-bottom: 1px solid $light-gray;
    .info {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 3em;
      p {
        margin: 0;
        strong {
          display: block;
          color: inherit;
          font-size: 1.2em;
          margin-top: 2em;
        }
      }

    }
    .info.blue {
      color: $blue;
      img {
        margin-bottom: 1.5em;
      }
    }
    .info.orange {
      color: $orange;
    }
    .info.green {
      color: $green;
      img {
        margin-bottom: 1.3em;
      }
    }
  }

  .search-campus {
    max-width: 500px;
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

  .background {
    background: linear-gradient(75deg, rgb(80, 62, 255), rgb(41, 143, 255), rgb(116, 211, 224)) no-repeat top;
    background-size: 100vw;
  }

</style>
