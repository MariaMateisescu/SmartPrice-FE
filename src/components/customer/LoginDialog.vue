<template>
  <div class="illustration">
    <img
      class="illustration_img"
      src="src/assets/illustrations/Login.svg"
      alt="Login Illustration"
    />
  </div>
  <div class="login">
    <q-input rounded outlined v-model="email" type="email" label="Email" />
    <q-input
      rounded
      outlined
      v-model="password"
      :type="isPwd ? 'password' : 'text'"
      label="Password"
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>
    <q-btn
      flat
      class="forgot-pass-btn"
      label="Forgot password"
      @click="this.$emit('emitForgotPassword')"
    />
    <q-btn class="login-btn" @click="login" label="Log In" />
    <div class="inline-style">
      <p>Don't have an account?</p>
      <q-btn
        class="signup-btn"
        flat
        label="Sign Up"
        @click="this.$emit('emitSignup')"
      />
    </div>
  </div>
</template>

<script>
import { useUserStore } from "../../stores/UserStore";

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      isPwd: true,
      useUser: useUserStore(),
    };
  },
  emits: ["emitForgotPassword", "emitSignup"],
  methods: {
    async login() {
      try {
        const data = {
          email: this.email,
          password: this.password,
        };
        const res = await this.$api.post("/users/login", data);
        localStorage.setItem("token", res.data.token);
        this.useUser.setUser(res.data.data.user);
        if (res.data.data.user.role === "admin") {
          this.$router.push("/administration");
        } else {
          this.$router.push("/");
        }
      } catch (error) {
        console.log(error);
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
.login {
  padding: 0 25px 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 100%;
}
.login__header {
  margin: 0px;
  font-size: 36px;
  font-weight: 500;
  color: rgba(10, 25, 41, 0.8);
}
.forgot-pass-btn {
  color: rgba(10, 25, 41, 0.65);
}
.q-input {
  width: 100%;
  max-width: 500px;
}
.login-btn {
  width: 100%;
  max-width: 300px;
  background: #267378;
  color: rgba(255, 255, 255, 0.8);
  font-size: 20px;
  border-radius: 15px;
}
p {
  text-transform: uppercase;
  color: rgba(10, 25, 41, 0.65);
  font-weight: 500;
  margin-bottom: 0;
}
.signup-btn {
  color: rgba(10, 25, 41, 0.8);
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.inline-style {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
