<template>
  <div v-if="list">
    {{ list.name }}
    {{ list.status }}

    <q-list
      dense
      bordered
      padding
      class="rounded-borders"
      v-if="list.status === 'pending'"
    >
      <q-item clickable v-ripple v-for="item in list.listItems" :key="item._id">
        <q-item-section> {{ item.item }} </q-item-section>
      </q-item>
    </q-list>
    <q-list
      dense
      bordered
      padding
      class="rounded-borders"
      v-if="list.status === 'active'"
    >
      <q-checkbox
        v-for="item in list.listItems"
        :key="item._id"
        v-model="boughtItems"
        :val="item.item"
        :label="item.item"
      ></q-checkbox>
    </q-list>
    <q-page-sticky position="bottom-right" class="shopping-page-sticky">
      <q-btn
        v-if="list.status === 'pending'"
        @click="startShopping"
        fab
        label="go shopping"
        color="teal"
        class="shopping-page-sticky-btn"
      />
      <q-btn
        v-if="list.status === 'active'"
        @click="endShopping"
        fab
        label="end shopping"
        color="purple"
        class="shopping-page-sticky-btn"
      />
    </q-page-sticky>
  </div>
</template>

<script>
import { useDashHeaderStore } from "src/stores/dash-header";

export default {
  name: "ManageShoppingListPage",

  data() {
    return {
      boughtItems: [],
      list: null,
    };
  },
  async mounted() {
    await this.fetchList();
    const dashHeader = useDashHeaderStore();

    dashHeader.$patch({
      title: this.list.name,
      showBackIcon: true,
    });
  },
  methods: {
    async fetchList() {
      const res = await this.$api.get(
        `/shopping-lists/get-shopping-lists/${this.$route.params.shoppingListId}`
      );
      this.list = res.data.data.list;
      console.log(this.list);
    },
    async changeListStatus() {
      try {
        const data = {
          status: "active",
        };
        const res = await this.$api.patch(
          `/shopping-lists/patch-shopping-list/${this.$route.params.shoppingListId}`,
          data
        );

        if (res.data.status === "success") {
          console.log("status changed successfully");
        }
      } catch (err) {
        console.log(err);
      }
    },
    async startShopping() {
      console.log(this.boughtItems);
      console.log("start shopping");
      await this.changeListStatus();
      await this.fetchList();
    },
    endShopping() {
      console.log("shopping ended!!!!");
    },
  },
};
</script>

<style scoped></style>
