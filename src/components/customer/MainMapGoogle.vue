<template>
  <div>
    <GMapMap
      :center="myCoordinates"
      :zoom="zoom"
      class="map-style"
      :class="[
        isAdmin ? 'without-footer-map-height' : 'with-footer-map-height',
      ]"
    >
      <GMapMarker
        :key="index"
        v-for="(location, index) in marketsList"
        :position="location.location.coordinates"
        :icon="{
          url: location.market.logo,
          scaledSize: { width: 30, height: 30 },
          labelOrigin: { x: 16, y: -10 },
        }"
        :clickable="true"
        @click="openMarker(location.location._id)"
        ><GMapInfoWindow
          :closeclick="true"
          @closeclick="openMarker(null)"
          :opened="openedMarkerID === location.location._id"
        >
          <div>{{ location.location.address }}</div>
        </GMapInfoWindow></GMapMarker
      >
      <GMapCircle
        :radius="circleRadius"
        :center="{ lat: myCoordinates.lat, lng: myCoordinates.lng }"
        :options="circleOptions"
      />
    </GMapMap>
    <div class="slider-box">
      <q-slider
        class="slider"
        v-model="distanceWithinKm"
        markers
        :marker-labels="addKm"
        :min="1"
        :max="7"
        @change="sliderChanged"
      />
    </div>
  </div>
</template>

<script>
import { useUserStore } from "../../stores/UserStore";

export default {
  data() {
    return {
      openedMarkerID: null,
      distanceWithinKm: 4,
      zoom: 13,
      circleOptions: {
        strokeColor: "#4c8bf5",
        strokeOpacity: 0.7,
        strokeWeight: 2,
        fillColor: "#4c8bf5",
        fillOpacity: 0.1,
      },
    };
  },
  setup() {
    const userStore = useUserStore();
    return {
      userStore,
    };
  },
  watch: {},
  props: ["marketsList", "myCoordinates"],
  methods: {
    openMarker(id) {
      this.openedMarkerID = id;
    },
    addKm(value) {
      return value + "km";
    },
    sliderChanged(newRadius) {
      this.$emit("onSliderChanged", newRadius);
    },
  },
  computed: {
    circleRadius() {
      return this.distanceWithinKm * 1000;
    },
    isAdmin() {
      return (
        this.userStore.authUser && this.userStore.authUser.role === "admin"
      );
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
.slider {
  /* position: absolute;
  top: 100px;
  width: 80%;
  left: 0;
  right: 0;
  margin: 0 auto; */
}
.without-footer-map-height {
  /* width: 100%; */
  height: calc(100vh - 50px);
}
.with-footer-map-height {
  /* width: 100%; */
  height: calc(100vh - 98px);
}
.slider-box {
  position: absolute;
  bottom: 80px;
  width: 80%;
  left: -45px;
  right: 0;
  margin: 0 auto;
  padding: 0 15px;
  background: radial-gradient(#e5e5e5, #e5e5e562);
}
</style>
