import { store } from "@/redux/index";

export const fetchWithToken = (url: string, options: RequestInit = {
  method: "GET"
}) => {
    const states = store.getState() as any;
    const token = states.authentication?.token satisfies string;

    options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`
    };
    
    return fetch(url, options);
};