<template>
  <div>
    <GMapMap
      :center="myCoordinates"
      :zoom="zoom"
      class="map-style"
      @click="markLocation"
    >
      <GMapMarker
        :key="index"
        v-for="(location, index) in locationsToBeDisplayed"
        :position="location.coordinates"
        :icon="icon"
        :clickable="true"
        @click="openMarker(location._id)"
        ><GMapInfoWindow
          :closeclick="true"
          @closeclick="openMarker(null)"
          :opened="openedMarkerID === location._id"
        >
          <div>{{ location.address }}</div>
        </GMapInfoWindow></GMapMarker
      >
    </GMapMap>
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
      zoom: 10,
    };
  },
  props: ["market", "locationsToBeDisplayed"],
  computed: {
    icon() {
      return {
        url: this.market.logo,
        scaledSize: { width: 30, height: 30 },
        labelOrigin: { x: 16, y: -10 },
      };
    },
  },
  created() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.myCoordinates.lat = position.coords.latitude;
        this.myCoordinates.lng = position.coords.longitude;
      },
      (error) => {
        console.log(error);
      }
    );
  },
  methods: {
    markLocation(e) {
      this.$emit("emitCoords", e.latLng);
    },
    openMarker(id) {
      this.openedMarkerID = id;
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
