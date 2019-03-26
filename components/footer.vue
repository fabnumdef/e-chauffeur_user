<template>
  <footer>
    <div class="container">
      <div class="columns">
        <div class="column is-3 has-text-centered-mobile">
          <img
            src="logo_ec_blue.svg"
            alt="E-chauffeur"
          >
        </div>
        <div class="column has-text-centered-mobile">
          <img
            src="logo_dirisi.png"
            alt="DIRISI"
          >
          <img
            src="logo_ma.png"
            alt="Ministère des Armées"
          >
          <img
            src="start_up_etat.png"
            alt="Une Startup d'Etat"
          >
          <img
            src="logo_fab_num.png"
            alt="Fabrique Numérique"
          >
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
  @import "~assets/css/head";

  .container {
    margin-top: 100px;
    padding-top: 50px;
    padding-bottom: 50px;
    border-top: 1px solid $grey-lighter;

    .columns {
      .column {
        &:last-child {
          text-align: right;

          img {
          vertical-align: middle;
            &:first-child {
              margin-right: 75px;
            }
            &:nth-child(3) {
              margin-right: 50px;
            }
          }
        }

        &:first-child {
          margin-top: auto;
          margin-bottom: auto;
        }
      }
    }
  }
</style>
