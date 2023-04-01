<template>
  <div v-if="location">
    <h5 v-if="location">{{ location.name }}</h5>
    <q-btn class="add-product__btn" @click="showAddProduct = true"
      >Add Product</q-btn
    >
    <div>
      <CategoryCardAdmin
        v-for="category in categoryOptions"
        :key="category.value"
        :categoryInfo="category"
      />
    </div>
    <!-- <div class="product-card__list">
      <ProductCard
        v-for="product in location.productsList"
        :key="product._id"
        :productInfo="product"
        @editProductSuccess="fetchLocation"
        @deleteProductSuccess="fetchLocation"
      />
    </div> -->
    <q-dialog maximized v-model="showAddProduct">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Add Product</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-input v-model="name" type="text" label="Name" />
          {{ category }}
          <q-select
            v-model="category"
            :options="showedOptions"
            label="Category"
            use-input
            input-debounce="0"
            @filter="filterFn"
          />
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
          <q-btn
            style="background-color: #267378; color: #fff"
            @click="addProduct"
            label="Add product"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { useDashHeaderStore } from "src/stores/dash-header";
import CategoryCardAdmin from "src/components/administration/CategoryCardAdmin.vue";

export default {
  name: "ProductsPage",
  components: {
    CategoryCardAdmin,
  },

  async mounted() {
    await this.fetchLocation();
    await this.fetchCategories();

    const dashHeader = useDashHeaderStore();
    dashHeader.$patch({ title: this.location.name, showBackIcon: true });

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
      categoryOptions: [],
      showedOptions: [],
    };
  },
  methods: {
    async addProduct() {
      try {
        const data = {
          name: this.name,
          category: this.category.value,
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
    async fetchCategories() {
      const res = await this.$api.get("/categories");
      this.categoryOptions = res.data.data.categories.map(
        ({ _id: value, name: label }) => ({
          value,
          label,
        })
      );
      this.showedOptions = Object.assign(this.categoryOptions);
    },
    filterFn(val, update) {
      if (val === "") {
        update(() => {
          this.showedOptions = this.categoryOptions;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.showedOptions = this.categoryOptions.filter(
          (v) => v.label.toLowerCase().indexOf(needle) > -1
        );
      });
    },
  },
};
</script>

<style scoped>
.text-h6 {
  color: #267378;
}
.add-product__btn {
  background-color: #267378;
  color: white;
  margin: 10px;
}
.product-card__list {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
</style>
