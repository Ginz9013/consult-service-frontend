import { userStore, type User } from "@/store/user";
import { useEffect, useState } from 'react';

export const useUser = () => {
  const [user, setUser] = useState<User>(userStore.getUserStore());

  useEffect(() => {
    const subscription = userStore.subscribe(setUser);
    return () => subscription.unsubscribe();
  }, []);

  return [user, userStore.setUserStore] as const;
};