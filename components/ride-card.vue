<template>
  <article>
    <h2>26 Juillet 2019 <span>- 14h00</span></h2>
    <section>
      <div class="poi">
        <h3>Lieu d'intérêt de départ</h3>
        <p>POI-8 Gare Sncf</p>
        <p>61 avenue Henri IV, 50100 Cherbourg</p>
      </div>
      <div class="poi">
        <h3>Lieu d'intérêt d'arrivée</h3>
        <p>POI-8 Gare Sncf</p>
        <p>61 avenue Henri IV, 50100 Cherbourg</p>
      </div>
    </section>
    <ul>
      <li>Nombre de passagers : 1</li>
      <li>Présence des bagages : Oui</li>
      <li>Personne à mobilité réduite : Non</li>
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
    border-bottom: 1px solid $light-gray;
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
      h3 {
        font-size: .7em;
        color: $primary;
      }
      .poi {
        padding-bottom: 1em;
        border-bottom: 1px solid $primary;
      }
    }
  }
</style>
