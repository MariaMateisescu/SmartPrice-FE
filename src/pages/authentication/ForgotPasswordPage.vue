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
    <q-input rounded outlined v-model="email" type="email" label="Email" />
    <q-btn class="forgot-password-btn" @click="onSendCode" label="Send Code" />
    <div class="inline-style">
      <p>Go back to</p>
      <q-btn class="login-btn" flat label="Log In" to="/login" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ForgotPasswordPage",
  data() {
    return {
      email: "",
    };
  },
  methods: {
    onSendCode() {
      try {
        const data = {
          email: this.email,
        };
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

.forgot-password {
  padding: 0 25px 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
}
.forgot-password__header {
  margin: 0px;
  font-size: 36px;
  font-weight: 500;
  color: rgba(10, 25, 41, 0.8);
}
.forgot-password-btn {
  width: 340px;
  height: 56px;
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
}
.login-btn {
  color: rgba(10, 25, 41, 0.8);
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>
