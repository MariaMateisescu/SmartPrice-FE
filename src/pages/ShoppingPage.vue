<template>
  <div class="shopping-page">
    <div v-if="userStore.authUser">
      <p>Shopping list for {{ userStore.authUser.name }}</p>
      <q-input v-model="search" filled type="search" hint="Search product">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <div>
        <CategoryCardCustomer
          v-for="category in categories"
          :key="category._id"
          :categoryInfo="category"
        />
      </div>
    </div>
    <EmptyState v-else :image="image" :title="title" :message="message">
    </EmptyState>
  </div>
</template>

<script>
import { useUserStore } from "../stores/UserStore";
import { useDashHeaderStore } from "src/stores/dash-header";
import EmptyState from "src/components/customer/EmptyState.vue";
import CategoryCardCustomer from "src/components/customer/CategoryCardCustomer.vue";

export default {
  name: "ShoppingPage",
  components: {
    EmptyState,
    CategoryCardCustomer,
  },
  data() {
    return {
      image: "EmptyState.svg",
      title: "you are not logged in",
      message: "Log in to continue shopping",
      search: "",
      categories: [],
    };
  },
  async mounted() {
    const dashHeader = useDashHeaderStore();
    dashHeader.$patch({
      title: "Shopping List",
      showBackIcon: false,
    });
    const res = await this.$api.get("/categories");
    this.categories = res.data.data.categories;
  },
  setup() {
    const userStore = useUserStore();
    return {
      userStore,
    };
  },
};
</script>

<style scoped>
.shopping-page {
  height: 100%;
}
</style>
