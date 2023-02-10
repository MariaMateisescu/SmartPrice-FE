<template>
  <div v-if="market">
    <div class="location-header">{{ market.name }} Locations</div>
    <LocationCard
      v-for="location in market.locations"
      :key="location._id"
      :locationInfo="location"
    />
    <q-btn>Add Location</q-btn>
  </div>
</template>

<script>
import LocationCard from "src/components/administration/LocationCard.vue";

export default {
  name: "LocationsPage",
  async mounted() {
    const res = await this.$api.get(`/markets/${this.$route.params.marketId}`);
    this.market = res.data.data.market;
  },
  components: {
    LocationCard,
  },
  data() {
    return {
      market: null,
    };
  },
};
</script>

<style scoped>
.location-header {
  font-size: 32px;
  text-align: center;
  margin-top: 20px;
}
</style>
