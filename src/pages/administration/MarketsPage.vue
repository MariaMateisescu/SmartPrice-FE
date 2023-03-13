<template>
  <q-page>
    <div class="page-style">
      <q-btn class="add-market__btn" @click="showAddMarket = true"
        >Add Market</q-btn
      >
      <div class="market-card__list">
        <MarketCard
          v-for="market in markets"
          :key="market._id"
          :marketInfo="market"
          @fetchMarkets="fetchMarkets"
        ></MarketCard>
      </div>
    </div>
    <q-dialog maximized v-model="showAddMarket">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Add Market</div>
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
        <q-btn class="btn" @click="addMarket">Add market</q-btn>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import MarketCard from "src/components/administration/MarketCard.vue";
import { useDashHeaderStore } from "src/stores/dash-header";

export default {
  name: "AdministrationPage",
  components: {
    MarketCard,
  },
  async mounted() {
    const dashHeader = useDashHeaderStore();
    dashHeader.$patch({ title: "Markets", showBackIcon: true });
    await this.fetchMarkets();
  },
  data() {
    return {
      markets: [],
      showAddMarket: false,
      marketLogo: null,
      marketName: "",
    };
  },
  methods: {
    uploadFile() {
      console.log(this.marketLogo);
    },
    async fetchMarkets() {
      const res = await this.$api.get("/markets");
      this.markets = res.data.data.markets;
    },
    resetFields() {
      this.marketLogo = null;
      this.marketName = "";
    },
    async addMarket() {
      try {
        let data = new FormData();
        data.append("name", this.marketName);
        data.append("logo", this.marketLogo);
        const res = await this.$api.post("/markets", data);
        if (res.data.status === "success") {
          await this.fetchMarkets();
          this.showAddMarket = false;
          this.resetFields();
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.markets-header {
  font-size: 32px;
  text-align: center;
  margin-top: 20px;
}
.page-style {
  padding-top: 50px;
}
.add-market__btn {
  background-color: #267378;
  color: white;
  margin: 10px;
}
.text-h6,
.btn {
  color: #267378;
}
.add-market-modal {
  background-color: #eee;
}

.market-card__list {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
</style>
