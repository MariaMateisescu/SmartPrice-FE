<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Smart Price </q-toolbar-title>
        <div v-if="userStore.authUser">
          {{ userStore.authUser.name }}
        </div>
        <div class="auth-buttons" v-if="!userStore.authUser">
          <q-btn color="white" text-color="black" label="Login" to="/login" />
          <q-btn
            color="white"
            text-color="black"
            label="Sign Up"
            to="/signup"
          />
        </div>
      </q-toolbar>
    </q-header>
    <q-footer bordered class="bg-white text-primary">
      <q-tabs
        no-caps
        active-color="primary"
        class="bg-primary text-white shadow-2"
        v-model="tab"
        align="justify"
      >
        <q-tab name="map" icon="map" />
        <q-tab name="inspo" icon="menu_book" />
        <q-tab name="cart" icon="shopping_basket" />
        <q-tab name="account" icon="person" />
      </q-tabs>
    </q-footer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useUserStore } from "../stores/UserStore";

export default defineComponent({
  name: "MainLayout",

  setup() {
    const leftDrawerOpen = ref(false);
    const userStore = useUserStore();
    return {
      leftDrawerOpen,
      userStore,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.go();
    },
    goToAdministration() {
      this.$router.push("/administration/markets");
    },
  },
});
</script>

<style scoped>
.auth-buttons {
  display: flex;
  gap: 20px;
}
</style>

<style>
.q-tab__icon {
  font-size: 40px !important;
}
</style>
