export const fetchWithToken = (url: string, options: RequestInit = {
  method: "GET"
}) => {
    const auth = JSON.parse(localStorage.getItem("auth") as string);
    const token = auth?.token;

    options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`
    };
    
    return fetch(url, options);
};