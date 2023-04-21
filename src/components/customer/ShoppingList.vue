<template>
  <div>
    <q-expansion-item
      expand-separator
      icon="receipt_long"
      :label="shoppingListInfo.name"
      :caption="`${shoppingListInfo.listItems.length} items | ${shoppingListInfo.status}`"
      :to="`/shopping/${this.shoppingListInfo._id}`"
    >
      <q-card
        class="items"
        v-for="listItem in shoppingListInfo.listItems"
        :key="listItem._id"
      >
        {{ listItem.item }}
        <q-separator></q-separator>
      </q-card>
    </q-expansion-item>
  </div>
</template>

<script>
export default {
  name: "ShoppingList",
  props: ["shoppingListInfo"],
  methods: {
    goToShoppingListPage() {
      console.log(this.shoppingListInfo);
      this.$router.push(`/shopping/${this.shoppingListInfo._id}`);
    },
  },
};
</script>

<style scoped>
.items {
  padding-left: 50px;
}
</style>
