<template>
  <div
    id="informations-icons"
    class="column is-9"
  >
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
</template>

<style lang="scss" scoped>
  @import '~assets/css/head';

  #informations-icons {
    margin: auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    .info {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 3em;

      p {
        margin: .5em;

        strong {
          display: block;
          color: inherit;
          font-size: 1.2em;
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

  @media screen and (max-width: 600px) {
    #informations-icons {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(3, 1fr);
      .info {
        padding: 1em;
      }
    }
  }


</style>
