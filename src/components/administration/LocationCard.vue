<template>
  <q-slide-item
    @left="showEditLocationDialog"
    @right="showDeleteLocationDialog"
    @click="goToLocationDetailsPage"
  >
    <template v-slot:left>
      <div class="row items-center"><q-icon left name="edit" /> Edit</div>
    </template>
    <template v-slot:right>
      <div class="row items-center">Delete <q-icon right name="delete" /></div>
    </template>

    <q-item>
      <q-item-section>
        <div>{{ locationInfo.name }}</div>
        <div>Adresa: {{ locationInfo.address }}</div>
        <div>Program: {{ locationInfo.openingHours }}</div></q-item-section
      >
    </q-item>
  </q-slide-item>
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
</template>

<script>
import EditLocationDialog from "src/components/administration/EditLocationDialog.vue";
export default {
  name: "LocationCard",
  props: ["locationInfo", "marketLogo", "marketName"],
  components: {
    EditLocationDialog,
  },
  emits: ["fetchMarket"],
  data() {
    return {
      showEditLocation: false,
      showDeleteLocation: false,
    };
  },
  beforeUnmount() {
    clearTimeout(this.timer);
  },
  methods: {
    finalize(reset) {
      this.timer = setTimeout(() => {
        reset();
      }, 1000);
    },
    goToLocationDetailsPage() {
      this.$router.push(
        `/administration/markets/${this.$route.params.marketId}/${this.locationInfo._id}`
      );
    },
    showEditLocationDialog({ reset }) {
      this.showEditLocation = true;
      this.finalize(reset);
    },
    showDeleteLocationDialog({ reset }) {
      this.showDeleteLocation = true;
      this.finalize(reset);
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
.text-h6 {
  color: #00838f;
}
</style>
