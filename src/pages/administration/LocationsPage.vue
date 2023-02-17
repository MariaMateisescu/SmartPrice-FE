<template>
  <div v-if="market">
    <div class="style">
      <img class="logo" :src="market.logo" alt="" />
      <div class="location-header">{{ market.name }}</div>
    </div>
    <p>Locations</p>
    <q-btn @click="showAddLocation = true">Add Location</q-btn>

    <LocationCard
      v-for="location in market.locations"
      :key="location._id"
      :locationInfo="location"
      :marketLogo="market.logo"
      :marketName="market.name"
      @fetchMarket="fetchMarket"
    />
    <q-dialog maximized v-model="showAddLocation">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Add Location</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <MapGoogle @emitCoords="showCoords" :market="market" />
          <div>Address: {{ address }}</div>
          <q-input v-model="lat" type="text" label="Latitude" />
          <q-input v-model="lng" type="text" label="Longitude" />
          <q-input v-model="openingHours" type="text" label="Opening Hours" />
          <q-btn color="primary" @click="addLocation" label="Add location" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import LocationCard from "src/components/administration/LocationCard.vue";
import MapGoogle from "components/MapGoogle.vue";

export default {
  name: "LocationsPage",
  async mounted() {
    this.fetchMarket();
  },
  components: {
    LocationCard,
    MapGoogle,
  },
  data() {
    return {
      market: null,
      showAddLocation: false,
      lat: null,
      lng: null,
      address: null,
      locationsLength: 0,
      openingHours: "",
    };
  },
  methods: {
    async addLocation() {
      try {
        const locationName = this.address.split(",")[0];
        const data = {
          name: this.market.name + " " + locationName,
          address: this.address,
          openingHours: this.openingHours,
          coordinates: {
            lat: this.lat,
            lng: this.lng,
          },
          productsList: [],
          marketId: this.$route.params.marketId,
        };
        const res = await this.$api.post("/locations", data);
        console.log(res);
        if (res.data.status === "success") {
          await this.fetchMarket();
          this.showAddLocation = false;
          this.resetFields();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async fetchMarket() {
      const res = await this.$api.get(
        `/markets/${this.$route.params.marketId}`
      );
      this.market = res.data.data.market;
      this.locationsLength = this.market.locations.length;
    },

    resetFields() {
      this.lat = null;
      this.lng = null;
      this.address = "";
      this.openingHours = "";
    },
    async showCoords(coords) {
      this.lat = coords.lat();
      this.lng = coords.lng();
      await this.getStreetAddressFrom(this.lat, this.lng);
      console.log(coords);
      if (this.market.locations.length - this.locationsLength >= 1) {
        this.market.locations.splice(-1);
        this.market.locations.push({
          _id: Date.now(),
          address: this.address,
          coordinates: {
            lat: this.lat,
            lng: this.lng,
          },
        });
      } else {
        this.market.locations.push({
          _id: Date.now(),
          address: this.address,
          coordinates: {
            lat: this.lat,
            lng: this.lng,
          },
        });
      }
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

<style scoped>
.location-header {
  font-size: 32px;
  text-align: center;
  margin-top: 20px;
}

.logo {
  width: 80px;
  height: 80px;
}

.style {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin: 20px 0;
}
</style>
