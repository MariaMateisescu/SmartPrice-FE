<template>
  <div v-if="list">
    <div class="list-header">
      <div class="list-header__count">{{ list.listItems.length }} items</div>
      <div class="list-header__status">{{ list.status }}</div>
    </div>
    <q-list
      dense
      bordered
      padding
      class="rounded-borders list"
      v-if="list.status !== 'active'"
    >
      <q-item clickable v-ripple v-for="item in list.listItems" :key="item._id">
        <q-item-section>
          <div>
            {{ item.item }}
            <q-icon v-if="item.status === 'bought'" name="done_outline" />
            <q-icon v-if="item.status === 'not_bought'" name="close" />
          </div>
          <q-separator />
        </q-item-section>
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
        color="cyan-9"
        class="shopping-page-sticky-btn"
      />
      <q-btn
        v-if="list.status === 'active'"
        @click="endShopping"
        fab
        label="end shopping"
        color="cyan-9"
        class="shopping-page-sticky-btn"
      />
      <q-btn
        v-if="list.status === 'completed'"
        @click="reuseShoppingList"
        fab
        icon="refresh"
        label="reuse list"
        color="cyan-9"
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
      backIconTo: "/shopping",
    });
  },
  methods: {
    async fetchList() {
      const res = await this.$api.get(
        `/shopping-lists/get-shopping-lists/${this.$route.params.shoppingListId}`
      );
      this.list = res.data.data.list;
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
      await this.changeListStatus();
      await this.fetchList();
    },
    async endShopping() {
      try {
        const data = {
          status: "completed",
          boughtItems: this.boughtItems,
        };
        const res = await this.$api.patch(
          `/shopping-lists/end-shopping-list/${this.$route.params.shoppingListId}`,
          data
        );

        if (res.data.status === "success") {
          await this.fetchList();
          console.log("end shopping list changed successfully");
        }
      } catch (err) {
        console.log(err);
      }
    },
    async reuseShoppingList() {
      try {
        const itemsToReuse = this.list.listItems.map((item) => item.item);
        const data = {
          name:
            new Date().toLocaleDateString("en-GB") +
            " " +
            new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          selectedProducts: itemsToReuse,
        };

        const res = await this.$api.post(
          "/shopping-lists/create-shopping-list",
          data
        );

        if (res.data.status === "success") {
          await this.$router.push(`/shopping/${res.data.newListId}`);
          this.$router.go(0);
        }

        console.log(res.data.status);
        console.log("gbhjkl", itemsToReuse);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.list-header {
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
}
.list-header__count {
  font-size: 16px;
  text-transform: uppercase;
}

.list-header__status {
  font-size: 16px;
  text-transform: uppercase;
}

.list {
  padding-left: 10px;
  font-size: 16px;
}

.shopping-page-sticky-btn {
  margin-right: 20px;
  margin-bottom: 30px;
}
</style>
