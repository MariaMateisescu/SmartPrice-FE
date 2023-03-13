<template>
  <div>
    <div class="coords-style"></div>
    <GMapMap
      :center="myCoordinates"
      :zoom="zoom"
      class="map-style"
      @click="markLocation"
    >
      <GMapMarker
        :position="myCoordinates"
        :icon="icon"
        :clickable="true"
        @click="openMarker(locationInfo._id)"
        ><GMapInfoWindow
          :closeclick="true"
          @closeclick="openMarker(null)"
          :opened="openedMarkerID === locationInfo._id"
        >
          <div>{{ address }}</div>
        </GMapInfoWindow></GMapMarker
      >
    </GMapMap>
    <div>Address: {{ address }}</div>
    <q-input v-model="myCoordinates.lat" type="text" label="Latitude" />
    <q-input v-model="myCoordinates.lng" type="text" label="Longitude" />
    <q-input v-model="openingHours" type="text" label="Opening Hours" />
    <q-btn
      style="background-color: #267378; color: #fff"
      @click="onSaveLocationChanges"
      label="Save Changes"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      openedMarkerID: null,
      myCoordinates: {
        lat: 0,
        lng: 0,
      },
      address: "",
      openingHours: "",
      zoom: 14,
    };
  },
  props: ["locationInfo", "marketLogo", "marketName"],
  mounted() {
    this.myCoordinates.lat = this.locationInfo.coordinates.lat;
    this.myCoordinates.lng = this.locationInfo.coordinates.lng;
    this.address = this.locationInfo.address;
    this.openingHours = this.locationInfo.openingHours;
  },
  computed: {
    icon() {
      return {
        url: this.marketLogo,
        scaledSize: { width: 30, height: 30 },
        labelOrigin: { x: 16, y: -10 },
      };
    },
  },
  methods: {
    async markLocation(e) {
      this.myCoordinates.lat = e.latLng.lat();
      this.myCoordinates.lng = e.latLng.lng();
      await this.getStreetAddressFrom(
        this.myCoordinates.lat,
        this.myCoordinates.lng
      );
    },
    openMarker(id) {
      this.openedMarkerID = id;
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
          this.address = data.results[0].formatted_address;
        }
      } catch (error) {
        console.log(error.message);
      }
    },
    async onSaveLocationChanges() {
      try {
        const locationName = this.address.split(",")[0];
        const data = {
          name: this.marketName + " " + locationName,
          address: this.address,
          openingHours: this.openingHours,
          coordinates: {
            lat: this.myCoordinates.lat,
            lng: this.myCoordinates.lng,
          },
        };
        const res = await this.$api.patch(
          `/locations/${this.locationInfo._id}`,
          data
        );
        if (res.data.status === "success") {
          this.$emit("editLocationSuccess");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.coords-style {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.map-style {
  width: 100%;
  height: 360px;
  margin: 16px auto;
}
</style>
