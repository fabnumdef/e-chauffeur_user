<template>
  <div class="container">
    <div
      id="shape-top"
    />
    <ec-header />
    <main>
      <section
        id="ec-pres"
        class="section"
      >
        <div class="columns">
          <div class="column is-6">
            <h1 class="title">
              Faites vous conduire à votre prochain rendez-vous professionnel.
            </h1>
            <p>
              E-Chauffeur est un service de véhicule de trasport avec chauffeur accessible à tous les personnels du
              Ministère des Armées pour les trajets professionnels uniquement.
            </p>
            <ul>
              <li>Appelez le numéro e-Chauffeur de votre GS</li>
              <li>Indiquez vos lieux de départ et de destination</li>
              <li>Suivez l'arrivée de votre e-Chauffeur sur votre téléphone</li>
            </ul>
          </div>
          <div class="column">
            <img
              src="smart_tab.png"
              alt="E-chauffeur sur smartphone et tablette"
              class="is-hidden-touch"
            >
          </div>
        </div>
      </section>

      <section
        v-if="campuses.length"
        id="ec-bn"
        class="section"
      >
        <div class="bn-link">
          <a
            v-for="campuse in campuses"
            :key="campuse.id"
            class="button"
            :class="{
              'is-active': btnActive[campuse.id]
            }"
            @click="setInformation(campuse.id)"
          >
            {{ campuse.name }}
          </a>
        </div>

        <div class="columns">
          <div class="column is-4 has-text-centered-mobile bn-infos">
            <h1 class="title">
              Informations
            </h1>
            <vue-simple-markdown :source="information" />
          </div>

          <div class="column">
            <img
              v-show="image"
              :src="image"
              width="770px"
              height="540px"
            >
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import ecHeader from '~/components/header.vue';

export default {
  components: {
    ecHeader,
  },

  data() {
    return {
      campuses: [],
      information: '',
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
      const response = await this.$api.campuses.getCampuses('id,information,name');
      const campuses = response.data;
      return campuses;
    },

    setInformation(id) {
      this.campuses.forEach((campuse) => {
        this.btnActive[campuse.id] = false;
      });

      this.btnActive[id] = true;
      this.information = this.campuses[this.campuses.findIndex(campuse => campuse.id === id)].information;
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

  .container {
    position: initial;
  }

  #ec-pres {
    position: relative;

    p {
      margin-top: 20px;
      margin-bottom: 20px;
    }

    ul {
      list-style: decimal;
      padding-left: 15px;

      li {
        margin-bottom: 10px;
        font-weight: bold;
      }
    }

    img {
      position: absolute;
      top: -90px;
      right: -405px;
    }
  }

  #ec-bn {
    color: $text-color-blue;
    background-color: rgba(234, 239, 244, 0.4);

    a, .button {
      color: $text-color-blue;
      text-transform: uppercase;
    }

    img {
      box-shadow: 10px 53px 105px -34px rgba(0,0,0,0.3);
    }

    .bn-link {
      margin-bottom: 15px;

      .button {
        width: 90px;
        border: 0;
        border-radius: 0;

        &.is-active, &:hover {
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.2);
        }

        &.is-active {
          background-color: $white;
          color: $text-color-blue;
          font-weight: bold;
        }
      }
    }

    .bn-infos {
      margin-top: 30px;

      h1 {
        color: $text-color-blue;
      }

      .markdown-body {
        color: $text-color-blue;
        & /deep/ strong {
          color: $text-color-blue;
        }
      }
    }
  }

  #shape-top {
    position: absolute;
    top: 0;
    left: 0;
    height: 600px;
    width: 100%;
    background-image: linear-gradient(to right, #5534ff, #288eff 51%, #9df8cf);
    border-bottom-left-radius: 100% 150%;
    border-bottom-right-radius: 150% 200%;
  }


  @media screen and (min-width: $widescreen) {
    #ec-bn {
      margin-top: 350px;
    }
  }

  @media screen and (min-width: $tablet) {
    #ec-bn {
      margin-top: 200px;
    }
  }

  @media screen and (max-width: $desktop) {
    #shape-top {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  @media screen and (max-width: $tablet) {
    #shape-top {
      height: 525px;
    }
    #ec-pres {
      background-image: linear-gradient(to right, #5534ff, #288eff 51%, #9df8cf);
    }
  }

</style>
