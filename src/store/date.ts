import { BehaviorSubject } from "rxjs";

export type DateType = {
    date: Date;
};

const defaultAuth: DateType = {
    date: new Date(),
};

const state$ = new BehaviorSubject<DateType>(defaultAuth);

export const dateStore = {
  subscribe: (callback: (dateState: DateType) => void) =>
    state$.subscribe(callback),
  getDateStore: () => state$.getValue(),
  setDateStore: (newDate: DateType) => state$.next(newDate),
};