<template>
  <div
    v-if="!shoppingLists && userStore.authUser"
    class="q-gutter-md row justify-center"
  >
    <q-spinner-oval color="cyan-9" size="5em" />
  </div>
  <div v-if="shoppingLists && userStore.authUser">
    <div class="shopping-page">
      <q-drawer
        side="right"
        v-model="drawerRight"
        bordered
        elevated
        :width="250"
        :breakpoint="500"
      >
        <q-scroll-area class="fit">
          <div class="q-pa-sm">
            <div v-if="!selectedProducts.length">Shopping cart is empty.</div>
            <div v-for="product in selectedProducts" :key="product">
              {{ product }}
            </div>
          </div>
          <q-btn
            @click="createShoppingList"
            fab
            label="Create List"
            color="cyan-9"
            :disable="isDisabled"
          />
        </q-scroll-area>
      </q-drawer>
      <q-dialog
        v-model="showNewListDialog"
        seamless
        position="bottom"
        class="addToListDialog"
      >
        <q-card class="q-card__height">
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">What do you need?</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>
          <q-input
            color="cyan-9"
            filled
            v-model="name"
            label="List name"
            class="q-mb-md"
          >
            <template v-slot:prepend>
              <q-icon name="edit_note" />
            </template>
          </q-input>
          <q-separator></q-separator>

          <q-select
            class="searchProduct"
            ref="selectProduct"
            label="Search for product"
            filled
            v-model="query"
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            :options="search"
            @update:model-value="addProductFromSearch"
            @filter="filterFn"
            hint="Minimum 2 characters to trigger filtering"
            style="width: 100%; padding-bottom: 32px"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-select>
          <div v-if="!categoryUniqueProductsInfo" class="addToListDialog">
            <q-item
              clickable
              v-ripple
              v-for="category in categories"
              :key="category._id"
            >
              <q-item-section thumbnail style="padding-left: 10px">
                <q-icon :name="category.icon" />
              </q-item-section>
              <q-item-section @click="viewProductsInCategory(category)">{{
                category.name
              }}</q-item-section>
            </q-item>
            <q-btn
              fab
              icon="shopping_cart"
              color="cyan-9"
              class="shopping-page-sticky-btn"
              @click="drawerRight = true"
            >
              <q-badge color="red" floating v-if="selectedProducts.length">{{
                selectedProducts.length
              }}</q-badge></q-btn
            >
          </div>
          <CategoryUniqueProducts
            v-if="categoryUniqueProductsInfo"
            :categoryUniqueProductsInfo="categoryUniqueProductsInfo"
            @goBackToCategories="categoryUniqueProductsInfo = null"
            :modelValue="selectedProducts"
            @update:modelValue="(value) => (selectedProducts = value)"
          />
        </q-card>
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
          @deletedList="removeListFromArray"
          @editedList="editListFromArray"
        />
      </div>
    </div>
  </div>
  <EmptyState
    v-if="!userStore.authUser"
    :image="image"
    :title="title"
    :message="message"
  >
  </EmptyState>
</template>

<script>
import { useUserStore } from "../stores/UserStore";
import { useDashHeaderStore } from "src/stores/dash-header";
import EmptyState from "src/components/customer/EmptyState.vue";
import ShoppingList from "src/components/customer/ShoppingList.vue";
import CategoryUniqueProducts from "src/components/customer/CategoryUniqueProducts.vue";
import useQuasar from "quasar/src/composables/use-quasar.js";

export default {
  name: "ShoppingPage",
  components: {
    EmptyState,
    ShoppingList,
    CategoryUniqueProducts,
  },
  data() {
    return {
      image: "EmptyState.svg",
      title: "Ooops! You are not logged in!",
      message: "Log in to continue shopping",
      shoppingLists: null,
      showNewListDialog: false,
      drawerRight: false,
      search: [],
      query: "",
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
      categoryUniqueProductsInfo: null,
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter(
        (prod) => prod.toLowerCase().indexOf(this.search) > -1
      );
    },
    isDisabled() {
      return !this.selectedProducts.length;
    },
  },
  async mounted() {
    const dashHeader = useDashHeaderStore();
    dashHeader.$patch({
      title: "Shopping Lists",
      showBackIcon: false,
    });
    if (this.userStore.authUser) {
      this.fetchShoppingLists();
      await Promise.all([this.fetchCategories(), this.fetchProducts()]);
    }
  },

  methods: {
    async fetchProducts() {
      const res = await this.$api.get("/products/get-unique-names");
      this.products = res.data.data.productNames;
      this.search = [...this.products];
    },
    async fetchCategories() {
      const res = await this.$api.get("/categories");
      this.categories = res.data.data.categories;
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
          isRecipe: 0,
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
          this.drawerRight = false;
          this.showNewListDialog = false;
        }
      } catch (err) {
        console.log(err);
      }
    },
    viewProductsInCategory(category) {
      this.categoryUniqueProductsInfo = category;
    },
    filterFn(val, update, abort) {
      if (val.length < 2) {
        abort();
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.search = this.products.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    addProductFromSearch() {
      this.selectedProducts.push(this.query);
      this.query = "";
      this.$refs.selectProduct.blur();
    },
    removeListFromArray(shoppingListInfo) {
      const index = this.shoppingLists.indexOf(shoppingListInfo);
      if (index > -1) {
        this.shoppingLists.splice(index, 1);
      }
    },
    editListFromArray(shoppingListInfo, newName) {
      const index = this.shoppingLists.indexOf(shoppingListInfo);
      this.shoppingLists[index]["name"] = newName;
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
  height: 100px;
}

.shopping-page-sticky-btn {
  position: fixed;
  right: 20px;
  bottom: 30px;
}

.addToListDialog {
  position: relative;
}
</style>

<style>
.q-drawer--on-top {
  z-index: 7000 !important;
}
.q-select__dialog {
  position: absolute;
  top: 100px;
  width: 100vw !important;
  max-width: 100vw !important;
}
</style>
