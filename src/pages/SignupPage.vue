<template>
  <div class="signup">
    <q-input v-model="name" label="Name" />
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

    <q-input
      v-model="passwordConfirm"
      filled
      :type="isPwdConfirm ? 'password' : 'text'"
      label="Confirm Password"
    >
      <template v-slot:append>
        <q-icon
          :name="isPwdConfirm ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwdConfirm = !isPwdConfirm"
        />
      </template>
    </q-input>
    <q-btn color="primary" @click="onSignup" label="Signup" />
    <q-btn
      flat
      color="primary"
      label="Already have an account? Log in"
      to="/login"
    />
  </div>
</template>

<script>
import { useUserStore } from "../stores/UserStore";
export default {
  name: "SignupPage",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      isPwd: true,
      isPwdConfirm: true,
      useUser: useUserStore(),
    };
  },
  methods: {
    async onSignup() {
      try {
        const data = {
          name: this.name,
          email: this.email,
          password: this.password,
          passwordConfirm: this.passwordConfirm,
        };
        const res = await this.$api.post("/users/signup", data);
        console.log(res);
        if (res.data.status === "success") {
          localStorage.setItem("token", res.data.token);
          this.$router.push("/");
          this.useUser.setUser(res.data.data.user);
        }
      } catch (error) {
        console.log(error);
      }
      console.log("Signup");
    },
  },
};
</script>

<style scoped>
.signup {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  /* align-items: center; */
}
</style>
