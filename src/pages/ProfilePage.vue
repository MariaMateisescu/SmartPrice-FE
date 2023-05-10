<template>
  <div class="profile-page">
    <div v-if="userStore.authUser" class="profile-page-info">
      <p class="profile-page-title">Account information</p>
      <q-input rounded outlined v-model="name" label="Name" />
      <q-input rounded outlined v-model="email" type="email" label="Email" />
      <q-input
        rounded
        outlined
        v-model="passwordCurrent"
        :type="isPwd ? 'password' : 'text'"
        label="Current Password"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <q-input
        rounded
        outlined
        v-model="password"
        :type="isPwd ? 'password' : 'text'"
        label="New Password"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <q-input
        hint="Password should have at least 8 characters"
        rounded
        outlined
        v-model="passwordConfirm"
        :type="isPwdConfirm ? 'password' : 'text'"
        label="Confirm New Password"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwdConfirm ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwdConfirm = !isPwdConfirm"
          />
        </template>
      </q-input>
      <q-btn
        class="savechanges-btn"
        @click="onSaveChanges"
        label="Save Changes"
      />
      <div class="flex toggle-dark">
        <div style="padding-left: 18px">
          Switch to {{ darkMode ? "light mode" : "dark mode" }}
        </div>
        <q-toggle
          v-model="darkMode"
          checked-icon="dark_mode"
          color="cyan-9"
          size="xl"
          unchecked-icon="light_mode"
          @update:model-value="toggleDarkMode"
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
import useQuasar from "quasar/src/composables/use-quasar.js";

export default {
  name: "ProfilePage",
  components: {
    EmptyState,
  },
  data() {
    return {
      image: "EmptyState.svg",
      title: "Ooops! You are not logged in!",
      message: "Log in to view your profile",
      name: "",
      email: "",
      passwordCurrent: "",
      password: "",
      passwordConfirm: "",
      isPwd: true,
      isPwdConfirm: true,
      darkMode: null,
      $q: useQuasar(),
      dashHeader: useDashHeaderStore(),
      userStore: useUserStore(),
    };
  },
  async mounted() {
    const dashHeader = useDashHeaderStore();
    dashHeader.$patch({
      title: "Profile",
      showBackIcon: false,
    });
    this.darkMode = dashHeader.$state.darkMode;
    if (this.userStore.authUser) {
      this.name = this.userStore.authUser.name;
      this.email = this.userStore.authUser.email;
    }
  },
  methods: {
    toggleDarkMode(e) {
      this.$q.dark.set(e);
      this.dashHeader.$patch({
        darkMode: e,
      });
    },
    async onSaveChanges() {
      try {
        const data = {
          name: this.name,
          passwordCurrent: this.passwordCurrent,
          password: this.password,
          passwordConfirm: this.passwordConfirm,
        };
        const res = await this.$api.patch("/users/updateMyPassword", data);
        if (res.data.status === "success") {
          console.log("succes");
          this.$q.notify({
            type: "positive",
            position: "top",
            message: "Changes saved successfully",
            color: "positive",
            timeout: "2500",
          });
          this.passwordCurrent = "";
          this.password = "";
          this.passwordConfirm = "";
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.profile-page {
  height: 100%;
}
.profile-page-info {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.q-input {
  width: 100%;
  max-width: 300px;
  margin-top: 20px;
}
.savechanges-btn {
  background-color: #267378;
  color: white;
  margin: 10px;
  margin-top: 30px;
}
.profile-page-title {
  font-size: 24px;
  margin-top: 30px;
}
.toggle-dark {
  align-items: center;
  font-size: 16px;
  gap: 60px;
  margin-top: 20px;
}
</style>
