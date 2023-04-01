<template>
  <div>
    <div class="product-card__list">
      <!-- <ProductCard
        v-for="product in location.productsList"
        :key="product._id"
        :productInfo="product"
        @editProductSuccess="fetchLocation"
        @deleteProductSuccess="fetchLocation"
      /> -->
      asdfghjk
    </div>
  </div>
</template>

<script>
// import ProductCard from "src/components/administration/ProductCard.vue";
import { useDashHeaderStore } from "src/stores/dash-header";

export default {
  name: "CategorisedProductsPage",
  components: {
    // ProductCard,
  },
  data() {
    return {
      name: null,
    };
  },
  async mounted() {
    const res = await this.$api.get(
      `/categories/${this.$route.params.categoryId}`
    );

    const dashHeader = useDashHeaderStore();
    dashHeader.$patch({
      title: res.data.data.category.name,
      showBackIcon: true,
    });
  },
};
</script>

<style scoped></style>
