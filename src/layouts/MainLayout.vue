<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

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

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Menu </q-item-label>
        <q-btn
          v-if="userStore.authUser && userStore.authUser.role === 'admin'"
          color="primary"
          @click="goToAdministration"
          >Go to Administration</q-btn
        >
        <br />
        <br />
        <q-btn color="primary" @click="logout">Logout</q-btn>
      </q-list>
    </q-drawer>

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
