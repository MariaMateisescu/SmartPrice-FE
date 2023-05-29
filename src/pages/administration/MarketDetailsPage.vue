<template>
  <div v-if="market">
    <div class="style">
      <img class="logo" :src="market.logo" alt="Market Logo" />
      <div class="location-header">{{ market.name }}</div>
    </div>
    <q-btn class="add-location__btn" @click="showAddLocation = true"
      >Add Location</q-btn
    >
    <q-input v-model="search" filled type="search" hint="Search">
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
    <div v-if="filteredLocations.length">
      <div class="location-card__list">
        <LocationCard
          v-for="location in filteredLocations"
          :key="location._id"
          :locationInfo="location"
          :marketLogo="market.logo"
          :marketName="market.name"
          @fetchMarket="fetchMarket"
        />
      </div>
    </div>
    <div v-if="!filteredLocations.length">No locations to show.</div>
    <q-dialog maximized v-model="showAddLocation">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Add Location</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <AddLocationMapGoogle
            @emitCoords="onEmitCoords"
            :market="market"
            :locationsToBeDisplayed="locationsToBeDisplayed"
          />
          <div style="font-size: 18px">Address: {{ address }}</div>
          <q-input v-model="lat" type="text" label="Latitude" />
          <q-input v-model="lng" type="text" label="Longitude" />
          <q-input v-model="openingHours" type="text" label="Opening Hours" />
          <div class="save-location__container">
            <q-btn
              style="background-color: #267378; color: #fff"
              @click="saveLocation"
              label="Save Location"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import LocationCard from "src/components/administration/LocationCard.vue";
import AddLocationMapGoogle from "src/components/administration/AddLocationMapGoogle.vue";
import { useDashHeaderStore } from "src/stores/dash-header";

export default {
  name: "MarketDetailPage",
  async mounted() {
    await this.fetchMarket();
    const dashHeader = useDashHeaderStore();
    dashHeader.$patch({ title: this.market.name, showBackIcon: true });
  },
  components: {
    LocationCard,
    AddLocationMapGoogle,
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
      locationsToBeDisplayed: [],
      search: "",
    };
  },
  computed: {
    filteredLocations() {
      return this.market.locations.filter(
        (loc) => loc.address.toLowerCase().indexOf(this.search) > -1
      );
    },
  },
  methods: {
    async saveLocation() {
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
          coordinatesGeoJSON: {
            coordinates: [this.lat, this.lng],
          },
        };
        const res = await this.$api.post("/locations", data);
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
      this.market = Object.assign(res.data.data.market);
      this.locationsToBeDisplayed = Object.assign(
        this.locationsToBeDisplayed,
        this.market.locations
      );
      this.locationsLength = this.market.locations.length;
    },
    resetFields() {
      this.lat = null;
      this.lng = null;
      this.address = "";
      this.openingHours = "";
    },
    async onEmitCoords(coords) {
      this.lat = coords.lat();
      this.lng = coords.lng();
      await this.getStreetAddressFrom(this.lat, this.lng);
      if (this.locationsToBeDisplayed.length - this.locationsLength >= 1) {
        this.locationsToBeDisplayed.splice(-1);
        this.locationsToBeDisplayed.push({
          _id: Date.now(),
          address: this.address,
          coordinates: {
            lat: this.lat,
            lng: this.lng,
          },
        });
      } else {
        this.locationsToBeDisplayed.push({
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
        let res = await this.$axios.get(
          "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
            lat +
            "," +
            long +
            `&key=${process.env.GOOGLE_MAPS_API_KEY}`
        );
        if (res.data.error_message) {
          console.log(res.data.error_message);
        } else {
          this.address = res.data.results[0].formatted_address;
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
  margin: 10px 0;
}

.text-h6 {
  /* color: #267378; */
}

.location-card__list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.add-location__btn {
  background-color: #267378;
  color: white;
  margin: 10px;
}
.save-location__container {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
</style>
