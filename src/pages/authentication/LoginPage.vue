<template>
  <div class="login">
    <q-input v-model="email" type="email" label="Email" />
    <q-input
      v-model="password"
      filled
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
    <q-btn color="primary" @click="login" label="Login" />
    <q-btn
      flat
      color="primary"
      label="Don't have an account? Sign Up"
      to="/signup"
    />
    <q-btn flat color="primary" label="Forgot password" to="/forgotPassword" />
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
        this.$router.push("/");
        this.useUser.setUser(res.data.data.user);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.login {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  /* align-items: center; */
}
</style>
