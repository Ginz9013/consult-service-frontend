import { BehaviorSubject } from "rxjs";

export type Auth = {
    token: string | null;
};

const STORAGE_KEY = "auth";
const defaultAuth: Auth = {
    token: null
};

const getStoredAuth = () => {
    try {
        const storedAuth = localStorage.getItem(STORAGE_KEY);
        return storedAuth ? JSON.parse(storedAuth) : defaultAuth;
    } catch (error) {
        console.error("Failed to load user state from localStorage", error);
        return defaultAuth;
    }
}

const state$ = new BehaviorSubject<Auth>(getStoredAuth());

export const authStore = {
  subscribe: (callback: (authState: Auth) => void) =>
    state$.subscribe(callback),
  getAuthStore: () => state$.getValue(),
  setAuthStore: (newAuth: Partial<Auth>) => {

    const currentAuth = state$.getValue();
    const updatedAuth = { ...currentAuth, ...newAuth };

    // 更新 BehaviorSubject
    state$.next(updatedAuth);

    // 同步存入 localStorage
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAuth));
    } catch (error) {
      console.error("Failed to save auth state to localStorage", error);
    }
  },
};