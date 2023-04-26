<template>
  <div class="profile-page">
    <div v-if="userStore.authUser">
      <p>Profile page for {{ userStore.authUser.name }}</p>

      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="teal"
          indicator-color="teal"
          align="justify"
          narrow-indicator
        >
          <q-tab name="statistics" label="Statistics" />
          <q-tab name="accountSettings" label="Account Settings" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="statistics">
            <div class="text-h6">See your shopping behaviour</div>
            <div>
              Average time spent shopping:
              <strong>{{ averageTime }}</strong>
            </div>
            <!-- <div v-for="list in completedLists" :key="list.name">
              {{ list.name }} : {{ calculateTimeSpentShopping(list) }}
            </div> -->
            <Chart :completedLists="completedLists" />
          </q-tab-panel>

          <q-tab-panel name="accountSettings">
            <div class="text-h6">
              <avatar :fullname="userStore.authUser.name"></avatar>
              <q-input rounded outlined v-model="name" label="Name" />
              <q-input
                rounded
                outlined
                v-model="email"
                type="email"
                label="Email"
              />
              <q-input
                rounded
                outlined
                v-model="password"
                :type="isPwd ? 'password' : 'text'"
                label="New Password"
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
                label="Confirm New Password"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwdConfirm ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwdConfirm = !isPwdConfirm"
                  />
                </template>
              </q-input>
              <q-btn
                class="savechanges-btn"
                @click="onSaveChanges"
                label="Save Changes"
              />
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
    <EmptyState v-else :image="image" :title="title" :message="message">
    </EmptyState>
  </div>
</template>

<script>
import Avatar from "vue-avatar-component";
import { useUserStore } from "../stores/UserStore";
import { useDashHeaderStore } from "src/stores/dash-header";
import EmptyState from "src/components/customer/EmptyState.vue";
import Chart from "src/components/customer/Chart.vue";

export default {
  name: "ProfilePage",
  components: {
    EmptyState,
    Avatar,
    Chart,
  },
  data() {
    return {
      image: "EmptyState.svg",
      title: "you are not logged in",
      message: "Log in to view your profile",
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      tab: "statistics",
      lists: [],
      completedLists: [],
      timeSpentArray: [],
      averageTime: null,
    };
  },
  async mounted() {
    const dashHeader = useDashHeaderStore();
    dashHeader.$patch({
      title: "Profile",
      showBackIcon: false,
    });
    if (this.userStore.authUser) {
      this.name = this.userStore.authUser.name;
      this.email = this.userStore.authUser.email;
    }
    await this.fetchShoppingLists();
  },
  setup() {
    const userStore = useUserStore();
    return {
      userStore,
    };
  },
  methods: {
    async fetchShoppingLists() {
      const res = await this.$api.get("/shopping-lists/get-shopping-lists");
      this.lists = res.data.shoppingLists;
      this.completedLists = this.lists.filter(
        (list) => list.status === "completed"
      );
      let totalTime = 0;
      this.completedLists.forEach(
        (list) => (totalTime = totalTime + (list.timeEnded - list.timeStarted))
      );

      let avgTime = totalTime / this.completedLists.length;

      let hours = new Date(avgTime).getUTCHours();
      let minutes = new Date(avgTime).getUTCMinutes();
      let seconds = new Date(avgTime).getUTCSeconds();
      if (seconds > 30) minutes++;
      this.averageTime = hours ? hours + " hours " : "" + minutes + " minutes";
      console.log(this.averageTime);
    },
    calculateTimeSpentShopping(list) {
      if (list.status === "completed") {
        const time = list.timeEnded - list.timeStarted;
        let hours = new Date(time).getUTCHours();
        let minutes = new Date(time).getUTCMinutes();
        let seconds = new Date(time).getUTCSeconds();
        if (seconds > 30) minutes++;
        return hours ? hours + " hours " : "" + minutes + " minutes";
      } else return null;
    },
  },
};
</script>

<style scoped>
.profile-page {
  height: 100%;
}
.q-input {
  width: 100%;
  max-width: 500px;
  margin-top: 20px;
}
.savechanges-btn {
  background-color: #267378;
  color: white;
  margin: 10px;
}
</style>
