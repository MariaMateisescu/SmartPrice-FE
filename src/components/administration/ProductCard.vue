<template>
  <div>
    <q-card class="product-card">
      <div>{{ productInfo.name }}</div>
      <div>{{ productInfo.brand }}</div>
      <div>{{ productInfo.category }}</div>
      <div>{{ productInfo.price }}</div>
      <div>{{ productInfo.weight }}</div>
      <div>{{ productInfo.quantity }}</div>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: ["productInfo"],
};
</script>

<style scoped>
.product-card {
  margin: 20px;
  padding: 10px;
  background-color: #f3f3f3;
}
</style>
