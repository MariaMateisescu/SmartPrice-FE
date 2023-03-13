<template>
  <q-slide-item @left="showEditProductDialog" @right="showDeleteProductDialog">
    <template v-slot:left>
      <div class="row items-center"><q-icon left name="edit" /> Edit</div>
    </template>
    <template v-slot:right>
      <div class="row items-center">Delete <q-icon right name="delete" /></div>
    </template>

    <q-item>
      <q-item-section>
        <div>Nume: {{ productInfo.name }}</div>
        <div>Brand: {{ productInfo.brand }}</div>
        <div>Categorie: {{ productInfo.category }}</div>
        <div>Pret: {{ productInfo.price }} lei</div>
        <div>Gramaj: {{ productInfo.weight }}</div>
        <div>Cantitate: {{ productInfo.quantity }}</div></q-item-section
      >
    </q-item>
  </q-slide-item>

  <q-dialog maximized v-model="showEditProduct">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Edit Product</div>
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
        <q-btn color="primary" @click="saveProduct">Save Product</q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog v-model="showDeleteProduct" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ml-sm"
          >Are you sure you want to delete {{ productInfo.name }}?</span
        >
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Delete" color="red" @click="deleteProduct" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "ProductCard",
  props: ["productInfo"],
  emits: ["editProductSuccess", "deleteProductSuccess"],
  data() {
    return {
      showEditProduct: false,
      showDeleteProduct: false,
      name: this.productInfo.name,
      category: this.productInfo.category,
      brand: this.productInfo.brand,
      weight: this.productInfo.weight,
      price: this.productInfo.price,
      quantity: this.productInfo.quantity,
    };
  },
  beforeUnmount() {
    clearTimeout(this.timer);
  },
  methods: {
    finalize(reset) {
      this.timer = setTimeout(() => {
        reset();
      }, 1000);
    },
    showEditProductDialog({ reset }) {
      this.showEditProduct = true;
      this.finalize(reset);
    },
    showDeleteProductDialog({ reset }) {
      this.showDeleteProduct = true;
      this.finalize(reset);
    },
    async saveProduct() {
      try {
        const data = {
          name: this.name,
          category: this.category,
          brand: this.brand,
          weight: this.weight,
          price: this.price,
          quantity: this.quantity,
        };
        const res = await this.$api.patch(
          `/products/${this.productInfo._id}`,
          data
        );
        if (res.data.status === "success") {
          this.$emit("editProductSuccess");
          this.showEditProduct = false;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async deleteProduct() {
      try {
        const res = await this.$api.delete(
          `/products/${this.productInfo._id}/${this.$route.params.locationId}`
        );
        if (res.data.status === "success") {
          this.$emit("deleteProductSuccess");
          this.showDeleteProduct = false;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped></style>
