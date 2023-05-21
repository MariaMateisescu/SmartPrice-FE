<template>
  <div class="illustration">
    <img
      class="illustration_img"
      src="~assets/illustrations/ForgotPassword.svg"
      alt="Forogt Password Illustration"
    />
  </div>
  <div class="forgot-password">
    <h3 class="forgot-password__header">Forgot Password?</h3>
    <p>Enter your email address to retrieve your password</p>
    <q-input
      rounded
      no-error-icon
      lazy-rules="ondemand"
      outlined
      v-model="email"
      type="email"
      label="Email"
      :rules="emailRules"
      ref="emailRef"
    />
    <q-btn class="forgot-password-btn" @click="onSendCode" label="Send Code" />
    <div class="inline-style">
      <p>Go back to</p>
      <q-btn
        class="login-btn"
        flat
        label="Log In"
        @click="this.$emit('emitLogin')"
      />
    </div>
  </div>
</template>

<script>
import useQuasar from "quasar/src/composables/use-quasar.js";

export default {
  name: "ForgotPasswordPage",
  data() {
    return {
      email: "",
      $q: useQuasar(),
      emailRules: [
        (val) =>
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            val
          ) || "Please enter a valid email",
      ],
    };
  },
  emits: ["emitLogin"],
  methods: {
    async onSendCode() {
      this.$refs.emailRef.validate();
      if (!this.$refs.emailRef.hasError) {
        try {
          const data = {
            email: this.email,
          };
          const res = await this.$api.post("users/forgotPassword", data);
          if (res.data.status === "success") {
            this.$q.notify({
              type: "positive",
              position: "top",
              message: "Code sent to the provided email.",
              color: "positive",
              timeout: "2500",
            });
          }
        } catch (error) {
          this.$q.notify({
            type: "negative",
            position: "top",
            message: "Something went wrong!",
            color: "negative",
            timeout: "2500",
          });
        }
      }
    },
  },
};
</script>

<style scoped>
.illustration {
  height: 40vh;
  background: radial-gradient(#bbeaec, #eeeeee 75%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.forgot-password {
  padding: 0 25px 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 100%;
}
.forgot-password__header {
  margin: 0px;
  font-size: 36px;
  font-weight: 500;
  color: rgba(10, 25, 41, 0.8);
}
.q-input {
  width: 100%;
  max-width: 500px;
}
.forgot-password-btn {
  width: 100%;
  max-width: 300px;
  background: #267378;
  color: rgba(255, 255, 255, 0.9);
  font-size: 20px;
  border-radius: 15px;
}
.inline-style {
  display: flex;
  justify-content: center;
  align-items: center;
}
p {
  text-transform: uppercase;
  color: rgba(10, 25, 41, 0.65);
  font-weight: 500;
  margin-bottom: 0;
  text-align: center;
}
.login-btn {
  color: rgba(10, 25, 41, 0.8);
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>
