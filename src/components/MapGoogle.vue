<template>
  <div>
    <div
      style="
        max-width: 800px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
      "
    >
      <div>
        <div>Your coordinates:</div>
        <p>
          {{ myCoordinates.lat }} Latitude, {{ myCoordinates.lng }} Longitude
        </p>
      </div>
    </div>
    <GMapMap
      :center="myCoordinates"
      :zoom="zoom"
      style="width: 100%; height: 360px; margin: 16px auto"
      ref="mapRef"
      @click="mark"
    >
      <GMapMarker
        :key="index"
        v-for="(m, index) in market.locations"
        :position="m.coordinates"
        :icon="icon"
        :clickable="true"
        @click="openMarker(m._id)"
        ><GMapInfoWindow
          :closeclick="true"
          @closeclick="openMarker(null)"
          :opened="openedMarkerID === m._id"
        >
          <div>{{ m.address }}</div>
        </GMapInfoWindow></GMapMarker
      >
    </GMapMap>
  </div>
</template>
<script>
export default {
  data() {
    return {
      map: null,
      openedMarkerID: null,
      myCoordinates: {
        lat: 0,
        lng: 0,
      },
      zoom: 10,
    };
  },
  props: ["market"],
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
  mounted() {
    this.$refs.mapRef.$mapPromise.then((map) => (this.map = map));
  },
  methods: {
    mark(e) {
      this.$emit("emitCoords", e.latLng);
    },
    openMarker(id) {
      this.openedMarkerID = id;
    },
  },
};
</script>
