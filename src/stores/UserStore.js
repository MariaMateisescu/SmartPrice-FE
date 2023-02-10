import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    authUser: null,
  }),
  getters: {
    user: (state) => state.authUser,
  },
  actions: {
    setUser(user) {
      this.authUser = user;
    },
  },
  persist: true,
});
