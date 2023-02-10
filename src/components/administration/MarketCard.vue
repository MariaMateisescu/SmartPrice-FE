<template>
  <q-card class="market-card" @click="goToLocations">
    <img :src="marketInfo.logo" alt="" />
    <div class="market-card__name">{{ marketInfo.name }}</div>
  </q-card>
</template>

<script>
export default {
  name: "MarketCard",
  props: ["marketInfo"],
  methods: {
    goToLocations() {
      this.$router.push(`/administration/markets/${this.marketInfo._id}`);
    },
  },
};
</script>

<style scoped>
.market-card__name {
  font-size: 20px;
  font-weight: 600;
}
.market-card {
  display: flex;
  gap: 20px;
  margin: 20px;
  background-color: cadetblue;
}
img {
  width: 80px;
  height: 80px;
}
</style>
