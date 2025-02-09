export const fetchWithToken = (url: string, options: RequestInit = {
  method: "GET"
}) => {
    const auth = localStorage.getitem("auth") as any;
    const token = auth?.token satisfies string;

    options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`
    };
    
    return fetch(url, options);
};