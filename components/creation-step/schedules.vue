<template>
  <aside @click="displaySchedules">
    <fa-icon :icon="['fas', 'clock']" />
    <p>Voir la fiche horaire</p>
  </aside>
</template>

<script>
export default {
  methods: {
    displaySchedules() {
      console.log('display');
    },
  },
};
</script>

<style lang="scss" scoped>
  aside {
    position: absolute;
    top: .5em;
    right: 1em;
    display: flex;
    align-items: center;
    font-weight: 700;
    cursor: pointer;
    svg {
      margin-right: .5em;
    }
    &:hover p {
      text-decoration: underline;
    }
  }
</style>
