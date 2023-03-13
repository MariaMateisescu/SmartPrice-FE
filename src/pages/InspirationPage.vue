<template>
  <div class="inspiration-page">
    <div v-if="userStore.authUser">
      <h5>Inspiration for {{ userStore.authUser.name }}</h5>
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="green"
          indicator-color="green"
          align="justify"
          narrow-indicator
        >
          <q-tab name="mails" label="All recipes" />
          <q-tab name="alarms" label="My recipes" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="mails">
            <div class="text-h6">Mails</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="alarms">
            <div class="text-h6">Alarms</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
    <EmptyState v-else :image="image" :title="title" :message="message">
    </EmptyState>
  </div>
</template>

<script>
import { useUserStore } from "../stores/UserStore";
import EmptyState from "src/components/customer/EmptyState.vue";

export default {
  name: "InspirationPage",
  components: {
    EmptyState,
  },
  data() {
    return {
      image: "ForgotPassword.svg",
      title: "you are not logged in",
      message: "Log in to see recipes",
      tab: "mails",
    };
  },
  setup() {
    const userStore = useUserStore();
    return {
      userStore,
    };
  },
};
</script>

<style scoped>
.inspiration-page {
  height: 100%;
}
</style>
