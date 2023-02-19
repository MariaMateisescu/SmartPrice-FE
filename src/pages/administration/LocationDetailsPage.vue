<template>
  <div v-if="location">
    <h5 v-if="location">{{ location.name }}</h5>
    <q-btn @click="showAddProduct = true">Add Product</q-btn>
    <ProductCard
      v-for="product in location.productsList"
      :key="product._id"
      :productInfo="product"
      @editProductSuccess="fetchLocation"
      @deleteProductSuccess="fetchLocation"
    />
    <q-dialog maximized v-model="showAddProduct">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Add Product</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-input v-model="name" type="text" label="Name" />
          <q-input v-model="category" type="text" label="Category" />
          <q-input v-model="brand" type="text" label="Brand" />
          <q-input v-model="weight" type="text" label="Weight" />
          <q-input v-model="price" type="number" label="Price" />
          <q-input v-model="quantity" type="number" label="Quantity" />
          <div>
            <q-option-group
              v-model="selectedLocations"
              :options="locationOptions"
              color="green"
              type="checkbox"
            />
          </div>
          <q-btn color="primary" @click="addProduct" label="Add product" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import ProductCard from "src/components/administration/ProductCard.vue";
export default {
  name: "ProductsPage",
  components: {
    ProductCard,
  },

  async mounted() {
    this.fetchLocation();
    const res = await this.$api.get(`/markets/${this.$route.params.marketId}`);
    this.market = res.data.data.market;
    this.market.locations.map((loc) =>
      this.locationOptions.push({ label: loc.name, value: loc._id })
    );
    this.selectedLocations.push(this.$route.params.locationId);
  },
  data() {
    return {
      name: null,
      category: null,
      brand: null,
      weight: null,
      price: null,
      quantity: null,
      showAddProduct: false,
      market: null,
      selectedLocations: [],
      locationOptions: [],
      location: null,
    };
  },
  methods: {
    async addProduct() {
      try {
        const data = {
          name: this.name,
          category: this.category,
          brand: this.brand,
          weight: this.weight,
          price: this.price,
          quantity: this.quantity,
          selectedLocations: this.selectedLocations,
        };
        const res = await this.$api.post("/products", data);
        if (res.data.status === "success") {
          await this.fetchLocation();
          this.showAddProduct = false;
          this.resetFields();
        }
      } catch (error) {
        console.log(error);
      }
    },
    resetFields() {
      this.name = null;
      this.category = null;
      this.brand = null;
      this.weight = null;
      this.price = null;
      this.quantity = null;
      this.selectedLocations = [this.$route.params.locationId];
    },

    async fetchLocation() {
      const res = await this.$api.get(
        `/locations/${this.$route.params.locationId}`
      );
      this.location = res.data.data.location;
    },
  },
};
</script>

<style scoped></style>
