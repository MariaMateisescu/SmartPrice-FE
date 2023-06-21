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
          <q-avatar color="brown-3" text-color="white">{{
            userStore.authUser.name[0]
          }}</q-avatar>
          <q-menu :offset="[0, 10]">
            <q-list style="min-width: 120px">
              <q-item clickable v-close-popup class="account__settings">
                <q-icon
                  name="person"
                  style="color: #00838f"
                  size="24px"
                ></q-icon>
                <q-btn
                  style="color: #00838f"
                  flat
                  padding="none"
                  @click="$router.push('/profile')"
                  >Account</q-btn
                >
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-btn
                    icon="logout"
                    style="color: #00838f"
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
    <q-page-container class="q-page-container__style">
      <router-view />
    </q-page-container>
    <q-footer bordered class="bg-white text-primary">
      <q-tabs
        no-caps
        active-color="white"
        class="text-white shadow-2"
        style="background-color: #00838f"
        align="justify"
      >
        <q-route-tab
          style="background-color: #00838f; color: #fff"
          name="map"
          icon="map"
          to="/"
          exact
        />
        <q-route-tab
          style="background-color: #00838f; color: #fff"
          name="inspo"
          icon="menu_book"
          to="/inspiration"
          exact
        />
        <q-route-tab
          style="background-color: #00838f; color: #fff"
          name="cart"
          icon="shopping_basket"
          to="/shopping"
          exact
        />
        <q-route-tab
          style="background-color: #00838f; color: #fff"
          name="insights"
          icon="bar_chart"
          to="/insights"
          exact
        />
        <q-route-tab
          style="background-color: #00838f; color: #fff"
          name="account"
          icon="style"
          to="/fidelity"
          exact
        />
      </q-tabs>
    </q-footer>
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
      this.userStore.authUser = null;
      this.$router.push("/");
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
  // margin-top: 50px;
  // margin-bottom: 49px;
  padding-top: 50px !important;
  padding-bottom: 50px !important;
  height: calc(100vh - 99px);
}
.header {
  background: $brand-color;
  height: 50px;
  color: #fff;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.25);
}
.account__settings {
  display: flex !important;
  flex-direction: row !important;
  // justify-content: center;
  // justify-content: space-between;

  align-items: center;
}
</style>

<style>
.q-tab__icon {
  font-size: 38px !important;
}
</style>
