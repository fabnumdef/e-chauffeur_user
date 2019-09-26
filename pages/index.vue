<template>
  <main>
    <section
      class="section"
    >
      <div class="columns">
        <div class="column is-7-widescreen is-10-fullhd">
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
      </div>
    </section>
    <section class="white-section">
      <div class="fake-container">
        <div class="title has-text-centered">
          Pour vous inscrire, entrez tout d'abord votre courriel professionnel
        </div>
        <pre-register />
        Vous avez déjà un compte ? <nuxt-link :to="{name: 'login'}">
          Connectez-vous
        </nuxt-link>.
      </div>
    </section>
  </main>
</template>

<script>
import preRegister from '~/components/pre-register.vue';
import searchCampus from '~/components/form/search-campus.vue';

export default {
  layout: 'home',
  auth: false,
  components: {
    searchCampus,
    preRegister,
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
    width: 100%;
    .fake-container {
    margin: 10px auto;
      max-width: 440px;
    }
    .title {
      color: $primary;
      font-size: 1.7rem;
      margin: 50px 0;
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

</style>
