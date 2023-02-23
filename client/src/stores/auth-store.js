import { defineStore } from 'pinia';

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: {},
  }),
  getters: {
    isLoggedIn: (state) => state.user?.email,
    token: (state) => state.user?.token,
  },
  actions: {
    signIn(userData) {
      this.user = userData;
    },
    signOut() {
      this.user = {};
    },
  },
});
