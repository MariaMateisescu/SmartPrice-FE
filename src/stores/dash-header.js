import { defineStore } from "pinia";

export const useDashHeaderStore = defineStore("dashHeader", {
  state: () => ({
    title: "Smart Price",
    showBackIcon: false,
    backIconTo: "",
    darkMode: false,
  }),
  persist: true,
});
