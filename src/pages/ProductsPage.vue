<template>
  <div>List of products</div>
  <ProductsList />
</template>

<script>
import ProductsList from "src/components/ProductsList.vue";
export default {
  name: "ProductsPage",
  components: {
    ProductsList,
  },
};
</script>

<style scoped>
.forgot-password {
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  /* align-items: center; */
}
</style>
