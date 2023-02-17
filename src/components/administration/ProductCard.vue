<template>
  <div>
    <q-card class="product-card">
      <div>{{ productInfo.name }}</div>
      <div>{{ productInfo.brand }}</div>
      <div>{{ productInfo.category }}</div>
      <div>{{ productInfo.price }}</div>
      <div>{{ productInfo.weight }}</div>
      <div>{{ productInfo.quantity }}</div>
      <q-icon name="edit" class="icons" @click="showEditProductDialog"></q-icon>
      <q-dialog maximized v-model="showEditProduct">
        <q-card>
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Edit Product</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section> INPUTS </q-card-section>
        </q-card>
      </q-dialog>
      <q-icon
        name="delete"
        class="icons"
        @click="showDeleteProductDialog"
      ></q-icon>
      <q-dialog v-model="showDeleteProduct" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <span class="q-ml-sm">Are you sure you want to delete ?</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn flat label="Delete" color="red" @click="deleteProduct" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: ["productInfo"],
  data() {
    return {
      showEditProduct: false,
      showDeleteProduct: false,
    };
  },
  methods: {
    showEditProductDialog(e) {
      e.stopPropagation();
      this.showEditProduct = true;
    },

    showDeleteProductDialog(e) {
      e.stopPropagation();
      this.showDeleteProduct = true;
    },
    deleteProduct() {
      console.log("deleted");
    },
  },
};
</script>

<style scoped>
.product-card {
  margin: 20px;
  padding: 10px;
  background-color: #f3f3f3;
}

.icons {
  font-size: 32px;
}
</style>
