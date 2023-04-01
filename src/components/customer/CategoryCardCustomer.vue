<template>
  <q-card @click="goToCategory">{{ categoryInfo.name }}</q-card>
</template>

<script>
export default {
  name: "CategoryCardCustomer",
  props: ["categoryInfo"],
  methods: {
    goToCategory() {
      this.$router.push(`/shopping/${this.categoryInfo._id}`);
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
