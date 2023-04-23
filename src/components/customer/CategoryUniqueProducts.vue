<template>
  <div>
    <q-icon name="arrow_back_ios" @click="$emit('goBackToCategories')"></q-icon>
    <span>{{ categoryUniqueProductsInfo.name }}</span>
  </div>
  <q-card>
    <q-list dense bordered padding class="rounded-borders">
      <q-checkbox
        v-for="product in uniqueNames"
        :key="product"
        v-model="value"
        :val="product"
        :label="product"
      ></q-checkbox>
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
  padding: 15px;
  margin-top: 10px;
}
</style>
