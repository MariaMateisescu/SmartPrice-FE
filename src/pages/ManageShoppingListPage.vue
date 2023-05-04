<template>
  <div v-if="list">
    <q-tabs
      v-if="!list.isRecipe"
      v-model="tab"
      dense
      class="text-grey"
      active-color="teal"
      indicator-color="teal"
      align="justify"
      narrow-indicator
    >
      <q-tab name="list" label="List" />
      <q-tab name="locations" label="Locations" />
    </q-tabs>
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="list">
        <div class="list-header">
          <div class="list-header__count">
            {{ list.listItems.length }} items
          </div>
          <div v-if="timeSpentShopping">{{ timeSpentShopping }}</div>
          <div class="list-header__status">{{ list.status }}</div>
        </div>
        <q-list
          dense
          bordered
          padding
          class="rounded-borders list"
          v-if="list.status !== 'active'"
        >
          <q-item
            clickable
            v-ripple
            v-for="item in list.listItems"
            :key="item._id"
          >
            <q-item-section>
              <div>
                {{ item.item }}
                <q-icon v-if="item.status === 'bought'" name="done_outline" />
                <q-icon v-if="item.status === 'not_bought'" name="close" />
              </div>
              <q-separator />
            </q-item-section>
          </q-item>
        </q-list>
        <q-list
          dense
          bordered
          padding
          class="rounded-borders"
          v-if="list.status === 'active'"
        >
          <q-item
            v-for="item in list.listItems"
            :key="item._id"
            tag="label"
            v-ripple
          >
            <q-item-section avatar>
              <q-checkbox
                v-model="boughtItems"
                :val="item.item"
                color="cyan-9"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ item.item }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <q-page-sticky position="bottom-right" class="shopping-page-sticky">
          <q-btn
            v-if="list.status === 'pending'"
            @click="startShopping"
            fab
            label="go shopping"
            color="cyan-9"
            class="shopping-page-sticky-btn"
          />
          <q-btn
            v-if="list.status === 'active'"
            @click="endShopping"
            fab
            label="end shopping"
            color="cyan-9"
            class="shopping-page-sticky-btn"
          />
          <q-btn
            v-if="list.status === 'completed'"
            @click="reuseShoppingList"
            fab
            icon="refresh"
            label="reuse list"
            color="cyan-9"
            class="shopping-page-sticky-btn"
          />
        </q-page-sticky>
      </q-tab-panel>
      <q-tab-panel name="locations">
        <div class="slider-box">
          <q-slider
            v-model="geolocationInfo.radius"
            markers
            :marker-labels="addKm"
            :min="1"
            :max="7"
            @change="sliderChanged"
          />
        </div>
        <div>Locations List:</div>
        <div
          v-for="location in calculatedLocations"
          :key="location.coordinates"
        >
          <q-card flat bordered v-if="location.count !== 0">
            <q-card-section>
              <div>{{ location.name }}</div>
              <div>
                {{ location.count }}/{{ list.listItems.length }} items available
              </div>
              <q-separator></q-separator>
              <div v-for="avItem in location.availableItems" :key="avItem._id">
                {{ avItem.name }} | {{ avItem.price }} lei
              </div>
              <q-separator></q-separator>
              <div>Total: {{ location.total.toFixed(2) }} lei</div>
            </q-card-section>
          </q-card>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import { useDashHeaderStore } from "src/stores/dash-header";
import { useGeolocationInfoStore } from "src/stores/geolocation-info";
import useQuasar from "quasar/src/composables/use-quasar.js";

export default {
  name: "ManageShoppingListPage",

  data() {
    return {
      boughtItems: [],
      calculatedLocations: [],
      list: null,
      tab: "list",
      latlng: "",
      myCoordinates: {
        lat: 0,
        lng: 0,
      },
      geolocationInfo: null,
    };
  },
  computed: {
    timeSpentShopping() {
      if (this.list.status === "completed") {
        const time = this.list.timeEnded - this.list.timeStarted;
        const formattedTime = new Date(time).toISOString().slice(11, 19);
        return formattedTime;
      } else return null;
    },
  },
  async mounted() {
    this.geolocationInfo = useGeolocationInfoStore();
    await this.fetchList();
    const dashHeader = useDashHeaderStore();

    dashHeader.$patch({
      title: this.list.name,
      showBackIcon: true,
      backIconTo: "/shopping",
    });

    try {
      let position = await this.getPosition();
      this.myCoordinates.lat = position.coords.latitude;
      this.myCoordinates.lng = position.coords.longitude;
      this.latlng = this.myCoordinates.lat + "," + this.myCoordinates.lng;
    } catch (err) {
      console.log(err);
    }

    await this.calculateLocations();
  },
  methods: {
    getPosition() {
      return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
      });
    },
    async fetchList() {
      const res = await this.$api.get(
        `/shopping-lists/get-shopping-lists/${this.$route.params.shoppingListId}`
      );
      this.list = res.data.data.list;
    },
    async changeListStatus() {
      try {
        const data = {
          status: "active",
          timeStarted: Date.now(),
        };
        const res = await this.$api.patch(
          `/shopping-lists/patch-shopping-list/${this.$route.params.shoppingListId}`,
          data
        );

        if (res.data.status === "success") {
          console.log("status changed successfully");
        }
      } catch (err) {
        console.log(err);
      }
    },
    async startShopping() {
      await this.changeListStatus();
      await this.fetchList();
    },
    async endShopping() {
      try {
        const data = {
          status: "completed",
          timeEnded: Date.now(),
          boughtItems: this.boughtItems,
        };
        const res = await this.$api.patch(
          `/shopping-lists/end-shopping-list/${this.$route.params.shoppingListId}`,
          data
        );
        if (res.data.status === "success") {
          await this.fetchList();
        }
      } catch (err) {
        console.log(err);
      }
    },
    async reuseShoppingList() {
      try {
        const itemsToReuse = this.list.listItems.map((item) => item.item);
        const data = {
          name:
            new Date().toLocaleDateString("en-GB") +
            " " +
            new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          selectedProducts: itemsToReuse,
        };

        const res = await this.$api.post(
          "/shopping-lists/create-shopping-list",
          data
        );

        if (res.data.status === "success") {
          await this.$router.push(`/shopping/${res.data.newListId}`);
          this.$router.go(0);
        }
      } catch (err) {
        console.log(err);
      }
    },
    async calculateLocations() {
      const res = await this.$api.get(
        `/locations/calculate-locations/${this.$route.params.shoppingListId}/within/${this.geolocationInfo.$state.radius}/center/${this.latlng}`
      );
      this.calculatedLocations = res.data.calculatedLocations;
    },
    async sliderChanged() {
      await this.calculateLocations();
    },
    addKm(value) {
      return value + "km";
    },
  },
};
</script>

<style scoped>
.list-header {
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
}
.list-header__count {
  font-size: 16px;
  text-transform: uppercase;
}
.list-header__status {
  font-size: 16px;
  text-transform: uppercase;
}
.list {
  padding-left: 10px;
  font-size: 16px;
}
.shopping-page-sticky-btn {
  margin-right: 20px;
  margin-bottom: 30px;
}
.slider-box {
  position: top;
  top: 80px;
  width: 80%;
  left: -45px;
  right: 0;
  margin: 0 auto;
  padding: 0 15px;
  /* background: radial-gradient(#e5e5e5, #e5e5e562); */
}
</style>
