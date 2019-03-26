<template>
  <div>
    <nuxt />
    <ec-footer />
  </div>
</template>

<script>
import ecFooter from '~/components/footer.vue';

export default {
  components: {
    ecFooter,
  },
};
</script>
