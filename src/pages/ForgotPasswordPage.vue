<template>
  <div class="forgot-password">
    <q-input v-model="email" type="email" label="Email" />

    <q-btn color="primary" @click="onSendCode" label="Send Code" />
    <q-btn outline rounded color="primary" label="Back" to="/" />
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
        console.log(data.email);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.forgot-password {
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  /* align-items: center; */
}
</style>
