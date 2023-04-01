<template>
  <div>
    <MainMapGoogle
      :marketsList="locationsToBeDisplayed"
      :myCoordinates="myCoordinates"
      @onSliderChanged="fetchLocationsWithin"
    />
  </div>
</template>

<script>
import MainMapGoogle from "src/components/customer/MainMapGoogle.vue";
import { useDashHeaderStore } from "src/stores/dash-header";

export default {
  name: "HomePage",
  components: {
    MainMapGoogle,
  },
  data() {
    return {
      marketsList: [],
      radius: 4,
      latlng: "",
      myCoordinates: {
        lat: 0,
        lng: 0,
      },
    };
  },
  async mounted() {
    const dashHeader = useDashHeaderStore();
    dashHeader.$patch({ title: "Smart Price", showBackIcon: false });
    try {
      let position = await this.getPosition();
      this.myCoordinates.lat = position.coords.latitude;
      this.myCoordinates.lng = position.coords.longitude;
      this.latlng = this.myCoordinates.lat + "," + this.myCoordinates.lng;
      this.fetchLocationsWithin();
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    getPosition() {
      return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
      });
    },
    async fetchLocationsWithin(newRadius) {
      if (newRadius) this.radius = newRadius;
      const resWithin = await this.$api.get(
        `/locations/locations-within/${this.radius}/center/${this.latlng}`
      );
      this.marketsList = resWithin.data.marketsWithin;
    },
  },
  computed: {
    locationsToBeDisplayed() {
      const locations = [];
      this.marketsList.map((market) => {
        market.locations.forEach((loc) => {
          locations.push({
            location: loc,
            market: { logo: market.market.logo, _id: market.market._id },
          });
        });
      });
      return locations;
    },
  },
};
</script>

<style scoped></style>
