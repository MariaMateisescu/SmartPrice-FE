<template>
  <div
    class="empty-state"
    :class="{ 'with-tabs-height': hasTabs, 'without-tabs-height': !hasTabs }"
  >
    <img :src="`src/assets/illustrations/${image}`" alt="" />
    <div class="empty-state__title">{{ title }}</div>
    <div class="message">
      {{ message }}
    </div>
    <div>
      <q-btn
        class="btn"
        style="background-color: #267378; color: #fff"
        label="Log In"
        @click="onLogin"
      />

      <q-btn
        class="btn"
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
              v-if="this.state === 'Log In'"
              @emitForgotPassword="onForgotPassword"
              @emitSignup="onSignup"
            />
            <SignupDialog
              v-if="this.state === 'Sign Up'"
              @emitLogin="onLogin"
            />
            <ForgotPasswordDialog
              v-if="this.state === 'Forgot Password'"
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
  props: ["image", "title", "message", "hasTabs"],
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
      this.state = "Log In";
      this.showAuthDialog = true;
    },
    onSignup() {
      this.state = "Sign Up";
      this.showAuthDialog = true;
    },
    onForgotPassword() {
      this.state = "Forgot Password";
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
  padding: 0 50px;
  text-align: center;
}
.with-tabs-height {
  height: calc(100vh - 99px);
  margin-top: -36px;
}
.without-tabs-height {
  height: calc(100vh - 99px);
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

.btn {
  width: 100%;
  max-width: 300px;
  background: #267378;
  color: rgb(255, 255, 255, 0.9);
  font-size: 20px;
  border-radius: 15px;
  margin-top: 20px;
}

.message {
  font-size: 18px;
}
</style>
