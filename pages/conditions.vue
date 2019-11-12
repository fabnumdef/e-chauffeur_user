<template>
  <main>
    <section class="section content">
      <div class="columns">
        <div class="column is-8">
          <h1 class="title">
            Informations RGPD
          </h1>
          <p>
            Les données relatives à votre course seront conservées 15 jours, puis archivées 2 ans,
            délai à l’expiration duquel les données seront définitivement supprimées.
          </p>
          <p>
            Les données de votre compte seront conservées jusqu'à ce que vous décidiez de supprimer votre compte.
            Elles seront alors archivées pendant 2 ans, délai à l’expiration
            duquel les données seront définitivement supprimées.
          </p>
          <p>
            Lors de la commande d’une course, si vous avez renseigné votre numéro de téléphone, celui-ci sera géo
            localisé pour vous guider et retrouver votre chauffeur au point de rendez-vous demandé.
            La géo localisation de votre téléphone n’est en aucun cas enregistrée par le service e-Chauffeur et ne
            fait donc pas partie des données traitées. Vous pouvez à tout moment désactiver la géo localisation dans
            les paramètres de votre téléphone, ce qui ne vous empêchera pas de réserver une course.
          </p>
          <p>
            Conformément à la réglementation applicable, vous disposez d’un droit d’accès, de rectification et
            d’effacement des données personnelles vous concernant ; d’un droit à la limitation du traitement
            ainsi qu’un droit à la portabilité des données et du droit de retirer votre consentement.
          </p>
          <p>
            Si vous ne souhaitez pas que vos données soient traitées,
            vous ne pourrez pas réserver votre course via cette interface.
          </p>
          <p>
            Les demandes d’exercice des droits peuvent être adressées par écrit à
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
  .content a {
    color: $text-color;
    text-decoration: underline;
    font-weight: bold;
  }
</style>
