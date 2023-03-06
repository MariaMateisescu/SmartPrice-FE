import { defineStore } from "pinia";

export const useDashHeaderStore = defineStore("dashHeader", {
  state: () => ({
    title: "Smart Price",
    showBackIcon: false,
  }),
  persist: true,
});
