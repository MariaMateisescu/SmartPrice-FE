<template>
  <q-card class="market-card" @click="goToLocations">
    <img :src="marketInfo.logo" alt="" />
    <div class="market-card__name">{{ marketInfo.name }}</div>
    <q-icon name="edit" class="icons" @click="showEditMarketDialog"></q-icon>
    <q-dialog maximized v-model="showEditMarket">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Edit Market</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="marketName"
            type="text"
            label="Market Name"
            class="q-mb-lg"
          />
          <q-file
            color="teal"
            filled
            v-model="marketLogo"
            label="Logo"
            @update:model-value="uploadFile"
          >
            <template v-slot:prepend>
              <q-icon name="cloud_upload" />
            </template>
          </q-file>
        </q-card-section>
        <q-btn @click="editMarket">Edit market</q-btn>
      </q-card>
    </q-dialog>
    <q-icon
      name="delete"
      class="icons"
      @click="showDeleteMarketDialog"
    ></q-icon>
    <q-dialog v-model="showDeleteMarket" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm"
            >Are you sure you want to delete {{ marketInfo.name }}?</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Delete" color="red" @click="deleteMarket" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script>
export default {
  name: "MarketCard",
  props: ["marketInfo"],
  data() {
    return {
      showEditMarket: false,
      showDeleteMarket: false,
      marketName: null,
      marketLogo: null,
    };
  },
  mounted() {
    this.marketName = this.marketInfo.name;
  },
  methods: {
    goToLocations() {
      this.$router.push(`/administration/markets/${this.marketInfo._id}`);
    },
    showEditMarketDialog(e) {
      e.stopPropagation();
      this.showEditMarket = true;
      console.log("market edit");
    },
    async editMarket() {
      try {
        let data = new FormData();
        data.append("name", this.marketName);
        data.append("logo", this.marketLogo);

        const res = await this.$api.patch(
          `/markets/${this.marketInfo._id}`,
          data
        );
        if (res.data.status === "success") {
          this.$emit("fetchMarkets");
          this.showEditMarket = false;
        }
      } catch (err) {
        console.log(err);
      }
    },
    showDeleteMarketDialog(e) {
      e.stopPropagation();
      this.showDeleteMarket = true;
    },
    async deleteMarket() {
      try {
        const res = await this.$api.delete(`/markets/${this.marketInfo._id}`);
        if (res.status >= 200 && res.status < 300) {
          this.$emit("fetchMarkets");
          this.showDeleteMarket = false;
        }
      } catch (err) {
        console.log(err);
      }
    },
    uploadFile() {
      console.log(this.marketLogo);
    },
  },
};
</script>

<style scoped>
.market-card__name {
  font-size: 20px;
  font-weight: 600;
}
.market-card {
  display: flex;
  gap: 20px;
  margin: 20px;
  background-color: #f3f3f3;
}
img {
  width: 80px;
  height: 80px;
}
.icons {
  font-size: 32px;
}
</style>
