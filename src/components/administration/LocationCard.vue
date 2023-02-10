<template>
  <q-card class="location-card" @click="goToProducts">
    <div>{{ locationInfo.name }}</div>
    <div>{{ locationInfo.address }}</div>
    <div>{{ locationInfo.openingHours }}</div>
  </q-card>
</template>

<script>
export default {
  name: "LocationCard",
  props: ["locationInfo"],
  methods: {
    goToProducts() {
      this.$router.push(
        `/administration/markets/${this.$route.params.marketId}/${this.locationInfo._id}`
      );
    },
  },
};
</script>

<style scoped>
.location-card {
  gap: 20px;
  margin: 20px;
  padding: 10px;
  background-color: #f3f3f3;
}
</style>
