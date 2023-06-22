<template>
  <div
    v-if="!shoppingLists && userStore.authUser"
    class="row justify-center loading-spinner"
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
          <div class="drawer-products-list" style="font-size: 16px">
            <div v-if="!selectedProducts.length">Shopping cart is empty.</div>
            <div v-for="product in selectedProducts" :key="product">
              <div class="flex justify-between" style="padding: 5px">
                <div>
                  {{ product }}
                </div>
                <div>
                  <q-icon
                    name="close"
                    @click="removeFromSelectedProducts(product)"
                  ></q-icon>
                </div>
              </div>
              <q-separator></q-separator>
            </div>
          </div>
          <div class="q-pa-md flex justify-end">
            <q-btn
              @click="createShoppingList"
              label="Create List"
              color="cyan-9"
              rounded
              :disable="isDisabled"
            />
          </div>
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
            color="cyan-9"
            v-model="query"
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            :options="search"
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
            <template v-slot:option="scope">
              <q-item>
                <q-item-section avatar>
                  <q-checkbox
                    class="product-checkbox"
                    color="cyan-9"
                    v-model="selectedProducts"
                    :label="scope.opt"
                    :val="scope.opt"
                  ></q-checkbox>
                </q-item-section>
              </q-item>
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
                <q-icon color="cyan-9" :name="category.icon" />
              </q-item-section>
              <q-item-section
                @click="viewProductsInCategory(category)"
                style="font-size: 16px"
                >{{ category.name }}</q-item-section
              >
            </q-item>
          </div>
          <CategoryUniqueProducts
            v-if="categoryUniqueProductsInfo"
            :categoryUniqueProductsInfo="categoryUniqueProductsInfo"
            @goBackToCategories="categoryUniqueProductsInfo = null"
            :modelValue="selectedProducts"
            @update:modelValue="(value) => (selectedProducts = value)"
          />
          <q-btn
            fab
            icon="shopping_cart"
            color="cyan-9"
            class="shopping-page-sticky-btn"
            @click="openDrawer"
          >
            <q-badge color="red" floating v-if="selectedProducts.length">{{
              selectedProducts.length
            }}</q-badge></q-btn
          >
        </q-card>
      </q-dialog>

      <div v-if="userStore.authUser">
        <q-btn
          v-if="shoppingLists.length > 0"
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
  <EmptyData
    v-if="shoppingLists && shoppingLists.length == 0 && userStore.authUser"
    :image="imageEmptyList"
    :title="titleEmptyList"
    :message="messageEmptyList"
  >
    <template v-slot:button>
      <q-btn
        class="newlist-btn"
        label="New List"
        @click="showNewListDialog = true"
      />
    </template>
  </EmptyData>
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
import EmptyData from "src/components/customer/EmptyData.vue";
import ShoppingList from "src/components/customer/ShoppingList.vue";
import CategoryUniqueProducts from "src/components/customer/CategoryUniqueProducts.vue";
import useQuasar from "quasar/src/composables/use-quasar.js";

export default {
  name: "ShoppingPage",
  components: {
    EmptyState,
    EmptyData,
    ShoppingList,
    CategoryUniqueProducts,
  },
  data() {
    return {
      image: "EmptyState.svg",
      title: "Ooops! You are not logged in!",
      message: "Log in to continue shopping",
      imageEmptyList: "Void.svg",
      titleEmptyList: "No shopping list to show",
      messageEmptyList: "Create your first shopping list",
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
    try {
      if (this.userStore.authUser) {
        this.fetchShoppingLists();
        await Promise.all([this.fetchCategories(), this.fetchProducts()]);
      }
    } catch (err) {
      this.$q.notify({
        type: "negative",
        position: "top",
        message: "Something went wrong!",
        color: "negative",
        timeout: "2500",
      });
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
        this.$q.loading.show({
          message: "Creating list...",
        });

        const res = await this.$api.post(
          "/shopping-lists/create-shopping-list",
          data
        );
        if (res.data.status === "success") {
          this.$q.loading.hide();
          this.$q.notify({
            type: "positive",
            position: "top",
            message: "Shopping list created successfully",
            color: "positive",
            timeout: "2500",
          });
          await this.fetchShoppingLists();
          this.drawerRight = false;
          this.showNewListDialog = false;
        }
      } catch (err) {
        this.$q.notify({
          type: "negative",
          position: "top",
          message: "Something went wrong!",
          color: "negative",
          timeout: "2500",
        });
      }
    },
    viewProductsInCategory(category) {
      this.categoryUniqueProductsInfo = category;
    },
    openDrawer() {
      this.drawerRight = true;
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
    removeFromSelectedProducts(product) {
      const index = this.selectedProducts.indexOf(product);
      this.selectedProducts.splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.newlist-btn {
  background-color: #00838f;
  color: white;
  margin: 10px;
}

.q-card__height {
  height: 100vh;
  max-height: calc(100vh - 50px) !important;
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
  // z-index: 9999;
}

.addToListDialog {
  position: relative;
}
.drawer-products-list {
  padding: 30px 15px 15px;
}
.q-card__section--vert {
  padding: 8px;
}
</style>
