<template>
  <div class="administrator-tabs">
    <q-input v-model="name" type="text" label="Name" />
    <q-input v-model="category" type="text" label="Category" />
    <q-input v-model="brand" type="text" label="Brand" />
    <q-input v-model="weight" type="text" label="Weight" />
    <q-btn color="primary" @click="addProduct" label="Add product" />
  </div>
</template>

<script>
export default {
  name: "ProductsTab",
  data() {
    return {
      name: "",
      category: "",
      brand: "",
      weight: "",
    };
  },
  methods: {
    addProduct() {
      console.log("adaugat");
    },
  },
};
</script>

<style>
.administrator-tabs {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  /* align-items: center; */
}
</style>
