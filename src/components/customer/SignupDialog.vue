<template>
  <div class="illustration">
    <img
      class="illustration_img"
      src="~assets/illustrations/SignUp.svg"
      alt="Signup Illustration"
    />
  </div>
  <div class="signup">
    <q-input
      rounded
      no-error-icon
      lazy-rules="ondemand"
      outlined
      v-model="name"
      label="Name"
      :rules="nameRules"
      ref="nameRef"
    />
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
    <q-input
      rounded
      no-error-icon
      lazy-rules="ondemand"
      outlined
      v-model="password"
      :type="isPwd ? 'password' : 'text'"
      label="Password"
      :rules="passwordRules"
      ref="passwordRef"
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
      no-error-icon
      lazy-rules="ondemand"
      outlined
      v-model="passwordConfirm"
      :type="isPwdConfirm ? 'password' : 'text'"
      label="Confirm Password"
      :rules="passwordConfirmRules"
      ref="passwordConfirmRef"
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
      <q-btn
        class="login-btn"
        flat
        label="Log in"
        @click="this.$emit('emitLogin')"
      />
    </div>
  </div>
</template>

<script>
import { useUserStore } from "../../stores/UserStore";
import useQuasar from "quasar/src/composables/use-quasar.js";

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
      $q: useQuasar(),
      nameRules: [
        (val) => (val !== null && val !== "") || "Please type your name",
      ],
      emailRules: [
        (val) =>
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            val
          ) || "Please enter a valid email",
      ],
      passwordRules: [
        (val) =>
          val.length >= 6 || "Password should have at least 6 characters",
      ],
    };
  },
  emits: ["emitLogin"],
  methods: {
    async onSignup() {
      this.$refs.nameRef.validate();
      this.$refs.emailRef.validate();
      this.$refs.passwordRef.validate();
      this.$refs.passwordConfirmRef.validate();
      if (
        !this.$refs.nameRef.hasError &&
        !this.$refs.emailRef.hasError &&
        !this.$refs.passwordRef.hasError &&
        !this.$refs.passwordConfirmRef.hasError
      ) {
        try {
          const data = {
            name: this.name,
            email: this.email,
            password: this.password,
            passwordConfirm: this.passwordConfirm,
          };
          const res = await this.$api.post("/users/signup", data);
          if (res.data.status === "success") {
            this.$q.notify({
              type: "positive",
              position: "top",
              message: "Account created successfully",
              color: "positive",
              timeout: "2500",
            });
            localStorage.setItem("token", res.data.token);
            this.$api.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${localStorage.getItem("token")}`;
            this.$router.push("/");
            this.useUser.setUser(res.data.data.user);
          }
        } catch (error) {
          // negative notify
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
  computed: {
    passwordConfirmRules() {
      return [
        (val) =>
          val.length >= 6 || "Password should have at least 6 characters",
        (val) => val === this.password || "Passwords do not match",
      ];
    },
  },
};
</script>

<style scoped>
.illustration {
  height: 30vh;
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
  gap: 5px;
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
  background: #00838f;
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
}
.login-btn {
  color: rgba(10, 25, 41, 0.8);
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>
