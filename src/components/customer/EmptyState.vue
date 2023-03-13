<template>
  <div class="empty-state">
    <img :src="`src/assets/illustrations/${image}`" alt="" />
    <div class="empty-state__title">{{ title }}</div>
    <p>
      {{ message }}
    </p>
    <div>
      <q-btn
        style="background-color: #267378; color: #fff"
        label="Login"
        @click="onLogin"
      />
      <q-btn
        style="background-color: #267378; color: #fff"
        label="Sign Up"
        @click="onSignup"
      />
      <q-dialog v-model="showAuthDialog" seamless position="bottom">
        <q-card class="q-card__height">
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">{{ this.state }}</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section>
            <LoginDialog
              v-if="this.state === 'login'"
              @emitForgotPassword="onForgotPassword"
              @emitSignup="onSignup"
            />
            <SignupDialog v-if="this.state === 'signup'" @emitLogin="onLogin" />
            <ForgotPasswordDialog
              v-if="this.state === 'forgotPassword'"
              @emitLogin="onLogin"
            />
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import LoginDialog from "src/components/customer/LoginDialog.vue";
import SignupDialog from "src/components/customer/SignupDialog.vue";
import ForgotPasswordDialog from "./ForgotPasswordDialog.vue";

export default {
  name: "EmptyState",
  props: ["image", "title", "message"],
  data() {
    return {
      showAuthDialog: false,
      state: "",
    };
  },
  components: {
    LoginDialog,
    SignupDialog,
    ForgotPasswordDialog,
  },
  methods: {
    onLogin() {
      this.state = "login";
      this.showAuthDialog = true;
    },
    onSignup() {
      this.state = "signup";
      this.showAuthDialog = true;
    },
    onForgotPassword() {
      this.state = "forgotPassword";
      this.showAuthDialog = true;
    },
  },
};
</script>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 50px;
  text-align: center;
}
.empty-state__title {
  font-size: 30px;
  font-weight: 700;
}
.q-card__height {
  height: 100vh;
  max-height: calc(100vh - 50px) !important;
  background-color: #eee;
}
</style>
