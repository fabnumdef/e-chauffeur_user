<template>
  <div class="box">
    <slot />
  </div>
</template>

<style scoped lang="scss">
  @import "~assets/css/head";

  $box-radius: 0;
  $box-background-color: $white;
  $box-color: findColorInvert($box-background-color);

  @import "~bulma/sass/elements/box.sass";

  /deep/ strong {
    color: $box-color;
  }
</style>
