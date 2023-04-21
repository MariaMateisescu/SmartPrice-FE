<template>
  <div class="shopping-page">
    <q-dialog v-model="showNewListDialog" seamless position="bottom">
      <q-card class="q-card__height">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">What do you need?</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-input v-model="search" filled type="search" hint="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        {{ selectedProducts }}
        <!-- <q-list dense bordered padding class="rounded-borders">
          <q-checkbox
            v-for="product in filteredProducts"
            :key="product"
            v-model="selectedProducts"
            :val="product"
            :label="product"
          ></q-checkbox>
        </q-list> -->
        <q-list>
          <q-item
            clickable
            v-ripple
            v-for="category in categories"
            :key="category._id"
          >
            <q-item-section thumbnail>
              <q-icon :name="category.icon" />
            </q-item-section>
            <q-item-section>{{ category.name }}</q-item-section>
          </q-item>
        </q-list>
      </q-card>
      <q-page-sticky position="bottom-right" class="shopping-page-sticky">
        <q-btn
          @click="createShoppingList"
          fab
          label="Create List"
          color="cyan-9"
          class="shopping-page-sticky-btn"
        />
      </q-page-sticky>
    </q-dialog>

    <div v-if="userStore.authUser">
      <q-btn
        class="newlist-btn"
        @click="showNewListDialog = true"
        label="New List"
      />
      <ShoppingList
        v-for="shoppingList in shoppingLists"
        :key="shoppingList.id"
        :shoppingListInfo="shoppingList"
      />
    </div>
    <EmptyState v-else :image="image" :title="title" :message="message">
    </EmptyState>
  </div>
</template>

<script>
import { useUserStore } from "../stores/UserStore";
import { useDashHeaderStore } from "src/stores/dash-header";
import EmptyState from "src/components/customer/EmptyState.vue";
import ShoppingList from "src/components/customer/ShoppingList.vue";
import useQuasar from "quasar/src/composables/use-quasar.js";

export default {
  name: "ShoppingPage",
  components: {
    EmptyState,
    ShoppingList,
  },
  data() {
    return {
      image: "EmptyState.svg",
      title: "you are not logged in",
      message: "Log in to continue shopping",
      shoppingLists: [],
      showNewListDialog: false,
      search: [],
      products: [],
      categories: [],
      val: false,
      status: "pending",
      selectedProducts: [],
      userStore: useUserStore(),
      $q: useQuasar(),
      timer: null,
      name:
        new Date().toLocaleDateString("en-GB") +
        " " +
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter(
        (prod) => prod.toLowerCase().indexOf(this.search) > -1
      );
    },
  },
  async mounted() {
    const dashHeader = useDashHeaderStore();
    dashHeader.$patch({
      title: "Shopping Lists",
      showBackIcon: false,
    });
    if (this.userStore.authUser) {
      await this.fetchShoppingLists();
      await this.fetchCategories();
      await this.fetchProducts();
    }
  },

  methods: {
    async fetchProducts() {
      const res = await this.$api.get("/products/get-unique-names");
      this.products = res.data.data.productNames;
    },
    async fetchCategories() {
      const res = await this.$api.get("/categories/");
      this.categories = res.data.data.categories;
      console.log(this.categories);
    },
    async fetchShoppingLists() {
      const res = await this.$api.get("/shopping-lists/get-shopping-lists");
      this.shoppingLists = res.data.shoppingLists.reverse();
    },
    async createShoppingList() {
      try {
        const data = {
          name: this.name,
          selectedProducts: this.selectedProducts,
        };
        const res = await this.$api.post(
          "/shopping-lists/create-shopping-list",
          data
        );
        this.$q.loading.show({
          message: "Some important process  is in progress. Hang on...",
        });
        if (res.data.status === "success") {
          this.timer = setTimeout(() => {
            this.$q.loading.hide();
            this.timer = void 0;
          }, 3000);
          await this.fetchShoppingLists();
          this.showNewListDialog = false;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.shopping-page {
  height: 100%;
}

.newlist-btn {
  // background-color: #267378;
  background-color: $cyan-9;
  color: white;
  margin: 10px;
}

.q-card__height {
  height: 100vh;
  max-height: calc(100vh - 50px) !important;
  background-color: #eee;
}

.shopping-page-sticky {
  transform: translate(0px, 0px) !important;
  display: flex;
  justify-content: flex-end;
}

.shopping-page-sticky-btn {
  margin-right: 20px;
  margin-bottom: 30px;
}
</style>
