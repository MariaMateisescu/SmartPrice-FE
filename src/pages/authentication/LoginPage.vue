<template>
  <div class="illustration">
    <img
      class="illustration_img"
      src="~assets/illustrations/Login.svg"
      alt="Login Illustration"
    />
  </div>
  <div class="login">
    <h3 class="login__header">Log In</h3>
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
      to="/forgotPassword"
    />
    <q-btn class="login-btn" @click="login" label="Log In" />
    <div class="inline-style">
      <p>Don't have an account?</p>
      <q-btn class="signup-btn" flat label="Sign Up" to="/signup" />
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
        this.$api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localStorage.getItem("token")}`;
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
  padding-top: 50px;
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
  height: 56px;
  background: #00838f;
  color: rgba(255, 255, 255, 0.9);
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
