<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="header">
      <q-toolbar style="justify-content: space-between">
        <q-icon
          v-if="dashHeader.showBackIcon"
          name="arrow_back_ios"
          @click="$router.go(-1)"
          style="margin-left: 10px; font-size: 25px"
        ></q-icon>
        <q-toolbar-title class="title">{{ dashHeader.title }}</q-toolbar-title>
        <div v-if="userStore.authUser">
          <q-btn icon="manage_accounts">
            <q-menu :offset="[0, 10]">
              <q-list style="min-width: 100px">
                <q-item padding="none" clickable v-close-popup>
                  <q-item-section>
                    <q-btn
                      v-if="
                        userStore.authUser &&
                        userStore.authUser.role === 'admin'
                      "
                      style="color: #267378"
                      padding="none"
                      flat
                      @click="goToAdministration"
                      >Administration</q-btn
                    >
                  </q-item-section>
                </q-item>
                <q-separator />
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
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import { useUserStore } from "../stores/UserStore";
import { useDashHeaderStore } from "../stores/dash-header";

export default defineComponent({
  name: "AdminLayout",

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
      console.log(localStorage.getItem("token"));
      this.userStore.authUser = null;
      if (!localStorage.getItem("token")) {
        this.$router.push("/");
      }
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
.title {
  max-width: fit-content;
}

.header {
  background: #267378;
  height: 50px;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.25);
}
</style>
