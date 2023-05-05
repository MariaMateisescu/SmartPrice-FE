<template>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";
import { useQuasar } from "quasar";
import { useDashHeaderStore } from "src/stores/dash-header";
export default defineComponent({
  name: "App",
  setup() {
    const $q = useQuasar();

    const dashHeader = useDashHeaderStore();
    $q.dark.set(dashHeader.$state.darkMode);
  },
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Nunito+Sans:ital,wght@1,900&family=Roboto&display=swap");
</style>
