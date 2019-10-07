<template>
  <main>
    <section class="section content">
      <div class="columns">
        <div class="column is-8">
          <h1 class="title">
            Informations RGPD
          </h1>
          <p>
            Les données relatives à votre course seront conservées 15 jours.
          </p>
          <p>
            Les données de votre compte seront conservées jusqu'à ce que vous décidiez de les supprimer.
          </p>
          <p>
            Lors de la commande d’une course, si vous avez renseigné votre numéro de téléphone,
            celui-ci sera géo localisé pour vous guider et retrouver votre chauffeur au point de rendez-vous demandé.
            Vous pouvez à tout moment désactiver la géo localisation dans les paramètres de votre téléphone.
          </p>
          <p>
            Vous disposez de droits sur vos données, que vous pouvez exercer en vous adressant par écrit à
            <a href="mailto:sca.rrt.fct@intradef.gouv.fr">sca.rrt.fct@intradef.gouv.fr</a>
          </p>
          <p>
            Si vous estimez que vos droits en matière de protection des données ne sont pas respectés,
            vous pouvez adresser une réclamation en ligne à la CNIL ou par courrier postal.
          </p>
          <p>
            Si vous ne souhaitez pas que vos données soient traitées,
            vous ne pourrez pas réserver votre course via cette interface.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
export default {
  auth: false,
};
</script>
<style lang="scss" scoped>
  @import "~assets/css/head";
  $text-color: $blue-medium;

  h1 {
    color: $text-color;
  }

  p {
    color: $text-color;
    margin-top: 20px;
    margin-bottom: 20px;
  }
</style>
