<template>
  <q-slide-item
    @left="showEditMarketDialog"
    @right="showDeleteMarketDialog"
    @click="goToMarketDetailsPage"
  >
    <template v-slot:left>
      <div class="row items-center"><q-icon left name="edit" /> Edit</div>
    </template>
    <template v-slot:right>
      <div class="row items-center">Delete <q-icon right name="delete" /></div>
    </template>

    <q-item>
      <q-item-section avatar>
        <q-avatar rounded>
          <img :src="marketInfo.logo" />
        </q-avatar>
      </q-item-section>
      <q-item-section
        ><div class="market-card__name">
          {{ marketInfo.name }}
        </div></q-item-section
      >
    </q-item>
  </q-slide-item>
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
          color="cyan-9"
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
      <q-btn style="color: #00838f" @click="editMarket">Edit market</q-btn>
    </q-card>
  </q-dialog>
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
      timer: null,
    };
  },
  emits: ["fetchMarkets"],
  mounted() {
    this.marketName = this.marketInfo.name;
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
    goToMarketDetailsPage() {
      this.$router.push(`/administration/markets/${this.marketInfo._id}`);
    },
    showEditMarketDialog({ reset }) {
      this.showEditMarket = true;
      this.finalize(reset);
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
    showDeleteMarketDialog({ reset }) {
      this.showDeleteMarket = true;
      this.finalize(reset);
    },
    async deleteMarket() {
      try {
        const res = await this.$api.delete(`/markets/${this.marketInfo._id}`);
        if (res.data.status === "success") {
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
/* .market-card {
  display: flex;
  gap: 20px;
  margin: 20px;
  background-color: #f3f3f3;
} */
img {
  width: 80px;
  height: 80px;
}

.text-h6 {
  color: #00838f;
}
</style>
