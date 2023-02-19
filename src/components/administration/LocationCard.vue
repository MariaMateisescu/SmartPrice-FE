<template>
  <q-card class="location-card" @click="goToLocationDetailsPage">
    <div>{{ locationInfo.name }}</div>
    <div>{{ locationInfo.address }}</div>
    <div>{{ locationInfo.openingHours }}</div>
    <div>
      <q-icon
        name="edit"
        class="icons"
        @click="showEditLocationDialog"
      ></q-icon>
      <q-dialog maximized v-model="showEditLocation">
        <q-card>
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Edit Location</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section>
            <EditLocationDialog
              @editLocationSuccess="editLocationSuccess"
              :locationInfo="locationInfo"
              :marketLogo="marketLogo"
              :marketName="marketName"
            />
          </q-card-section>
        </q-card>
      </q-dialog>
      <q-icon
        name="delete"
        class="icons"
        @click="showDeleteLocationDialog"
      ></q-icon>
      <q-dialog v-model="showDeleteLocation" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <span class="q-ml-sm"
              >Are you sure you want to delete {{ locationInfo.name }}?</span
            >
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn flat label="Delete" color="red" @click="deleteLocation" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-card>
</template>

<script>
import EditLocationDialog from "src/components/administration/EditLocationDialog.vue";
export default {
  name: "LocationCard",
  props: ["locationInfo", "marketLogo", "marketName"],
  components: {
    EditLocationDialog,
  },
  data() {
    return {
      showEditLocation: false,
      showDeleteLocation: false,
    };
  },
  methods: {
    goToLocationDetailsPage() {
      this.$router.push(
        `/administration/markets/${this.$route.params.marketId}/${this.locationInfo._id}`
      );
    },
    showEditLocationDialog(e) {
      e.stopPropagation();
      this.showEditLocation = true;
    },
    showDeleteLocationDialog(e) {
      e.stopPropagation();
      this.showDeleteLocation = true;
    },
    async deleteLocation() {
      try {
        const res = await this.$api.delete(
          `/locations/${this.locationInfo._id}/${this.$route.params.marketId}`
        );
        if (res.data.status === "success") {
          this.$emit("fetchMarket");
          this.showDeleteLocation = false;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async editLocationSuccess() {
      this.showEditLocation = false;
      this.$emit("fetchMarket");
    },
  },
};
</script>

<style scoped>
.location-card {
  gap: 20px;
  margin: 20px;
  padding: 10px;
  background-color: #f3f3f3;
}

.icons {
  font-size: 32px;
}
</style>
