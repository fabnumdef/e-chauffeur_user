<template>
  <div>
    <nuxt />
    <ec-footer class="footer" />
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
