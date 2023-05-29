<template>
  <div class="one-category">
    <q-icon name="arrow_back_ios" @click="$emit('goBackToCategories')"></q-icon>
    <span class="">{{ categoryUniqueProductsInfo.name }}</span>
  </div>
  <q-card>
    <q-list dense bordered padding class="rounded-borders">
      <q-item
        v-for="product in uniqueNames"
        :key="product"
        tag="label"
        v-ripple
      >
        <q-item-section avatar>
          <q-checkbox v-model="value" :val="product" color="cyan-9" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ product }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script>
export default {
  name: "CategoryUniqueProducts",
  emits: ["goBackToCategories", "update:modelValue"],
  props: ["categoryUniqueProductsInfo", "modelValue"],
  data() {
    return {
      uniqueNames: [],
    };
  },
  async mounted() {
    await this.fetchUniqueProductNames();
  },
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
  methods: {
    async fetchUniqueProductNames() {
      const res = await this.$api.get(
        `/products/get-unique-names/${this.categoryUniqueProductsInfo._id}`
      );
      this.uniqueNames = res.data.uniqueNamesArray;
    },
  },
};
</script>

<style scoped>
.q-card {
  margin-top: 10px;
}
.one-category {
  padding-left: 10px;
  font-size: 16px;
}
</style>
