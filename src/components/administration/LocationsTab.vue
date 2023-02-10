<template>
  <div class="administrator-tabs">
    <MapGoogle @emitCoords="showCoords" :markers="markers" />
    <q-input v-model="lat" type="text" label="Latitude" />
    <q-input v-model="lng" type="text" label="Longitude" />
    Address: {{ address }}
    <q-btn color="primary" @click="addLocation" label="Add location" />
  </div>
</template>

<script>
// import LMap from "components/LMap.vue";
import MapGoogle from "components/MapGoogle.vue";

export default {
  name: "LocationsTab",
  components: {
    // LMap,
    MapGoogle,
  },
  data() {
    return {
      lat: null,
      lng: null,
      address: null,
      markers: [
        {
          id: 1,
          coordinates: {
            lat: 45.75,
            lng: 21.23,
          },
        },
        {
          id: 2,
          coordinates: {
            lat: 45.8,
            lng: 21.23,
          },
        },
        {
          id: 3,
          coordinates: {
            lat: 45.73,
            lng: 21.23,
          },
        },
        {
          id: 4,
          coordinates: {
            lat: 45.73,
            lng: 21.25,
          },
        },
      ],
    };
  },
  methods: {
    addLocation() {
      console.log("adaugat");
    },
    async showCoords(coords) {
      this.lat = coords.lat();
      this.lng = coords.lng();
      await this.getStreetAddressFrom(this.lat, this.lng);
      console.log(coords);
      this.markers.push({
        id: 122131,
        address: this.address,
        coordinates: {
          lat: this.lat,
          lng: this.lng,
        },
      });
    },
    async getStreetAddressFrom(lat, long) {
      try {
        var { data } = await this.$axios.get(
          "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
            lat +
            "," +
            long +
            "&key=AIzaSyCaLqRmzlYh0hkEI_FtBx8nPhIS0jJH9V0"
        );
        if (data.error_message) {
          console.log(data.error_message);
        } else {
          console.log(data);
          this.address = data.results[0].formatted_address;
        }
      } catch (error) {
        console.log(error.message);
      }
    },
  },
};
</script>

<style></style>
