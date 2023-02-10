<template>
  <q-page>
    <div>
      <div class="markets-header">Markets</div>
      <MarketCard
        v-for="market in markets"
        :key="market._id"
        :marketInfo="market"
      ></MarketCard>
      <q-btn @click="showAddMarket = true">Add Market</q-btn>
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
          <q-file color="teal" filled v-model="marketLogo" label="Logo">
            <template v-slot:prepend>
              <q-icon name="cloud_upload" />
            </template>
          </q-file>
        </q-card-section>
      </q-card>
      {{ marketLogo }}
    </q-dialog>
  </q-page>
</template>

<script>
import MarketCard from "src/components/administration/MarketCard.vue";

export default {
  name: "AdministrationPage",
  components: {
    MarketCard,
  },
  async mounted() {
    const res = await this.$api.get("/markets");
    this.markets = res.data.data.markets;
  },
  data() {
    return {
      markets: [],
      showAddMarket: false,
      marketLogo: null,
      marketName: "",
    };
  },
};
</script>

<style scoped>
.markets-header {
  font-size: 32px;
  text-align: center;
  margin-top: 20px;
}

.add-market-modal {
  background-color: beige;
}
</style>
