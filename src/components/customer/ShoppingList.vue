<template>
  <q-slide-item @right="showDeleteListDialog" @left="showEditListDialog">
    <template v-slot:left>
      <div class="row items-center"><q-icon left name="edit" /> Edit</div>
    </template>
    <template v-slot:right>
      <div class="row items-center">Delete <q-icon right name="delete" /></div>
    </template>

    <q-expansion-item
      class="shopping-list-expension-item"
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
        <div class="flex list-item">
          <div>{{ listItem.item }}</div>
          <q-icon v-if="listItem.status === 'bought'" name="done_outline" />
          <q-icon v-if="listItem.status === 'not_bought'" name="close" />
        </div>
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
  <q-dialog v-model="showEditList" persistent>
    <q-card>
      <q-card-section class="column" style="width: 80vw">
        <span>Edit list name </span>
        <q-input type="text" v-model="newName" color="cyan-9"></q-input>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="red" v-close-popup />
        <q-btn flat label="Save" color="primary" @click="saveName" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "ShoppingList",
  props: ["shoppingListInfo"],
  emits: ["deletedList", "editedList"],
  data() {
    return {
      showDeleteList: false,
      showEditList: false,
      timer: null,
      newName: "",
    };
  },
  mounted() {
    this.newName = this.shoppingListInfo.name;
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
    showEditListDialog({ reset }) {
      this.showEditList = true;
      this.finalize(reset);
    },
    async saveName() {
      try {
        const data = {
          name: this.newName,
        };
        const res = await this.$api.patch(
          `/shopping-lists/patch-shopping-list/${this.shoppingListInfo._id}`,
          data
        );
        if (res.data.status === "success") {
          this.$emit("editedList", this.shoppingListInfo, this.newName);
          this.showEditList = false;
        }
      } catch (err) {
        console.log(err);
      }
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
.list-item {
  align-items: center;
  gap: 5px;
}
.shopping-list-expension-item {
  font-size: 16px;
}

.shopping-list-expension-item :deep(.text-caption) {
  font-size: 14px !important;
}
</style>
