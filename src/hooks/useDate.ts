import { dateStore, type DateType } from "@/store/date";
import { useEffect, useState } from 'react';

export const useDate = () => {
  const [date, setDate] = useState<DateType>(dateStore.getDateStore());

  useEffect(() => {
    const subscription = dateStore.subscribe(setDate);
    return () => subscription.unsubscribe();
  }, []);

  return [date, dateStore.setDateStore] as const;
};