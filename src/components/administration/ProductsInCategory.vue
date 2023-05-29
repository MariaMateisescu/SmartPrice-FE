<template>
  <q-separator></q-separator>
  <div class="category-name">
    <q-icon name="arrow_back_ios" @click="$emit('goBackToCategories')"></q-icon>
    <strong>{{ categoryInfo.name }}</strong>
  </div>
  <div v-if="productsInCategory && !productsInCategory.length">
    No products in this category.
  </div>
  <div v-if="productsInCategory && productsInCategory.length">
    <ProductCard
      v-for="product in productsInCategory"
      :key="product._id"
      :productInfo="product"
      @deleteProductSuccess="fetchProductsInOneCategory"
      @editProductSuccess="fetchProductsInOneCategory"
    />
  </div>
</template>

<script>
import ProductCard from "src/components/administration/ProductCard.vue";

export default {
  name: "ProductsInCategory",
  components: {
    ProductCard,
  },
  props: ["categoryInfo"],
  emits: ["goBackToCategories"],
  data() {
    return {
      productsInCategory: null,
    };
  },
  async mounted() {
    await this.fetchProductsInOneCategory();
  },
  methods: {
    async fetchProductsInOneCategory() {
      const res = await this.$api.get(
        `/categories/${this.$route.params.locationId}/${this.categoryInfo._id}`
      );
      this.productsInCategory = res.data.data.productsInCategoryInLocation;
    },
  },
};
</script>

<style scoped>
.category-name {
  font-size: 18px;
  margin: 5px;
  display: flex;
  align-items: center;
}
</style>
