<template>
  <div class="illustration">
    <img
      class="illustration_img"
      src="src/assets/illustrations/SignUp.svg"
      alt="Signup Illustration"
    />
  </div>
  <div class="signup">
    <h3 class="signup__header">Sign Up</h3>
    <q-input rounded outlined v-model="name" label="Name" />
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

    <q-input
      rounded
      outlined
      v-model="passwordConfirm"
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
    <q-btn class="signup-btn" @click="onSignup" label="Sign Up" />
    <div class="inline-style">
      <p>Already have an account?</p>
      <q-btn class="login-btn" flat label="Log in" to="/login" />
    </div>
  </div>
</template>

<script>
import { useUserStore } from "../../stores/UserStore";
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
        if (res.data.status === "success") {
          localStorage.setItem("token", res.data.token);
          this.$router.push("/");
          this.useUser.setUser(res.data.data.user);
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
.signup {
  padding: 0 25px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}
.q-input {
  width: 100%;
  max-width: 500px;
}

.signup__header {
  margin: 0px;
  font-size: 36px;
  font-weight: 500;
  color: rgba(10, 25, 41, 0.8);
}

.signup-btn {
  /* width: 340px; */
  width: 100%;
  max-width: 300px;
  height: 56px;
  background: #40c4cd;
  color: rgba(10, 25, 41, 0.8);
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
}
.login-btn {
  color: rgba(10, 25, 41, 0.8);
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>
