<template>
  <div v-if="location">
    <div class="location-details__title" v-if="location">
      {{ location.name }}
    </div>
    <q-btn class="add-product__btn" @click="showAddProduct = true"
      >Add Product</q-btn
    >
    <div v-if="!categoryInfo">
      <q-item
        clickable
        v-ripple
        v-for="category in categories"
        :key="category._id"
      >
        <q-item-section thumbnail style="padding-left: 10px">
          <q-icon :name="category.icon" />
        </q-item-section>
        <q-item-section @click="viewProductsInCategory(category)">{{
          category.name
        }}</q-item-section>
      </q-item>
    </div>
    <ProductsInCategory
      v-if="categoryInfo"
      :categoryInfo="categoryInfo"
      @goBackToCategories="categoryInfo = null"
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
import ProductsInCategory from "src/components/administration/ProductsInCategory.vue";

export default {
  name: "ProductsPage",
  components: {
    ProductsInCategory,
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
      showAddProduct: false,
      market: null,
      selectedLocations: [],
      locationOptions: [],
      location: null,
      categoryOptions: [],
      showedOptions: [],
      categories: [],
      categoryInfo: null,
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
      this.categories = res.data.data.categories;
      console.log(this.categories);
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
    viewProductsInCategory(category) {
      this.categoryInfo = category;
      console.log(this.categoryInfo);
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
.location-details__title {
  font-size: 24px;
  padding: 10px;
}
.q-item {
  padding: 0px 16px;
  min-height: 40px;
}
.q-item__section--side {
  color: #267378;
}
</style>
