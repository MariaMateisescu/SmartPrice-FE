import { defineStore } from "pinia";

export const useGeolocationInfoStore = defineStore("geolocationInfo", {
  state: () => ({
    radius: 4,
  }),
  persist: true,
});
