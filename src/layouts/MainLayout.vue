<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="header">
      <q-toolbar>
        <q-icon
          v-if="dashHeader.showBackIcon && !dashHeader.backIconTo"
          name="arrow_back_ios"
          @click="$router.go(-1)"
          style="margin-left: 10px; font-size: 25px"
        ></q-icon>
        <q-icon
          v-if="dashHeader.showBackIcon && dashHeader.backIconTo"
          name="arrow_back_ios"
          @click="$router.push(`${dashHeader.backIconTo}`)"
          style="margin-left: 10px; font-size: 25px"
        ></q-icon>
        <q-toolbar-title>{{ dashHeader.title }}</q-toolbar-title>
        <div v-if="userStore.authUser">
          <q-avatar color="primary" text-color="white">{{
            userStore.authUser.name[0]
          }}</q-avatar>
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
import { defineComponent } from "vue";
import { useUserStore } from "../stores/UserStore";
import { useDashHeaderStore } from "../stores/dash-header";

export default defineComponent({
  name: "MainLayout",
  setup() {
    const userStore = useUserStore();
    const dashHeader = useDashHeaderStore();
    return {
      userStore,
      dashHeader,
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

<style lang="scss" scoped>
.auth-buttons {
  display: flex;
  gap: 20px;
}
.q-page-container__style {
  height: 100vh;
}
.header {
  background: $brand-color;
  height: 50px;
  color: #fff;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.25);
}
</style>

<style>
.q-tab__icon {
  font-size: 40px !important;
}
</style>
