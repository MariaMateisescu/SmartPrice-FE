<template>
  <div class="shopping-page">
    <div v-if="userStore.authUser">
      <h5>Shopping list for {{ userStore.authUser.name }}</h5>
    </div>
    <EmptyState v-else :image="image" :title="title" :message="message">
    </EmptyState>
  </div>
</template>

<script>
import { useUserStore } from "../stores/UserStore";
import EmptyState from "src/components/customer/EmptyState.vue";

export default {
  name: "ProfilePage",
  components: {
    EmptyState,
  },
  data() {
    return {
      image: "ForgotPassword.svg",
      title: "you are not logged in",
      message: "Log in to continue shopping",
    };
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
