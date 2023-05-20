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
import { useDashHeaderStore } from "src/stores/dash-header";
import { useGeolocationInfoStore } from "src/stores/geolocation-info";
import MainMapGoogle from "src/components/customer/MainMapGoogle.vue";
import useQuasar from "quasar/src/composables/use-quasar.js";

export default {
  name: "HomePage",
  components: {
    MainMapGoogle,
  },
  data() {
    return {
      marketsList: [],
      latlng: "",
      myCoordinates: {
        lat: 0,
        lng: 0,
      },
      geolocationInfo: null,
      $q: useQuasar(),
    };
  },
  async mounted() {
    const dashHeader = useDashHeaderStore();
    dashHeader.$patch({
      title: "Smart Price",
      showBackIcon: false,
    });
    this.geolocationInfo = useGeolocationInfoStore();
    try {
      let position = await this.getPosition();
      this.myCoordinates.lat = position.coords.latitude;
      this.myCoordinates.lng = position.coords.longitude;
      this.latlng = this.myCoordinates.lat + "," + this.myCoordinates.lng;
      this.fetchLocationsWithin();
    } catch (err) {
      this.$q.notify({
        type: "negative",
        position: "top",
        message: "Something went wrong while fetching locations!",
        color: "negative",
        timeout: "2500",
      });
    }
  },
  methods: {
    getPosition() {
      return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
      });
    },
    async fetchLocationsWithin(newRadius) {
      try {
        if (newRadius)
          this.geolocationInfo.$patch({
            radius: newRadius,
          });
        const resWithin = await this.$api.get(
          `/locations/locations-within/${this.geolocationInfo.$state.radius}/center/${this.latlng}`
        );
        this.marketsList = resWithin.data.marketsWithin;
      } catch (err) {
        this.$q.notify({
          type: "negative",
          position: "top",
          message: "Something went wrong while fetching locations!",
          color: "negative",
          timeout: "2500",
        });
      }
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
