<template>
  <q-card @click="goToCategory">{{ categoryInfo.label }}</q-card>
</template>

<script>
export default {
  name: "CategoryCardAdmin",
  props: ["categoryInfo"],
  methods: {
    goToCategory() {
      this.$router.push(
        `/administration/markets/${this.$route.params.marketId}/${this.$route.params.locationId}/${this.categoryInfo.value}`
      );
    },
  },
};
</script>

<style scoped>
.q-card {
  padding: 15px;
  margin-top: 10px;
}
</style>
