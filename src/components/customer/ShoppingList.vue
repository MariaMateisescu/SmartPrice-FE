<template>
  <q-slide-item @right="showDeleteListDialog">
    <!-- <template v-slot:left>
      <div class="row items-center"><q-icon left name="edit" /> Edit</div>
    </template> -->
    <template v-slot:right>
      <div class="row items-center">Delete <q-icon right name="delete" /></div>
    </template>

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
  </q-slide-item>

  <q-dialog v-model="showDeleteList" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ml-sm"
          >Are you sure you want to delete "{{ shoppingListInfo.name }}"
          list?</span
        >
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Delete" color="red" @click="deleteShoppingList" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "ShoppingList",
  props: ["shoppingListInfo"],
  emits: ["deletedList"],
  data() {
    return {
      showDeleteList: false,
      timer: null,
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
    goToShoppingListPage() {
      console.log(this.shoppingListInfo);
      this.$router.push(`/shopping/${this.shoppingListInfo._id}`);
    },
    showDeleteListDialog({ reset }) {
      this.showDeleteList = true;
      this.finalize(reset);
    },
    async deleteShoppingList() {
      try {
        const res = await this.$api.delete(
          `/shopping-lists/delete-shopping-list/${this.shoppingListInfo._id}`
        );
        if (res.data.status === "success") {
          this.$emit("deletedList", this.shoppingListInfo);
          this.showDeleteList = false;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.items {
  padding-left: 50px;
}
</style>
