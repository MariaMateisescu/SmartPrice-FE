<template>
  <div>
    <q-expansion-item
      expand-separator
      icon="receipt"
      :label="shoppingListInfo.name"
      :caption="`${shoppingListInfo.listItems.length}`"
      :to="`/shopping/${this.shoppingListInfo._id}`"
    >
      <q-card
        v-for="listItem in shoppingListInfo.listItems"
        :key="listItem._id"
      >
        {{ listItem.item }}
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

<style scoped></style>
