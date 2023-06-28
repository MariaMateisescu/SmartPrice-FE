<template>
  <div
    v-if="!completedLists && userStore.authUser"
    class="row justify-center loading-spinner"
  >
    <q-spinner-oval color="cyan-9" size="5em" />
  </div>
  <div class="insights-page">
    <div v-if="userStore.authUser">
      <div class="insights-page-title">
        <div class="text-h6" v-if="completedLists">
          See your shopping behaviour
        </div>
        <div v-if="completedLists && completedLists.length">
          Average time spent shopping:
          <strong>{{ averageTime }}</strong>
        </div>
      </div>
      <BarChart
        v-if="completedLists && completedLists.length"
        :completedLists="completedLists"
      />
      <PieChart v-if="completedLists && completedLists.length" />
    </div>

    <EmptyState v-else :image="image" :title="title" :message="message">
    </EmptyState>
    <EmptyData
      v-if="userStore.authUser && completedLists && !completedLists.length"
      :image="imageEmptyData"
      :title="titleEmptyData"
      :message="messageEmptyData"
      style="margin-top: -72px"
    ></EmptyData>
  </div>
</template>

<script>
import { useUserStore } from "../stores/UserStore";
import { useDashHeaderStore } from "src/stores/dash-header";
import useQuasar from "quasar/src/composables/use-quasar.js";
import PieChart from "src/components/customer/PieChart.vue";
import BarChart from "src/components/customer/BarChart.vue";
import EmptyState from "src/components/customer/EmptyState.vue";
import EmptyData from "src/components/customer/EmptyData.vue";

export default {
  name: "InsightsPage",
  components: { PieChart, BarChart, EmptyState, EmptyData },
  data() {
    return {
      image: "EmptyState.svg",
      title: "Ooops! You are not logged in!",
      message: "Log in to view your insights",
      imageEmptyData: "Void.svg",
      titleEmptyData: "Ooops! Nothing to show",
      messageEmptyData: "Complete lists view your insights",
      lists: [],
      completedLists: null,
      timeSpentArray: [],
      averageTime: null,
      $q: useQuasar(),
    };
  },
  async mounted() {
    const dashHeader = useDashHeaderStore();
    dashHeader.$patch({
      title: "Insights",
      showBackIcon: false,
    });
    try {
      if (this.userStore.authUser) {
        await this.fetchShoppingLists();
      }
    } catch (err) {
      this.$q.notify({
        type: "negative",
        position: "top",
        message: "Something went wrong!",
        color: "negative",
        timeout: "2500",
      });
    }
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
.insights-page {
  height: 100%;
  overflow-y: scroll;
}
.insights-page-title {
  margin: 8px 20px;
}
</style>
