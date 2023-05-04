<template>
  <div>
    <q-separator></q-separator>
    <q-icon name="arrow_back_ios" @click="$emit('goBackToCategories')"></q-icon>
    <strong>{{ categoryInfo.name }}</strong>
    <q-separator></q-separator>
  </div>
  <q-card>
    <q-list
      dense
      bordered
      padding
      class="rounded-borders"
      v-if="products.length"
    >
      <div v-for="product in products" :key="product._id">
        <q-item v-if="product" class="flex justify-between">
          <div>{{ product.brand }} {{ product.name }} {{ product.weight }}</div>
          <div>{{ product.price }} lei</div>
        </q-item>
      </div>
    </q-list>
  </q-card>
</template>

<script>
export default {
  name: "ProductsInCategoryInLocation",
  emits: ["goBackToCategories"],
  props: ["categoryInfo", "locationInfo"],
  data() {
    return {
      products: [],
    };
  },
  async mounted() {
    console.log("text", this.locationInfo);
    const res = await this.$api.get(
      `/categories/${this.locationInfo.location._id}/${this.categoryInfo._id}`
    );
    this.products = res.data.data.productsInCategoryInLocation;
    console.log(this.products);
  },
};
</script>

<style scoped>
.q-item {
  padding: 4px 16px;
  min-height: fit-content;
}
</style>
