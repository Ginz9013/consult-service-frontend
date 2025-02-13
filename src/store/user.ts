import { BehaviorSubject, distinctUntilChanged } from "rxjs";
import { equals } from "ramda";

export type User = {
  name: string;
  nickname: string;
  email: string;
  weight: number;
  bodyFat: number;
  avatarImg: string;
  nextConsultation: string;
};

const STORAGE_KEY = "user";
export const defaultUser: User = {
    name: "",
    nickname: "",
    email: "",
    weight: 0,
    bodyFat: 0,
    avatarImg: "",
    nextConsultation: "",
};

const getStoredUser = () => {
    try {
        const storedInfo = localStorage.getItem(STORAGE_KEY);
        return storedInfo ? JSON.parse(storedInfo) : defaultUser;
    } catch (error) {
        console.error("Failed to load user state from localStorage", error);
        return defaultUser;
    }
}

const state$ = new BehaviorSubject<User>(getStoredUser());

export const userStore = {
  subscribe: (callback: (userState: User) => void) =>
    state$
      .asObservable()
      .subscribe(callback),
  getUserStore: () => state$.getValue(),
  setUserStore: (newUser: Partial<User>) => {

    const currentUser = state$.getValue();
    const updatedUser = { ...currentUser, ...newUser };

    // 更新 BehaviorSubject
    state$.next(updatedUser);

    // 同步存入 localStorage
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Failed to save user state to localStorage", error);
    }
  },
};