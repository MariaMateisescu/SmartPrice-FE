<template>
  <q-layout view="lHh Lpr lFf">
    <q-header style="background-color: #267378; color: #fff" elevated>
      <q-toolbar>
        <q-toolbar-title> Smart Price </q-toolbar-title>
        <div v-if="userStore.authUser">
          <q-btn :label="`${userStore.authUser.name}`">
            <q-menu :offset="[0, 10]">
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup>
                  <q-item-section>
                    <q-btn
                      style="color: #267378"
                      flat
                      padding="none"
                      @click="logout"
                      >Logout</q-btn
                    ></q-item-section
                  >
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>
    <q-footer bordered class="bg-white text-primary">
      <q-tabs
        no-caps
        active-color="white"
        class="bg-primary text-white shadow-2"
        align="justify"
      >
        <q-route-tab
          style="background-color: #267378; color: #fff"
          name="map"
          icon="map"
          to="/"
          exact
        />
        <q-route-tab
          style="background-color: #267378; color: #fff"
          name="inspo"
          icon="menu_book"
          to="/inspiration"
          exact
        />
        <q-route-tab
          style="background-color: #267378; color: #fff"
          name="cart"
          icon="shopping_basket"
          to="/shopping"
          exact
        />
        <q-route-tab
          style="background-color: #267378; color: #fff"
          name="account"
          icon="person"
          to="/profile"
          exact
        />
      </q-tabs>
    </q-footer>
    <q-page-container class="q-page-container__style">
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
  },
});
</script>

<style scoped>
.auth-buttons {
  display: flex;
  gap: 20px;
}
.q-page-container__style {
  height: 100vh;
}
</style>

<style>
.q-tab__icon {
  font-size: 40px !important;
}
</style>
