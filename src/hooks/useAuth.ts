import { authStore, type Auth } from "@/store/auth";
import { useEffect, useState } from 'react';

export const useAuth= () => {
  const [auth, setAuth] = useState<Auth>(authStore.getAuthStore());

  useEffect(() => {
    const subscription = authStore.subscribe(setAuth);
    return () => subscription.unsubscribe();
  }, []);

  return [auth, authStore.setAuthStore] as const;
};