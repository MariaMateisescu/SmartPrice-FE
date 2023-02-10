<template>
  <div>
    <ProductCard
      v-for="product in products"
      :key="product._id"
      :productInfo="product"
    />
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
    const res = await this.$api.get(
      `/locations/${this.$route.params.locationId}`
    );
    this.products = res.data.data.location.productsList;
    console.log(this.products);
  },
  data() {
    return {
      products: [],
    };
  },
};
</script>

<style scoped></style>
