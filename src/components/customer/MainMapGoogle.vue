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
          <button
            @click="showLocationDetailsDialog(location)"
            class="location-details-button"
          >
            Details
          </button>
        </GMapInfoWindow></GMapMarker
      >
      <GMapMarker
        :position="{ lat: myCoordinates.lat, lng: myCoordinates.lng }"
        :icon="{
          url: currentLocationIcon,
          scaledSize: { width: 18, height: 18 },
        }"
      />
      <GMapCircle
        :radius="circleRadius"
        :center="{ lat: myCoordinates.lat, lng: myCoordinates.lng }"
        :options="circleOptions"
      />
    </GMapMap>
    <div class="slider-box">
      <q-slider
        class="slider"
        v-model="geolocationInfo.radius"
        markers
        :marker-labels="addKm"
        :min="1"
        :max="7"
        @change="sliderChanged"
      />
    </div>
    <q-dialog maximized v-model="showLocationDetails">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Location details</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section style="font-size: 16px">
          <div class="logo-container">
            <img class="logo" :src="locationInfo.market.logo" alt="logo" />
            <div>
              <div>{{ locationInfo.location.name }}</div>
              <div>Adresa: {{ locationInfo.location.address }}</div>
              <div>Program: {{ locationInfo.location.openingHours }}</div>
            </div>
          </div>
          <q-separator></q-separator>
          <div v-if="!categoryInfo">
            <q-item
              clickable
              v-ripple
              v-for="category in categories"
              :key="category._id"
            >
              <q-item-section thumbnail style="color: #00838f">
                <q-icon :name="category.icon" />
              </q-item-section>
              <q-item-section @click="viewProductsInCategory(category)">{{
                category.name
              }}</q-item-section>
            </q-item>
          </div>
          <ProductsInCategoryInLocation
            v-if="categoryInfo"
            :categoryInfo="categoryInfo"
            :locationInfo="locationInfo"
            @goBackToCategories="categoryInfo = null"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { useUserStore } from "src/stores/UserStore";
import { useGeolocationInfoStore } from "src/stores/geolocation-info";
import dot from "src/assets/bluedot.png";
import ProductsInCategoryInLocation from "./ProductsInCategoryInLocation.vue";

export default {
  components: { ProductsInCategoryInLocation },
  data() {
    return {
      openedMarkerID: null,
      zoom: 13,
      currentLocationIcon: dot,
      circleOptions: {
        strokeColor: "#4c8bf5",
        strokeOpacity: 0.7,
        strokeWeight: 2,
        fillColor: "#4c8bf5",
        fillOpacity: 0.1,
      },
      locationInfo: null,
      showLocationDetails: false,
      categories: [],
      categoryInfo: null,
    };
  },
  setup() {
    const userStore = useUserStore();
    const geolocationInfo = useGeolocationInfoStore();
    return {
      userStore,
      geolocationInfo,
    };
  },
  props: ["marketsList", "myCoordinates"],
  async mounted() {
    await this.fetchCategories();
  },
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
    showLocationDetailsDialog(location) {
      this.locationInfo = location;
      this.showLocationDetails = true;
      console.log(this.locationInfo);
    },
    async fetchCategories() {
      const res = await this.$api.get("/categories");
      this.categories = res.data.data.categories;
    },
    viewProductsInCategory(category) {
      this.categoryInfo = category;
    },
  },
  computed: {
    circleRadius() {
      return this.geolocationInfo.$state.radius * 1000;
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
.logo {
  width: 90px;
  height: 90px;
}
.logo-container {
  display: flex;
  /* justify-content: center; */
  margin-bottom: 10px;
  gap: 15px;
}
.location-details-button {
  background: none;
  border: none;
  text-decoration: underline;
  padding: 0px;
  margin-top: 5px;
  color: blue;
}
</style>
