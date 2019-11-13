<template>
  <article>
    <h2>26 Juillet 2019 <span>- 14h00</span></h2>
    <section>
      <div class="poi">
        <div class="icon-container">
          <fa-icon
            :icon="['fas', 'map-marker-alt']"
            class="primary-bubble"
          />
        </div>
        <div>
          <h3>Lieu d'intérêt de départ</h3>
          <p>POI-8 Gare Sncf</p>
          <p>61 avenue Henri IV, 50100 Cherbourg</p>
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
          <h3>Lieu d'intérêt d'arrivée</h3>
          <p>POI-8 Gare Sncf</p>
          <p>61 avenue Henri IV, 50100 Cherbourg</p>
        </div>
      </div>
    </section>
    <ul>
      <li>Nombre de passagers : <em>1</em></li>
      <li>Présence des bagages : <em>Oui</em></li>
      <li>Personne à mobilité réduite : <em>Non</em></li>
    </ul>
  </article>
</template>

<script>
export default {
  name: 'RideCard',
  props: {},
};
</script>

<style lang="scss" scoped>
  @import "~assets/css/head";

  $text-color: $blue-medium;
  article {
    padding-bottom: 2em;
    border-bottom: 1px solid $dark-gray;
    margin: 0 .5em 2em;
    h2 {
      font-size: 1.2em;
      font-weight: 700;
      text-transform: uppercase;
      padding-bottom: 1em;
      span {
        color: $primary;
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
        padding-bottom: 1em;
        border-bottom: 2px solid $primary;
        .icon-container {
          margin-right: 1em;
        }
      }
    }

    ul {
      display: flex;
      justify-content: space-between;
      font-weight: 700;
      em {
        color: $primary;
        font-style: normal;
      }
    }
  }
</style>
