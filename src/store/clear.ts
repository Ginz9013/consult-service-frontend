import { authStore, defaultAuth } from "@/store/auth";
import { userStore, defaultUser } from "@/store/user";

export const clearAllStore = () => {
  authStore.setAuthStore(defaultAuth);
  userStore.setUserStore(defaultUser);
  localStorage.clear();
};